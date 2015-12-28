/**
 * 手机端页面js代码
 */
/*1、判断打开设备*/
var system ={  
	win : false,  
	mac : false,  
	xll : false 
};  
//检测平台   
var p = navigator.platform;  
system.win = p.indexOf("Win") == 0;  
system.mac = p.indexOf("Mac") == 0;  
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
var local= location.href;
//跳转语句   
if(system.win||system.mac||system.xll){
	if(local=='http://www.centlight.com/mobile_web.html'){
		window.location.href="http://www.centlight.com/child_web.html";
	}else if(local=='http://www.centlight.com/mobile_ui.html'){
		window.location.href="http://www.centlight.com/child_ui.html";
	}else if(local=='http://www.centlight.com/mobile_php.html'){
		window.location.href="http://www.centlight.com/child_php.html";
	}else{
		window.location.href="http://www.centlight.com/";
	}  
}

/* 2、当页面滚动超过一屏时显示返回顶部按钮 ,改为50像素了*/
$(document).ready(function(){
	$("#go_top").hide();
	$(function () {
		var height=$(window).height();
		var height=height-300;
		$(window).scroll(function(){
			if ($(window).scrollTop()>50){
				$("#go_top").fadeIn(500);
			}else{
				$("#go_top").fadeOut(500);
				}
		});
		$("#go_top").click(function(){
			$('body,html').animate({scrollTop:0},100);
			return false;
		});
	});
});


/*4、设置焦点图属性*/
$(document).ready(function(){
	$(".mobile_banner").css("width",$(document.body).outerWidth(true));
	$(".banList").css("width",8*$(document.body).outerWidth(true));
	$(".banList li").css("width",$(document.body).outerWidth(true));
	$(function () {
		//每次转屏时，刷新页面
		$(window).on('orientationchange', function() {
			//alert(1);
			window.location.reload();
		});
	});
});

