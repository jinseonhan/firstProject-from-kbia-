var fileArray= [];
var i = 0;
$(document).ready(function() {
	//수정조회
	viewUpdate();
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openBattery.do";		
		}else{
			return ;
		}
	});
	//수정
	$("#updateBtn").click(function(){
		if(confirm("수정된 내용을 변경하시겠습니까") == true){
			var valid = update();
			if(valid){
				update();
				editArea();
			}
		}else{
			return ;
		}
	});	
	// 삭제
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
		, url : '/admin/selectUpdateBattery.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType,
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data){
			$("#batteryTitle").val(data.title);
			$("#batteryDate").val(data.startDt);
			$("#address").val(data.filePath);
			
			editArea(data.content);
			
			var hour =data.startHour
			$("#batteryHourSpan").html(hour);
			$("#batteryHour").val(hour).attr("selected", "selected");
			
			var minute =data.startMinute		
			$("#batteryMinuteSpan").html(minute);
			$("#batteryMinute").val(minute).attr("selected", "selected");
			
			var useYnCheck=data.useYn;
			var languageTypedata = data.languageType;
			$("input[name=chk02]").filter("input[value='"+useYnCheck+"']").attr("checked",true);
			$("input[name=chk01]").filter("input[value='"+languageTypedata+"']").attr("checked",true);
			
			$("#regist").html("<B>"+data.createId+" / "+data.updateDate+"</B>");
					
			
			fileList();	
			
			
		}
		,error:function(request,status,error){
					alert("code : "+request.status+"\n"
							+"message : "+request.responseText+"\n"
							+"error : "+ error);
				}
	});
	
}

function delFile(a){
	alert("삭제하시겠습니까?");
	fileArray[a] = '';
	$("#upFile"+a).val('');
	$("#row"+a).hide();
	$("#del"+a).hide();
}

function editArea(data){
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "batteryContent",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	 	fOnAppLoad: function(){
				oEditors.getById["batteryContent"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
		},
		fCreator: "createSEditor2"
	});
	$("#updateBtn").click(function(){
		oEditors.getById["batteryContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
}

function viewDelete(){
	
	var deletedata = new FormData();
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	deletedata.append("boardNo", boardNo);
	deletedata.append("boardType", boardType);
	deletedata.append("refType", "BATTERY");
	deletedata.append("refIdx", boardNo );
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/batteryDelete.do'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : deletedata
		, success : function(data){
			location.href = "/admin/openBattery.do";
				
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}


var boardNo;
var boardType;
var filePath;
var stFileNm;
var ognFileNm;
var fileupdateflag;
//파일 상세 조회
function fileList() {
		boardNo = $("#boardNo").val();
		boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/batteryFile.do'
		, async: false
		, data : {
			"refIdx" : boardNo,
			"refType" : boardType		
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
				filePath = data[0].filePath;
				stFileNm = data[0].stFileNm;
				fileChange(data);
		}
	});
}
var dataArray = [];
function fileChange(data){
	var upThum = "upThum";	
	var n = filePath.indexOf("FFFFFFFF");

	for(var a = 0; a<data.length; a++){
		if(data[a].delYn =="N"){
			dataArray.push(a);
			if(data[a].filePath.indexOf(upThum) != -1){	
				$("#fileThumList").append("<input type='hidden' id='delYn"+a+"'  value='N'>"
					+ "<input type='hidden' id='fileupdateflag"+a+"' value='N'>"
					+ "<input type='hidden' id='idx"+a+"' class='useIdx' value="+ data[a].idx+ ">"
					+ "<label>"+ data[a].ognFileNm + "</label><a onclick='delThum("+a+");'> [삭제]</a>");
			}else if(data[a].filePath.indexOf(upThum) == -1){
				$("#fileNameList").append("<input type='hidden' id='delYn"+a+"'  value='N'>"
					+ "<input type='hidden' id='fileupdateflag"+a+"' value='N'>"
					+ "<input type='hidden' id='idx"+a+"' class='useIdx' value="+ data[a].idx+ ">"
					+"<label>"+ data[a].ognFileNm + "</label><a onclick='delBattery("+a+");'> [삭제]</a>");
			}
		}
	}
};	

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

		}
	});	
}
function delThum(a){
	$("#fileupdateflag"+a).val('Y');
	$("#idx"+a).attr('class','noUseIdx'+a);
	$("#delYn"+a).val('Y');
	$("#fileThumList").hide();	
	ognFileNm ="";

}


function delBattery(a){
	$("#fileupdateflag"+a).val('Y');
	$("#idx"+a).attr('class','noUseIdx'+a);
	$("#delYn"+a).val('Y');
	$("#fileNameList").hide();	
	ognFileNm ="";

}

//THE Battery 수정
function update(){
	var updateData = new FormData();
	var upFile = $("#upFile")[0].files[0];
	var upThum = $("#upThum")[0].files[0];
	
	var batteryTitle = $("#batteryTitle").val();
	var batteryContent = $("#batteryContent").val();
	var batteryDate = $("#batteryDate").val();
	var batteryHour = $("#batteryHour").val();
	var batteryMinute = $("#batteryMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var boardNo = $("#boardNo").val();
	
	var fileupdateflag =$("#fileupdateflag").val();
	var delYn= $('#delYn').val();
	
	//현재 시간 날짜 	
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var min = today.getMinutes();
	
	var minutes = Math.round(min/10)*10;
	
	var fileArr = dataArray[dataArray.length-1];
	
	if(date<10){
		date='0'+date
	}
	if(month<10){
		month='0'+month
	}
	if(hour<10){
		hour = '0'+ hour
	}
	var todayBattery = year+"-"+month+"-"+date
	
	
	if(batteryDate == '' || batteryDate == null){
		batteryDate= todayBattery;
	}
	if(batteryHour ==''|| batteryHour == null){
		batteryHour = hour;
	}
	if(batteryMinute ==''|| batteryMinute == null){
		batteryMinute = minutes;
	}
	
	if(batteryTitle == null || batteryTitle == ''){
		alert("제목을 입력해주세요");
		$("#batteryTitle").focus();
		return;
	}else if (batteryContent == null || batteryContent ==''){
		alert("내용을 입력해주세요");
		$("#batteryContent").focus();
		return;
	}
	/*for(var a = 0; a < dataArray.length; a++){
		 var Use = $("#delYn"+a).val();
	}*/
	if(upThum == '' || upThum == null ){
		alert("썸네일을 입력해주세요");
		$("#upThum").focus();
		return;
	}
	
	
	
	for(var a = 0; a< dataArray.length; a++){
		updateData.append("idx"+a, $("#idx"+a).val());
		updateData.append("fileupdateflag"+a, $("#fileupdateflag"+a).val());
		updateData.append("delYn"+a, $("#delYn"+a).val())
	}
	
	updateData.append("fileupdateflag", fileupdateflag);
	updateData.append("seqId","INFO_SEQ");
	updateData.append("refType", "BATTERY");
	updateData.append("upFile", upFile);
	updateData.append("stFileNm", stFileNm);	
	updateData.append("refIdx", boardNo);
	updateData.append("upThum", upThum);
	updateData.append("boardNo", boardNo);
	updateData.append("boardType", boardType);
	updateData.append("delYn", delYn);
	updateData.append("filePath", filePath);
	updateData.append("boardNo", boardNo);
	updateData.append("boardType", "BATTERY");
	updateData.append("batteryTitle", batteryTitle);
	updateData.append("batteryDate", batteryDate);
	updateData.append("batteryHour", batteryHour);
	updateData.append("batteryMinute", batteryMinute);
	updateData.append("batteryContent", batteryContent);
	updateData.append("languageType", languageType);
	updateData.append("useYn",useYn);
	updateData.append("fileArr",fileArr);
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/batteryUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : updateData
		, success : function(data){
			location.href = "/admin/openBattery.do";
			
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}





