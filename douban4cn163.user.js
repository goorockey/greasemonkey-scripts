// ==UserScript==
// @name        douban4cn163
// @grant       GM_xmlhttpRequest
// @description douban score for cn163.net movies
// @include     http://cn163.net/archives/*
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/douban4cn163.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/douban4cn163.user.js
// @version     1.1.0
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// ==/UserScript==

var DOUBAN_SEARCH_URL = 'https://api.douban.com/v2/movie/search?count=10&q=';
var DOUBAN_MOVIE_URL = 'http://movie.douban.com/subject/';

var getDoubanScore = function (movie_name, callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    url: DOUBAN_SEARCH_URL + movie_name,
    onload: function (res) {
      if (res.status !== 200) {
        return;
      }
      try {
        var data = JSON.parse(res.responseText);
        if (!data || !data.subjects) {
          return callback();
        }

        return callback(data.subjects);
      } catch (e) {
        console.log(e);
      }
    },
  });
};

var insertDataToNode = function(douban_data, targetNode) {
  if (!douban_data || !targetNode) {
    return;
  }

  var score = douban_data.rating.average;
  var link = DOUBAN_MOVIE_URL + douban_data.id;

  var a = document.createElement('a');
  a.appendChild(document.createTextNode(' (豆瓣评分: ' + score + ')'));
  a.href = link;
  a.style.color = 'red';
  a.style.textDecoration = 'underline';

  targetNode.appendChild(a);
};

var insertDoubanScore = function(movie_name, parseDoubanData, targetNode) {
  if (!movie_name) {
    console.log('No movie name get.')
    return;
  }

  if (!targetNode) {
    console.log('No target node to insert data.');
    return;
  }

  getDoubanScore(movie_name, function(data) {
    if (!data) {
      console.log('Failed to fetch douban score data.');
      return;
    }

    var douban_data = parseDoubanData(data);
    if (!douban_data) {
      console.log('Failed to parse douban data.');
      return;
    }

    return insertDataToNode(douban_data, targetNode);
  });
};

//////////////////////////////////////////////

var getMovie = function () {
  var title = document.getElementsByClassName('entry_title') [0].innerHTML;
  var re = /(.+)(第.+季)/; // 格式: 电影名第N季/XXXX
  var m = re.exec(title);

  if (m.length === 3) {
    var name = m[1];
    var season = m[2];
    return {
      name: name,
      season: season,
    };
  }
};

var movie = getMovie();
if (!movie) {
  return;
}

var parseDoubanData = function (data) {
  if (!data) {
    return;
  }

  for (var i = 0; i < data.length; i++) {
    if (data[i].title.indexOf(movie.name) === 0 &&
        data[i].title.indexOf(movie.season) !== -1) {
      return data[i];
    }
  }
};

insertDoubanScore(movie.name,
                  parseDoubanData,
                  document.getElementsByClassName('entry_title')[0]);
