document.write('<!-- Copyright 2008 DoubleClick, a division of Google Inc. All rights reserved. -->\r\n<!-- Code auto-generated on Thu Jun 10 21:14:01 EDT 2010 -->\r\n<script src=\"http://s0.2mdn.net/879366/flashwrite_1_2.js\"><\/script>');document.write('\r\n');

function DCFlash(id,pVM){
var swf = "http://s0.2mdn.net/1361550/K1381_NAS_BTCQ_CAMRY_160.swf";
var gif = "http://s0.2mdn.net/1361550/K1381_NAS_BTCQ_CAMRY_160x600.jpg";
var minV = 8;
var FWH = ' width="160" height="600" ';
var url = escape("http://ad.doubleclick.net/click%3Bh%3Dv8/3a0f/17/b4/%2a/o%3B225728449%3B0-0%3B0%3B49604512%3B2321-160/600%3B35660124/35677965/1%3B%3B%7Esscs%3D%3fhttp://network.realmedia.com/RealMedia/ads/click_lx.ads/hotindienews/ros/160x600/sx/ss/a/L32/1999691563/x10/USNetwork/Sample_Eliya/nissantest.html/536b424771555647356c414141353646?http://www.nissanusa.com/altima/index.html?dcp=zmm.49604512.&dcc=35660124.225728449");
var fscUrl = url;
var fscUrlClickTagFound = false;
var wmode = "opaque";
var bg = "";
var dcallowscriptaccess = "never";

var openWindow = "false";
var winW = 0;
var winH = 0;
var winL = 0;
var winT = 0;

var moviePath=swf.substring(0,swf.lastIndexOf("/"));
var sm=new Array();


var defaultCtVal = escape("http://ad.doubleclick.net/click%3Bh%3Dv8/3a0f/17/b4/%2a/o%3B225728449%3B0-0%3B0%3B49604512%3B2321-160/600%3B35660124/35677965/1%3B%3B%7Esscs%3D%3fhttp://network.realmedia.com/RealMedia/ads/click_lx.ads/hotindienews/ros/160x600/sx/ss/a/L32/1999691563/x10/USNetwork/Sample_Eliya/nissantest.html/536b424771555647356c414141353646?http://www.nissanusa.com/altima/index.html?dcp=zmm.49604512.&dcc=35660124.225728449");
var ctp=new Array();
var ctv=new Array();
ctp[0] = "clickTag";
ctv[0] = "";


var fv='"moviePath='+moviePath+'/'+'&moviepath='+moviePath+'/';
for(i=1;i<sm.length;i++){if(sm[i]!=""){fv+="&submovie"+i+"="+escape(sm[i]);}}
for(var ctIndex = 0; ctIndex < ctp.length; ctIndex++) {
  var ctParam = ctp[ctIndex];
  var ctVal = ctv[ctIndex];
  if(ctVal != null && typeof(ctVal) == 'string') {
    if(ctVal == "") {
      ctVal = defaultCtVal;
    }
    else {
      ctVal = escape("http://ad.doubleclick.net/click%3Bh%3Dv8/3a0f/17/b4/%2a/o%3B225728449%3B0-0%3B0%3B49604512%3B2321-160/600%3B35660124/35677965/1%3B%3B%7Esscs%3D%3fhttp://network.realmedia.com/RealMedia/ads/click_lx.ads/hotindienews/ros/160x600/sx/ss/a/L32/1999691563/x10/USNetwork/Sample_Eliya/nissantest.html/536b424771555647356c414141353646?" + ctVal);
    }
    if(ctParam.toLowerCase() == "clicktag") {
      fscUrl = ctVal;
      fscUrlClickTagFound = true;
    }
    else if(!fscUrlClickTagFound) {
      fscUrl = ctVal;
    }
    fv += "&" + ctParam + "=" + ctVal;
  }
}
fv+='"';
var bgo=(bg=="")?"":'<param name="bgcolor" value="#'+bg+'">';
var bge=(bg=="")?"":' bgcolor="#'+bg+'"';
function FSWin(){if((openWindow=="false")&&(id=="DCF0"))alert('openWindow is wrong.');
var dcw = 800;
var dch = 600;
// IE
if(!window.innerWidth)
{
  // strict mode
  if(!(document.documentElement.clientWidth == 0))
  {
    dcw = document.documentElement.clientWidth;
    dch = document.documentElement.clientHeight;
  }
  // quirks mode
  else if(document.body)
  {
    dcw = document.body.clientWidth;
    dch = document.body.clientHeight;
  }
}
// w3c
else
{
  dcw = window.innerWidth;
  dch = window.innerHeight;
}
if(openWindow=="center"){winL=Math.floor((dcw-winW)/2);winT=Math.floor((dch-winH)/2);}window.open(unescape(fscUrl),id,"width="+winW+",height="+winH+",top="+winT+",left="+winL+",status=no,toolbar=no,menubar=no,location=no");}this.FSWin = FSWin;
ua=navigator.userAgent;
if(minV<=pVM&&(openWindow=="false"||(ua.indexOf("Mac")<0&&ua.indexOf("Opera")<0))){
	var adcode='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="'+id+'"'+FWH+'>'+
		'<param name="movie" value="'+swf+'"><param name="flashvars" value='+fv+'><param name="quality" value="high"><param name="wmode" value="'+wmode+'"><param name="base" value="'+swf.substring(0,swf.lastIndexOf("/"))+'"><PARAM NAME="AllowScriptAccess" VALUE="'+dcallowscriptaccess+'">'+bgo+
		'<embed src="'+swf+'" flashvars='+fv+bge+FWH+' type="application/x-shockwave-flash" quality="high" swliveconnect="true" wmode="'+wmode+'" name="'+id+'" base="'+swf.substring(0,swf.lastIndexOf("/"))+'" AllowScriptAccess="'+dcallowscriptaccess+'"></embed></object>';
  if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);}
}else{
	document.write('<a target="_blank" href="'+unescape(url)+'"><img src="'+gif+'"'+FWH+'border="0" alt="" galleryimg="no"></a>');
}}
var pVM=0;var DCid=(isNaN("225728449"))?"DCF2":"DCF225728449";
if(navigator.plugins && navigator.mimeTypes.length){
  var x=navigator.plugins["Shockwave Flash"];if(x && x.description){var pVF=x.description;var y=pVF.indexOf("Flash ")+6;pVM=pVF.substring(y,pVF.indexOf(".",y));}}
else if (window.ActiveXObject && window.execScript){
  window.execScript('on error resume next\npVM=2\ndo\npVM=pVM+1\nset swControl = CreateObject("ShockwaveFlash.ShockwaveFlash."&pVM)\nloop while Err = 0\nOn Error Resume Next\npVM=pVM-1\nSub '+DCid+'_FSCommand(ByVal command, ByVal args)\nCall '+DCid+'_DoFSCommand(command, args)\nEnd Sub\n',"VBScript");}
eval("function "+DCid+"_DoFSCommand(c,a){if(c=='openWindow')o"+DCid+".FSWin();}o"+DCid+"=new DCFlash('"+DCid+"',pVM);");
//-->

document.write('\r\n<noscript><a target=\"_blank\" href=\"http://ad.doubleclick.net/click%3Bh%3Dv8/3a0f/17/b4/%2a/o%3B225728449%3B0-0%3B0%3B49604512%3B2321-160/600%3B35660124/35677965/1%3B%3B%7Esscs%3D%3fhttp://network.realmedia.com/RealMedia/ads/click_lx.ads/hotindienews/ros/160x600/sx/ss/a/L32/1999691563/x10/USNetwork/Sample_Eliya/nissantest.html/536b424771555647356c414141353646?http://www.nissanusa.com/altima/index.html?dcp=zmm.49604512.&dcc=35660124.225728449\"><img src=\"http://s0.2mdn.net/1361550/K1381_NAS_BTCQ_CAMRY_160x600.jpg\" width=\"160\" height=\"600\" border=\"0\" alt=\"\" galleryimg=\"no\"></a></noscript>\r\n<script src=\"http://static.suitesmart.com/cs/93691/tags/dfa.js?SIT=406595;PLA=49604512;CRE=35660124;ADI=225728449\"><\/script>');document.write('');