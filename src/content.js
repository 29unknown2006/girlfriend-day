// Centralized Content Configuration for Girlfriend's Day Website
// All editable text, reactions, signoffs, and messages are exported here.

export const RECIPIENT_NAME = "Litchii ❤️";
export const SIGNOFF_NAME = "Daddy ❤️";

export const LANDING_CONTENT = {
  title: "Happy Girlfriend's Day, Litchii ❤️",
  paragraphs: [
    "I know we fight a lot, but no matter what happens, we always choose each other. Every single time.",
    "I will always be proud of you.",
    "You're perfect to me—not because you're flawless, but because you're you.",
    "Loving you, taking care of you, understanding you, and standing by your side never felt like something I had to do. It all came naturally, because that's how deeply I love you.",
    "Thank you for being the most beautiful part of my life.",
    "Now, let me take you on a little journey I made just for you. ❤️"
  ],
  buttonText: "❤️ Start Our Journey"
};

export const GAME1_CONTENT = {
  title: "Find My Heart ❤️",
  subtitle: "My heart is hidden somewhere in this grid... Can you find where it belongs?",
  wrongReactions: [
    "Nope 😂",
    "Warmer...",
    "So close...",
    "Hmm, try another card! 🙈",
    "Almost had it! 👀",
    "Cold... 🧊 try again!"
  ],
  successMessage: "You always find your way to my heart ❤️",
  buttonText: "Continue Our Journey ✨"
};

export const GAME2_CONTENT = {
  title: "How much do you love me? ❤️",
  subtitle: "Drag the slider to show me how much love you're holding inside!",
  responses: {
    low: {
      min: 0,
      max: 30,
      text: "🥺 Hawwwww... That's all? I think your finger slipped. Try again 😤❤️",
      showTryAgain: true
    },
    medium: {
      min: 31,
      max: 70,
      text: "😊 Awww... That's actually really sweet ❤️ But... I think you can do a little better 😏",
      showTryAgain: true
    },
    high: {
      min: 71,
      max: 98,
      text: "Awwwwwww ❤️ I knewww ittt 🥹❤️ But... I love you moreeeeeee. Mwahhhhhhh 💋",
      showTryAgain: false
    },
    max: {
      min: 99,
      max: 100,
      text: "You picked Infinity ❤️♾️ That's exactly what I hoped for. But my love goes beyond Infinity. Mwahhhhhhh 💋",
      showTryAgain: false
    }
  },
  buttonText: "Submit Love Meter ❤️",
  continueText: "Onward to the next surprise 💖"
};

export const GAME3_CONTENT = {
  title: "Catch The Hearts ❤️",
  subtitle: "Move your basket to catch falling hearts! Collect 29 hearts (for March 29th 💖) to unlock my heart 💌",
  goalScore: 29,
  winMessage: "You've collected 29 hearts of love ❤️",
  buttonText: "Continue 💖"
};

export const TRANSITION_CONTENT = {
  text: [
    "One last thing...",
    "I've been waiting for this moment..."
  ],
  buttonText: "❤️ Open My Heart"
};

export const FINAL_PAGE_CONTENT = {
  heading: "I really love you, Baby ❤️",
  subheading: [
    "I really can't put into words all the feelings I have for you...",
    "But I tried my best.",
    "I love you so much. ❤️"
  ],
  buttonText: "💌 Click Me"
};

export const LETTER_CONTENT = {
  heading: "Happy Girlfriend's Day, Litchii ❤️",
  altText: "Handwritten letter to Litchii"
};

export const FINAL_MESSAGE_CONTENT = {
  lines: [
    "And if I had another thousand lifetimes...",
    "I'd still choose you.",
    "Every single time. ❤️"
  ],
  signoff: `Forever yours, ${SIGNOFF_NAME}`
};
