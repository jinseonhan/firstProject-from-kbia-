$(document).ready(function() {
	// 체크 확인
	$("thead input[name='chk']").on('click',function(){
		var value=$(this).val();
		var chked=$(this).is(":checked");
	
		authorChk(value,chked);
	});
	// tbody 체크 확인
	$("#tbody input[name='chk']").on('click',function(){
		var Bvalue=$(this).val().substr(0,1);
		var chked=$(this).is(":checked");
	
		chkDel(Bvalue,chked);
	});
	//취소 버튼
	$("#btnCancel").click(function(){
		if(confirm("해당 내용을 저장하지 않고 리스트로 돌아갑니다.") == true){	
			location.href="/admin/openAccountListAUser.do";
		}else{
			return false;
		}
		
	});
	
	// 저장 버튼
	$("#btnUpdate").click(function(){
		save();
	});
	
	// 전체 선택 , 해제 버튼 이벤트

	
});

// 데이터 저장
function save(){
	if(validChk()){ //필수값체크
			var conf = confirm("등록하시겠습니까?");
			if(conf == true){
				var createId=$("#sessionUserId").val();
				var author; // 권한 받아 입력하기
				var checkBoxArr = [];
				$("tbody input[name='chk']:checked").each(function(i){
					checkBoxArr.push($(this).val());
				});
				// 권한 유효성 체크
				if(checkBoxArr[0]==null){
					alert("권한을 최소 1개 선택해주세요.");
					return false;
				}
				// checkBoxArr에 담긴 값을 ','구분자로 잇기
				for(var i=0;i<checkBoxArr.length;i++){
					if(i==0){
						author=checkBoxArr[i];
					}else{
						author+= ","+checkBoxArr[i];
					}
					
				}
				
				$.ajax({
					type : 'POST'
					, url : '/admin/AUserSignUp.do'
					, data : {
						"adminId": $("#adminId").val()
						,"passwd": SHA256($("#passwd2").val())
						,"userNm": $("#userNm").val()
						,"workTel": $("#workTel").val()
						,"perTel": $("#perTel").val()
						,"email": $("#email1").val() + '@' + $("#email2").val()
						,"workAddr": $("#workAddr").val()
						,"author": author
					}
					, dataType : 'json'//xml,json,local 3형식 
					, success : function(data) {
						if(data==1){
							alert("저장되었습니다.");
							location.href="/admin/openAccountListAUser.do";
						}else{
							alert("회원 등록실패!\n 관리자에게 문의해주세요!");
						}
					}
				});
			}//if end
		}
}

function validChk() {
	var workTel = $("#workTel").val();
	var workAddr= $("#workAddr").val();
	
	var id = $("#adminId").val();
	if(id == null || id == ''){
		alert("아이디를 입력하세요.");
		return false;
	}
	//아이디 정규식
	var idReg = /^[A-Za-z0-9+]{3,20}$/; 
	if(false === idReg.test(id)){
		alert('아이디는 숫자/영문로만 이루어져야 합니다.(3자 이상)');
		$("#adminId").val("");
		return false;
	}
	if(!maxLengthCheck("adminId", '아이디', 20)){
		return false;
	}
	var passwd = $("#passwd1").val();
	if(passwd == null || passwd == ''){
		alert("비밀번호를 입력하세요.");
		return false;
	}
	// 아이디와 비밀번호르 다르게
	if(passwd ==$("#adminId").val()){
		alert("아이디와 비밀번호를 다르게 설정해 주세요.");
		return false;
	}
	//비밀번호 정규식
	var passwdReg = /^(?=.*[a-zA-z])(?=.*[0-9]).{6,16}$/;
	var pw = $("#passwd1").val();
	if(false === passwdReg.test(pw)){
		alert('비밀번호는 6자 이상이어야 하며, 숫자/영문를 모두 포함해야 합니다.');
		$("#passwd1").val("");
		return false;
	}
	
	var passwd2 = $("#passwd2").val();
	if(passwd2 == null || passwd2 == ''){
		alert("2차 비밀번호를 확인하세요.");
		return false;
	}
	//2차비밀번호 확인
	var pw = $("#passwd1").val();
	var pw2 = $("#passwd2").val();
	if(pw != pw2){
		alert('비밀번호와 일치하지 않습니다.');
		$("#passwd2").val("");
		return false;
	}

	if(!maxLengthCheck("passwd1", '비밀번호', 20)){
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
	
	 
	var perTel = $("#perTel").val();
	if(perTel == null || perTel == ''){
		alert("휴대폰번호를 입력하세요.");
		return false;
	}
	
	var email1 = $("#email1").val();
	var email2 = $("#email2").val();
	if(email1 == null || email1 == ''||email2 == null || email2 == ''){
		alert("이메일을 입력하세요.");
		return false;
	}
	
	if(!maxLengthCheck("email1", '이메일 앞자리', 100)){
		return false;
	}
	if(!maxLengthCheck("email2", '이메일 뒷자리', 100)){
		return false;
	}
	if(!maxLengthCheck("userNm", '이름', 25)){
		return false;
	}
	if(!maxLengthCheck("workTel", '전화번호', 70)){
		return false;
	}
	if(!maxLengthCheck("workAddr", '소속', 100)){
		return false;
	}
	if(!maxLengthCheck("perTel", '휴대폰번호', 20)){
		return false;
	}
	
	return true;	
}
// 1.author 전체 선택 및 해제
function authorChk(value,chked){
		if(chked==true){
			allChk(value);			
		}else{
			allNotChk(value);
		}

}

// 2.author 전체 선택
function allChk(ac){
	$("#tbody input[name='chk']").each(function(){
		
		if(this.value.indexOf(ac)!=-1){
		         this.checked = true; //checked 처리				
		}
		
	});
}

// 3.author 전체 해제
function allNotChk(ac){
	$("#tbody input[name='chk']").each(function(){
		if(this.value.indexOf(ac)!=-1){
			this.checked = false; //checked 처리				
		}
	});	
}

// 4. author 부분 해제시 전체선택 체크 해제
function chkDel(Bvalue, chked){
	$("thead input[name='chk']").each(function(){
		if(this.value.indexOf(Bvalue)!=-1){
			this.checked = false; //checked 처리				
		}
	});
}