$(document).ready(function() {

  $('.error').hide();
  $('.fa-angle-double-up').hide();
  $('.to-top').hide();

  $('#submitTweet').on('submit', (event => {
    event.preventDefault();
    const data = $('#tweet-text');
    if (!data.val()) {
      $('#taEmpty').show();
      return;
    } else if (data.val().length > 140) {
      $('#taOverMax').show();
      return;
    }
    const serializedData = data.serialize();
    $.post("/tweets", serializedData)
      .then(function(data) {
        $("#tweet-text").val('');
        loadTweets('test');
      });
  }));

  $('.new-tweet-toggle').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.fa-angle-double-down').toggle();
    $('.fa-angle-double-up').toggle();
  });

  $(window).scroll(function() {
    $('.to-top').fadeIn();
    if ($(window).scrollTop() === 0) {
      $('.to-top').fadeOut(350);
    }
  });

  $('.footer-icon').on('click', function() {
    $('html').animate({
      scrollTop: 0
    }, "slow");
  });
  
  const renderTweets = tweetArr => {
    tweetArr.forEach(tweet => {
      $('.data-container').prepend(createTweetElement(tweet));
    });
  };

  const createTweetElement = tweetObj => {
    const name = tweetObj['user']['name'];
    const avatar = tweetObj['user']['avatars'];
    const handle = tweetObj['user']['handle'];
    const content = tweetObj['content']['text'];
    const safeContent = escape(content);
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

  const loadTweets = (ifNew) => {
    if (ifNew) {
      $.ajax('/tweets', { method: 'GET' })
        .then(function(data) {
          renderTweets([data[data.length - 1]]);
        });
      return;
    }
    // $('.data-container').empty();
    $.ajax('/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });

  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
  
});
