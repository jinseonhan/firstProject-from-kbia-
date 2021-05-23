<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.*" %>
<%@ page import="java.net.InetAddress" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<!-- E : mobile -->
<title></title>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="/resouces/css/user/style.css" />
<script src="/resouces/js/user/jquery-2.2.4.js"></script>

<script>

$(window).load(function() {
	selectPop();
	if($("#division").val() == 'IMG'){
		$("#img").css("display", '');
		var fileSrc = "/upFile" + $("#newPath").val() + $("#stFileNm").val();
		$("#preview").attr("src", fileSrc);
	}
	else if($("#division").val() == 'TEXT'){
		$("#text").css("display", '');
	}
	
	var strWidth;
    var strHeight;	
    strWidth = $('#windowPop').outerWidth() + (window.outerWidth - window.innerWidth);
    strHeight = $('#windowPop').outerHeight() + (window.outerHeight - window.innerHeight);
   	var imgCW = window.outerWidth; //크롬 넓이
   	var imgCH = window.outerHeight; //크롬 높이
   	if(window.screen.width == imgCW){
   		imgCW = $("#width").val()*2;
   		imgCH = $("#height").val()*2;
   	}
       //resize 
       //크롬이 사이즈가 맞지 않아 재조정
      if($("#division").val() == 'IMG'){
   	   //크롬, 사파리
   	   if (navigator.userAgent.indexOf('Chrome')>-1 || navigator.userAgent.indexOf('Safari')>-1)
          {
   		   window.resizeTo( imgCW*1.1, imgCH*1.1);
          }
          //크롬, 사파리말고 모두
          else
          {
       	   window.resizeTo( $('#windowPop').outerWidth()+12, $('#windowPop').outerHeight()+35);
          }
   		
   	}
   	else if($("#division").val() == 'TEXT'){
   		//크롬, 사파리
   		 if (navigator.userAgent.indexOf('Chrome')>-1 || navigator.userAgent.indexOf('Safari')>-1)
            {
     		   window.resizeTo( $('#windowPop').prop('scrollWidth')*1.2, $('#windowPop').prop('scrollHeight')*1.2);
            }
            //크롬, 사파리말고 모두
            else
            {
         	   window.resizeTo($('#windowPop').prop('scrollWidth')*1.1, $('#windowPop').prop('scrollHeight')*1.1);
            }
   	}
       
});

function selectPop(){
	$.ajax({
		type : 'POST'
		, url : '/selectPopup.do'
		, async: false
		, data : {
			"boardType" : $("#boardType").val(),
			"boardNo" : $("#boardNo").val()
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			var link = data.link;
			var linkIndex = link.indexOf("https://");
			var linkIndex2 = link.indexOf("http://");
			if((linkIndex == -1 || linkIndex2 == -1) && data.link != null){
				link = "https://" + data.link;
			}
			$('#imgLink').prop('href', link);
			$('#textLink').prop('href', link);
			$("#spanText").html(data.content);
			$(document).attr("title",data.title); 
		}
	});
}
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString();
  
}

function closePopup() {
	var boardNo = $("#boardNo").val();
   
    setCookie("popupYN"+boardNo, "Y", 1);
    self.close();
    
}

</script>

</head>
<body>
<div id="windowPop">
	<input type="hidden" id="boardType" value="${params.boardType }"/>
	<input type="hidden" id="boardNo" value="${params.boardNo }"/>
	<input type="hidden" id="newPath" value="${params.newPath }"/>
	<input type="hidden" id="stFileNm" value="${params.stFileNm }"/>
	<input type="hidden" id="division" value="${params.division }"/>
	<input type="hidden" id="width" value="${params.width }"/>
	<input type="hidden" id="height" value="${params.height }"/>
	
	<div class="top" id="img" style="display: none;">
		<a href="" id="imgLink" target="_blank" title="새창으로 열기">
		<img src="" border="0" name="preview" id="preview" />
		</a>
	</div>

	<div class="top" id="text" style="display: none;">
		<a href="" id="textLink" target="_blank" title="새창으로 열기">
		<span class="txt" id="spanText"></span>
		</a>
	</div>
	
	<div class="bot">
		<span class="checkbox" onclick="closePopup();">
			<input type="checkbox" id="check" >
			<label for="check">하루에 한번만 보기</label>
		</span>
	</div>
	
</div>
</body>
</html>
