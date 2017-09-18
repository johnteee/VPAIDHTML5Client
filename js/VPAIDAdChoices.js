var VPAIDAdChoices = function() {
  var durlyParmaString = findAdChoicesScript();
  var VPAIDCreative,
    fn;

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
      durlyScript.setAttribute('src', "./notice-js/surly/durly.js?" + durlyParmaString);
      //place it in ad iframe
      _contentWindow
        .document
        .body
        .appendChild(durlyScript);
    } else {
      console.log('NON VPAID IFRAME');
    }
  });

};

function findAdChoicesScript() {
  var _scriptSrc = document.getElementById('VPAIDAdChoices').src;
  var arr = _scriptSrc.split('?');
  return arr[1];
}
window.setTimeout(VPAIDAdChoices, 1000);

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;
