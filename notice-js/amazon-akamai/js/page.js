window.bap_amzn=!0;
function addEvent(a,b,c){
	a.addEventListener?a.addEventListener(b,c,!1):(b="on"+b,a.attachEvent?a.attachEvent(b,c):a[b]=c)
}
function handleAmazonDance(){
	var a,b=document.getElementsByTagName('iframe');
	for(a=0;a<b.length;a++) {
		b[a].src&&b[a].contentWindow.postMessage('BAPAMZN|1','*')
	}
}
addEvent(window,'load',function(){handleAmazonDance();setTimeout(handleAmazonDance, 1000)});
addEvent(window, 'message', function(e) {
	var m=e;if(e.data){m=e.data;}
	if(m.indexOf('BAP')!==0)return
	if(m.substring(0,( m.indexOf("|")||m.length))=='BAPFRAMEID')handleAmazonDance()
});
function eviAmazonFlash() { 
	window.parent.postMessage("BAPAMZN|1","*");
}

/* prod:
window.bap_amzn=!0;function addEvent(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):(b="on"+b,a.attachEvent?a.attachEvent(b,c):a[b]=c)}function handleAmazonDance(){var a,b=document.getElementsByTagName("iframe");for(a=0;a<b.length;a++)b[a].src&&b[a].contentWindow.postMessage("BAPAMZN|1","*")}addEvent(window,"load",handleAmazonDance);addEvent(window,"message",function(a){var b=a;a.data&&(b=a.data);0===b.indexOf("BAP")&&"BAPFRAMEID"==b.substring(0,b.indexOf("|")||b.length)&&handleAmazonDance()});function eviAmazonFlash(){window.parent.postMessage("BAPAMZN|1","*");}
*/