$(document).ready(function() {
	
	selectBcList();
	
	//언어변경
	$("#langType").change(function(){
		selectBcList();
	})
	
	$("#searchTitle").keydown(function(key) {
		if (key.keyCode == 13) {
			selectBcList();
		}
	});	
	
	$("#searchBtn").click(function(){
		selectBcList()
	});
});

function selectBcList(){
	var kinds = $("select[name=select03]").val();
	var searchTxt = $("#searchTitle").val();
	var langType = $("#langType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/user/bcMemList.do'
		, async: false
		, data : {
			"boardType" : "MEMBER",
			"kinds" : kinds,
			"searchTxt" : searchTxt,
			"division" : "M2",
			"langType" : langType
		}
		, dataType : 'json'
		, success : function(data){
			
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
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e, row){
			rowClick(e, row)
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"원등록일", field:"orgCreateDate", visible:false},
	        {title:"로고", field:"stFileNm", width:300, hozAlign:"left", formatter:function(cell, formatterParams){
						var value = cell.getValue();
						
						var html="";
						html += "<img src='/upFile/upFile/" + value + " ' height='80' width='200'/>" + "  ";
						return html;
					}},
			{title:"회원사명", field:"comNm",  hozAlign:"left"},
	        {title:"대표이사", field:"comRepreNm", width:200, hozAlign:"left"},
	        {title:"업종", field:"sectors", width:200, hozAlign:"left"}	,
			{title:"홈페이지", field:"homepage", width:100, hozAlign:"left", formatter:function(cell, formatterParams){
				var value = cell.getValue();
				console.log(value);
				var html = "";
				if(value != null && value != '') html += "<a href= '"+ value + "' target='_blank'><img src='/resouces/images/user/ico-url.png'></a>";

				return html;
			}},
			       
	    ],
	});
	
	var kinds = $("select[name=select03]").val();
	var searchTxt = $("#searchTitle").val();
	
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var createDate = row._row.data.orgCreateDate;
		var division = row._row.data.division;
		
		var form = $('<form></form>');
	    form.attr('action', '/openMemInfoContent.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		var createDateF = $("<input type='hidden' value="+createDate+" name='createDate'>");
		var kindsF = $("<input type='hidden' value="+kinds+" name='kinds'>");
		var searchTxtF = $("<input type='hidden' value="+searchTxt+" name='searchTxt'>");
	    var divisionF = $("<input type='hidden' value="+division+" name='division'>");
		form.append(boardNoF);
	    form.append(boardTypeF);
	    form.append(createDateF);
		form.append(kindsF);
	    form.append(searchTxtF);
		form.append(divisionF);
	    form.submit();
	}
}

