$(document).ready(function(){
	//화면찾기 버튼 숨김
	$("#findUrl").hide();
	
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
	
	//fileDivId, 파일위치, 넣을파일 갯수
	fileViewSetting('file1','upFile', 1);
	
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
	
	//등록버튼
	$("#registBtn").click(function(){
		if( !confirm("저장하시겠습니까?") ){
			return;
		}
		
		var useYn = $("input[name='chk04']:checked").val();
		if(useYn == "N"){
			litRegist();
		}else{
			if(validChk()){
				check();
			}
		}
	});
	
	//취소버튼
	$("#cancel").click(function(){
		location.href="/admin/litList.do";
	});
	
});

function litRegist() {
	var registData = new FormData();
	var content = $("#text").val(); //배너명
	var userId = $("#sessionUserId").val(); //headerJSP 사용자명
	var link = $("#link").val(); // URL
	var urlType = $("input[name='chk05']:checked").val(); //URL 타입 여부
	var locationNN = $('#locationNo').val(); // 노출순서
	var locationN = locationNN.substring(0,1); // 1번 > 1 표시
	var languageType = $("input[name='chk03']:checked").val(); //언어 타입
	var useYn = $("input[name='chk04']:checked").val(); // 사용여부
	
	if(validChk()){
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1','upFile', registData,'insert', true, true);
	
	if(insertChk1 != true ) return false; 
	
	
		registData.append("seqId", "CONTENT_SEQ");
		registData.append("boardType", "LIT");
		registData.append("refType", "MAIN");
		registData.append("createId", userId);
		registData.append("content",content);
		registData.append("link",link);
		registData.append("urlType",urlType);
		registData.append("locationN",locationN);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);
		
		$.ajax({
			type : 'POST',
			url : '/admin/insertLitRegist.do',
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			dataType : 'json',
			data : registData,
			success : function(data){
				alert("저장되었습니다.");
				location.href="/admin/litList.do";
			},
			error : function(request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}

//메인베너 노출순서 중복체그
function check(){
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0,1);
	var boardType = "LIT";
	registData.append("locationN", locationN);
	registData.append("boardType", boardType);
	if(locationNN == null || locationNN == ""){
		alert("노출 순서를 설정해 주세요.");
		return;
	} else {
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
					return;
				}else{
					litRegist();
				}
				
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}
}

function validChk() {
	var text = $("#text").val();
	var fileTxt = $("#fileNupFile").val();
	var locationNo = $("#locationNo").val();
	var link = $("#link").val();
	
	if(text == null || text == "") {
		alert("내용을 입력해주세요");
		$("#text").focus();
		return false;
	} else if (link == null || link == "") {
		alert ("URL을 입력해주세요.");
		$("#link").focus();
		return falsel
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
