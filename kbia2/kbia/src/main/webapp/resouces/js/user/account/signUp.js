$(document).ready(function() {
	jQuery("#navi")[0].scrollIntoView();
	
	$("#homeBtn").click(function(){
		location.href = "/main.do";
	});
	
	//앞 이메일 영문 숫자만 되게 처리
	$("#email1").keyup(function(event){ 
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
	    	var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
		}
	});
	//뒷 이메일 영문 숫자 .만 되게 처리
	$("#email2").keyup(function(event){ 
		if ( !((event.keyCode >=37 && event.keyCode<=40) || event.keyCode<=190 ) ) {
	    	var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
		}
	});
	
});

function clickSignUp() {
	var chk01 = $(':radio[name="chk01"]:checked').val(); //첫번째 동의
	var chk02 = $(':radio[name="chk02"]:checked').val(); //두번째 동의
	var chk03 = $(':radio[name="chk03"]:checked').val(); //세번째 동의

	if(chk01 != 'agree' || chk02 != 'agree' || chk03 != 'agree'){
		alert("약관에 동의하지 않은 항목이 있습니다.");
		return;
	}
	
	var email1 = $("input[id='email1']").val(); //이메일아이디
	var email2 = $("input[id='email2']").val(); //호스트
	if(email1 == '' || email1 == null){
		alert("이메일 주소를 입력해주세요.");
		return;
	}
	if(email2 == '' || email2 == null){
		alert("이메일 호스트를 입력해주세요.");
		return;
	}
	var resultEmail = email1 + '@' + email2;
	var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(!regex.test(resultEmail)) {
		alert("이메일 형식에 맞지 않습니다");
		return;
	}

	
	$.ajax({
		type : 'POST'
		, url : '/emailCntChk.do'
		, data : {
			"email" : resultEmail			
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			if(data == 0 ) {
				location.href = "/openSignUp2.do?email="+resultEmail;
			}else{
				alert("이미 존재하는 이메일 입니다.");
			}
		}
	});
}

function clickMain(){
	location.href = "/main.do";
}