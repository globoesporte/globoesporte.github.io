import 'jeet/stylus/jeet/index.styl';
import 'rupture/rupture/index.styl';
import '../_styl/main.styl';

document.addEventListener('DOMContentLoaded', () => {
  hljs.initHighlightingOnLoad(); // eslint-disable-line
});

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept();
}
