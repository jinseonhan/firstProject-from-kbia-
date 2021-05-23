$(document).ready(function(){
	inputInit();
	
	/*수정 버튼*/
	$("#btnModify").click(function(){
		var cflag = confirm("수정된 내용을 변경하시겠습니까?");
		var vflag = validate();
		if(cflag && vflag){
			chkLocationN();
		}
	})
	
	/*취소 버튼*/
	$("#btnCancel").click(function(){
		if( confirm("입력된 내용을 저장하지 않고 취소하시겠습니까?") ){
			moveOrganList();
		}
	})
	
	/*삭제 버튼*/
	$("#btnDelete").click(function(){
		var flag = confirm("삭제 시 삭제한 데이터는 복구되지 않습니다. 그래도 삭제하시겠습니까?");
		if(flag){
			organDelete();
		}
	})
	
	/*전화번호 형식 변경*/
	$("#phone").change(function(){
		$("#phone").val(convertPhone());
	})
})

/* select, radio init*/
function inputInit(){
	var groupCode = $("#getGroupCode").val();
	var locationN = $("#getLocationN").val();
	var languageType = $("#getLanguageType").val();
	var useYn = $("#getUseYn").val();
	var createId = $("#getCreateId").val();
	var updateDate = $("#getUpdateDate").val();
	updateDate = updateDate.substring(0, 4) + "-" + updateDate.substring(4, 6) + "-" + updateDate.substring(6, 8);
	
	$("#groupSelect").siblings("select").val(groupCode);
	$("#locationNo").val(locationN);
	$("input[type=radio][name=lang][value=" + languageType + "]").prop("checked", true);
	$("input[type=radio][name=useYn][value=" + useYn + "]").prop("checked", true);
	$("#regInfo").html(createId + " / " + updateDate);
	
}

/*수정하기*/
function organModify(){
	var regData = new FormData();
	var boardNo = $("#getBoardNo").val();
	var boardType = $("#getBoardType").val();
	var groupCode = $("#groupSelect").siblings("select").val();
	var name = $("#name").val();
	var position = $("#position").val();
	var task = $("#task").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var locationN = $("#locationNo").val();
	var lang = $("input[type=radio][name=lang]:checked").val();
	var useYn = $("input[type=radio][name=useYn]:checked").val();
	
	regData.append("boardNo", boardNo);
	regData.append("boardType", boardType)
	regData.append("groupCode", groupCode);
	regData.append("name", name);
	regData.append("position", position);
	regData.append("task", task);
	regData.append("phone", phone);
	regData.append("email", email);
	regData.append("locationN", locationN);
	regData.append("lang", lang);
	regData.append("useYn", useYn);
	
	$.ajax({
		url : "/admin/organModify.do"
		, type : "post"
		, dataType : "json"
		, processData: false 
		, contentType: false 
		, data : regData
		, success : function(data){
			if( data > 0 ){
				alert("수정됐습니다.");
				moveOrganList();
			}
		}
	})
}

/*노출순서 사용여부 확인*/
function chkLocationN(){
	var groupCode = $("#groupSelect").siblings("select").val();
	var locationN = $("#locationNo").val();
	var getLocN = $("#getLocationN").val();
	
	$.ajax({
		url : "/admin/organLocChk.do"
		, type : "post"
		, dataType : "json"
		, data : {
			groupCode : groupCode
			, locationN : locationN
		}
		, success : function(data){
			if( locationN == getLocN ){
				organModify();
			} else if( data ){
				organModify();
			} else {
				alert("이미 사용중인 노툴순서입니다.");
			}
		}
	})
}

/*조직도 삭제*/
function organDelete(){
	var boardNo = $("#getBoardNo").val();
	var boardType = $("#getBoardType").val();
	
	$.ajax({
		url : "/admin/organDelete.do"
		, type : "post"
		, dataType : "json"
		, data : {
			boardNo : boardNo
			, boardType : boardType
		}
		, success : function(data){
			if( data > 0 ){
				alert("삭제됐습니다.");
				moveOrganList();
			}
		}
	})
}


/*조직도 리스트로 이동*/
function moveOrganList(){
	var stDate = $("#searchStDate").val();
	var enDate = $("#searchEnDate").val();
	var name = $("#searchName").val();
	var useYn = $("#searchUseYn").val();
	var lang = $("#searchLang").val();
	
	var form = $("<form></form>");
	form.attr("action", "/admin/moveOrganList.do");
	form.attr("method", "post");
	form.append("<input type='hidden' name='stDate' value='" + stDate + "'>");
	form.append("<input type='hidden' name='enDate' value='" + enDate + "'>");
	form.append("<input type='hidden' name='name' value='" + name + "'>");
	form.append("<input type='hidden' name='useYn' value='" + useYn + "'>");
	form.append("<input type='hidden' name='lang' value='" + lang + "'>");
	form.appendTo("body");
	form.submit();
}

/*유효성 검사*/
function validate(){
	
	var groupCode = $("#groupSelect").siblings("select").val();
	var name = $("#name").val();
	var position = $("#position").val();
	var task = $("#task").val();
	var phone = $("#phone").val();
	phone = phone.replaceAll("-", "");
	var chkNum = /^[0-9]*$/;
	var email = $("#email").val();
	var chkEmail = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
	
	if( groupCode == "" ){
		alert("부서를 선택해주세요.");
		return false;
	} else if( name == "" ){
		alert("이름을 입력해주세요.");
		$("#name").focus();
		return false;
	} else if( position == "" ){
		alert("직책을 입력해주세요.");
		$("#position").focus();
		return false;
	} else if( task == "" ){
		alert("업무를 입력해주세요.");
		$("#task").focus();
		return false;1
	} else if( phone != "" &&  (!chkNum.test(phone) || (phone.length < 9 || phone.length > 11)) ){
		alert("전화번호는 숫자와 -만 입력 할 수 있습니다.");
		$("#phone").focus();
		return false;
	} else if( email != "" && !chkEmail.test(email) ){
		alert("이메일 형식은 example@example.xx 여야합니다.");
		$("#email").focus();
		return false;
	}
	
	return true;
}

/*전화번호 형식 수정*/
function convertPhone(){
	var phone = $("#phone").val();
	phone = phone.replaceAll("-", "");
	if( phone.indexOf(2) != 1 ){
		if( phone.length == 10 ){
			phone = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10);
		} else if( phone.length == 11 ){
			phone = phone.substring(0, 3) + "-" + phone.substring(3, 7) + "-" + phone.substring(7, 11);
		}
	} else {
		if( phone.length == 9 ){
			phone = phone.substring(0, 2) + "-" + phone.substring(2, 5) + "-" + phone.substring(5, 9);
		} else if( phone.length == 10 ){
			phone = phone.substring(0, 2) + "-" + phone.substring(2, 6) + "-" + phone.substring(6, 10);
		}	
	}
	return phone;
}