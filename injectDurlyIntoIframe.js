(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    //var durlyParmaString = getParamsFromMyScript("adchoice");

    var durlyParmaString = document.getElementById("adchoice").src
                                    .split("?")[1];

    var adIFrame = document.getElementsByTagName("iframe")[0];

    var int = setInterval(checkIFRAMEforVPAID, 3000);

    function checkIFRAMEforVPAID() {
        console.log("checkIFRAMEorVPAID  ");
        if (
            adIFrame.contentWindow.getVPAIDAd &&
            typeof adIFrame.contentWindow.getVPAIDAd === "function"
        ) {
            console.log(" we have VPAID");
            clearInterval(int);

            var _contentWindow = adIFrame.contentWindow;
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
                //"https://staging.betrad.com/durly.js" +
                "https://dev.betrad.com/durly.js?" + durlyParmaString
            );
            _contentWindow.document.body.appendChild(durlyScript); //place it in ad iframe
        } else {
            console.log("NON VPAID IFRAME");
        }
    }

   
})();

},{}]},{},[1])

//# sourceMappingURL=injectDurlyIntoIframe.js.map
