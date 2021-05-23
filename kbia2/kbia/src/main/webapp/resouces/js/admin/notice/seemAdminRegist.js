var oEditors = [];
$(document).ready(function() {
	
	fileViewSetting('file1','upFile', 3);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;
	
	$("#seemDate").val(today);
	
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "seemContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//등록
	$("#registBtn").click(function(){
		oEditors.getById["seemContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		regist();
	});	
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openSeem.do";			
		}else{
			return ;
		}
	});
});

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


//회우너사 동정 등록
function regist() {
	if(vaildChk()!=false){
		var registData = new FormData();
		var seemDate = $("#seemDate").val();
		var seemHour = $("#seemHour").val();
		var seemMinute = $("#seemMinute").val();
		var languageType = $("input[name='chk01']:checked").val();
		var useYn = $("input[name='chk02']:checked").val();
		var seemTitle = $("#seemTitle").val();
		var seemContent = $("#seemContent").val();	
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

		var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false ,false);
		if(insertChk1 != true ) return;
		registData.append("seqId", "NOTICE_SEQ");
		registData.append("boardType", "SEEM");
		registData.append("seemTitle", seemTitle);
		registData.append("seemContent", seemContent);
		registData.append("seemDate", seemDate);
		registData.append("seemHour", seemHour);
		registData.append("seemMinute", seemMinute);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);	
		registData.append("createId", userId);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/seemRegist.do'
			, enctype: 'multipart/form-data'
			, processData: false /* 필수 */ 
			, contentType: false /* 필수 */
			, type: 'POST'
			, dataType: 'json'
			, data : registData		
			, success : function(data) {
				alert("저장되었습니다.");
				location.href = "/admin/openSeem.do";
				
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}
