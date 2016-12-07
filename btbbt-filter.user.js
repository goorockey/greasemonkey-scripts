// ==UserScript==
// @name        btbbt-filter
// @grant       none
// @description filter movies in btbbt.cc
// @include     /^http://(www.)*btbbt.cc/forum-.*$/
// @include     /^http://(www.)*btbtt.la/forum-.*$/
// @include     /^http://(www.)*btbtt.co/forum-.*$/
// @downloadURL https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/btbbt-filter.user.js
// @updateURL   https://raw.githubusercontent.com/goorockey/greasemonkey-scripts/master/btbbt-filter.user.js
// @version     1.0.3
// author       kelvingu616@gmail.com
// github       github.com/goorockey
// @require     http://cdn.staticfile.org/jquery/2.2.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
  // 广告
  $('.out').remove();
  $('.error').remove();


  $('.subject_type').each(function() {
    var $this = $(this);
    var content = $this.text().trim();
    if (content != '[更早]' &&
        content != '[公告]' &&
        content != '[版块公告]' &&
        content != '[会员福利区]') {
      return;
    }

    var table = $this.closest('table');
    if (table) {
      table.next('hr').remove();
      table.remove();
    }
  });
});
