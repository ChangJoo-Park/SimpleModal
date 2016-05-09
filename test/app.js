$(function() {
  $(".noContentButton").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open();
  });

  $(".contentButton").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
      userSubmit: function(){
        alert("Click Submit");
      },
      userCancel: function(){
        alert("Click Cancel");
      },
      overlayOptions: {
        closeWhenClick: false
      }
    });
  });

  $(".whiteOverlay").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
    overlayOptions: {
      color: 'white',
    }
    });
  });

  $(".allEvents").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
      userBeforeOpen: function(){alert("user's BEFORE modal OPEN hook")},
      userAfterOpen: function(){alert("user's AFTER modal OPEN hook")},
      userBeforeClose: function(){alert("user's BEFORE modal CLOSE hook")},
      userAfterClose: function(){alert("user's AFTER modal CLOSE hook")},
    });
  });

  $(".bodyScroll").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
      userBeforeOpen: function(){
        var dummyText = "<div id='dummyText'>";
        for (var i = 0; i < 30; i++) {
          dummyText += "<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>";
        }
        dummyText += "</div>";
        $('body').append(dummyText);
      },
      userAfterClose: function(){
        $('body #dummyText').remove();
      },
      overlayOptions: {
        opacity: 0.50,
        color: 'white',
      },
      scrollableBackgroud: true
    });
  });

  $(".noOverlay").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
      useBackdropOvelay: false,
    });
  });

});
