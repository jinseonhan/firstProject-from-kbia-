var oEditors = [];
var endday;
$(document).ready(function() {
	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file1','upFile', 1);
	fileViewSetting('file2','upMfile', 1);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;


    var e= new Date();
    var endyear = e.getFullYear()+1;
	var endmonth = ("0"+(e.getMonth()+1)).slice(-2);
	var endday = ("0"+e.getDate()).slice(-2);
	var eday = endyear + '-' + endmonth + '-' + endday ;
	



	$("#stdate").val(today);
	$("#endate").val(eday);
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "text",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	
	// 저장버튼
	$('#registBtn').click(function() {
		if( !confirm("저장하시겠습니까?") ){
			return;
		}
		
		var useYn = $("input[name='chk04']:checked").val();
		if(useYn == "N"){
			oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
			mbannerregist();
			
		}else{
		oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		check();
		}
		
	});
		
	$('#cancel').click(function(){
		window.location.href = "/admin/MbannerList.do";
			
	});
	
	show();
	
	
	$("#chk0000").click(function(){
		if($("input[name= 'chk000']:checked").val() == 'Y'){
			$("#stdate").attr("disabled","disabled");
			$("#mBannerStHour").attr("disabled","disabled");
			$("#mBannerStMinute").attr("disabled","disabled");
			
			$("#endate").attr("disabled","disabled");
			$("#mBannerEndHour").attr("disabled","disabled");
			$("#mBannerEndMinute").attr("disabled","disabled");
		
		}else{
			$("#chk000").val("N");
			$("#stdate").removeAttr("disabled");
			$("#mBannerStHour").removeAttr("disabled");
			$("#mBannerStMinute").removeAttr("disabled");
			$("#endate").removeAttr("disabled");
			$("#mBannerEndHour").removeAttr("disabled");
			$("#mBannerEndMinute").removeAttr("disabled");
	
		}
			
	});		
	

});

//메인배너 등록
function mbannerregist(){
	
	if(vaildChk()!=false){
	var registData = new FormData();
	var title = $("#title").val();
	var userId = $("#sessionUserId").val(); //사용자명 
	var	content=$("#text").val();
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
	
	
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1','upFile', registData,'insert', true, true);
	if(insertChk1 != true ) return;
	var insertChk2 = fileParamSetting('file2','upMfile', registData,'insert', true, true);
	if(insertChk2 != true ) return;
	registData.append("seqId", "CONTENT_SEQ");
	registData.append("boardType", "MAIN");
	registData.append("refType", "MAIN");
	registData.append("createId", userId);
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
		, async: false
		, type: 'POST'
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			alert("저장 되었습니다");
			window.location.href = "/admin/MbannerList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
  }
}

function show(){

	if($("input[name= 'chk000']:checked").val() == 'Y'){
	$("#stdate").attr("disabled","disabled");
	$("#mBannerStHour").attr("disabled","disabled");
	$("#mBannerStMinute").attr("disabled","disabled");
	
	$("#endate").attr("disabled","disabled");
	$("#mBannerEndHour").attr("disabled","disabled");
	$("#mBannerEndMinute").attr("disabled","disabled");
	
}

	
};

//메인베너 노출순서 중복체그
function check(){
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0,1);
	
	if( locationN == null || locationN == "" ){
		alert("노출순서를 선택해주세요.");
		return;
	}
	
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
			if(data > 0 ){
				alert("노출순서가 중복되었습니다");
				//window.location.href = "/admin/MbannerList.do";
			}else{
				mbannerregist();
			}
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}


function vaildChk(){
	var text = $("#text").val();
	var title = $("#title").val();
	
	var c = $(text).find("p").prevObject;
	var chkEmpty = /\s/g;
	var flag = false;
	for( var i = 0; i < c.length; i++ ){
		var html = c.eq(i).html();
		html = html.replace(/\s/g, "");
		html = html.replace(/\&nbsp;/g, "");
		if( html != null && html != "" ){			
			flag = true;
			break;
		}
	}
	
	if( !flag ){
		alert("내용을 입력해주세요.");
		$("#industryContent").focus();
		return false;
	}
	if(title == '' || title == null){
		alert("제목을 입력해주세요");
		$("#title").focus();
		return false;
	}
	
	if(!maxLengthCheck("title", '제목' ,100)){
		return false;
	}

}
