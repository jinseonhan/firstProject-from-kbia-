$(document).ready(function() {
	editArea();
	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file2','upFile', 3);
	fileViewSetting('file1','upThum', 1);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;

	$("#batteryDate").val(today);
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openBattery.do";			
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
	    elPlaceHolder: "batteryContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["batteryContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
	
}

function vaildChk(){
	var batteryTitle = $("#batteryTitle").val();
	var content = $("#batteryContent").val();
	
	if(batteryTitle == '' || batteryTitle == null){
		alert("제목을 입력해주세요");
		$("#batteryTitle").focus();
		return false;
	}
	if(content == '' || content == null ||  content == "<p><br></p>"){
		alert("목차를 입력해주세요");
		$("#batteryContent").focus();
		return false;
	}
	
	if(!maxLengthCheck("batteryTitle", '제목' ,100)){
		return false;
	}
	
}


//The battery등록
function regist() {
	if(vaildChk()!=false){
		var registData = new FormData();
		var batteryDate = $("#batteryDate").val();
		var batteryHour = $("#batteryHour").val();
		var batteryMinute = $("#batteryMinute").val();
		var languageType = $("input[name='chk01']:checked").val();
		var useYn = $("input[name='chk02']:checked").val();
		var batteryTitle = $("#batteryTitle").val();
		var content = $("#batteryContent").val();	
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
		var todayBattery = year+"-"+month+"-"+date
		
		
		if(batteryDate == '' || batteryDate == null){
			batteryDate= todayBattery;
		}
		if(batteryHour ==''|| batteryHour == null){
			batteryHour = hour;
		}
		if(batteryMinute ==''|| batteryMinute == null){
			batteryMinute = minutes;
		}
	
		
		if(batteryTitle == '' || batteryTitle == null){
			alert("제목을 입력해주세요");
			$("#batteryTitle").focus();
			return;
		}
		if(content == '' || content == "<p><br></p>" || content == null){
			alert("목차를 입력해주세요");
			$("#batteryContent").focus();
			return;
		}
		
		
		var insertChk1 = fileParamSetting('file2','upFile', registData, 'insert', false, false);
		if(insertChk1 != true ) return;
		var insertChk2 = fileParamSetting('file1','upThum', registData,'insert', true , true);
		if(insertChk2 != true ) return;
		
		registData.append("seqId", "INFO_SEQ");
		registData.append("boardType", "BATTERY");
		registData.append("batteryTitle", batteryTitle);
		registData.append("content", content);
		registData.append("batteryDate", batteryDate);
		registData.append("batteryHour", batteryHour);
		registData.append("batteryMinute", batteryMinute);	
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);	
		registData.append("createId", userId);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/batteryRegist.do'
			, enctype: 'multipart/form-data'
			, processData: false /* 필수 */ 
			, contentType: false /* 필수 */
			, type: 'POST'
			, dataType: 'json'
			, data : registData		
			, success : function(data) {
				alert("저장되었습니다.");
				location.href = "/admin/openBattery.do";
				
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}
