$(function() {
  $("button[data-role='modal:open']").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
      userCancel: function(){
        alert('Cancel !!');
      },
      userSubmit: function(){
        alert('submit !!');
      },
      useBackdropOvelay: true,
      overlayOptions: {
        opacity: 0.8,
        duration: 400,
        color: 'black',
        closeWhenClick: true
      },
      scrollableBackgroud: false,
    });
  });
});
