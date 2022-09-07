
export default (() => {
/**
 * This script injected by the installed three.js developer
 * tools extension.
 * https://github.com/threejs/three-devtools
 */

const $devtoolsReady = Symbol('devtoolsReady');
const $backlog = Symbol('backlog');

// The __THREE_DEVTOOLS__ target is small and light-weight, and collects
// events triggered until the devtools panel is ready, which is when
// the events are flushed.
const target = new class ThreeDevToolsTarget extends EventTarget {
  constructor() {
    super();
    this[$devtoolsReady] = false;
    this[$backlog] = [];
    this.addEventListener('devtools-ready', e => {
      this[$devtoolsReady] = true;
      for (let event of this[$backlog]) {
        this.dispatchEvent(event);
      }
    }, { once: true });
  }

  dispatchEvent(event) {
    if (this[$devtoolsReady] || event.type === 'devtools-ready') {
      super.dispatchEvent(event);
    } else {
      this[$backlog].push(event);
    }
  }
}

Object.defineProperty(window, '__THREE_DEVTOOLS__', {
  value: target,
});
})();


