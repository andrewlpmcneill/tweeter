$(document).ready(function() {
  
  $('#tweet-text').on('input', null, function() {
    const numCharactersTyped = $(this).val().length;
    const count = 140 - numCharactersTyped;
    const counter = $(this).parent().children('.submission-info').children('.counter');
    $(counter).html(String(count));
    if (count < 0) {
      $(counter).addClass("charactersExceeded");
      return;
    }
    $(counter).removeClass("charactersExceeded");
  });

});