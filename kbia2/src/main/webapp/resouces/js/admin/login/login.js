$(document).ready(function() {
	$("#userId").keydown(function(key) {
		if (key.keyCode == 13) {
			login();
		}
	});	
	$("#passwd").keydown(function(key) {
		if (key.keyCode == 13) {
			login();
		}
	});	

	$("#loginBtn").click(function() {
		login();
	});
});

function login(){
	$.ajax({
			type : 'POST'
			, url : '/admin/loginChk.do'
			, data : {
				"userId" : $("input[id='userId']").val()
				, "passwd" : SHA256($("input[id='passwd']").val())
			}
			, dataType : 'json'//xml,json,local 3형식 
			, success : function(data) {	
				if(data == 1 ) {
					location.href = "/admin/openAccount.do";
				}else{
					alert("아이디나 비밀번호가 옳지 않습니다.")
				}
			}
		});
}