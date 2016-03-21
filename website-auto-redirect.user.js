// ==UserScript==
// @name        website-auto-redirect
// @description auto redirect to article
// @include     http://next.36kr.com/posts/*
// @include     http://toutiao.io/posts/*
// @include     http://wanqu.co/*
// @exclude     http://wanqu.co/blog/*
// @include     http://v.videohupu.com/*/v*.html
// @include     https://www.producthunt.com/*
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/website-auto-redirect.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/website-auto-redirect.user.js
// @version     1.4
// @grant       none
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// ==/UserScript==

var website_target = {
  'wanqu.co': '//a[@rel="external"]/@href',
  'next.36kr.com': '//a[@class="post-url"]/@href',
  'toutiao.io': '//h3[@class="title"]/a[1]/@href',
  'v.videohupu.com': '//a[@class="play_btn"]/@href',
  'www.producthunt.com': '//main//a[1]/@href',
};

function getUrlByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.STRING_TYPE, null).stringValue;
}

var xpath = website_target[location.host];
if (!xpath) {
  return;
}

var url = getUrlByXpath(xpath);
if (url) {
  window.location.replace(url);
}
