<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>전지의 이해 &lt; 산업/기술동향 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="techKnow" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="tech" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="techMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/tech/techKnow.js"></script>
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v6">
			<h2>산업/기술동향</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="/WEB-INF/jsp/view/user/path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>전지의 이해</h3>
			<!-- tabWrap -->
			<div class="tabWrap v2">   
				<ul>
					<li id="area1" class="curr"><a>전지개요</a></li>
					<li id="area2"><a>전지역사</a></li>
					<li id="area3"><a>분류 및 종류별 특징</a></li>
					<!--li><a href="">이차전지의 발전사</a></li-->
				</ul>
				<!-- area -->
				<jsp:include page="/WEB-INF/jsp/view/user/tech/techKnow_area.jsp" flush="false"></jsp:include>
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

