(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var VPAIDAdChoices = function() {
  var VPAIDCreative, fn;
  var _iframes = Array.from(document.getElementsByTagName("iframe"));
  _iframes.map((adIFrame) => {
	try {
		fn = adIFrame.contentWindow['getVPAIDAd'];
	} catch (e) {
		console.log(e.message);
		return;
	}

    if (fn && typeof fn == 'function') {
      VPAIDCreative = fn();
		var _contentWindow = adIFrame.contentWindow;
    	var durlyScript = document.createElement('SCRIPT');
		durlyScript.setAttribute('type', 'text/javascript');
		durlyScript.setAttribute('data-name', 'durly');
		durlyScript.setAttribute('src', "./notice-js/surly/durly.js?;coid=242;nid=64545;ad_w=300;ad_h=250;");
			 //place it in ad iframe
		_contentWindow.document.body.appendChild(durlyScript);
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
