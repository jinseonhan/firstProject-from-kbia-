<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

	<title>회원가입 &lt; 멤버쉽 &lt; 한국전지산업협회</title>
	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	
	<script type="text/javascript" >
	$(document).ready(function() {
		if($("#email").val() != null && $("#email").val() != ''){
			$("#findIdView").css("display","none");
			$("#findPwView").css("display",'');
			var resultData = {
					"userId": $("#userId").val()
					,"passwd": SHA256($("#passwd").val())
				}
			$.ajax({
				type : 'POST'
				, url : '/userAccountUpdate.do'
				, data : resultData
				, async: false
				, dataType : 'json'//xml,json,local 3형식 
				, success : function(data) {	
					
				}
			});
		}else{
			$("#findIdView").css("display","");
			$("#findPwView").css("display",'none');
		}
	});
	</script>
	<input type="hidden" id="path" value="findAccount" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="membership" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="account1" /> <!-- 두번째 path -->
	<input type="hidden" id="userId" value="${userId}" />
	<input type="hidden" id="email" value="${email}" />
	<input type="hidden" id="passwd" value="${tempPasswd}" />
	
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v7">
			<h2>멤버쉽</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>ID/PW 찾기</h3>
			<p class="topTxt">홈페이지에 오신 것을 환영합니다.<br />가입하셨을 때 입력한 정확한 정보를 입력해 주세요.</p>
			<!-- findComplete -->
			<div class="findComplete" id="findIdView" style="display:none">
				<h4>아이디 찾기</h4>
				<p>고객님의 아이디는 <strong>${userId}</strong> 입니다.</p>
			</div>
			<!--// findComplete -->
			<!-- findComplete -->
			<div class="findComplete" id="findPwView" style="display:none">
				<h4>비밀번호 찾기</h4>
				<p>고객님의 이메일(${email})로 임시비밀번호가 발송되었습니다. 비밀번호는 꼭 마이페이지에서 수정해주시기 바랍니다.</p>
			</div>
			<!--// findComplete -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->

