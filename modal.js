/* global $:true */
/**
 * My Modal Library
 * @return {Object} - sets of functions
 */
var MyModal = function() {
  var properties = {
    userBeforeOpen: undefined,
    userAfterOpen: undefined,
    userBeforeClose: undefined,
    userAfterClose: undefined,
    useBackdropOvelay: true,
    overlayOptions: {
      opacity: 0.95,
      duration: 300,
      closeWhenClick: true
    },
    scrollableBackgroud: false
  };
  // Get Default Properties
  var $body = $('body');
  var overlay = '<div class="modal-overlay"></div>';
  var $overlay = {};
  // Save before body properties
  var restorableProperties = {
    overflow: $body.css('overflow')
  };
  console.log('restorableProperties', restorableProperties);

  /**
   * @param  {*}  args - arguments for properties
   * @return {undefined}
   */
  function validateProperties(args) {
    if (args === undefined || args == null || Object.keys(args).length === 0) {
      console.log('Has no args');
      return;
    }

    // Callback functions
    if (args.hasOwnProperty('beforeOpen')) {
      properties.userBeforeOpen = args.beforeOpen;
    }
    if (args.hasOwnProperty('afterOpen')) {
      properties.userAfterOpen = args.afterOpen;
    }
    if (args.hasOwnProperty('beforeClose')) {
      properties.userBeforeClose = args.beforeClose;
    }
    if (args.hasOwnProperty('afterClose')) {
      properties.userAfterClose = args.afterClose;
    }

    // Optional Properties
    if (args.hasOwnProperty('useBackdropOvelay')) {
      properties.useBackdropOvelay = args.useBackdropOvelay;
    }

    if (args.hasOwnProperty('scrollableBackgroud')) {
      properties.scrollableBackgroud = args.scrollableBackgroud;
    }

    if (args.hasOwnProperty('overlayOptions')) {
      if (args.overlayOptions.hasOwnProperty('opacity')) {
        properties.overlayOptions.opacity = args.overlayOptions.opacity;
      }
      if (args.overlayOptions.hasOwnProperty('duration')) {
        properties.overlayOptions.duration = args.overlayOptions.duration;
      }
      if (args.overlayOptions.hasOwnProperty('closeWhenClick')) {
        properties.overlayOptions.closeWhenClick = args.overlayOptions.closeWhenClick;
      }
    }
  }

  /**
   *
   */
  function beforeOpen() {
    console.log('Super -- Before Open !!');
    // save body properties
    restorableProperties = {
      overflow: $body.css('overflow')
    };

    // handle overlay
    if (properties.useBackdropOvelay === true) {
      console.log('set overlay');
      $body.append(overlay);
      $overlay = $('.modal-overlay');
      $overlay.animate({'opacity': properties.overlayOptions.opacity},
                        properties.overlayOptions.duration);
    } else {
      console.log('Not set overlay');
    }

    // handle background scroll
    if (properties.scrollableBackgroud) {
    } else {
      var styles = {overflow: 'hidden'};
      $body.css(styles);
    }

    // User
    if (properties.hasOwnProperty('userBeforeOpen') &&
        properties.userBeforeOpen !== undefined) {
      console.log('+User --- Before Open !!');
      properties.userBeforeOpen();
    }
  }

  /**
   *
   */
  function afterOpen() {
    console.log('Super -- After Open !!');
    if (properties.useBackdropOvelay === true) {
       $($overlay).click(clickOverlay);
    }

    if (properties.hasOwnProperty('userAfterOpen') &&
        properties.userAfterOpen !== undefined) {
      console.log('+User --- After Open !!');
      properties.userAfterOpen();
    }
  }

  /**
   *
   */
  function beforeClose() {
    console.log('Super -- Before Close !!');
    if (properties.hasOwnProperty('userBeforeClose') &&
        properties.userBeforeClose !== undefined) {
      console.log('+User --- Before Close !!');
      properties.userBeforeClose();
    }
    return;
  }

  /**
   *
   */
  function afterClose() {
    console.log('Super -- After Close !!');

    if (properties.useBackdropOvelay === true) {
      console.log('opacity');
      $overlay.animate({opacity: 0}, properties.overlayOptions.duration, function() {
        this.remove();
        $body.css(restorableProperties);
      });
    } else {
      $body.css(restorableProperties);
    }

    if (properties.hasOwnProperty('userAfterClose') &&
        properties.userAfterClose !== undefined) {
      console.log('+User --- After Close !!');
      properties.userAfterClose();
    }
  }

  /**
   *
   */
  function doOpen() {
    console.log('Open !!');
  }

  /**
   *
   */
  function doClose() {
    console.log('Close !!');
  }

  /*
    Overlay functions
   */
  function clickOverlay(event) {
    if (properties.overlayOptions.closeWhenClick) {
      close();
    } else {

    }
  }

  // Public Methods
  /**
   * @param  {*} args - It is initialize parames, will set properties
   */
  function open(args) {
    validateProperties(args);
    beforeOpen();
    doOpen();
    afterOpen();
  }

  /**
   *
   */
  function close() {
    beforeClose();
    doClose();
    afterClose();
  }

  return {
    open: open,
    close: close
  };
};
