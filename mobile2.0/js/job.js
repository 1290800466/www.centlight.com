/**
 * 轻量级首页招贤纳士jQuery代码
 */

$(function(){
	$(".m_jobs_banner_right1").click(function(){
		  $(".m_jobs_banner_bottom").css("display","none");
		  $(".m_jobs_banner_technology_web").css("display","none");
		  $(".m_jobs_banner_technology_php").css("display","none");
		  $(".m_jobs_banner_right1").css("opacity","1")
		  $(".m_jobs_banner_right2").css("opacity","0.5")
		  $(".m_jobs_banner_right3").css("opacity","0.5")
		  $(".m_jobs_banner_technology_ui").css("display","block");
		  
	});
	$(".m_jobs_banner_right2").click(function(){
		  $(".m_jobs_banner_bottom").css("display","none");
		  $(".m_jobs_banner_technology_php").css("display","none");
		  $(".m_jobs_banner_technology_ui").css("display","none");
		  $(".m_jobs_banner_right1").css("opacity","0.5")
		  $(".m_jobs_banner_right3").css("opacity","0.5")
		  $(".m_jobs_banner_right2").css("opacity","1")
		  $(".m_jobs_banner_technology_web").css("display","block");
	});
	$(".m_jobs_banner_right3").click(function(){
		  $(".m_jobs_banner_bottom").css("display","none");
		  $(".m_jobs_banner_technology_ui").css("display","none");
		  $(".m_jobs_banner_technology_web").css("display","none");
		  $(".m_jobs_banner_right1").css("opacity","0.5")
		  $(".m_jobs_banner_right2").css("opacity","0.5")
		  $(".m_jobs_banner_right3").css("opacity","1")
		  $(".m_jobs_banner_technology_php").css("display","block");
	});
	//display:none
   

});