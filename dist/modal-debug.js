/* global $:true */

/**
 * My Modal Library
 * @param {selector} - selected Button
 * @return {Object} - sets of functions
 */
var SimpleModal = function(selector) {
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
    void 0;
    if (args === undefined || args === null || Object.keys(args).length === 0) {
      void 0;
      return;
    }
    setProperties(args);
    void 0;
  }

  /**
   * Modal start open
   * @return {[type]} early return when isOpening state
   */
  startOpen = function(){
    void 0;
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
      void 0;
    } else {
      void 0;
      var styles = {overflow: 'hidden'};
      $body.css(styles);
    }

    // handle overlay
    if (properties.useBackdropOvelay === true) {
      void 0;
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
      void 0;
      properties.userBeforeOpen();
      void 0;
    }
    void 0;
  }

  /**
   *
   */
  endOpen = function() {
    void 0;
    if (properties.useBackdropOvelay === true) {
      void 0;
      $($overlay).click(clickOverlay);
    }

    // handle close modal button
    void 0;
    $('*[data-role="modal:container"] [data-dismiss="modal"]')
    .click(function(event) {
      event.preventDefault();
      startClose();
    });

    if (properties.hasOwnProperty('userAfterOpen') &&
        properties.userAfterOpen !== undefined) {
      void 0;
      properties.userAfterOpen();
      void 0;
    }

    isOpening = false;
    void 0;
  }

  /**
   *
   */
  startClose = function() {
    void 0;
    if (isClosing) {
      void 0;
      return;
    }
    isClosing = true;

    if (properties.useBackdropOvelay === true) {
      void 0;
      $($overlay).off();
    }

    // handle close modal button
    void 0;
    $('*[data-role="modal:container"] [data-dismiss="modal"]').off();

    if (properties.hasOwnProperty('userBeforeClose') &&
        properties.userBeforeClose !== undefined) {
      void 0;
      properties.userBeforeClose();
      void 0;
    }
    doClose();
    void 0;
    return;
  }

  /**
   * Callback when modal ends
   * @return {[type]}
   */
  endClose = function () {
    void 0;

    if (properties.useBackdropOvelay === true) {
      void 0;
      $overlay.animate({
        opacity: 0
      }, properties.overlayOptions.duration, function() {
        this.remove();
      });
    }
    void 0;
    $body.css(restorableProperties);

    if (properties.hasOwnProperty('userAfterClose') &&
        properties.userAfterClose !== undefined) {
      void 0;
      properties.userAfterClose();
      void 0;
    }

    isClosing = false;
    void 0;
  }

  /**
   *
   */
  doOpen = function () {
    void 0;
    $modal.show('400', function() {
      endOpen();
    });
    void 0;
  }

  /**
   *
   */
  doClose = function () {
    void 0;
    $modal.hide('400', function() {
      endClose();
    });
    void 0;
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
    void 0;
    startClose();
    void 0;
  }

  // Public Methods
  /**
   * @param  {*} args - It is initialize parames, will set properties
   */
  open = function (args) {
    void 0;
    validateProperties(args);
    startOpen();
    void 0;
  }

  return {
    open: open
  };
};
