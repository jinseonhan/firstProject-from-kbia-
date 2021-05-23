$(document).ready(function(){
	// 소배너 리스트 조회
	selectLitList();
	
	//검색버튼
	$("#searchBtn").click(function(){
		selectLitList();
	});
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectLitList();
			}
		})
	})
	
	//등록버튼
	$("#registBtn").click(function(){
		location.href="/admin/litRegist.do";
	});
	
});

// 소배너 리스트 조회
function selectLitList(){
	
	var useYn = $("input[name='chk01']:checked").val();
	if(useYn == "all"){
		useYn = null;
	}
	
	var languageType = $("input[name='chk02']:checked").val();
	if(languageType == "all"){
		languageType = null;
	}
	
	var title = $("#title").val();
	var sDate = $("#sDate").val();
	var eDate = $("#eDate").val();
	$.ajax({
		type : 'POST',
		url : '/admin/selectLitList.do',
		async : false,
		data : {
			"boardType" : "LIT",
			"startDt" : sDate,
			"endDt" : eDate,
			"title" : title,
			"useYn" : useYn,
			"languageType" :languageType
		},
		dataType : 'json',
		success : function(data) {
			tabGrid(data);
		},
		error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
};

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
			{title:"링크", field:"link", visible:false},
			{title:"언어", field:"languageType", hozAlign:"center",width:90},
			{title:"배너명", field:"content"},
	        {title:"제목", field:"title",visible:false},
			{title:"노출순서", field:"locationN", width:100, hozAlign:"center"},
			{title:"사용여부", field:"useYn", hozAlign:"center",width:100},
			{title:"작성자", field:"createId", hozAlign:"center",visible:false},
	        {title:"등록일", field:"createDate", hozAlign:"center"},	
			{title:"종료일", field:"endDt", hozAlign:"center", visible:false},   
			{title:"상시노출", field:"outDiv", hozAlign:"center" ,visible:false},	
	    ],
	});
	
function rowClick(e, row){

		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
	    form.attr('action', '/admin/viewLitContent.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.submit();
	}


}