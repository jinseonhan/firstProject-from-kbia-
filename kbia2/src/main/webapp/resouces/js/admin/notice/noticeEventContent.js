var boardNo;
var boardType;


$(document).ready(function() {
		selectEvent();
	
	$('#cancelBtn').click(function(){
		
	  window.location.href = "/admin/EventList.do";
	});
	
		$('#registBtn').click(function(){
		 editArea();
		 UpdateEvent();
	});
	
	
	   $('#deleteBtn').click(function(){
			deleteEvent();
		
	});
	
});

// 에디터 영역
function editArea(data){
	var oEditors = [];
		nhn.husky.EZCreator.createInIFrame({
		    oAppRef: oEditors,
		    elPlaceHolder: "text",  //textarea ID
		    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
			fOnAppLoad: function(){
				if(data !=null){
					oEditors.getById["text"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
				}else{
					oEditors.getById["text"].exec("PASTE_HTML", [""]); // content 값이  null일 때 'undefinded 안뜨게만들기'
				}
			},
		    fCreator: "createSEditor2"
		});
// content 저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
}


//행사정보 상세 조회

function selectEvent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectEvent.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType		
		}
		
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
		 editArea(data.content);
		 view();
			
			// 각화면
			function view(){
				 $.each(data, function() {
				 $("#text").val(data[0].content);//내용
				 $("#title").val(data[0].title);//제목
				 $("#stdate").val(data[0].startDt); //노출기간 시작
				 $("#endate").val(data[0].endDt); // 노출기간 끝
						
				 var hourSt = (data[0].eventsthour);
				 var hourSm = (data[0].eventstminute);
				 var hourEst = (data[0].eventendshour);
				 var hourEsm = (data[0].eventendeminute);
						
						
				 $("#EventSt").html(hourSt);
				 $("#EventStHour").val(hourSt).attr("selected", "selected");
					
				 $("#EventSm").html(hourSm);
				 $("#EventStMinute").val(hourSm).attr("selected", "selected");
					
				 $("#EventEs").html(hourEst);
				 $("#EventEndSHour").val(hourEst).attr("selected", "selected");
					
				 $("#EventEm").html(hourEsm);
				 $("#EventEndEMinute").val(hourEsm).attr("selected", "selected");
					
					languageType(); // 사용언어
					useYn(); // 사용여부
					$("#regist").html("<B>"+data[0].createId+" / "+data[0].updateDate+"</B>");

               			  });
					
					};
			
				
				// 사용언어
				function languageType(){
						$.each(data, function() {
					
					if(this["languageType"] == "KOR"){
						$("input:radio[name='chk03']:radio[value='KOR']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk03']:radio[value='ENG']").prop('checked', true); 
					}

             				    });
					
				};
				
				//사용여부
				function useYn(){
						$.each(data, function() {
					
					if(this["useYn"] == "Y"){
						$("input:radio[name='chk04']:radio[value='Y']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk04']:radio[value='N']").prop('checked', true); 
					}

                 });
					
				};
			
			
		}
	});
}


function UpdateEvent(){
	if(vaildChk()!=false){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var content =$("#text").val(); 
	var registData = new FormData();
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
	
	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("refIdx", boardNo);
	registData.append("seqId", "BOARD_SEQ");
	registData.append("boardType", "EVENT");
	registData.append("refType", "EVENT");
	registData.append("createId", uesrId);
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
		, url : '/admin/Eventupdate.do'
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
		}
	});
	
 }
	
}

function deleteEvent(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		 type : 'POST'
		, url : '/admin/EventDelete.do'
		, async: false
		, dataType: 'json'
		, data : {
			"refIdx" : boardNo,
			"refType" : 'EVENT',
			"boardNo" : boardNo,
			"boardType" : 'EVENT'
			
		}
		, success : function(data) {
			alert("정상적으로 삭제 처리 되었습니다");
		 	window.location.href = "/admin/EventList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
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
