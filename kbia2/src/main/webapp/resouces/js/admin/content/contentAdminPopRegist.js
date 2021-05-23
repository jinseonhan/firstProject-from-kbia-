var endday;
$(document).ready(function() {

	editArea();
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0" + (d.getMonth() + 1)).slice(-2);
	var day = ("0" + d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day;

	var e = new Date();
	var endyear = e.getFullYear() + 1;
	var endmonth = ("0" + (e.getMonth() + 1)).slice(-2);
	var endday = ("0" + e.getDate()).slice(-2);
	var eday = endyear + '-' + endmonth + '-' + endday;

	$("#stdate").val(today);
	$("#endate").val(eday);


	$("#chk0102").click(function() {
		$("#text").trigger('click')
		$("#image").hide();
		$("#text").show();
		var a = $("input[name='chk01']:checked").val();
	});

	$("#chk0101").click(function() {
		fileViewSetting('file1', 'upFile', 1);
		$("#image").trigger('click')
		$("#text").hide();
		$("#image").show();
		var a = $("input[name='chk01']:checked").val();
	});

	// 에디터영역
	function editArea() {
		// 에디터 영역
		var oEditors = [];
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "textt",  //textarea ID
			sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
			fCreator: "createSEditor2",
		});
		// content 저장버튼
		$("#registBtn").click(function() {
			oEditors.getById["textt"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
			//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
		});
	}

	// 저장버튼
	$('#registBtn').click(function() {
		if( confirm("팝업을 등록하시겠습니까?") ){
			popregist();
		}

	});

	$('#cancel').click(function() {
		if( confirm("등록하지 않고 취소하시겠습니까?") ){
			window.location.href = "/admin/pupList.do";
		}

	});

	show();

	$("#chk0000").click(function() {
		if ($("input[name= 'chk000']:checked").val() == 'Y') {
			$('.ui-datepicker-trigger').attr('disabled', false);
			$("#stdate").attr("disabled", "disabled");
			$("#popupStHour").attr("disabled", "disabled");
			$("#popupStMinute").attr("disabled", "disabled");

			$("#endate").attr("disabled", "disabled");
			$("#popupEndSHour").attr("disabled", "disabled");
			$("#popupEndEHour").attr("disabled", "disabled");

		} else {
			$("#chk0000").val("N");
			$("input[name=ho]").attr("disabled", false);
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
function popregist() {
	if (vaildChk() != false) {
		var registData = new FormData();
		var content;
		var insertChk1 = true;
		var division = $("input[name='chk01']:checked").val(); //팝업구분
		var title = $("#title").val();
		var userId = $("#sessionUserId").val(); //사용자명 
		if ($("input[name='chk01']:checked").val() == "TEXT") {
			content = $("#textt").val();
		} else {
			insertChk1 = fileParamSetting('file1', 'upFile', registData, 'insert', true, true);
		}
		
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
		
		if (insertChk1 != true) return;
		registData.append("seqId", "CONTENT_SEQ");
		registData.append("boardType", "POPUP");
		registData.append("refType", "POPUP");
		registData.append("createId", userId);
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
			type: 'POST'
			, url: '/admin/popRegist.do'
			, enctype: 'multipart/form-data'
			, processData: false
			, contentType: false
			, type: 'POST'
			, dataType: 'json'
			, data: registData
			, success: function(data) {
				alert("저장 되었습니다");
				window.location.href = "/admin/pupList.do";
			}
			, error: function(request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});

	}

}


function show() {

	if ($("input[name= 'chk000']:checked").val() == 'Y') {
		$('.ui-datepicker-trigger').attr('disabled', false);

		$("#stdate").attr("disabled", "disabled");
		$("#popupStHour").attr("disabled", "disabled");
		$("#popupStMinute").attr("disabled", "disabled");

		$("#endate").attr("disabled", "disabled");
		$("#popupEndSHour").attr("disabled", "disabled");
		$("#popupEndEHour").attr("disabled", "disabled");

	}



};


// 파일 저장 유효성 체크
function fileCheck(obj) {
	var pathpoint = obj.name.lastIndexOf('.');
	var filepoint = obj.name.substring(pathpoint + 1, obj.length);
	var filetype = filepoint.toLowerCase();
	if (filetype == 'jpg' || filetype == 'gif' || filetype == 'png' || filetype == 'jpeg' || filetype == 'bmp') {
		return true;
	} else {
		alert('이미지 파일만 선택할 수 있습니다.');
		var parentObj = obj.parentNode;
		var node = parentObj.replaceChild(obj.cloneNode(true), obj);
		return false;
	}

	if (filetype == 'bmp') {
		var upload = confirm('BMP 파일은 웹상에서 사용하기엔 적절한 이미지 포맷이 아닙니다.\n 그래도 계속 업로드하시겠습니까?');
		if (!upload)
			return false;
	}
}

function vaildChk() {
	var textt = $("#textt").val();
	var title = $("#title").val();
	var upfile = $("#upfile").val();

	if ($("input[name='chk01']:checked").val() == "IMG") {
		if (title == '' || title == null) {
			alert("제목을 입력해주세요");
			$("#title").focus();
			return false;
		}

		if (!maxLengthCheck("title", '제목', 100)) {
			return false;
		}

	} else {
		var c = $(textt).find("p").prevObject;
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
		if (title == '' || title == null) {
			alert("제목을 입력해주세요");
			$("#title").focus();
			return false;
		}

		if (!maxLengthCheck("title", '제목', 100)) {
			return false;
		}

	}

}





