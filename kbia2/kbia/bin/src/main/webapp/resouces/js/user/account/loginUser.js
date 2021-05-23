$(document).ready(function() {
	// 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
    var key = getCookie("cUserId");
    $("#userId").val(key); 
     
    if($("#userId").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
        $("#chk01").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
    }
     
    $("#chk01").change(function(){ // 체크박스에 변화가 있다면,
        if($("#chk01").is(":checked")){ // ID 저장하기 체크했을 때,
            setCookie("cUserId", $("#userId").val(), 7); // 7일 동안 쿠키 보관
        }else{ // ID 저장하기 체크 해제 시,
            deleteCookie("cUserId");
        }
    });
     
    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
    $("#userId").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
        if($("#chk01").is(":checked")){ // ID 저장하기를 체크한 상태라면,
            setCookie("cUserId", $("#userId").val(), 7); // 7일 동안 쿠키 보관
        }
    });

	$("#signUp").click(function(){
		location.href = "/openSignUp.do";
	});
	$("#findAccount").click(function(){
		location.href = "/openFindAccount.do";
	});
	
});

function clickLogin() {
	
	$.ajax({
		type : 'POST'
		, url : '/loginUserChk.do'
		, data : {
			"userId" : $("input[id='userId']").val()
			, "passwd" :  SHA256($("input[id='passwd']").val())
		}
		, dataType : 'json'//xml,json,local 3형식 
		, success : function(data) {	
		
			if(data == 1 ) {
				location.href = "/main.do";
				
			}else{
				alert("아이디나 비밀번호가 옳지 않습니다.")
			}
		}
	});
}