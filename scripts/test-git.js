import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';

async function test() {
  const dir = process.cwd();
  await git.init({ fs, dir });
  console.log('Git initialized successfully with isomorphic-git');
}

test().catch(console.error);
