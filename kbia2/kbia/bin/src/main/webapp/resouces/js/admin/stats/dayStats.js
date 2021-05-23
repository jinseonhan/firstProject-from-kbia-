$(document).ready(function() {
	setDateBox();
	selectDayStatslist();
	$("#searchBtn").click(function(){
		selectDayStatslist();
	});
});

function setDateBox(){
    var dt = new Date();
    var year = "";
    var com_year = dt.getFullYear();
    // 발행 뿌려주기
	$("#spanYear").html(com_year+"년");
    // 올해 기준으로 -1년부터 +5년을 보여준다.
    for(var y=0; y<10; y++){
		var newYear = com_year-y;
        $("#selectYear").append("<option value='"+ newYear +"'>"+ newYear + "년" +"</option>");
    }
}

// 리스트 조회하기
function selectDayStatslist(){
	var resultData = new FormData();
	var year = $("#spanYear").html();
	var month = $("#spanMonth").html();
	year = year.replace("년","");
	month = month.replace("월","");
	month = month >=10 ? month : "0" + month;
	resultData.append("year", year);
	resultData.append("logMonth", month);

	$.ajax({
		type :"POST",
		url : "/admin/selectDayStatslist.do",
		processData: false,
		data : resultData,
		contentType: false,
		async: false,
		dataType : 'json',
		success : function(data){		
				tabGrid(data);	
				selectAllStatsCnt();		
			},

	});
};

function selectAllStatsCnt(){
	$.ajax({
		type :"POST",
		url : "/admin/selectAllStatsCnt.do",
		data : {},
		async: false,
		dataType : 'json',
		success : function(data){		
				$("#dayCnt").text(data.dayCnt);
				$("#monthCnt").text(data.monthCnt);
				$("#allCnt").text(data.allCnt);
				var spanYear = $('#spanYear').html(); 
				var spanMonth = $('#spanMonth').html();	
				var termHtml = "검색기간: <strong>"+spanYear+"  "+spanMonth+"</strong>";
				$("#searchTerm").html(termHtml);
			},
	});
}


var table;
function tabGrid(inData) {
	//Build Tabulator
		table = new Tabulator("#colTable", {
	    layout:"fitColumns",
		data:inData, 
	    //pagination:"local",
	    //paginationSize:12,
	    //paginationSizeSelector:[10, 20, 30],
	    movableColumns:false,
	    columns:[
			{title:"날짜", field:"logDay",width:200, hozAlign:"center"},
	        {title:"그래프", field:"percentage",  hozAlign:"left", formatter:function(cell, formatterParams){
				var value = cell.getValue();	
				var row = cell.getRow();
				return "<div class='graph'><p><span style='width:"+value+"%'></span></p><strong>"+row._row.data.dayCnt+"</strong></div>";
				}},
	        {title:"접속통계", field:"dayStats", width:250, hozAlign:"center"}       
	    ],
	});
}