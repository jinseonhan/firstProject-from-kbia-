$(document).ready(function() {
	//기술자료실 리스트 조회
	selectReferenceList();
	
	$("#searchBtn").click(function() {
		
		selectReferenceList();
	});	
	
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistReference.do";
	});

});
//기술자료실 리스트 조회
function selectReferenceList() {
	var referenceUse = $("input[name='chk01']:checked").val();
	var referenceTitle = $("#referenceTitle").val();
	var startReferenceDate = $("#startReferenceDate").val();
	var endReferenceDate = $("#endReferenceDate").val();
	if(referenceUse == "all"){
			referenceUse = null;
	}
	var referenceLanguage = $("input[name='chk02']:checked").val();
	if(referenceLanguage == "all"){
		referenceLanguage = null;
		
	}
	$.ajax({
		type : 'POST'
		, url : '/admin/referenceAdminList.do'
		, async: false
		, data : {
			"referenceTitle" : referenceTitle,
			"startReferenceDate" : startReferenceDate,
			"endReferenceDate" : endReferenceDate,
			"referenceUse" : referenceUse,
			"referenceLanguage" :  referenceLanguage
			
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
	        {title:"언어", field:"languageType" , hozAlign:"center", width:80},
			{title:"내용", filed:"content", visible:false},
	        {title:"제목", field:"title", width:600},
	        {title:"사용 여부", field:"useYn", hozAlign:"center", width:100},
	        {title:"작성자", field:"createId", hozAlign:"center", width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateReference.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();
		
		}
}