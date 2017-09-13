
 //dbugScripts - will include non-compressed versions of this code if "jsdebug=true" is in the url of this page,
 //otherwise it will execute this code.

 if(!dbugScripts("http://publish.cnet.com:8100/html/rb/js/tron/news/",["news.tron.pagetools.js"])) {
 /*	news.tron.pagetools.js - packed	*/
       if($("fontSizeStyles")){PageTools.setFontStyles();}window.addEvent("domready",function(){$$(".contentTools a.share").each(function(A){A.addEvent("mouseenter",PageTools.openShare.bind(PageTools));});$$(".contentTools a.email").each(function(A){A.addEvent("click",PageTools.email);});$$(".contentTools a.print").each(function(A){A.addEvent("click",PageTools.print);});$$(".contentTools .fontSize a.smaller").each(function(A){A.addEvent("click",PageTools.fontSizeSmaller.bind(PageTools));});$$(".contentTools .fontSize a.larger").each(function(A){A.addEvent("click",PageTools.fontSizeLarger.bind(PageTools));});});
 /* end packed code */
 }
       