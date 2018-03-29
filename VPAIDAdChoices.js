(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var adParamUrlString = document.getElementById("adchoice").src;
window.addEventListener("message", onLoad);

function onLoad(e) {
    console.log("onLoad ***********");

    try {
        var result = JSON.parse(e.data);

        var durlyParmaString = adParamUrlString.split("?").splice(1, 1)[0];

        // inject durly
        var durlyScript = document.createElement("SCRIPT");
        durlyScript.setAttribute("type", "text/javascript");
        durlyScript.setAttribute("data-name", "durly");
        // if (adEl.clientWidth) {
        //     durlyParmaString = durlyParmaString.concat(";ad_w=" + adEl.clientWidth);
        // }
        // if (adEl.clientHeight) {
        //     durlyParmaString = durlyParmaString.concat(
        //         ";ad_h=" + adEl.clientHeight
        //     );
        // }
        durlyParmaString = durlyParmaString.concat(";vpaid=true");
        durlyScript.setAttribute(
            "src",
            "https://dev.betrad.com/durly.js?" + durlyParmaString
        );
        document.body.appendChild(durlyScript);
    } catch (err) {
        console.log("error " + err.message);
    }

    return true;
}

},{}]},{},[1])

//# sourceMappingURL=VPAIDAdChoices.js.map
