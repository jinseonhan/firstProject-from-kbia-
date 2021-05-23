$(document).ready(function() {
	//수정조회
	viewUpdate();
	
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openHire.do";		
		}else{
			return ;
		}
	});
	//수정
	$("#updateBtn").click(function(){
		var valid = hireFileUpdate();
		if(valid){
			hireFileUpdate();
			editArea();
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

//수정리스트 조회
function viewUpdate(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectUpdateHire.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType,
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data){
			$("#hireTitle").val(data.title);
			$("#hireStrDate").val(data.startDt);
			$("#hireEndDate").val(data.endDt);
			$("#division").val(data.division);
			
			editArea(data.content);
			fileViewSetting('file1','upFile', 3, boardType, boardNo);
			
			var startHour =data.startHour
			$("#startHourSpan").html(startHour);
			$("#hireStrHour").val(startHour).attr("selected", "selected");
			
			var startMinute =data.startMinute		
			$("#startMinuteSpan").html(startMinute);
			$("#hireStrMinute").val(startMinute).attr("selected", "selected");
			
			var endHour = data.endHour
			$("#endHourSpan").html(endHour);
			$("#hireEndHour").val(endHour).attr("selected", "selected");
			
			var endMinute = data.endMinute
			$("#endMinuteSpan").html(endMinute);
			$("#hireEndMinute").val(endMinute).attr("selected", "selected");
			
			
			var memberDi = data.memberDiv;
			var useYnCheck=data.useYn;
			var languageTypedata = data.languageType;
			$("input[name=chk03]").filter("input[value='"+useYnCheck+"']").attr("checked",true);
			$("input[name=chk02]").filter("input[value='"+languageTypedata+"']").attr("checked",true);
			$("input[name=chk01]").filter("input[value='"+memberDi+"']").attr("checked",true);
			
			$("#regist").html("<B>"+data.createId+" / "+data.updateDate+"</B>");
			
			
			
		}
	});
	
}

//에디터영역
function editArea(data){
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "hireContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	 	fOnAppLoad: function(){
				oEditors.getById["hireContent"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
		},
		fCreator: "createSEditor2"
	});
	$("#updateBtn").click(function(){
		oEditors.getById["hireContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
}
//삭제
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
		, url : '/admin/hireDelete.do'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : deletedata
		, success : function(data){
			location.href = "/admin/openHire.do";
				
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}


function vaildChk(){
	var hireTitle = $("#hireTitle").val();
	var hireContent = $("#hireContent").val();
	var division = $("#division").val();
	if(hireTitle == null || hireTitle == ''){
		alert("제목을 입력해주세요");
		$("#hireTitle").focus();
		return false;
	}
	if (hireContent == null || hireContent =='' || hireContent == '<div align="" style=""><p><br></p></div>'){
		alert("내용을 입력해주세요");
		$("#hireContent").focus();
		return false;
	}
	
	if(!maxLengthCheck("hireTitle", '제목' ,100)){
		return false;
	}
	if(!maxLengthCheck("division", '구분' ,20)){
		return false;
	}
}



//파일 업데이트
function hireFileUpdate(){
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
			, url : '/admin/hireFileUpdate.do'
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
//채용공고 수정
function update(){
	var updateData = new FormData();
	var division = $("#division").val();
	var hireTitle = $("#hireTitle").val();
	var hireContent = $("#hireContent").val();
	var hireStrDate = $("#hireStrDate").val();
	var hireStrHour = $("#hireStrHour").val();
	var hireStrMinute = $("#hireStrMinute").val();
	var hireEndDate = $("#hireEndDate").val();
	var hireEndHour = $("#hireEndHour").val();
	var hireEndMinute = $("#hireEndMinute").val();
	var memberTable = $("input[name='chk01']:checked").val();
	var languageType = $("input[name='chk02']:checked").val();
	var useYn = $("input[name='chk03']:checked").val();
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
	var todayHire = year+"-"+month+"-"+date
	
	
	if(hireStrDate == '' || hireStrDate == null){
		hireStrDate= todayHire;
	}
	if(hireStrHour ==''|| hireStrHour == null){
		hireStrHour = hour;
	}
	if(hireStrMinute ==''|| hireStrMinute == null){
		hireStrMinute = minutes;
	}
	if(hireEndDate == '' || hireEndDate == null){
		hireEndDate= todayHire;
	}
	if(hireEndHour ==''|| hireEndHour == null){
		hireEndHour = hour;
	}
	if(hireEndMinute ==''|| hireEndMinute == null){
		hireEndMinute = minutes;
	}

	updateData.append("division", division);
	updateData.append("boardNo", boardNo);
	updateData.append("memberTable", memberTable);
	updateData.append("boardType", "HIRE");
	updateData.append("hireTitle", hireTitle);
	updateData.append("hireStrDate", hireStrDate);
	updateData.append("hireStrHour", hireStrHour);
	updateData.append("hireStrMinute", hireStrMinute);
	updateData.append("hireEndDate", hireEndDate);
	updateData.append("hireEndHour", hireEndHour);
	updateData.append("hireEndMinute", hireEndMinute);
	updateData.append("hireContent", hireContent);
	updateData.append("languageType", languageType);
	updateData.append("useYn",useYn);
	updateData.append("updateId", updateId);
	
	$.ajax({
		type : 'POST'
		, url : '/admin/hireUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : updateData
		, success : function(data){
			location.href = "/admin/openHire.do";
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}


