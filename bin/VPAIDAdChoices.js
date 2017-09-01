(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var VPAIDAdChoices = function() {
  var VPAIDCreative;
  var adIFrame = document.getElementsByTagName("iframe")[0];

  // var _iframes = document.getElementsByTagName("iframe");

  var _iframes = Array.from(document.getElementsByTagName("iframe"));
  //console.log(_iframes);
  _iframes.map((adIFrame) => {
    var fn = adIFrame.contentWindow['getVPAIDAd'];

    if (fn && typeof fn == 'function') {
      VPAIDCreative = fn();
      var _contentWindow = adIFrame.contentWindow;
      var iconW = 70;

      var mydiv = _contentWindow
        .document
        .createElement("div");
      var xpos = VPAIDCreative.getAdWidth() - iconW - 6;

      _contentWindow
        .document
        .body
        .appendChild(mydiv);
      var myIMG = _contentWindow
        .document
        .createElement("img");
      var atag = _contentWindow
        .document
        .createElement("a");

      atag.setAttribute("href", "http://info.evidon.com/more_info/18126");
      atag.setAttribute("target", "_blank");

      myIMG.setAttribute("src", "http://c.betrad.com/geo/c_70.png");
      mydiv.appendChild(atag);
      atag.appendChild(myIMG);
      mydiv.setAttribute("style", `position: absolute; left: ${xpos}px; z-index:10003; margin-top:2px`);

    } else {
      console.log('NON VPAID IFRAME');
    }
  });

};
window.setTimeout(VPAIDAdChoices, 3000);

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;

},{}]},{},[1])

//# sourceMappingURL=VPAIDAdChoices.js.map
