$(document).ready(function() {
	//메인배너 리스트 조회
	selectContentList();
	
	$("#searchBtn").click(function() {
		selectContentList();
	});
	
	
});



//메인 배너 리스트 조회
function selectContentList() {
	
	var useYn = $("input[name='chk01']:checked").val();
	if(useYn == "all"){
		useYn = null;
	}
    var languageType = $("input[name='chk02']:checked").val();
	if(languageType == "all"){
		languageType = null;
	}
    var title = $("#title").val();
    var regStartDate = $("#regStartDate").val();
    var regEndDate = $("#regEndDate").val();
	$.ajax({
		type : 'POST'
		, url : '/admin/contentList.do'
		, async: false
		, data : {
			"regStartDate" : regStartDate,
			"title" : title,
			"regEndDate" : regEndDate,
			"useYn" : useYn,
			"languageType" :languageType
			
						
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			/*var html = gridDraw(data);
			$("#userList").append(html);			
			*/
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
	    columns:[
	        {title:"순번", field:"ROW_NUM", width:70, hozAlign:"center"},
	        {title:"언어", field:"LANGUAGE_TYPE", hozAlign:"center"},
	        {title:"제목", field:"TITLE"},
			{title:"노출순서", field:"EXT1", hozAlign:"center"},
			{title:"사용여부", field:"USE_YN", hozAlign:"center"},
			{title:"작성자", field:"CREATE_ID", hozAlign:"center"},
	        {title:"게시일", field:"CREATE_DATE", hozAlign:"center"}	        
	    ],
	});
}

function excelDown() {
	table.download("xlsx", "홈페이지 회원.xlsx", {sheetName:"회원목록"});
}

/*function gridDraw(data) {
	var html = '';
	$.each(data, function(){		
		html += '<tr>';
		html +=	'<td>'+ this['BOARD_NO'] + '</td>';
		html += '<td>'+ this['LANGUAGE_TYPE'] + '</td>';
		html += '<td class="txtL"><a href="">' + this['TITLE'] + '</a></td>';
		html += '<td>' + this['EXT1'] + '</td>';
		html += '<td>' + this['USE_YN'] + '</td>';
		html += '<td>' + this['CREATE_ID'] + '</td>';
		html += '<td>' + this['CREATE_DATE'] + '</td>';
		html += '</tr>';
	});
	return html;
}*/