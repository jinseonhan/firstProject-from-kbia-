// 실행 메소드
$(document).ready(function(){
	selectmemberlist();
	// "검색" 버튼 이벤트
	$(document).on("click","#search",function() {
		selectmemberlist();
	});

});


// 리스트 조회하기
function selectmemberlist(){
	var registData = new FormData();
	var startDate = $('#startDate').val(); // 시작 날짜
	var endDate = $('#endDate').val();	// 마지막 날짜
	var comNm=$('#comNm').val(); // 회사명
	var division =$('input[name=chk01]:checked').val();	// 구분(일반회원/준회원/특별회원/임원)
	var useYn =$('input[name=chk02]:checked').val();	// 사용여부
	var languageType =$('input[name=chk03]:checked').val();	// 언어
	
	// "전체" 선택시 value값을 on으로 만들어 ""값 반환
	if(division=='on'){
		division="";
	}
	if(useYn=='on'){
		useYn="";
	}
	if(languageType=='on'){
		languageType="";
	}
	
	registData.append("startDate", startDate);
	registData.append("endDate", endDate);
	registData.append("division", division);
	registData.append("comNm", comNm);
	registData.append("useYn", useYn);
	registData.append("languageType", languageType);
	
	console.log(startDate);
	console.log(endDate);
	console.log(division);
	console.log(comNm);
	console.log(useYn);
	console.log(languageType);
	
	$.ajax({
		type :"POST",
		url : "/admin/selectmemberList.do",
		processData: false, /* 필수 */ 
		data : registData,
		async: false,
		contentType: false,
		dataType : 'json',
		success : function(data){
					
					tabGrid(data);
					
				},
				error:function(request,status,error){
					alert("code : "+request.status+"\n"
							+"message : "+request.responseText+"\n"
							+"error : "+ error);
				}
	});
		
};

var table;
function tabGrid(inData) {
	//Build Tabulator
		table = new Tabulator("#colTable", {
	    layout:"fitColumns",
		data:inData, 
	    pagination:"local",
	    paginationSize:10,
	    //paginationSizeSelector:[10, 20, 30],
	    movableColumns:true,
		rowClick:function(e, row){
	    	rowClick(e, row);
	    },
	    columns:[
			{title:"글번호", field:"boardNo", visible:false},
	        {title:"순번", field:"rowNum", width:70, hozAlign:"center"},
	        {title:"언어", field:"languageType", hozAlign:"center"},
	        {title:"회원구분", field:"division", hozAlign:"center"},
	        {title:"회사명", field:"comNm", hozAlign:"center"},
			{title:"사용여부", field:"useYn", hozAlign:"center"},
			{title:"작성자", field:"createId", hozAlign:"center"},
	        {title:"등록일", field:"createDate", hozAlign:"center"}	        
	    ],
	});
	
	function rowClick(e, row){	
		var boardNo = row._row.data.boardNo;

		var form = $('<form></form>');
	    form.attr('action', '/admin/memberAdminRevise.do');
	    form.attr('method', 'post');
	    form.appendTo('body');
	    var boardNoF = $("<input type='hidden' value="+boardNo+" name='boardNo'>");
	    form.append(boardNoF);
		
	    
	   form.submit();
	}
}