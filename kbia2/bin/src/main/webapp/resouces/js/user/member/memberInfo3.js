$(document).ready(function() {
	
	selectEcList();
	
});

function selectEcList(){
	var kinds = $("select[name=select03]").val();
	var searchTxt = $("#searchTitle").val();
	
	$.ajax({
		type : 'POST'
		, url : '/user/ecMemList.do'
		, async: false
		, data : {
			"boardType" : "MEMBER",
			"kinds" : kinds,
			"searchTxt" : searchTxt,
			"division" : "M3"
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
