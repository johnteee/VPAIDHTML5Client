var VPAIDAdChoices = function () {
  console.log("VPAIDAdChoices");

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

    if (fn && typeof fn === 'function') {
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
     //durlyScript.setAttribute('src', "./notice-js/surly/durly.js?" + durlyParmaString);
      durlyScript.setAttribute('src', "https://c.evidon.com/durly.js?" + durlyParmaString);
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

window.setTimeout(VPAIDAdChoices, 2000);
module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;
