import '../_styl/main.styl';
import bindEvents from './events';

document.addEventListener('DOMContentLoaded', () => {
  hljs.initHighlightingOnLoad(); // eslint-disable-line
  bindEvents();
});

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept();
}
