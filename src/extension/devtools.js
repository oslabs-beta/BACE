if (chrome.devtools.inspectedWindow.tabId) {
  // As of now, only inspect content windows, not when
  // debugging a devtools panel for example.
  try {
    const evalResult = chrome.devtools.inspectedWindow.eval(`window.DevToolsAPI`);
    if (evalResult && typeof evalResult.then === 'function') {
      evalResult.then(([result, error]) => {
        if (error) {
          console.warn('DevTools eval error:', error);
        }
        if (!result) {
          createPanel();
        }
      }).catch(err => {
        console.warn('DevTools eval promise rejected:', err);
        createPanel(); // Create panel anyway if eval fails
      });
    } else {
      // If eval doesn't return a promise, create panel directly
      createPanel();
    }
  } catch (error) {
    console.warn('DevTools eval exception:', error);
    createPanel(); // Create panel anyway if eval throws
  }
}

async function createPanel() {
  try {
    // It appears that Chrome treats URLs relative to extension root,
    // and Firefox treats it relative to the devtools page.
    // Use `/` to circumvent.
    const icon = '/assets/icon_128.png';
    const url = '/src/app/index.html';
    const panel = await chrome.devtools.panels.create(`three-tools`, icon, url);
    console.log('Three-tools panel created successfully');
  } catch (error) {
    console.error('Failed to create three-tools panel:', error);
  }
}
