$(document).ready(function() {
	jQuery("#navi")[0].scrollIntoView();

	//아이디 중복확인
	$("#redupBtn").click(function(){
		clickIdChk();
	});
	//희망아이디 엔터키
	$("#userId").keydown(function(key) {
		if (key.keyCode == 13) {
			clickIdChk();
		}
	});
	//유저아이디 영문 숫자만 되게 처리
	$("#userId").keyup(function(event){ 
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
	    	var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
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
	
	//회원가입
	$("#signUpBtn").click(function(){
		var idchk = $("#idChk").val();
		if(idchk != 'ok') {
			alert("아이디 중복확인이 필요합니다.");
			return false;
		}
		var valid = validChk();
		if(valid){
			var conf = confirm("회원가입 하시겠습니까?");
			if(conf == true){
				signUp();
			}
		}
		
	});
	
});

function clickIdChk() {
	var id = $("#userId").val();
	if(id == null || id == ''){
		alert("아이디를 입력하세요.");
		return;
	}
	var idReg = /^[A-Za-z0-9+]{3,20}$/; 
	if(false === idReg.test(id)){
		alert('아이디는 숫자/영문로만 이루어져야 합니다.(3자 이상)');
		$("#userId").val("");
		return false;
	}
	$.ajax({
		type : 'POST'
		, url : '/idCntChk.do'
		, data : {
			"userId" : id			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			console.log(data);
			if(data == 1 ) {
				alert("이미 존재하는 아이디 입니다.");
				$("#idChk").val("none")
			}else{
				alert("사용가능 한 아이디 입니다.");
				$("#idChk").val("ok")
			}
		}
	});
}

function validChk() {
	var id = $("#userId").val();
	if(id == null || id == ''){
		alert("아이디를 입력하세요.");
		return false;
	}
	//아이디 정규식
	var idReg = /^[A-Za-z0-9+]{3,20}$/; 
	if(false === idReg.test(id)){
		alert('아이디는 숫자/영문로만 이루어져야 합니다.(3자 이상)');
		$("#userId").val("");
		return false;
	}
	if(!maxLengthCheck("userId", '아이디', 20)){
		return false;
	}
	var passwd = $("#passwd").val();
	if(passwd == null || passwd == ''){
		alert("비밀번호를 입력하세요.");
		return false;
	}
	//비밀번호 정규식
	var passwdReg = /^(?=.*[a-zA-z])(?=.*[0-9]).{8,16}$/;
	var pw = $("#passwd").val();
	if(false === passwdReg.test(pw)){
		alert('비밀번호는 8자 이상이어야 하며, 숫자/영문를 모두 포함해야 합니다.');
		$("#passwd").val("");
		return false;
	}
	
	var passwd2 = $("#passwd2").val();
	if(passwd2 == null || passwd2 == ''){
		alert("2차 비밀번호를 확인하세요.");
		return false;
	}
	//2차비밀번호 확인
	var pw = $("#passwd").val();
	var pw2 = $("#passwd2").val();
	if(pw != pw2){
		alert('비밀번호와 일치하지 않습니다.');
		$("#passwd2").val("");
		return false;
	}

	if(!maxLengthCheck("passwd", '비밀번호', 20)){
		return false;
	}
	var userNm = $("#userNm").val();
	if(userNm == null || userNm == ''){
		alert("이름를 입력하세요.");
		return false;
	}
	if(!maxLengthCheck("userNm", '이름', 25)){
		return false;
	}
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
	
	if(!maxLengthCheck("userNm", '이름', 25)){
		return false;
	}
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
	
	
	return true;
}

function signUp() {
	var workTel = $("#workTel1 option:selected").val() + $("#workTel2").val() + $("#workTel3").val();
	if($("#workTel2").val()==null || $("#workTel2").val() == "" || $("#workTel3").val()==null || $("#workTel3").val() == ""){
		workTel = null;
	}
	var resultData = {
		"userId": $("#userId").val()
		,"passwd": SHA256($("#passwd").val())
		,"userNm": $("#userNm").val()
		,"workTypeNm": $("#workTypeNm").val()
		,"positionNm": $("#positionNm").val()
		,"workAddr": $("#workAddr").val()
		,"author": "U1"
		,"homeTel": $("#homeTel1 option:selected").val() + $("#homeTel2").val() + $("#homeTel3").val()
		,"workTel": workTel
		,"perTel": $("#perTel1 option:selected").val() + $("#perTel2").val() + $("#perTel3").val()
		,"email": $("#email").text()
		,"address": $("#address").val()
		,"addressNo": $("#addressNo").val()
		,"addressDtl": $("#addressDtl").val()
		,"useYn": "Y"
	}
	$.ajax({
		type : 'POST'
		, url : '/userSignUp.do'
		, data : resultData
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			location.href = "/openSignUp3.do";
		}
	});
}