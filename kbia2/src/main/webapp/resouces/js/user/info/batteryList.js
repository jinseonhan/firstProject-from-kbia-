var dataLength;
var resultData;
$(document).ready(function() {
	//기본 리스트
	selectBatteryListCnt();
	
	// 언어 선택
	$("#langType").change(function(){
		selectBatteryListCnt();
	})
	
});


//베터리 리스트 조회
function selectBatteryList(pageNo) {
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();

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
	var startPage = pageNo*8-8;
	$.ajax({
		type : 'POST'
		, url : '/user/batteryList.do'
		, async: false
		, data : {
			"boardType" : "BATTERY",
			"startPage" : startPage,
			"batteryDate" : today,
			"langType" : langType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			$("#batterySelectList").html("");
			resultData = data;
			batteryList(data);
		}
	});
}

function selectBatteryListCnt() {
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();
	var langType = $("#langType").val();

	var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var date = now.getDate();
	var time = now.getHours();
	var min = now.getMinutes();
	
    month = month >=10 ? month : "0" + month;
    date  = date  >= 10 ? date : "0" + date;
	time = time >=10 ? time : "0" + time;
    min  = min  >= 10 ? min : "0" + min;

    var today = year + month + date + time + min + "00";
	$.ajax({
		type : 'POST'
		, url : '/user/batteryListCnt.do'
		, async: false
		, data : {
			"boardType" : "BATTERY",
			"batteryDate" : today,
			"langType" : langType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			console.log(data);
			dataLength = data;
			pageSetting(data);
			selectBatteryList(1);
		}
	});
}

function batteryList(dataList) {

	if(dataList.length > 0){
		var batteryHtml = '<ul>';
		for(var i=0; i<dataList.length; i++){
			var fileSrc = "";
			batteryHtml += '<li>';
			batteryHtml += '<a id="'+dataList[i].boardNo+'">';
			var fileSrc = "/upFile/" + dataList[i].snameType +"/"+ dataList[i].snameFile;
			batteryHtml += '<div class="imgArea" onClick="rowClick('+dataList[i].boardNo+')"><img src="'+fileSrc+'" alt=""></div>';
			batteryHtml += '<strong>'+dataList[i].title+'</strong>';
			batteryHtml += '<span>'+dataList[i].createDate+'</span>';
			batteryHtml += '</a>';
			
			if(dataList[i].cnt != null && dataList[i].cnt != ''){
				var cnt = dataList[i].cnt*1;
				for(var j=0; j<cnt; j++){
					batteryHtml += '<a class="btnDownload">첨부파일 다운로드</a>';
				}
			}
			batteryHtml += '</li>';
		}
		batteryHtml += '</ul>';
		$("#batterySelectList").html(batteryHtml).trigger("create");
		var imgArea = $(".imgList .imgArea");
		imgArea.each(function(){
			var $this = $(this);
			$this.height($this.width()/0.727)
		});
	}
}
function rowClick(boardNo){
	for(var i=0; i<resultData.length; i++){
		var dataBoardNo = resultData[i].boardNo;
		var dataBoardType = resultData[i].boardType;
		var dataCreateDate = resultData[i].orgCreateDate;
		if(dataBoardNo == boardNo){
			var form = $('<form></form>');
		    form.attr('action', '/openBatteryContent.do');
		    form.attr('method', 'post');
		    form.appendTo('body');
		    var boardNoF = $("<input type='hidden' value="+dataBoardNo+" name='boardNo'>");
		    var boardTypeF = $("<input type='hidden' value="+dataBoardType+" name='boardType'>");
			var createDateF = $("<input type='hidden' value="+dataCreateDate+" name='createDate'>");
		    form.append(boardNoF);
		    form.append(boardTypeF);
		    form.append(createDateF);
		    form.submit();
		}	
	}
}

function pageSetting(cnt){
	if(cnt == 0){
		$(".tabulator-footer").html("");
		return;
	}
	var pageLength = parseInt(cnt/8)+1;
	if(pageLength > 5) pageLength = 5;
	var pageHtml = '<button class="tabulator-page active" id="pageBtn" data-page="1">1</button>';
	if(pageLength > 1){
		for(var i=2; i<=pageLength; i++){
			pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+i+'">'+i+'</button>';
		}
	}
	$("#tabulPages").html(pageHtml).trigger("create");
	
}

//페이지 클릭
$(document).on('click','#pageBtn',function(){
	 pageMove($(this));

});
//최상위페이지
$(document).on('click','#goFirstPage',function(){
	var pageLength = parseInt(dataLength/8)+1;
	if(pageLength > 5) pageLength = 5;
	var pageHtml = '<button class="tabulator-page active" id="pageBtn" data-page="1">1</button>';
	if(pageLength > 1){
		for(var i=2; i<=pageLength; i++){
			pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+i+'">'+i+'</button>';
		}
	}
	$("#tabulPages").html(pageHtml).trigger("create");
	selectBatteryList(1);
});
//최하위페이지
$(document).on('click','#goLastPage',function(){
	var lengthDiv = pageLength % 5;
	var pageLength = parseInt(dataLength/8)+1;
	var pageHtml = '';
	if(pageLength > 5){ //ex) .. 57,58 -max 58
		for(var i=pageLength-4; i<pageLength+1; i++){
			if(i != pageLength) pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+i+'">'+i+'</button>';
			else pageHtml += '<button class="tabulator-page active" id="pageBtn" data-page="'+i+'">'+i+'</button>';
		}				
	}else{
		for(var i=1; i<pageLength+1; i++){
			if(i != pageLength) pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+i+'">'+i+'</button>';
			else pageHtml += '<button class="tabulator-page active" id="pageBtn" data-page="'+i+'">'+i+'</button>';
		}	
	}
	$("#tabulPages").html(pageHtml).trigger("create");
	selectBatteryList(pageLength);
});
//이전페이지
$(document).on('click','#goPrevPage',function(){
	$('.tabulator-page').each(function(i, e){
		var pageNo = $(this).attr('data-page');
		if(pageNo != null && pageNo != '' && pageNo != 1){
			if($(this).hasClass("active") === true) {
				pageMove($(this), 'prev'); 
			}
		}
	});
});
//다음페이지
$(document).on('click','#goNextPage',function(){
	var pageLength = parseInt(dataLength/8)+1;
	$('.tabulator-page').each(function(i, e){
		var pageNo = $(this).attr('data-page');
		if(pageNo != null && pageNo != '' && pageNo != pageLength){
			if($(this).hasClass("active") === true) {
				pageMove($(this), 'next'); 
			}
		}
	});
});

//페이지 이동
function pageMove(obj, type) {
	var pageNo = obj.attr('data-page')*1;
	if(type == 'prev'){
		pageNo = pageNo-1;
	}
	if(type == 'next'){
		pageNo = pageNo+1;
	}
	var pageLength = parseInt(dataLength/8)+1;
	var pageHtml = '';
	
	if(pageLength >= pageNo+2){
		if(pageNo-2 > 0){ //ex) 3,4,5,6,7... 56 -max 58
			for(var i=0; i<5; i++){
				if(i != 2) pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+(pageNo-2+i)+'">'+(pageNo-2+i)+'</button>';
				else pageHtml += '<button class="tabulator-page active" id="pageBtn" data-page="'+(pageNo-2+i)+'">'+(pageNo-2+i)+'</button>';
			}			
		}else{ //ex) 1,2 -max 58
			if(pageLength > 5) pageLength = 5;
			for(var i=0; i<pageLength; i++){
				if(i != pageNo-1) pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+(i+1)+'">'+(i+1)+'</button>';
				else pageHtml += '<button class="tabulator-page active" id="pageBtn" data-page="'+(i+1)+'">'+(i+1)+'</button>';
			}	
		}
	}else{  
		var lengthDiv = pageLength % 5;
		if(pageLength > 5){ //ex) .. 57,58 -max 58
			for(var i=pageLength-4; i<pageLength+1; i++){
				if(i != pageNo) pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+i+'">'+i+'</button>';
				else pageHtml += '<button class="tabulator-page active" id="pageBtn" data-page="'+i+'">'+i+'</button>';
			}				
		}else{
			for(var i=1; i<pageLength+1; i++){
				if(i != pageNo) pageHtml += '<button class="tabulator-page" id="pageBtn" data-page="'+i+'">'+i+'</button>';
				else pageHtml += '<button class="tabulator-page active" id="pageBtn" data-page="'+i+'">'+i+'</button>';
			}	
		}
	}
	$("#tabulPages").html(pageHtml).trigger("create");
	
	selectBatteryList(pageNo);
}



