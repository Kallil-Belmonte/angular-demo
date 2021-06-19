declare var $: any;

export class ThemeFunctions {
  // TOGGLE MODAL STYLES
  static toggleModalStyles(isModalOpen: boolean) {
    if (isModalOpen) {
      $('body').removeClass('modal-open');
      $('body, .modal-open .modal').removeAttr('style');
    } else {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;

      $('body').addClass('modal-open');
      $('body, .modal-open .modal').css({ 'padding-right': scrollbarWidth.toString() + 'px' });
    }
  }
}
