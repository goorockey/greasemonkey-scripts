// ==UserScript==
// @name        next-redirect
// @description auto redirect to product url in next.36kr.com
// @include     /^http://next.36kr.com/posts/[^\/]*$/
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/next-redirect.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/next-redirect.user.js
// @version     1.0
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// ==/UserScript==

var url = document.querySelectorAll('.post-url')[0];
if (url && url.href) {
  window.location.replace(url.href);
}
