
chrome.action.onClicked.addListener(tab => {
  const params = {
    active: true,
    currentWindow: true,
  }
  chrome.tabs.query(params, tabs => {
    const activeTabId = tabs[0].id as number
    chrome.tabs.sendMessage(activeTabId, { type: "cascade-trigger" })
  })
})