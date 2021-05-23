var oEditors = [];
var useYn;
$(document).ready(function() {

	selectMbanner();

	$('#cencelBtn').click(function() {
		window.location.href = "/admin/MbannerList.do";
	});

	var A = "A";
	$("input[name='chk04']").change(function() {
		A = $("input[name='chk04']:checked").val();
		if (A == "Y") {
			A = "A";
		} else if (A == "N") {
			A = "X";
		}
	});

	$('#saveBtn').click(function() {
		if( !confirm("수정사항을 저장하시겠습니까?") ){
			return;
		}
		if (A == "A") {
			oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
			check();
		} else if (A == "M") {
			oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
			upcheck();
		} else if (A == "X") {
			oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
			UpdateMbanner();
		} else {

			return;
		}
	});

	$('#deleteBtn').click(function() {
		if( confirm("삭제하시겠습니까?") ){
			deleteMbanner();
		}
	});


	$("#chk0000").click(function() {
		if ($("input[name= 'chk000']:checked").val() == 'Y') {
			$("#stdate").attr("disabled", "disabled");
			$("#mBannerStHour").attr("disabled", "disabled");
			$("#mBannerStMinute").attr("disabled", "disabled");
			$("#endate").attr("disabled", "disabled");
			$("#mBannerEndHour").attr("disabled", "disabled");
			$("#mBannerEndMinute").attr("disabled", "disabled");
		} else {
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

// 에디터 영역
function editArea(data) {
	nhn.husky.EZCreator.createInIFrame({
		oAppRef: oEditors,
		elPlaceHolder: "text",  //textarea ID
		sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
		fOnAppLoad: function() {
			if (data != null) {
				oEditors.getById["text"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
			} else {
				oEditors.getById["text"].exec("PASTE_HTML", [""]); // content 값이  null일 때 'undefinded 안뜨게만들기'
			}
		},
		fCreator: "createSEditor2"
	});
}


//메인베너 상세 조회

function selectMbanner() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();

	$.ajax({
		type: 'POST'
		, url: '/admin/selectMbanner.do'
		, async: false
		, data: {
			"boardNo": boardNo,
			"boardType": boardType
		}
		, dataType: 'json'//xml,json,local 3형식 
		, success: function(data) {
			editArea(data.content);
			fileViewSetting('file1', 'upFile', 1, boardType, boardNo);
			fileViewSetting('file2', 'upMfile', 1, boardType, boardNo);
			view();

			// 각화면
			function view() {
				$.each(data, function() {
					$("#text").val(data[0].content);//내용
					$("#title").val(data[0].title);//제목
					$("#fileN").val(data[0].filePath); // 웹 첨부파일명
					$("#fileMN").val(data[0].filePath); //모바일 첨부파일명
					$("#link").val(data[0].link);	//링크
					$("#stdate").val(data[0].startDt); //노출기간 시작
					$("#endate").val(data[0].endDt); // 노출기간 끝

					var hourSt = (data[0].mBannerStHour);
					var hourSm = (data[0].mBannerStMinute);
					var hourEst = (data[0].mBannerEndHour);
					var hourEsm = (data[0].mBannerEndMinute);

					$("#MbannerSt").html(hourSt);
					$("#mBannerStHour").val(hourSt).attr("selected", "selected");

					$("#MbannerSm").html(hourSm);
					$("#mBannerStMinute").val(hourSm).attr("selected", "selected");

					$("#MbannerEs").html(hourEst);
					$("#mBannerEndHour").val(hourEst).attr("selected", "selected");

					$("#MbannerEm").html(hourEsm);
					$("#mBannerEndMinute").val(hourEsm).attr("selected", "selected");

					outDivb(); // 상시노출

					//노출순서
					var locationN = (data[0].locationN + "번");
					$("#locationN").html(locationN);
					$("#locationNo").val(locationN).attr("selected", "selected");
					languageType(); // 사용언어

					useYn(); // 사용여부
					$("#regist").html("<B>" + data[0].createId + " / " + data[0].updateDate + "</B>");

				});
			};

			//상시노출 
			function outDivb() {
				$.each(data, function() {
					if (this["outDiv"] == "Y") {
						$("input:checkbox[name='chk000']").prop("checked", true);
					} else {
						$("input:checkbox[name='chk000']").prop("checked", false);
					}
				});
			};

			// 사용언어
			function languageType() {
				$.each(data, function() {
					if (this["languageType"] == "kor") {
						$("input:radio[name='chk03']:radio[value='kor']").prop('checked', true);
					} else {
						$("input:radio[name='chk03']:radio[value='eng']").prop('checked', true);
					}
				});
			};
			//사용여부

			function useYn() {
				$.each(data, function() {
					if (this["useYn"] == "Y") {
						$("input:radio[name='chk04']:radio[value='Y']").prop('checked', true);
					} else {
						$("input:radio[name='chk04']:radio[value='N']").prop('checked', true);
					}
				});
			};
		}//end success
	});
}


/*
//파일삭제
function filedelete(){
	$.ajax({
		type : 'POST'
		, url : '/admin/popupFiledel.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType,
			"filePath" : filePath,
			"stFileNm" : stFileNm
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			console.log(data);
		}
	});	
}
*/


function UpdateMbanner() {

	if (vaildChk() != false) {
		var registData = new FormData();

		var boardNo = $("#boardNo").val();
		var delYn = $('#delYn').val();
		var boardType = $("#boardType").val();
		var fileupdateflag = $("#fileupdateflag").val();
		var content = $("#text").val();
		var division = $("input[name='chk01']:checked").val(); //팝업구분
		var title = $("#title").val();
		var userId = $("#sessionUserId").val(); //사용자명 
		var link = $("#link").val(); // 링크
		var outDiv = $("input[name= 'chk000']:checked").val(); // 상시노출버튼
		var startDt = $("#stdate").val(); // 노출기간 시작 게시일
		var endDt = $("#endate").val(); // 노출기간 종류 게시일
		var locationNN = $('#locationNo').val(); // 노출순서
		var languageType = $("input[name='chk03']:checked").val();
		var useYn = $("input[name='chk04']:checked").val();
		var mBannerStHour = $('#mBannerStHour').val(); // 게시일 시간
		var mBannerStMinute = $('#mBannerStMinute').val(); // 게시일  분
		var mBannerEndHour = $('#mBannerEndHour').val(); // 게시종료일 시간
		var mBannerEndMinute = $('#mBannerEndMinute').val(); // 게시일종료일  분
		var locationN = locationNN.substring(0, 1);
		registData.append("boardNo", boardNo);
		registData.append("boardType", boardType);
		registData.append("division", division);
		registData.append("boardType", "MAIN");
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
			type: 'POST'
			, url: '/admin/Mbannerupdate.do'
			, enctype: 'multipart/form-data'
			, processData: false
			, contentType: false
			, async: false
			, type: 'POST'
			, dataType: 'json'
			, data: registData
			, success: function(data) {
				alert("저장 되었습니다");
				window.location.href = "/admin/MbannerList.do";
			}
			, error: function(request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}
}

function bannerFileUpdate() {
	var registData = new FormData();
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1', 'upFile', registData, 'update', true, true);

	if (insertChk1 != true) return;

	var insertChk2 = fileParamSetting('file2', 'upMfile', registData, 'update', true, true);
	if (insertChk2 != true) return;

	var filePathArr = [];
	filePathArr[0] = 'upFile';
	filePathArr[1] = 'upMfile';
	registData.append("filePath", filePathArr);

	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();

	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("refIdx", boardNo);
	registData.append("refType", boardType);

	$.ajax({
		type: 'POST'
		, url: '/admin/bannerFileUpdate.do'
		, enctype: 'multipart/form-data'
		, processData: false
		, contentType: false
		, async: false
		, type: 'POST'
		, dataType: 'json'
		, data: registData
		, success: function(data) {
			//UpdateMbanner();
		}
		, error: function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
}

function deleteMbanner() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();

	$.ajax({
		type: 'POST'
		, url: '/admin/MbannerDelete.do'
		, async: false
		, dataType: 'json'
		, data: {
			"refIdx": boardNo,
			"refType": 'MAIN',
			"boardNo": boardNo,
			"boardType": 'MAIN'

		}
		, success: function(data) {
			alert("정상적으로 삭제 처리 되었습니다");
			window.location.href = "/admin/MbannerList.do";
		}
		, error: function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
}


function check() {
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0, 1);
	var boardType = $("#boardType").val();
	var boardNo = $("#boardNo").val();
	registData.append("locationN", locationN);
	registData.append("boardType", boardType);
	registData.append("boardNo", boardNo);
	$.ajax({
		type: 'POST'
		, url: '/admin/selectCheck.do'
		, type: 'POST'
		, processData: false
		, contentType: false
		, dataType: 'json'
		, data: registData
		, success: function(data) {

			var outVal = "F";

			for( var i = 0; i < data.length; i++ ){
				if( data[i].useYn == "Y" ){
					if( data[i].locationN == locationN ){
						outVal = "T";
						break;
					}
				}
			}

			/*$.each(data, function() {
				if (this["locationN"] == locationN && this["useYn"] == "Y") {
					alert("여기");
					outVal = "T"; 
					return;
				}
			});*/
			
			if (outVal == "T") {
				alert("노출순서가 중복되었습니다");
			} else {
				bannerFileUpdate();
				UpdateMbanner();
			}
		}
		, error: function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
}


//메인베너 노출순서 중복체그
function upcheck() {
	var registData = new FormData();
	var locationNN = $('#locationNo').val();
	var locationN = locationNN.substring(0, 1);
	registData.append("locationN", locationN);
	$.ajax({
		type: 'POST'
		, url: '/admin/Mbannercheck.do'
		, type: 'POST'
		, processData: false
		, contentType: false
		, dataType: 'json'

		, data: registData
		, success: function(data) {

			if (data > 0) {
				alert("노출순서가 중복되었습니다");
			} else {
				UpdateMbanner();
			}

		}
		, error: function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});


}


function vaildChk() {
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
	if (title == '' || title == null) {
		alert("제목을 입력해주세요");
		$("#title").focus();
		return false;
	}

	if (!maxLengthCheck("title", '제목', 100)) {
		return false;
	}

}


