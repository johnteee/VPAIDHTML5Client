var jsTagArr = document.getElementsByTagName('script');
var stackTag = jsTagArr[jsTagArr.length - 1];

var isFTG = (stackTag.src.indexOf('suitesmart') > -1);

if ( isFTG ) {
  ftgTag = stackTag;
} else {
  for (i=0;i<jsTagArr.length;i++ ) {
      if ( jsTagArr[i].src.indexOf('suitesmart') > -1 ) {
        ftgTag = jsTagArr[i];
        break;
        }
    }
}
function _FTGTag() 
{
    this.ftgTag  = ftgTag;
    var _Param = new Array();
    _Param['SIT'] = null;
    _Param['CRE'] = null;
    _Param['PLA'] = null;
    _Param['ADI'] = null;
    this.params = _Param;
    this.ftParam = _FTGetParam;
    this.Render  = _FTRenderTag;
	this.noPop   = '49113813,49113814,49113815,49113923,49113925,49113927,49113863,49113865,49113869,49113897,49113899,49113900,49113914,49113915,49113916,49113937,49113939,49113940,49113883,49113885,49113886,49113827,49113829,49113830,49113844,49113846,49113848,49113327,49113329,49113330,49113521,49113522,49113523,49113393,49113394,49113397,49113495,49113497,49113498,49113972,49113973,49113974,49113442,49113443,49113445,49114004,49114006,49114007,49113548,49113549,49113550,49113372,49113374,49113376,49113347,49113348,49113350,49113420,49113421,49113423,49113574,49113575,49113577,49113768,49113769,49113770,49113662,49113663,49113666,49113745,49113747,49113748,49114029,49114031,49114032,49113719,49113720,49113721,49114057,49114058,49114063,49113794,49113796,49113798,49113636,49113638,49113639,49113613,49113614,49113615,49113691,49113692,49113693,48054664,48054666,48054669,49210087,49210092,49210095,48054653,48054654,48054656,47080961,47080962,47080963,47080965,47080966,47080967,47081258,47081260,47081262,47081264,47081266,47081268,48054683,48054685,48054686';
	this.trGID   = null;
}
function _FTGetParam() 
{
    if ( this.ftgTag.src.indexOf('?') > -1 ) {
        bits = this.ftgTag.src.toString().split('?');
        var _tagQ = bits[1].split(/;|&/);
          for (var i in _tagQ){
             var t = _tagQ[i].toString().split('=');
             this.params[t[0]] = t[1];
             var j = 1;
             while (t[++j])  this.params[t[0]] += '='+ t[j];
        }
    }
}
function _FTRenderTag() 
{
	var samExpGID 	= [ this.s2g[this.params['SIT']] , this.trGID ];
	var pFlag 		= ( (typeof(this.s2g[this.params['SIT']]) != 'undefined') && (this.noPop.indexOf(this.params['PLA']) == -1) ) ? 0:1;

	this.GID = samExpGID[pFlag];
	var ftgStr    = '<SCR'+'IPT LANGUAGE="JavaScript" SRC="http://as1.suitesmart.com/'+this.SID+'/G'+this.GID+'.js" ID="FTG" GID="'+this.GID+'" CRE="'+ this.params['CRE']+'" PLA="'+ this.params['PLA']+'" ADI="'+ this.params['ADI']+'"></SCR'+'IPT>';
	document.write(ftgStr);
}

var FTag = new _FTGTag();
FTag.SID   =  93691;
FTag.trGID = 10638;
FTag.s2g = {319656:10676,
363295:10677,
378663:10678,
397101:10679,
406595:10680,
426266:10681,
426275:10682,
446623:10683,
446633:10647,
507690:10684,
598068:10685,
899110:10686,
903201:10687,
903205:10688,
922642:10689};
FTag.ftParam();
FTag.Render();