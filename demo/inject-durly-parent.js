(function() {
    var durlyParmaString = document
        .getElementById("adchoice")
        .src.split("?")[1];
    var adIFrame = window.frameElement;
    var durlyScript = document.createElement("SCRIPT");
    durlyScript.setAttribute("type", "text/javascript");
    durlyScript.setAttribute("data-name", "durly");
    if (adIFrame.clientWidth) {
        durlyParmaString = durlyParmaString.concat(
            ";ad_w=" + adIFrame.clientWidth
        );
    }
    if (adIFrame.clientHeight) {
        durlyParmaString = durlyParmaString.concat(
            ";ad_h=" + adIFrame.clientHeight
        );
    }
    durlyParmaString = durlyParmaString.concat(";vpaid=true");
    durlyScript.setAttribute(
        "src",
        "https://dev.betrad.com/durly.js?" + durlyParmaString
    );
    adIFrame.contentWindow.document.body.appendChild(durlyScript);
})();
