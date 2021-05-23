var oEditors = [];
$(document).ready(function() {
	
	selectMbanner();
	
	$('#cencelBtn').click(function(){
		
	  window.location.href = "/admin/MbannerList.do";
	});
	
	$('#saveBtn').click(function(){
		 oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		 UpdateMbanner();
	});
	
	
	   $('#deleteBtn').click(function(){
			deleteMbanner();
		
	});
	
});

// 에디터 영역
function editArea(data){
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "text",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
		fOnAppLoad: function(){
			if(data !=null){
				oEditors.getById["text"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
			}else{
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
		type : 'POST'
		, url : '/admin/selectMbanner.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType		
		}
		
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
		 console.log(data);
		 editArea(data.content);
		 filelist();			
		 view();
			
		// 각화면
		function view(){
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
					
			 show(); // 상시노출
				
				//노출순서
				var locationN = (data[0].locationN + "번");
				$("#locationN").html(locationN);
				$("#locationNo").val(locationN).attr("selected", "selected");
				languageType(); // 사용언어
				useYn(); // 사용여부

           			  });
				
				};
		
			//상시노출 
			function show(){
					$.each(data, function() {
				
				if(this["outDiv"] == "Y"){
					$("input:checkbox[name='chk000']").prop("checked", true);


				}else{
					$("input:checkbox[name='chk000']").prop("checked", false);

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
function filelist() {
	
	boardNo = $("#boardNo").val();
	boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/MbannerFile.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
			change(data);
			
		}
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

function delMbanner(idx){
    $('#fileupdateflag').val('Y')
	$('#delYn').val('Y');
	$("#fileNameList").hide();
	
}


function delMbannerM(){
    $('#fileupdateflag').val('Y')
	 $('#delYn').val('Y');
	$("#fileMnameList").hide();
	ognFileNm ="";
}

function UpdateMbanner(){
	var registData = new FormData();
	
	var boardNo = $("#boardNo").val();
	var delYn= $('#delYn').val();
	var boardType = $("#boardType").val();
	var fileupdateflag =$("#fileupdateflag").val();
	var content =$("#text").val(); 
	var upFile = $("#upfile")[0].files[0]; // 웹 이미지
	var upMfile = $('#upMfile')[0].files[0]; //모바일이미지
	var division=$("input[name='chk01']:checked").val(); //팝업구분
	var title = $("#title").val();
	var createId= $("#createId").val();;
	var link = $("#link").val(); // 링크
	var outDiv = $("input[name= 'chk0000']:checked").val(); // 상시노출버튼
	var startDt = $("#stdate").val(); // 노출기간 시작 게시일
	var endDt = $("#endate").val(); // 노출기간 종류 게시일
	var locationNN = $('#locationNo').val(); // 노출순서
	var languageType = $("input[name='chk03']:checked").val();
	var useYn = $("input[name='chk04']:checked").val();
	var mBannerStHour = $('#mBannerStHour').val(); // 게시일 시간
	var mBannerStMinute = $('#mBannerStMinute').val(); // 게시일  분
	var mBannerEndHour = $('#mBannerEndHour').val(); // 게시종료일 시간
	var mBannerEndMinute = $('#mBannerEndMinute').val(); // 게시일종료일  분
	var locationN = locationNN.substring(0,1);
	
	console.log(endDt);
	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("division", division);
	registData.append("boardType", "MAIN");
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
		, url : '/admin/Mbannerupdate.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, type: 'POST'
		, dataType: 'json'
		, data : registData
		, success : function(data) {
			//window.location.href = "/admin/MbannerList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
}

function bannerFileUpdate(){
	$('#fileupdateflag').val('Y')
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	var fileupdateflag =$("#fileupdateflag").val();
	
	$.ajax({
		 type : 'POST'
		, url : '/admin/MbannerDelete.do'
		, async: false
		, dataType: 'json'
		, data : {
			"refIdx" : boardNo,
			"refType" : 'MAIN',
			"boardNo" : boardNo,
			"boardType" : 'MAIN',
			"fileupdateflag" : fileupdateflag
			
		}
		, success : function(data) {
		 	window.location.href = "/admin/MbannerList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}

function change(data){
	var type = "upMfile";
	
	for(var i=0; i<data.length; i++){
		
		if(data[i].delYn == "N"){
			if(data[i].filePath.indexOf(type) == -1){
				$("#fileNameList").append("<label for="+data[i].idx+">" + data[i].ognFileNm + "<a onclick='delMbanner("+data[i].idx+");'> [삭제]</a></label> &nbsp");
				$("#fileNameList").append("<label for="+data[i].idx+">" + data[i].ognFileNm + "<a onclick='delMbanner("+data[i].idx+");'> [삭제]</a></label> &nbsp");
				$("#fileNameList").append("<label for="+data[i].idx+">" + data[i].ognFileNm + "<a onclick='delMbanner("+data[i].idx+");'> [삭제]</a></label> &nbsp");
			}else{
				$("#fileMnameList").append("<label for="+data[i].idx+">" + data[i].ognFileNm + "</label><a onclick='delMbannerM("+data[i].idx+");'> [삭제]</a>");
			}
		}
	}
	
}

