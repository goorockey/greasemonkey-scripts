// ==UserScript==
// @name        douban4cn163
// @grant       GM_xmlhttpRequest
// @description douban score for cn163.net movies
// @include     http://cn163.net/archives/*
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/douban4cn163.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/douban4cn163.user.js
// @version     1.0
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
    a.appendChild(document.createTextNode(' (豆瓣评分: ' + score + ')'));
    a.href = link;
    a.style.color = 'red';
    a.style.textDecoration = 'underline';

    document.getElementsByClassName('entry_title')[0].appendChild(a);
};

var parseDoubanData = function (movie_name, movie_season, data) {
    if (!data || !data.subjects) {
        return ;
    }

    data = data.subjects;
    for (var i = 0; i < data.length; i++) {
        if (data[i].title.indexOf(movie_name) === 0 &&
            data[i].title.indexOf(movie_season) !== -1) {
            return data[i];
        }
    }
};

var getDoubanScore = function (movie_name, movie_season, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        url: douban_search_url + movie_name,
        onload: function (res) {
            if (res.status !== 200) {
                return;
            }
            try {
                var data = JSON.parse(res.responseText);
                return callback(parseDoubanData(movie_name, movie_season, data));
            } catch (e) {
                console.log(e);
            }
        },
    });
};

var getMovie = function () {
    var title = document.getElementsByClassName('entry_title') [0].innerHTML;
    var re = /(.+)(第.+季)/; // 格式: 电影名第N季/XXXX
    var m = re.exec(title);

    if (m.length === 3) {
      var name = m[1];
      var season = m[2];
      return [name, season];
    }
};

var movie = getMovie();
if (movie) {
  getDoubanScore(movie[0], movie[1], insertDoubanScore);
}

