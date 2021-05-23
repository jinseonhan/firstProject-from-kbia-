$(document).ready(function() {
	//메인베너 리스트 조회
	selectMbannerList();
	
	$("#searchBtn").click(function() {
		selectMbannerList();
	});
	
	$("#registBtn").click(function(){
	location.href="/admin/MbannerRegist.do";
		
	});
	
});

//메인베너 리스트 조회
function selectMbannerList() {
	
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
		, url : '/admin/MbannerList.do'
		, async: false
		, data : {
			"boardType" : "MAIN",
			"startDt" : startDt,
			"title" : title,
			"endDt" : endDt,
			"useYn" : useYn,
			"languageType" :languageType
						
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			console.log(data);
		
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
	        {title:"순번", field:"boardNo", width:70, visible:false},
			{title:"번호", field:"rowNum", width:90, hozAlign:"center"},
			{title:"글타입", field:"boardType", visible:false},
			{title:"팝업구분", field:"division", visible:false},
			{title:"링크", field:"link", visible:false},
			{title:"내용", field:"content", visible:false},
	        {title:"언어", field:"languageType", hozAlign:"center",width:90},
	        {title:"제목", field:"title",width:400},
			{title:"노출순서", field:"locationN"},
			{title:"사용여부", field:"useYn", hozAlign:"center",width:100},
			{title:"작성자", field:"createId", hozAlign:"center",width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"},	
			{title:"종료일", field:"endDt", hozAlign:"center", visible:false},   
			{title:"상시노출", field:"outDiv", hozAlign:"center" ,visible:false},	
	    ],
	});
	
function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		
		var form = $('<form></form>');
	    form.attr('action', '/admin/openMbannerSelet.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.submit();
	}


}
