(function() {
    var durlyParmaString = getParamsFromMyScript("VPAIDAdChoices");
    var paramArr = durlyParmaString.split(";");
    var dstart = 0;
    dstart = parseInt(pullValue("delay_start", paramArr, "="));
    // strip off delay param... we will delay durly rather than ba.  Give VPAID a chance to fire up
    paramArr = removeParam("delay_start", paramArr);

    var _iframes = toArray(document.getElementsByTagName("iframe"));

    
    var int = setInterval(checkAllIFrames, 3000);
  
    function checkAllIFrames(){
        for (var j = 0; j < _iframes.length; j++) {
            checkIFRAMEorVPAID( _iframes[j], j)
        }
    }

    function checkIFRAMEorVPAID(adIFrame, j) {
        console.log('CHECKING iframe ' + j);
        if (
            adIFrame.contentWindow.getVPAIDAd &&
            typeof adIFrame.contentWindow.getVPAIDAd === "function"
        ) {
            console.log(j +" we have VPAID");
            _iframes.splice(j, 1);
            if (_iframes.length === 0 ) {
                clearInterval(int);
                console.log('clearInterval');
            }
          
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

            durlyScript.setAttribute(
                "src",
                //"https://staging.betrad.com/durly.js" +
                "https://dev.betrad.com/durly.js?" +
                    durlyParmaString
            );
            _contentWindow.document.body.appendChild(durlyScript); //place it in ad iframe
        } else {
            console.log("NON VPAID IFRAME");
        }
    }

    function removeParam(key, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(key) !== -1) {
                var arr2 = arr.splice(i, 1);
                return arr2;
            }
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
})();
