$(document).ready(function() {
	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file1','upFile', 3);
	
	 editArea();

	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;
	$("#stdate").val(today);
	
	// 저장버튼
	$('#registBtn').click(function() {
		if( confirm("공지사항을 등록하시겠습니까?") ){
			noticeregist();
		}
	});
		
	$('#cancel').click(function(){
		if( confirm("입력한 내용을 저장하지 않고 취소하시겠습니까?") ){
			window.location.href = "/admin/NoticeList.do";
		}
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
	
	var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false, false);
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
			if(data == 1){
				alert("저장 되었습니다");
				window.location.href = "/admin/NoticeList.do";
			}else{
				alert("저장되지 않았습니다. 옳지 못한 특수문자가 있는지 확인해주세요.");
			}
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
	
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




