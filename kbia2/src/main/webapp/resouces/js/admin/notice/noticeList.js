$(document).ready(function() {
	//공지사항 리스트 조회
	selectNoticeList();
	
	$("#searchBtn").click(function() {
		selectNoticeList();
	});
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectNoticeList();
			}
		})
	})
	
	$("#registBtn").click(function(){
		location.href="/admin/NoticeRegist.do";
		
	});
	
	
});



//공지사항 리스트 조회
function selectNoticeList() {
	var useYn = $("input[name='chk01']:checked").val();
	if(useYn == "all"){
		useYn = null;
	}
    var languageType = $("input[name='chk02']:checked").val();
	if(languageType == "all"){
		languageType = null;
	}
    var title = $("#title").val();
    var startDt = $("#stdate").val();
    var endDt = $("#endate").val();
	$.ajax({
		type : 'POST'
		, url : '/admin/NoticeList.do'
		, async: false
		, data : {
			"boardType" : "NOTICE",
			"startDt" : startDt,
			"title" : title,
			"endDt" : endDt,
			"useYn" : useYn,
			"languageType" :languageType
						
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
	    paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e,row){
	    	rowClick(e,row);
		
	    },

	    columns:[
	        {title:"순번", field:"boardNo", width:70, visible:false},
			{title:"번호", field:"rowNum", width:90, hozAlign:"center"},
			{title:"글타입", field:"boardType", visible:false},
			{title:"팝업구분", field:"division", visible:false},
	        {title:"언어", field:"languageType", hozAlign:"center",width:90},
	        {title:"제목", field:"title",width:600},
			{title:"사용여부", field:"useYn", hozAlign:"center",width:100},
			{title:"작성자", field:"createId", hozAlign:"center",width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"},	
	    ],
	});

	
function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		
		var form = $('<form></form>');
	    form.attr('action', '/admin/openNoticeSelet.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.submit();
	}


}
