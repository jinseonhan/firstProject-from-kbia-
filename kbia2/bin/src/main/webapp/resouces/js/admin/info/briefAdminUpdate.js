var fileArray= [];
var i = 0;
$(document).ready(function() {
	//수정조회
	viewUpdate();
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openBrief.do";		
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
		
		$("#fileNameList").append(
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
//수정리스트 조회
function viewUpdate(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	$.ajax({
		type : 'POST'
		, url : '/admin/selectUpdateBrief.do'
		, async: false
		, data : {
			"boardNo" : boardNo,
			"boardType" : boardType,
				
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data){
			$("#briefTitle").val(data.title);
			$("#briefDate").val(data.startDt);
			$("#address").val(data.filePath);
			
			editArea(data.content);
			
			var hour =data.startHour
			$("#briefHourSpan").html(hour);
			$("#briefHour").val(hour).attr("selected", "selected");
			
			var minute =data.startMinute		
			$("#briefMinuteSpan").html(minute);
			$("#briefMinute").val(minute).attr("selected", "selected");
			
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
	$("#del"+a).attr('class','useNo');
	fileArray[a] = '';
	$("#upFile"+a).val('');
	$("#row"+a).hide();
	$("#del"+a).hide();
}

function editArea(data){
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "briefContent",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	 	fOnAppLoad: function(){
				oEditors.getById["briefContent"].exec("PASTE_HTML", [data]);  //에디터박스에 값 불러오기
		},
		fCreator: "createSEditor2"
	});
	$("#updateBtn").click(function(){
		oEditors.getById["briefContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
	});
}

function viewDelete(){
	
	var deletedata = new FormData();
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	deletedata.append("boardNo", boardNo);
	deletedata.append("boardType", boardType);
	deletedata.append("refType", "BRIEF");
	deletedata.append("refIdx", boardNo );
	
	
	$.ajax({
		type : 'POST'
		, url : '/admin/briefDelete.do'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : deletedata
		, success : function(data){
			location.href = "/admin/openBrief.do";
				
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
var fileidx;
//파일 상세 조회
function fileList() {
		boardNo = $("#boardNo").val();
		boardType = $("#boardType").val();
	$.ajax({
		type : 'POST'
		, url : '/admin/briefFile.do'
		, async: false
		, data : {
			
			"refIdx" : boardNo,
			"refType" : boardType,
			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {
				//filePath = data[0].filePath;
				//stFileNm = data[0].stFileNm;
				fileChange(data);
		}
	});
}



var dataArray = [];	
function fileChange(data){	
		for(var a = 0; a<data.length; a++){
			if(data[a].delYn=="N"){	
				//var delYn = (data[a].delYn)
				dataArray.push(a);
					$("#fileNameList").append("<div id='seachFile"+a+"'style='margin-top: 10px;' class='use'>"
												+"<input type='hidden' id='delYn"+a+"'  value='N'>"
												+"<input type='hidden' id='fileupdateflag"+a+"' value='N'>"
												+"<input type='hidden' id='idx"+a+"' class='useIdx' value="+ data[a].idx+ ">"
												+"<div class='multiFile' id='row"+a+"' >"
													+"<input type ='text' id='changeFile"+a+"Path' title='첨부파일 명' style='margin-left: -8px; max-width:104%;'value="+ data[a].ognFileNm + "></input>"
													+"<input type='file' id='changeFile"+a+"' title='파일첨부'>"
												+"</div>"
													+"<button class='btn btnGray' style='margin-left: 11px;' onclick='delBrief("+a+");'>삭제</button><br>"
											+"</div>"
											+ '<script>'
												+ "var inputFile"+a+" = $('#changeFile"+a+"');"	
												+ "var targetId"+a+" = inputFile"+a+".attr('id');"				
												+ "inputFile"+a+".change(function(){"
												+ "var i = $(this).val();"
												+ "var target"+a+" = '#' + targetId"+a+" + 'Path';"					
												+ "$(target"+a+").val(i);"
												+ "});"
												/*+ "$('#changeFile"+a+"').click(function(){"
												+ "$('#deleteFileList').append('<input type='hidden' id=fileDel"+a+" value="+data[a]+">');"
												+ "});"*/
											+ "</script>");
						
					//	$("changeFile"+x).val(data[x]);				
			}else if(data[a].delYn =="Y"){
				$("#inputHide").append("<input type=file id='changeFile"+a+"' value="+data[a]+">")
				$("#inputHide").hide();
			}
		}
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
		}
	});	
}

function delBrief(a){
	$("#seachFile"+a).attr('class','useNo');
	$("#idx"+a).attr('class','noUseIdx'+a);
	$("#fileupdateflag"+a).val('Y');
	$("#delYn"+a).val('Y');
	$("#seachFile"+a).hide();
	$("#delBrief"+a).hide();
	ognFileNm ="";
	
}

//주간브리프 수정
function update(){
	var updateData = new FormData();
	
	//var FormData = [];
	var upFile = $("#upFile")[0].files[0];
	var briefTitle = $("#briefTitle").val();
	var briefContent = $("#briefContent").val();
	var briefDate = $("#briefDate").val();
	var briefHour = $("#briefHour").val();
	var briefMinute = $("#briefMinute").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var boardNo = $("#boardNo").val();
	
	var fileArr = dataArray[dataArray.length-1];
	
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
	}
	
	if(briefTitle == null || briefTitle == ''){
		alert("제목을 입력해주세요");
		$("#briefTitle").focus();
		return;
	}else if (briefContent == null || briefContent =='' || briefContent == '<div align="" style=""><p><br></p></div>'){
		alert("내용을 입력해주세요");
		$("#briefContent").focus();
		return;
	}
	
	for(var a =0; a< dataArray.length ; a++){
		updateData.append("changeFile"+a , $("#changeFile"+a)[0].files[0]);
		updateData.append("idx"+a, $("#idx"+a).val());
		updateData.append("fileupdateflag"+a, $("#fileupdateflag"+a).val());
		updateData.append("delYn"+a, $("#delYn"+a).val())
		
	}
	for(var j =0; j< fileArray.length ; j++){		
		updateData.append("upFile"+j , $("#upFile"+j)[0].files[0]);
	}

	updateData.append("refIdx", boardNo);
	updateData.append("seqId","INFO_SEQ");
	updateData.append("refType", "BRIEF");
	updateData.append("upFile", upFile);
	updateData.append("stFileNm", stFileNm);	
	updateData.append("filePath", filePath);
	
	//내용
	updateData.append("boardNo", boardNo);
	updateData.append("boardNo", boardNo);
	updateData.append("boardType", "BRIEF");
	updateData.append("briefTitle", briefTitle);
	updateData.append("briefDate", briefDate);
	updateData.append("briefHour", briefHour);
	updateData.append("briefMinute", briefMinute);
	updateData.append("briefContent", briefContent);
	updateData.append("languageType", languageType);
	updateData.append("useYn",useYn);
	//updateData.append("fileArr",fileArr);	
	$.ajax({
		type : 'POST'
		, url : '/admin/briefUpdate.do'
		, enctype : 'multipart/form-data'
		, processData: false /* 필수 */ 
		, contentType: false /* 필수 */
		, type : 'POST'
		, dataType : 'json' //xml,json,local 3형식
		, data : updateData
		, success : function(data){
			location.href = "/admin/openBrief.do";
				
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}





