var oEditors = [];
var boardNo;
var boardType;
var filePath;
var stFileNm;
var ognFileNm;
var fileupdateflag;
var delYn;


$(document).ready(function() {
	popupContent();

	$('#cencelBtn').click(function() {
		if( confirm("변경내용을 저장하지않고 취소하시겠습니까?") ){
			window.location.href = "/admin/pupList.do";
		}
	});

	$('#saveBtn').click(function() {
		if( !confirm("수정하시겠습니까?") ){
			return;
		}
		
		if( oEditors != null && oEditors != "" ){
			oEditors.getById["textt"].exec("UPDATE_CONTENTS_FIELD", []);
		}
		if( $("input:radio[name=chk01]:checked").val() == "IMG" ){
			popupFileUpdate();
		} else {
			UpdatePopup();
		}
	});


	$('#deleteBtn').click(function() {
		if( confirm("삭제하시겠습니까?") ){
			deletePopup();
		}
	});


/*	$("#chk0101").click(function() {
		$("#image").trigger('click')
		$("#text").hide();
		$("#image").show();
		var a = $("input[name='chk01']:checked").val();
	});

	$("#chk0102").click(function() {
		$("#text").trigger('click')
		$("#image").hide();
		editArea();
		var a = $("input[name='chk01']:checked").val();
	});*/

	$("input:radio[name=chk01]").change(function(){
		if( $(this).val() == "TEXT" ){
			$("#text").show();
			$("#image").hide();
			var ed = $("#text").find("iframe");
			if( ed.length < 1 ){
				editArea();
			}
		} else {
			$("#text").hide();
			$("#image").show();
		}
	})

});


// 에디터 영역
function editArea(data) {
	nhn.husky.EZCreator.createInIFrame({
		oAppRef: oEditors,
		elPlaceHolder: "textt",  //textarea ID
		sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
		fOnAppLoad: function() {

			//$('#menuDc-iframe').height(460);
			$("#text").show();

			if (data != null) {
				oEditors.getById["textt"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
			} else {
				oEditors.getById["textt"].exec("PASTE_HTML", [""]); // content 값이  null일 때 'undefinded 안뜨게만들기'
			}

		},
		fCreator: "createSEditor2"
	});
}


//팝업 상세 조회

var aaa;
function popupContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();

	$.ajax({
		type: 'POST'
		, url: '/admin/selectPopup.do'
		, async: false
		, data: {
			"boardNo": boardNo,
			"boardType": boardType
		}

		, dataType: 'json'//xml,json,local 3형식 
		, success: function(data) {

			view();

			// 각화면
			function view() {
				$.each(data, function() {

					if (this["division"] == "TEXT") {
						editArea(data.content);
						$("input:radio[name='chk01']:radio[value='text']").prop('checked', true);
						$("#image").hide();
						$("#text").show();
						fileViewSetting('file1', 'upFile', 1, boardType, boardNo);
						$('input:radio[name=chk01]:checked').val(data[0].division);
						$("#title").val(data[0].title);//제목
						$("#textt").val(data[0].content);//내용
						$("#link").val(data[0].link);	//링크
						$("#stdate").val(data[0].startDt); //노출기간 시작
						$("#endate").val(data[0].endDt); // 노출기간 끝

						var hourSt = (data[0].popupSthour);
						var hourSm = (data[0].popupStminute);
						var hourEst = (data[0].popupEndshour);
						var hourEsm = (data[0].popupEndhour);

						$("#popupSt").html(hourSt);
						$("#popupStHour").val(hourSt).attr("selected", "selected");

						$("#popupSm").html(hourSm);
						$("#popupStMinute").val(hourSm).attr("selected", "selected");

						$("#popupEs").html(hourEst);
						$("#popupEndSHour").val(hourEst).attr("selected", "selected");

						$("#popupEm").html(hourEsm);
						$("#popupEndEHour").val(hourEsm).attr("selected", "selected");

						show();
						location(); // 사용위치
						languageType();// 사용언어
						useYn(); //사용여부
						$("#regist").html("<B>" + data[0].createId + " / " + data[0].updateDate + "</B>");
					} else {
						$("input:radio[name='chk01']:radio[value='IMG']").prop('checked', true);
						$("#image").show();
						$("#text").hide();
						fileViewSetting('file1', 'upFile', 1, boardType, boardNo);
						$("#title").val(data[0].title);//제목
						$("#address").val(data[0].filePath);
						$("#link").val(data[0].link);	//링크
						$("#stdate").val(data[0].startDt); //노출기간 시작
						$("#endate").val(data[0].endDt); // 노출기간 끝

						var hourSt = (data[0].popupSthour);
						var hourSm = (data[0].popupStminute);
						var hourEst = (data[0].popupEndshour);
						var hourEsm = (data[0].popupEndhour);



						$("#popupSt").html(hourSt);
						$("#popupStHour").val(hourSt).attr("selected", "selected");

						$("#popupSm").html(hourSm);
						$("#popupStMinute").val(hourSm).attr("selected", "selected");

						$("#popupEs").html(hourEst);
						$("#popupEndSHour").val(hourEst).attr("selected", "selected");

						$("#popupEm").html(hourEsm);
						$("#popupEndEHour").val(hourEsm).attr("selected", "selected");

						show();
						location(); // 사용위치
						languageType(); // 사용언어
						useYn(); // 사용여부
						$("#regist").html("<B>" + data[0].createId + " / " + data[0].updateDate + "</B>");

					}

				});

			};


			function show() {
				$.each(data, function() {

					if (this["outDiv"] == "Y") {
						$("input:checkbox[name='chk000']").prop("checked", true);
					} else {
						$("input:checkbox[name='chk000']").prop("checked", false);
					}
				});
			};

			// 사용위치
			function location() {
				$.each(data, function() {
					$("input:radio[name=chk02][value=" + this["location"] + "]").prop("checked", true);
					/*if (this["location"] == "left") {
						$("input:radio[name='chk02']:radio[value='left']").prop('checked', true);

					} else if (this["location"] == "center") {
						$("input:radio[name='chk02']:radio[value='center']").prop('checked', true);
					} else {
						$("input:radio[name='chk02']:radio[value='right']").prop('checked', true);
					}*/
				});

			};

			// 사용언어
			function languageType() {
				$.each(data, function() {

					if (this["languageType"] == "KOR") {
						$("input:radio[name='chk03']:radio[value='KOR']").prop('checked', true);

					} else {
						$("input:radio[name='chk03']:radio[value='ENG']").prop('checked', true);
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

		}
	});
}


function popupFileUpdate() {
	var registData = new FormData();
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1', 'upFile', registData, 'update', true, true);

	if (insertChk1 != true) return;


	var filePathArr = [];
	filePathArr[0] = 'upFile';
	registData.append("filePath", filePathArr);

	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();

	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("refIdx", boardNo);
	registData.append("refType", boardType);

	$.ajax({
		type: 'POST'
		, url: '/admin/PopupFileUpdate.do'
		, enctype: 'multipart/form-data'
		, processData: false
		, contentType: false
		, async: false
		, type: 'POST'
		, dataType: 'json'
		, data: registData
		, success: function(data) {
			UpdatePopup();

		}
		, error: function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});


}


function UpdatePopup() {
	if (vaildChk() != false) {
		var registData = new FormData();
		var boardNo = $("#boardNo").val();
		var boardType = $("#boardType").val();
		var content;
		var division = $("input[name='chk01']:checked").val(); //팝업구분
		var title = $("#title").val();
		var userId = $("#sessionUserId").val(); //사용자명  
		if ($("input[name='chk01']:checked").val() == "TEXT") {
			content = $("#textt").val();
		}

		var link = $("#link").val(); // 링크
		var outDiv = $("input[name= 'chk000']:checked").val(); // 상시노출버튼
		var startDt = $("#stdate").val(); // 노출기간 시작 게시일
		var endDt = $("#endate").val(); // 노출기간 종류 게시일
		var location = $("input[name='chk02']:checked").val(); //노출위치
		var languageType = $("input[name='chk03']:checked").val();
		var useYn = $("input[name='chk04']:checked").val();
		var popupStHour = $('#popupStHour').val(); // 게시일 시간
		var popupStMinute = $('#popupStMinute').val(); // 게시일  분
		var popupEndSHour = $('#popupEndSHour').val(); // 게시종료일 시간
		var popupEndEHour = $('#popupEndEHour').val(); // 게시일종료일  분

		registData.append("boardNo", boardNo);
		registData.append("boardType", boardType);
		registData.append("refIdx", boardNo);
		registData.append("division", division);
		registData.append("seqId", "BOARD_SEQ");
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
			, url: '/admin/popupdate.do'
			, enctype: 'multipart/form-data'
			, processData: false
			, contentType: false
			, type: 'POST'
			, dataType: 'json'
			, data: registData
			, success: function(data) {
				if( data > 0 ){
					alert("저장 되었습니다");
					window.location.href = "/admin/pupList.do";
				}
			}
			, error: function(request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});

	}

}

function deletePopup() {
	$('#fileupdateflag').val('Y')
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();

	$.ajax({
		type: 'POST'
		, url: '/admin/popupDelete.do'
		, async: false
		, dataType: 'json'
		, data: {
			"refIdx": boardNo,
			"refType": 'POPUP',
			"boardNo": boardNo,
			"boardType": 'POPUP'

		}
		, success: function(data) {
			alert("정상적으로 삭제 처리 되었습니다");
			window.location.href = "/admin/pupList.do";
		}
		, error: function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});


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
		if (textt == '' || textt == null || textt == "<p>&nbsp;</p>") {
			alert("내용을 입력해주세요");
			$("#textt").focus();
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





/*
//로컬파일 삭제
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






