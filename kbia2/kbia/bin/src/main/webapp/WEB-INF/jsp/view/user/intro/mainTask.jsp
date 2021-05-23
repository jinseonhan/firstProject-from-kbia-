<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>주요업무 &lt; 주요업무 &lt; 협회/조합 소개 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="mainTask" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="intro" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="introMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/intro/mainTask.js"></script>
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
			<h3>주요업무</h3>
			<!-- tabWrap -->
			<div class="tabWrap">
				<ul>
					<li id="area1" class="curr"><a>협회</a></li>
					<li id="area2"><a>조합</a></li>
                    <li id="area3"><a>분원</a></li>
                    <li id="area4"><a>사업계획</a></li>
				</ul>
				<!-- imgWrap -->
				<jsp:include page="./mainTask_area.jsp" flush="false"></jsp:include>
				<!--// imgWrap -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
