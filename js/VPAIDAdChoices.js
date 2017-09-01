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
