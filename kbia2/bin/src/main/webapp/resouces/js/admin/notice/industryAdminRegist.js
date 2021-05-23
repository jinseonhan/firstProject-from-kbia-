$(document).ready(function() {
	editArea();
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openIndustry.do";			
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
	    elPlaceHolder: "industryContent",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["industryContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
	
}
//산업 뉴스 등록
function regist() {
	var registData = new FormData();
	var upFile = $("#upFile")[0].files[0];
	var industryDate = $("#industryDate").val();
	var industryHour = $("#industryHour").val();
	var industryMinute = $("#industryMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var industryTitle = $("#industryTitle").val();
	var content = $("#industryContent").val();	
	
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
	var todayIndustry = year+"-"+month+"-"+date
	
	
	if(industryDate == '' || industryDate == null){
		industryDate= todayIndustry;
	}
	if(industryHour ==''|| industryHour == null){
		industryHour = hour;
	}
	if(industryMinute ==''|| industryMinute == null){
		industryMinute = minutes;
	}
	
	
	if(industryTitle == '' || industryTitle == null){
		alert("제목을 입력해주세요");
		$("#industryTitle").focus();
		return;
	}
	if(content == '' || content == "<p><br></p>" || content == null){
		alert("목차를 입력해주세요");
		$("#industryContent").focus();
		return;
	}
	
	registData.append("upFile", upFile);
	registData.append("seqId", "NOTICE_SEQ");
	registData.append("boardType", "INDUSTRY");
	registData.append("industryTitle", industryTitle);
	registData.append("content", content);
	registData.append("industryDate", industryDate);
	registData.append("industryHour", industryHour);
	registData.append("industryMinute", industryMinute);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/industryRegist.do'
		, enctype: 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type: 'POST'
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			location.href = "/admin/openIndustry.do";
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
