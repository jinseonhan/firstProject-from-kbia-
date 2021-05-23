
$(document).ready(function() {
	
	
	$("#chk0101").click(function() {
	  var a=$("input[name='chk01']:checked").val();
		
	});
	
	 $("#chk0102").click(function() {
		
	  var a=$("input[name='chk01']:checked").val();
		
	});
	
	
	//저장버튼
	$('#registBtn').click(function() {
			historyregist();
			
		});
		
		//취소버튼
	$('#cancel').click(function(){
			window.location.href = "/admin/historyList.do";
		});
		
	});


//연혁등록
function historyregist(){
	if(vaildChk()!=false){
	var registData = new FormData();
	var division=$("input[name='chk01']:checked").val(); //분류 협회/조합
	var historyY =$('#historyY').val();
	var historyM = $('#historyM').val();
	var title = $("#title").val();
	var userId = $("#sessionUserId").val(); //사용자명 
	var languageType = $("input[name='chk02']:checked").val();
	var useYn = $("input[name='chk03']:checked").val();
	var boardType = 'HISTORY';
	
	
	registData.append("seqId", "CONTENT_SEQ");
	registData.append("boardType", boardType);
	registData.append("createId", userId);
	registData.append("division", division);
	registData.append("historyY", historyY);
	registData.append("historyM", historyM);
	registData.append("title", title);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/historyRegist.do'
		, type: 'POST'
		, processData: false 
		, contentType: false 
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			alert("저장 되었습니다");
			window.location.href = "/admin/historyList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
  }
	
}

function vaildChk(){
	var historyY = $("#historyY").val();
	var historyM = $("#historyM").val();
	var title = $("#title").val();
	
	if(historyY == '' || historyY == null && historyM == '' || historyM == null){
		alert("년월을 선택해주세요");
		$("#historyY").focus();
		return false;
	}
	
	if(title == '' || title == null){
		alert("제목을 입력해주세요");
		$("#title").focus();
		return false;
	}
	
	if(!maxLengthCheck("title", '제목' ,200)){
		return false;
	}

}








