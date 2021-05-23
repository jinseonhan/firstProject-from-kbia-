<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>The Battery &lt; 정보마당 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	
	
	<input type="hidden" id="path" value="batteryList" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="info" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="infoMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/info/batteryList.js"></script>

	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v5">
			<h2>정보마당</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="/WEB-INF/jsp/view/user/path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>The Battery</h3>
			
			<!-- imgList -->
			<div class="imgList" id="batterySelectList">
				
			</div>
			<!--// imgList -->
			<!-- paging -->
			<div class="tabulator-footer">
			<span class="tabulator-paginator">
			<button class="tabulator-page" type="button" role="button" aria-label="First Page" title="First Page" id="goFirstPage" ></button>
			<button class="tabulator-page" type="button" role="button" aria-label="Prev Page" title="Prev Page"  id="goPrevPage"></button>
			<span class="tabulator-pages" id="tabulPages">
			<button class="tabulator-page active" type="button" role="button" aria-label="Show Page 1" title="Show Page 1" data-page="1">1</button>
			<button class="tabulator-page" type="button" role="button" aria-label="Show Page 2" title="Show Page 2" data-page="2">2</button>
			<button class="tabulator-page" type="button" role="button" aria-label="Show Page 3" title="Show Page 3" data-page="3">3</button>
			<button class="tabulator-page" type="button" role="button" aria-label="Show Page 4" title="Show Page 4" data-page="4">4</button>
			<button class="tabulator-page" type="button" role="button" aria-label="Show Page 5" title="Show Page 5" data-page="5">5</button>
			</span>
			<button class="tabulator-page" type="button" role="button" aria-label="Next Page" title="Next Page"  id="goNextPage"></button>
			<button class="tabulator-page" type="button" role="button" aria-label="Last Page" title="Last Page"  id="goLastPage"></button>
			</span>
			</div>
			
			<!--// paging -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
