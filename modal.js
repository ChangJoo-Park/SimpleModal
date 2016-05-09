/* global $:true */

/**
 * My Modal Library
 * @param {selector} - selected Button
 * @return {Object} - sets of functions
 */
var MyModal = function MyModal(selector) {
  var properties = {
    userBeforeOpen: undefined,
    userAfterOpen: undefined,
    userBeforeClose: undefined,
    userAfterClose: undefined,
    useBackdropOvelay: true,
    overlayOptions: {
      opacity: 0.95,
      duration: 300,
      color: 'black',
      closeWhenClick: false
    },
    scrollableBackgroud: false
  };
  // Get Default Properties
  var $body = $('body');
  var overlay = '<div class="modal-overlay"></div>';
  var $overlay = {};
  var $modal = $($(selector).data('target'));
  // Save before body properties
  var restorableProperties = {
    overflow: $body.css('overflow')
  };
  var isOpening = false;
  var isClosing = false;

  /**
   * set properties from arguments
   * @param {[type]} args  source properties
   * @param {[type]} props target properties
   */
  setProperties = function(args, props) {
    var property = props;
    if (property === undefined || property === null) {
      property = properties;
    }
    Object.keys(args).forEach(function(key) {
      if (!property.hasOwnProperty(key)) {
        return;
      }
      if (typeof args[key] === 'object') {
        setProperties(args[key], property[key]);
      } else {
        property[key] = args[key];
      }
    });
  }
  /**
   * @param  {*}  args - arguments for properties
   * @return {undefined}
   */
  validateProperties = function(args) {
    console.log("[private] : ", arguments.callee.name, "begin");
    if (args === undefined || args === null || Object.keys(args).length === 0) {
      console.log('Has no args');
      return;
    }
    setProperties(args);
    console.log("[private] : ", arguments.callee.name, "end");
  }

  /**
   * Modal start open
   * @return {[type]} early return when isOpening state
   */
  startOpen = function(){
    console.log("[#startOpen] : Begin");
    if (isOpening) {
      return;
    }
    isOpening = true;
    // save body properties
    restorableProperties = {
      overflow: $body.css('overflow')
    };

    // handle background scroll
    if (properties.scrollableBackgroud) {
      console.log("[#startOpen] : Not modified body css");
    } else {
      console.log("[#startOpen] : Add style's to body");
      var styles = {overflow: 'hidden'};
      $body.css(styles);
    }

    // handle overlay
    if (properties.useBackdropOvelay === true) {
      console.log("[#startOpen] : Add Backdrop Overlay");
      if ($('body').find('.modal-overlay').length === 0) {
        $body.append(overlay);
        $overlay = $('.modal-overlay');
        $overlay.css('background-color', properties.overlayOptions.color);
        $overlay.animate({opacity: properties.overlayOptions.opacity},
                          properties.overlayOptions.duration, function() {
                            doOpen();
                          });
      }
    } else {
      doOpen();
    }

    // User
    if (properties.hasOwnProperty('userBeforeOpen') &&
        properties.userBeforeOpen !== undefined) {
      console.log("[#startOpen] : Start caller's before open method");
      properties.userBeforeOpen();
      console.log("[#startOpen] : End caller's after open method");
    }
    console.log("[#startOpen] : End");
  }

  /**
   *
   */
  endOpen = function() {
    console.log("[#endOpen] : Begin");
    if (properties.useBackdropOvelay === true) {
      console.log("[#endOpen] : Add click event to overlay");
      $($overlay).click(clickOverlay);
    }

    // handle close modal button
    console.log("[#endOpen] : Add click event to data-dismiss modal");
    $('*[data-role="modal:container"] [data-dismiss="modal"]')
    .click(function(event) {
      event.preventDefault();
      startClose();
    });

    if (properties.hasOwnProperty('userAfterOpen') &&
        properties.userAfterOpen !== undefined) {
      console.log("[#endOpen] : Before user's afterOpen");
      properties.userAfterOpen();
      console.log("[#endOpen] : After user's afterOpen");
    }

    isOpening = false;
    console.log("[#endOpen] : End");
  }

  /**
   *
   */
  startClose = function() {
    console.log("[#startClose] : Begin");
    if (isClosing) {
      console.log("[#startClose] : Block when click multiple");
      return;
    }
    isClosing = true;

    if (properties.useBackdropOvelay === true) {
      console.log("[#startClose] : Remove event from overlay");
      $($overlay).off();
    }

    // handle close modal button
    console.log("[#startClose] : Remove event from close button");
    $('*[data-role="modal:container"] [data-dismiss="modal"]').off();

    if (properties.hasOwnProperty('userBeforeClose') &&
        properties.userBeforeClose !== undefined) {
      console.log("[#startClose] : Before user's beforeClose");
      properties.userBeforeClose();
      console.log("[#startClose] : After user's beforeClose");
    }
    doClose();
    console.log("[#startClose] : End");
    return;
  }

  /**
   * Callback when modal ends
   * @return {[type]}
   */
  endClose = function () {
    console.log("[#endClose] : Begin");

    if (properties.useBackdropOvelay === true) {
      console.log("[#endClose] : Remove backdrop overlay");
      $overlay.animate({
        opacity: 0
      }, properties.overlayOptions.duration, function() {
        this.remove();
      });
    }
    console.log("[#endClose] : Restore body styles");
    $body.css(restorableProperties);

    if (properties.hasOwnProperty('userAfterClose') &&
        properties.userAfterClose !== undefined) {
      console.log("[#endClose] : Before call user's afterClose");
      properties.userAfterClose();
      console.log("[#endClose] : End call user's afterClose");
    }

    isClosing = false;
    console.log("[#endClose] : End");
  }

  /**
   *
   */
  doOpen = function () {
    console.log("[#doOpen] : Begin");
    $modal.show('400', function() {
      endOpen();
    });
    console.log("[#doOpen] : End");
  }

  /**
   *
   */
  doClose = function () {
    console.log("[#doClose] : Begin");
    $modal.hide('400', function() {
      endClose();
    });
    console.log("[#doClose] : End");
  }

  /**
   * Event when overlay clicked
   * @param  {[type]} event overlay click function
   */
  clickOverlay = function(event) {
    event.preventDefault();
    if (properties.overlayOptions.closeWhenClick) {
      close();
    }
  }

  /**
   *
   */
  close = function () {
    console.log("[#open] Begin");
    startClose();
    console.log("[#open] End");
  }

  // Public Methods
  /**
   * @param  {*} args - It is initialize parames, will set properties
   */
  open = function (args) {
    console.log("[#Open] Begin");
    validateProperties(args);
    startOpen();
    console.log("[#Open] End");
  }

  return {
    open: open
  };
};
