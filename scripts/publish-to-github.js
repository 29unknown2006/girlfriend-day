import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';

const IGNORED_PATHS = [
  'node_modules',
  'dist',
  '.git',
  '.github', // Exclude .github to avoid requiring 'workflow' scope on PAT
  '.DS_Store',
  'Thumbs.db'
];

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    if (IGNORED_PATHS.includes(file)) continue;
    const fullPath = path.join(dir, file);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      results.push(relPath);
    }
  }
  return results;
}

function getDistFiles(distDir) {
  let results = [];
  if (!fs.existsSync(distDir)) return results;
  const list = fs.readdirSync(distDir);
  for (const file of list) {
    const fullPath = path.join(distDir, file);
    const relPath = path.relative(distDir, fullPath).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getDistFiles(fullPath));
    } else {
      results.push(relPath);
    }
  }
  return results;
}

async function uploadFile(octokit, owner, repo, branch, relPath, fullPath) {
  const content = fs.readFileSync(fullPath).toString('base64');
  let sha;
  try {
    const existing = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: relPath,
      ref: branch
    });
    if (!Array.isArray(existing.data)) {
      sha = existing.data.sha;
    }
  } catch (e) {
    // File doesn't exist yet on branch
  }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: relPath,
    message: `Upload ${relPath}`,
    content,
    sha,
    branch
  });
}

async function uploadBatch(octokit, owner, repo, branch, filesMap) {
  const entries = Object.entries(filesMap);
  const total = entries.length;
  console.log(`📦 Uploading ${total} files to ${branch} branch...`);

  // Upload sequentially to avoid SHA race conditions on GitHub refs
  const CONCURRENCY = 1;
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(([relPath, fullPath]) =>
        uploadFile(octokit, owner, repo, branch, relPath, fullPath)
      )
    );
    const count = Math.min(i + CONCURRENCY, total);
    console.log(`  Uploaded ${count}/${total} files...`);
  }
}

async function publish() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN;
  let repoName = process.argv[3] || 'girlfriend-day';

  if (!token) {
    console.error('\n❌ ERROR: GitHub Personal Access Token is required.');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });

  console.log('🔍 Authenticating with GitHub API...');
  const { data: user } = await octokit.rest.users.getAuthenticated();
  console.log(`✅ Authenticated as: ${user.login} (${user.name || user.login})`);

  console.log(`🚀 Preparing GitHub repository "${repoName}"...`);
  let repo;
  try {
    const res = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'Special Girlfriend Day Interactive Surprise Website 💖',
      private: false,
      auto_init: true
    });
    repo = res.data;
    console.log(`✅ Repository created: ${repo.html_url}`);
  } catch (err) {
    if (err.status === 422) {
      console.log(`ℹ️ Repository "${repoName}" already exists on your account. Fetching details...`);
      const res = await octokit.rest.repos.get({
        owner: user.login,
        repo: repoName
      });
      repo = res.data;
    } else {
      throw err;
    }
  }

  const rootDir = process.cwd();

  // 1. Upload source files to main branch
  const sourceFiles = getAllFiles(rootDir);
  const mainFilesMap = {};
  for (const relPath of sourceFiles) {
    mainFilesMap[relPath] = path.join(rootDir, relPath);
  }
  await uploadBatch(octokit, user.login, repoName, 'main', mainFilesMap);
  console.log('✅ Main branch successfully updated on GitHub!');

  // 2. Upload built assets to gh-pages branch
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    const distFiles = getDistFiles(distDir);
    const ghPagesFilesMap = {};
    for (const relPath of distFiles) {
      ghPagesFilesMap[relPath] = path.join(distDir, relPath);
    }
    const noJekyllPath = path.join(distDir, '.nojekyll');
    fs.writeFileSync(noJekyllPath, '');
    ghPagesFilesMap['.nojekyll'] = noJekyllPath;

    await uploadBatch(octokit, user.login, repoName, 'gh-pages', ghPagesFilesMap);
    console.log('✅ gh-pages branch successfully updated on GitHub!');
  }

  // 3. Configure GitHub Pages
  console.log('🌐 Configuring GitHub Pages deployment from gh-pages branch...');
  try {
    await octokit.rest.repos.createPagesSite({
      owner: user.login,
      repo: repoName,
      source: {
        branch: 'gh-pages',
        path: '/'
      }
    });
    console.log('✅ GitHub Pages site created successfully!');
  } catch (err) {
    if (err.status === 409 || err.message?.includes('already exists')) {
      try {
        await octokit.rest.repos.updateInformationAboutPagesSite({
          owner: user.login,
          repo: repoName,
          source: {
            branch: 'gh-pages',
            path: '/'
          }
        });
        console.log('✅ GitHub Pages updated to serve from gh-pages branch!');
      } catch (updateErr) {
        console.log('ℹ️ GitHub Pages is already active.');
      }
    } else {
      console.log('ℹ️ GitHub Pages notice:', err.message);
    }
  }

  const liveUrl = `https://${user.login.toLowerCase()}.github.io/${repoName}/`;
  
  console.log('\n==================================================');
  console.log('🎉 SUCCESS! YOUR WEBSITE IS LIVE AND ON GITHUB!');
  console.log('==================================================');
  console.log(`📁 GitHub Repository: ${repo.html_url}`);
  console.log(`🌐 Live Website Link:  ${liveUrl}`);
  console.log('==================================================\n');
}

publish().catch((err) => {
  console.error('\n❌ Deployment failed:', err.message || err);
  process.exit(1);
});
