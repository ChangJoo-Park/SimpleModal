/* global $:true */

/**
 * My Modal Library
 * @param {selector} - selected Button
 * @return {Object} - sets of functions
 */
var SimpleModal = function(selector) {
  if (selector === undefined || selector === null) {
    console.error('Please Open right way. See the document');
    return;
  }

  // Out focus from button
  $(selector).blur();

  var $body = $('body');

  var selectorData = $(selector).data();
  console.log(selectorData);
  if (selectorData.target === undefined ||
      selectorData.role === undefined) {
    return;
  }
  var $modal = $(selectorData.target);
  if ($modal === undefined ||
   $modal.data('role') !== 'modal:container') {
    return;
  }

  var defaultProperties = {
    userBeforeOpen: undefined,
    userAfterOpen: undefined,
    userBeforeClose: undefined,
    userAfterClose: undefined,
    userCancel: undefined,
    userSubmit: undefined,
    useBackdropOvelay: true,
    overlayOptions: {
      opacity: 0.95,
      duration: 300,
      color: 'black',
      closeWhenClick: true
    },
    scrollableBackgroud: false
  };

  // Get Default Properties
  var properties = defaultProperties;

  // Save before body properties
  var restorableProperties = {
    overflow: $body.css('overflow')
  };

  // Define Overlay
  var overlay = '<div class="modal-overlay"></div>';
  var $overlay = {};

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
  };
  /**
   * @param  {*}  args - arguments for properties
   * @return {undefined}
   */
  validateProperties = function(args) {
    if (args === undefined || args === null || Object.keys(args).length === 0) {
      console.log('Has no args');
      return;
    }
    setProperties(args);
    console.debug(properties);
  };

  /**
   * Modal start open
   */
  startOpen = function() {
    console.log('[#startOpen] : Begin');
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
      console.log('[#startOpen] : Not modified body css');
    } else {
      console.log('[#startOpen] : Add style\'s to body');
      var styles = {overflow: 'hidden'};
      $body.css(styles);
    }

    // handle overlay
    if (properties.useBackdropOvelay === true) {
      console.log('[#startOpen] : Add Backdrop Overlay');
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
      console.log('[#startOpen] : Start caller\'s before open method');
      properties.userBeforeOpen();
      console.log('[#startOpen] : End caller\'s after open method');
    }
    console.log('[#startOpen] : End');
  };

  /**
   *
   */
  endOpen = function() {
    console.log('[#endOpen] : Begin');
    if (properties.useBackdropOvelay === true) {
      console.log('[#endOpen] : Add click event to overlay');
      $($overlay).click(clickOverlay);
    }

    // handle close modal button
    console.log('[#endOpen] : Add click event to data-dismiss modal');
    $('*[data-role="modal:container"] [data-role="modal:close"]')
    .click(function(event) {
      event.preventDefault();
      if (properties.hasOwnProperty('userCancel') &&
          properties.userCancel !== undefined) {
        properties.userCancel();
      }
      startClose();
    });

    // handle submit modal button
    console.log('[#endOpen] : Add click event to data-submit modal');
    $('*[data-role="modal:container"] [data-role="modal:submit"]')
    .click(function(event) {
      event.preventDefault();
      if (properties.hasOwnProperty('userSubmit') &&
          properties.userSubmit !== undefined) {
        properties.userSubmit();
      }
      startClose();
    });

    if (properties.hasOwnProperty('userAfterOpen') &&
        properties.userAfterOpen !== undefined) {
      console.log('[#endOpen] : Before user\'s afterOpen');
      properties.userAfterOpen();
      console.log('[#endOpen] : After user\'s afterOpen');
    }

    isOpening = false;
    console.log('[#endOpen] : End');
  };

  /**
   *
   */
  startClose = function() {
    console.log('[#startClose] : Begin');
    if (isClosing) {
      console.log('[#startClose] : Block when click multiple');
      return;
    }
    isClosing = true;

    if (properties.useBackdropOvelay === true) {
      console.log('[#startClose] : Remove event from overlay');
      $($overlay).off();
    }

    // handle close modal button
    console.log('[#startClose] : Remove event from close button');
    $('*[data-role="modal:container"] [data-dismiss="modal"]').off();

    if (properties.hasOwnProperty('userBeforeClose') &&
        properties.userBeforeClose !== undefined) {
      console.log('[#startClose] : Before user\'s beforeClose');
      properties.userBeforeClose();
      console.log('[#startClose] : After user\'s beforeClose');
    }
    doClose();
    console.log('[#startClose] : End');
    return;
  };

  /**
   * Callback when modal ends
   * @return {[type]}
   */
  endClose = function() {
    console.log('[#endClose] : Begin');

    if (properties.useBackdropOvelay === true) {
      console.log('[#endClose] : Remove backdrop overlay');
      $overlay.animate({
        opacity: 0
      }, properties.overlayOptions.duration, function() {
        this.remove();
      });
    }
    console.log('[#endClose] : Restore body styles');
    $body.css(restorableProperties);

    if (properties.hasOwnProperty('userAfterClose') &&
        properties.userAfterClose !== undefined) {
      console.log('[#endClose] : Before call user\'s afterClose');
      properties.userAfterClose();
      console.log('[#endClose] : End call user\'s afterClose');
    }

    isClosing = false;

    // Reset Properties
    properties = {};
    console.log('[#endClose] : End');
  };

  /**
   *
   */
  doOpen = function() {
    console.log('[#doOpen] : Begin');
    $modal.show('400', function() {
      endOpen();
    });
    console.log('[#doOpen] : End');
  };

  /**
   *
   */
  doClose = function() {
    console.log('[#doClose] : Begin');
    $modal.hide('400', function() {
      endClose();
    });
    console.log('[#doClose] : End');
  };

  /**
   * Event when overlay clicked
   * @param  {[type]} event overlay click function
   */
  clickOverlay = function(event) {
    event.preventDefault();
    if (properties.overlayOptions.closeWhenClick) {
      startClose();
    }
  };

  // Public Methods
  /**
   * @param  {*} args - It is initialize parames, will set properties
   */
  open = function(args) {
    console.log('[#Open] Begin');
    validateProperties(args);
    startOpen();
    console.log('[#Open] End');
  };

  return {
    open: open
  };
};
