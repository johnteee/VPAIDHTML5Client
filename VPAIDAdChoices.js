(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// @ts-check
var VPAIDAdChoices = function () {
  var durlyParmaString = getParamsFromMyScript("VPAIDAdChoices");
  var paramArr = durlyParmaString.split(";");
  var dstart = 0;
  dstart = parseInt(pullValue("delay_start", paramArr, "="));
  // strip off delay param... we will delay durly rather than ba.  Give VPAID a chance to fire up
  paramArr = removeParam("delay_start", paramArr);

  var _iframes = toArray(document.getElementsByTagName("iframe"));
 
  for (var j = 0; j < _iframes.length; j++) {
    setTimeout(dostuff, dstart*1000, _iframes[j]);
  }
  function dostuff(adIFrame) {
    if (adIFrame.contentWindow.getVPAIDAd && typeof adIFrame.contentWindow.getVPAIDAd === "function") {
      console.log(`we have VPAID  ${adIFrame.clientWidth} , ${adIFrame.clientHeight}` );
      var _contentWindow = adIFrame.contentWindow;
      var durlyScript = document.createElement("SCRIPT");
      durlyScript.setAttribute("type", "text/javascript");
      durlyScript.setAttribute("data-name", "durly");
      if (adIFrame.clientWidth) {
        durlyParmaString = durlyParmaString.concat(";ad_w=" + adIFrame.clientWidth);
      }
      if (adIFrame.clientHeight) {
        durlyParmaString = durlyParmaString.concat(";ad_h=" + adIFrame.clientHeight);
      }
     
      durlyScript.setAttribute("src", "https://mconnor.github.io/notice-js-mike/surly/durly.js?" + durlyParmaString);
      //durlyScript.setAttribute("src", "//c.evidon.com/durly.js?" + durlyParmaString);
     
      _contentWindow.document.body.appendChild(durlyScript); //place it in ad iframe
    } else {
      console.log("NON VPAID IFRAME");
    }
  }

  function removeParam(key, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(key) !== -1) {
        var arr2 = arr.splice(i, 1);
        return arr2;
      }
    }
  } 
  function pullValue(key, arr, delim) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(key) !== -1) {
        return arr[i].split(delim)[1];
      }
    }
  } 
  function getParamsFromMyScript(idname) {
    var _scriptSrc = document.getElementById(idname).src;
    var arr = _scriptSrc.split("?");
    return arr[1];
  }

  function toArray(x) {
    for (var i = 0, a = []; i < x.length; i++) {
      a.push(x[i]);
    }
    return a;
  }
};

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;

},{}]},{},[1])

//# sourceMappingURL=VPAIDAdChoices.js.map
