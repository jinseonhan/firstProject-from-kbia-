var oEditors = [];
$(document).ready(function() {
	
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "text",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	
	// 저장버튼
	$('#registBtn').click(function() {
		oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		check();
	});
		
	$('#cancel').click(function(){
		window.location.href = "/admin/MbannerList.do";
			
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


//메인배너 등록
function mbannerregist(){
	var registData = new FormData();
	var upFile = $("#upfile")[0].files[0]; // 웹이미지
	var upMfile = $('#upMfile')[0].files[0]; //
	var title = $("#title").val();
	var createId= "관리자";
	var	content=$("#text").val();
    var fileN= $('#fileN').val(); // 웹 첨부파일명
	var fileMn = $('#fileMN').val(); // 모바일 첨부파일명
	var link = $("#link").val(); // 링크
	var startDt = $("#stdate").val(); // 노출기간 시작 게시일
	var endDt = $("#endate").val(); // 노출기간 종류 게시일
	var outDiv = $("#chk0000").val(); // 상시노출버튼
	var locationNN = $('#locationNo').val(); // 노출순서
	var languageType = $("input[name='chk03']:checked").val();
	var useYn = $("input[name='chk04']:checked").val();
	var mBannerStHour = $('#mBannerStHour').val(); // 게시일 시간
	var mBannerStMinute = $('#mBannerStMinute').val(); // 게시일  분
	var mBannerEndHour = $('#mBannerEndHour').val(); // 게시종료일 시간
	var mBannerEndMinute = $('#mBannerEndMinute').val(); // 게시일종료일  분
	var locationN = locationNN.substring(0,1);
	
	if(title == '' || title == null){
		alert("필수값을 입력해주세요");
		$('#title').focus();
		return ;
		
	}
	
	registData.append("upFile", upFile);
	registData.append("upMfile", upMfile);
	registData.append("seqId", "CONTENT_SEQ");
	registData.append("boardType", "MAIN");
	registData.append("refType", "MAIN");
	registData.append("createId", createId);
	registData.append("title", title);
	registData.append("content", content);
	registData.append("outDiv", outDiv);
	registData.append("link", link);
	registData.append("startDt", startDt);
	registData.append("endDt", endDt);
	registData.append("locationN", locationN);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	registData.append("mBannerStHour", mBannerStHour);
	registData.append("mBannerStMinute", mBannerStMinute);
	registData.append("mBannerEndHour", mBannerEndHour);
	registData.append("mBannerEndMinute", mBannerEndMinute);
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/MbannerRegist.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, type: 'POST'
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
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

//메인베너 노출순서 중복체그
function check(){
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0,1);
	registData.append("locationN", locationN);
	$.ajax({
		type : 'POST'
		, url : '/admin/Mbannercheck.do'
		, type: 'POST'
		, processData: false 
		, contentType: false 
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			if(data > 0){
				alert("노출순서가 중복되었습니다");
				window.location.href = "/admin/MbannerList.do";
			}else{
				mbannerregist();
				window.location.href = "/admin/MbannerList.do";
			}
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}


	






