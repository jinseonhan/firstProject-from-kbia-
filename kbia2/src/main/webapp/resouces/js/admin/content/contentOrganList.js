$(document).ready(function(){
	searchInit();
	getOrganList();
	
	/*검색 버튼*/
	$("#searchBtn").click(function(){
		$(".colTable").empty();
		getOrganList();
	})
	
	$("input[type=text]").each(function(){
		$(this).keydown(function(e){
			if( e.keyCode == 13 ){
				getOrganList();
			}
		})
	})
	
	/*등록 버튼*/
	$("#registBtn").click(function(){
		moveReg();
	})
})

/*검색 세팅*/
function searchInit(){
	var stDate = $("#searchStDate").val();
	var enDate = $("#searchEnDate").val();
	var name = $("#searchName").val();
	var useYn = $("#searchUseYn").val();
	var lang = $("#searchLang").val();
	
	$("#stdate").val(stDate);
	$("#endate").val(enDate);
	$("#name").val(name);
	
	if( useYn != null && useYn != '' ){
		$("input[type=radio][name=useYn][value=" + useYn + "]").prop("checked", true);
	}
	if( lang != null && lang != '' ){
		$("input[type=radio][name=lang][value=" + lang + "]").prop("checked", true);
	}
}

/* 조직도 조회*/
function getOrganList(){
	var stDate = $("#stdate").val().replace(/-/g,"");
	var enDate = $("#endate").val().replace(/-/g,"");
	var name = $("#name").val();
	var useYn = $("input[type=radio][name=useYn]:checked").val();	
	var lang = $("input[type=radio][name=lang]:checked").val();
	
	$.ajax({
		url : "/admin/organList.do"
		, type : "post"
		, dataType : "json"
		, data : {
			stDate : stDate
			, enDate : enDate
			, name : name
			, useYn : useYn
			, lang : lang
		}
		, success : function(data){
			tabGrid(data);
		}
	})
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
	if( inData.length == 0 ){
		table = new Tabulator("#colTable", {
			layout : "fitColumns"
			, data : inData
			, movableColumns : true
			, columns : [{title : "조회된 데이터가 없습니다.", headerSort:false}]
		});
	} else {
		var transLang = function(cell, formatterParams, onRendered){
			var langCode = cell.getValue();
			var html = "";
			if( langCode == "KOR" ){
				html = "국문";
			} else if( langCode == "ENG" ){
				html = "영문";
			}
			return html;
		}
		
		var transUse = function(cell, formatterParams, onRendered ){
			var useYn = cell.getValue();
			var html = "";
			if( useYn == "Y" ){
				html = "사용";
			} else if( useYn == "N" ){
				html = "미사용";
			}
			return html;
		}
		
		
		//Build Tabulator
			table = new Tabulator("#colTable", {
		    layout:"fitColumns",
			data:inData, 
		    pagination:"local",
		    paginationSize:10,
		    paginationSizeSelector:[10, 20, 30],
		    movableColumns:true
			, rowClick: function(e, row){
				rowClick(e, row);
			}
		    , columns:[
				{title:"boardNo", field:"boardNo", visible:false},
				{title:"boardType", field:"boardType", visible:false},
		        {title:"순번", field:"rowNum", width:80, hozAlign:"center", headerSort : false},
		        {title:"언어", field:"languageType", formatter: transLang, hozAlign:"center", headerSort : false},
		        {title:"부서", field:"codeNm", headerSort : false},
				{title:"이름", field:"organName", hozAlign:"center", headerSort : false},
				{title:"노출순서", field:"locationN", hozAlign:"center", headerSort : false},
				{title:"사용여부", field:"useYn", formatter: transUse, hozAlign:"center", headerSort : false},
		        {title:"등록일", field:"createDate", hozAlign:"center", headerSort : false}
		    ],
		});
	}
}

/* row click function*/
function rowClick( e, row ){
	var boardNo = row._row.data.boardNo;
	var boardType = row._row.data.boardType;
	
	var stDate = $("#stdate").val();
	var enDate = $("#endate").val();
	var name = $("#name").val();
	var useYn = $("input[type=radio][name=useYn]:checked").val();
	var lang = $("input[type=radio][name=lang]:checked").val();
	
	var form = $("<form></form>");
	form.attr("action", "/admin/moveOrganMod.do");
	form.attr("method", "post");
	form.appendTo("body");
	form.append("<input type='hidden' name='boardNo' value='" + boardNo + "'>");
	form.append("<input type='hidden' name='boardType' value='" + boardType + "'>");
	
	form.append("<input type='hidden' name='stDate' value='" + stDate + "'>");
	form.append("<input type='hidden' name='enDate' value='" + enDate + "'>");
	form.append("<input type='hidden' name='name' value='" + name + "'>");
	form.append("<input type='hidden' name='useYn' value='" + useYn + "'>");
	form.append("<input type='hidden' name='lang' value='" + lang + "'>");
	
	form.submit();
}

/* 등록 버튼 */
function moveReg(){
	var regStartDate = $("#stdate").val();
	var regEndDate = $("#endate").val();
	var name = $("#name").val();
	var useYn = $("input[type=radio][name=useYn]:checked").val();
	var lang = $("input[type=radio][name=lang]:checked").val();
	
	var form = $("<form></form>");
	form.attr("action", "/admin/moveOrganReg.do");
	form.attr("method", "post");
	form.append("<input type='hidden' name='regStartDate' value='" + regStartDate + "'>");
	form.append("<input type='hidden' name='regEndDate' value='" + regEndDate + "'>");
	form.append("<input type='hidden' name='name' value='" + name + "'>");
	form.append("<input type='hidden' name='useYn' value='" + useYn + "'>");
	form.append("<input type='hidden' name='lang' value='" + lang + "'>");
	form.appendTo("body");
	form.submit();
}