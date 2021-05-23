<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<title>조직도 및 연락처 &lt; 협회/조합 소개 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script type="text/javascript" src="/resouces/js/user/intro/organization.js"></script>
	<input type="hidden" id="path" value="organization" /> <!-- 파일명 -->
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
			<h3>조직도 및 연락처</h3>
			<!-- orgaChart -->
			<div class="orgaChart">
				<strong>${chairmanInfo.organName }<br />${chairmanInfo.codeNm}</strong>
				<strong>${generalInfo.organName }<br />${generalInfo.codeNm}</strong>
				<ul>
				</ul>
			</div>
			<!--// orgaChart -->
			<!-- orgaList -->
			<div class="orgaList">
			</div>
			<!--// orgaList -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
