/**
 * @param {Object} $modal Modal element
 */
function setupClassesAndStyleToOpenModal($modal) {
  const $body = $('body');
  $body.addClass('noscroll');
  $body.css('paddingRight', 15);
  $modal.addClass('active');
}

/**
 * @param {Object} e Event object
 */
export function openModal(e) {
  if (e) {
    e.preventDefault();
  }
  const $modal = $('#modal');
  setupClassesAndStyleToOpenModal($modal);
  const buttonID = $(this).attr('data-button');
  $modal.attr('data-button', buttonID);
}

/**
 *
 */
function setupToCloseModal() {
  const $body = $('body');
  $('#modal').removeClass('active');
  $body.removeClass('noscroll');
  $body.css('paddingRight', 0);
}

/**
 * Close modal
 * @param {Object} e Event object
 */
export function closeModal(e) {
  const $modal = $('#modal');

  if ($modal.hasClass('active')) {
    if (e.keyCode) {
      const isEscKey = e.keyCode === 27;
      if (isEscKey) {
        setupToCloseModal();
      }
    } else {
      setupToCloseModal();
    }
  }
}
