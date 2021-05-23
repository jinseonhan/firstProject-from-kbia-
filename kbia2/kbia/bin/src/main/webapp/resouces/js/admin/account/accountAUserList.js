$(document).ready(function() {
	//유저 리스트 조회
	selectUserList();
	
	$("#searchBtn").click(function() {
		selectUserList();
	});
	
	
	$("#btnReg").click(function() {
		location.href="/admin/openAccountAUserReg.do";
	});
});

//유저 리스트 조회
function selectUserList() {
	var registData = new FormData();
	
	var fromCreateDate = $("#fromCreateDate").val();
	var toCreateDate = $("#toCreateDate").val();
	var userIdNm = $("#userIdNm").val();
	var useYn =$('input:radio[name=useYn]:checked').val();	// 사용여부
	if(useYn == 'on'){
		useYn = '';
	}

	registData.append("fromCreateDate",fromCreateDate);
	registData.append("toCreateDate",toCreateDate);
	registData.append("userIdNm",userIdNm);
	registData.append("useYn",useYn);

	// 유저수 조회
	$.ajax({
		type : 'POST'
		, url : '/admin/AUserCnt.do'
		, async: false
		, data : {
			"fromCreateDate" : fromCreateDate
			, "toCreateDate" : toCreateDate
			, "userIdNm" : userIdNm
			, "useYn" : useYn
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			$("#userCnt").html('&nbsp;&nbsp;' + data);
		}
	});
	// 유저 리스트 조회
	$.ajax({
		type : 'POST'
		, url : '/admin/accountListAUser.do'
		, async: false
		, processData: false
		, contentType: false
		, data :{"fromCreateDate" : fromCreateDate
				, "toCreateDate" : toCreateDate
				, "userIdNm" : userIdNm
				, "useYn" : useYn}
		, dataType : 'json' //xml, json, local 3형식 
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
			
	    	rowClick(e, row);
	    },
	    columns:[
			{title:"순번", field:"rowNum", width:70, hozAlign:"center"},
	        {title:"ID", field:"userId"},
	        {title:"이름", field:"userNm"},
	        {title:"사용여부", field:"useYn", hozAlign:"center"},
	        {title:"작성자", field:"createId", hozAlign:"center"},
	        {title:"생성일", field:"createDate", hozAlign:"center"}      
	    ],
	});
	
	function rowClick(e, row){	
		var userId = row._row.data.userId;
		console.log("row의 값 : " +row);
		console.log("e의 값 : " +e);
		var form = $('<form></form>');
	    form.attr('action', '/admin/accountUpdateAUser.do');
	    form.attr('method', 'post');
	    form.appendTo('body');

	    var tempId = $("<input type='hidden' value="+userId+" name='tempId'>");
	    form.append(tempId);
	    
	 	form.submit();
	}
}