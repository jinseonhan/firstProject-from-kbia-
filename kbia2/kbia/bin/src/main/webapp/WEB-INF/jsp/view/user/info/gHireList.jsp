<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>채용공고 &lt; 정보마당 &lt; 한국전지산업협회</title>
	
	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="hireList" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="info" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="infoMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/info/ghireList.js"></script>


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
			<h3>채용공고</h3>
			<!-- tabWrap -->
			<div class="tabWrap">
				<ul>
					<li class="curr"><a href="/openGhireList.do">협회 인재채용</a></li>
					<li><a href="/openMhireList.do">회원사 인재채용</a></li>
				</ul>
				
				<!-- colTable -->
			<div id="colTable" class="colTable">
				<!-- Grid 영역 -->
			</div>
				<!-- searchArea -->
				<div class="searchArea">
					<!-- selectBox -->
					<div class="selectBox">
						<span>전체</span>
						<select title="검색 구분" name="select03">
							<option value="all">전체</option>
							<option value="title">제목</option>
							<option value="createId">작성자</option>
							<option value="content">내용</option>
						</select>
					</div>
					<!--// selectBox -->
					<input type="text" id="searchTitle" title="검색어 입력">
					<button type="button" id="searchBtn" class="btn btnLGray">검색</button>
				</div>
				<!--// searchArea -->
			</div>
			<!--// tabWrap -->	
		</div>
		<!--// contents -->
	</div>
	<!--// container -->
	
	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->

