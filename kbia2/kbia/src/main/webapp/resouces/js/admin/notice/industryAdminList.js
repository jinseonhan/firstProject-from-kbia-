$(document).ready(function() {
	//산업뉴스 리스트 조회
	selectIndustryList();
	
	$("#searchBtn").click(function() {
		
		selectIndustryList();
	});	
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistIndustry.do";
	});
	
});
//산업 뉴스 리스트 조회
function selectIndustryList() {
	var industryTitle = $("#industryTitle").val();
	var startIndustryDate = $("#startIndustryDate").val();
	var endIndustryDate = $("#endIndustryDate").val();

	var industryUse = $("input[name='chk01']:checked").val();
	if(industryUse == "all"){
			industryUse = null;
	}
	var industryLanguage = $("input[name='chk02']:checked").val();
	if(industryLanguage == "all"){
		industryLanguage = null;
	}
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/industryAdminList.do'
		, async: false
		, data : {
			"industryTitle" : industryTitle,
			"startIndustryDate" : startIndustryDate,
			"endIndustryDate" : endIndustryDate,
			"industryUse" : industryUse,
			"industryLanguage" :  industryLanguage
			
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
	    movableColumns:true,
		rowClick:function(e, row){
			rowClick(e, row);
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
	        {title:"순번", field:"rowNum", hozAlign:"center", width:90},
	        {title:"언어", field:"languageType",width:80},
	        {title:"제목", field:"title",width:600},
	        {title:"사용 여부", field:"useYn", hozAlign:"center",width:100},
	        {title:"작성자", field:"createId", hozAlign:"center",width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateIndustry.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();

	}
	
}