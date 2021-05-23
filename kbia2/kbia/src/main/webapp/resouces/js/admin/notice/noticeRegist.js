$(document).ready(function() {
	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file1','upFile', 3);
	
	 editArea();
	
	// 저장버튼
	$('#registBtn').click(function() {
			noticeregist();
			
		});
		
		$('#cancel').click(function(){
			window.location.href = "/admin/NoticeList.do";
			
		});
	
});

	// 에디터영역
function editArea(){
	// 에디터 영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "text",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	// content 저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["text"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
}

//공지사항 등록
function noticeregist(){
	
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
	var division=$('#divisionN').val(); //구분
	var title = $("#title").val();
	var content = $("#text").val();
	var outDiv = $("#chk0101").val();// 상단노출
	var mainOut = $("#chk0102").val(); // 상시노출버튼
	var startDt = $("#stdate").val(); // 노출기간 시작 게시일
	var userId = $("#sessionUserId").val(); //사용자명 
	var languageType = $("input[name='chk03']:checked").val();
	var useYn = $("input[name='chk04']:checked").val();
	var noticeH = $('#noticeH').val(); // 게시일 시간
	var noticeM = $('#noticeM').val(); // 게시일  분
	
	var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false, true);
	if(insertChk1 != true ) return;
	registData.append("seqId", "NOTICE_SEQ");
	registData.append("boardType", "NOTICE");
	registData.append("refType", "NOTICE");
	registData.append("createId", userId);
	registData.append("division", division);
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
		, url : '/admin/NoticeRegist.do'
		, enctype: 'multipart/form-data'
		, processData: false 
		, contentType: false 
		, async: false
		, type: 'POST'
		, dataType: 'json'
		, data : registData		
		, success : function(data) {
			alert("저장 되었습니다");
			window.location.href = "/admin/NoticeList.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
	
 }
	
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

// 글자수 표시 
/*
function fnChkByte(obj, maxByte)
{
    var str = obj.value;
    var str_len = str.length;
    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";
    for(var i=0; i<str_len; i++)
    {
        one_char = str.charAt(i);
        if(escape(one_char).length > 4)
        {
            rbyte += 2;                                         //한글2Byte
        }
        else
        {
            rbyte++;                                            //영문 등 나머지 1Byte
        }


        if(rbyte <= maxByte)
        {
            rlen = i+1;                                          //return할 문자열 갯수
        }
     }

     if(rbyte > maxByte)
     {
  // alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
  alert("메세지는 최대 " + maxByte + "byte를 초과할 수 없습니다.")
  str2 = str.substr(0,rlen);                                  //문자열 자르기
  obj.value = str2;
  fnChkByte(obj, maxByte);
     }
     else
     {
        document.getElementById('byteInfo').innerText = rbyte;
     }
}
*/

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




