$(document).ready(function() {
	//유저 리스트 조회
	selectPupList();
	
	$("#searchBtn").click(function() {
		selectPupList();
	});
	
	$("#registBtn").click(function(){
		location.href="/admin/popRegist.do";
		
	});
	
	
});



//팝업 리스트 조회
function selectPupList() {
	//팝업 조회
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
		, url : '/admin/pupList.do'
		, async: false
		, data : {
			"boardType" : "POPUP",
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
			{title:"번호", field:"rowNum", width:70, hozAlign:"center"},
			{title:"글타입", field:"boardType", visible:false},
			{title:"팝업구분", field:"division", visible:false},
			{title:"링크", field:"link", visible:false},
			{title:"내용", field:"content", visible:false},
	        {title:"언어", field:"languageType", hozAlign:"center"},
	        {title:"제목", field:"title"},
			{title:"노출위치", field:"location", hozAlign:"center"},
			{title:"사용여부", field:"useYn", hozAlign:"center"},
			{title:"작성자", field:"createId", hozAlign:"center"},
	        {title:"게시일", field:"startDt", hozAlign:"center"},	
			{title:"종료일", field:"endDt", hozAlign:"center", visible:false},   
			{title:"상시노출", field:"outDiv", hozAlign:"center" ,visible:false},	
	    ],
	});

	
function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		
		var form = $('<form></form>');
	    form.attr('action', '/admin/openPopSelet.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.submit();
	}


}
