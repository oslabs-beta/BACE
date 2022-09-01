const script = document.createElement('script')

async function createWindow() {
  const params: chrome.windows.CreateData = {
    focused: true, 
    url: chrome.extension.getURL('devtools.html'), // chrome treats urls relative to extension root directory
    type: 'popup',
    width: 380, 
    height: window.screen.availHeight, 
    setSelfAsOpener: true
  }

  chrome.windows.create(params, popup => {
    console.log('popup up!')
  })
}

// script.text = `
// window.__R3F_TOOLS__.addEventListener('devtools-ready', createWindow)
// window.__R3f_TOOLS__.dispatchEvent(')
// `