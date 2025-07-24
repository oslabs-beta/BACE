// Use `src` attribute to load script from file instead of inline text
// to comply with Manifest V3 Content Security Policy
const script = document.createElement('script');
script.src = chrome.runtime.getURL('src/content/injected-script.js');
script.onload = () => {
  script.parentNode.removeChild(script);
}
(document.head || document.documentElement).appendChild(script);

window.addEventListener('message', e => {
  if (e.source !== window ||
      typeof e.data !== 'object' ||
      e.data.id !== 'three-devtools') {
    return;
  }

  try {
    chrome.runtime.sendMessage(e.data);
  } catch (error) {
    console.error(error);
    chrome.runtime.sendMessage({
      type: 'error',
      id: 'three-devtools',
      data: error.toString(), 
    });
  }
});
