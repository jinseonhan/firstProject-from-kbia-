
$(document).ready(function() {
	
		$("#chk0102").click(function() {
		$("#text").trigger('click')
		$("#image").hide();
	    $("#text").show();
		editArea();
	 	var a=$("input[name='chk01']:checked").val();
		
	});
	
	 $("#chk0101").click(function() {
		
 		 $("#image").trigger('click')
		 $("#text").hide();
		 $("#image").show();
		var a=$("input[name='chk01']:checked").val();
		
	});
	
	// 에디터영역
function editArea(){
	// 에디터 영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "textt",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	// content 저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["textt"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
}
	
	// 저장버튼
	$('#registBtn').click(function() {
			popregist();
			
		});
		
		$('#cancel').click(function(){
			window.location.href = "/admin/pupList.do";
			
		});
	
		show();
	
	
	$("#chk0000").click(function(){
	if($("input[name= 'chk000']:checked").val() == 'Y'){
	$('.ui-datepicker-trigger').attr('disabled', false);
	$("#stdate").attr("disabled","disabled");
	$("#popupStHour").attr("disabled","disabled");
	$("#popupStMinute").attr("disabled","disabled");
	
	$("#endate").attr("disabled","disabled");
	$("#popupEndSHour").attr("disabled","disabled");
	$("#popupEndEHour").attr("disabled","disabled");
	
	}else{
	$("#chk0000").val("N");
	$("input[name=ho]").attr("disabled",false);
	$("#stdate").removeAttr("disabled");
	$("#popupStHour").removeAttr("disabled");
	$("#popupStMinute").removeAttr("disabled");
	$("#endate").removeAttr("disabled");
	$("#popupEndSHour").removeAttr("disabled");
	$("#popupEndEHour").removeAttr("disabled");
	
	
	}
		
		
	});
	
		
});





//pop등록
function popregist(){
	var content;
	var registData = new FormData();
	var upFile = $("#upfile")[0].files[0];
	var division=$("input[name='chk01']:checked").val(); //팝업구분
	var title = $("#title").val();
	var createId= "관리자";
	if($("input[name='chk01']:checked").val() == "text"){
		content=$("#textt").val();
	}
	if(upFile!=null){
		fileCheck(upFile);
	}
	
    var fileN= $('#fileN').val();
	var link = $("#link").val(); // 링크
	var startDt = $("#stdate").val(); // 노출기간 시작 게시일
	var endDt = $("#endate").val(); // 노출기간 종류 게시일
	var outDiv = $("#chk0000").val(); // 상시노출버튼
	var location = $("input[name='chk02']:checked").val(); //노출위치
	var languageType = $("input[name='chk03']:checked").val();
	var useYn = $("input[name='chk04']:checked").val();
	var popupStHour = $('#popupStHour').val(); // 게시일 시간
	var popupStMinute = $('#popupStMinute').val(); // 게시일  분
	var popupEndSHour = $('#popupEndSHour').val(); // 게시종료일 시간
	var popupEndEHour = $('#popupEndEHour').val(); // 게시일종료일  분
	
	if(title == '' || title == null){
		alert("필수값을 입력해주세요");
		$('#title').focus();
		return;
		
	}
	
	registData.append("upFile", upFile);
	registData.append("seqId", "CONTENT_SEQ");
	registData.append("boardType", "POPUP");
	registData.append("refType", "POPUP");
	registData.append("createId", createId);
	registData.append("division", division);
	registData.append("title", title);
	registData.append("content", content);
	registData.append("outDiv", outDiv);
	registData.append("link", link);
	registData.append("startDt", startDt);
	registData.append("endDt", endDt);
	registData.append("location", location);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	registData.append("popupStHour", popupStHour);
	registData.append("popupStMinute", popupStMinute);
	registData.append("popupEndSHour", popupEndSHour);
	registData.append("popupEndEHour", popupEndEHour);
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/popRegist.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, type: 'POST'
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			alert('data');
		
			window.location.href = "/admin/pupList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
	
	
	
}


function show(){

	if($("input[name= 'chk000']:checked").val() == 'Y'){
	$('.ui-datepicker-trigger').attr('disabled', false);

	$("#stdate").attr("disabled","disabled");
	$("#popupStHour").attr("disabled","disabled");
	$("#popupStMinute").attr("disabled","disabled");
	
	$("#endate").attr("disabled","disabled");
	$("#popupEndSHour").attr("disabled","disabled");
	$("#popupEndEHour").attr("disabled","disabled");
	
}

	
	
};


// 파일 저장 유효성 체크
function fileCheck(obj){
	var pathpoint=obj.name.lastIndexOf('.');
	var filepoint =obj.name.substring(pathpoint+1,obj.length);
	console.log(filepoint);
	console.log(pathpoint);
	var filetype=filepoint.toLowerCase();
	if(filetype=='jpg'||filetype=='gif'||filetype=='png'||filetype=='jpeg'||filetype=='bmp'){
		return true;
	}else{
		alert('이미지 파일만 선택할 수 있습니다.');
		var parentObj =obj.parentNode;
		var node=parentObj.replaceChild(obj.cloneNode(true),obj);
		return false;	
	}
	
	if(filetype=='bmp'){
		var upload=confirm('BMP 파일은 웹상에서 사용하기엔 적절한 이미지 포맷이 아닙니다.\n 그래도 계속 업로드하시겠습니까?');
		if(!upload)
		return false;
	}
}







