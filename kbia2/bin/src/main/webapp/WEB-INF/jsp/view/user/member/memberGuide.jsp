<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>회원사 가입안내 &lt; 회원사 안내 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="memberGuide" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="member" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="memberMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/member/memberGuide.js"></script>
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v2">
			<h2>회원사 안내</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="/WEB-INF/jsp/view/user/path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>회원사 가입안내</h3>
			<!-- tabWrap -->
			<div class="tabWrap">   
				<ul>
					<li id="area1" class="curr"><a>회원서비스</a></li>
					<li id="area2"><a>회원가입절차</a></li>
				</ul>
				<!-- area -->
				<jsp:include page="/WEB-INF/jsp/view/user/member/memberGuide_area.jsp" flush="false"></jsp:include>
				<!-- //area -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
