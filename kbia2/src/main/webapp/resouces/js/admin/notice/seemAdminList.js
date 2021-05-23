$(document).ready(function() {
	//회원사 동정 리스트 조회
	selectSeemList();
	
	$("#searchBtn").click(function() {
		
		selectSeemList();
	});	
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectSeemList();
			}
		})
	})
	
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistSeem.do";
	});
	
});
//회원사 동정 리스트 조회
function selectSeemList() {
	var seemTitle = $("#seemTitle").val();
	var startSeemDate = $("#startSeemDate").val();
	var endSeemDate = $("#endSeemDate").val();
	
	var seemUse = $("input[name='chk01']:checked").val();
	if(seemUse == "all"){
			seemUse = null;
	}
	var seemLanguage = $("input[name='chk02']:checked").val();
	if(seemLanguage == "all"){
		seemLanguage = null;
	}
	

	
	$.ajax({
		type : 'POST'
		, url : '/admin/seemAdminList.do'
		, async: false
		, data : {
			"seemTitle" : seemTitle,
			"startSeemDate" : startSeemDate,
			"endSeemDate" : endSeemDate,
			"seemUse" : seemUse,
			"seemLanguage" :  seemLanguage
			
		}
		, dataType : 'json'//xml,json,local 3형식 
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
	    movableColumns:true,
		rowClick:function(e, row){
			rowClick(e, row);
		},
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
	        {title:"순번", field:"rowNum", hozAlign:"center", width:90},
	        {title:"언어", field:"languageType", width:80},
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
		form.attr('action','/admin/openUpdateSeem.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();

	}
	
}