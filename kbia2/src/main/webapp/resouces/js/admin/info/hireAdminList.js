$(document).ready(function() {
	
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistHire.do";
	
	});
	
	var index = 1;
	selectHireList();
	selectmemberList();
	
	$("#colTable1").show();
	$("#colTable2").hide();
	
	//채용 공고 리스트 조회
	$(".curr").click(function(){
		index = 1;
		$("#colTable1").show();
		$("#colTable2").hide();
	});
	
	$(".curr01").click(function(){
		index = 2;		
		$("#colTable1").hide();
		$("#colTable2").show();
	});
	
	$("#searchBtn").click(function() {
		if(index == 1){
			selectHireList();
		}else if(index == 2){
			selectmemberList();
		}
	});	
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectHireList();
			}
		})
	})
});
	


//채용공고 리스트 조회
function selectHireList() {
	var hireUse = $("input[name='chk01']:checked").val();
	var hireTD = $("#hireTD").val();
	var startHireDate = $("#startHireDate").val();
	var endHireDate = $("#endHireDate").val();
	if(hireUse == "all"){
			hireUse = null;
	}
	var hireLanguage = $("input[name='chk02']:checked").val();
	if(hireLanguage == "all"){
		hireLanguage = null;
	}
	var memberTable = "A";
	

	
	$.ajax({
		type : 'POST'
		, url : '/admin/hireAdminList.do'
		, async: false
		, data : {
			"hireTD" : hireTD,
			"startHireDate" : startHireDate,
			"endHireDate" : endHireDate,
			"hireUse" : hireUse,
			"hireLanguage" :  hireLanguage,
			"memberTable" : memberTable
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			
			tabGrid(data);
			
		}
	});
}
//협회 그리드 

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
		table = new Tabulator("#colTable1", {
	    layout:"fitColumns",
		data:inData, 
	    pagination:"local",
	    paginationSize:10,
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e, row){
			rowClick(e, row);
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
	        {title:"순번", field:"rowNum", hozAlign:"center", width:90},
	        {title:"언어", field:"languageType" , hozAlign:"center", width:80},
			{title:"구분", field:"division", hozAlign:"center", width:100},
			{title:"내용", filed:"content", visible:false},
	        {title:"제목", field:"title", width:500},
	        {title:"사용 여부", field:"useYn", hozAlign:"center",width:100},
	        {title:"작성자", field:"createId", hozAlign:"center",width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateHire.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();
	}
}
//회원사
function selectmemberList() {
	var hireUse = $("input[name='chk01']:checked").val();
	var hireTitle = $("#hireTitle").val();
	var startHireDate = $("#startHireDate").val();
	var endHireDate = $("#endHireDate").val();
	if(hireUse == "all"){
			hireUse = null;
	}
	var hireLanguage = $("input[name='chk02']:checked").val();
	if(hireLanguage == "all"){
		hireLanguage = null;
	}
	var memberTable = "M";
	
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/hireAdminList.do'
		, async: false
		, data : {
			"hireTitle" : hireTitle,
			"startHireDate" : startHireDate,
			"endHireDate" : endHireDate,
			"hireUse" : hireUse,
			"hireLanguage" :  hireLanguage,
			"memberTable" : memberTable
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			
			tabGrid2(data);
			
		}
	});
}
//회원사 그리드

function tabGrid2(inData) {
	//Build Tabulator
		table2 = new Tabulator("#colTable2", {
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
			{title:"구분", field:"division", hozAlign:"center", width:100},
			{title:"내용", filed:"content", visible:false},
	        {title:"제목", field:"title", width:500},
	        {title:"사용 여부", field:"useYn", hozAlign:"center", width:100},
	        {title:"작성자", field:"createId", hozAlign:"center", width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateHire.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();
		}
}
