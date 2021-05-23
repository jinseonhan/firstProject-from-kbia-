var oEditors = [];
$(document).ready(function() {
	
	selectNotice();
	$('#cancel').click(function(){
		
	window.location.href = "/admin/NoticeList.do";
	});
	
		$('#registBtn').click(function(){
		oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []);
		bannerFileUpdate();
	});
	
	
	   $('#deleteBtn').click(function(){
			deleteNotice();
		
	});
	

});


// 에디터 영역
function editArea(data){
		nhn.husky.EZCreator.createInIFrame({
		    oAppRef: oEditors,
		    elPlaceHolder: "text",  //textarea ID
		    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
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




//공지사항 상세 조회

var aaa;
function selectNotice() {
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectNotice.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType		
		}
		
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
		    editArea(data.content);
			fileViewSetting('file1','upFile', 3, boardType, boardNo);
			view();
			console.log(data);
			// 각화면
			function view(){
					$.each(data, function() {
						$("#divisionN").val(data[0].division); // 구분
					    $("#title").val(data[0].title);//제목
						$("#text").val(data[0].content);//내용
				        $("#stdate").val(data[0].createDate); //노출기간 시작
						
						var hourSt = (data[0].noticeH);
						var hourSm = (data[0].noticeM);
				
						$("#noticeSt").html(hourSt);
						$("#noticeH").val(hourSt).attr("selected", "selected");
						
						$("#noticeSm").html(hourSm);
						$("#noticeM").val(hourSm).attr("selected", "selected");
						
						
						outDiv(data[0].outDiv);
						mainOut(data[0].mainOut);
						languageType();// 사용언어
						useYn(); //사용여부
						$("#regist").html("<B>"+data[0].createId+" / "+data[0].updateDate+"</B>");
						

                	});
					
				};
				
			
				//상단노출
				function outDiv(data){
				
                  if(data =="1"){ //값 비교
                     $("#chk0101").attr("checked",true);
                     }else{
                     $("#chk0101").attr("checked",false);
                  }   
               }
				
				
				//메인노출제외
				function mainOut(data){
                  if(data=="Y"){ //값 비교
                     $("#chk0102").attr("checked",true);
                     }else{
                     $("#chk0102").attr("checked",false);
                  }   
               }
				
					
				
				// 사용언어
				function languageType(){
						$.each(data, function() {
					
					if(this["languageType"] == "KOR"){
						$("input:radio[name='chk03']:radio[value='KOR']").prop('checked', true); 
						
					}else{
						$("input:radio[name='chk03']:radio[value='ENG']").prop('checked', true); 
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

function UpdateNotice(){
	if(vaildChk()!=false){
	if($('input[name="chk01"]').eq(0).is(":checked")){
        $('#chk0101').val('1');
      }else{
         $('#chk0101').val('0');
         
      }

	if($('input[name="chk02"]').eq(0).is(":checked")){
         $('#chk0102').val('Y');
      }else{
         $('#chk0102').val('N');
         
      }
	var registData = new FormData();
	var boardNo = $("#boardNo").val();
	var delYn= $('#delYn').val();
	var boardType = $("#boardType").val();
	var fileupdateflag =$("#fileupdateflag").val();
	var division=$('#divisionN').val(); //구분
	var title = $("#title").val();
	var content = $('#text').val();
	var uesrId= $("#sessionUserId").val();
	var outDiv = $("#chk0101").val();// 상단노출
	var mainOut = $("#chk0102").val(); // 상시노출버튼
	var startDt = $("#stdate").val(); // 노출기간 시작 게시일
	var languageType = $("input[name='chk03']:checked").val(); //언어타입
	var useYn = $("input[name='chk04']:checked").val();
	var noticeH = $('#noticeH').val(); // 게시일 시간
	var noticeM = $('#noticeM').val(); // 게시일  분
	
	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("division", division);
	registData.append("seqId", "BOARD_SEQ");
	registData.append("boardType", "NOTICE");
	registData.append("refType", "NOTICE");
	registData.append("createId", uesrId);
	registData.append("title", title);
	registData.append("content", content);
	registData.append("outDiv", outDiv);
	registData.append("mainOut", mainOut);
	registData.append("startDt", startDt);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	registData.append("noticeH", noticeH);
	registData.append("noticeM", noticeM);

	$.ajax({
		type : 'POST'
		, url : '/admin/Noticeupdate.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, async: false
		, type: 'POST'
		, dataType: 'json'
		, data : registData
		, success : function(data) {
			window.location.href = "/admin/NoticeList.do";
			
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
 }	
	
}

function deleteNotice(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		 type : 'POST'
		, url : '/admin/noticeDelete.do'
		, async: false
		, dataType: 'json'
		, data : {
			"refIdx" : boardNo,
			"refType" : 'NOTICE',
			"boardNo" : boardNo,
			"boardType" : 'NOTICE'
			
		}
		, success : function(data) {
			alert("정상적으로 삭제 처리 되었습니다");
		 	window.location.href = "/admin/NoticeList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});
	
	
}

function bannerFileUpdate(){
	var registData = new FormData();
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1','upFile', registData, 'update', false, true);

	if(insertChk1 != true )   return;	
	var filePathArr = [];
	filePathArr[0]='upFile';
	registData.append("filePath", filePathArr);
	
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	registData.append("boardNo", boardNo);
	registData.append("boardType", boardType);
	registData.append("refIdx", boardNo);
	registData.append("refType", boardType);
	
	$.ajax({
		type : 'POST'
		, url : '/admin/noticeFileUpdate.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		
		, type: 'POST'
		, dataType: 'json'
		, data : registData
		, success : function(data) {
			UpdateNotice();			
			alert("저장 되었습니다");
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
	
	if(text == '' || text == null ||  text == "<p><br></p>"){
		alert("내용을 입력해주세요");
		$("#text").focus();
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

	



			



