// ==UserScript==
// @name        next-redirect
// @grant       GM_xmlhttpRequest
// @description auto redirect to product url in next.36kr.com
// @include     /^http://next.36kr.com/posts/[^\/]*$/
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// ==/UserScript==

var url =document.querySelectorAll('.post-url')[0];
if (url && url.href) {
  window.location.replace(url.href);
}
