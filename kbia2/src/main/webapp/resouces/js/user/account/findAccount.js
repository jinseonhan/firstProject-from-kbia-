$(document).ready(function() {
	//자동완성기능
    var availableCity = ["naver.com","gmail.com","daum.net"];
    $("#idEmail2, #pwEmail2").autocomplete({
        source: availableCity,
        select: function(event, ui) {
        },
        focus: function(event, ui) {
            return false;
        }
    });

	$("#btnFindId").click(function(){
		var idNm = $("#idNm").val(); //아이디찾기 이름
		if(idNm == '' || idNm == null){
			alert("이름을 입력해주세요.");
			return;
		}
		var email1 = $("input[id='idEmail1']").val(); //이메일아이디
		var email2 = $("input[id='idEmail2']").val(); //호스트
		if(!emailChk(email1,email2)){
			return;
		}
		$.ajax({
			type : 'POST'
			, url : '/findAccount.do'
			, data : {
				"userNm" : idNm,	
				"email" : email1 + '@' + email2	,
				"gubun" : "id"	
			}
			, dataType : 'json'//xml,json,local 3형식 
			, success : function(data) {	
				console.log(data);
				if(data != null ) {
					location.href = "/openResultFindAccount.do";
				}else{
					alert("이름과 이메일을 확인해 주세요.");
				}
			}
		});
	});
	
	$("#btnFindPw").click(function(){
		var pwNm = $("#pwNm").val(); //비밀번호찾기 이름
		if(pwNm == '' || pwNm == null){
			alert("이름을 입력해주세요.");
			return;
		}
		var email1 = $("input[id='pwEmail1']").val(); //비밀번호 찾기 이메일아이디
		var email2 = $("input[id='pwEmail2']").val(); //비밀번호 찾기 호스트
		if(!emailChk(email1,email2)){
			return;
		}
		var pwId = $("#pwId").val(); //비밀번호 찾기 아이디
		if(pwId == '' || pwId == null){
			alert("이름을 입력해주세요.");
			return;
		}
		
		$.ajax({
			type : 'POST'
			, url : '/findAccount.do'
			, data : {
				"userNm" : pwNm,	
				"userId" : pwId,
				"email" : email1 + '@' + email2	,
				"gubun" : "pw"	
			}
			, dataType : 'json'//xml,json,local 3형식 
			, success : function(data) {	
				console.log(data);
				if(data != null ) {
					location.href = "/openResultFindAccount.do";
				}else{
					alert("이름과 이메일,아이디를 확인해 주세요.");
				}
			}
		});
	});
});

function emailChk(email1,email2) {
	
	if(email1 == '' || email1 == null){
		alert("이메일 주소를 입력해주세요.");
		return false;
	}
	if(email2 == '' || email2 == null){
		alert("이메일 호스트를 입력해주세요.");
		return false;
	}
	var resultEmail = email1 + '@' + email2;
	var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(!regex.test(resultEmail)) {
		alert("이메일 형식에 맞지 않습니다");
		return false;
	}
	return true;
}
