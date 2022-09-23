chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let direction = 0;
  if (message.direction == 'up') {
    direction = -500;
  } else if (message.direction == 'down') {
    direction = +500;
  }
  window.scrollBy({
    top: direction,
    left: 0,
    behavior: 'smooth'
  });
});

console.log('content ready!');
