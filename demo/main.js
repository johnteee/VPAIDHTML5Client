(function(){

  var el = document.getElementById("ad");
  var video = document.getElementById("myVideo");
  var skipAd = document.getElementById("skipAd");
  

  var adParamUrlString = document.getElementById("main").src;

  var vpaid = new VPAIDHTML5Client(el, video, adParamUrlString
     );
  var urls = [
    {
      url: "//cdn-assets.brainient.com/2015/mailonline_example/vpaid.js",
      //url: '//pixel.adsafeprotected.com/IASVideo.js?anId=9642&ias_ad_duration=21&advId=$%7BADV_ID%7D&campId=$%7BCP_ID%7D&pubId=$%7BSELLER_MEMBER_ID%7D&placementId=$%7BCREATIVE_ID%7D&adsafe_par&impId=$%7BAUCTION_ID%7D&bidurl=$%7BREFERER_URL_ENC%7D&originalVast=https://bs.serving-sys.com/Serving/adServer.bs?c=23&cn=display&pli=1074145329&ord=%5Btimestamp%5D',
      adParameters: ""
    },
    {
      url: "//mconnor.github.io/vpaidExamples/playVideo/VpaidVideoAd.js",
      adParameters: JSON.stringify({
        videos: [
          {
            url: "http://video.webmfiles.org/big-buck-bunny_trailer.webm",
            mimetype: "video/webm"
          },
          {
            url:
              "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
            mimetype: "video/mp4"
          }
        ],
        clickThru: {
          playerHandles: false,
          trackID: 123,
          url: "http://www.dailymail.com"
        }
      })
    }
  ];
  
  function getRandomAd() {
    //return urls[Math.round( (urls.length - 1) * Math.random())];
    return urls[1];
  }
  
  var currentAd = getRandomAd();
  
  vpaid.loadAdUnit(currentAd.url, onLoad);
  
  function onLoad(err, adUnit) {
    if (err) {
      console.log(err);
      return;
    }
  
    adUnit.subscribe("AdLoaded", onInit);
  
    [
      "AdStopped",
      "AdSkipped",
      "AdSizeChange",
      "AdLinearChange",
      "AdDurationChange",
      "AdExpandedChange",
      "AdRemainingTimeChange", // [Deprecated in 2.0] but will be still fired for backwards compatibility
      "AdVolumeChange",
      "AdImpression",
      "AdVideoStart",
      "AdVideoFirstQuartile",
      "AdVideoMidpoint",
      "AdVideoThirdQuartile",
      "AdVideoComplete",
      "AdInteraction",
      "AdUserAcceptInvitation",
      "AdUserMinimize",
      "AdUserClose",
      "AdPaused",
      "AdPlaying",
      "AdLog",
      "AdError"
    ].forEach(function(event) {
      adUnit.subscribe(event, function() {
        console.log(
          "---------------------------------------> " + event,
          "arguments:",
          arguments
        );
      });
    });
  
    adUnit.subscribe("AdSkippableStateChange", function() {
      skipAd.style.display = "block";
      console.log(
        "---------------------------------------> AdSkippableStateChange",
        "arguments:",
        arguments
      );
    });
  
    adUnit.subscribe("AdClickThru", function(clickData) {
      console.log(
        "---------------------------------------> AdClickThru",
        "arguments:",
        arguments
      );
      if (clickData.playerHandles) {
        window.open(clickData.url, "_blank");
      }
    });
  
    adUnit.subscribe("AdStarted", function() {
      console.log("---------------------------------------> AdStarted");
      adUnit.setAdVolume(0);
    });
  
    skipAd.addEventListener("click", function() {
      adUnit.skipAd();
    });
  
    adUnit.handshakeVersion("2.0", onHandShake);
  
    function onHandShake(error, result) {
      console.log("-------------------------------> onHandShake");
      console.log("version:", result);
      adUnit.initAd(
        480,
        360,
        "normal",
        -1,
        {
          AdParameters: currentAd.adParameters
        },
        {},
        function(err) {
          console.log("onHandShake error", err);
        }
      );
    }
  
    function onInit() {
      console.log("------------------------------> AdLoaded");
      adUnit.startAd(function(error) {
        console.log("startAd", error);
      });
    }
  }
  

})();