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
		durlyScript.setAttribute('src', "./notice-js/surly/durly.js?;coid=242;nid=64545;ad_w=480;ad_h=360;");
			 //place it in ad iframe
		_contentWindow.document.body.appendChild(durlyScript);
    } else {
      console.log('NON VPAID IFRAME');
    }
  });

};
window.setTimeout(VPAIDAdChoices, 2000);

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;
