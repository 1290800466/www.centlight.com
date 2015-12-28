/**
 * pc端js代碼
 */
/*1、判断打开设备*/
var system={win:false,mac:false,xll:false};
var p=navigator.platform;
var local= location.href;
system.win=p.indexOf("Win")==0;
system.mac=p.indexOf("Mac")==0;
system.x11=(p=="X11")||(p.indexOf("Linux")==0);
if(system.win||system.mac||system.xll){
	
}else{
	if(local=='http://www.centlight.com/child_web.html'){
		window.location.href="http://www.centlight.com/mobile2.0/m_jobs.html";
	}else if(local=='http://www.centlight.com/child_ui.html'){
		window.location.href="http://www.centlight.com/mobile2.0/m_jobs.html";
	}else if(local=='http://www.centlight.com/child_php.html'){
		window.location.href="http://www.centlight.com/mobile2.0/m_jobs.html";
	}else{
		window.location.href="http://www.centlight.com/mobile2.0/";
	}
}
