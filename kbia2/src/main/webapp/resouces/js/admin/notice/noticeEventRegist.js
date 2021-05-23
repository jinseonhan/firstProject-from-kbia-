
$(document).ready(function() {
	
		editArea();
	
	
	// 에디터영역
function editArea(){
	// 에디터 영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "text",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	// content 저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
}
	
	// 저장버튼
	$('#registBtn').click(function() {
			eventregist();
			
		});
		
		$('#cancel').click(function(){
			window.location.href = "/admin/EventList.do";
			
		});
	
	
		
});


//EVENT등록
function eventregist(){
	if(vaildChk()!=false){
	var registData = new FormData();
	var content = $("#text").val();
	var title = $("#title").val();
	var userId = $("#sessionUserId").val(); //사용자명 
	var startDt = $("#stdate").val(); // 노출기간 시작 게시일
	var endDt = $("#endate").val(); // 노출기간 종류 게시일
	var languageType = $("input[name='chk03']:checked").val();
	var useYn = $("input[name='chk04']:checked").val();
	var eventStHour = $('#EventStHour').val(); // 게시일 시간
	var eventStMinute = $('#EventStMinute').val(); // 게시일  분
	var eventEndSHour = $('#EventEndSHour').val(); // 게시종료일 시간
	var eventEndEMinute = $('#EventEndEMinute').val(); // 게시일종료일  분
	
	registData.append("seqId", "NOTICE_SEQ");
	registData.append("boardType", "EVENT");
	registData.append("refType", "EVENT");
	registData.append("createId", userId);
	registData.append("title", title);
	registData.append("content", content);
	registData.append("startDt", startDt);
	registData.append("endDt", endDt);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	registData.append("eventStHour", eventStHour);
	registData.append("eventStMinute", eventStMinute);
	registData.append("eventEndSHour", eventEndSHour);
	registData.append("eventEndEMinute", eventEndEMinute);
	
	$.ajax({
		type : 'POST'
		, url : '/admin/EventRegist.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, type: 'POST'
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			alert("저장 되었습니다");
			window.location.href = "/admin/EventList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
  }
}


function vaildChk(){
	var title = $("#title").val();
	
	if(title == '' || title == null){
		alert("제목을 입력해주세요");
		$("#title").focus();
		return false;
	}
	
	if(!maxLengthCheck("title", '제목' ,100)){
		return false;
	}

}

