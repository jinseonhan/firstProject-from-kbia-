<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>회원사 안내 &lt; 회원사 안내 &lt; 한국전지산업협회</title>
<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="memberInfo" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="member" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="memberMap" /> <!-- 두번째 path -->
	<script src="/resouces/js/user/member/memberInfo3.js"></script>
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
			<h3>회원사 안내</h3>
			<!-- tabWrap -->
			<div class="tabWrap">
				<ul>
					<li id="area1"><a href="/openMemberInfo.do">임원</a></li>
					<li id="area2"><a href="/openMemberInfo2.do">일반회원</a></li>
					<li id="area3" class="curr"><a href="/openMemberInfo3.do">준회원</a></li>
					<li id="area4"><a href="/openMemberInfo4.do">특별회원</a></li>
				</ul>
				<div id="colTable" class="colTable">
				<!-- Grid 영역 -->
				</div>
			</div>
				>
				<!-- searchArea -->
				<div class="searchArea">
					<!-- selectBox -->
					<div class="selectBox">
						<span>전체</span>
						<select title="검색 구분" name="select03">
							<option value="all">전체</option>
							<option value="name">회원사명</option>
							<option value="ceo">대표이사</option>
							<option value="sectors">업종</option>
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
