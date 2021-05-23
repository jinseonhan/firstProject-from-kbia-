<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>산업동향 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="industryStat" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="tech" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="techMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/tech/industryStat.js"></script>
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
			<h3>산업통계</h3>
			<!-- tabWrap -->
			<div class="tabWrap v2">   
				<ul>
					<li id="area1" class="curr"><a>국내지도</a></li>
					<li id="area2"><a>세계지도</a></li>
				</ul>
				<!-- area -->
				<div id="chartArea1"> 
					<jsp:include page="/WEB-INF/jsp/view/user/tech/industryStat_chart1.jsp" flush="false"></jsp:include>
				</div>
				<div id="chartArea2"> 
					<jsp:include page="/WEB-INF/jsp/view/user/tech/industryStat_chart2.jsp" flush="false"></jsp:include>
				</div>
				<!-- //area -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->
</div>
<!--// wrap -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
