VPAIDHTML5Client

This is a VPAID compliant player that has been forked. What is new here is VPAIDChoices.js.
This script polls iframes on the page, test for VPAID content, gets the ad dimensions, and then drops durly.js into it.

The rest of the notes are in regards to the VPAID ad player.

Mike Connor


================
[![bitHound Score](https://www.bithound.io/github/MailOnline/VPAIDHTML5Client/badges/score.svg)](https://www.bithound.io/github/MailOnline/VPAIDHTML5Client/master)
[![Code Climate](https://codeclimate.com/github/MailOnline/VPAIDHTML5Client/badges/gpa.svg)](https://codeclimate.com/github/MailOnline/VPAIDHTML5Client)
[![Test Coverage](https://codeclimate.com/github/MailOnline/VPAIDHTML5Client/badges/coverage.svg)](https://codeclimate.com/github/MailOnline/VPAIDHTML5Client/coverage)
[![Build Status](https://travis-ci.org/MailOnline/VPAIDHTML5Client.svg?branch=master)](https://travis-ci.org/MailOnline/VPAIDHTML5Client)
[![devDependency Status](https://david-dm.org/Mailonline/VPAIDHTML5Client/dev-status.svg)](https://david-dm.org/Mailonline/VPAIDHTML5Client#info=devDependencies)

Note on fork
-----
I forked this code to start with a VPAID player and added code to add the AdChoices icon.
-- Mike Connor


About
-----
JS iframe wrapper for [VPAID](http://www.iab.net/vpaid).

[VPAID](http://www.iab.net/vpaid) or *Video Player Ad-Serving Interface Definition*, establishes a common interface between video players and ad units, enabling a rich interactive in-stream ad experience.

The goals of **VPAIDHTML5Client** are:
  - common interface for VPAID in different technologies [HTML5](https://github.com/MailOnline/VPAIDHTML5Client) and [FLASH](https://github.com/MailOnline/VPAIDFLASHClient).
  - handle how to load the VPAID adUnit
  - be a simple and "stupid" implementation of VPAID

check [videosjs-vast-vpaid](https://github.com/MailOnline/videojs-vast-vpaid) if you need VPAID in [videojs](https://github.com/videojs/video.js)

JS
--

The project uses:
  - [gulpjs](http://gulpjs.com/) to compile.

TODO
----
  - test how will work with a real ad in the demo and test
  - try to use the slot element inside the iframe to see if the ad's will not mess the css of the page
  - validate better if the postmessage and iframe works across browsers


Running the project
-------------------

  - install nodejs and gulp
  - `npm install` to install all dependencies
  - `gulp serve` or `npm start` to start build script and a demo page should be open in default browser
  - `gulp` to watch, bundle and run tests
  - `npm test` or `gulp test:ci` task used by the server
  - `gulp deploy:demo` task used to update githubpage with demo and bin


Example of the usage
--------------------

```javascript

var vpaid = new VPAIDHTML5Client(el, video, {});
vpaid.loadAdUnit('vpaidAdURL.js', onLoad);

function onLoad(err, adUnit) {
    if (err) return;

    adUnit.subscribe('AdLoaded', onInit);
    adUnit.subscribe('AdStarted', onStart);

    adUnit.handshakeVersion('2.0', onHandShake);

    function onHandShake(error, result) {
        adUnit.initAd(480, 360, 'normal', -1, {AdParameters: currentAd.adParameters}, {});
    }

    function onInit() {
        adUnit.startAd();
    }

    function onStart() {
        console.log('-> AdStarted');
    }

}

```

License
-------
licensed under the MIT License, Version 2.0. [View the license file](LICENSE.md)

Copyright &copy; 2015 MailOnline
