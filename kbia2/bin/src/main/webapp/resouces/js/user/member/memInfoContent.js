$(document).ready(function() {
	
	memInfoContent();
	
});

//공지사항 상세 조회
function memInfoContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var createDate = $("#createDate").val();
	var kinds = $("#kinds").val();
	var searchTxt = $("#searchTxt").val();
	var division = $("#division").val();
	console.log(division);
	console.log(createDate);
	$.ajax({
		type : 'POST'
		, url : '/user/memInfoContent.do'
		, async : false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType	,	
			"createDate" : createDate,
			"kinds" : kinds	,
			"searchTxt" : searchTxt,
			"division" : division		
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			$("#comNm").html(data.comNm);
			$("#sectors").html(data.sectors);
			$("#comRepreNm").html(data.comRepreNm);
			$("#estYear").html(data.estYear);
			$("#comEmplCnt").html(data.comEmplCnt);
			$("#comRepreNum").html(data.comRepreNum);
			$("#fax").html(data.fax);
			$("#homepage").html(data.homepage);
			$("#content").html(data.content);
			$("#division").html(data.division);
			console.log(data);
			
			if(data.bfBoardNo != "" && data.bfBoardNo != null){
				var boardNo = data.bfBoardNo;
				var boardType = data.bfBoardType;
				var orgBfCreateDate = data.orgBfCreateDate;
				var division = data.division;
				$("#beforeBoard").attr("onclick", "pageChange('"+boardNo+"','"+boardType+"','"+orgBfCreateDate+"','"+kinds+"','"+searchTxt+"','"+division+"');");
				if(data.bfTitle != "" && data.bfTitle != null) $("#beforeTitle").html(data.bfTitle);
				else $("#beforeTitle").html("이전글이 없습니다.");
			}	
			if(data.ntBoardNo != "" && data.ntBoardNo != null){
				var boardNo = data.ntBoardNo;
				var boardType = data.ntBoardType;
				var orgNtCreateDate = data.orgNtCreateDate;
				var division = data.division;
				$("#nextBoard").attr("onclick", "pageChange('"+boardNo+"','"+boardType+"','"+orgBfCreateDate+"','"+kinds+"','"+searchTxt+"','"+division+"');");
				if(data.ntTitle != "" && data.ntTitle != null) $("#nextTtile").html(data.ntTitle);
				else $("#nextTtile").html("다음글이 없습니다.");
			}	
			
		}
	});
}
//페이지 이동(이전, 다음)
function pageChange(boardNo,boardType,orgBfCreateDate,kinds,searchTxt,division){
	var form = $('<form></form>');
	    form.attr('action', '/openMemInfoContent.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		var createDateF = $("<input type='hidden' value="+orgBfCreateDate+" name='createDate'>");
		var kindsF = $("<input type='hidden' value="+kinds+" name='kinds'>");
		var searchTxtF = $("<input type='hidden' value="+searchTxt+" name='searchTxt'>");
		var divisionF = $("<input type='hidden' value="+division+" name='division'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.append(createDateF);
		form.append(kindsF);
	    form.append(searchTxtF);
		form.append(divisionF);
	    form.submit();
}



