var fileArray= [];
var targetArray = [];
var j = 0;
var i = 0;
$(document).ready(function() {
	editArea();
	//취소	
	$("#cancelBtn").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href = "/admin/openBrief.do";		
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

//에디터
function editArea(){
	//에디터영역
	var oEditors = [];
	nhn.husky.EZCreator.createInIFrame({
	    oAppRef: oEditors,
	    elPlaceHolder: "briefContent",  //textarea ID
	    sSkinURI: "/resouces/static/SmartEditor2Skin.html",  //skin경로
	    fCreator: "createSEditor2",
	});
	//저장버튼
	$("#registBtn").click(function(){
		oEditors.getById["briefContent"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터박스에서 값 가져오기
		//oEditors.getById["content"].exec("PASTE_HTML", ["asdfasdf"]);  //에디터박스에 값 불러오기
	});
	
}

function delFile(a){
	alert("삭제하시겠습니까?");
	$("#del"+a).attr('class','useNo');
	fileArray[a] = '';
	$("#upFile"+a).val('');
	$("#row"+a).hide();
	$("#del"+a).hide();
	console.log(fileArray[a]);
}


//주간브리프 등록
function regist(){
	var registData = new FormData();
	//var upFile = $("#upFile")[0].files[0];
	var briefDate = $("#briefDate").val();
	var briefHour = $("#briefHour").val();
	var briefMinute = $("#briefMinute").val();
	var multiFileNo = $("#briefFile").val();
	var languageType = $("input[name='chk01']:checked").val();
	var useYn = $("input[name='chk02']:checked").val();
	var briefTitle = $("#briefTitle").val();
	var content = $("#briefContent").val();
	
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
	
	
	if(briefTitle == '' || briefTitle == null){
		alert("제목을 입력해주세요");
		$("#briefTitle").focus();
		return;
	}
	if(content == '' || content == null ||  content == "<p><br></p>"){
		alert("내용을 입력해주세요");
		$("#briefContent").focus();
		return;
	}
	
	for(var j =0; j< fileArray.length ; j++){		
		registData.append("upFile"+j , $("#upFile"+j)[0].files[0]);
	}
	registData.append("upFile", $("#upFile")[0].files[0]);
	//registData.append("firstfile", firstfile);
	registData.append("seqId", "INFO_SEQ");
	registData.append("boardType", "BRIEF");
	registData.append("briefTitle", briefTitle);
	registData.append("content", content);
	registData.append("multiFileNo", multiFileNo);
	registData.append("briefDate", briefDate);
	registData.append("briefHour", briefHour);
	registData.append("briefMinute", briefMinute);
	registData.append("languageType", languageType);
	registData.append("useYn", useYn);
	
	
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
			location.href = "/admin/openBrief.do";
			//alert("성공");
		}
		, error : function (request, status, error){
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
		}
	});
}
