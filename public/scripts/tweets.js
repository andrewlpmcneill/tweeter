// This file contains all of the functions tasked with submitting, assembling,
// POSTing, GETting, and rendering user's tweets

$(document).ready(function() {
  
  // When new tweet submit button is clicked
  $('#submitTweet').on('submit', (event => {
    // Stop default form submission behaviour, handle with jQuery instead
    event.preventDefault();
    const data = $('#tweet-text');
    // If tweet text area is empty, or over 140 characters, send an error message
    if (!data.val()) {
      $('#taEmpty').show();
      return;
    } else if (data.val().length > 140) {
      $('#taOverMax').show();
      return;
    }
    // Serialize data as a string in URL-encoded notation before posting
    const serializedData = data.serialize();
    $.post("/tweets", serializedData)
      .then(function(data) {
        // Clear the text area, reset the counter
        $("#tweet-text").val('');
        $('.counter').val(140);
        // Call loadTweets with a Truthy value as parameter
        // This is because loadTweets has slightly different functionality if tweet is new
        loadTweets('new');
      });
  }));

  // When the nav-bar's 'create tweet' is clicked
  $('.new-tweet-toggle').on('click', function() {
    // Capture boolean state of new tweet form; currently hidden is true, shown is false
    const state = $('.new-tweet').is(':hidden');
    // Hide or unhide new tweet form, hide or unhide icon on nav-bar
    $('.new-tweet').slideToggle();
    $('.fa-angle-double-down').toggle();
    $('.fa-angle-double-up').toggle();
    // If new tweet form was hidden before this click, put form in focus
    if (state) {
      $('html').animate({
        // Go an extra 100px above jQuery's 'focus' - it's not enough
        scrollTop: $('.container').offset().top - 100
      }, "slow");
    }
  });

  // Processes each tweet in the database individually, sending each to createTweetElement
  // Prepends instead of appends so that newest tweets appear at the top
  const renderTweets = tweetArr => {
    tweetArr.forEach(tweet => {
      $('.data-container').prepend(createTweetElement(tweet));
    });
  };

  // Uses template literals to create tweet in HTML
  const createTweetElement = tweetObj => {
    const name = tweetObj['user']['name'];
    const avatar = tweetObj['user']['avatars'];
    const handle = tweetObj['user']['handle'];
    // Prevents XSS with an escape function
    const content = tweetObj['content']['text'];
    const safeContent = escape(content);
    // Ultimately uses timeago library for date processing
    const time = tweetObj['created_at'];

    const output = `<article class="tweet-container">
        <header>
          <div>
            <img src="${avatar}">
            <h4>${name}</h4>
          </div>
          <div>
            <p class="handle">${handle}</p>
          </div>
        </header>
        <div class="tweet-body">
          <p>${safeContent}</p>
        </div>
        <footer>
          <div class="date">
            <span>${timeago.format(time)}</span>
          </div>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`;
  
    return output;
  };

  // Fetches tweets from database using AJAX, passes them to render function as an array
  const loadTweets = (ifNew) => {
    // If a parameter is passed, only the most recent tweet is passed to be rendered
    if (ifNew) {
      $.ajax('/tweets', { method: 'GET' })
        .then(function(data) {
          renderTweets([data[data.length - 1]]);
        });
      return;
    }
    // Otherwise, all of the tweets in data are passed to be rendered
    $.ajax('/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });

  };

  // Escape function, used to prevent XSS in createTweetElements
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Initial loading of tweets, on page load
  loadTweets();

});