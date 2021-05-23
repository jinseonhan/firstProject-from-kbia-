$(document).ready(function() {
	
	selectScList();
	
	$("#searchBtn").click(function() {
		
		selectScList();
	});
	
});

function selectScList(){
	var kinds = $("select[name=select03]").val();
	var searchTxt = $("#searchTitle").val();
	
	$.ajax({
		type : 'POST'
		, url : '/user/scMemList.do'
		, async: false
		, data : {
			"boardType" : "MEMBER",
			"kinds" : kinds,
			"searchTxt" : searchTxt,
			"division" : "M4"
		}
		, dataType : 'json'
		, success : function(data){
			
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
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e, row){
			rowClick(e, row)
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"원등록일", field:"orgCreateDate", visible:false},
	        {title:"로고", field:"stFileNm", width:400, hozAlign:"center", formatter:function(cell, formatterParams){
						var value = cell.getValue();
						console.log(value);
						var html="";
						html += "<img src='/upFile/upFile/" + value + " ' height='80' width='200'/>" + "  ";
						return html;
					}},
			{title:"회원사명", field:"comNm", width: 300, hozAlign:"center"},
	        {title:"대표이사", field:"comRepreNm", width:200, hozAlign:"center"},
	        {title:"업종", field:"sectors", width:200, hozAlign:"center"}	,
			{title:"홈페이지", field:"homepage", width:300, hozAlign:"center", formatter:function(cell, formatterParams){
				var value = cell.getValue();
				console.log(value);
				var html = "";
				html += "<a href= '"+ value + "'><img src='/resouces/images/user/ico-url.png'></a>";
				return html;
			}},
			       
	    ],
	});
}
	
	var kinds = $("select[name=select03]").val();
	var searchTxt = $("#searchTitle").val();
	
	function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var createDate = row._row.data.orgCreateDate;
		var viewCnt = row._row.data.viewCnt;
		
		
		var form = $('<form></form>');
	    form.attr('action', '/openMemInfoContent.do');
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
		form.append(viewCntF);
	    form.submit();
		
		
	}

