$(document).ready(function() {	
	//공지사항 조회
	memNewsList();
	//검색 리스트 조회
	$("#searchBtn").click(function() {
		
		memNewsList();
	});
});

//공지사항 조회
function memNewsList() {
	
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();

	$.ajax({
		type : 'POST'
		, url : '/user/memNewsList.do'
		, async: false
		, data : {
			"boardType" : "SEEM", //수정필요
			"kinds" : kinds,
			"searchTxt" : searchTxt	
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
	    //paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e, row){
	    	rowClick(e, row);
	    },
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
			{title:"원등록일", field:"orgCreateDate", visible:false},
	        {title:"번호", field:"rowNum", width:70, hozAlign:"center"},
	        {title:"제목", field:"title",  hozAlign:"left", formatter:function(cell, formatterParams){
				var value = cell.getValue();
				return "<span style='font-weight:bold;'>" +value+ "</span>";
				}},
	        {title:"등록일", field:"createDate",  width:150, hozAlign:"center"}	,
			{title:"조회수", field:"viewCnt", width:150, hozAlign:"center"}        
	    ],
	});
	
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();
	
	function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var createDate = row._row.data.orgCreateDate;
		var viewCnt = row._row.data.viewCnt;
		
		var form = $('<form></form>');
	    form.attr('action', '/openNewsContent.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		var createDateF = $("<input type='hidden' value="+createDate+" name='createDate'>");
		var kindsF = $("<input type='hidden' value="+kinds+" name='kinds'>");
		var searchTxtF = $("<input type='hidden' value="+searchTxt+" name='searchTxt'>");
		var viewCntF = $("<input type='hidden' value="+viewCnt+" name='viewCnt'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.append(createDateF);
		form.append(kindsF);
	    form.append(searchTxtF);
	    form.submit();
	}
}
