$(document).ready(function() {
	//The Battery리스트 조회
	selectBatteryList();
	
	$("#searchBtn").click(function() {
		
		selectBatteryList();
	});	
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				selectBatteryList();
			}
		})
	})
	
	$("#registBtn").click(function(){
		location.href = "/admin/openRegistBattery.do";
	});
	
});
//The Battery 리스트 조회
function selectBatteryList() {
	var batteryUse = $("input[name='chk01']:checked").val();
	var batteryTitle = $("#batteryTitle").val();
	var startBatteryDate = $("#startBatteryDate").val();
	var endBatteryDate = $("#endBatteryDate").val();
	if(batteryUse == "all"){
			batteryUse = null;
	}
	var batteryLanguage = $("input[name='chk02']:checked").val();
	if(batteryLanguage == "all"){
		batteryLanguage = null;
	}
	

	
	$.ajax({
		type : 'POST'
		, url : '/admin/batteryAdminList.do'
		, async: false
		, data : {
			"batteryTitle" : batteryTitle,
			"startBatteryDate" : startBatteryDate,
			"endBatteryDate" : endBatteryDate,
			"batteryUse" : batteryUse,
			"batteryLanguage" :  batteryLanguage
			
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
	        {title:"언어", field:"languageType", hozAlign:"center", width:80},
	        {title:"제목", field:"title" , width:600},
	        {title:"사용 여부", field:"useYn", hozAlign:"center" ,width:100},
	        {title:"작성자", field:"createId", hozAlign:"center", width:100},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	
	function rowClick(e, row){
		var boardNo = row._row.data.boardNo;
		var boardType = row._row.data.boardType;
		var form = $('<form></form>');
		form.attr('action','/admin/openUpdateBattery.do');
		form.attr('method','post');
		form.appendTo('body');
		var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		form.append(boardNoF);
		form.append(boardTypeF);
		form.submit();

	}
	
}