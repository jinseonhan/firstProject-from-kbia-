$(document).ready(function() {
	//협회 리스트 조회
	HistoryListA();
	
	$("#searchBtn").click(function() {
		HistoryListA();
	});
	
		$("#registBtn").click(function(){
		location.href="/admin/historyRegist.do";
		
	});
	
	// 협회
	$("#Association").click(function() {
		HistoryListA();
	});
	//조합
	 $("#Combination").click(function() {
		HistoryListC();
	});
	
});


//연혁 조회
function HistoryListA() {
	
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
	var division =$('#Association').attr("value");

	$.ajax({
		type : 'POST'
		, url : '/admin/historyList.do'
		, async: false
		, data : {
			"boardType" : "HISTORY",
			"regStartDate" : regStartDate,
			"title" : title,
			"regEndDate" : regEndDate,
			"useYn" : useYn,
			"languageType" :languageType,
			"division" : division
			
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
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e,row){
	    	rowClick(e,row);
		
	    },

	    columns:[
	        {title:"번호", field:"boardNo", width:70, hozAlign:"center",visible:false },
			{title:"순번", field:"rowNum", width:90, hozAlign:"center"},
	        {title:"언어", field:"languageType", hozAlign:"center",width:90},
			{title:"년/월", field:"yearmonth", hozAlign:"center"},
	        {title:"제목", field:"title",width:500},
			{title:"사용여부", field:"useYn", hozAlign:"center",width:100 },
	        {title:"등록일", field:"createDate", hozAlign:"center"},       
			{title:"협조", field:"division", hozAlign:"center",visible:false}
	    ],
	});
}	
	function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		
		var form = $('<form></form>');
	    form.attr('action', '/admin/openHistorySelet.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.submit();
	}
	
	
	// 조합select
	function HistoryListC(){
		
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
	var division =$('#Combination').attr("value");
	
	$.ajax({
		type : 'POST'
		, url : '/admin/historyList.do'
		, async: false
		, data : {
			"boardType" : "HISTORY",
			"regStartDate" : regStartDate,
			"title" : title,
			"regEndDate" : regEndDate,
			"useYn" : useYn,
			"languageType" :languageType,
			"division" : division
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			 
			tabGridd(data);
		}
	});
}


function tabGridd(inData) {
	//Build Tabulator
		table = new Tabulator("#colTable", {
	    layout:"fitColumns",
		data:inData, 
	    pagination:"local",
	    paginationSize:10,
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e,row){
	    	rowClick(e,row);
		
	    },


	    columns:[
	        {title:"번호", field:"boardNo", width:70, hozAlign:"center",visible:false },
			{title:"순번", field:"rowNum", width:70, hozAlign:"center"},
	        {title:"언어", field:"languageType", hozAlign:"center"},
			{title:"년/월", field:"yearmonth", hozAlign:"center"},
	        {title:"제목", field:"title"},
			{title:"사용여부", field:"useYn", hozAlign:"center"},
	        {title:"등록일", field:"createDate", hozAlign:"center"},       
			{title:"협조", field:"division", hozAlign:"center",visible:false}
	    ],
	});
	
	function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		
		var form = $('<form></form>');
	    form.attr('action', '/admin/openHistorySelet.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.submit();
	}
		
		
		
	}
	
	

