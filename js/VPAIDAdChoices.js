var VPAIDAdChoices = function () {
  var durlyParmaString = getParamsFromMyScript("VPAIDAdChoices");

  var arr = durlyParmaString.split(";");
  
  var dstart = 0;
  dstart = parseInt(pullValue("delay_start", arr, "="));
  var _iframes = toArray(document.getElementsByTagName("iframe"));
 
  for (var j = 0; j < _iframes.length; j++) {
    //dostuff(_iframes[j]);
    setTimeout(dostuff, dstart*1000, _iframes[j]);
  }
  function dostuff(adIFrame) {
    
    if (adIFrame.contentWindow.getVPAIDAd && typeof adIFrame.contentWindow.getVPAIDAd === "function") {
      console.log("we have VPAID");
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
      //durlyScript.setAttribute('src', "./notice-js/surly/durly.js?" + durlyParmaString);
      durlyScript.setAttribute("src", "https://c.evidon.com/durly.js?" + durlyParmaString);
      
      _contentWindow.document.body.appendChild(durlyScript); //place it in ad iframe
    } else {
      console.log("NON VPAID IFRAME");
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
