	//获取画布
	var canvas = document.getElementById('canvas');
	var can = canvas.getContext('2d');

	canvas.onselectstart=function(){return false} //画布双击时会出现蓝底现象，禁止之！

	// 清除画布功能
	document.getElementById('clearPic').onclick=function(){
		can.clearRect(0,0,880,400);
	}
	//图片保存功能，将从 data 协议中获取的图像信息送到后台处理，提供下载功能
	document.getElementById('savePic').onclick=function(){
		var b64=canvas.toDataURL().substring(22); //利用 data 协议获取图片信息，一般文件比较大，用 post 传到后台
		document.getElementById('imgdata').value=b64;
		document.getElementById('myForm').submit();
	}

	
	//获取 工具按钮
	var Brush = document.getElementById('Brush');           //画笔
	var Eraser = document.getElementById('Eraser');         //橡皮擦
	var Paint = document.getElementById('Paint');           //油漆桶
	var Straw = document.getElementById('Straw');           //吸管
	var Text = document.getElementById('Text');             //文字
	var Magnifier = document.getElementById('Magnifier');   //放大镜
	
	//获取 形状按钮
	var line = document.getElementById('line');             //直线
	var arc = document.getElementById('arc');               //圆圈
	var rect = document.getElementById('rect');             //矩形圈
	var poly = document.getElementById('poly');             //三角形
	var arcfill = document.getElementById('arcfill');       //实心圆
	var rectfill = document.getElementById('rectfill');     //实心矩形
	
	//将12个工具和形状放入一个数组 actions[] 中 
	var actions=[Brush,Eraser,Paint,Straw,Text,Magnifier,line,arc,rect,poly,arcfill,rectfill];
	
	//状态设定，显示是否选中状态，type=1为工具，形状和粗细的选中状态，type=0为颜色选中状态
	function setStatus(arr,num,type){ 
		for(var i=0;i<arr.length;i++){
			if(i==num){
				if(type){arr[i].style.background="yellow";}
				else{arr[i].style.border="1px solid red";}
			}
			else{
				if(type){arr[i].style.background="#eee";}
				else{arr[i].style.border="1px solid #ccc";}
			}
		}
	}
	
	/******* 自由画笔 *******/
	function dBrush(n){
		setStatus(actions,n,1);
		//鼠标按下的时候
		var status = 0;
		canvas.onmousedown=function(e){
			e=window.event||e;
			var sX=e.pageX-this.offsetLeft;
			var sY=e.pageY-this.offsetTop;
			can.beginPath();
			can.moveTo(sX,sY);
			status=1;
		}
		//鼠标移动的时候
		canvas.onmousemove=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			if(status==1){
				can.lineTo(eX,eY);
				can.stroke();
			}else {return false}
					
		}
		//鼠标抬起的时候
		canvas.onmouseup=function(){
			can.closePath();
			status=0;			
		}
		//鼠标移出canvas画布结束画图
		canvas.onmouseout=function(){
			can.closePath();
			status=0;
		}
	}

	/******* 橡皮擦 *******/
	function dEraser(n){
		setStatus(actions,n,1);
		var status=0;
		//鼠标按下也开始清除，范围为当前线宽的两倍
		canvas.onmousedown=function(e){
			e=window.event||e;
			var sX=e.pageX-this.offsetLeft;
			var sY=e.pageY-this.offsetTop;
			can.clearRect(sX-can.lineWidth,sY-can.lineWidth,can.lineWidth*2,can.lineWidth*2);
			status=1; //状态标志位
		}
		// 鼠标移动时跟着轨迹一齐擦除
		canvas.onmousemove=function(e){
			e=window.event||e;
			var X=e.pageX-this.offsetLeft;
			var Y=e.pageY-this.offsetTop;
			if(status){
				can.clearRect(X-can.lineWidth,Y-can.lineWidth,can.lineWidth*2,can.lineWidth*2);
			}
			
		}
		//鼠标抬起，清除状态标志位
		canvas.onmouseup=function(){
			status=0;
		}
		canvas.onmouseout=null
	}

	/******* 油漆桶 *******/
	function dPaint(n){
		setStatus(actions,n,1);
		canvas.onmousedown=function(){
			can.fillRect(0,0,880,400);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}

	/******* 吸管 *******/
	function dStraw(n){
		setStatus(actions,n,1);
		canvas.onmousedown=function(e){
			e=window.event||e;
			var x=e.pageX-this.offsetLeft;
			var y=e.pageY-this.offsetTop;
			var px=can.getImageData(x,y,1,1); // 一像素的含义为：px.data=[R,G,B,A]
			var color='rgb('+px.data[0]+','+px.data[1]+','+px.data[2]+')';
			can.strokeStyle=color;
			can.fillStyle=color;
			dBrush(0); //吸取颜色后返回自由画笔工具
		}
		canvas.onmouseup=null;
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 文字 *******/
	function dText(n){
		setStatus(actions,n,1);
		canvas.onmousedown=function(e){
			e=window.event||e;
			var x=e.pageX-this.offsetLeft;
			var y=e.pageY-this.offsetTop;
			var val = window.prompt('输入填充的文字','');
			if(val==null) return false; //输入为空则返回
			can.fillText(val,x,y);
			dBrush(0); //填入文字后返回自由画笔工具
		}
		canvas.onmouseup=null;
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 放大镜 *******/
	function dMagnifier(n){
		setStatus(actions,n,1);
		var val = window.prompt('输入放大的百分比？','100');
		var w=880*val/100;
		var h=400*val/100;
		canvas.style.width=parseInt(w)+'px';
		canvas.style.height=parseInt(h)+'px';
		dBrush(0); //设置放大倍数后返回自由画笔工具
	}

	/******* 直线 *******/
	function dLine(n){
		setStatus(actions,n,1);
		//画直线，鼠标按下时，当前鼠标位置为起点
		canvas.onmousedown=function(e){
			e=window.event||e;
			var sX=e.pageX-this.offsetLeft;
			var sY=e.pageY-this.offsetTop;
			can.beginPath();
			can.moveTo(sX,sY);
		}
		//画直线，鼠标抬起时，当前鼠标位置为终点
		canvas.onmouseup=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			can.lineTo(eX,eY);
			can.closePath();
			can.stroke();
		}
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 空心圆圈 *******/
	function dArc(n){
		setStatus(actions,n,1);
		var sX=0;  //内部的“全局标量”
		var sY=0;
		//画空心圆，鼠标按下时，当前鼠标位置为圆心
		canvas.onmousedown=function(e){
			e=window.event||e;
			sX=e.pageX-this.offsetLeft;
			sY=e.pageY-this.offsetTop;
		}		
		//画空心圆，鼠标抬起时，当前鼠标位置为外圆结束点
		canvas.onmouseup=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			var dX=eX-sX
			var dY=eY-sY;
			var r = Math.sqrt(Math.pow(dX,2)+Math.pow(dY,2)); //计算出半径
			can.beginPath();
			can.arc(sX,sY,r,0,360,false);
			can.closePath();
			can.stroke();
		}
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 空心矩形 *******/
	function dRect(n){
		setStatus(actions,n,1);
		var sX=0; //内部的“全局标量”
		var sY=0;
		//画空心矩形，鼠标按下时，当前鼠标位置为矩形的左上角
		canvas.onmousedown=function(e){ 
			e=window.event||e;
			sX=e.pageX-this.offsetLeft;
			sY=e.pageY-this.offsetTop;
		}
		//画空心矩形，鼠标抬起时，当前鼠标位置为矩形的右下角
		canvas.onmouseup=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			var w=eX-sX; //矩形的宽
			var h=eY-sY; //矩形的高
			can.strokeRect(sX,sY,w,h);
		}
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 空心三角形 *******/
	function dPoly(n){
		setStatus(actions,n,1);
		var sX=0;
		var sY=0;
		//画三角形，鼠标按下，当前鼠标位置为三角形顶点坐标
		canvas.onmousedown=function(e){
			e=window.event||e;
			sX=e.pageX-this.offsetLeft;
			sY=e.pageY-this.offsetTop;
			can.beginPath();
			can.moveTo(sX,sY);
		}		
		//画三角形，鼠标抬起时，当前鼠标位置为三角形右边的结束点
		canvas.onmouseup=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			var dX=eX-sX;
			var dY=eY-sY; //三角形的高
			var w = Math.sqrt(Math.pow(dX,2)+Math.pow(dY,2)); //三角形腰的长度
			var bottom = 2*Math.sqrt(Math.pow(w,2)-Math.pow(dY,2)); //底边长度
			can.lineTo(eX,eY);
			can.lineTo(eX-bottom,eY);
			can.lineTo(sX,sY);
			can.closePath();
			can.stroke();
		}
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 实心圆形 *******/
	function dArcFill(n){
		setStatus(actions,n,1);
		var sX=0;  //内部的“全局标量”
		var sY=0;
		//画实心圆，鼠标按下时，当前鼠标位置为圆心
		canvas.onmousedown=function(e){
			e=window.event||e;
			sX=e.pageX-this.offsetLeft;
			sY=e.pageY-this.offsetTop;
		}		
		//画实心圆，鼠标抬起时，当前鼠标位置为外圆结束点
		canvas.onmouseup=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			var dX=eX-sX
			var dY=eY-sY;
			var r = Math.sqrt(Math.pow(dX,2)+Math.pow(dY,2)); //计算出半径
			can.beginPath();
			can.arc(sX,sY,r,0,360,false);
			can.closePath();
			can.fill();
		}
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	/******* 实心矩形 *******/
	function dRectFill(n){
		setStatus(actions,n,1);
		var sX=0; //内部的“全局标量”
		var sY=0;
		//画实心矩形，鼠标按下时，当前鼠标位置为矩形的左上角
		canvas.onmousedown=function(e){ 
			e=window.event||e;
			sX=e.pageX-this.offsetLeft;
			sY=e.pageY-this.offsetTop;
		}
		//画实心矩形，鼠标抬起时，当前鼠标位置为矩形的右下角
		canvas.onmouseup=function(e){
			e=window.event||e;
			var eX=e.pageX-this.offsetLeft;
			var eY=e.pageY-this.offsetTop;
			var w=eX-sX; //矩形的宽
			var h=eY-sY; //矩形的高
			can.fillRect(sX,sY,w,h);
		}
		canvas.onmousemove=null;
		canvas.onmouseout=null;
	}

	//设置默认值（暂不默认）
	//dBrush(0); 
	
	
	//画线种类的获取
	var line1 = document.getElementById('line1px');
	var line3 = document.getElementById('line3px');
	var line5 = document.getElementById('line5px');
	var line8 = document.getElementById('line8px');
	//将画线的类型放入lArr中，便于取值
	var lArr = [line1,line3,line5,line8];
	
	//线宽设置
	function sL(n){
		setStatus(lArr,n,1);
		switch(n){
			case 0:can.lineWidth=1; break;
			case 1:can.lineWidth=3; break;
			case 2:can.lineWidth=5; break;
			case 3:can.lineWidth=8; break;
			default:can.lineWidth=1;
		}
	}
	
	
	//颜色对象的获取
	var Red = document.getElementById('red');
	var Green = document.getElementById('green');
	var Blue = document.getElementById('blue');
	var Yellow = document.getElementById('yellow');
	var White = document.getElementById('white');
	var Black = document.getElementById('black');
	var Pink = document.getElementById('pink');
	var Purple = document.getElementById('purple');
	var Cyan = document.getElementById('cyan');
	var Orange = document.getElementById('orange');
	//将颜色的类型放入cArr中，便于取值
	var cArr=[Red,Green,Blue,Yellow,White,Black,Pink,Purple,Cyan,Orange];
	
	//颜色设置
	function setColor(n){
		setStatus(cArr,n,0);
		switch(n){
			case 0:{can.strokeStyle="red";can.fillStyle="red"};break;
			case 1:{can.strokeStyle="green";can.fillStyle="green"};break;
			case 2:{can.strokeStyle="blue";can.fillStyle="blue"};break;
			case 3:{can.strokeStyle="yellow";can.fillStyle="yellow"};break;
			case 4:{can.strokeStyle="white";can.fillStyle="white"};break;
			case 5:{can.strokeStyle="black";can.fillStyle="black"};break;
			case 6:{can.strokeStyle="#FF00FF";can.fillStyle="#FF00FF"};break;
			case 7:{can.strokeStyle="purple";can.fillStyle="purple"};break;
			case 8:{can.strokeStyle="#8EE5EE";can.fillStyle="#8EE5EE"};break;
			case 9:{can.strokeStyle="orange";can.fillStyle="orange"};break;
			default:{can.strokeStyle="black";can.fillStyle="black"};
		}
	}	