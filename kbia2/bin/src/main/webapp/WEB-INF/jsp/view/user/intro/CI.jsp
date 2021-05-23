<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>CI &lt; 협회/조합 소개 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/user/intro/CI.js"></script>
	<input type="hidden" id="path" value="CI" /> <!-- 파일명 -->
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
			<h3>CI</h3>
			<!-- tabWrap -->
			<div class="tabWrap" >   
				<ul>
					<li class="curr" id="area1"><a>협회CI</a></li>
					<li id="area2"><a>연구조합 CI</a></li>
				</ul>
				<!-- ciWrap -->	
				<jsp:include page="./CI_area.jsp" flush="false"></jsp:include>
				<!--// ciWrap -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
