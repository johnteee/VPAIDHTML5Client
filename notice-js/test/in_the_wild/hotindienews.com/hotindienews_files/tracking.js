if (!window.FB) {
  FB = {};
}

FB.trackConversion = function(params) {
  // no http or https so browser will use protocol of current page
  // see http://www.faqs.org/rfcs/rfc1808.html
  var g = FB.guid();
  var u = "//ah8.facebook.com/impression.php/" + g + "/";
  var i = new Image(1, 1);
  var s = [];

  for (var k in params) {
    s.push(encodeURIComponent(k).toLowerCase() +
           '=' + encodeURIComponent(params[k]));
  }

  u += '?' + s.join('&');
  i.src = u;
};

FB.guid = function() {
  return 'f' + (Math.random() * (1<<30)).toString(16).replace('.', '');
}

//Legacy support
if (!FB.Insights) {
    FB.Insights = {};
}
if (!FB.Insights.impression) {
    FB.Insights.impression = FB.trackConversion;
}
