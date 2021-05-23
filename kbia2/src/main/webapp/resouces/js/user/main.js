$(document).ready(function() {
	selectMainBannerList();
	selectNoticeList();
	logMarge();
	selectPopupList();
	mainMembers();
	litBanners();
	
	$("#langType").on("change", function(){
		selectMainBannerList();
		selectNoticeList();
		logMarge();
		selectPopupList();
		mainMembers();
		litBanners();
	})
	
	//권한관리
	var author = $("#sessionAuthor").val();
	$('.mainA').click(function(){
    	var id_check = $(this).attr("id");
		switch(id_check) {
		  	case "industryStat": //산업통계
		    if(author != "U2" && author != "U3" && author != "U4"){
				alert("준회원이상 이용 가능한 서비스입니다.(문의:02-3461-9405)");
				event.preventDefault();
			}
			break;
			case "brief": //브리프
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "battery": //베터리
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "tRoom": //기술자료실
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "tTrends": //기술동향
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
		 	break;
			case "aTrends": //유관
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
		 	break;
		  default:
		    // code block
		}
	});
	
});
function getCookie(name,boardNo) { 
	var cookie = document.cookie; 

	if (document.cookie != "") { 
		var cookie_array = cookie.split("; "); 
		for ( var index in cookie_array) { 
			var cookie_name = cookie_array[index].split("="); 
			if (cookie_name[0] == "popupYN"+boardNo) { 
				return cookie_name[1]; 
			}
		} 
	}
 	return "N";
 } 

//팝업조회
function selectPopupList() {
	var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var date = now.getDate();
	var time = now.getHours();
	var min = now.getMinutes();
	var langType = $("#langType").val();
	
    month = month >=10 ? month : "0" + month;
    date  = date  >= 10 ? date : "0" + date;
	time = time >=10 ? time : "0" + time;
    min  = min  >= 10 ? min : "0" + min;

    var today = year + month + date + time + min + "00";

	$.ajax({
		type : 'POST'
		, url : '/user/pupList.do'
		, async: false
		, data : {
			"boardType" : "POPUP",
			"useYn" : 'Y',
			"popupDate" : today,
			"mainPage" : "Y",
			"languageType" : langType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					var form = $('<form></form>');
				    form.attr('action', '/mainPopup.do');
				    form.attr('method', 'post');
					form.attr('target', 'popup'+i);
					form.appendTo('body');
				    var boardNoF = $("<input type='hidden' value="+data[i].boardNo+" name='boardNo'>");
				    var boardTypeF = $("<input type='hidden' value="+data[i].boardType+" name='boardType'>");
					var divisionF = $("<input type='hidden' value="+data[i].division+" name='division'>");
					var newPathF = $("<input type='hidden' value="+data[i].newPath+" name='newPath'>");
					var stFileNmF = $("<input type='hidden' value="+data[i].stFileNm+" name='stFileNm'>");
					var widthF = $("<input type='hidden' value="+data[i].width+" name='width'>");
					var heightF = $("<input type='hidden' value="+data[i].height+" name='height'>");
				    form.append(boardNoF);
				    form.append(boardTypeF);
				    form.append(divisionF);
					form.append(newPathF);
					form.append(stFileNmF);
					form.append(widthF);
					form.append(heightF);
	 				var pop = window.open; 
					var option;
					var location = data[i].location;
					if(data[i].width == null){
						var popupWidth = 400;
						var popupHeight = 300;
	
						option = popupOption(popupWidth, popupHeight, location);
	
					}else{
						var popupWidth = data[i].width;
						var popupHeight = data[i].height+40;
										
						option = popupOption(popupWidth, popupHeight, location);
					}
					var cookieCheck = getCookie("popupYN", data[i].boardNo); 

					if (cookieCheck == "N"){ 
						pop("", "popup"+i, option); 
				    	form.target = "popup"+i; 
					    form.submit();
					}	
					$('form').remove();
				}
			}
		}
	});
	
}
// 듀얼 모니터 기준
function popupOption(popupWidth, popupHeight, location){

	var option;
	var left;
	if(location == "RIGHT") left = (screen.availWidth - popupWidth)-300;
	else if(location == "CENTER") left = (screen.availWidth - popupWidth)/2;
	else left = (screen.availWidth - popupWidth) / 7;

	if( window.screenLeft < 0){
	left += window.screen.width*-1;
	}
	else if ( window.screenLeft > window.screen.width ){
	left += window.screen.width;
	}
	
	var top = (screen.availHeight - popupHeight) / 6 - 10;
	
	return option = "width="+popupWidth+", height="+popupHeight+", top = "+top+", left = "+left+", location = 'no', toolbar='no'";
}

//공지사항 조회
function selectNoticeList() {
	
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();
	var langType = $("#langType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/user/noticeList.do'
		, async: false
		, data : {
			"boardType" : "NOTICE",
			"mainOut" : "Y",
			"langType" : langType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {

			/*기존에 있던 내용 지우기*/
			for(var a=0; a < 4; a++ ){
				$("#notice"+a+"_href").attr("");
				$("#notice"+a+"_div").html("");
				$("#notice"+a+"_title").html("");
				$("#notice"+a+"_dt").html("");
			}
			
			for(var a=0; a <data.length; a++ ){
				$("#notice"+a+"_href").attr("href", "/openViewContent.do?boardNo="+data[a].boardNo+"&boardType="+data[a].boardType+"&createDate="+data[a].orgCreateDate);
				$("#notice"+a+"_div").html(data[a].division);
				$("#notice"+a+"_title").html(data[a].title);
				$("#notice"+a+"_dt").html(data[a].createDate);
			}
		}
	});
}

function logMarge(){
	var date = new Date(); 
	var year = date.getFullYear(); 
	var month = new String(date.getMonth()+1); 
	var day = new String(date.getDate()); 
	var referer = $("#referer").val();
	// 한자리수일 경우 0을 채워준다. 
	if(month.length == 1){ 
	  month = "0" + month; 
	} 
	if(day.length == 1){ 
	  day = "0" + day; 
	} 
	
	$.ajax({
		type : 'POST'
		, url : '/user/logMarge.do'
		, async: false
		, data : {
			"logYear": year
			,"logMonth": month
			,"logDay": day
			,"ymd": year + month + day
			,"referer": referer
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			
		}
	});
}

	
//메인배너 조회
function selectMainBannerList() {
	
	var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var date = now.getDate();
	var time = now.getHours();
	var min = now.getMinutes();
	var langType = $("#langType").val();
	
    month = month >=10 ? month : "0" + month;
    date  = date  >= 10 ? date : "0" + date;
	time = time >=10 ? time : "0" + time;
    min  = min  >= 10 ? min : "0" + min;

    var today = year + month + date + time + min + "00";

	$.ajax({
		type : 'POST'
		, url : '/user/bannerList.do'
		, async: false
		, data : {
			"boardType" : "MAIN",
			"bannerDate" : today,
			"useYn" : "Y",
			"mainPage" : "Y",
			"languageType" : langType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			$("#mainBanner").html("");
			if(data.length > 0){
				var bannerHtml = '';
				for(var i=0; i<data.length; i++){
					var link = data[i].link;
					var linkIndex = link.indexOf("https://");
					var linkIndex2 = link.indexOf("http://");
					if((linkIndex == -1 || linkIndex2 == -1) &&data[i].link != null){
						link = "https://" + data[i].link;
					}
					var fileSrc = "/upFile" + data[i].newPath + data[i].stFileNm;
					bannerHtml += '<div class="swiper-slide">';
					bannerHtml += '<div class="inBox" id="bannerContent"><strong>';
					bannerHtml += data[i].content;
					bannerHtml += '</strong></div>';
					if(data[i].link != null && data[i].link != '' && data[i].link != 'undefined'){
						bannerHtml += '<a href="'+link+'" target="_blank" title="새창으로 열기">';
					}
					bannerHtml += '<img id="bannerImg" src="'+fileSrc+'" alt=" ">';
					if(data[i].link != null && data[i].link != '' && data[i].link != 'undefined'){
						bannerHtml += '</a>';
					}
					bannerHtml += '</div>';
				}
			
				$("#mainBanner").html(bannerHtml);

				/* 메인 배너 */
				var mainSwiper = new Swiper('.mainSwiper', {
					loop: true,
					autoplay: {
						delay: 5000,
						disableOnInteraction: false,
					},
					pagination: {
						el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
						},
					},
				});
				var btnStop = $(".btnStop"),
					btnPlay = $(".btnPlay");
				btnStop.click(function(e){
					e.preventDefault();
					mainSwiper.autoplay.stop();
					$(this).hide();
					btnPlay.show();
				});
				btnPlay.click(function(e){
					e.preventDefault();
					mainSwiper.autoplay.start();
					$(this).hide();
					btnStop.show();
				});
					
				// 메인 스크롤
				var main = $(".mainContents"),
					mainCont = main.find(" > div");
				mainCont.each(function () {
					$(this).on("mousewheel DOMMouseScroll", function(event) {
						var delta = 0;
						var boxMax = mainCont.length - 1;
						var winEvent = "";
						var thisT = $(this).offset().top;
						var thisH = $(this).outerHeight() - $("#header").outerHeight();
						var thisH2 = $(this).prev().outerHeight() + $("#header").outerHeight();
						if(!winEvent) {
							winEvent = window.event;
						}
						if(winEvent.wheelDelta) {
							delta = winEvent.wheelDelta / 120;
							if(window.opera) {
								delta = -delta;
							}
						}else if(winEvent.detail) {
							delta = -winEvent.detail / 3;
						}
						if(delta < 0) {
							if($(this).index() < boxMax) {
								if($(this).outerHeight() > $(window).height()){
									if($(window).scrollTop() == thisT + (thisH - $(window).height())){
										$("html,body").animate({scrollTop:thisT + thisH}).clearQueue();
										return false;
									}else{
										$("html,body").animate({scrollTop:thisT + (thisH - $(window).height())}).clearQueue();
										return false;
									}
								}else{
									$("html,body").animate({scrollTop:thisT + thisH}).clearQueue();
									return false;
								}
							}else {
								if($(this).outerHeight() > $(window).height()){
									if($(window).scrollTop() == thisT + (thisH - $(window).height())){
										$("html,body").animate({scrollTop:thisT + thisH}).clearQueue();
									}else{
										$("html,body").animate({scrollTop:thisT + (thisH - $(window).height())}).clearQueue();
									}
									return false;
								}else{
									$("html,body").animate({scrollTop:$("#footer").offset().top}).clearQueue();
									return false;
								}
							}
						}else {
							if($(this).index() > 0) {
								$("html,body").animate({scrollTop:thisT - thisH2}).clearQueue();
								return false;
							}else {
								// 첫번째 페이지
								return false;
							}
						}
						return false;
					});
				});	

				
			}//end success
		}
	});
}

//소배너 불러오기 // 
function litBanners(){
	var langType = $("#langType").val();
	
	$.ajax({
		type : 'POST',
		url : '/user/getLitBanners.do',
		dataType : 'json',
		data : { langType : langType },
		success : function(data){
			console.log(data);
			$("#litBanner").html("");
			var firstLit = '';
			var secondLit = '';
			var thirdLit = '';
			for(var i=0; i<data.length;i++){
				var urlType = '';
				if(data[i].urlType == "NEW"){
					urlType = 'target="_blank" title="새창으로 열기"';
				}
				if(data[i].locationN == '1'){
					firstLit = '<a href="' + data[i].link + '" '+urlType+' class="btnBanner">'
					+'<img src="' + "/upFile/upFile/" + data[i].stFileNm+ '"'
					+ 'alt="'+ data[i].ognFileNm +'"></a>'
				} else if(data[i].locationN == '2'){
					secondLit = '<a href="' + data[i].link + '" '+urlType+' class="btnBanner">'
					+'<img src="' + "/upFile/upFile/" + data[i].stFileNm+ '"'
					+ 'alt="'+ data[i].ognFileNm +'"></a>'
				} else if (data[i].locationN == '3'){
					thirdLit = '<a href="' + data[i].link + '" '+urlType+' class="btnBanner">'
					+'<img src="' + "/upFile/upFile/" + data[i].stFileNm+ '"'
					+ 'alt="'+ data[i].ognFileNm +'"></a>'
				}
			}
			var inHtml = firstLit + secondLit +thirdLit;
			$("#litBanner").html(inHtml);
		},
		error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});	
}

/*메인 회원사 조회*/
function mainMembers(){
	var langType = $("#langType").val();
	
	$.ajax({
		url : "/user/getMainMembers.do"
		, type : "post"
		, dataType : "json"
		, data : { langType : langType }
		, success : function(data){
			$(".memCompSwiper").children(".swiper-wrapper").html("");
			if( data.length > 0 ){
				for( var i = 0; i < data.length; i++ ){
					var a = $("<a class='swiper-slide' target='_blank' title='새창으로 열기'></a>");
					a.attr("href", data[i].homepage);
					
					var img = $("<img>");
					img.attr("alt", data[i].comNm);
					img.attr("src", "/upFile/upFile/" + data[i].stFileNm);
					
					a.append(img);
					$(".memCompSwiper").children(".swiper-wrapper").append(a);
					/* KBIA 회원사 */
					var memCompSwiper = new Swiper('.memCompSwiper', {
						slidesPerView: "auto",
						loop: false,
						autoplay: {
							delay: 5000,
							disableOnInteraction: false,
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
					});
				}
			}
		}
	})
}
