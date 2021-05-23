$(document).ready(function(){
	getExcuList();

	//등록 화면 이동
	$("#registBtn").click(function(){
		location.href="/admin/excuReg.do";		
	});	

	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				getExcuList();
			}
		})
	})
});

//임원현황 리스트 조회
function getExcuList(){
	
	$.ajax({
		url : '/admin/json/excuList.do',
		type : 'post',
		async : false,
		dataType : 'json',
		data : {
			"boardType" : "EXCU",
			"stDate" : $("#stDate").val(),
			"enDate" : $("#enDate").val(),
			"excu_name" : $("#excu_name").val(),
			"useYn" : $("input[name=useYn]:checked").val(),
			"languageType" : $("input[name=languageType]:checked").val()
		},
		success : function(data){
			tabGrid(data);
		}
	});
};

//Tabulator
var table;
function tabGrid(inData){
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
			{title:"번호", field:"boardNo", visible:false},
			{title:"글타입", field:"boardType", visible:false},
			{title:"번호", field:"rowNum", width:90, hozAlign:"center",headerSort : false},
			{title:"언어", field:"languageType", hozAlign:"center",width:100,headerSort : false},
			{title:"구분", field:"excuTypeName", hozAlign:"center",headerSort : false},
			{title:"이름", field:"excuName", hozAlign:"center",headerSort : false},			
			{title:"노출순서", field:"locationN", hozAlign:"center",width:100,headerSort : false},
			{title:"사용여부", field:"useYn", hozAlign:"center",width:100,headerSort : false},
			{title:"등록일", field:"createDate", hozAlign:"center",width:150,headerSort : false}
		]
	});
};

//row click
function rowClick(e, row){
	var boardNo = row._row.data.boardNo;
	var boardType = row._row.data.boardType;
	
	$("#searchForm").append("<input type='hidden' id='boardNo' name='boardNo' value='"+boardNo+"'>");
	$("#searchForm").append("<input type='hidden' id='boardType' name='boardType' value='"+boardType+"'>");
	$("#searchForm").submit();
}