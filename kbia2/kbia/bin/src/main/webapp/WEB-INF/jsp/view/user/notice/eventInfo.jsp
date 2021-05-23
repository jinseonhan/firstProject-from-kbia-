<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>인터배터리 &lt; 행사정보 &lt; 알림마당 &lt; 한국전지산업협회</title>
<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/user/notice/eventInfo.js"></script>
	<input type="hidden" id="path" value="eventInfo" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="notice" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="noticeMap" /> <!-- 두번째 path -->
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v4">
			<h2>알림마당</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>행사정보</h3>
			<!-- tabWrap -->
			<div class="tabWrap">
			<ul>
				<li class="curr v2" id="area1"><a>전시회(인터배터리 /  <br /> EV Trend Korea)</a></li>
				<li id="area2"><a>배터리컨퍼런스</a></li>
				<li id="area3"><a>전지의 날</a></li>
				<li id="area4"><a>유공자 포상</a></li>
			</ul>
			<!-- txtBox -->
			<jsp:include page="./eventInfo_area.jsp" flush="false"></jsp:include>
			<!--// txtBox -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
