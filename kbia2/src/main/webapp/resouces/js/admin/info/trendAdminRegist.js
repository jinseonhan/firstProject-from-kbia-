$(document).ready(function() {
	editArea();
	
	fileViewSetting('file1','upFile', 3);
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0"+(d.getMonth()+1)).slice(-2);
	var day = ("0"+d.getDate()).slice(-2);
	var today = year + '-' + month + '-' + day ;
	
	$("#trendDate").val(today);

	
	//취소	 
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openTrend.do";		
		}else{
			return ;
		}
	});
	//등록
	$("#registBtn").click(function(){
		if( !confirm("게시글을 등록하시겠습니까?") ){
			return;
		}
		
		var valid = regist();
		if(valid){
			regist();
		}
		
	});
	
	
});

//에디터
function editArea(){
	//에디터영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "trendContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["trendContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
	
}
function vaildChk(){
	var trendTitle = $("#trendTitle").val();
	var content = $("#trendContent").val();
	
	if(trendTitle == '' || trendTitle == null){
		alert("제목을 입력해주세요");
		$("#trendTitle").focus();
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
	
	if(!maxLengthCheck("trendTitle", '제목' ,100)){
		return false;
	}
	
}

//기술 동향 등록
function regist(){
	if(vaildChk()!=false){
	var registData = new FormData();
	var trendDate = $("#trendDate").val();
	var trendHour = $("#trendHour").val();
	var trendMinute = $("#trendMinute").val();
	var languageType =$("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var trendTitle =  $("#trendTitle").val();
	var content = $("#trendContent").val();
	var trendType = $("input[name='chk03']:checked").val();
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
	var todayTrend = year+"-"+month+"-"+date
	
	
	if(trendDate == '' || trendDate == null){
		trendDate= todayTrend;
	}
	if(trendHour ==''|| trendHour == null){
		trendHour = hour;
	}
	if(trendMinute ==''|| trendMinute == null){
		trendMinute = minutes;
	}
	
	if( trendType == "T"){
		trendType = "T_TRENDS";
	}else if( trendType == "A"){
		trendType = "A_TRENDS";
	}

	
	var insertChk1 = fileParamSetting('file1','upFile', registData, 'insert', false ,false);
	if(insertChk1 != true ) return;
		registData.append("seqId", "INFO_SEQ");
		registData.append("boardType", trendType);
		registData.append("trendTitle", trendTitle);
		registData.append("content", content);
		registData.append("trendDate", trendDate);
		registData.append("trendHour", trendHour);
		registData.append("trendMinute", trendMinute);
		registData.append("languageType", languageType);
		registData.append("useYn", useYn);
		registData.append("createId", userId);
		
		$.ajax({
			type : 'POST'
			, url : '/admin/trendRegist.do'
			, enctype : 'multipart/form-data'
			, processData: false /* 필수 */ 
			, contentType: false /* 필수 */
			, type : 'POST'
			, dataType : 'json' //xml,json,local 3형식
			, data : registData
			, success : function(data){
				alert("저장되었습니다.");
				location.href = "/admin/openTrend.do";
			}
			, error : function (request, status, error){
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
				console.log(msg);
			}
		});
	}
}
