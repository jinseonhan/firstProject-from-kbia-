var fileArray= [];
var i = 0;
$(document).ready(function() {
	editArea();
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openHire.do";	
		}else{
			return ;
		}
	});
	//등록
	$("#registBtn").click(function(){
		var valid = regist();
		if(valid){
			regist();
		}
		
	});
	
	var inputFile = $("#upFile");
	
	var targetId = inputFile.attr("id");	
	
	inputFile.change(function(){
		var i = $(this).val();		
		var target = "#" + targetId + "Path";		
		
		$(target).val(i);
	});
	
	// 파일 선택	
	$("#plusBtn").click (function() {
		if($(".use").length < 4){
			i++;
			fileArray.push(i);
			var a = i-1;
			
				$("#fileList").append(
					'<div id="del'+a+'"style=" margin-top:10px;" class="use" >'
						+ '<div class="multiFile" id=row'+a+' style="margin-left: -8px;">'
							+ '<input type="text" id="upFile'+a+'Path" title="첨부파일 명" >'
							+ '<input type= "file" id="upFile'+a+'" title="파일첨부">'
						+ '</div>'
						+ '<button style="margin-left: 11px;" onclick="delFile('+a+');" class="btn btnGray">삭제</button>'
					+ '</div>'
					+ '<script>'
						+ 'var inputFile' + a + ' = $("#upFile'+a+'");'	
						+ 'var targetId'+a+' = inputFile' + a + '.attr("id");'				
						+ 'inputFile' + a + '.change(function(){'
							+ 'var i = $(this).val();'
							+ 'var target'+a+' = "#" + targetId'+a+' + "Path";'					
							+ '$(target'+a+').val(i);'
						+ '});'
					+ '</script>'
				);
			}else{
				alert("파일 추가는 5개 까지 가능합니다.");
			}	
		});
	
});
function changeFile() {
	var inputFile = $(".multiFile").find("input[type=file]");
	
	var targetId = inputFile.attr("id");	
	
	inputFile.change(function(){
		var i = $(this).val();		
		var target = "#" + targetId + "Path";		
		
		$(target).val(i);
	});
}

function delFile(a){
	alert("삭제하시겠습니까?");
	$("#del"+a).attr('class','useNo');
	fileArray[a] = '';
	$("#upFile"+a).val('');
	$("#row"+a).hide();
	$("#del"+a).hide();
}

//에디터
function editArea(){
	//에디터영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "hireContent",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["hireContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
	
}

//채용공고 등록
function regist(){
	var registData = new FormData();
	var upFile = $("#upFile")[0].files[0];
	var memberDiv = $("input[name='chk01']:checked").val(); //협회 및 회원사 
	var division =  $("#division").val(); //구분
	var hireTitle = $("#hireTitle").val();
	var hireContent =  $("#hireContent").val();
	var multiFileNo =  $("#hireFile").val();
	var languageType =  $("input[name='chk02']:checked").val();
	var useYn = $("input[name='chk03']:checked").val();
	
	var hireStartDate = $("#hireStartDate").val();
	var hireStartHour = $("#hireStartHour").val();
	var hireStartMinute = $("#hireStartMinute").val();
	var hireEndDate = $("#hireEndDate").val();
	var hireEndHour = $("#hireEndHour").val();
	var hireEndMinute = $("#hireEndMinute").val();
	
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
	var todayHire = year+"-"+month+"-"+date
	
	
	if(hireStartDate == '' || hireStartDate == null){
		hireStartDate= todayHire;
	}
	if(hireStartHour ==''|| hireStartHour == null){
		hireStartHour = hour;
	}
	if(hireStartMinute ==''|| hireStartMinute == null){
		hireStartMinute = minutes;
	}
	if(hireEndDate == '' || hireEndDate == null){
		hireEndDate= todayHire;
	}
	if(hireEndHour ==''|| hireEndHour == null){
		hireEndHour = hour;
	}
	if(hireEndMinute ==''|| hireEndMinute == null){
		hireEndMinute = minutes;
	}
		
	if(hireTitle == '' || hireTitle == null){
		alert("제목을 입력해주세요");
		$("#hireTitle").focus();
		return;
	}
	if(hireContent == '' || hireContent == null || hireContent == '<p><br></p>'){
		alert("내용을 입력해주세요");
		$("#hireContent").focus();
		return;
	}
	for(var j =0; j< fileArray.length ; j++){		
		registData.append("upFile"+j , $("#upFile"+j)[0].files[0]);
	}
	registData.append("upFile", $("#upFile")[0].files[0]);
	registData.append("upFile", upFile);
	registData.append("seqId", "INFO_SEQ");
	registData.append("boardType", "HIRE");
	registData.append("memberDiv", memberDiv);
	registData.append("division", division);
	registData.append("hireTitle", hireTitle);
	registData.append("hireContent", hireContent);
	registData.append("multiFileNo", multiFileNo);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	registData.append("hireEndDate", hireEndDate);
	registData.append("hireEndHour", hireEndHour);
	registData.append("hireEndMinute", hireEndMinute);
	registData.append("hireStartDate", hireStartDate);
	registData.append("hireStartHour", hireStartHour);
	registData.append("hireStartMinute", hireStartMinute);
	

	$.ajax({
		type : 'POST'
		, url : '/admin/hireRegist.do'
		, enctype: 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : registData
		, success : function(data){
			location.href = "/admin/openHire.do";
		}
		, error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
