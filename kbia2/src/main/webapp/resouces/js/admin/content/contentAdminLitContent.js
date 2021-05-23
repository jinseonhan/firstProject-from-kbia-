$(document).ready(function(){
	//기존 작성된 내용 불러오기
	selectLit();
	
	
	//기존 URL에 따라  화면찾기 버튼 설정
	var urlType=$("input[name='chk05']:checked").val();
	if(urlType == 'PRE'){
		$("#findUrl").show();
		$("#link").attr("readonly",true);
	} else {
		$("#link").attr("readonly",false);
		$("#findUrl").hide();
	}
	
	
	//url 새창 현재창에 따른 버튼 생성
	$("input[name='chk05']:radio").change(function(){
		var urlType=$("input[name='chk05']:checked").val();
		if(urlType == "PRE") {
			$("#link").attr("readonly",true);
			$("#findUrl").show(); 
		} else {
			$("#link").val("");
			$("#link").attr("readonly",false);
			$("#findUrl").hide();
		}
	});
	
	//화면찾기 팝업 버튼
	$("#findUrl").click(function(){
		fn_layerPop('pop01', 600);
	});
	
	//화면찾기 팝업 조회 버튼
	$("#srcBtn").click(function(){
		srcTitle();
	});
	
	//화면찾기 팝업 닫기 버튼
	$("#popCancelBtn").click(function(){
		fn_layer_close(this);
	});
	
	
	
	//s노출순서 중복 체크 하기 (사용여부에 따라서)
	var A ="A";
	$("input[name='chk04']").change(function(){
         A = $("input[name='chk04']:checked").val();
         if(A == "Y"){
            A = "M";
         }else if (A == "N"){
            A = "X";
         }
      });

	//수정버튼
	$("#saveBtn").click(function(){
		var con = confirm("수정하시겠습니까?");
		if(con) {
			if(A == "A"){   
				 keepCheck();
               } else if(A == "M"){
                  updateCheck();
               } else if(A == "X"){
                  updateLit();   
               } else{
               return 
            }
		}
	});
	
	//취소버튼
	$("#cancelBtn").click(function(){
		location.href="/admin/litList.do";
	});
	
	//삭제버튼
	$("#deleteBtn").click(function(){
		var con = confirm("삭제하시겠습니까?");
		if (con) {deleteLit();}
	});
	
});

//기존 작성 내용 자세히 보기
function selectLit() {
	var boardNo = $("#boardNo").val();
	var boardType= $("#boardType").val();
	
	$.ajax({
		type : 'POST',
		url : '/admin/selectLitContents.do',
		async : false,
		data : {
			"boardNo" : boardNo,
			"boardType" : boardType
		},
		dataType : 'json',
		success : function(data) {
			fileViewSetting('file1','upFile', 1, boardType, boardNo);
		
			$("#text").val(data[0].content); // 내용
			$("#fileN").val(data[0].filePath);//첨부파일명
			//URL 새창 or현재창
			if(data[0].urlType == "NEW"){
				$("input:radio[name='chk05']:radio[value='NEW']").prop('checked', true); 
			} else {
				$("input:radio[name='chk05']:radio[value='PRE']").prop('checked', true); 
			}
			$("#link").val(data[0].link);//URL
			//노출순서
			var locationN = (data[0].locationN+"번");
			$("#locationN").html(locationN);
			$("#locationNo").val(locationN).attr("selected", "selected");
			//사용언어 
			if(data[0].languageType == "KOR") {
				$("input:radio[name='chk03']:radio[value='KOR']").prop('checked',true);
			} else {
				$("input:radio[name='chk03']:radio[value='ENG']").prop('checked',true);
			}
			//사용여부
			if(data[0].useYn == 'Y'){
				$("input:radio[name='chk04']:radio[value='Y']").prop('checked',true);
			} else {
				$("input:radio[name='chk04']:radio[value='N']").prop('checked',true);
			}
			//등록정보
			$("#regist").html("<B>"+data[0].createId+" / "+data[0].updateDate+"</B>");
		},
		error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
};


//업데이트
function updateLit() {
	var registData = new FormData();
	var createId = $("#sessionUserId").val(); 
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var fileupdateflag = $("#fileupdateflag").val();
	var delYn = $("#delYn").val();
	var content = $("#text").val();
	var urlType = $("input[name='chk05']:checked").val();
	var url = $("#link").val();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0,1);
	var languageType = $("input[name='chk03']:checked").val();
	var useYn = $("input[name='chk04']:checked").val();
	
	registData.append("createId", createId);
	registData.append("boardNo",boardNo);
	registData.append("boardType",boardType);
	registData.append("content",content);
	registData.append("urlType",urlType);
	registData.append("link",url);
	registData.append("locationN",locationN);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	
	$.ajax({
		type : 'POST',
		url : '/admin/updateLit.do',
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		async : false,
		type: 'POST',
		dataType: 'json',
		data : registData,
		success : function(data) {
			alert("수정되었습니다.");
			location.href="/admin/litList.do";
		},
		error: function (request, status, error) {			
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}

//파일 업데이트
function updateLitFile() {
	var registData = new FormData();
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1','upFile', registData,'update', true, true);

	if(insertChk1 != true )   return;
	
	var filePathArr = [];
	filePathArr[0]='upFile';
	registData.append("filePath", filePathArr);
	
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("refIdx", boardNo);
	registData.append("refType", boardType);
	
	if(validChk()){
		$.ajax({
			type : 'POST',
			url : '/admin/litFileUpdate.do',
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			async : false,
			dataType : 'json',
			data : registData,
			success : function(data) {
				
			},
			error : function(request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}
}

//노출순서 변경 안 했을 때
function keepCheck(){
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0,1);
	var boardType = $("#boardType").val();
	registData.append("locationN", locationN);
	registData.append("boardType", boardType);
	$.ajax({
		type : 'POST'
		, url : '/admin/keepCheck.do'
		, type: 'POST'
		, processData: false 
		, contentType: false 
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			
			var outVal = "F";
			  
		    $.each(data, function() {
			            
					
				if(this["locationN"] == locationN && this["useYn"] == "Y"){	
					alert("여기");
					outVal = "T";
				}
	         });
			
			if(outVal == "T"){
				alert("노출순서가 중복되었습니다");
			}else{
				updateLitFile();
				updateLit();
			}
			
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
}

//소배너 노출순서 업데이트 시 중복체크
function updateCheck(){
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0,1);
	var boardType = $("#boardType").val();
	registData.append("locationN", locationN);
	registData.append("boardType",boardType);
	$.ajax({
		type : 'POST'
		, url : '/admin/LitCheck.do'
		, type: 'POST'
		, processData: false 
		, contentType: false 
		, dataType: 'json'
		
		, data : registData		
		, success : function(data) {     
		
			
			if(data > 0 ){
				alert("노출순서가 중복되었습니다");
			}else{
				updateLitFile();
				updateLit();
			}
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}

//삭제
function deleteLit() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST',
		url : '/admin/deleteLit.do',
		async : false,
		dataType : 'json',
		data : {
			"refIdx" : boardNo,
			"boardNo" : boardNo,
			"refType" : boardType,
			"boardType" : boardType
		},
		success : function(data) {
			alert("삭제되었습니다.");
			location.href="/admin/litList.do";
		},
		 error : function(request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}

function validChk() {
	var text = $("#text").val();
	var fileTxt = $("#fileNupFile").val();
	var locationNo = $("#locationNo").val();
	
	if(text == null || text == "") {
		alert("내용을 입력해주세요");
		$("#text").focus();
		return false;
	} else if(locationNo == "" || locationNo == null) {
		alert("노출 순서를 설정해주세요");
		$("#locationNo").focus();
		return false;
	}
	return true;	
}


//팝업 URL 조회 
function srcTitle(){
	var disType = $("#disType").val();
	var srcTit = $("#srcTit").val();
	
	if(disType == "" || disType == null){
		alert("화면 구분을 선택해 주세요");
		$("#disType").focus();
		return;
	} else {
		if(disType == 'NOTICE' || disType == 'INDUSTRY' || disType ==  'SEEM'){
			var tableNm = 'NOTICE_BOARD';
		} else {
			var tableNm = 'INFO_BOARD';
		}
		
		$.ajax({
			type : 'POST',
			url : '/admin/srcPopList.do',
			async : false,
			dataType : 'json',
			data : {
				"boardType" : disType,
				"title" : srcTit,
				"tableNm" : tableNm
			},
			success : function(data) {
				tabGrid(data);
			},
			error : function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}

// 팝업 열기
function fn_layerPop(e,s) {
	$("#disType").val("");
	$("#srcTit").val("");
	$("#colTable").html("");
	
	var pdt = $("."+e).find(".inner").css('padding-top').replace(/[^-\d\.]/g, '');
	$("."+e).fadeIn(200).addClass("on").find(".inner").css({"width":s+"px"});
	$("body, html").css({"overflow":"hidden"});
	$(window).resize(function(){
		$("."+e).find(".cont").css({"max-height":($("."+e).height()*0.9) - (Number(pdt))});
		$("table.v1").each(function(){
			var table2 = $(this).next().height();
			$(this).find("tbody td").height(table2 - 26);
		});
	}).resize();
}
// 팝업 닫기
function fn_layer_close(t){
	$(t).closest(".inner").parent().fadeOut(200).removeClass("on");
	$("body, html").css({"overflow":"auto"});
}


var table;
function tabGrid(inData) {
	//Build Tabulator
		table = new Tabulator("#colTable", {
	    layout:"fitColumns",
		data:inData, 
	    pagination:"local",
	    paginationSize:10,
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowDblClick:function(e, row){
			var data = row.getData();
			var boardType = data.boardType;
			var boardNo = data.boardNo;
			if(boardType == 'NOTICE') {
				$("#link").val("/openViewContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'INDUSTRY') {
				$("#link").val("/openIndContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'SEEM') {
				$("#link").val("/openNewsContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'BRIEF') {
				$("#link").val("/openBriefContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'BATTERY') {
				$("#link").val("/openBatteryContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'T_ROOM') {
				$("#link").val("/openRefContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'HIRE') {
				$("#link").val("/openHireContent.do?boardNo="+boardNo+"&boardType="+boardType);
			} else if (boardType == 'T_TRENDS') {
				$("#link").val("/openTrendContent.do?boardNo="+boardNo+"&boardType="+boardType);
			}
			$("#popCancelBtn").trigger("click");

		},
	    columns:[
	        {title:"순번", field:"boardNo", width:70, visible:false},
			{title:"구분 ", field:"languageType", width:90, headerSort:false,hozAlign:"center"},
			{title:"글타입", field:"boardType", visible:false},
	        {title:"제목", field:"title"}	
	    ],
	});
	
	
}