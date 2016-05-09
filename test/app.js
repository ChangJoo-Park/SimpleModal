$(function() {
  $("button[data-role='modal:open']").click(function(event) {
    var modal = new SimpleModal(this);
    modal.open({
      useBackdropOvelay: true,
      overlayOptions: {
        opacity: 0.8,
        duration: 400,
        color: 'black',
        closeWhenClick: false
      },
      scrollableBackgroud: false,
    });
  });
});
