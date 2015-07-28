// ==UserScript==
// @name        douban4xuandy
// @grant       GM_xmlhttpRequest
// @description douban score for www.xuandy.com movie
// @include     http://www.xuandy.com/movie/*
// @include     http://www.xuandy.com/television/*
// @include     http://www.xuandy.com/video/*
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/douban4xuandy.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/douban4xuandy.user.js
// @version     1.1.0
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// ==/UserScript==

var douban_search_url = 'https://api.douban.com/v2/movie/search?count=10&q=';
var douban_movie_url = 'http://movie.douban.com/subject/';

var insertDoubanScore = function(douban_data) {
    if (douban_data === undefined) {
        return;
    }

    var score = douban_data.rating.average;
    var link = douban_movie_url + douban_data.id;

    var a = document.createElement('a');
    a.appendChild(document.createTextNode('豆瓣评分: ' + score));
    a.href = link;
    a.style.color = 'red';
    a.style.textDecoration = 'underline';

    document.getElementsByClassName('postmeat')[0].appendChild(a);
};

var parseDoubanData = function (movie_name, data) {
    if (!data || !data.subjects) {
        return ;
    }

    data = data.subjects;
    for (var i = 0; i < data.length; i++) {
        if (data[i].title === movie_name) {
            return data[i];
        }
    }
};

var getDoubanScore = function (movie_names, callback) {
  var index = 0;

  var doGetDoubanScore = function(movie_name) {
    if (index >= movie_names.length) {
      return;
    }

    GM_xmlhttpRequest({
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        url: douban_search_url + movie_name,
        onload: function (res) {
            if (res.status === 200) {
              try {
                  var data = JSON.parse(res.responseText);
                  return callback(parseDoubanData(movie_name, data));
              } catch (e) {
                  console.log(e);
              }
            }

            doGetDoubanScore(movie_names[++index]);
        },
    });
  }

  doGetDoubanScore(movie_names[index]);
};

var getMovieName = function () {
    var title = document.getElementsByClassName('post') [0].childNodes[1].innerHTML;
    var re = /\u300A(.*)\u300B/; // 格式: 《电影名/电影名2/...》
    var m = re.exec(title);
    if (!m) {
        return ;
    }
    return m[1].split('/');
};

getDoubanScore(getMovieName(), insertDoubanScore);
