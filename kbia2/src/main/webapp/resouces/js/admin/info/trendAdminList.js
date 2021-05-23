$(document).ready(function() {
	//기술동향 리스트 조회
	selectTrendList();
	
	$("#searchBtn").click(function() {
		
		selectTrendList();
	});
	
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistTrend.do";
	});

	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectTrendList();
			}
		})
	})
});
//기술동향 리스트 조회
function selectTrendList() {
	var trendUse = $("input[name='chk01']:checked").val();
	var trendType = $("input[name='chk03']:checked").val();
	var trendTitle = $("#trendTitle").val();
	var startTrendDate = $("#startTrendDate").val();
	var endTrendDate = $("#endTrendDate").val();
	
	if(trendType == "all"){
			trendType = null;
	}else if( trendType == "T"){
		trendType = "T_TRENDS";
	}else if( trendType == "A"){
		trendType = "A_TRENDS";
	}

	if(trendUse == "all"){
			trendUse = null;
	}
	var trendLanguage = $("input[name='chk02']:checked").val();
	if(trendLanguage == "all"){
		trendLanguage = null;
	}

	
	$.ajax({
		type : 'POST'
		, url : '/admin/trendAdminList.do'
		, async: false
		, data : {
			"trendType" : trendType,
			"trendTitle" : trendTitle,
			"startTrendDate" : startTrendDate,
			"endTrendDate" : endTrendDate,
			"trendUse" : trendUse,
			"trendLanguage" :  trendLanguage
			
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
	        {title:"언어", field:"languageType", hozAlign:"center", width:80},
			{title:"내용", filed:"content", visible:false},
	        {title:"제목", field:"title", width:600},
	        {title:"사용 여부", field:"useYn",hozAlign:"center", width:100},
	        {title:"작성자", field:"createId",hozAlign:"center", width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateTrend.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();
	}
}
