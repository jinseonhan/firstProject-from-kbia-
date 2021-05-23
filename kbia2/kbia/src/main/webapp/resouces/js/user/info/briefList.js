$(document).ready(function() {
	//기본 리스트
	selectBriefList();
	
	//검색 리스트 조회
	$("#searchBtn").click(function() {
		
		selectBriefList();
	});
	
	
});


//메인 배너 리스트 조회
function selectBriefList() {
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();

	var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var date = now.getDate();
	var time = now.getHours();
	var min = now.getMinutes();
	
    month = month >=10 ? month : "0" + month;
    date  = date  >= 10 ? date : "0" + date;
	time = time >=10 ? time : "0" + time;
    min  = min  >= 10 ? min : "0" + min;

    var today = year + month + date + time + min + "00";

	$.ajax({
		type : 'POST'
		, url : '/user/briefList.do'
		, async: false
		, data : {
			"boardType" : "BRIEF",
			"kinds" : kinds,
			"searchTxt" : searchTxt,
			"briefDate" : today		
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
			rowClick(e, row)
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
			{title:"원등록일", field:"orgCreateDate", visible:false},
	        {title:"번호", field:"rowNum", width:100, hozAlign:"center"},
	        {title:"제목", field:"title", hozAlign:"left", formatter:function(cell, formatterParams){
				var value = cell.getValue();
				return "<span style='font-weight:bold;'>" +value+ "</span>";
				}},
			{title:"작성자", field:"createId", width:150, hozAlign:"center"},
			{title:"첨부파일", field:"fileCnt", width:150, hozAlign:"center", formatter:function(cell, formatterParams){
						var value = cell.getValue();
						var html="";
						if(value > 0){
						for(var i=0; i<value; i++){
							html += "<img src='/resouces/images/user/ico-file.png'> " + "  ";
							
						}
						return html;
					}else{
						return "<span>첨부파일 없음</span>";
					}
						
				}},
	        {title:"등록일", field:"createDate",  width:150, hozAlign:"center"},
			{title:"조회수", field:"viewCnt", width:150, hozAlign:"center"}        
	    ],
	});
}
	
	var kinds = $("select[name=select01]").val();
	var searchTxt = $("#searchTitle").val();
	
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var createDate = row._row.data.orgCreateDate;
		
		var form = $('<form></form>');
	    form.attr('action', '/openBriefContent.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		var createDateF = $("<input type='hidden' value="+createDate+" name='createDate'>");
		var kindsF = $("<input type='hidden' value="+kinds+" name='kinds'>");
		var searchTxtF = $("<input type='hidden' value="+searchTxt+" name='searchTxt'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.append(createDateF);
		form.append(kindsF);
	    form.append(searchTxtF);
	    form.submit();
	}

