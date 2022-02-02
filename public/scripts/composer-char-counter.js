$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const numCharactersTyped = $(this).val().length;
    const count = 140 - numCharactersTyped;
    const counter = $(this).parent().children('.submission-info').children('.counter');
    counter.val(count);
    if (count < 0) {
      counter.addClass("charactersExceeded");
      return;
    }
    counter.removeClass("charactersExceeded");
  });

});