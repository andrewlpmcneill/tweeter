/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// eslint-disable-next-line no-undef
$(document).ready(function() {

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
    const time = tweetObj['content']['created_at'];

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


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);
  
});
