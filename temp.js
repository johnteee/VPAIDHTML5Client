

(function() {


    console.log(window.frameElement.clientWidth  );
    console.log(window.frameElement.clientHeight );


    var durlyParmaString = document.getElementById("adchoice").src
                                    .split("?")[1];
    var adIFrame = window.frameElement;
    var int = setInterval(checkIFRAMEforVPAID, 3000);

    function checkIFRAMEforVPAID() {
        console.log("checkIFRAMEorVPAID  ");
        if (
            adIFrame.contentWindow.getVPAIDAd &&
            typeof adIFrame.contentWindow.getVPAIDAd === "function"
        ) {
            console.log(" we have VPAID");
            clearInterval(int);
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
        } else {
            console.log("NON VPAID IFRAME");
        }
    }
})();
