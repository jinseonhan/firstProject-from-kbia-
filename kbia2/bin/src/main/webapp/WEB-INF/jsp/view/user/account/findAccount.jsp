<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>회원가입 &lt; 멤버쉽 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->

	<script src="/resouces/js/user/account/findAccount.js"></script>
	<input type="hidden" id="path" value="findAccount" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="membership" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="account1" /> <!-- 두번째 path -->

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
			<!-- findBox -->
			<div class="findBox">
				<div class="inBox">
					<h4>아이디 찾기</h4>
					<input type="text" id="idNm" title="이름 입력" placeholder="이름">
					<div class="emailArea">
						<input type="text" id="idEmail1" title="메일 주소 입력" placeholder="이메일">
						<span>@</span>
						<input type="text" id="idEmail2" title="이메일 호스트 입력" placeholder="호스트 직접입력">
					</div>
					<button type="button" class="btn btnBlue" id="btnFindId">아이디 찾기</button>
				</div>
				<div class="inBox">
					<h4>비밀번호 찾기</h4>
					<input type="text" id="pwId" title="아이디 입력" placeholder="아이디" >
					<input type="text" id="pwNm" title="이름 입력" placeholder="이름">
					<div class="emailArea">
						<input type="text" id="pwEmail1" title="메일 주소 입력" placeholder="이메일">
						<span>@</span>
						<input type="text" id="pwEmail2" title="이메일 호스트 입력" placeholder="호스트 직접입력">
					</div>
					<button type="button" class="btn btnBlue" id="btnFindPw">비밀번호 찾기</button>
				</div>
			</div>
			<!--// findBox -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->