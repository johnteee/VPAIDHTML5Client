var BAP = (function () {
    var API = {}
        , SCRIPT_VERSION = 1, // increment this on script changes so we can track through the sewer
        /* NON_PROD */
        logging = true
        , /* NON_PROD */
        detection = 'on'
        , sizes = [{
            i: 1
            , w: 300
            , h: 250
            , m: 0
        }, {
            i: 15
            , w: 728
            , h: 90
            , m: 0
        }, {
            i: 30
            , w: 300
            , h: 50
            , m: 1
        }, {
            i: 53
            , w: 320
            , h: 50
            , m: 1
        }, {
            i: 55
            , w: 216
            , h: 36
            , m: 1
        }, {
            i: 16
            , w: 160
            , h: 600
            , m: 1
        }, {
            i: 57
            , w: 120
            , h: 20
            , m: 1
        }, {
            i: 17
            , w: 120
            , h: 600
            , m: 1
        }, {
            i: 8
            , w: 468
            , h: 60
            , m: 1
        }, {
            i: 9
            , w: 234
            , h: 60
            , m: 0
        }, {
            i: 80
            , w: 320
            , h: 48
            , m: 1
        }, {
            i: 141
            , w: 480
            , h: 75
            , m: 1
        }, {
            i: 199
            , w: 480
            , h: 320
            , m: 0
        }, {
            i: 200
            , w: 320
            , h: 480
            , m: 0
        }, {
            i: 201
            , w: 1048
            , h: 768
            , m: 0
        }, {
            i: 202
            , w: 768
            , h: 1048
            , m: 0
        }, {
            i: 213
            , w: 320
            , h: 350
            , m: 0
        }, {
            i: 212
            , w: 320
            , h: 320
            , m: 0
        }, {
            i: 211
            , w: 120
            , h: 30
            , m: 1
        }, {
            i: 210
            , w: 168
            , h: 42
            , m: 1
        }, {
            i: 56
            , w: 168
            , h: 28
            , m: 1
        }, {
            i: 208
            , w: 300
            , h: 75
            , m: 1
        }, {
            i: 209
            , w: 216
            , h: 54
            , m: 1
        }, {
            i: 215
            , w: 100
            , h: 640
            , m: 1
        }, {
            i: 152
            , w: 300
            , h: 160
            , m: 1
        }, {
            i: 216
            , w: 540
            , h: 338
            , m: 0
        }, {
            i: 217
            , w: 600
            , h: 100
            , m: 1
        }, {
            i: 218
            , w: 600
            , h: 500
            , m: 0
        }, {
            i: 219
            , w: 340
            , h: 496
            , m: 0
        }, {
            i: 220
            , w: 1024
            , h: 768
            , m: 0
        }, {
            i: 221
            , w: 768
            , h: 1024
            , m: 0
        }, {
            i: 222
            , w: 260
            , h: 60
            , m: 1
        }, {
            i: 223
            , w: 240
            , h: 38
            , m: 1
        }, {
            i: 1
            , w: 300
            , h: 600
            , m: 0
        }]
        , skip = []
        , extra = false
        , processed = false
        , rendered = false
        , loaded = false
        , jsonLoaded = false
        , version = '2'
        , treatment = '2'
        , country = 'us'
        , cicon = ''
        , mraid_setup = false
        , BAP = {
            options: {}
        }, // mass shorteners
        // 	this part is automated, see: cleaner.rb
        // _w = window,
        // _e = encodeURIComponent,
        // _o = BAP.options,
        // _n = null,
        // _st = setTimeout,
        // _pi = parseInt,
        // _pf = parseFloat,
        // _tech_ticker = (location.href.indexOf('tech-ticker') >= 0),
        // _l = 'length'
        // _d = document
        // end shorteners
        URL_SCHEME = 'https:', 
        DOMAIN_ROOT = URL_SCHEME + '//c.betrad.com', 
        MORE_INFO_ROOT = 'https://info.evidon.com', 
        DOMAIN_JSON = DOMAIN_ROOT + '/a/', 
        ITUNES_LINK = 'https://itunes.apple.com/us/app/appchoices/id894822870', 
        ANDROID_LINK = 'https://play.google.com/store/apps/details?id=com.DAA.appchoices', 
        INTERSTITIAL_LINK = MORE_INFO_ROOT + '/interstitial/', 
        body = document.getElementsByTagName('body')[0], // error pixels -- this array exists to record a sent error pixel / nid for the purposes of not logging the same error twice
        ep = {}, // iframes on the page and their associated ids
        tangoPartners = {}, // coveredNotices is taken out of BAP.options for the cases when BAP.options notices are removed (iframe and transiotion cases)
        coveredNotices = {}, 
        iX = 0, 
        processTimeout, uniqueids = [], 
        mq = [], 
        frameNoticed = {}, 
        json = {
            queue: {}
        }, 
        nids = {}, 
        log = {}, 
        loadQueue = 0, 
        domain = document.domain, 
        _gdn, browser = function () {
            var ua = navigator.userAgent
                , isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]'
                , safv = navigator.userAgent.substring((navigator.userAgent.indexOf("Version")) + "Version".length + 1);
            try {
                safv = safv.substring(0, safv.indexOf(' '));
            }
            catch (e) {}
            return {
                IE: !!window.attachEvent && !isOpera
                , IE6: ua.indexOf('MSIE 6') > -1
                , IE7: ua.indexOf('MSIE 7') > -1
                , IE8: ua.indexOf('MSIE 8') > -1
                , Opera: isOpera
                , Gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1
                , Safari: ((ua.indexOf('Safari') > -1) && (ua.indexOf('Chrome') <= -1))
                , Chrome: !!navigator.userAgent.match('Chrome')
                , QuirksMode: document.compatMode == 'BackCompat'
                , SafariVersion: safv
            };
        }()
        , ifr = top.location != location
        , /**
         * SWFObject inspired flash detection
         */
        flash = function () {
            var U = 'undefined'
                , SF = 'Shockwave Flash'
                , FMT = 'application/x-shockwave-flash'
                , playerVersion = [0, 0, 0]
                , d = null
                , nav = navigator
                , plugin = false;
            if (typeof nav.plugins != U && typeof nav.plugins[SF] == 'object') {
                d = nav.plugins[SF].description;
                if (d && !(typeof nav.mimeTypes != U && nav.mimeTypes[FMT] && !nav.mimeTypes[FMT].enabledPlugin)) {
                    plugin = true;
                    d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                    playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
                }
            }
            else if (typeof window.ActiveXObject != U) {
                try {
                    var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (a) {
                        d = a.GetVariable("$version");
                        if (d) {
                            d = d.split(" ")[1].split(",");
                            plugin = true;
                            playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                        }
                    }
                }
                catch (e) {}
            }
            return {
                x: plugin
                , v: playerVersion
            };
        }();
    /*
	options: {
		nid: 123,									// Evidon notice id
	 	uqid:	123,								// Generated on page unique page id
	 	icaid: 123,								// Evidon campaign id
	 	ecaid: 123,								// Your own campaign id
	 	coid: 123,								// Evidon company id
	 	aid: 123,									// Evidon advertiser id
	 	ad_h: 123,								// ad height in pixels
	 	ad_w: 123,								// ad width in pixels
	 	ad_wxh: 300x250						// ad width X height
	 	ad_oas: 'WIDTH=160 HEIGHT=600'
	 	position: 'top-left'			// position
	 	ad_z: 2000								// z index to use
	 	container: 'element id'		// will be used as the anchor elemetn for the notice
	 	check_container: true			// if container is used, look into it and select best fitting element AND ad standard
	 	delay_start: 1						// delay processing start by this many seconds
	 	adi: dmd.ehow,dmd.poop		// dfa whitelist
    in_app: 1                 // link to mobile app (default: 0)
    autodetect_in_app: 1      // autodetect wheter to link to mobile app (default: 0)
    appids: '123,456'         // Comma-delimited list of ids to pass along to mobile app 
	}
	*/
    function start(options) {
        var v, i, s, o = {}
            , bap_url, pageId;
        /**
         * Special case that occurs when BAP.start has been called, but BAP has 
         * not loaded or unpacked yet. Specifically covers IE 6-9 for the cases
         * when loading is still going. In this case, we push into _bab array
         * every time that the error occurs during SURLY load. Afterwards, once
         * BAP.start() has been called, we first check if there were unsuccessful
         * previous attempts, and start them if there were.
         */
        try {
            if (!!window._bab) {
                v = window._bab;
                window._bab = null;
                for (i = v.length - 1; i >= 0; i--) {
                    start(v[i]);
                }
            }
        }
        catch (e) {}
        if (options) {
            if (!options.uqid) {
                return;
            }
            else {
                pageId = options.uqid;
                if (BAP.options[pageId]) {
                    return;
                }
            }
            // Convert properties to lower case since we have some odd clients...
            try {
                for (i in options) {
                    if (options.hasOwnProperty(i)) {
                        o[i.toLowerCase()] = options[i];
                    }
                }
                options = o;
            }
            catch (e) {}
            if (options.ad_oas) {
                try {
                    options.ad_oas = options.ad_oas.toLowerCase();
                    options.ad_wxh = options.ad_oas.replace('width=', '').replace('height=', '').replace(' ', 'x');
                }
                catch (e) {}
            }
            if (options.ad_wxh) {
                try {
                    options.ad_wxh = options.ad_wxh.toLowerCase();
                    options.ad_w = options.ad_w || options.ad_wxh.split('x')[0];
                    options.ad_h = options.ad_h || options.ad_wxh.split('x')[1];
                }
                catch (e) {}
            }
            if ((!options.ad_w) || (!options.ad_h)) {
                error(options, 13);
                return;
            }
            options.ns = getAdStandard(options.ad_h, options.ad_w);
            if (options.ns == 0) {
                error(options, 14);
                return;
            }
            options.pixel_ad_w = options.ad_w;
            options.pixel_ad_h = options.ad_h;
            // Point of no errors, add into the processing queue
            uniqueids.push(pageId);
            BAP.options[pageId] = options;
            if (!extra && (((options.check_container) && (options.check_container == "true")) || /^(1525|4501|7420|8573)$/.test(options.nid))) {
                i = document.createElement("script");
                i.src = DOMAIN_ROOT + '/a/e.js';
                body.appendChild(i);
            }
            // autodetect in_app option
            if (!("in_app" in options) && options.autodetect_in_app == 1) {
                var viewport_is_ad_size = options.ad_w + 10 > document.documentElement.clientWidth && document.documentElement.clientWidth > options.ad_w - 10 && options.ad_h + 5 > document.documentElement.clientHeight && document.documentElement.clientHeight > options.ad_h - 5;
                BAP.options[pageId].in_app = (navigator.userAgent.match(/iPhone|iPad|iPod/) != null && navigator.userAgent.indexOf('Safari') == -1) || (navigator.userAgent.indexOf('Android') != -1 && viewport_is_ad_size) ? 1 : 0;
            }
            // link based on in_app
            if (BAP.options[pageId].in_app != 1) {
                BAP.options[pageId].link = (options.link || MORE_INFO_ROOT + '/more_info/' + options.nid);
            }
            else {
                BAP.options[pageId].link = 'evidon://' + options.nid;
                BAP.options[pageId].link += '/' + (options.appids || "");
            }
            bap_url = 'n/' + options.coid + '/' + options.nid;
            BAP.options[pageId].open = (options.open || function (u) {
                var opts = BAP.options[pageId];
                // open link or overlay
                if (opts.display_mobile_overlay && !((opts.ad_h < 50) || (opts.ad_h < 135 && opts.ad_w < 300))) {
                    if (opts.overlayed) {
                        gotoL3(pageId, u);
                    }
                    else {
                        showOverlay(pageId, u);
                    }
                }
                else {
                    if (opts.expanded) {
                        gotoL3(pageId, u);
                    }
                    else {
                        expandIcon(pageId);
                    }
                }
            });
            BAP.options[pageId].positionVertical = function () {
                return this.position.indexOf('top') >= 0 ? 'top' : 'bottom';
            };
            BAP.options[pageId].positionHorizontal = function () {
                return this.position.indexOf('left') >= 0 ? 'left' : 'right';
            };
            if (!nids[pageId]) {
                nids[pageId] = BAP.options[pageId].nid = (options.nid || null);
            }
            BAP.options[pageId].ad_h = parseInt(BAP.options[pageId].ad_h);
            BAP.options[pageId].ad_w = parseInt(BAP.options[pageId].ad_w);
            BAP.options[pageId].dm = -1;
            coveredNotices[pageId] = {};
            if (BAP.options[pageId].icon_display == 'normal') {
                BAP.options[pageId].micon = 'mo_';
            }
            else {
                BAP.options[pageId].micon = 'mi_';
            }
            BAP.options[pageId].miconWidth = 19;
            if ((BAP.options[pageId].ad_h == 36) && (BAP.options[pageId].ad_w == 216)) {
                BAP.options[pageId].icon_display = 'icon';
                BAP.options[pageId].micon = 'mi_12_';
                BAP.options[pageId].miconWidth = 15;
            }
            BAP.options[pageId].ciconWidth = 77;
            if (bap_url) {
                if (!json[options.nid]) {
                    loadQueue++;
                    i = document.createElement("script");
                    i.src = DOMAIN_JSON + bap_url + '.js';
                    body.appendChild(i);
                }
            }
            else {
                // remove whatever we pushed in
                delete BAP.options[pageId];
                error(options, 11);
            }
            // hide the pixel until needed.
            try {
                $('bap-pixel-' + pageId).style.display = 'none';
            }
            catch (e) {}
        }
        else {
            error(null, 10);
        }
        if (!json[BAP.options[pageId].nid]) {
            json.queue[BAP.options[pageId].nid] = json.queue[BAP.options[pageId].nid] || [];
            json.queue[BAP.options[pageId].nid].push(pageId);
        }
        else {
            process();
        }
        // trap when the onload doesn't fire. set to fire 5 seconds after.
        if (processTimeout) {
            clearTimeout(processTimeout);
        }
        processTimeout = setTimeout(process, 5000);
    }
    /**
     * Used in cleaning up notices that became outdated or otherwise not needed.
     */
    function cleanup(pageId) {
        try {
            delete BAP.options[pageId];
            px = $('bap-pixel-' + pageId);
            px.parentNode.removeChild(px);
        }
        catch (e) {}
    }

    function process() {
        function copyOverrides(pageId, key, j) {
            for (j in window.bap_overrides[key]) {
                // if this is a known option, override
                if (BAP.options[pageId].hasOwnProperty(j)) {
                    BAP.options[pageId][j] = window.bap_overrides[key][j];
                }
            }
        }
        if (processed) {
            return;
        }
        processed = true;
        if (window.bap_skip) {
            skip = skip.concat(bap_skip);
        }
        var i, j, s = false;
        _gdn = !!($('abgc') && window.abgp);
        try {
            // Invite partners for a dance!
            tango();
            for (i = 0; i < uniqueids.length; i++) {
                var pageId = uniqueids[i];
                // skip if already processed
                if (BAP.options[pageId].processed) {
                    continue;
                }
                // check the skip list, and pass if its in there
                for (j = 0; j < skip.length; j++) {
                    if ((skip[j] == BAP.options[pageId].nid) || (skip[j] == BAP.options[pageId].nid + '|' + pageId)) {
                        cleanup(pageId);
                        s = true;
                        break;
                    }
                    s = false;
                }
                if (s) {
                    continue;
                }
                // error check so see if this pageId's json is loaded
                if (!json[BAP.options[pageId].nid]) {
                    error(BAP.options[pageId], 12);
                    cleanup(pageId);
                    continue;
                }
                else {
                    // copy json into options
                    copyOptions(pageId, BAP.options[pageId].nid);
                }
                // if we have a global overrides object for notice options
                if (window.bap_overrides && window.bap_overrides.hasOwnProperty(BAP.options[pageId].nid)) {
                    copyOverrides(pageId, BAP.options[pageId].nid);
                }
                // but sometimes, when a very special client shows up, this becomes a local overrider...
                if (window.bap_overrides && window.bap_overrides.hasOwnProperty(BAP.options[pageId].nid + '|' + pageId)) {
                    copyOverrides(pageId, BAP.options[pageId].nid + '|' + pageId);
                }
                if (_gdn) {
                    // overwrite defaults.
                    BAP.options[pageId].position = 'top-right';
                    BAP.options[pageId].icon_display = 'expandable';
                    BAP.options[pageId].server = ({
                        'name': 'Google'
                    });
                    BAP.options[pageId].ad_z = 9011;
                    $('abgc').style.display = 'none';
                }
                // Determine notice detection mode
                noticeMode(pageId);
                // Exit conditions START
                // TODO: wrap into a single method?
                if ((BAP.options[pageId].adi) && (!testWhitelist(pageId))) {
                    cleanup(pageId);
                    continue;
                }
                // Trustee is present and covers this ad.  Skipping.
                if (BAP.options[pageId]._truste) {
                    cleanup(pageId);
                    continue;
                }
                if ((BAP.options[pageId].ad) && (BAP.options[pageId].ad.style.display == 'none')) {
                    // OHMIGODNO, its hidden!
                    cleanup(pageId);
                    continue;
                }
                // Exit if provided container did not have a known ad standard applied to it
                if ((BAP.options[pageId].dm == 8) && (!BAP.options[pageId].ad.ds)) {
                    cleanup(pageId);
                    continue;
                }
                // Exit conditions END
                showNoticeHelper(pageId);
                BAP.options[pageId].processed = true;
            }
            // attaching resize event
            BAP.vs = (frameSize()[0] < body.scrollHeight);
            iX = frameSize()[1];
            addEvent(window, 'resize', resize);
            // movement detection
            setIntervalWithFalloff(function () {
                testMs();
                testMovement();
            });
            // scroll detection
            addEvent(window, 'scroll', scroll);
        }
        catch (e) {
            BAPUtil.trace('[process() error]', e);
        }
        rendered = true;
    }

    function closeOverlay(pageId) {
        var ol = document.getElementById("BAP-overlay-" + pageId);
        if (ol != null) ol.style.display = "none";
        BAP.options[pageId].overlayed = false;
        return false;
    }

    function showOverlay(pageId, l3url) {
        var opts = BAP.options[pageId];
        var ls = opts.ls || false;
        if (!ls) {
            action(pageId, 'S');
            opts.ls = true;
        }
        var overlay = document.getElementById("BAP-overlay-" + pageId);
        if (overlay != null) {
            overlay.style.display = "block";
        }
        else {
            var olh = 135
                , olw = 120;
            if (opts.ad_h < 120 || opts.ad_w >= 300) {
                olh = 50;
                olw = 300;
            }
            var ih = ((opts.micon == 'mi_12_') ? 12 : 15)
                , iw = opts.miconWidth
                , pl = opts.posLeft
                , pt = opts.posTop;
            var t = (opts.positionVertical() == 'top') ? pt : (pt + ih) - olh;
            var l = (opts.positionHorizontal() == 'right') ? (pl + iw) - olw : pl;
            var l3link = "BAP.gotoL3('" + pageId + "', '" + l3url + "');"
                , posabs = 'position: absolute;';
            var ol = document.createElement("div");
            ol.setAttribute("id", "BAP-overlay-" + pageId);
            var styl = 'position:absolute;';
            styl += 'height:' + (olh - 2) + 'px; width:' + (olw - 2) + 'px;'; // set h/w subtracting border
            styl += 'top: ' + t + 'px; left:' + l + 'px;';
            styl += 'background: #fff; border: solid 1px black; font: bold 10px arial, helvetica;';
            if (BAP.options[pageId].dm === 5) {
                styl += 'z-index: 100000;';
            }
            ol.setAttribute('style', styl);
            // close
            var cl = document.createElement("div");
            cl.setAttribute("onclick", "return BAP.closeOverlay('" + pageId + "');");
            cl.setAttribute('style', 'font: bold 14px arial, helvetica; position: absolute; padding: 3px; cursor: pointer;');
            cl.innerHTML = 'X';
            // trigger
            var iconDir = (BAP.options[pageId].icon == 'g' ? '/icong' : '/icon');
            // var trig = document.createElement('img');
            // trig.setAttribute("src", iconCol['mo_' + BAP.options[pageId].position]);
            // trig.setAttribute('style', posabs);
            // trig.setAttribute("onclick", l3link);
            // overlay message and logo
            var olm = document.createElement("div")
                , oll = document.createElement("div");
            olm.innerHTML = opts.mobile_message;
            olm.setAttribute("onclick", l3link);
            oll.setAttribute("onclick", l3link);
            olm.setAttribute('style', posabs + 'width:135px; padding:3px; word-wrap:break-word;');
            oll.setAttribute('style', posabs + 'width:115px; padding:1px;');
            var img = document.createElement("img");
            img.src = opts.adv_logo;
            img.style.height = '45px';
            img.style.width = '115px';
            //img.setAttribute('style', 'margin:auto;');
            oll.appendChild(img);
            if (opts.positionVertical() == 'top') {
                // trig.style.top = cl.style.bottom = '0px';
                olm.style.top = '15px';
            }
            else {
                // trig.style.bottom = cl.style.top = '0px';
                olm.style.top = '15px';
            }
            if (opts.positionHorizontal() == 'right') {
                // trig.style.right = cl.style.left = '0px';
            }
            else {
                // trig.style.left = cl.style.right = '0px';
            }
            if (olw == 300) {
                if (opts.positionHorizontal() == 'right') {
                    oll.style.left = olm.style.right = '15px';
                }
                else {
                    oll.style.right = '20px';
                }
            }
            else {
                oll.style.top = '60px';
                olm.style.width = '115px';
            }
            // ol.appendChild(trig);  TODO: remove if not needed by Q3 2015.
            ol.appendChild(cl);
            ol.appendChild(olm);
            ol.appendChild(oll);
            body.appendChild(ol);
        }
        opts.overlayed = true;
    }

    function isMobileChrome() {
        // Chrome - crios
        return (navigator.userAgent.match(/crios/i) !== null);
    }

    function isMobileFirefox() {
        // Firefox - fxios
        return (navigator.userAgent.match(/fxios/i) !== null);
    }

    function isMobileOpera() {
        // Opera - opios
        return (navigator.userAgent.match(/opios/i) !== null);
    }

    function gotoL3(pageId, u) {
        var opts = BAP.options[pageId];
        var lm = opts.lm || false;
        if (!lm) {
            action(pageId, 'M');
            opts.lm = true;
        }
        if (opts.in_app == 1) {
            // Android click
            if (navigator.userAgent.indexOf('Android') > -1) {
                var targetLink = (opts.custom_optout_url) ? opts.custom_optout_url : ANDROID_LINK;
                var iframe = document.createElement('iframe');
                iframe.style.visibility = 'hidden';
                iframe.style.display = 'none';
                iframe.src = u;
                document.body.appendChild(iframe);
                setTimeout(function () {
                    if (typeof mraid !== 'undefined' && mraid.getState() !== 'loading') {
                        mraid.open(targetLink);
                    }
                    else {
                        window.location = targetLink;
                    }
                }, 200);
                // iOS click
            }
            else {
                var targetLink = (opts.custom_optout_url) ? opts.custom_optout_url : ITUNES_LINK;
                var goToUrl = function (u) {
                    var link = document.createElement('a');
                    link.href = u;
                    document.body.appendChild(link);
                    link.click();
                }
                setTimeout(function () {
                    if (typeof mraid !== 'undefined' && mraid.getState() !== 'loading') {
                        mraid.open(targetLink);
                    }
                    else {
                        //goToUrl(targetLink);
                        window.location.href = targetLink;
                    }
                }, 400);
            }
            // Mobile web click
        }
        else {
            // if we are running on an ios device we will only open the itunes link if we are running on safari.  If
            // we are using mobile chrome, firefox, or opera we will open the url to the opt-out page.
            if (navigator.userAgent.match(/iPhone|iPad|iPod/) != null) {
                if (isMobileChrome() || isMobileFirefox() || isMobileOpera()) {
                    window.open(u, '_newtab');
                }
                else {
                    window.open(ITUNES_LINK, '_newtab');
                }
            }
            else {
                window.open(u, '_newtab');
            }
        }
    }

    function copyOptions(pageId, nid) {
        try {
            var cud = json[nid].data;
            // option defaults
            BAP.options[pageId].rev = 0;
            BAP.options[pageId].behavioral = BAP.options[pageId].behavioral || cud.behavioral || 'definitive';
            BAP.options[pageId].icon_delay = parseInt(BAP.options[pageId].icon_delay) || cud.icon_delay || 0;
            BAP.options[pageId].icon_display = BAP.options[pageId].icon_display || cud.icon_display || 'icon';
            BAP.options[pageId].display_mobile_overlay = (cud.display_mobile_overlay || false);
            BAP.options[pageId].mobile_message = (cud.mobile_message || "");
            BAP.options[pageId].adv_logo = (cud.adv_logo || null);
            BAP.options[pageId].mobile_advertiser_logo_url = (cud.mobile_advertiser_logo_url || null);
            BAP.options[pageId].position = BAP.options[pageId].position || cud.icon_position || 'top-right';
            BAP.options[pageId].offsetTop = parseInt(BAP.options[pageId].offset_y) || cud.offset_y || 0;
            BAP.options[pageId].offsetLeft = parseInt(BAP.options[pageId].offset_x) || cud.offset_x || 0;
            BAP.options[pageId].icon = BAP.options[pageId].icon || 'd';
            BAP.options[pageId].container_opacity = (cud.container_opacity || 100);
            BAP.options[pageId].custom_optout_url = (cud.mobile_in_app_url || null);
        }
        catch (e) {
            BAPUtil.trace('[copyOptions() error]', e);
        }
    }

    function copyJSON(cud) {
        try {
            jsonLoaded = true;
            json[cud.data.nid] = cud;
            if (BAP.processJSON) {
                BAP.processJSON();
            }
            if (json.queue[cud.data.nid]) {
                for (var i = 0; i < json.queue[cud.data.nid].length; i++) {
                    (function () {
                        var pageId = json.queue[cud.data.nid][i];
                        if (document.readyState === "complete") {
                            process();
                        }
                        else {
                            addEvent(window, "load", process);
                        }
                    })(i);
                }
            }
        }
        catch (e) {
            BAPUtil.trace('[copyJSON() error]', e);
        }
    }
    /**
     * DFA Whitelist tester
     */
    function testWhitelist(pageId) {
        var f, c, i, j, el, v = BAP.options[pageId].adi.split(',');
        // DFA whitelist
        try {
            // if adi is passed, check if the doc location has it and stop processing for it, if it doesn't.
            // iframe base: http://ad.doubleclick.net/adj/dmd.ehow/
            if (BAP.options[pageId].dm == 5) {
                for (i in v) {
                    if (document.location.href.indexOf('/' + v[i] + '/') > 0) {
                        c = true;
                        break;
                    }
                }
            }
            else {
                // a different detection method is used, attempt DOM traversal.
                f = BAP.options[pageId].ad.parentNode;
                while (true) {
                    for (j = 0; j < f.children.length; j++) {
                        el = f.children[j];
                        if (el.src) {
                            for (i in v) {
                                if (el.src.indexOf('/' + v[i] + '/') > 0) {
                                    c = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (c) {
                        break;
                    }
                    f = f.parentNode;
                    if ((!f) || (!f.children)) {
                        break;
                    }
                }
            }
        }
        catch (e) {}
        return c;
    }

    function scroll() {
        try {
            testMovement();
            // Fire again 100ms later; this fixes an issue where when you scroll back to the top of
            // the page, the actual adunit doesn't finish moving right away so we end up with an
            // incorrectly positioned notice. By firing again after a short delay, we should fix this.
            setTimeout(testMovement, 100);
        }
        catch (e) {
            BAPUtil.trace('[scroll() error]', e);
        }
    }
    /**
     * Periodically calls function func.
     * Calls it once after an initial delay (200 ms),
     * then calls it every 100 ms for 10 seconds,
     * then calls it every 5000 ms for 60 seconds.
     */
    function setIntervalWithFalloff(func) {
        var i = 0
            , repeater = function () {
                try {
                    if (i == 0) {
                        i++;
                        setTimeout(repeater, 200);
                    }
                    else {
                        func();
                        if (i < 100) {
                            // reset timer @ 100 ms for the next 10 sec
                            i++;
                            setTimeout(repeater, 100);
                        }
                        else if (i < 112) {
                            // 5 sec timer for the next 60 sec
                            i++;
                            if (i == 101) {
                                BAPUtil.trace("[setIntervalWithFalloff] dropping timer to 5 sec");
                            }
                            setTimeout(repeater, 5000);
                        }
                        else {
                            BAPUtil.trace("[setIntervalWithFalloff] killing timer completely");
                        }
                    }
                }
                catch (e) {
                    BAPUtil.trace('[setIntervalWithFalloff error]', e);
                }
            };
        return repeater();
    }
    /**
     * Hides Microsoft Advertising / Atlas.
     */
    function testMs() {
        var ms = window.__MicrosoftAdvertising
            , msAd, pageId;
        if (ms && ms.Ad) {
            for (pageId in BAP.options) {
                if (BAP.options.hasOwnProperty(pageId) && !BAP.options[pageId]._ms) {
                    msAd = ms.Ad.getByPlacementId(BAP.options[pageId].atl_id) || ms.Ad.get(BAP.options[pageId].ad);
                    if (msAd) {
                        msAd.removePlugin("AdChoices");
                        BAP.options[pageId]._ms = true;
                    }
                }
            }
        }
    }
    /**
     * This function detect if a Truste span is somewhere in the upwards path from the ad.
     */
    function testTruste(ad) {
        if (!ad) {
            return false;
        }
        var p = ad.parentNode;
        while (true) {
            if (!p) {
                break;
            }
            try {
                for (var i = 0; i < p.children.length; i++) {
                    var el = p.children[i];
                    if ((el) && (el.id) && (el.id.indexOf('te-clearads') >= 0)) {
                        return true;
                    }
                }
            }
            catch (e) {}
            p = p.parentNode;
        }
        return false;
    }
    /**
     * Look for movement, of either the ad or pixel elements, after we've already
     * rendered the notice.
     *
     * Dynamic content/AJAX widgets (like facebook connect) can fire several seconds after
     * our notice has loaded, causing elements to shift position. This is meant to detect
     * those movements.
     *
     * This function is triggered via setTimeout() and will slow down after 10sec and kill
     * itself after about a minute.
     */
    function testMovement() {
        var b, pEl, el, pageId;
        for (pageId in BAP.options) {
            b = BAP.options[pageId];
            if (BAP.options[pageId].uqid) {
                if (b.dm == 5) {
                    // skip iframes
                    return;
                }
                else if (b.dm == 6) {
                    // use pixel element
                    el = b.px;
                }
                else {
                    // use ad element
                    el = b.ad;
                }
                // Occurs when the notice becomes detached, example: DV or TRUSTe or iVillage via MediaMind
                pEl = el;
                if ((!BAP.options[pageId].detached) && (pEl)) {
                    while (true) {
                        pEl = pEl.parentNode;
                        if (pEl == body) {
                            break;
                        }
                        if (pEl) {
                            continue;
                        }
                        else {
                            BAPUtil.trace('[testMovement()] Found a detached element');
                            BAP.options[pageId].detached = true;
                            break;
                        }
                    }
                }
                else {
                    // TODO: this is a part of noticeMode.  Maybe move it out?
                    pEl = proximityDetection(BAP.options[pageId].proximityId, BAP.options[pageId].ad_w, BAP.options[pageId].ad_h);
                    var ad2 = pEl;
                    while (true) {
                        ad2 = checkChildren(ad2, BAP.options[pageId].ad_h, BAP.options[pageId].ad_w);
                        if (!ad2) {
                            break;
                        }
                        else if (ad2.nodeName == 'EMBED') {
                            if (ad2.parentNode.nodeName == 'OBJECT') {
                                pEl = getObjectEmbed(ad2.parentNode);
                                break;
                            }
                            else {
                                pEl = ad2;
                            }
                        }
                        else {
                            if (ad2.nodeName == 'OBJECT') {
                                ad2 = getObjectEmbed(ad2);
                            }
                            pEl = ad2;
                        }
                    }
                    if (pEl) {
                        BAP.options[pageId].ad = pEl;
                    }
                    BAP.options[pageId].detached = false;
                }
                try {
                    var p = _offset(el);
                    if (p.top != b.pxt || p.left != b.pxl) {
                        // check current offset against stored values. if either differ, redraw!
                        hidePopup(pageId);
                        noticePositionCalculate(pageId);
                        noticePosition(pageId);
                    }
                }
                catch (e) {}
            }
        }
    }

    function resize() {
        try {
            var pageId, dX = (frameSize()[1] - iX)
                , vs = (frameSize()[0] < body.scrollHeight)
                , vsToggle = (BAP.vs != vs);
            if ((dX !== 0) || (vsToggle)) {
                for (pageId in BAP.options) {
                    if (BAP.options[pageId].uqid) {
                        if (BAP.options[pageId].ad) {
                            BAP.options[pageId].ad_w = parseInt(BAP.options[pageId].ad.style.width || BAP.options[pageId].ad.width || BAP.options[pageId].ad.offsetWidth);
                            BAP.options[pageId].ad_h = parseInt(BAP.options[pageId].ad.style.height || BAP.options[pageId].ad.height || BAP.options[pageId].ad.offsetHeight);
                        }
                        noticePositionCalculate(pageId);
                        noticePosition(pageId);
                        if ($('bap-notice-' + pageId)) {
                            hidePopup(pageId);
                            // update L2 position
                            updateL2(pageId);
                        }
                    }
                }
                iX = frameSize()[1];
                BAPUtil.trace('Resize event: X? ' + (dX !== 0) + '|VS? ' + vsToggle);
            }
            BAP.vs = vs;
        }
        catch (e) {
            BAPUtil.trace('[resize() error]', e);
        }
    }

    function logIdString(options) {
        return [encodeURIComponent(options.aid || 0), encodeURIComponent(options.icaid || 0)
		         , encodeURIComponent((options.ecaid || 0)).replace(/_/g, '$underscore$').replace(/%2F/g, '$fs$')
		         , encodeURIComponent(options.nid || 0)].join("_") + '/';
    }

    function actionWrite(options, l, ow) {
        dropPixel(URL_SCHEME + '//l.betrad.com/ct/' + logIdString(options) + [country, l, options.pixel_ad_w, options.pixel_ad_h, 242, options.coid, options.rev].join('/') + '/' + 'pixel.gif?v=' + version + 'm_' + SCRIPT_VERSION + '&ttid=' + treatment + '&d=' + domain + ow + '&mb=' + (options.in_app == 1 ? '1' : '2') + '&r=' + Math.random());
    }

    function dropPixel(u) {
        var img = new Image(0, 0);
        img.src = u;
        img.style.display = 'none';
        body.appendChild(img);
    }

    function action(pageId, state) {
        /* NON_PROD */
        if (!logging) {
            return;
        }
        var l, key, ow = ''
            , lo = log[pageId]
            , sw = false;
        /*
        	T -- tag loaded; (this setting is no longer called)
        	I -- icon (L1) shown;
        	S -- notice (L2) shown;
        	A -- advertiser clicked;
        	B -- IAB clicked;
        	M -- more info;
        	O -- dynamic inclusion overwrite;
        */
        BAPUtil.trace('Logging action: ' + state + ' for ' + pageId);
        if (!lo) {
            lo = {
                'T': [0, '1/0/0/0/0/0']
                , 'I': [0, '0/1/0/0/0/0']
                , 'S': [0, '0/0/1/0/0/0']
                , 'A': [0, '0/0/0/1/0/0']
                , 'B': [0, '0/0/0/0/1/0']
                , 'M': [0, '0/0/0/0/0/1']
                , 'O': [0, '0/1/0/0/0/0']
            };
        }
        if (lo[state][0] == 0) {
            lo[state][0] = 1;
            l = lo[state][1];
            sw = true;
        }
        // shortcutting overwrite stateflag
        (state == 'O') && (ow = '&o=1');
        log[pageId] = lo;
        if (!sw) {
            return;
        }
        actionWrite(BAP.options[pageId], l, ow);
        // check if this notice overwrites others, and in the case of M and B, fire a logging pixel as well
        if ((!BAP.options[pageId].noticeExists) && (coveredNotices[pageId]) && ((state == 'B') || (state == 'M'))) {
            ow = '&o=1';
            for (key in coveredNotices[pageId]) {
                actionWrite(coveredNotices[pageId][key], l, ow);
            }
        }
    }

    function error(options, ec) {
        /* NON_PROD */
        if (detection == 'tagui') {
            return;
        }
        /*
        	Error Codes:
        	- 10 -- options missing
        	- 11 -- invalid options (pre json load)
        	- 12 -- json is not loaded
        	- 13 -- ad height or ad width is missing
        	- 14 -- height and width map to an invalid ad standard
        	- 100 -- noscript served
        */
        var pixel = logIdString(options);
        if (ep[pixel] != ec) {
            ep[pixel] = ec;
            if (pixel) {
                dropPixel(URL_SCHEME + '//l.betrad.com/ct/' + pixel + 'pixel.gif?e=' + ec + '&v=' + version + 'm_' + SCRIPT_VERSION + '&d=' + domain + (BAP.options[pageId].in_app == 1 ? '1' : '2') + '&r=' + Math.random());
            }
        }
    }

    function expandIcon(pageId) {
        if (BAP.options[pageId].expanded) {
            return;
        }
        var iconDir = (BAP.options[pageId].icon == 'g' ? '/icong' : '/icon')
            , icon = DOMAIN_ROOT + iconDir + '/mo_' + BAP.options[pageId].position + '.png'
            , trigger = $('trigger-' + pageId)
            , currLeft = _offset(trigger).left;
        if (BAP.options[pageId].positionHorizontal() == 'right') {
            currLeft = currLeft + BAP.options[pageId].miconWidth - BAP.options[pageId].ciconWidth;
        }
        trigger.style.left = currLeft + 'px';
        trigger.innerHTML = '<img src="' + icon + '">';
        BAP.options[pageId].expanded = true;
    }

    function collapseIcon(pageId) {
        if (!BAP.options[pageId].expanded) {
            return;
        }
        var iconDir = (BAP.options[pageId].icon == 'g' ? '/icong' : '/icon')
            , icon = DOMAIN_ROOT + iconDir + '/' + BAP.options[pageId].micon + BAP.options[pageId].position + '.png'
            , trigger = $('trigger-' + pageId)
            , currLeft = _offset(trigger).left;
        if (BAP.options[pageId].positionHorizontal() == 'right') {
            currLeft = currLeft + BAP.options[pageId].ciconWidth - BAP.options[pageId].miconWidth;
        }
        trigger.style.left = currLeft + 'px';
        trigger.innerHTML = '<img src="' + icon + '">';
        BAP.options[pageId].expanded = false;
    }

    function getDims(el) {
        try {
            var eh = el.height
                , ew = el.width;
            if (!eh) {
                eh = parseInt(getStyle(el, 'height'));
            }
            if (!ew) {
                ew = parseInt(getStyle(el, 'width'));
            }
            if (!eh) {
                eh = el.offsetHeight;
            }
            if (!ew) {
                ew = el.offsetWidth;
            }
            return [ew, eh];
        }
        catch (e) {}
        return false;
    }

    function checkElement(el, height, width) {
        try {
            var eh = getDims(el)[1]
                , ew = getDims(el)[0];
            if ((eh === height) && (ew === width)) {
                return true;
            }
            // adding 10 pixel margin autoadjust
            if ((eh <= height + 5) && (eh >= height - 5) && (ew >= width - 5) && (ew <= width + 5)) {
                return true;
            }
        }
        catch (e) {}
        return false;
    }

    function getObjectEmbed(ad) {
        // Short circuit for Safari since it never used <embed>
        if ((browser.Safari) && (browser.SafariVersion.indexOf('5.1') < 0)) {
            return ad;
        }
        var em, io, elx, embed;
        try {
            if (ad.nodeName.toLowerCase() === 'object') {
                for (elx = ad.childNodes.length - 1; elx > 0; elx--) {
                    embed = ad.childNodes[elx];
                    if (embed.nodeName.toLowerCase() === 'embed') {
                        em = embed;
                        break;
                    }
                    if ((embed.nodeName.toLowerCase() === 'object') && (embed.type === 'application/x-shockwave-flash')) {
                        io = embed;
                    }
                }
            }
            if ((!em) && (io)) {
                em = io;
            }
            if ((browser.Gecko) && (em)) {
                return em;
            }
            // Embed happens to be preferred but if dims are 0s, reuse original ad.
            if ((em.offsetHeight == 0) && (em.offsetWidth == 0)) {
                return ad;
            }
            if ((browser.Chrome) && (em)) {
                ad = em;
            }
            else if (_offset(em).top != 0) {
                ad = em;
            }
        }
        catch (e) {}
        return ad;
    }

    function checkSiblings(ob, spotHeight, spotWidth, level) {
        try {
            if ((level == 15) || (!ob)) {
                return false;
            }
            else {
                if ((nodeAcceptCheck(ob)) && (checkElement(ob, spotHeight, spotWidth))) {
                    return ob;
                }
                else {
                    //if (ob.previousSibling)
                    return checkSiblings(ob.previousSibling, spotHeight, spotWidth, ++level);
                }
            }
        }
        catch (e) {
            return false;
        }
    }

    function nodeAcceptCheck(el) {
        return /DIV|IMG|EMBED|OBJECT|IFRAME|CANVAS|VIDEO|svg|ARTICLE|MAIN|ASIDE|FIGURE|NAV|SECTION/.test(el.nodeName);
    }

    function checkChildren(ob, spotHeight, spotWidth) {
        try {
            if (!ob) {
                return false;
            }
            else {
                var _ = ob.children || ob.childNodes
                    , q, o;
                if (_.length == 0) {
                    return false;
                }
                for (o = 0; o < _.length; o++) {
                    q = getDims(_[o]);
                    if (checkElement(_[o], spotHeight, spotWidth)) {
                        _[o].ds = getAdStandard(q[1], q[0]);
                        return _[o];
                    }
                    else if ((q) && (getAdStandard(q[1], q[0]) != 0)) {
                        _[o].ds = getAdStandard(q[1], q[0]);
                        return _[o];
                    }
                    else if (q = checkChildren(_[o], spotHeight, spotWidth)) {
                        return q;
                    }
                }
            }
        }
        catch (e) {
            return false;
        }
    }

    function addLoadEvent(func) {
        if (document.readyState && document.readyState === 'complete') {
            func();
        }
        else {
            if (window.addEventListener) {
                window.addEventListener('load', func, false);
            }
            else if (window.attachEvent) {
                window.attachEvent('onload', func);
            }
        }
    }

    function hidePopup(pageId) {
        try {
            var popup = $('bap-notice-' + pageId);
            if ((popup) && (getStyle(popup, 'display') != 'none')) {
                popup.style.display = 'none';
            }
        }
        catch (e) {}
    }

    function toggle(el) {
        if (!el.id) {
            el = $('bap-notice-' + el);
        }
        if (getStyle(el, 'display') != 'none') {
            el.style.display = 'none';
        }
        else {
            el.style.display = 'block';
        }
    }

    function $() {
        var i, elements = [];
        for (i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            if (typeof element == 'string') {
                element = document.getElementById(element);
            }
            if (arguments.length == 1) {
                return element;
            }
            elements.push(element);
        }
        return elements;
    }

    function addEvent(elm, evType, fn, useCapture) {
        if (elm.addEventListener) {
            elm.addEventListener(evType, fn, useCapture || false);
            return true;
        }
        else if (elm.attachEvent) {
            return elm.attachEvent('on' + evType, fn);
        }
        else {
            elm['on' + evType] = fn;
        }
    }

    function frameSize() {
        var w = window
            , width = -1
            , height = -1;
        try {
            if (typeof (w.innerWidth) == "number") {
                width = w.innerWidth;
            }
            else {
                if (w.document.documentElement && w.document.documentElement.clientWidth) {
                    width = w.document.documentElement.clientWidth;
                }
                else {
                    if (body && body.clientWidth) {
                        width = body.clientWidth;
                    }
                }
            }
        }
        catch (err) {}
        try {
            if (typeof (w.innerWidth) == "number") {
                height = w.innerHeight;
            }
            else {
                if (w.document.documentElement && w.document.documentElement.clientHeight) {
                    height = w.document.documentElement.clientHeight;
                }
                else {
                    if (body && body.clientHeight) {
                        height = body.clientHeight;
                    }
                }
            }
        }
        catch (err) {}
        return [height, width];
    }

    function getStyle(el, styleProp) {
        try {
            var y;
            if (el.currentStyle) {
                y = el.currentStyle[styleProp];
            }
            else if (window.getComputedStyle) {
                y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            }
            if ((!y) && (styleProp === 'text-align')) {
                try {
                    y = el.currentStyle.textAlign;
                }
                catch (e) {}
            }
            return y;
        }
        catch (e) {
            return null;
        }
    }

    function getDepth(el) {
        var z = (browser.IE ? 'zIndex' : 'z-index')
            , zi = null;
        if (el == null) {
            return;
        }
        if (getStyle(el, z) == 'auto') {
            zi = getDepth(el.parentNode);
        }
        else if (parseInt(getStyle(el, z)) > 0) {
            zi = getStyle(el, z);
        }
        return (parseInt(zi) + 10);
    }
    /**
     * This identifies supported ad standards. When addint entry here, make sure that cratePopup
     * is updated.
     */
    function getAdStandard(height, width) {
        var i, s = sizes;
        for (i = 0; i < s.length; i++) {
            if ((s[i].w == width) && (s[i].h == height)) {
                return s[i].i;
            }
        }
        return 0;
    }
    /**
     * This helper function identifies if an ad size is a mini standard:
     * - may show just the icon if expandable is selected (Ad Choices Icon is 30% or more of the ad)
     * - will not display L2
     */
    function isMini(noticeStandard) {
        var i, s = sizes;
        for (i = 0; i < s.length; i++) {
            if ((s[i].m == 1) && (s[i].i == noticeStandard)) {
                return true;
            }
        }
        return false;
    }

    function sizeMatch(adw, adh) {
        var i, lastMatch = null
            , imgs = document.getElementsByTagName("img");
        for (i = 0; i < imgs.length; i++) {
            if ((!imgs[i].height) && (!imgs[i].getAttribute('height'))) {
                continue;
            }
            if ((!imgs[i].width) && (!imgs[i].getAttribute('width'))) {
                continue;
            }
            if ((imgs[i].height == adh) && (imgs[i].width == adw)) {
                lastMatch = imgs[i];
            }
            else if ((parseInt(imgs[i].getAttribute('height')) == adh) && (parseInt(imgs[i].getAttribute('width')) == adw)) {
                lastMatch = imgs[i];
            }
        }
        return lastMatch;
    }

    function proximityDetection(pxId, spotWidth, spotHeight, px) {
        var i, d, w, h, img, key, rent, cm = null
            , matches = {}
            , dist = null
            , everything = document.getElementsByTagName("*");
        for (i = 0; i < everything.length; i++) {
            if (nodeAcceptCheck(everything[i])) {
                img = everything[i];
                // skip EMBED if its parent is a proper OBJECT.
                if ((img.nodeName == 'EMBED') && (img.parentNode.nodeName == 'OBJECT')) {
                    continue;
                }
                if ((!img.height) && (!img.getAttribute('height')) && (!getStyle(img, 'height'))) {
                    break;
                }
                if ((!img.width) && (!img.getAttribute('width')) && (!getStyle(img, 'width'))) {
                    break;
                }
                if ((img.height == spotHeight) && (img.width == spotWidth)) {
                    matches[i] = img;
                }
                else if ((parseInt(img.getAttribute('height')) == spotHeight) && (parseInt(img.getAttribute('width')) == spotWidth)) {
                    matches[i] = img;
                }
                else {
                    // CSS reparsing.
                    try {
                        w = parseInt(getStyle(img, 'width').replace('px', ''));
                        h = parseInt(getStyle(img, 'height').replace('px', ''));
                        if ((h == spotHeight) && (w == spotWidth)) {
                            matches[i] = img;
                        }
                    }
                    catch (e) {}
                }
            }
        }
        for (key in matches) {
            var d = Math.abs(pxId - key);
            //if (d > 50) { continue; }
            if (dist == null || (d < dist)) {
                dist = d;
                cm = matches[key];
            }
            if ((px) && (px.parentNode == matches[key].parentNode)) {
                rent = {
                    'd': d
                    , 'cm': matches[key]
                };
            }
        }
        // compare same daddy match.
        if ((rent) && (Math.abs(dist - rent.d) < 5)) {
            // preferring same daddy!
            cm = rent.cm;
        }
        matches = null;
        try {
            if ((cm) && (cm.nodeName == 'OBJECT')) {
                cm = getObjectEmbed(cm);
            }
        }
        catch (e) {}
        return cm;
    }

    function addNoticeDelay(pageId) {
        action(pageId, 'I');
        if (BAP.options[pageId].icon_delay > 0) {
            var trigger = $('trigger-container-' + pageId);
            trigger.style.display = 'none';
            // Error in this function would occur because of the out of sync requests from other dancers around
            setTimeout(function () {
                try {
                    $('trigger-container-' + pageId).style.display = 'block';
                }
                catch (e) {}
            }, parseInt(BAP.options[pageId].icon_delay) * 1000);
            BAPUtil.trace('Adding notice delay to the following notice: ' + pageId + ' delay:' + BAP.options[pageId].icon_delay + ' seconds');
        }
    }
    /**
     * This method positions the notice.
     */
    function noticePosition(pageId) {
        var t = $('trigger-' + pageId)
            , tc = $('trigger-box-' + pageId);
        t.style.top = BAP.options[pageId].posTop + 'px';
        t.style.left = BAP.options[pageId].posLeft + 'px';
    }
    /**
     * This method calculates new notice location points based on the mode
     * that the notice is in.
     */
    function noticePositionCalculate(pageId) {
        var posTop, posLeft, pixLeft, pixTop, lof = 2
            , ad = BAP.options[pageId].ad
            , spotHeight = BAP.options[pageId].ad_h
            , spotWidth = BAP.options[pageId].ad_w
            , spotLeft, spotTop;
        if (BAP.options[pageId].dm == 5) {
            pixLeft = spotWidth;
            spotTop = pixTop = 0;
            spotLeft = pixLeft - spotWidth;
        }
        else if ((BAP.options[pageId].dm == 1) || (BAP.options[pageId].dm == 2) || (BAP.options[pageId].dm == 3) || (BAP.options[pageId].dm == 4) || (BAP.options[pageId].dm == 4.1) || (BAP.options[pageId].dm == 4.2) || (BAP.options[pageId].dm == 5) || (BAP.options[pageId].dm == 7) || (BAP.options[pageId].dm == 8)) {
            pixLeft = _offset(ad).left;
            pixTop = _offset(ad).top;
            spotLeft = pixLeft;
            spotTop = pixTop;
        }
        else if (BAP.options[pageId].dm == 6) {
            var px = BAP.options[pageId].px;
            pixLeft = _offset(px).left;
            pixTop = _offset(px).top;
            if (browser.Opera) {
                // Opera styling bug?  Top/Bottom is set to 0 when element height and width is 0
                // resize the pixel to be visible, measure top and hide it again
                px.width = px.height = '1';
                pixTop = _offset(px).top;
                px.width = px.height = '0';
            }
            spotLeft = pixLeft - spotWidth - 4;
            spotTop = pixTop - spotHeight;
            // adjust when pixel is not in the required position
            try {
                var ew = px.parentNode.width;
                if (!ew) {
                    ew = parseInt(getStyle(px.parentNode, 'width'));
                }
                if ((ew === spotWidth) || (ew <= spotWidth)) {
                    spotLeft = spotLeft + spotWidth;
                    if (getStyle(px, 'text-align').toLowerCase().indexOf('center') >= 0) {
                        spotLeft = spotLeft - (spotWidth / 2);
                        if (browser.IE) {
                            spotTop -= 4;
                        }
                    }
                    else if (getStyle(px, 'text-align').toLowerCase().indexOf('right') >= 0) {
                        spotLeft = spotLeft - spotWidth;
                        if (browser.IE) {
                            spotTop -= 4;
                        }
                    }
                }
            }
            catch (e) {}
        }
        // if body is relative or has some padding / margin limits, adjust left position for them.
        try {
            if (getStyle(body, 'position') == 'relative') {
                var box = body.getBoundingClientRect();
                spotLeft = spotLeft - box.left;
            }
        }
        catch (e) {}
        // calculating icon position within the located object according to the selected notice corner
        if (BAP.options[pageId].position == 'top-right') {
            posTop = spotTop;
            posLeft = spotLeft + spotWidth;
        }
        else if (BAP.options[pageId].position == 'top-left') {
            posTop = spotTop;
            posLeft = spotLeft;
        }
        else if (BAP.options[pageId].position == 'bottom-right') {
            posTop = spotTop + spotHeight - 14;
            posLeft = spotLeft + spotWidth;
        }
        else if (BAP.options[pageId].position == 'bottom-left') {
            posTop = spotTop + spotHeight - 14;
            posLeft = spotLeft;
        }
        // adjust with offsets
        posTop += BAP.options[pageId].offsetTop;
        posLeft += BAP.options[pageId].offsetLeft;
        // final adjusting using specification in use
        posTop = posTop + ((BAP.options[pageId].positionVertical() == 'top') ? 0 : -1);
        if ((BAP.options[pageId].icon_display == 'expandable') || (BAP.options[pageId].icon_display == 'icon')) {
            if (BAP.options[pageId].positionHorizontal() == 'right') {
                posLeft -= BAP.options[pageId].miconWidth;
            }
        }
        else {
            if (BAP.options[pageId].positionHorizontal() == 'right') {
                posLeft -= BAP.options[pageId].ciconWidth;
            }
        }
        BAP.options[pageId].pxl = pixLeft;
        BAP.options[pageId].pxt = pixTop;
        BAP.options[pageId].posTop = posTop;
        BAP.options[pageId].posLeft = posLeft;
        BAP.options[pageId].ad_h = spotHeight;
        BAP.options[pageId].spotTop = spotTop;
        BAP.options[pageId].spotLeft = spotLeft;
        BAP.options[pageId].ad_w = spotWidth;
    }
    /**
     * This method figures out the case of the notice display.
     */
    function noticeMode(pageId) {
        var ad, dm, spotHeight = BAP.options[pageId].ad_h
            , spotWidth = BAP.options[pageId].ad_w
            , px = $('bap-pixel-' + pageId)
            , everything = document.getElementsByTagName("*");
        // find proximityId
        for (dm = 0; dm < everything.length; dm++) {
            if (px == everything[dm]) {
                BAP.options[pageId].proximityId = dm;
            }
        }
        if ((ifr) && ((frameSize()[0] == spotHeight) && (frameSize()[1] == spotWidth))) {
            // iframe case - easiest one!
            dm = 5;
        }
        else if ((checkElement($('flash_creative'), spotHeight, spotWidth)) && (detection == 'tagui')) { /* NON_PROD */
            // special case for TAG UI
            /* NON_PROD */
            ad = $('flash_creative');
            /* NON_PROD */
            dm = 4;
        }
        else if ((domain.indexOf('mail.yahoo.com') > 0) && (document.getElementsByTagName('object').length == 1) && (browser.IE)) {
            // special case for Yahoo Mail
            ad = document.getElementsByTagName('object')[0];
            dm = 4.1;
        }
        else if ((BAP.options[pageId].container) && (ad = $(BAP.options[pageId].container))) {
            if (BAP.options[pageId].check_container) {
                ad = checkChildren(ad, spotHeight, spotWidth) || ad;
                // Overwriting dimensions.
                if (ad.ds) {
                    BAP.options[pageId].ad_h = ad.offsetHeight;
                    BAP.options[pageId].ad_w = ad.offsetWidth;
                    BAP.options[pageId].pixel_ad_w = BAP.options[pageId].ad_w;
                    BAP.options[pageId].pixel_ad_h = BAP.options[pageId].ad_h;
                    BAP.options[pageId].ns = ad.ds;
                }
            }
            else {
                // set passed in ad standard if were not checking the container
                ad.ds = BAP.options[pageId].ns;
            }
            // native container
            dm = 8;
        }
        else {
            // check previous siblings
            ad = checkSiblings(px.previousSibling, spotHeight, spotWidth, 1);
            if (ad) {
                // detected previous sibling that qualifies as ad
                dm = 3;
            }
            else if ((domain.indexOf('yahoo.com') > 0) && (ad = sizeMatch(spotWidth, spotHeight))) {
                // Size Matcher for VENDOR CASE (yahoo)
                dm = 4.2;
            }
            else if (ad = proximityDetection(BAP.options[pageId].proximityId, spotWidth, spotHeight, px)) {
                // proximity detector
                dm = 7;
            }
            else {
                // pixel aft based detection, unhide the pixel
                dm = 6;
                try {
                    $('bap-pixel-' + pageId).style.display = '';
                }
                catch (e) {}
            }
        }
        // Check for truste stuff in the path of this notice.
        BAP.options[pageId]._truste = testTruste(ad);
        if ((dm == 3) || (dm == 7)) {
            // validate if the level of notice is correct by looking into children
            var ad2 = ad;
            while (true) {
                ad2 = checkChildren(ad2, spotHeight, spotWidth);
                if (!ad2) {
                    break;
                }
                else if (ad2.nodeName == 'EMBED') {
                    if (ad2.parentNode.nodeName == 'OBJECT') {
                        ad = getObjectEmbed(ad2.parentNode);
                        break;
                    }
                    else {
                        ad = ad2;
                    }
                }
                else {
                    if (ad2.nodeName == 'OBJECT') {
                        ad2 = getObjectEmbed(ad2);
                    }
                    ad = ad2;
                }
            }
        }
        BAP.options[pageId].dm = dm;
        BAP.options[pageId].ad = ad;
        BAP.options[pageId].px = px;
        var page_src;

        function find_child_src(elm) {
            if (elm.src) {
                return elm.src
            }
            else {
                var _ = elm.children || elm.childNodes
                    , q, o;
                if (_.length == 0) {
                    return false;
                }
                for (o = 0; o < _.length; o++) {
                    var src = find_child_src(_[o]);
                    if (src) {
                        return src;
                    }
                }
            }
            return false;
        }
        var ad_src = find_child_src(ad);
        BAP.options[pageId].ad_src = !ad_src ? 'undefined' : /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i.exec(ad_src)[1];
        /**
         * Added in response to eyeWonder dynamic ads that keep setting higher depth setting
         * then our default 10k. Or default is currently set at 9990 for L1 an 9991 for L2.
         * It will be overwritten by this setting if there is a need to set it.
         */
        try {
            BAP.options[pageId].ad_z = (BAP.options[pageId].ad_z || getDepth(ad));
        }
        catch (e) {}
        /**
         * Added for the case when detection is not executed within an iframe,
         * but the frame contents are also set pretty high up in the depth index
         */
        if (dm === 5) {
            BAP.options[pageId].ad_z = 100000;
        }
        /**
         * Adding removal of anchor pixel.  If the mode is not pixel based, pixel 
         * may break the layout, especially if it has been injected prior to the ad.
         */
        if (dm != 6) {
            px.parentNode.removeChild(px);
        }
    }
    /**
     * This method checks if the notice has been given already.
     */
    function noticeVerification(pageId) {
        var ad = BAP.options[pageId].ad;
        // check if notice already given for the ad in question
        if ((ad) && (!ad.notice)) {
            ad.notice = pageId;
        }
        else if ((ad) && (ad.notice != pageId)) {
            // notice already given for this element
            BAP.options[pageId].noticeExists = true;
            if (nids[ad.notice] != nids[pageId]) {
                coverNotice(ad.notice, pageId);
            }
        }
        else if (BAP.options[pageId].dm == 5) {
            if (window.notice) {
                // notice already given for this frame (case of 2+ script notices within a frame)
                BAP.options[pageId].noticeExists = true;
                if (nids[window.notice] != nids[pageId]) {
                    coverNotice(window.notice, pageId);
                }
            }
            else {
                // iframe case with exact match
                // marking the frame as covered by first notice
                window.notice = pageId;
                BAP.options[pageId].ad = {
                    'nodeName': 'EXACT-FRAME'
                };
                // already received a ping, send the BAPFRAME.
                if (window.bap_frameid) {
                    postNoticeMessage('BAPFRAME|' + nids[pageId] + '|' + window.bap_frameid);
                    BAPUtil.trace('Posted frame coverage message: ' + pageId + ' (' + nids[pageId] + ')');
                }
                else {
                    // check if the iframe and top are the same.  If not, broadcast to the top.
                    if (window.parent != window.top) {
                        BAPUtil.trace('Broadcasting frame coverage message: ' + pageId + ' (' + nids[pageId] + ')');
                        window.top.postMessage('BAPFRAMEBROADCAST|' + nids[pageId] + '|' + (document.referrer ? document.referrer : '') + '|' + BAP.options[pageId].ad_w + '|' + BAP.options[pageId].ad_h, '*');
                    }
                    else {
                        BAPUtil.trace('Ohh no, all by myself! Anyone up there wonna Rhumba?!?');
                        window.top.postMessage('BAPFRAMEID|' + nids[pageId] + '|' + document.location.href, '*');
                    }
                }
            }
        }
        if ((BAP.options[pageId].ad) && (!BAP.options[pageId].noticeExists)) {
            if ((BAP.options[pageId].ad.nodeName == 'IFRAME') && (BAP.options[pageId].ad.src in frameNoticed)) {
                // notice already given for this element
                BAP.options[pageId].noticeExists = true;
            }
            else if ((BAP.options[pageId].ad.nodeName == 'EXACT-FRAME') && (frameNoticed.contents)) {
                // notice already given for this element: CASE FRAME-PASS
                BAP.options[pageId].noticeExists = true;
            }
        }
    }
    /**
     * This method places the actual <div> and other visual elements on the page.
     */
    function noticeCreate(pageId) {
        var icon, iconWidth, iconDir, opacity, z = ''
            , expansion = ''
            , div = $('BAP-holder')
            , click = '';
        if (!div) {
            div = document.createElement('div');
            div.setAttribute('id', 'BAP-holder');
            body.appendChild(div);
        }
        try {
            opacity = parseInt((BAP.options[pageId].container_opacity)) / 100;
        }
        catch (e) {
            opacity = 1;
        }
        opacity = (opacity < 1 ? 'opacity:' + opacity + ';-moz-opacity:' + opacity + ';-ms-filter:DXImageTransform.Microsoft.Alpha(Opacity=' + (opacity * 100) + ');filter:alpha(opacity=' + (opacity * 100) + ');' : '');
        iconDir = (BAP.options[pageId].icon == 'g' ? '/icong' : '/icon');
        icon = '<img src="' + DOMAIN_ROOT + iconDir + '/' + BAP.options[pageId].micon + BAP.options[pageId].position + '.png">';
        iconWidth = BAP.options[pageId].miconWidth;
        click = //'BAP.action(\'' + pageId + '\', \'S\'); ' + //'BAP.action(\'' + pageId + '\', \'M\'); ' + 
            'BAP.options[\'' + /* NO_CLEANUP */ pageId + '\'].open(\'' + BAP.options[pageId].link + '\', \'_newtab\');';
        BAPUtil.trace("Generated click action: " + click);
        if (BAP.options[pageId].ad_z) {
            z = 'z-index:' + (parseInt(BAP.options[pageId].ad_z)) + ';';
        }
        icon = '<span id="trigger-' + pageId + '" style="' + z + 'position:absolute; ' + opacity + '" class="bap-trigger" onclick="' + click + '"' + expansion + '>' + icon + '</span>';
        icon = '<div id="trigger-container-' + pageId + '" style="position: static !important;">' + icon + '</div>';
        if (typeof mraid !== 'undefined' && !mraid_setup) {
            mraid_setup = true;
            if (mraid.getState() === 'loading') {
                mraid.addEventListener('ready', mraidSetup);
            }
            else {
                mraidSetup();
            }
        }

        function mraidSetup() {
            mraid.addEventListener('stateChange', function () {
                if (mraid.getState() === 'default') {
                    div.style.display = 'block';
                }
                else {
                    div.style.display = 'none';
                }
            });
        }
        div.innerHTML = div.innerHTML + icon;
    }

    function showNoticeHelper(pageId) {
        // noticeMode is moved into process.
        noticePositionCalculate(pageId);
        noticeVerification(pageId);
        if (!BAP.options[pageId].noticeExists) {
            noticeCreate(pageId);
            noticePosition(pageId);
            BAPUtil.trace('Generated the following notice: ' + pageId + ' (' + nids[pageId] + ') h:' + BAP.options[pageId].ad_h + ' w:' + BAP.options[pageId].ad_w + ' t:' + BAP.options[pageId].spotTop + ' l:' + BAP.options[pageId].spotLeft + ' pt:' + BAP.options[pageId].pxt + ' pl:' + BAP.options[pageId].pxl + ' mode:' + BAP.options[pageId].dm);
            addNoticeDelay(pageId);
        }
        else {
            BAPUtil.trace('Notice already exists for: ' + pageId);
            // log L1 shown for same page overwrite
            action(pageId, 'I');
            // log overwrite
            action(pageId, 'O');
        }
    }
    /**
     * This method figures out if a covering notice needs to accept the incoming notice
     * and add it into coverage stack for itself.
     */
    function coverNotice(coverBy, covered, o) {
        var c = (o ? covered : nids[covered]);
        // if covering notice is the same nid, do not add into the coveredNotice stack
        if (nids[coverBy] == c) {
            return;
        }
        // now check if the same notice is in the covered stack already
        if (coveredNotices[coverBy]) {
            for (var key in coveredNotices[coverBy]) {
                if (key == c) {
                    return;
                }
            }
        }
        // made it through, so this is a new notice, add into coverage
        coveredNotices[coverBy][c] = (o || BAP.options[covered]);
    }
    /**
     * Helper for string creation used in compose messages
     */
    function acceptMessageString(options, nid) {
        return 'BAPACCEPT|' + nid + '|' + options.nid + '|' + (options.aid || 0) + '|' + (options.icaid || 0) + '|' + (options.ecaid || 0) + '|' + options.coid + '|' + options.ad_w + '|' + options.ad_h + '|' + options.rev + '|' + (options.cps || '-') + '|' + (options.seg || '-');
    }
    /**
     * Helper method to shorten BAPACCEPT message execution
     */
    function composeAcceptMessage(options, nid, w) {
        postNoticeMessage(acceptMessageString(options, nid), w);
    }

    function postNoticeMessage(m, d) {
        var win;
        if (d) {
            if (!!d['postMessage']) {
                win = d;
            }
            else {
                win = d.contentWindow
            }
        }
        else {
            win = window.parent;
        }
        if (win.postMessage) {
            win.postMessage(m, '*');
        }
    }

    function flashPostMessage(m) {
        handleMessage({
            data: m
        });
    }
    /**
     * This function grabs all iframes on the page and sends a dance
     * request to them.  Each frame is also marked with the id (loop)
     * for unique identification.
     */
    function tango() {
        var frames = document.getElementsByTagName('iframe');
        for (var i = 0; i < frames.length; i++) {
            tangoPartners[i] = frames[i];
            postNoticeMessage('BAPTANGO?|' + i, frames[i]);
        }
    }
    /**
     * Queue support for messaging since its possible to receive a message prior to tag processing.
     * When this occurs, message is queued in BAP.mq and processed when the current payload is complete.
     * TODO: potentially might execute several times for multiple messages received -- maintain order
     * of received messages?
     */
    function handleMessageQueue() {
        if ((rendered) && (mq.length > 0)) {
            var i, rev = [];
            // Pulling broadcasts and adding as last message.
            for (i = 0; i < mq.length; i++) {
                if (mq[i].indexOf('BAPFRAMEBROADCAST') >= 0) {
                    rev.push(mq[i]);
                }
            }
            while (mq.length > 0) {
                i = mq.pop();
                if (i.indexOf('BAPFRAMEBROADCAST') >= 0) {
                    continue;
                }
                rev.push(i);
            }
            while (mq.length > 0) {
                rev.push(mq.pop());
            }
            while (rev.length > 0) {
                handleMessage(rev.pop());
            }
        }
        else if ((!rendered) && (mq.length > 0)) {
            setTimeout(handleMessageQueue, 1000);
        }
    }

    function handleMessage(e) {
        try {
            var f, data = e;
            if (e.data) {
                data = e.data;
            }
            /* Race condition: its possible to receive message before tag is processed on the parent page. */
            if (!rendered) {
                BAPUtil.trace('Message queued: ' + data);
                mq.push(data);
                setTimeout(handleMessageQueue, 1000);
                return;
            }
            BAPUtil.trace('Message received: ' + data + ' at ' + document.location);
            var message = data.substring(0, (data.indexOf("|") || data.length));
            if (message == 'BAPFRAMEBROADCAST') {
                // Handling of the notice at the actual page.
                if (window.top == window) {
                    var r = data.split('|')
                        , nid = r[1]
                        , ref = r[2]
                        , w = r[3]
                        , h = r[4];
                    for (var pageId in BAP.options) {
                        var ad = BAP.options[pageId].ad;
                        if ((ad) && (ad.nodeName == 'IFRAME') && (BAP.options[pageId].ad_h == h) && (BAP.options[pageId].ad_w == w)) {
                            /**
                             * Special referrer match.  Only happens if iframe and inner frame are separated by a single frame.
                             * More accuratte then other assumption.
                             */
                            if ((ref == ad.src) || ((browser.IE) && (ref.indexOf(ad.src) > 0))) {
                                composeAcceptMessage(BAP.options[pageId], nid, e.source);
                                // log overwrite
                                // logging overwrite for everything but IE.
                                if (!browser.IE) {
                                    action(pageId, 'O');
                                }
                                // remove trigger
                                var div = $('BAP-holder')
                                    , trigger = $('trigger-' + pageId);
                                if (trigger) {
                                    div.removeChild($('trigger-container-' + pageId));
                                }
                                // remove from options
                                delete BAP.options[pageId];
                                break;
                            }
                        }
                    }
                }
            }
            else if (message == 'BAPFRAMEID') {
                // Rhumba case! (attempting a reverse tango) -- this case occurs when the frame has loaded after parent requested tango partners.
                var r = data.split('|')
                    , nid = r[1]
                    , frameUrl = r[2]
                    , frames = document.getElementsByTagName('iframe');
                for (var i = 0; i < frames.length; i++) {
                    if ((frames[i].src) && (frames[i].src == frameUrl)) {
                        tangoPartners[i] = frames[i];
                        postNoticeMessage('BAPTANGO?|' + i, frames[i]);
                    }
                }
            }
            else if (message == 'BAPTANGO?') {
                // Dance request!
                var id = data.substring(data.indexOf('|') + 1);
                window.bap_frameid = id;
                postNoticeMessage('BAPLETSDANCE|' + id);
                if (window.notice) {
                    postNoticeMessage('BAPFRAME|' + nids[window.notice] + '|' + id);
                }
            }
            else if (message == 'BAPLETSDANCE') {
                // Dance accepted!
                f = data.substring(data.indexOf('|') + 1);
                tangoPartners[f].tango = f;
            }
            else if (message == 'BAPFRAME') {
                /**
                 * Bubbling up the frame stack receiver.  When message arrives, checks if this (current)
                 * level contains the notice, and then removes if from the displaying if it exist in 
                 * this level.
                 */
                var r = data.split('|')
                    , nid = r[1]
                    , frameId = r[2];
                frameNoticed[url] = nid;
                frameNoticed.contents = true;
                for (var pageId in BAP.options) {
                    var ad = BAP.options[pageId].ad;
                    if ((ad) && ((ad.nodeName == 'IFRAME') && (ad.tango == frameId) && (!BAP.options[pageId].noticeExists)) || ((ad.nodeName == 'EXACT-FRAME'))) {
                        // notify that there is a match in the stack and alert for the covered nid
                        var pass = '';
                        if (ad.nodeName == 'EXACT-FRAME') {
                            // the notice is an exact frame, but appears to be a pass through frame itself.
                            // in this case, find and notify the deeper frame of itself
                            // NOTE: perphaps just assume that in a pass-through scenario there will be a single iframe to post to?
                            var frames = document.getElementsByTagName('iframe');
                            for (var i = 0; i < frames.length; i++) {
                                composeAcceptMessage(BAP.options[pageId], nid, frames[i]);
                                // anchor the slave frame
                                window.passFrame = frames[i];
                            }
                        }
                        else {
                            composeAcceptMessage(BAP.options[pageId], nid, ad);
                            // anchor the slave frame
                            pass = ad;
                        }
                        window.passNid = nid;
                        // if current notice covers any other notices, pass them as well
                        for (var key in coveredNotices[pageId]) {
                            composeAcceptMessage(coveredNotices[pageId][key], nid, pass || window.passFrame);
                        }
                        // log overwrite
                        action(pageId, 'O');
                        // remove trigger
                        var div = $('BAP-holder')
                            , trigger = $('trigger-' + pageId);
                        if (trigger) {
                            div.removeChild($('trigger-container-' + pageId));
                        }
                        // remove from options
                        delete BAP.options[pageId];
                        // no need to continue iterating, dance partners are unique
                        break;
                    }
                }
            }
            else if (message == 'BAPFLASH') {
                /**
                 * Bubbling up the frame stack receiver.  When message arrives, checks if this (current)
                 * level contains the notice, and then removes if from the displaying if it exist in 
                 * this level.
                 */
                var r = data.substring(data.indexOf('|') + 1)
                    , nid = r.substring(0, r.indexOf('|'))
                    , url = r.substring(r.indexOf('|') + 1);
                for (var pageId in BAP.options) {
                    var ad = BAP.options[pageId].ad;
                    if ((ad) && (((ad.nodeName == 'OBJECT') || (ad.nodeName == 'EMBED')) && (ad.data == url) && (!BAP.options[pageId].noticeExists)) || ((ad.nodeName == 'EXACT-FRAME'))) {
                        // notify that there is a match in the stack and alert for the covered nid
                        try {
                            ad.flashGetMessage(acceptMessageString(BAP.options[pageId], nid));
                        }
                        catch (e) {}
                        // anchor the slave frame
                        window.passFrame = ad;
                        window.passNid = nid;
                        // if current notice covers any other notices, pass them as well
                        for (var key in coveredNotices[pageId]) {
                            try {
                                ad.flashGetMessage(acceptMessageString(BAP.options[pageId], nid));
                            }
                            catch (e) {}
                        }
                        // log overwrite
                        action(pageId, 'O');
                        // remove trigger
                        var div = $('BAP-holder')
                            , trigger = $('trigger-' + pageId);
                        if (trigger) {
                            div.removeChild($('trigger-container-' + pageId));
                        }
                        // remove from options
                        delete BAP.options[pageId];
                    }
                }
            }
            else if (message == 'BAPACCEPT') {
                /**
                 * Bubbling down the frame stack receiver when a match occurs in higher frames to append 
                 * the notice id to the appropriate display level.
                 */
                var r = data.split('|')
                    , op = {}
                    , enid = r[1];
                op.nid = r[2];
                op.aid = r[3];
                op.icaid = r[4];
                op.ecaid = r[5];
                op.coid = r[6];
                op.ad_w = r[7];
                o.pixel_ad_w = r[7];
                o.pixel_ad_h = r[8];
                op.ad_h = r[8];
                op.rev = r[9];
                if ((r[10]) && (r[10] !== '-')) {
                    op.cps = r[10];
                }
                if ((r[12]) && (r[11] !== '-')) {
                    op.seg = r[11];
                }
                if (op.ecaid === 0) {
                    delete op.ecaid;
                }
                if (window.passFrame) {
                    BAPUtil.trace('Pass-through frame in the stack. Executing pass: ' + op.nid + ' to ' + window.passNid);
                    composeAcceptMessage(op, window.passNid, window.passFrame);
                }
                else {
                    for (pageId in BAP.options) {
                        var nid = nids[pageId];
                        if (enid == nid) {
                            BAPUtil.trace('Coverage accepted by: ' + enid + ' covering: ' + op.nid);
                            coverNotice(pageId, op.nid, op);
                        }
                    }
                }
            }
            else if (message == 'BAPPING') {
                /**
                 * This is a generic heartbeat and message transfer API.
                 */
                var r = '';
                if (window.notice) {
                    r = 'BAPPONG|' + BAP.options[window.notice].position;
                    postNoticeMessage(r);
                }
                else if (window.passFrame) {
                    postNoticeMessage('BAPPING|', window.passFrame);
                }
            }
            else if (message == 'BAPPONG') {
                /**
                 * Would only ever receive this when acting as a pass-through frame, so just bubble further up.
                 */
                postNoticeMessage(data);
            }
        }
        catch (er) {
            BAPUtil.trace('[handleMessage() error]', er.message);
        }
    }

    function updateL2(pageId) {
        var popup = $('bap-notice-' + pageId)
            , l;
        if (BAP.options[pageId].positionHorizontal() == 'right') {
            try {
                l = (BAP.options[pageId].spotLeft + BAP.options[pageId].ad_w - BAP.options[pageId].popupWidth);
                popup.style.left = (l || 0) + 'px';
            }
            catch (e) {}
        }
        else {
            popup.style.left = (BAP.options[pageId].spotLeft || 0) + 'px';
        }
        if (BAP.options[pageId].positionVertical() == 'top') {
            popup.style.top = BAP.options[pageId].posTop + 'px';
        }
        else {
            l = parseInt(popup.style['height']) || BAP.options[pageId].popupHeight;
            popup.style.top = ((BAP.options[pageId].spotTop + BAP.options[pageId].ad_h - l) > 0 ? (BAP.options[pageId].spotTop + BAP.options[pageId].ad_h - l) : 0) + 'px';
        }
        if (browser.IE && browser.QuirksMode && BAP.options[pageId].popupWidth && (popup.style.display != 'none')) {
            popup.style.display = 'block';
            var add = (BAP.options[pageId].popupWidth == 728) ? 4 : 0;
            popup.style.width = (BAP.options[pageId].popupWidth + add) + 'px';
            popup.style.margin = '0px 0px';
        }
        // adding on-demand logo load.
        l = BAP.options[pageId].advLogo;
        if (($('bap-logo-' + pageId)) && (l) && (popup.style.display != 'none') && (!$('bap-logo-' + pageId).src)) {
            $('bap-logo-' + pageId).src = l;
            BAPUtil.trace("[updateL2] loaded logo");
        }
    }
    /* Offset copy. */
    var _boxModel = null;
    (function () {
        var div = document.createElement("div");
        div.style.width = div.style.paddingLeft = "1px";
        body.appendChild(div);
        _boxModel = div.offsetWidth === 2;
        body.removeChild(div).style.display = 'none';
    })();

    function _bodyOffset() {
        var top = body.offsetTop
            , left = body.offsetLeft;
        var container = document.createElement('div')
            , innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(getStyle(body, 'marginTop')) || 0
            , html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        container.style.position = 'absolute';
        container.style.top = 0;
        container.style.left = 0;
        container.style.margin = 0;
        container.style.border = 0;
        container.style.width = '1px';
        container.style.height = '1px';
        container.style.visibility = 'hidden';
        container.innerHTML = html;
        body.insertBefore(container, body.firstChild);
        innerDiv = container.firstChild;
        checkDiv = innerDiv.firstChild;
        td = innerDiv.nextSibling.firstChild.firstChild;
        checkDiv.style.position = 'fixed';
        checkDiv.style.top = '20px';
        // safari subtracts parent border width here which is 5px
        checkDiv.style.position = checkDiv.style.top = '';
        innerDiv.style.overflow = 'hidden';
        innerDiv.style.position = 'relative';
        body.removeChild(container);
        container = innerDiv = checkDiv = table = td = null;
        if (body.offsetTop !== bodyMarginTop) {
            top += parseFloat(getStyle(body, 'marginTop')) || 0;
            left += parseFloat(getStyle(body, 'marginLeft')) || 0;
        }
        return {
            top: top
            , left: left
        };
    }

    function _offset(elem) {
        var box;
        if (!elem || !elem.ownerDocument) {
            return null;
        }
        if (elem === elem.ownerDocument.body) {
            return _bodyOffset(elem);
        }
        try {
            box = elem.getBoundingClientRect();
        }
        catch (e) {}
        var doc = elem.ownerDocument
            , docElem = doc.documentElement;
        // Make sure we're not dealing with a disconnected DOM node
        if (!box) {
            return box ? {
                top: box.top
                , left: box.left
            } : {
                top: 0
                , left: 0
            };
        }
        var body = doc.body
            , win = ((elem && typeof elem === "object" && "setInterval" in elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false)
            , clientTop = docElem.clientTop || ((browser.IE && browser.QuirksMode) ? body.clientTop : 0) || 0
            , /* clientTop = docElem.clientTop || body.clientTop || 0, */
            clientLeft = docElem.clientLeft || ((browser.IE && browser.QuirksMode) ? body.clientLeft : 0) || 0
            , /* clientLeft = docElem.clientLeft || body.clientLeft || 0, */
            scrollTop = win.pageYOffset || _boxModel && docElem.scrollTop || body.scrollTop
            , scrollLeft = win.pageXOffset || _boxModel && docElem.scrollLeft || body.scrollLeft
            , top = box.top + scrollTop - clientTop
            , left = box.left + scrollLeft - clientLeft;
        return {
            top: top
            , left: left
        };
    }
    try {
        addEvent(window, 'message', handleMessage);
    }
    catch (e) {}
    // BAP utilities class
    var BAPUtil = { /* NON_PROD */
        trace: function () { /* NON_PROD */
            try { /* NON_PROD */
                if (arguments.length >= 1 || arguments.length <= 3) { /* NON_PROD */
                    var format = "-- BAP" + ((window == window.top) ? '' : ' [' + document.location.href + ']') + ":  " + arguments[0]; /* NON_PROD */
                    if (arguments.length == 1) console.log(format); /* NON_PROD */
                    else if (arguments.length == 2) console.log(format, arguments[1]); /* NON_PROD */
                    else if (arguments.length == 3) console.log(format, arguments[1], arguments[2]); /* NON_PROD */
                }
                else { /* NON_PROD */
                    alert("Improper use of trace(): " + arguments.length + " arguments"); /* NON_PROD */
                } /* NON_PROD */
            }
            catch (e) {} /* NON_PROD */
        } /* NON_PROD */
    }; /* NON_PROD */
    // _bao options loaded for DFA.
    if (window._bao) {
        start(_bao);
    }
    API.options = BAP.options;
    API.flashPostMessage = flashPostMessage;
    API.toggle = toggle;
    API.expandIcon = expandIcon;
    API.collapseIcon = collapseIcon;
    API.action = action;
    API.start = start;
    API.copyJSON = copyJSON;
    API.closeOverlay = closeOverlay;
    API.gotoL3 = gotoL3;
    API.$ = $;
    return API;
}());