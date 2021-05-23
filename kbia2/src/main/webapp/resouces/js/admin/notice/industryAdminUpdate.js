$(document).ready(function() {
	//수정조회
	viewUpdate();
	
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openIndustry.do";		
		}else{
			return ;
		}
	});
	//수정
	$("#updateBtn").click(function(){
		if(confirm("저장하시겠습니까") == true){
			var valid =	industryFileUpdate();
			if(valid){
				industryFileUpdate();
				editArea();
			}
		}else{
			return ;
		}
	});	
	//삭제
	$("#deleteBtn").click(function(){
		if(confirm("내용을 삭제하시겠습니까") == true){
		viewDelete();
		}else{
			return;
		}
	});
});

//수정리스트 조회
function viewUpdate(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectUpdateIndustry.do'
		, async : false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType,
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data){
			$("#industryTitle").val(data.title);
			$("#industryDate").val(data.startDt);
			
			editArea(data.content);
			fileViewSetting('file1','upFile', 3, boardType, boardNo);
			
			var hour =data.startHour
			$("#industryHourSpan").html(hour);
			$("#industryHour").val(hour).attr("selected", "selected");
			
			var minute =data.startMinute		
			$("#industryMinuteSpan").html(minute);
			$("#industryMinute").val(minute).attr("selected", "selected");
			
			var useYnCheck=data.useYn;
			var languageTypedata = data.languageType;
			$("input[name=chk02]").filter("input[value='"+useYnCheck+"']").attr("checked",true);
			$("input[name=chk01]").filter("input[value='"+languageTypedata+"']").attr("checked",true);
			
			$("#regist").html("<B>"+data.createId+" / "+data.updateDate+"</B>");
			

		}
		,error:function(request,status,error){
					alert("code : "+request.status+"\n"
							+"message : "+request.responseText+"\n"
							+"error : "+ error);
				}
	});
	
}
function editArea(data){
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "industryContent",  //textarea ID
	    sSkinURI: "/resouces/smarteditor2/SmartEditor2Skin.html",  //skin경로
	 	fOnAppLoad: function(){
				oEditors.getById["industryContent"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
		},
		fCreator: "createSEditor2"
	});
	$("#updateBtn").click(function(){
		oEditors.getById["industryContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기

	});
}

function viewDelete(){
	
	var deletedata = new FormData();
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	deletedata.append("boardNo", boardNo);
	deletedata.append("boardType", boardType);
	deletedata.append("refType", boardType);
	deletedata.append("refIdx", boardNo );
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/industryDelete.do'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : deletedata
		, success : function(data){
			location.href = "/admin/openIndustry.do";
				
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
function vaildChk(){
	var industryTitle = $("#industryTitle").val();
	var industryContent = $("#industryContent").val();
	var c = $(industryContent).find("p").prevObject;
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
		
	if(industryTitle == null || industryTitle == ''){
		alert("제목을 입력해주세요");
		$("#industryTitle").focus();
		return false;
	}
	/*if (industryContent == null || industryContent =='' || industryContent == '<pstyle="margin-left:40px;">&nbsp;</p><p>&nbsp;</p>'){
		alert("내용을 입력해주세요");
		$("#industryContent").focus();
		return false;
	}*/
	if(!maxLengthCheck("industryTitle", '제목' ,100)){
		return false;
	}
	
}

//파일 업데이트
function industryFileUpdate(){
	if(vaildChk()!=false){
		var registData = new FormData();
		//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크
		fileParamSetting('file1','upFile', registData, 'update', false ,false);
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
			, url : '/admin/industryFileUpdate.do'
			, enctype: 'multipart/form-data'
			, processData: false 
			, contentType: false 
			
			, type: 'POST'
			, dataType: 'json'
			, data : registData
			, success : function(data) {
				update();
				
			}
			, error: function (request, status, error) {
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}
}
//주간브리프 수정
function update(){
	var updateData = new FormData();
	var industryTitle = $("#industryTitle").val();
	var industryContent = $("#industryContent").val();
	var industryDate = $("#industryDate").val();
	var industryHour = $("#industryHour").val();
	var industryMinute = $("#industryMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var boardNo = $("#boardNo").val();
	var updateId = $("#sessionUserId").val();
	
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
	var todayIndustry = year+"-"+month+"-"+date
	
	
	if(industryDate == '' || industryDate == null){
		industryDate= todayIndustry;
	}
	if(industryHour ==''|| industryHour == null){
		industryHour = hour;
	}
	if(industryMinute ==''|| industryMinute == null){
		industryMinute = minutes;
	}
	

	//내용
	updateData.append("boardNo", boardNo);
	updateData.append("boardType", "INDUSTRY");
	updateData.append("industryTitle", industryTitle);
	updateData.append("industryDate", industryDate);
	updateData.append("industryHour", industryHour);
	updateData.append("industryMinute", industryMinute);
	updateData.append("industryContent", industryContent);
	updateData.append("languageType", languageType);
	updateData.append("useYn",useYn);
	updateData.append("updateId", updateId);
	
	$.ajax({
		type : 'POST'
		, url : '/admin/industryUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : updateData
		, success : function(data){
		
			location.href = "/admin/openIndustry.do";
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}

