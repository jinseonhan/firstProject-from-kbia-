<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>연혁 &lt; 연혁 &lt; 협회/조합 소개 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/user/intro/introHistory.js"></script>
	<input type="hidden" id="path" value="introHistroy" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="intro" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="introMap" /> <!-- 두번째 path -->
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v1">
			<h2>협회/조합 소개</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>연혁</h3>
			<!-- tabWrap -->
			<div class="tabWrap">
				<ul>
					<li class="curr" id="area1"><a href="/openIntroHistroy.do">협회 연혁</a></li>
					<li id="area2"><a href="/openIntroHistory.do">조합 연혁</a></li>
				</ul>
				<!-- imgWrap -->
				<div class="imgWrap">
					<strong>2020 ~ 2011</strong>
					<img src="/resouces/images/user/img08.png" alt="협회 연혁 이미지">
				</div>
				<!--// imgWrap -->
				<!-- historyArea -->
				<div class="historyArea" id="historyArea1">
					<ul id="hisbody">
					</ul>
				</div>
				<!--// historyArea -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->