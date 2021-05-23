var boardNo;
var boardType;


$(document).ready(function() {
 	 historyContent();
	
		$('#cencelBtn').click(function(){
			
		window.location.href="/admin/historyList.do";
		});
		
			$('#saveBtn').click(function(){
			UpdateHistory();
		});
		
		
		   $('#deleteBtn').click(function(){
			deleteHistory();
			
		});
		
		$("#chk0101").click(function() {
		  var a=$("input[name='chk01']:checked").val();
			
		});
		
		 $("#chk0102").click(function() {
		  var a=$("input[name='chk01']:checked").val();
		
	});
});


//연혁 상세 조회

function historyContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectHistory.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType		
		}
		
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			view();
			
			// 각화면
			function view(){
					$.each(data, function() {
					
					if(this["division"] == "A"){
						$("input:radio[name='chk01']:radio[value='A']").prop('checked', true); 
					    $('input:radio[name=chk01]:checked').val(data[0].division);
			  	        $("#title").val(data[0].title);//제목
					    $("#textt").val(data[0].content);//내용
				
				
			        	var Y = (data[0].historyY);
				        var M = (data[0].historyM);
				
						$("#hisy").html(Y);
						$("#historyY").val(Y).attr("selected", "selected");
						
						$("#hism").html(M);
						$("#historyM").val(M).attr("selected", "selected");
		    
						languageType();// 사용언어
						useYn(); //사용여부
						
						
					}else {
						$("input:radio[name='chk01']:radio[value='C']").prop('checked', true); 
						$("#title").val(data[0].title);//제목
						
						var Y = (data[0].historyY);
						var M = (data[0].historyM);
					
						$("#hisy").html(Y);
						$("#historyY").val(Y).attr("selected", "selected");
						
						$("#hism").html(M);
						$("#historyM").val(M).attr("selected", "selected");
						languageType(); // 사용언어
						useYn(); // 사용여부
							
								}

               			  });
					
					};
				
				// 사용언어
				function languageType(){
						$.each(data, function() {
					
					if(this["languageType"] == "kor"){
						$("input:radio[name='chk02']:radio[value='kor']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk02']:radio[value='eng']").prop('checked', true); 
					}

             			 });
					
				};
				
				//사용여부
				function useYn(){
						$.each(data, function() {
					
					if(this["useYn"] == "Y"){
						$("input:radio[name='chk03']:radio[value='Y']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk03']:radio[value='N']").prop('checked', true); 
					}

                 });
					
				};
			
			
		}
	});
}



function UpdateHistory(){
	var registData = new FormData();
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var division=$("input[name='chk01']:checked").val(); //분류 협회/조합
	var historyY =$('#historyY').val();
	var historyM = $('#historyM').val();
	var title = $("#title").val();
	var createId= "관리자";
	var languageType = $("input[name='chk02']:checked").val();
	var useYn = $("input[name='chk03']:checked").val();
	
	if(title == '' || title == null){
		$('#title').focus();
		return ;
		
	}
	
	registData.append("boardNo", boardNo);
	registData.append("boardType", "HISTORY");
	registData.append("createId", createId);
	registData.append("division", division);
	registData.append("historyY", historyY);
	registData.append("historyM", historyM);
	registData.append("title", title);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	
	$.ajax({
		type : 'POST'
		, url : '/admin/historyupdate.do' 
		, processData: false 
		, contentType: false 
		, type: 'POST'
		, dataType: 'json'
		, data : registData
		, success : function(data) {
			alert('data');
			window.location.href="/admin/historyList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
}

function deleteHistory(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		 type : 'POST'
		, url : '/admin/historyDelete.do'
		, async: false
		, dataType: 'json'
		, data : {
			"boardNo" : boardNo,
			"boardType" : 'HISTORY'
			
		}
		, success : function(data) {
			
			
		 	window.location.href = "/admin/historyList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}



	



			



