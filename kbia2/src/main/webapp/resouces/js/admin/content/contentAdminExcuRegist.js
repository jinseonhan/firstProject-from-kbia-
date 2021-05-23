$(document).ready(function(){
	
	//fileDivId, 파일위치, 넣을파일 갯수(첨부파일 칸 생성)
	fileViewSetting('file1','upFile', 1);
	
});

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
	//임원 구분 유효성
	if($("#excu_select option:selected").val() == null || $("#excu_select option:selected").val() == ""){
		alert("구분을 선택해주세요.");
		return;
	}
	
	if(inspect()){
		excuNumChk();
	}
}

//순서 중복 확인
function excuNumChk(){
	var location_n = $("#loaction_n").val();
	var use_yn = $("input[name='use_yn']:checked").val();
	var excu_type = $("#excu_select option:selected").val();
	
	var checkData = new FormData();
	checkData.append("excu_type", excu_type);
	checkData.append("location_n", location_n);
	
	//순서 중복 확인
	if(use_yn == 'Y'){
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
					excuReg();
				}
			}			
		});
	}else{
		excuReg();
	}
}

//임원 등록
function excuReg(){	
	//임원 컬럼 값
	var excu_type = $("#excu_select option:selected").val();
	var excu_name = $("#excu_name").val();
	var excu_position = $("#excu_position").val();
	var excu_company = $("#excu_company").val();
	var location_n = $("#loaction_n").val();
	var language = $("input[name='language']:checked").val();
	var use_yn = $("input[name='use_yn']:checked").val();
	var userId = $("#sessionUserId").val(); //headerJSP 사용자명
	
	var registData = new FormData();
	
	//fileDivId, 파일위치, FormData명, 세팅되는 파라메터 수, insert/updqte 상태, 파일필수값 체크, 파일이미지 체크
	var insertChk1 = fileParamSetting('file1','upFile',registData,'insert',true,true);		
	if(insertChk1 != true)return;
	
	registData.append("seqId", "CONTENT_SEQ");
	registData.append("boardType", "EXCU");
	registData.append("refType", "EXCU");
	registData.append("createId", userId);
	registData.append("excu_type", excu_type);
	registData.append("excu_name", excu_name);
	registData.append("excu_position", excu_position);
	registData.append("excu_company", excu_company);
	registData.append("location_n", location_n);
	registData.append("language", language);
	registData.append("use_yn", use_yn);
	
	//임원 등록
	$.ajax({
		type : 'POST',
		url : '/admin/json/excuReg.do',
		processData : false,
		contentType : false,
		dataType : 'json',
		data : registData,
		success : function(data){
			alert("등록되었습니다.");
			window.location.href = "/admin/excuList.do";
		},
		error: function (request, status, error) {
		var msg = "ERROR : " + request.status + "<br>"
		msg += + "내용 : " + request.responseText + "<br>" + error;
		console.log(msg);
		}
	});	
}

//취소
function cancel(){
	confirm("해당내용을 저장하지 않고 리스트로 돌아값니다.");
	if(confirm){
	location.href = "/admin/excuList.do";
	}
}