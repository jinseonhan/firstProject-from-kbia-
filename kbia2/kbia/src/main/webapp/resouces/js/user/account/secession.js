$(document).ready(function() {
	
	
});

function clickSecession() {
	if($("#session_userId").val() != $("#userId").val()){
		alert("아이디가 일치하지 않습니다.");
		return;
	}
	$.ajax({
		type : 'POST'
		, url : '/secession.do'
		, data : {
			"userId" : $("input[id='userId']").val()
			, "passwd" :  SHA256($("input[id='passwd']").val())
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
			if(data == 1 ) {
				alert("탈퇴되었습니다.");
				location.href = "/main.do";
			}else{
				alert("아이디나 비밀번호가 옳지 않습니다.");
			}
		}
	});
}


function clickMain(){
	location.href = "/main.do";
}