$(document).ready(function() {
	//전화번호 세팅
	telSetting();
	//비밀번호 정규식
	/*$("#passwd").focusout(function(){
		var passwdReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
		var pw = $("#passwd").val();
		if(false === passwdReg.test(pw)){
			alert('비밀번호는 8자 이상이어야 하며, 숫자/영문/특수문자를 모두 포함해야 합니다.');
			$("#passwd").val("");
		}else{
			$("#passwd2").focus();
		}
	});*/
	//2차비밀번호 확인
	$("#passwd2").focusout(function(){
		var pw = $("#passwd").val();
		var pw2 = $(this).val();
		if(pw == null || pw == '') {
			alert("비밀번호를 먼저 입력해주세요");
			$("#passwd2").val("");
			$("#passwd").focus();
			return;
		}
		if(pw != pw2){
			alert('비밀번호와 일치하지 않습니다.');
			$("#passwd2").val("");
			return;
		}
	});

	//우변번호
	$("#addressBtn").click(function(){
		new daum.Postcode({
	        oncomplete: function(data) {
	            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
	            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
				$("#addressNo").val(data.zonecode);
				$("#address").val(data.address);
	        }
   		}).open();
	});
	
	//회원수정
	$("#btnUpdate").click(function(){
		accountUpdate();
	});
	//취소
	$("#btnCancel").click(function(){
		location.href = "/main.do";
	});
	//탈퇴
	$("#btnDelete").click(function(){
		location.href = "/openSecession.do";
	});
	
});
//최초 전화번호세팅
function telSetting(){
	var homeTel = $("#homeTel").val();
	var workTel = $("#workTel").val();
	var perTel = $("#perTel").val();
	//집전화번호 세팅
	if(homeTel != null && homeTel != ""){
		var telLeng = homeTel.length;
		var startStr = homeTel.substring(0,2);
		var homeTel1 = "";
		var homeTel2 = "";
		var homeTel3 = "";
		if(startStr == "02"){
			homeTel1 = startStr;
			if(telLeng == 10){ //02에 총 번호가 10자리일때
				homeTel2 = homeTel.substring(2,6);
				homeTel3 = homeTel.substring(6,10);
			}else{
				homeTel2 = homeTel.substring(2,5);
				homeTel3 = homeTel.substring(5,9);
			}
		}else{
			startStr = homeTel.substring(0,3);
			homeTel1 = startStr;
			if(telLeng == 11){
				homeTel2 = homeTel.substring(3,7);
				homeTel3 = homeTel.substring(7,11);
			}else{
				homeTel2 = homeTel.substring(3,6);
				homeTel3 = homeTel.substring(6,10);
			}
		}
		$("#homeTelSpan").html(homeTel1);
		$("#homeTel1").val(homeTel1).attr("selected", "selected");
		$("#homeTel2").val(homeTel2);
		$("#homeTel3").val(homeTel3);
	}
	//직장 전화번호 세팅
	if(workTel != null && workTel != ""){
		var telLeng = workTel.length;
		var startStr = workTel.substring(0,2);
		var workTel1 = "";
		var workTel2 = "";
		var workTel3 = "";
		if(startStr == "02"){
			workTel1 = startStr;
			if(telLeng == 10){ //02에 총 번호가 10자리일때
				workTel2 = workTel.substring(2,6);
				workTel3 = workTel.substring(6,10);
			}else{
				workTel2 = workTel.substring(2,5);
				workTel3 = workTel.substring(5,9);
			}
		}else{
			startStr = homeTel.substring(0,3);
			workTel1 = startStr;
			if(telLeng == 11){
				workTel2 = workTel.substring(3,7);
				workTel3 = workTel3.substring(7,11);
			}else{
				workTel2 = workTel.substring(3,6);
				workTel3 = workTel.substring(6,10);
			}
		}
		$("#workTelSpan").html(workTel1);
		$("#workTel1").val(workTel1).attr("selected", "selected");
		$("#workTel2").val(workTel2);
		$("#workTel3").val(workTel3);
	}
	//휴대폰 전화번호 세팅
	if(perTel != null && perTel != ""){
		var telLeng = perTel.length;
		var perTel1 = perTel.substring(0,3);
		var perTel2 = "";
		var perTel3 = "";
		if(telLeng == 11){ 
			perTel2 = perTel.substring(3,7);
			perTel3 = perTel.substring(7,11);
		}else{
			perTel2 = perTel.substring(3,6);
			perTel3 = perTel.substring(6,10);
		}
		
		$("#perTelSpan").html(perTel1);
		$("#perTel1").val(perTel1).attr("selected", "selected");
		$("#perTel2").val(perTel2);
		$("#perTel3").val(perTel3);
	}
}

function accountUpdate() {
	var workTel = $("#workTel1 option:selected").val() + $("#workTel2").val() + $("#workTel3").val();
	if($("#workTel2").val()==null || $("#workTel2").val() == "" || $("#workTel3").val()==null || $("#workTel3").val() == ""){
		workTel = null;
	}
	var passwd = null;
	if($("#passwd").val() != '' && $("#passwd").val() != null){
		passwd = SHA256($("#passwd").val());
	}
	var resultData = {
		"userId": $("#userId").val()
		,"passwd": passwd
		,"userNm": $("#userNm").val()
		,"workTypeNm": $("#workTypeNm").val()
		,"positionNm": $("#positionNm").val()
		,"workAddr": $("#workAddr").val()
		,"homeTel": $("#homeTel1 option:selected").val() + $("#homeTel2").val() + $("#homeTel3").val()
		,"workTel": workTel
		,"perTel": $("#perTel1 option:selected").val() + $("#perTel2").val() + $("#perTel3").val()
		,"email": $("#email").text()
		,"address": $("#address").val()
		,"addressNo": $("#addressNo").val()
		,"addressDtl": $("#addressDtl").val()
	}
	$.ajax({
		type : 'POST'
		, url : '/userAccountUpdate.do'
		, data : resultData
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			alert("수정되었습니다.");
			//location.href = "/main.do";
		}
	});
}

