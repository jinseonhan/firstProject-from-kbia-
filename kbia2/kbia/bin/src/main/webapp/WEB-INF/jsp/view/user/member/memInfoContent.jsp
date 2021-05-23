<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>회원사 안내 &lt; 회원사 안내 &lt; 한국전지산업협회</title>

<!-- header -->
<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
<!--// header -->

<script src="/resouces/js/user/member/memInfoContent.js"></script>

<input type="hidden" id="path" value="memberInfo" /> <!-- 파일명 -->
<input type="hidden" id="mainPath" value="member" /> <!-- 첫번째 path -->
<input type="hidden" id="mainPath2" value="memberMap" /> <!-- 두번째 path -->
<input type="hidden" id="boardNo" value="${param.boardNo}" />
<input type="hidden" id="boardType" value="${param.boardType}" />
<input type="hidden" id="createDate" value="${param.createDate}" />
<input type="hidden" id="kinds" value="${param.kinds}" />
<input type="hidden" id="searchTxt" value="${param.searchTxt}" />
<input type="hidden" id="division" value="${param.division}" />



	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v2">
			<h2>회원사 안내</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
	<jsp:include page="/WEB-INF/jsp/view/user/path.jsp" flush="false"></jsp:include>
		
		<!-- contents -->
		<div class="contents">
			<h3>회원사 안내</h3>
			<!-- tabWrap -->
			<div class="tabWrap">
				<ul>
					<li id="area1" class="curr"><a href="/openMemberInfo.do">임원</a></li>
					<li id="area2"><a href="/openMemberInfo2.do">일반회원</a></li>
					<li id="area3"><a href="/openMemberInfo3.do">준회원</a></li>
					<li id="area4"><a href="/openMemberInfo4.do">특별회원</a></li>
				</ul>
				<!-- inputTable -->
				<div class="inputTable">
					<table>
						<caption>회원사명, 업종, 대표이사, 설립년도, 종업원수, 대표전화, 팩스번호, 홈페이지, 회사소개로 항목으로 구성된 회원사 안내 표입니다.</caption>
						<colgroup>
							<col style="width:200px">
							<col style="width:auto">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">회원사명</th>
								<td><strong id="comNm"></strong></td>
							</tr>
							<tr>
								<th scope="row">업종</th>
								<td><strong id="sectors"></strong></td>
							</tr>
							<tr>
								<th scope="row">대표이사</th>
								<td><strong id="comRepreNm"></strong></td>
							</tr>
							<tr>
								<th scope="row">설립년도</th>
								<td><strong id="estYear"></strong></td>
							</tr>
							<tr>
								<th scope="row">종업원수</th>
								<td><strong id="comEmplCnt"></strong></td>
							</tr>
							<tr>
								<th scope="row">대표전화</th>
								<td><strong id="comRepreNum"></strong></td>
							</tr>
							<tr>
								<th scope="row">팩스번호</th>
								<td><strong id="fax"></strong></td>
							</tr>
							<tr>
								<th scope="row">홈페이지</th>
								<td><strong id="homepage"></strong></td>
							</tr>
							<tr>
								<th scope="row">회사소개</th>
								<td><div class="cont" id="content"></div></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--// inputTable -->
				<!-- btnBoth -->
				<div class="btnBoth">
					<a id="beforeBoard" class="btn btnGray fl">이전</a>
					<a id="nextBoard" class="btn btnWGray fl">다음</a>
					<a href="/openMemberInfo.do" class="btn btnBlue fr" >목록</a>
				</div>
				<!--// btnBoth -->
			</div>
			<!--// tabWrap -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

<!-- footer -->
<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
<!--// footer -->