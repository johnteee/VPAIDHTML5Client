var VPAIDAdChoices = function() {
  var VPAIDCreative;
  var adIFrame = document.getElementsByTagName("iframe")[0];
  var fn = adIFrame.contentWindow['getVPAIDAd'];

  if (fn && typeof fn == 'function') {
    VPAIDCreative = fn();
    console.log('VPAIDCreative +++');
	console.log(VPAIDCreative);
    console.log("_adWidth " + VPAIDCreative._adWidth);
	console.log('getAdWidth ' + VPAIDCreative.getAdWidth());

	console.log("_adHeight " + VPAIDCreative._adHeight);
	console.log('getAdHeight ' + VPAIDCreative.getAdHeight());



  }

};
window.setTimeout(VPAIDAdChoices, 3000);

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;
