$(function(){
	var spLength = $('.slide_point span').length,
		scimgWidth = $(window).width(),
		sulWidth = scimgWidth * spLength,
		sNum = 0;
		$(".slide_cont ul").width(sulWidth);
		$(".slide_cont ul li").width(scimgWidth);
	var sTimer = setInterval(moveSlide,2000);
	function moveSlide(){
			sNum++;
			if (sNum >= spLength) {
				sNum = 0;
			};
			showPics(sNum);
		}
	//鼠标移入下方的块进行滚动
	$('.slide_point span').mouseover(function(){
			clearInterval(sTimer);
			sNum = $(this).index();
			showPics(sNum);
		}).mouseleave(function(){
			sTimer = setInterval(moveSlide,2000);
		});
	//图片自动滚动
	function showPics(sNum){
		$(".slide_point span").eq(sNum).addClass("cur_point").siblings().removeClass("cur_point");
		$(".slide_cont ul").animate({
			"margin-left" : -scimgWidth * sNum 
		});

	}
});
	