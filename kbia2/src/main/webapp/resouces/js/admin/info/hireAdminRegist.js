$(document).ready(function() {
	editArea();
	
	fileViewSetting('file1','upFile', 3);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;
	
	$("#hireStartDate").val(today);
	$("#hireEndDate").val(today);

	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openHire.do";	
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
	    elPlaceHolder: "hireContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["hireContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
	
}
function vaildChk(){
	var hireTitle = $("#hireTitle").val();
	var hireContent = $("#hireContent").val();
	var division = $("#division").val();
	if(hireTitle == '' || hireTitle == null){
		alert("제목을 입력해주세요");
		$("#hireTitle").focus();
		return false;
	}
	
	var c = $(hireContent).find("p").prevObject;
	var chkEmpty = /\s/g;
	var flag = false;
	for( var i = 0; i < c.length; i++ ){
		var html = c.eq(i).html();
		html = html.replace(/\s/g, "");
		html = html.replace(/\&nbsp;/g, "");
		if( html != null && html != "" ){			
			flag = true;
			break;
		}
	}
	
	if( !flag ){
		alert("내용을 입력해주세요.");
		$("#industryContent").focus();
		return false;
	}
	
	if(!maxLengthCheck("hireTitle", '제목' ,100)){
		return false;
	}
	if(!maxLengthCheck("division", '구분' ,20)){
		return false;
	}
	
}


//채용공고 등록
function regist(){
	if(vaildChk()!=false){
		var registData = new FormData();
		var memberDiv = $("input[name='chk01']:checked").val(); //협회 및 회원사 
		var division =  $("#division").val(); //구분
		var hireTitle = $("#hireTitle").val();
		var hireContent =  $("#hireContent").val();
		var languageType =  $("input[name='chk02']:checked").val();
		var useYn = $("input[name='chk03']:checked").val();
		var userId = $("#sessionUserId").val(); //사용자명 
		var hireStartDate = $("#hireStartDate").val();
		var hireStartHour = $("#hireStartHour").val();
		var hireStartMinute = $("#hireStartMinute").val();
		var hireEndDate = $("#hireEndDate").val();
		var hireEndHour = $("#hireEndHour").val();
		var hireEndMinute = $("#hireEndMinute").val();
		
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
		
		
		if(hireStartDate == '' || hireStartDate == null){
			hireStartDate= todayHire;
		}
		if(hireStartHour ==''|| hireStartHour == null){
			hireStartHour = hour;
		}
		if(hireStartMinute ==''|| hireStartMinute == null){
			hireStartMinute = minutes;
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

		
		var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false ,false);
		if(insertChk1 != true ) return;
		registData.append("seqId", "INFO_SEQ");
		registData.append("boardType", "HIRE");
		registData.append("memberDiv", memberDiv);
		registData.append("division", division);
		registData.append("hireTitle", hireTitle);
		registData.append("hireContent", hireContent);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);
		registData.append("hireEndDate", hireEndDate);
		registData.append("hireEndHour", hireEndHour);
		registData.append("hireEndMinute", hireEndMinute);
		registData.append("hireStartDate", hireStartDate);
		registData.append("hireStartHour", hireStartHour);
		registData.append("hireStartMinute", hireStartMinute);
		registData.append("createId", userId);
	
		$.ajax({
			type : 'POST'
			, url : '/admin/hireRegist.do'
			, enctype: 'multipart/form-data'
			, processData: false /* 필수 */ 
			, contentType: false /* 필수 */
			, type : 'POST'
			, dataType : 'json' //xml,json,local 3형식
			, data : registData
			, success : function(data){
				alert("저장되었습니다.");
				location.href = "/admin/openHire.do";
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}
