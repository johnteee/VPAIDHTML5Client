var BAP = (function () {
	var	API = {},
		BAP = {},
		country = 'us',
		cicon = '',
		log,

		DOMAIN_ROOT = '//c.betrad.com',
		DOMAIN_JSON = DOMAIN_ROOT + '/a/',
		DOMAIN_INFO = 'http://info.evidon.com/',
		body = document.getElementsByTagName('body')[0],
		domain = document.domain,
		browser = function() {
			var ua = navigator.userAgent,
			 isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]',
			 safv = ua.substring( (ua.indexOf("Version"))  + "Version".length + 1);

			try { safv = safv.substring(0, safv.indexOf(' ')); } catch (e) {}

			return {
				IE:             !!window.attachEvent && !isOpera && document.createStyleSheet,
				IE6:            ua.indexOf('MSIE 6') > -1,
				IE7:            ua.indexOf('MSIE 7') > -1,
				IE8:            ua.indexOf('MSIE 8') > -1,
				Opera:          isOpera,
				Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
				Safari:   			( (ua.indexOf('Safari') > -1) && (ua.indexOf('Chrome') <= -1) ),
				Chrome:					!!ua.match('Chrome'),
				QuirksMode:     document.compatMode == 'BackCompat',
				SafariVersion:	safv
			};
		}(),

		ifr = top.location != location,

		// copy the query string
		qstring = (function() {
			var q = {}, p, s = location.search.substring(1).split("&"), i = s.length;
			while (i--) {
				p = s[i].split("=");
				q[p[0]] = decodeURIComponent(p[1]);
			}
			return q;
		})();


	function start() {
		if ( !!qstring['nid'] && !!qstring['coid'] && (!isNaN(qstring['nid'])) && (!isNaN(qstring['coid'])) ) {
			var i = document.createElement("script");
			i.src = DOMAIN_JSON + 'n/' + qstring['coid'] + '/' + qstring['nid'] + '.js';
			body.appendChild(i);
		}
	}

	function copyJSON(cud) {
		cud = cud.data;

		try {
			BAP.options = {};

			BAP.options.advName = (cud.adv_name || null);
			BAP.options.advMessage = (cud.adv_msg || null);
			//BAP.options.advLogo = (DOMAIN_ROOT + cud.adv_logo.slice(19) || null);
			BAP.options.advLogo = cud.adv_logo || null;
			BAP.options.advLink = (cud.adv_link || null);

			BAP.options.behavioral = (cud.behavioral || 'definitive');
			BAP.options.behavioralCustomMessage = (cud.generic_text ||  '');

			cud.hide_wi && (BAP.options.hideWhatIs = true);
			cud.hide_cl && (BAP.options.hideCustom = true);

			// default translation
			BAP.options.defTrans = {};
			cud['default_generic1'] && (BAP.options.defTrans.generic1 = cud['default_generic1']);
			cud['default_generic2'] && (BAP.options.defTrans.generic2 = cud['default_generic2']);
			cud['default_generic3'] && (BAP.options.defTrans.generic3 = cud['default_generic3']);
			cud['default_generic4'] && (BAP.options.defTrans.generic4 = cud['default_generic4']);
			cud['default_generic5'] && (BAP.options.defTrans.generic5 = cud['default_generic5']);
			cud['default_generic6'] && (BAP.options.defTrans.generic6 = cud['default_generic6']);

			cud['default_link1'] && (BAP.options.defTrans.link1 = cud['default_link1']);
			cud['default_link2'] && (BAP.options.defTrans.link2 = cud['default_link2']);
			cud['default_link2'] && (BAP.options.defTrans.link3 = cud['default_link3']);

			cud['default_footer'] && (BAP.options.defTrans.footer = cud['default_footer']);

			// overwrite with localized version if available
			var mp = cud.message_properties || '';

			mp['behavioral_' + country] && (BAP.options.behavioral = mp['behavioral_' + country]);
			mp['behavioral_' + country] && (BAP.options.noDefault = true);

			// default icon
			cud['default_icon'] && (!BAP.options.noDefault) && (BAP.options.cicon = cud['default_icon']);

			mp['generic_text_' + country] && (BAP.options.behavioralCustomMessage = mp['generic_text_' + country]);
			mp['adv_name_' + country] && (BAP.options.advName = mp['adv_name_' + country]);
			mp['adv_msg_' + country] && (BAP.options.advMessage = mp['adv_msg_' + country]);
			mp['adv_logo_' + country] && (BAP.options.advLogo = (DOMAIN_ROOT + mp['adv_logo_' + country].slice(19) ) );
			/* NON_PROD */ mp['adv_logo_' + country] && (BAP.options.advLogo = mp['adv_logo_' + country]);
			mp['adv_link_' + country] && (BAP.options.advLink = mp['adv_link_' + country]);
			mp['translation_' + country] && (BAP.options.translation = mp['translation_' + country]);
			mp['translation_' + country] && (BAP.options.cicon = mp['translation_' + country].icon);

			try {
				BAP.options.server = (cud.server[0]);
			} catch (e) {
				BAP.options.server = ({"id" : 0, "name" : "Evidon"});
			}

			createPopupLayer();
		} catch (e) {
			console.log('[copyJSON() error]', e);
		}
	}

	function logIdString() {
		return [ encodeURIComponent(BAP.options.aid || 0), encodeURIComponent(BAP.options.icaid || 0), 
		         encodeURIComponent((BAP.options.ecaid || 0)).replace(/_/g, '$underscore$').replace(/%2F/g, '$fs$'),
		         encodeURIComponent(BAP.options.nid || 0) ].join("_") + '/';
	}

	function actionWrite(l) {
		dropPixel(
			'//l.betrad.com/ct/'
				+ logIdString()
				+ [country, l, '300', '250', 242, qstring.coid, '0'].join('/') + '/'
			 	+ 'pixel.gif?v=' + 3 + '&d=' + domain+ '&r=' + Math.random()
		);
	}

	function dropPixel(u) {
		var img = new Image(0,0);
		img.src = u;
		body.appendChild(img);
	}

	function action(state) {
		var l, lo = log, sw = false;

		/*
			T -- tag loaded; (this setting is no longer called)
			I -- icon (L1) shown;
			S -- notice (L2) shown;
			A -- advertiser clicked;
			B -- IAB clicked;
			M -- more info;
			O -- dynamic inclusion overwrite;
		*/

		if (!lo) {
			// DEPRECATED: 'T':[0,'1/0/0/0/0/0'], 
			lo = {'I':[0,'0/1/0/0/0/0'],
				  'S':[0,'0/0/1/0/0/0'],
				  'A':[0,'0/0/0/1/0/0'],
				  'B':[0,'0/0/0/0/1/0'],
				  'M':[0,'0/0/0/0/0/1'],
				  'O':[0,'0/1/0/0/0/0']};
		}

		if (lo[state][0] === 0) {
			lo[state][0] = 1;
			l = lo[state][1];
			sw = true;
		}

		log = lo;

		if (!sw) { return; }

		actionWrite(l);
	}

	/**
	 * This method was created to resolve and limit the DNS queries per notice display.
	 * This particular method only handles MORE INFO link since this link might need to 
	 * contain several notice ids.
	 */
	function moreInfoLink() {
		link('bap-link-1', DOMAIN_INFO + 'more_info/' + qstring.nid);
	}

	function iabLink() {
		link('bap-link-2', DOMAIN_INFO + 'about_behavioral_advertising/section1?n=' + qstring.nid);
	}

	/**
	 * This method was created to resolve and limit the DNS queries per notice display.
	 * Its triggered on mouse over, and once executed, sets the correct href destination
	 * for all of the links on the L2.
	 */
	function link(tag, dest) {
		// NOTE: reattached every time more info link is hovered over in case a new notice
		// has been appended to the coveredNotices. Might be an overkill?
		$(tag).href = dest;
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

	function addEvent(elm, evType, fn) {
		if (elm.addEventListener) {
			elm.addEventListener(evType, fn, false);
		} else {
			evType = 'on' + evType;
			if (elm.attachEvent) {
				elm.attachEvent(evType, fn);
			} else {
				elm[evType] = fn;
			}
		}
	}

	function frameSize() {
		var width = -1, height = -1, iw = window.innerWidth, de = document.documentElement;
		try {
			if (typeof (iw) == "number") {
				width = iw;
				height = window.innerHeight;
			} else if (de && de.clientWidth) {
				width = de.clientWidth;
				height = de.clientHeight;
			} else if (body && body.clientWidth) {
				width = body.clientWidth;
				height = body.clientHeight;
			}
		} catch (e) {}

		return [height, width];
	}

	function createPopupLayer() {
		var noticeHTML = '', generic_msg = '', z = '',
		 div = $('BAP-holder'), lds = '', qw = '';

		/* translation scaffold */
		var sc = '[ X ]',
		 sm = 'More information &amp; opt-out options',
		 sw = 'What is interest-based advertising?',
		 sl = 'Learn about your choices',
		 se = 'Privacy controls by Evidon&#153;',
		 sg1 = 'This ad has been matched to your interests. It was selected for you based on your browsing activity.',
		 sg2 = 'This ad may have been matched to your interests based on your browsing activity.',
		 sg3 = 'helped',
		 sg4 = 'determine that you might be interested in an ad like this.',
		 sg5 = 'select this ad for you.';
		 sg6 = 'selected this ad for you.';

		function trans(z) {
			try {
				if (!z.generic1) { return; }

				sg1 = z.generic1;
				sg2 = z.generic2;
				sg3 = z.generic3;
				sg4 = z.generic4;
				sg5 = z.generic5;
				sg6 = z.generic6;

				sm = z.link1;
				sw = z.link2;
				sl = z.link3;
				se = z.footer;
			} catch (err) {} 
		}

		// translation layer
		if (!BAP.options.noDefault) {
			trans(BAP.options.defTrans);
		}

		trans(BAP.options.translation);

		se = '<span class="bap-gray">' + se + '</span>';

		if (BAP.options.behavioral == 'definitive') {
			generic_msg = sg1;
			if (BAP.options.advName) {
				generic_msg += '<br><br>' + BAP.options.server.name + ' ' + sg3 + ' ' + BAP.options.advName + ' ' + sg4;
			}
		} else if (BAP.options.behavioral == 'single') {
			generic_msg = sg2;
			if (BAP.options.advName) {
				generic_msg += '<br><br>' + BAP.options.advName + ' ' + sg6;
			}
		} else if (BAP.options.behavioral == 'uncertain') {
			generic_msg = sg2;

			if (BAP.options.advName) {
				generic_msg += '<br><br>' + BAP.options.server.name + ' ' + sg3 + ' ' + BAP.options.advName + ' ' + sg5;
			}
		} else if (BAP.options.behavioral == 'custom') {
			generic_msg = BAP.options.behavioralCustomMessage;
		}

		lds = browser.IE && browser.QuirksMode ? ' style="width:294px !important"' : '';
		qw = browser.IE && browser.QuirksMode ? 'width:296px !important;' : 'width:auto !important;max-width:299px;min-width:276px;';
		noticeHTML = '<div id="bap-notice" class="bap1 bap-notice" style="' + qw + ';"><div class="bap-div"><div class="bap-img-container">' + (BAP.options.advLogo ? ( (BAP.options.advLink && !BAP.options.hideCustom) ? '<a class="bap-blue" target="_blank" href="' + BAP.options.advLink + '" onclick="BAP.action(\'A\');"><img id="bap-logo" border="0" src="' +  BAP.options.advLogo + '"></a>' : '' ) : '')  + '</div><p>' + generic_msg + '</p><div class="bap-link-div"' + lds + '><a class="bap-blue" href="about:blank" id="bap-link-1" target="_blank" onclick="BAP.action(\'M\');" onmouseover="BAP.moreInfoLink()">' + sm + ' &raquo;</a></div>' +

		( BAP.options.hideWhatIs ? '' : 
		'<div class="bap-link-div"' + lds + '><a class="bap-blue" href="about:blank" id="bap-link-2" target="_blank" onclick="BAP.action(\'B\');" onmouseover="BAP.iabLink()">' + sw + ' &raquo;</a></div>' );

		if (!BAP.options.hideCustom) {
			if (BAP.options.advLink && BAP.options.advMessage) {
				noticeHTML += '<div class="bap-link-div"' + lds + '><a class="bap-blue" target="_blank" href="' + BAP.options.advLink + '" onclick="BAP.action(\'A\');">' + BAP.options.advMessage + ' &raquo;</a></div>';
			} else if (BAP.options.advMessage) {
				noticeHTML += '<div class="bap-link-div"' + lds + '>' + BAP.options.advMessage + '</div>';
			}
		}

		noticeHTML += '<div class="bap-link-div"' + lds + '>' + se + '</div></div></div>';


		if (!div) {
			div = document.createElement('div');
			div.setAttribute('id', 'BAP-holder');

			body.appendChild(div);
			div = $('BAP-holder');
		}

		div.innerHTML = div.innerHTML + noticeHTML;
	}

	// start up.
	addEvent(window, "load", function() { start(); });

	API.copyJSON = copyJSON;
	API.options = BAP.options;
	API.moreInfoLink = moreInfoLink;
	API.iabLink = iabLink;
	API.action = action;
	API.$ = $;

	return API;
}());