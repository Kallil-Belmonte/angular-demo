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
      $('body, .modal-open .modal').css({'padding-right': scrollbarWidth.toString() + 'px'});
    }
  }


  // JQUERY MASK PLUGIN
  static jQueryMaskPlugin() {
    // Credit card config
    const creditCardNumberMaskBehavior = function(val: string) {
      return val.replace(/\D/g, '').length === 16 ? '0000 0000 0000 0000' : '0000 000000 000009';
    };
    const creditCardNumberMaskOptions = {
      onKeyPress: function(_val: any, _e: any, field: any, options: any) {
        field.mask(creditCardNumberMaskBehavior.apply({}, arguments), options);
      }
    };

    // Telephone config
    const telephoneMaskBehavior = function (val: string) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000 0000' : '(00) 0000 00009';
    };
    const telephoneMaskOptions = {
      onKeyPress: function(_val: any, _e: any, field: any, options: any) {
        field.mask(telephoneMaskBehavior.apply({}, arguments), options);
      }
    };

    // Masks
    $('.credit-card-number-mask').mask(creditCardNumberMaskBehavior, creditCardNumberMaskOptions);
    $('.credit-card-month-mask').mask('00');
    $('.credit-card-year-mask').mask('0000');
    $('.credit-card-cvc-mask').mask('0000');
    $('.date-mask').mask('00/00/0000');
    $('.telephone-mask').mask(telephoneMaskBehavior, telephoneMaskOptions);
  }


  // INIT
  static init() {
    this.jQueryMaskPlugin();
  }

};