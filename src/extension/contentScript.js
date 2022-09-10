// Use `text` instead of `src` to get around Chromium bug of execution order
// when using `src`, resulting in a race condition.
// https://bugs.chromium.org/p/chromium/issues/detail?id=634381#c3


function injectScript(file_path, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  console.log(script)
  script.onload = () => {
    script.parentNode.removeChild(script);
  }
  node.prepend(script);
  
}
//the content script is going to be listen to messages from the injected script since its now apart of the page
// getURL gets us a file within the extension we created
injectScript(chrome.runtime.getURL('../content/inject.js'), 'html');


// (document.head || document.documentElement).appendChild(script);

window.addEventListener('message', e => {
  if (e.source !== window ||
      typeof e.data !== 'object' ||
      e.data.id !== 'three-devtools') {
    return;
  }

  // Don't bring in the 35kb polyfill on every page
  // for a single command that doesn't matter if its callback
  // promise; handle this manually.
  const extRoot = globalThis.chrome ? globalThis.chrome : globalThis.browser;

  try {
    extRoot.runtime.sendMessage(e.data);
  } catch (error) {
    console.error(error);
    extRoot.runtime.sendMessage({
      type: 'error',
      id: 'three-devtools',
      data: error.toString(), 
    });
  }
});
