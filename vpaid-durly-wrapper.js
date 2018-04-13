(function () {
    var vars = window.location.search.substring(1).split(";");
    var coid = getQueryVariable('coid');
    var nid = getQueryVariable('nid');
    var ad_w = getQueryVariable('ad_w');
    var ad_h = getQueryVariable('ad_h');
    var position = getQueryVariable('position');
    var vast = getQueryVariable('vast');

    var durlyScript = document.createElement("SCRIPT");
    durlyScript.setAttribute("data-name", "durly");
    //durlyScript.setAttribute("src", "//dev.betrad.com/durly.js?;coid=" + coid + ";nid=" + nid + ";ad_w=122;ad_h=20;position=" + position + ";vast=" + vast);
    durlyScript.setAttribute("src", "//mconnor.github.io/notice-js-mike/surly/durly.js?;coid=" + coid + ";nid=" + nid + ";ad_w=122;ad_h=20;position=" + position + ";vast=" + vast);
    document.body.appendChild(durlyScript);

    function getQueryVariable(variable) {
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
      }
      return (false);
    }
  })();