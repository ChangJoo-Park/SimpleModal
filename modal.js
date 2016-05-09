/* global $:true */

/**
 * My Modal Library
 * @param {selector} - selected Button
 * @return {Object} - sets of functions
 */
var MyModal = function(selector) {
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
  function setProperties(args, props) {
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
  function validateProperties(args) {
    if (args === undefined || args === null || Object.keys(args).length === 0) {
      console.log('Has no args');
      return;
    }
    setProperties(args);
  }

  /**
   *
   */
  function startOpen() {
    if (isOpening) {
      return;
    }
    isOpening = true;
    console.log('Super -- Before Open !!');

    // save body properties
    restorableProperties = {
      overflow: $body.css('overflow')
    };

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

    // handle overlay
    if (properties.useBackdropOvelay === true) {
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
      console.log('Not set overlay');
      doOpen();
    }
  }

  /**
   *
   */
  function endOpen() {
    console.log('Super -- After Open !!');
    if (properties.useBackdropOvelay === true) {
      $($overlay).click(clickOverlay);
    }

    // handle close modal button
    $('*[data-role="modal:container"] [data-dismiss="modal"]')
    .click(function(event) {
      event.preventDefault();
      startClose();
    });

    if (properties.hasOwnProperty('userAfterOpen') &&
        properties.userAfterOpen !== undefined) {
      console.log('+User --- After Open !!');
      properties.userAfterOpen();
    }

    isOpening = false;
  }

  /**
   *
   */
  function startClose() {
    if (isClosing) {
      console.log('Start Close Block');
      return;
    }
    isClosing = true;

    if (properties.useBackdropOvelay === true) {
      $($overlay).off();
    }

    // handle close modal button
    $('*[data-role="modal:container"] [data-dismiss="modal"]').off();

    console.log('Super -- Before Close !!');
    if (properties.hasOwnProperty('userBeforeClose') &&
        properties.userBeforeClose !== undefined) {
      console.log('+User --- Before Close !!');
      properties.userBeforeClose();
    }
    doClose();
    return;
  }

  /**
   *
   */
  function endClose() {
    console.log('Super -- After Close !!');

    if (properties.useBackdropOvelay === true) {
      console.log('opacity');
      $overlay.animate({
        opacity: 0
      }, properties.overlayOptions.duration, function() {
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

    isClosing = false;
  }

  /**
   *
   */
  function doOpen() {
    $modal.animate({
      opacity: 1,
      transform: 'scale(0) rotate(720deg)'
    },
      300, function() {
        endOpen();
      });
  }

  /**
   *
   */
  function doClose() {
    console.log('Close !!');
    $modal.animate({
      opacity: 0},
      300, function() {
        endClose();
      });
  }

  /**
   * Event when overlay clicked
   * @param  {[type]} event overlay click function
   */
  function clickOverlay(event) {
    event.preventDefault();
    if (properties.overlayOptions.closeWhenClick) {
      close();
    }
  }

  // Public Methods
  /**
   * @param  {*} args - It is initialize parames, will set properties
   */
  function open(args) {
    validateProperties(args);
    startOpen();
  }

  /**
   *
   */
  function close() {
    startClose();
  }

  return {
    open: open,
    close: close
  };
};
