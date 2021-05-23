<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<script src="/resouces/js/admin/notice/industryAdminList.js"></script>
	<!-- container -->
	<div id="container">
		<!-- lnb -->
	<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>산업뉴스</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>등록일, 제목, 사용여부, 언어 항목으로 구성된 산업뉴스 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">등록일</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" title="시작날짜선택" id="startIndustryDate"></span>
										<em>~</em>
										<span class="date"><input type="text" title="종료날짜선택" id="endIndustryDate"></span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">제목</th>
								<td><input type="text" id="industryTitle" title="제목 입력" class="w430"></td>
							</tr>
							<tr>
								<th scope="row">사용여부</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" name="chk01" value="all" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" name="chk01" value="Y">
											<label for="chk0102">사용</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" name="chk01" value="N">
											<label for="chk0103">미사용</label>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">언어</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0201" name="chk02" value ="all" checked>
											<label for="chk0201">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0202" name="chk02" value="KOR">
											<label for="chk0202">국문</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0203" name="chk02" value="ENG">
											<label for="chk0203">영문</label>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="btnArea">
					<button class="btn btnPoint" id="searchBtn"><span class="icoSearch">검색</span></button>
				</div>
			</div>
			<!--// searchArea -->
			<!-- tableTop -->
			<div class="tableTop">
				<div class="right">
					<button type="button" class="btn btnPoint" id="registBtn">등록</button>
				</div>
			</div>
			<!--// tableTop -->
					<!-- Grid 영역 -->
			<div id="colTable" class="colTable">
			
			</div>
			
		</div>
		<!--// contents -->
	</div>
	<!--// container -->
</div>
<!--// wrap -->
</body>
</html>
