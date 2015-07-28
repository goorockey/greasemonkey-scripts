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

    document.getElementsByClassName('entry_title')[0].appendChild(a);
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

var getDoubanScore = function (movie_name, callback) {
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
                return callback(parseDoubanData(movie_name, data));
            } catch (e) {
                console.log(e);
            }
        },
    });
};

var getMovieName = function () {
    var title = document.getElementsByClassName('entry_title') [0].innerHTML;
    var re = /(.*)第.+季节/; // 格式: 电影名第N季/XXXX
    var m = re.exec(title);
    if (!m) {
        return ;
    }
    var movie_name = m[1];
    return movie_name;
};

getDoubanScore(getMovieName(), insertDoubanScore);
