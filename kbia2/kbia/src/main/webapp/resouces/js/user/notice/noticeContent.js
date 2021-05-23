$(document).ready(function() {

	viewContent();
});

//공지사항 상세 조회
function viewContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var createDate = $("#createDate").val();
	var kinds = $("#kinds").val();
	var searchTxt = $("#searchTxt").val();

	var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var date = now.getDate();
	var time = now.getHours();
	var min = now.getMinutes();
	
    month = month >=10 ? month : "0" + month;
    date  = date  >= 10 ? date : "0" + date;
	time = time >=10 ? time : "0" + time;
    min  = min  >= 10 ? min : "0" + min;

    var today = year + month + date + time + min + "00";

	$.ajax({
		type : 'POST'
		, url : '/user/noticeContent.do'
 		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType	,	
			"createDate" : createDate,
			"kinds" : kinds	,
			"searchTxt" : searchTxt,
			"noticeDate" : today
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			$("#title").html(data.title);
			$("#content").html(data.content);
			if(data.bfBoardNo != "" && data.bfBoardNo != null){
				var boardNo = data.bfBoardNo;
				var boardType = data.bfBoardType;
				var orgBfCreateDate = data.orgBfCreateDate;
				
				$("#beforeBoard").attr("onclick", "pageChange('"+boardNo+"','"+boardType+"','"+orgBfCreateDate+"','"+kinds+"','"+searchTxt+"');");
				if(data.bfTitle != "" && data.bfTitle != null) $("#beforeTitle").html(data.bfTitle);
				else $("#beforeTitle").html("이전글이 없습니다.");
			}	
			if(data.ntBoardNo != "" && data.ntBoardNo != null){
				var boardNo = data.ntBoardNo;
				var boardType = data.ntBoardType;
				var orgNtCreateDate = data.orgNtCreateDate;
				
				$("#nextBoard").attr("onclick", "pageChange('"+boardNo+"','"+boardType+"','"+orgBfCreateDate+"','"+kinds+"','"+searchTxt+"');");
				if(data.ntTitle != "" && data.ntTitle != null) $("#nextTtile").html(data.ntTitle);
				else $("#nextTtile").html("다음글이 없습니다.");
			}	
			fileContent();
		}
	});
}
//페이지 이동(이전, 다음)
function pageChange(boardNo,boardType,orgBfCreateDate,kinds,searchTxt){
	var form = $('<form></form>');
	    form.attr('action', '/openViewContent.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    var boardTypeF = $("<input type='hidden' value="+boardType+" name='boardType'>");
		var createDateF = $("<input type='hidden' value="+orgBfCreateDate+" name='createDate'>");
		var kindsF = $("<input type='hidden' value="+kinds+" name='kinds'>");
		var searchTxtF = $("<input type='hidden' value="+searchTxt+" name='searchTxt'>");
	    form.append(boardNoF);
	    form.append(boardTypeF);
	    form.append(createDateF);
		form.append(kindsF);
	    form.append(searchTxtF);
	    form.submit();
}
//파일다운로드
function fileDown(refIdx,refType,idx){
	var form = $('<form></form>');
	    form.attr('action', '/noticeFileDown.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var refIdxF = $("<input type='hidden' value="+refIdx+" name='refIdx'>");
	    var refTypeF = $("<input type='hidden' value="+refType+" name='refType'>");
		var idxF = $("<input type='hidden' value="+idx+" name='idx'>");
	    form.append(refIdxF);
	    form.append(refTypeF);
	    form.append(idxF);
	    form.submit();
}
//파일 상세 조회
function fileContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/user/noticeFile.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType		
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			var html="";
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					//html += "<a class='btnFile' href='/noticeFileDown.do?refIdx="+boardNo+"&refType="+boardType+"&idx="+data[i].idx+"'>"+data[i].ognFileNm+"</a>";
					html += "<a class='btnFile' id='btnFile"+[i]+"' onclick=\"fileDown(\'"+boardNo+"','"+boardType+"','"+data[i].idx+"');\">"+data[i].ognFileNm+"</a>";
					$("#fileArea").html(html);
					//$("#btnFile"+i).attr("onclick", "fileDown('"+boardNo+"','"+boardType+"','"+data[i].idx+"');");
				}			
			}else{
				$("#fileArea").css("display","none");
			}
		}
	});
}

