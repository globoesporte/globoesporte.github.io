import { openModal, closeModal } from './modal';

/**
 * Bind all events
 */
export default function bindEvents() {
  $(document).on('click', '.header__nav-container', openModal);
  $(document).on('click', '.mask-modal', closeModal);
  $(document).on('click', '.close-bt', closeModal);
  $(document).on('keyup', closeModal);
}
