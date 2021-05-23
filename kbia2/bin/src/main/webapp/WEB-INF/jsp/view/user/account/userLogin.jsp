<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>회원가입 &lt; 멤버쉽 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	
	<script src="/resouces/js/user/account/loginUser.js"></script>
	<input type="hidden" id="path" value="userLogin" /> <!-- 파일명 -->
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
			<h3>로그인</h3>
			<p class="topTxt">한국전지산업협회에 오신 것을 환영합니다.<br />서비스를 이용하시려면 로그인이 필요합니다.</p>
			<!-- loginBox -->
			<div class="loginBox">
				<div class="inBox">
					<input type="text" id="userId" title="아이디 입력" placeholder="아이디">
					<input type="password" id="passwd" title="비밀번호 입력" placeholder="비밀번호">
					<div class="btnArea">
						<span class="checkbox">
							<input type="checkbox" id="chk01">
							<label for="chk01">아이디 저장</label>
						</span>
						<ul>
							<li><a href="/openFindAccount.do">ID/ PW찾기</a></li>
							<li><a href="/openSignUp.do">회원가입</a></li>
						</ul>
					</div>
					<button type="button" class="btn btnBlue" onclick="clickLogin()">로그인</button>
				</div>
			</div>
			<!--// loginBox -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->

