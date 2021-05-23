var oEditors = [];
$(document).ready(function() {
	
	//fileDivId, 파일위치, 넣을 파일 갯수
	fileViewSetting('file1','upFile', 3);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;
	
	$("#briefDate").val(today);
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "briefContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	
	//등록
	$("#registBtn").click(function(){
		oEditors.getById["briefContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		regist();
	});
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openBrief.do";		
		}else{
			return ;
		}
	});
});

function vaildChk(){
	var briefTitle = $("#briefTitle").val();
	var content = $("#briefContent").val();
	
	if(briefTitle == '' || briefTitle == null){
		alert("제목을 입력해주세요");
		$("#briefTitle").focus();
		return false;
	}
	
	var c = $(content).find("p").prevObject;
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
	
	if(!maxLengthCheck("briefTitle", '제목' ,100)){
		return false;
	}

}

//주간브리프 등록
function regist(){
	
	if(vaildChk()!=false){
		var registData = new FormData();
		var briefDate = $("#briefDate").val(); //등록일날짜
		var briefHour = $("#briefHour").val(); // 등록일 시
		var briefMinute = $("#briefMinute").val(); //등록일 분
		var languageType = $("input[name='chk01']:checked").val(); //언어
		var useYn = $("input[name='chk02']:checked").val(); //사용여부
		var briefTitle = $("#briefTitle").val(); // 제목
		var content = $("#briefContent").val(); // 내용
		var userId = $("#sessionUserId").val(); //사용자명 
		
		//현재 시간 날짜 	
		var today = new Date();
		var date = today.getDate();
		var month = today.getMonth()+1;
		var year = today.getFullYear();
		var hour = today.getHours();
		var min = today.getMinutes();
		var minutes = Math.round(min/10)*10;
		
		if(date<10){
			date='0'+date
		}
		if(month<10){
			month='0'+month
		}
		if(hour<10){
			hour = '0'+ hour
		}
		var todayBrief = year+"-"+month+"-"+date
		
		
		if(briefDate == '' || briefDate == null){
			briefDate= todayBrief;
		}
		if(briefHour ==''|| briefHour == null){
			briefHour = hour;
		}
		if(briefMinute ==''|| briefMinute == null){
			briefMinute = minutes;
		
		var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false ,false);
		if(insertChk1 != true ) return;
		registData.append("seqId", "INFO_SEQ");
		registData.append("boardType", "BRIEF");
		registData.append("briefTitle", briefTitle);
		registData.append("content", content);
		registData.append("briefDate", briefDate);
		registData.append("briefHour", briefHour);
		registData.append("briefMinute", briefMinute);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);
		registData.append("createId", userId);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/briefRegist.do'
			, enctype : 'multipart/form-data'
			, processData: false /* 필수 */ 
			, contentType: false  /* 필수 */
			, type : 'POST'
			, dataType : 'json' //xml,json,local 3형식
			, data : registData
			, success : function(data){
				alert("저장되었습니다.");
				location.href = "/admin/openBrief.do";
			}
			, error : function (request, status, error){
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
		}
	}
}