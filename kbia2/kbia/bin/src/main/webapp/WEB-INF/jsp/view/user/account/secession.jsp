<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>회원탈퇴 &lt; 마이페이지 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/user/account/secession.js"></script>
	<input type="hidden" id="path" value="secession" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="membership" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="account2" /> <!-- 두번째 path -->
	<input type="hidden" id="session_userId" value="${loginInfo.userId}" />
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v8">
			<h2>마이페이지</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>회원탈퇴</h3>
			<strong class="topTxt">한국전지산업협회 웹사이트의 <span>회원탈퇴를 원하십니까?</span></strong>
			<p class="topTxt">그동안 웹사이트의 회원으로 활동해 주셔서 감사합니다.<br />
			불편사항이 있으셨을 경우 이메일로 의견 주시면, <span>보다 나은 서비스를 위해 노력하겠습니다.</span><br />
			회원탈퇴하시려면, 비밀번호를 입력하신 후 버튼을 눌러주세요.</p>
			<!-- boxWith -->
			<div class="boxWith">
				<dl>
					<dt>아이디</dt>
					<dd><input type="text" id="userId" title="아이디 입력"></dd>
				</dl>
				<dl>
					<dt>비밀번호</dt>
					<dd><input type="password" id="passwd" title="비밀번호 입력"></dd>
				</dl>
			</div>
			<!--// boxWith -->

			<!-- btnCenter -->
			<div class="btnCenter v2">
				<button type="button" class="btn btnBlue" id="btnSecession" onclick="clickSecession()">회원탈퇴</button>
				<button type="button" class="btn btnWhite" id="btnHome" onclick="clickMain()">홈으로</button>
			</div>
			<!--// btnCenter -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<div id="footer">
		<div class="inner">
			<ul class="util">
				<li><a href="">협회/조합 소개</a></li>
				<li><a href="">이용약관</a></li>
				<li><a href="">개인정보취급방침</a></li>
			</ul>
			<p><strong>서울시 서초구 바우뫼로37길 37 산업기술진흥협회회관 8층(우)06744</strong><span>TEL : 02-3461-9400</span><span>FAX : 02-569-1895</span></p>
			<p>COPYRIGHT&copy; KBIA ALL RIGHTS RESERVED</p>
			<div class="familySite">
				<strong>관련 사이트</strong>
				<ul>
					<li><a href="http://batteryenergy.org/" target="_blank" title="새창으로 열기">리튬이차전지 시험평가 인증센터</a></li>
					<li><a href="http://tbc.or.kr/en/" target="_blank" title="새창으로 열기">The Battery Conference</a></li>
					<li><a href="http://interbattery.or.kr/" target="_blank" title="새창으로 열기">Inter Battery</a></li>
				</ul>
			</div>
		</div>
	</div>
	<!--// footer -->
</div>
<!--// wrap -->
</body>
</html>
