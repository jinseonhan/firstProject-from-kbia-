$(document).ready(function() {
	editArea();
	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file1','upFile', 3);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;
	$("#referenceDate").val(today);
	//취소
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href="/admin/openReference.do"	
		}else{
			return ;
		}
		
	});
		
	//등록
	$("#registBtn").click(function(){
		var valid = regist();
		if(valid){
			regist();
		}
		
	});
});
	
//에디터
function editArea(){
	//에디터영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "referenceContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["referenceContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
	
}

function vaildChk(){
	var referenceTitle = $("#referenceTitle").val();
	var content = $("#referenceContent").val();
	
	if(referenceTitle == '' || referenceTitle == null){
		alert("제목을 입력해주세요");
		$("#referenceTitle").focus();
		return false;
	}
	if(content == '' || content == null ||  content == "<p><br></p>"){
		alert("내용을 입력해주세요");
		$("#referenceContent").focus();
		return false;
	}
	
	if(!maxLengthCheck("referenceTitle", '제목' ,100)){
		return false;
	}
	
}
//기술 자료실 등록
function regist(){
	if(vaildChk()!=false){
		var registData = new FormData();
		var referenceDate = $("#referenceDate").val();
		var referenceHour = $("#referenceHour").val();
		var referenceMinute = $("#referenceMinute").val();
		var referenceTitle = $("#referenceTitle").val();
		var content =  $("#referenceContent").val();
		var languageType = $("input[name='chk01']:checked").val();
		var useYn = $("input[name='chk02']:checked").val();
		var userId = $("#sessionUserId").val(); //사용자명 
		
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
		var todayReference = year+"-"+month+"-"+date
		
		
		if(referenceDate == '' || referenceDate == null){
			referenceDate= todayReference;
		}
		if(referenceHour ==''|| referenceHour == null){
			referenceHour = hour;
		}
		if(referenceMinute ==''|| referenceMinute == null){
			referenceMinute = minutes;
		}
		
		var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false ,false);
		if(insertChk1 != true ) return;
		registData.append("seqId", "INFO_SEQ");
		registData.append("boardType", "T_ROOM");
		registData.append("referenceTitle", referenceTitle);
		registData.append("content", content);
		registData.append("referenceDate", referenceDate);
		registData.append("referenceHour", referenceHour);
		registData.append("referenceMinute", referenceMinute);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);
		registData.append("createId", userId);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/referenceRegist.do'
			, enctype : 'multipart/form-data'
			, processData: false /* 필수 */ 
			, contentType: false /* 필수 */
			, type : 'POST'
			, dataType : 'json' //xml,json,local 3형식
			, data : registData
			, success : function(data){
				alert("저장되었습니다.");
				location.href = "/admin/openReference.do";
			}
			, error : function (request, status, error){
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}
