$(document).ready(function() {
	editArea();
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
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["batteryContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
	
}
//The battery등록
function regist() {
	var registData = new FormData();
	var upThum = $("#upThum")[0].files[0];
	var upFile = $("#upFile")[0].files[0];
	var multiFileNo = $("#batteryFile").val();
	var batteryDate = $("#batteryDate").val();
	var batteryHour = $("#batteryHour").val();
	var batteryMinute = $("#batteryMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var nail = $("#batteryNail").val();
	var batteryTitle = $("#batteryTitle").val();
	var content = $("#batteryContent").val();	
	
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
	if(upThum == '' || upThum == null){
		alert("썸네일을 입력해주세요");
		$("#upThum").focus();
		return;
	}
	
	registData.append("upThum", upThum);
	registData.append("upFile", upFile);
	registData.append("seqId", "INFO_SEQ");
	registData.append("boardType", "BATTERY");
	registData.append("batteryTitle", batteryTitle);
	registData.append("content", content);
	registData.append("nail", nail);
	registData.append("batteryDate", batteryDate);
	registData.append("batteryHour", batteryHour);
	registData.append("batteryMinute", batteryMinute);
	registData.append("multiFileNo", multiFileNo);	
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);	
	
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
			location.href = "/admin/openBattery.do";
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
