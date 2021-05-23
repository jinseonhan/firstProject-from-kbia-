$(document).ready(function() {
	selectUserDtl();
	
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
	//목록
	$("#listBtn").click(function(){
		location.href="/admin/openAccount.do";
	});
	//수정
	$("#updateBtn").click(function(){
		
		if(validChk()){ //필수값체크
			var conf = confirm("수정하시겠습니까?");
			if(conf == true){
				$.ajax({
					type : 'POST'
					, url : '/admin/userAccountUpdate.do'
					, data : {
						"userId": $("#userId").val()
						,"passwd": null
						,"author": $("input[type=radio][name=author]:checked").val()
						,"userNm": $("#userNm").val()
						,"workTypeNm": $("#workTypeNm").val()
						,"positionNm": $("#positionNm").val()
						,"workAddr": $("#workAddr").val()
						,"homeTel": $("#homeTel1 option:selected").val() + $("#homeTel2").val() + $("#homeTel3").val()
						,"workTel": $("#workTel1 option:selected").val() + $("#workTel2").val() + $("#workTel3").val()
						,"perTel": $("#perTel1 option:selected").val() + $("#perTel2").val() + $("#perTel3").val()
						,"email": $("#email1").val() + '@' + $("#email2").val()
						,"address": $("#address").val()
						,"addressNo": $("#addressNo").val()
						,"addressDtl": $("#addressDtl").val()
					}
					, dataType : 'json'//xml,json,local 3형식 
					, success : function(data) {	
						alert("저장되었습니다.");
						location.href="/admin/openAccount.do";
						
					}
				});
			}//if end
		}
	});
	//비밀번호 초기화
	$("#btnFindPw").click(function(){
		var conf = confirm("초기화시키겠습니까?");
		if(conf == true){
			var userId = $("#userId").val();
			$.ajax({
				type : 'POST'
				, url : '/admin/findAccount.do'
				, async: false
				, data : {
					"userId": userId
				}
				, dataType : 'json'//xml,json,local 3형식 
				, success : function(data) {	
					if(data != null ) {
						passwdChange(data.tempPasswd);
					}
				}
			});
		}//if end
	});
	
	//휴먼해지
	$("#useYnUpdate").click(function(){
		var userId = $("#userId").val();
		$.ajax({
				type : 'POST'
				, url : '/admin/useYnUpdate.do'
				, async: false
				, data : {
					"userId": userId
				}
				, dataType : 'json'//xml,json,local 3형식 
				, success : function(data) {	
					alert("휴먼해지되었습니다.");
				}
			});
	});
	
	//삭제
	$("#secession").click(function(){
		var conf = confirm("탈퇴하시겠습니까?");
		if(conf == true){
			var userId = $("#userId").val();
			$.ajax({
					type : 'POST'
					, url : '/admin/secession.do'
					, async: false
					, data : {
						"userId": userId
					}
					, dataType : 'json'//xml,json,local 3형식 
					, success : function(data) {	
						alert("회원탈퇴되었습니다.");
						location.href="/admin/openAccount.do";
					}
			});
		}//end if
	});
});

function passwdChange(passwd) {
	var resultData = {
		"userId": $("#userId").val()
		,"passwd":  SHA256(passwd)
	}
	$.ajax({
		type : 'POST'
		, url : '/admin/userAccountUpdate.do'
		, data : resultData
		, async: false
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			alert("해당 유저 이메일로 발송하였습니다.");
		}
	});
}
//기존값세팅
function selectUserDtl() {
	var userId=$("#userId").val();

	$.ajax({
		type : 'POST'
		, url : '/admin/accountUserDtl.do'

		, data : {
			"userId" : userId
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			$('input:radio[name="author"]').each(function() {
			     if(this.value == data.author){ //값 비교
			         this.checked = true; //checked 처리
			      }
			});
			$("#author").val(data.author).attr("selected", "selected");
			$("#userNm").html(data.userNm);
			var email = data.email;
			var n = email.indexOf("@");
			var email1 = email.substring(0,n);
			var email2 = email.substring(n+1,email.length);
			$("#email1").val(email1);
			$("#email2").val(email2);
			telSetting(data.homeTel, data.workTel, data.perTel);
			$("#addressNo").val(data.addressNo);
			$("#address").val(data.address);
			$("#addressDtl").val(data.addressDtl);
			$("#workTypeNm").val(data.workTypeNm);
			$("#workAddr").val(data.workAddr);
			$("#positionNm").val(data.positionNm);
			$("#useYn").html(data.useYn);
			$("#createDate").html(data.formCreateDate);
		}
	});
}

//최초 전화번호세팅
function telSetting(homeTel,workTel,perTel){

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

function validChk() {
	
	/* 요즘 집전화번호 잘쓰나? 글쎄요..
	var homeTel2 = $("#homeTel2").val();
	var homeTel3 = $("#homeTel3").val();
	if(homeTel2 == null || homeTel2 == '' || homeTel3 == null || homeTel3 == ''){
		alert("전화번호를 입력하세요.");
		return false;
	}
	 
	var perTel2 = $("#perTel2").val();
	var perTel3 = $("#perTel3").val();
	if(perTel2 == null || perTel2 == '' || perTel3 == null || perTel3 == ''){
		alert("휴대폰번호를 입력하세요.");
		return false;
	}
	*/
	var addressNo = $("#addressNo").val();
	var address = $("#address").val();
	var addressDtl = $("#addressDtl").val();
	if(addressNo == null || addressNo == ''){
		alert("우편번호를 입력하세요.");
		return false;
	}
	if(!maxLengthCheck("addressNo", '우편번호', 10)){
		return false;
	}
	if(address == null || address == ''){
		alert("주소를 입력하세요.");
		return false;
	}
	if(!maxLengthCheck("address", 'wnth', 100)){
		return false;
	}
	if(addressDtl == null || addressDtl == ''){
		alert("상세주소를 입력하세요.");
		return false;
	}
	if(!maxLengthCheck("addressDtl", '상세주소', 150)){
		return false;
	}
	var workAddr = $("#workAddr").val();
	if(workAddr==null|| workAddr==''){
		alert("근무처를 입력하세요.");
		return false;
	}
	var email1 = $("#email1").val();
	var email2 = $("#email2").val();
	if(email1==null|| email1==''||email2==null|| email2==''){
		alert("이메일을 입력하세요.");
		return false;
	}
	
	
	return true;	
}
