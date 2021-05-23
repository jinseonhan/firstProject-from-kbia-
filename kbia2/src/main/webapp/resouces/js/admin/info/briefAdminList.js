$(document).ready(function() {
	//주간브리프
	selectBriefList();

	//주간브리프 리스트 조회
	$("#searchBtn").click(function() {
		
		selectBriefList();
	});
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectBriefList();
			}
		})
	})
	
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
	if( inData == null || inData == "" ){
		gridBody = new Tabulator(".colTable", {
			layout: "fitColumns"
			, data: inData
			, columnHeaderVertAlign: "middle"
			, cellVertAlign: "middle"
			, autoResize: true
			, columns: [{title: "검색결과가 없습니다.", headerSort: false}]
		})
		return;
	}
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
	        {title:"순번", field:"rowNum", hozAlign:"center", width:90},
	        {title:"언어", field:"languageType", hozAlign:"center", width:80 },
	        {title:"제목", field:"title", width:600},
	        {title:"사용 여부", field:"useYn", hozAlign:"center" , width:100},
	        {title:"작성자", field:"createId", hozAlign:"center", width:100},
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