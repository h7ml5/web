function h7mlTime() {
    window.setTimeout("h7mlTime()", 100);
    var h7ml = document.getElementById("h7ml");
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
    this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime = this.year + "年" + this.month + "月" + this.date + "日" + this.hour + "时" + this.minute + "分" +
        this.second + "秒" + this.day;
    h7ml.innerHTML = currentTime
}
h7mlTime()
	var cityname ;
	function ok(){
		var patrn= /^[\u4E00-\u9FA5]{2,4}$/;
		cityname = $("#cityname").val();
		console.log(cityname)
		if(cityname == ""){
			$("#ul").html= "";
			$("#message").html ="";
			alert("城市名不能为空")
			return false;
		}else if(!patrn.test(cityname)){
			$("#ul").html= "";
			$("#message").html ="";
			alert("请输入中文城市名")
			return false;
		} else{
			$.ajax({
		    type:"get",
		    async:true,
			  url:"https://wthrcdn.etouch.cn/weather_mini?city="+cityname,
		    dataType:"jsonp",
		    jsonp: "callback",
		    success: function(result) {
		        var data = result.data.forecast[0];
		        var cityname = result.data.city;
		        var html =""
		        $.each(data, function(index,val) {
		        	if(index == "date"){
		        		index = "当前时间";
		        	}
		        	if(index == "high"){
		        		index = "最高温度"
		        	}
		        	if(index == "fengli"){
		        		index = "今日风力";
		        		val = val.replace("<![CDATA[", "").replace("]]>", "")
		        	}
		        	if(index == "low"){
		        		index = "最低温度"
		        	}
		        	if(index == "fengxiang"){
		        		index = "今日风向"
		        	}
		        	if(index == "type"){
		        		index = "天气情况"
		        	}
		        html+= "<li> "+index+":"+val+"</li>"
		        });
		        html += "<li>"+"天气提醒"+"："+result.data.ganmao+"</li>";
		        $("#ul").html(html);
		        $("#message").html("你查询"+cityname+"的天气情况如下:");
		    },
		    error: function() {
		        alert("请输入正确的中文城市名")
		    }
		});
		}
	}



var ua = navigator.userAgent;
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),isAndroid = ua.match(/(Android)\s+([\d.]+)/),isMobile = isIphone || isAndroid;
		var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 35;
		if(!isMobile){
		var canvas = document.getElementById('canvas');
		canvas.width = WIDTH,
		canvas.height = HEIGHT;
		var context = canvas.getContext('2d');
		context.strokeStyle = 'rgba(0,0,0,0.02)',
		context.strokeWidth = 1,
		context.fillStyle = 'rgba(0,0,0,0.05)';
		var circleArr = [];

		//线条：开始xy坐标，结束xy坐标，线条透明度
		function Line (x, y, _x, _y, o) {
			this.beginX = x,
			this.beginY = y,
			this.closeX = _x,
			this.closeY = _y,
			this.o = o;
		}
		//点：圆心xy坐标，半径，每帧移动xy的距离
		function Circle (x, y, r, moveX, moveY) {
			this.x = x,
			this.y = y,
			this.r = r,
			this.moveX = moveX,
			this.moveY = moveY;
		}
		//生成max和min之间的随机数
		function num (max, _min) {
			var min = arguments[1] || 0;
			return Math.floor(Math.random()*(max-min+1)+min);
		}
		// 绘制原点
		function drawCricle (cxt, x, y, r, moveX, moveY) {
			var circle = new Circle(x, y, r, moveX, moveY)
			cxt.beginPath()
			cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
			cxt.closePath()
			cxt.fill();
			return circle;
		}
		//绘制线条
		function drawLine (cxt, x, y, _x, _y, o) {
			var line = new Line(x, y, _x, _y, o)
			cxt.beginPath()
			cxt.strokeStyle = 'rgba(0,0,0,'+ o +')'
			cxt.moveTo(line.beginX, line.beginY)
			cxt.lineTo(line.closeX, line.closeY)
			cxt.closePath()
			cxt.stroke();

		}
		//初始化生成原点
		function init () {
			circleArr = [];
			for (var i = 0; i < POINT; i++) {
				circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
			}
			draw();
		}

		//每帧绘制
		function draw () {
			context.clearRect(0,0,canvas.width, canvas.height);
			for (var i = 0; i < POINT; i++) {
				drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
			}
			for (var i = 0; i < POINT; i++) {
				for (var j = 0; j < POINT; j++) {
					if (i + j < POINT) {
						var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
							B = Math.abs(circleArr[i+j].y - circleArr[i].y);
						var lineLength = Math.sqrt(A*A + B*B);
						var C = 1/lineLength*7-0.009;
						var lineOpacity = C > 0.03 ? 0.03 : C;
						if (lineOpacity > 0) {
							drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
						}
					}
				}
			}
		}

		//调用执行
		window.onload = function () {
			init();
			setInterval(function () {
				for (var i = 0; i < POINT; i++) {
					var cir = circleArr[i];
					cir.x += cir.moveX;
					cir.y += cir.moveY;
					if (cir.x > WIDTH) cir.x = 0;
					else if (cir.x < 0) cir.x = WIDTH;
					if (cir.y > HEIGHT) cir.y = 0;
					else if (cir.y < 0) cir.y = HEIGHT;

				}
				draw();
			}, 16);
		}
}