(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var VPAIDAdChoices = function () {
  var durlyParmaString = getParamsFromMyScript('VPAIDAdChoices');
  var VPAIDCreative,
    fn;
  var _iframes = toArray(document.getElementsByTagName("iframe"));
  for (var j = 0; j < _iframes.length; j++) {
    dostuff(_iframes[j]);
  }
  function dostuff(adIFrame) {
    try {
      fn = adIFrame.contentWindow.getVPAIDAd;
    } catch (e) {
      console.log(e.message);
      return;
    }

    if (fn && typeof fn == 'function') {
      // if  VPAID in iframe, inject durly.js
      VPAIDCreative = fn();
      var _contentWindow = adIFrame.contentWindow;
      var durlyScript = document.createElement('SCRIPT');
      durlyScript.setAttribute('type', 'text/javascript');
      durlyScript.setAttribute('data-name', 'durly');
      if (adIFrame.clientWidth) {
        durlyParmaString = durlyParmaString.concat(';ad_w=' + adIFrame.clientWidth);
      }
      if (adIFrame.clientHeight) {
        durlyParmaString = durlyParmaString.concat(';ad_h=' + adIFrame.clientHeight);
      }
     // durlyScript.setAttribute('src', "./notice-js/surly/durly.js?" + durlyParmaString);
      durlyScript.setAttribute('src', "http://c.evidon.com/durly.js?" + durlyParmaString);
      //place it in ad iframe
      _contentWindow
        .document
        .body
        .appendChild(durlyScript);
    } else {
      console.log('NON VPAID IFRAME');
    }
  }

  function getParamsFromMyScript(idname) {
    var _scriptSrc = document.getElementById(idname).src;
    var arr = _scriptSrc.split('?');
    return arr[1];
  }

  function toArray(x) {
    for (var i = 0, a = []; i < x.length; i++)
      a.push(x[i]);
    return a;
  }
};

window.setTimeout(VPAIDAdChoices, 1000);

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;

},{}]},{},[1])

//# sourceMappingURL=VPAIDAdChoices.js.map
