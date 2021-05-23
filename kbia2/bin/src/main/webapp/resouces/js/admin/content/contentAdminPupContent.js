var boardNo;
var boardType;
var filePath;
var stFileNm;
var ognFileNm;
var fileupdateflag;
var delYn;


$(document).ready(function() {
	
	popupContent();
	$('#cencelBtn').click(function(){
		
	window.location.href = "/admin/pupList.do";
	});
	
		$('#saveBtn').click(function(){
		editArea();
		UpdatePopup();
	});
	
	
	   $('#deleteBtn').click(function(){
			deletePopup();
		
	});
	
		$("#chk0102").click(function() {
		$("#text").trigger('click')
		$("#image").hide();
		$("#text").show();
		var a=$("input[name='chk01']:checked").val();
		
	});
	
	 $("#chk0101").click(function() {
		
		 $("#image").trigger('click')
		 $("#text").hide();
		 $("#image").show();
		 var a=$("input[name='chk01']:checked").val();
		
	});
});



// 에디터 영역
function editArea(data){
	var oEditors = [];
		nhn.husky.EZCreator.createInIFrame({
		    oAppRef: oEditors,
		    elPlaceHolder: "textt",  //textarea ID
		    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
			fOnAppLoad: function(){
				if(data !=null){
					oEditors.getById["content"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
				}else{
					oEditors.getById["content"].exec("PASTE_HTML", [""]); // content 값이  null일 때 'undefinded 안뜨게만들기'
				}
			},
		    fCreator: "createSEditor2"
		});
// content 저장버튼
	$("#saveBtn").click(function(){
		oEditors.getById["textt"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["batteryContent"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
}




//팝업 상세 조회

var aaa;
function popupContent() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectPopup.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType		
		}
		
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			console.log(data);
		    editArea(data.content);
			fiflelist();			
			view();
			
			// 각화면
			function view(){
					$.each(data, function() {
					
					if(this["division"] == "text"){
						$("input:radio[name='chk01']:radio[value='text']").prop('checked', true); 
						$("#image").hide();
						$("#text").show();
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
						
						
					}else{
						
						$("input:radio[name='chk01']:radio[value='img']").prop('checked', true); 
						$("#image").show();
						$("#text").hide();
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
							
					}

                	});
					
				};
			
			
				function show(){
						$.each(data, function() {
					
					if(this["outDiv"] == "Y"){
						$("input:checkbox[name='chk000']").prop("checked", true);

					}else{
						$("input:checkbox[name='chk000']").prop("checked", false);

					}

                 });
					
				};
			
			
			
			
				// 사용위치
				function location(){
						$.each(data, function() {
					
					if(this["location"] == "left"){
						$("input:radio[name='chk02']:radio[value='left']").prop('checked', true); 
						
					}else if(this["location"] == "center"){
						$("input:radio[name='chk02']:radio[value='center']").prop('checked', true); 
					}else {
						$("input:radio[name='chk02']:radio[value='right']").prop('checked', true); 
					}

                 });
					
				};
				
				// 사용언어
				function languageType(){
						$.each(data, function() {
					
					if(this["languageType"] == "kor"){
						$("input:radio[name='chk03']:radio[value='kor']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk03']:radio[value='eng']").prop('checked', true); 
					}

             			 });
					
				};
				
				//사용여부
				function useYn(){
						$.each(data, function() {
					
					if(this["useYn"] == "Y"){
						$("input:radio[name='chk04']:radio[value='Y']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk04']:radio[value='N']").prop('checked', true); 
					}

                       });
					
				};
			
		}
	});
}




//파일 리시트 검색
function fiflelist() {
	
	boardNo = $("#boardNo").val();
	boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/popupFile.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			console.log(data);
			filePath = data[0].filePath;
			stFileNm = data[0].stFileNm;
			
			imgchange();
			
				function imgchange(){
						$.each(data, function() {
					
					if(this["delYn"] == "N"){
						$("#fileNameList").append("<label>" + this["ognFileNm"] + "</label><a onclick='delPopup();'> [삭제]</a>");
					}
                        });
					
				};
		}
	});	
}

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

function delPopup(){
    $('#fileupdateflag').val('Y')
	 $('#delYn').val('Y');
	$("#fileNameList").hide();
	ognFileNm ="";
}

function UpdatePopup(){
	var boardNo = $("#boardNo").val();
	var delYn= $('#delYn').val();
	var boardType = $("#boardType").val();
	var fileupdateflag =$("#fileupdateflag").val();
	var content;
	var registData = new FormData();
	var upFile = $("#upfile")[0].files[0];
	fileCheck(upFile);// 이미지파일 유효성 체크
	var division=$("input[name='chk01']:checked").val(); //팝업구분
	var title = $("#title").val();
	var createId= "관리자";
	if($("input[name='chk01']:checked").val() == "text"){
		content=$("textarea").val(); 
	}
                           
	var link = $("#link").val(); // 링크
	var outDiv = $("input[name= 'chk0000']:checked").val(); // 상시노출버튼
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
	registData.append("fileupdateflag", fileupdateflag);
	registData.append("refIdx", boardNo);
	registData.append("delYn", delYn);
	registData.append("filePath", filePath);
	registData.append("stFileNm", stFileNm);
	registData.append("division", division);
	registData.append("upFile", upFile);
	registData.append("seqId", "BOARD_SEQ");
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
		, url : '/admin/popupdate.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, type: 'POST'
		, dataType: 'json'
		, data : registData
		, success : function(data) {
			window.location.href = "/admin/pupList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
	
}

function deletePopup(){
	$('#fileupdateflag').val('Y')
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var fileupdateflag =$("#fileupdateflag").val();
	
	$.ajax({
		 type : 'POST'
		, url : '/admin/popupDelete.do'
		, async: false
		, dataType: 'json'
		, data : {
			"refIdx" : boardNo,
			"refType" : 'POPUP',
			"boardNo" : boardNo,
			"boardType" : 'POPUP',
			"fileupdateflag" : fileupdateflag
			
		}
		, success : function(data) {
			
			
		 	window.location.href = "/admin/pupList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}


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

	



			



