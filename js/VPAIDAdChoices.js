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

    var x = adIFrame.contentWindow;
	console.log(x);
    // if (x.document) {
    //   x = adIFrame.document;
    //   // to ensure compability
    // }

    var mydiv = x.document.createElement("div");
    x.document.body.appendChild(mydiv);
    var myIMG = x.document.createElement("img");
    myIMG.setAttribute("src", "http://c.betrad.com/geo/c_70.png");
    myIMG.setAttribute("width", "70");
    myIMG.setAttribute("height", "20");
    //myIMG.setAttribute("onClick","window.location='https://www.google.com'");
    mydiv.appendChild(myIMG);

  }

};
window.setTimeout(VPAIDAdChoices, 3000);

module.exports = VPAIDAdChoices;
window.VPAIDAdChoices = VPAIDAdChoices;
