$(document).ready(function(){
	
	/*등록 버튼*/
	$("#registBtn").click(function(){
		var flag = validate();
		if( flag ){
			var groupCode = $("#groupSelect").siblings("select").val();
			if( groupCode != "VCHAIRMAN" && groupCode != "GENERAL" ){
				chkLocationN();
			} else {
				chkHigher();
			}
		}
	})
	
	/*취소 버튼*/
	$("#btnCancel").click(function(){
		moveOrganList();
	})
	
	/*전화번호 형식 변경*/
	$("#phone").change(function(){
		$("#phone").val(convertPhone());
	})
})

/*등록*/
function organReg(){
	var regData = new FormData();
	var createId = $("#sessionUserId").val();
	var groupCode = $("#groupSelect").siblings("select").val();
	var name = $("#name").val();
	var position = $("#position").val();
	var task = $("#task").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var locationNo = $("#locationNo").val();
	var lang = $("input[type=radio][name=lang]:checked").val();
	var useYn = $("input[type=radio][name=useYn]:checked").val();
	
	regData.append("seqId", "CONTENT_SEQ");
	regData.append("createId", createId);
	regData.append("groupCode", groupCode);
	regData.append("name", name);
	regData.append("position", position);
	regData.append("task", task);
	regData.append("phone", phone);
	regData.append("email", email);
	regData.append("locationNo", locationNo);
	regData.append("lang", lang);
	regData.append("useYn", useYn);
	
	$.ajax({
		url : "/admin/organReg.do"
		, type : "post"
		, dataType : "json"
		, processData: false 
		, contentType: false 
		, data : regData
		, success : function(data){
			if( data > 0 ){
				alert("등록됐습니다.");
				moveOrganList();
			}
		}
	})
}

/*노출순서 사용여부 확인*/
function chkLocationN(){
	var groupCode = $("#groupSelect").siblings("select").val();
	var locationN = $("#locationNo").val();
	
	$.ajax({
		url : "/admin/organLocChk.do"
		, type : "post"
		, dataType : "json"
		, data : {
			groupCode : groupCode
			, locationN : locationN
		}
		, success : function(data){
			if( data ){
				organReg();
			} else {
				alert("이미 사용중인 노툴순서입니다.");
			}
		}
	})
}

/*부회장 / 부이사장, 상무 / 사무국장 중복 체크*/
function chkHigher(){
	var groupCode = $("#groupSelect").siblings("select").val();
	$.ajax({
		url : "/admin/chkHigher.do"
		, type : "post"
		, dataType : "json"
		, data : {
			groupCode : groupCode
		}
		, success : function(data){
			if( data ){
				organReg();
			} else {
				if( groupCode == "VCHAIRMAN" ){
					alert("부회장 / 부이사장은 한명만 등록 할 수 있습니다.");
				} else if( groupCode == "GENERAL" ){
					alert("상무 / 사무국장은 한명만 등록 할 수 있습니다."); 
				}
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
	var locationN = $("#locationNo").val();
	
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
	phone = phone.replace(/\-/g, "");
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