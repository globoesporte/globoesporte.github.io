import '../_styl/main.styl';

document.addEventListener('DOMContentLoaded', () => {
  hljs.initHighlightingOnLoad(); // eslint-disable-line
});

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept();
}
