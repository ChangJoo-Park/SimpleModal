var SimpleModal=function(e){var o={userBeforeOpen:void 0,userAfterOpen:void 0,userBeforeClose:void 0,userAfterClose:void 0,userCancel:void 0,userSubmit:void 0,useBackdropOvelay:!0,overlayOptions:{opacity:.95,duration:300,color:"black",closeWhenClick:!1},scrollableBackgroud:!1},r=o,n=$("body"),s='<div class="modal-overlay"></div>',t={},a=$($(e).data("target")),l={overflow:n.css("overflow")},i=!1,c=!1;return setProperties=function(e,o){var n=o;void 0!==n&&null!==n||(n=r),Object.keys(e).forEach(function(o){n.hasOwnProperty(o)&&("object"==typeof e[o]?setProperties(e[o],n[o]):n[o]=e[o])})},validateProperties=function(e){void 0!==e&&null!==e&&0!==Object.keys(e).length&&setProperties(e)},startOpen=function(){if(!i){if(i=!0,l={overflow:n.css("overflow")},r.scrollableBackgroud);else{var e={overflow:"hidden"};n.css(e)}r.useBackdropOvelay===!0?0===$("body").find(".modal-overlay").length&&(n.append(s),t=$(".modal-overlay"),t.css("background-color",r.overlayOptions.color),t.animate({opacity:r.overlayOptions.opacity},r.overlayOptions.duration,function(){doOpen()})):doOpen(),r.hasOwnProperty("userBeforeOpen")&&void 0!==r.userBeforeOpen&&r.userBeforeOpen()}},endOpen=function(){r.useBackdropOvelay===!0&&$(t).click(clickOverlay),$('*[data-role="modal:container"] [data-dismiss="modal"]').click(function(e){e.preventDefault(),r.hasOwnProperty("userCancel")&&void 0!==r.userCancel&&r.userCancel(),startClose()}),$('*[data-role="modal:container"] [data-submit="modal"]').click(function(e){e.preventDefault(),r.hasOwnProperty("userSubmit")&&void 0!==r.userSubmit&&r.userSubmit(),startClose()}),r.hasOwnProperty("userAfterOpen")&&void 0!==r.userAfterOpen&&r.userAfterOpen(),i=!1},startClose=function(){c||(c=!0,r.useBackdropOvelay===!0&&$(t).off(),$('*[data-role="modal:container"] [data-dismiss="modal"]').off(),r.hasOwnProperty("userBeforeClose")&&void 0!==r.userBeforeClose&&r.userBeforeClose(),doClose())},endClose=function(){r.useBackdropOvelay===!0&&t.animate({opacity:0},r.overlayOptions.duration,function(){this.remove()}),n.css(l),r.hasOwnProperty("userAfterClose")&&void 0!==r.userAfterClose&&r.userAfterClose(),c=!1},doOpen=function(){a.show("400",function(){endOpen()})},doClose=function(){a.hide("400",function(){endClose()})},clickOverlay=function(e){e.preventDefault(),r.overlayOptions.closeWhenClick&&close()},close=function(){startClose()},open=function(e){validateProperties(e),startOpen()},{open:open}};