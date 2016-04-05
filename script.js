$(document).ready(function() {

  $(function() {
    // OPEN---- modal
    $('[data-popup-open]').on('click', function(e) {
      var targeted_popup_class = $(this).attr('data-popup-open');
      $('[data-popup="' + targeted_popup_class + '"]').fadeIn(1000);

      e.preventDefault();
    });

    // CLOSE---- modal
    $('[data-popup-close]').on('click', function(e) {
      var targeted_popup_class = $(this).attr('data-popup-close');
      $('[data-popup="' + targeted_popup_class + '"]').fadeOut(1000);

      e.preventDefault();
    });
  });
});

