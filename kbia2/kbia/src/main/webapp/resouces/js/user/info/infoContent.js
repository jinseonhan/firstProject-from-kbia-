$(document).ready(function() {
	
	infoContent();
	
});

//공지사항 상세 조회
function infoContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/user/briefList.do'

		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType		
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			$("#title").html(data[0].title);
			$("#createDate").html(data[0].createDate);
			$("#content").html(data[0].content);
			
			if(data[0].bfBoardNo != "" && data[0].bfBoardNo != null){
				var boardNo = data[0].bfBoardNo;
				var boardType = data[0].bfBoardType;
				$("#beforeBoard").attr("href", "/openDetail.do?boardNo="+boardNo+"&boardType="+boardType);
				if(data[0].bfTitle != "" && data[0].bfTitle != null) $("#beforeTitle").html(data[0].bfTitle);
				else $("#beforeTitle").html("이전글이 없습니다.");
			}	
			if(data[0].ntBoardNo != "" && data[0].ntBoardNo != null){
				var boardNo = data[0].ntBoardNo;
				var boardType = data[0].ntBoardType;
				$("#nextBoard").attr("href", "/openDetail.do?boardNo="+boardNo+"&boardType="+boardType);
				if(data[0].bfTitle != "" && data[0].bfTitle != null) $("#nextTtile").html(data[0].ntTitle);
				else $("#nextTtile").html("다음글이 없습니다.");
				$
			}	
		}
	});
}

