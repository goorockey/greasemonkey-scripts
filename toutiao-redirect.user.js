// ==UserScript==
// @name        toutiao-redirect
// @description auto redirect to product url in toutiao.io
// @include     http://toutiao.io/posts/*
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/toutiao-redirect.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/toutiao-redirect.user.js
// @version     1.0
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// ==/UserScript==

var url = document.querySelectorAll('.title a')[0];
if (url && url.href) {
  window.location.replace(url.href);
}
