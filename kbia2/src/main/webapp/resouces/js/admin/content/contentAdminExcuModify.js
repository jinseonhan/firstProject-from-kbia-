$(document).ready(function(){
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	fileViewSetting('file1','upFile', 1, boardType, boardNo);//첨부파일 불러오기
})

//빈값 체크
function inspect(){	
	var rv = true;
	$.each($("[request]"), function(index, item){
		if ($(this).val() == "" || $(this).val() == null){
			$(this).focus();
			alert($(this).attr("msg"));
				
			rv = false;
			return false;
		}
	});	
	return rv;
};

//유효성 검사
function valid(){
	var location_n = $("#loaction_n").val();//변경 순서값
	var location_n_org = $("#loaction_n_org").val();//기존 순서값
	var use_yn = $("input[name='use_yn']:checked").val();
	var use_yn_org = $("#use_yn_org").val();
	//임원 구분 유효성
	if($("#excu_select option:selected").val() == null || $("#excu_select option:selected").val() == ""){
		alert("구분을 선택해주세요.");
		return;
	}
	
	if(inspect()){
		if(location_n != location_n_org && use_yn == 'Y'){
			excuNumChk();
		}else if(use_yn != use_yn_org && location_n == location_n_org){
			excuNumChk();
		}else if(location_n == location_n_org){			
			excuModify();
			updateExcuFile();
		}
	}
}

//순서 중복 확인
function excuNumChk(){
	var location_n = $("#loaction_n").val();//변경 순서값
	var excu_type = $("#excu_select option:selected").val();
	
	var checkData = new FormData();
	checkData.append("excu_type", excu_type);
	checkData.append("location_n", location_n);
	
	//순서 중복 확인
	$.ajax({
		url : '/admin/json/excuNumChk.do',
		type : 'post',
		processData : false,
		contentType : false,
		dataType : 'json',
		data : checkData,
		success : function(data){
			if(data > 0){
				alert("중복된 순서입니다.");
				return;
			}else{
				excuModify();
				updateExcuFile();
			}
		}			
	});
}

//임원 업데이트
function excuModify(){
	if(confirm("수정된 내용을 변경하시겠습니까?")){	
		//임원 컬럼 값
		var boardNo = $("#boardNo").val();
		var excu_type = $("#excu_select option:selected").val();
		var excu_name = $("#excu_name1").val();
		var excu_position = $("#excu_position").val();
		var excu_company = $("#excu_company").val();
		var location_n = $("#loaction_n").val();
		var language = $("input[name='language']:checked").val();
		var use_yn = $("input[name='use_yn']:checked").val();
		
		var registData = new FormData();	
		
		registData.append("boardNo", boardNo);
		registData.append("boardType", "EXCU");
		registData.append("excu_type", excu_type);
		registData.append("excu_name", excu_name);
		registData.append("excu_position", excu_position);
		registData.append("excu_company", excu_company);
		registData.append("location_n", location_n);
		registData.append("language", language);
		registData.append("use_yn", use_yn);
		
		//임원 업데이트
		$.ajax({
			type : 'POST',
			url : '/admin/json/excuModify.do',
			processData : false,
			contentType : false,
			dataType : 'json',
			data : registData,
			success : function(data){
				alert("수정되었습니다.");
				$("#listForm").submit();
			},
			error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
			console.log(msg);
			}
		});
	}	
}

//파일 업데이트
function updateExcuFile() {
	var registData = new FormData();
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1','upFile', registData,'update', true, true);

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
		type : 'POST',
		url : '/admin/json/excuFileUpdate.do',
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		async : false,
		dataType : 'json',
		data : registData,
		success : function(data) {
			
		},
		error : function(request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText + "<br>" + error;
		}
	});	
}

//삭제
function del(){
	$("#fileupdateflag").val("Y");
	var boardNo = $("#boardNo").val();
	var boardType = $("#boardType").val();
	
	if(confirm("삭제 시 삭제하는 데이터는 복구되지 않습니다. 그래도 삭제하시겠습니까?")){
		$.ajax({
			type : 'POST',
			url : '/admin/json/excuDel.do',
			async : false,
			dataType : 'json',
			data : {
				"refIdx" : boardNo,
				"refType" : "EXCU",
				"boardNo" : boardNo,
				"boardType" : "EXCU"
			},
			success : function(data){
				alert("정상적으로 삭제되었습니다.");
				$("#listForm").submit();
			},
			error : function(request, status, error){
				var msg = "ERROR : " + request.status + "<br>"
				msg += + "내용 : " + request.responseText + "<br>" + error;
			}
		});
	}	
	
}

//취소
function cancel(){
	if(confirm("입력된 내용을 저장하지 않고 취소하시겠습니까?")){
		$("#listForm").submit();
	}
}