$(document).ready(function() {
	//수정조회
	viewUpdate();
	
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openSeem.do";		
		}else{
			return ;
		}
	});
	//수정
	$("#updateBtn").click(function(){
		if(confirm("저장하시겠습니까") == true){
			var valid = seemFileUpdate();
			if(valid){
				seemFileUpdate();
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

});

// 에디터 영역
function editArea(data){
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "seemContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	 	fOnAppLoad: function(){
				oEditors.getById["seemContent"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
		},
		fCreator: "createSEditor2"
	});
	$("#updateBtn").click(function(){
		oEditors.getById["seemContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기

	});
}

//수정리스트 조회
function viewUpdate(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectUpdateSeem.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType,
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data){
			$("#seemTitle").val(data.title);
			$("#seemDate").val(data.startDt);
			$("#division").val(data.division);
			fileViewSetting('file1','upFile', 3, boardType, boardNo);
			editArea(data.content);
			
			var startHour =data.startHour
			$("#seemHourSpan").html(startHour);
			$("#seemHour").val(startHour).attr("selected", "selected");
			
			var startMinute =data.startMinute		
			$("#seemMinuteSpan").html(startMinute);
			$("#seemMinute").val(startMinute).attr("selected", "selected");
			
			var useYnCheck=data.useYn;
			var languageTypedata = data.languageType;
			$("input[name=chk02]").filter("input[value='"+useYnCheck+"']").attr("checked",true);
			$("input[name=chk01]").filter("input[value='"+languageTypedata+"']").attr("checked",true);
			
			$("#regist").html("<B>"+data.createId+" / "+data.updateDate+"</B>");
			
			
		}
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
		, url : '/admin/seemDelete.do'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : deletedata
		, success : function(data){
			location.href = "/admin/openSeem.do";
				
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
function vaildChk(){
	var seemTitle = $("#seemTitle").val();
	var seemContent = $("#seemContent").val();
	
	if(seemTitle == null || seemTitle == ''){
		alert("제목을 입력해주세요");
		$("#seemTitle").focus();
		return false;
	}
	if (seemContent == null || seemContent =='' || seemContent == '<div align="" style=""><p><br></p></div>'){
		alert("내용을 입력해주세요");
		$("#seemContent").focus();
		return false;
	}
	
	if(!maxLengthCheck("seemTitle", '제목' ,100)){
		return false;
	}
	
}
//파일 업데이트
function seemFileUpdate(){
	if(vaildChk()!=false){
		var registData = new FormData();
		//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크
		fileParamSetting('file1','upFile', registData, 'update', false ,false);
		var filePathArr = [];
		filePathArr[0]='upFile';
		registData.append("filePath", filePathArr);
		
		var boardNo = $("#boardNo").val();
		var boardType = $("#boardType").val();
		
		registData.append("boardNo", boardNo);
		registData.append("boardType", boardType);
		registData.append("refIdx", boardNo);
		registData.append("refType", boardType);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/seemFileUpdate.do'
			, enctype: 'multipart/form-data'
			, processData: false 
			, contentType: false 
			
			, type: 'POST'
			, dataType: 'json'
			, data : registData
			, success : function(data) {
			 	update();
	
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}
}

//회원사동정 수정
function update(){
	var updateData = new FormData();
	var seemTitle = $("#seemTitle").val();
	var seemContent = $("#seemContent").val();
	var seemDate = $("#seemDate").val();
	var seemHour = $("#seemHour").val();
	var seemMinute = $("#seemMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var boardNo = $("#boardNo").val();
	var updateId = $("#sessionUserId").val();
		
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
	var todaySeem = year+"-"+month+"-"+date
		
		
	if(seemDate == '' || seemDate == null){
		seemDate= todaySeem;
	}
	if(seemHour ==''|| seemHour == null){
		seemHour = hour;
	}
	if(seemMinute ==''|| seemMinute == null){
		seemMinute = minutes;
	}

	
	updateData.append("boardNo", boardNo);
	updateData.append("boardType", "SEEM");
	updateData.append("seemTitle", seemTitle);
	updateData.append("seemDate", seemDate);
	updateData.append("seemHour", seemHour);
	updateData.append("seemMinute", seemMinute);
	updateData.append("seemContent", seemContent);
	updateData.append("languageType", languageType);
	updateData.append("useYn",useYn);
	updateData.append("updateId", updateId);
		
	$.ajax({
		type : 'POST'
		, url : '/admin/seemUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : updateData
		, success : function(data){
			location.href = "/admin/openSeem.do";
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
