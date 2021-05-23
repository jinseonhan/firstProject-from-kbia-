$(document).ready(function() {
	//주간브리프
	selectBriefList();

	//주간브리프 리스트 조회
	$("#searchBtn").click(function() {
		
		selectBriefList();
	});
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistBrief.do";
	});
});

//주간브리프 리스트 조회
function selectBriefList() {
	
	var birefUse = $("input[name='chk01']:checked").val();
	var infoTitle = $("#infoTitle").val();
	var startBriefDate = $("#startBriefDate").val();
	var endBriefDate = $("#endBriefDate").val();
	

	if(birefUse == "all"){
			birefUse = null;
	}
	var briefLanguage = $("input[name='chk02']:checked").val();
	if(briefLanguage == "all"){
		briefLanguage = null;
	}
	
	//등록일 미입력시
	if(startBriefDate == '' || startBriefDate == null){
		alert("시작날짜 입력해주세요");
		$("#startBriefDate").focus();
		return;
	}
	if(endBriefDate == '' || endBriefDate == null){
		alert("종료날짜 입력해주세요");
		$("#endBriefDate").focus();
		return;
	}
	
	$.ajax({
		type : 'POST'
		, url : '/admin/briefAdminList.do'
		, async: false
		, data : {
			"infoTitle" : infoTitle,
			"startBriefDate" : startBriefDate,
			"endBriefDate" : endBriefDate,
			"birefUse" : birefUse,
			"briefLanguage" :  briefLanguage
			
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			
			tabGrid(data);
		}
	});
}
var table;
function tabGrid(inData) {
	//Build Tabulator
		table = new Tabulator("#colTable", {
	    layout:"fitColumns",
		data:inData, 
	    pagination:"local",
	    paginationSize:10,
	    movableColumns:true,
		rowClick:function(e, row){
			rowClick(e, row);
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
	        {title:"순번", field:"rowNum", width:70, hozAlign:"center"},
	        {title:"언어", field:"languageType", hozAlign:"center" },
	        {title:"제목", field:"title"},
	        {title:"사용 여부", field:"useYn", hozAlign:"center"},
	        {title:"작성자", field:"createId", hozAlign:"center"},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});

	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateBrief.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();

	}
}