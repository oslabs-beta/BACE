(()=>{"use strict";console.log("background loaded");const e=new Map;chrome.runtime.onConnect.addListener((o=>{let n;console.log("port: ",o);const t=t=>{n=t.tabId,console.log("onConnect",n,t.name),"connect"===t.name&&(console.log("connecting!"),e.set(n,o),console.log("connections: ",e))};o.onMessage.addListener(t),o.onDisconnect.addListener((o=>{o.onMessage.removeListener(t),e.delete(n)}))})),chrome.runtime.onMessage.addListener(((o,n,t)=>{if(n.tab){const t=n.tab.id;e.has(t)&&e.get(t).postMessage(o)}return!0})),chrome.webNavigation.onCommitted.addListener((function(o){0===o.frameId&&(console.log("onCommitted",o.tabId,e.has(o.tabId)),e.has(o.tabId)&&e.get(o.tabId).postMessage({type:"committed",id:"r3f-devtools"}))})),console.log("this is at the end of background.ts")})();