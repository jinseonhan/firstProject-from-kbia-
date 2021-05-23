<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

	<title>회원가입 &lt; 멤버쉽 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	
	<script src="/resouces/js/user/account/signUp.js"></script>
	<input type="hidden" id="path" value="signUp" /> <!-- 파일명 -->
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
			<h3>회원가입</h3>
			<!-- step -->
			<div class="step">
				<ol>
					<li class="curr">
						<span>Step 1</span>
						<strong>약관동의</strong>
					</li>
					<li class="curr">
						<span>Step 2</span>
						<strong>정보입력</strong>
					</li>
					<li class="curr">
						<span>Step 3</span>
						<strong>가입완료</strong>
					</li>
				</ol>
			</div>
			<!--// step -->
			<!-- completeArea -->
			<div class="completeArea">
				<strong>WELCOME!</strong>
				<p><span>한국전지산업협회 홈페이지에</span> 회원 가입하신 것을 축하 드립니다.<br />아이디와 비밀번호가 유출되지 않도록 주의해 주십시오.</p>
				<div class="boxWhite">
					<p>회원님의 아이디는 [<strong>${userId}</strong>] 입니다.</p>
				</div>
			</div>
			<!--// completArea -->
			<!-- btnCenter -->
			<div class="btnCenter v2">
				<button type="button" class="btn btnBlue" onclick="clickMain()">메인으로 이동</button>
			</div>
			<!--// btnCenter -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->

