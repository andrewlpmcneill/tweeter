// This file contains all the logic around manipulating DOM elements,
// hiding and unhiding elements, and general set up

$(document).ready(function() {

  // Immediately set error messages, alternative icons, and "to top" functionality to :hidden
  $('.error').hide();
  $('.fa-angle-double-up').hide();
  $('.to-top').hide();

  // Logic for text area's character counter
  $('#tweet-text').on('input', function() {
    $('.error').hide();
    let scrollHeight = $('#tweet-text').get(0).scrollHeight;
    $('#tweet-text').css('height', scrollHeight + 'px');
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

  // When user scrolls on the page, show an element that, when clicked, will take them back to the top
  $(window).scroll(function() {
    // Un-hide 'to top' icon
    $('.to-top').fadeIn();
    // If the user is at the top of the page, hide the icon again
    if ($(window).scrollTop() === 0) {
      $('.to-top').fadeOut(350);
    }
  });
  
  // When the 'to top' icon is clicked, scroll to the top of the page
  $('.footer-icon').on('click', function() {
    $('html').animate({
      scrollTop: 0
    }, "slow");
  });
  
});