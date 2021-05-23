$(document).ready(function() {
	//유저 리스트 조회
	selectUserList();
	
	$("#searchBtn").click(function() {
		selectUserList();
	});
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectUserList();
			}
		})
	})
	
	$("#btnExcel").click(function() {
		//location.href="/admin/openTest.do";
		excelDown();
	});
	
	$("#btnReg").click(function() {
		location.href="/admin/openAccountUserReg.do";
	});
});

//유저 리스트 조회
function selectUserList() {
	var fromCreateDate = $("#fromCreateDate").val();
	var toCreateDate = $("#toCreateDate").val();
	var userIdNm = $("#userIdNm").val();
	var author = $('input[name="author"]:checked').val();
	var useYn = $('input[name="useYn"]:checked').val();
	if(author == 'on'){
		author = null;
	}
	if(useYn == 'on'){
		useYn = null;
	}
	//유저수 조회
	$.ajax({
		type : 'POST'
		, url : '/admin/gUserCnt.do'
		, async: false
		, data : {
			"fromCreateDate" : fromCreateDate
			, "toCreateDate" : toCreateDate
			, "userIdNm" : userIdNm
			, "author" : author
			, "useYn" : useYn
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			$("#userCnt").html('&nbsp;&nbsp;' + data);
		}
	});
	
	$.ajax({
		type : 'POST'
		, url : '/admin/accountUserList.do'
		, async: false
		, data : {
			"fromCreateDate" : fromCreateDate
			, "toCreateDate" : toCreateDate
			, "userIdNm" : userIdNm
			, "author" : author
			, "useYn" : useYn
		}
		, dataType : 'json' //xml, json, local 3형식 
		, success : function(data) {
			tabGrid(data);
		}
	});
}

var table;
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
		table = new Tabulator("#colTable", {
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
	        {title:"순번", field:"rowNum", width:80, hozAlign:"center"},
	        {title:"ID", field:"userId",hozAlign:"center"},
	        {title:"이름", field:"userNm",hozAlign:"center"},
	        {title:"회사명", field:"workAddr",hozAlign:"center"},
	        {title:"회원등급", field:"author", hozAlign:"center"},
	        {title:"회원상태", field:"useNm", hozAlign:"center"},
	        {title:"가입일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	
	function rowClick(e, row){	
		var userId = row._row.data.userId;

		var form = $('<form></form>');
	    form.attr('action', '/admin/openAccountUserUpdate.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
		var userIdF = $("<input type='hidden' value="+userId+" name='userId'>");
	    form.append(userIdF);
	    form.submit();
	}
}

function excelDown() {
	table.download("xlsx", "홈페이지 회원.xlsx", {sheetName:"회원목록"});
}