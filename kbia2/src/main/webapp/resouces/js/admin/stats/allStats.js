$(document).ready(function() {

	$('#startDate').val(prevMonth(1)); // 시작 날짜
	$('#endDate').val(today());	// 마지막 날짜
	selectAllStatslist();

	$("#searchBtn").click(function(){
		//등록일 미입력시 
		var startDate = $('#startDate').val();
		var endDate = $('#endDate').val();
		if(startDate == '' || startDate == null){
			alert("시작날짜 입력해주세요");
			$("#startDate").focus();
			return;
		}
		if(endDate == '' || endDate == null){
			alert("종료날짜 입력해주세요");
			$("#endDate").focus();
			return;
		}
		var endYear = endDate.substr(0,4);
		var endMonth = endDate.substr(5,2);
		if(endMonth.substr(0,1)==0){
			endMonth = endMonth.substr(1,2);
		}
		var endDay = endDate.substr(8,2);
		if(endDay.substr(0,1)==0){
			endDay = endDay.substr(1,2);
		}
		
		let date = new Date(endYear, endMonth-1, endDay);
		date.setFullYear(date.getFullYear() - 1);
		var chkYear = date.getFullYear();
		var chkMonth = ("0"+(date.getMonth()+1)).slice(-2);
		var chkDay = ("0"+date.getDate()).slice(-2);
		
		var reStartDt = startDate.replace(/-/gi,"");
		var chkDt = chkYear+chkMonth+chkDay;

		if(chkDt > reStartDt){
			alert("데이터 양이 많아 1년이상 조회 할 수 없습니다.");
			return;
		}
		
		selectAllStatslist();
	});
});

// 리스트 조회하기
function selectAllStatslist(){
	var resultData = new FormData();
	var startDate = $('#startDate').val(); // 시작 날짜
	var endDate = $('#endDate').val();	// 마지막 날짜

	resultData.append("startDate", startDate);
	resultData.append("endDate", endDate);

	$.ajax({
		type :"POST",
		url : "/admin/selectAllStatslist.do",
		processData: false, /* 필수 */ 
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
				var startDate = $('#startDate').val(); // 시작 날짜
				var endDate = $('#endDate').val();	// 마지막 날짜
				var termHtml = "검색기간: <strong>"+startDate+" ~ "+endDate+"</strong>";
				$("#searchTerm").html(termHtml);
			},
	});
}


var table;
function tabGrid(inData) {
	//Build Tabulator
		table = new Tabulator("#colTable", {
	    //layout:"fitColumns",
		data:inData, 
	    pagination:"local",
	    paginationSize:10,
	    //paginationSizeSelector:[10, 20, 30],
	    movableColumns:false,
 		
	    columns:[
			{title:"IP", field:"ip",width:150, hozAlign:"center"},
	        {title:"접속경로", field:"logZsgr",width:750, hozAlign:"left"},
	        {title:"접속수", field:"logNum", width:100, hozAlign:"center"},
	        {title:"접속일", field:"ymd", width:150, hozAlign:"center"}       
	    ],
	});
}