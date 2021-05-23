
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


//pop등록
function historyregist(){
	var registData = new FormData();
	
	var division=$("input[name='chk01']:checked").val(); //분류 협회/조합
	var historyY =$('#historyY').val();
	var historyM = $('#historyM').val();
	var title = $("#title").val();
	var createId= "관리자";
	var languageType = $("input[name='chk02']:checked").val();
	var useYn = $("input[name='chk03']:checked").val();
	var boardType = 'HISTORY';
	
	
	if(title == '' || title == null){
		//alert("필수값을 입력해주세요");
		$('#title').focus();
		return ;
		
	}
	registData.append("seqId", "CONTENT_SEQ");
	registData.append("boardType", boardType);
	registData.append("createId", createId);
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
		
		window.location.href = "/admin/historyList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}










