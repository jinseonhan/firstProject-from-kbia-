var fileArray= [];
var i = 0;
$(document).ready(function() {
	//수정조회
	viewUpdate();
	
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openTrend.do";		
		}else{
			return ;
		}
	});
	//수정
	$("#updateBtn").click(function(){
		if(confirm("수정된 내용을 변경하시겠습니까") == true){
			var valid = update();
			if(valid){
				update();
				editArea();
			}
		}else{
			return ;
		}
	});	
	//삭제
	$("#deleteBtn").click(function(){
		if(confirm("내용을 삭제하시겠습니까") == true){
		viewDelete();
		}else{
			return;
		}
	});
	//삭제
	$("#deleteBtn").click(function(){
		if(confirm("내용을 삭제하시겠습니까") == true){
		viewDelete();
		}else{
			return;
		}
	});
	
	var inputFile = $("#upFile");
	
	var targetId = inputFile.attr("id");	
	
	inputFile.change(function(){
		var i = $(this).val();		
		var target = "#" + targetId + "Path";		
		
		$(target).val(i);
	});
	
	// 파일 선택	
	$("#plusBtn").click (function() {
		i++;
		fileArray.push(i);
		var a = i-1;
		
		$("#fileList").append(
			'<div id="del'+a+'"style=" margin-top:10px;" >'
				+ '<div class="multiFile" id=row'+a+' style="margin-left: -8px;">'
					+ '<input type="text" id="upFile'+a+'Path" title="첨부파일 명" >'
					+ '<input type= "file" id="upFile'+a+'" title="파일첨부">'
				+ '</div>'
				+ '<button style="margin-left: 11px;" onclick="delFile('+a+');" class="btn btnGray">삭제</button>'
			+ '</div>'
			+ '<script>'
				+ 'var inputFile = $("#upFile'+a+'");'	
				+ 'var targetId = inputFile.attr("id");'				
				+ 'inputFile.change(function(){'
					+ 'var i = $(this).val();'
					+ 'var target = "#" + targetId + "Path";'					
					+ '$(target).val(i);'
				+ '});'
			+ '</script>'
		);		
	});
});
//추가 파일 삭제
function delFile(a){
	alert("삭제하시겠습니까?");
	fileArray[a] = '';
	$("#upFile"+a).val('');
	$("#row"+a).hide();
	$("#del"+a).hide();
}
//수정리스트 조회
function viewUpdate(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectUpdateTrend.do'
		, async : false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType,
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data){
			console.log(data.startHour);
			$("#trendTitle").val(data.title);
			$("#trendDate").val(data.startDt);
			
			editArea(data.content);
			
			var hour =data.startHour
			$("#trendHourSpan").html(hour);
			$("#trendHour").val(hour).attr("selected", "selected");
			
			var minute =data.startMinute		
			$("#trendMinuteSpan").html(minute);
			$("#trendMinute").val(minute).attr("selected", "selected");
			
			var trendType = data.boardType
			if(trendType == "T_TRENDS"){
				trendType = "T"
			}else if (trendType == "A_TRENDS"){
				trendType = "A"
			}
			$("input[name=chk03]").filter("input[value='"+trendType+"']").attr("checked",true);
			var useYnCheck=data.useYn;
			var languageTypedata = data.languageType;
			$("input[name=chk02]").filter("input[value='"+useYnCheck+"']").attr("checked",true);
			$("input[name=chk01]").filter("input[value='"+languageTypedata+"']").attr("checked",true);
			
			$("#regist").html("<B>"+data.createId+" / "+data.updateDate+"</B>");
			
			
			fileList();
		}
		,error:function(request,status,error){
					alert("code : "+request.status+"\n"
							+"message : "+request.responseText+"\n"
							+"error : "+ error);
				}
	});
	
}
function editArea(data){
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "trendContent",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	 	fOnAppLoad: function(){
				oEditors.getById["trendContent"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
		},
		fCreator: "createSEditor2"
	});
	$("#updateBtn").click(function(){
		oEditors.getById["trendContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기

	});
}

function viewDelete(){
	
	var deletedata = new FormData();
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	deletedata.append("boardNo", boardNo);
	deletedata.append("boardType", boardType);
	deletedata.append("refType", boardType);
	deletedata.append("refIdx", boardNo );
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/trendDelete.do'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : deletedata
		, success : function(data){
			location.href = "/admin/openTrend.do";
				
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}


var boardNo;
var boardType;
var filePath;
var stFileNm;
var ognFileNm;
var fileupdateflag;
//파일 상세 조회
function fileList() {
		boardNo = $("#boardNo").val();
		boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/trendFile.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType		
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
				filePath = data[0].filePath;
				stFileNm = data[0].stFileNm;
				fileChange(data);
				
		}
	});
}
function fileChange(data){
	for(var a = 0; a<data.length; a++){
		if(data[a].delYn=="N"){

			$("#fileNameList").append("<div id='seachFile"+a+"'><label>"+ data[a].ognFileNm + "</label><a onclick='delTrend("+a+");'> [삭제]</a><br></div>");
		}
	}
};


//파일삭제
function filedelete(){

	$.ajax({
		type : 'POST'
		, url : '/admin/popupFiledel.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType,
			"filePath" : filePath,
			"stFileNm" : stFileNm
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {

		}
	});	
}

function delTrend(a){
	 $('#fileupdateflag').val('Y')
	 $('#delYn').val('Y');
	$("#seachFile"+a).hide();
	ognFileNm ="";
}

//주간브리프 수정
function update(){
	var updateData = new FormData();
	var upFile = $("#upFile")[0].files[0];
	var trendTitle = $("#trendTitle").val();
	var trendContent = $("#trendContent").val();
	var trendDate = $("#trendDate").val();
	var trendHour = $("#trendHour").val();
	var trendMinute = $("#trendMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var boardNo = $("#boardNo").val();
	var	boardNo =  $("#boardNo").val();
	var trendType = $("input[name='chk03']:checked").val();
	
	//현재 시간 날짜 	
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var min = today.getMinutes();
	
	var minutes = Math.round(min/10)*10;
	
	
	if(date<10){
		date='0'+date
	}
	if(month<10){
		month='0'+month
	}
	if(hour<10){
		hour = '0'+ hour
	}
	var todayTrend = year+"-"+month+"-"+date
	
	
	if(trendDate == '' || trendDate == null){
		trendDate= todayTrend;
	}
	if(trendHour ==''|| trendHour == null){
		trendHour = hour;
	}
	if(trendMinute ==''|| trendMinute == null){
		trendMinute = minutes;
	}
	
	if( trendType == "T"){
		trendType = "T_TRENDS";
	}else if( trendType == "A"){
		trendType = "A_TRENDS";
	}
	
	//필수값입력 확인
	if(trendTitle == null || trendTitle == ""){
		alert("제목을 입력해주세요");
		$("#trendTitle").focus();
		return;
	}else if (trendContent == null || trendContent =="" || trendContent == '<div align="" style=""><p><br></p></div><p><br></p>'){
		alert("내용을 입력해주세요");
		$("#trendContent").focus();
		return;
	}
	for(var j =0; j< fileArray.length ; j++){		
		updateData.append("upFile"+j , $("#upFile"+j)[0].files[0]);
	}
	//파일
	updateData.append("fileupdateflag", fileupdateflag);
	updateData.append("upFile", upFile);
	updateData.append("seqId","INFO_SEQ");
	updateData.append("refType", trendType);
	updateData.append("stFileNm", stFileNm);	
	updateData.append("refIdx", boardNo);
	updateData.append("delYn", delYn);
	updateData.append("filePath", filePath);
	
	//내용
	updateData.append("boardNo", boardNo);
	updateData.append("boardType", trendType);
	updateData.append("trendTitle", trendTitle);
	updateData.append("trendDate", trendDate);
	updateData.append("trendHour", trendHour);
	updateData.append("trendMinute", trendMinute);
	updateData.append("trendContent", trendContent);
	updateData.append("languageType", languageType);
	updateData.append("useYn",useYn);
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/trendUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : updateData
		, success : function(data){
			location.href = "/admin/openTrend.do";
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
	
	
}
