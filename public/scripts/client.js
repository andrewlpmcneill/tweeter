/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// eslint-disable-next-line no-undef
$(document).ready(function() {

  $('#submitTweet').on('submit', (event => {
    console.log('Handler for submit() called');
    event.preventDefault();
    const data = $('#tweet-text');
    if (!data.val() || data.val().length > 140) {
      alert('Tweet content is empty, or too long');
      return;
    }
    const serializedData = data.serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serializedData
    });

  }));
  
  const renderTweets = tweetArr => {
    tweetArr.forEach(tweet => {
      $('.container').append(createTweetElement(tweet));
    });
  };

  const createTweetElement = tweetObj => {
  
    const name = tweetObj['user']['name'];
    const avatar = tweetObj['user']['avatars'];
    const handle = tweetObj['user']['handle'];
    const content = tweetObj['content']['text'];
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
          <p>${content}</p>
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

  const loadTweets = () => {

    $.ajax('/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });

  };

  loadTweets();
  
});
