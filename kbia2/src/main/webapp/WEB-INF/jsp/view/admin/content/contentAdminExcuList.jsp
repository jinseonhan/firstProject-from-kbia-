<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminExcuList.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="excu"> <!-- 해당 jsp명 -->

	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		
		<div class="contents">
			<h2>임원 현황</h2>
     
			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
				<form id="searchForm" action="/admin/excuModify.do" method="POST">
					<table>
						<caption>등록일, 제목, 사용여부, 언어 항목으로 구성된 메인 배너 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						
						<tbody>
							<tr>
								<th scope="row">등록일</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" id="stDate" name="stDate" title="시작날짜선택" value="${params.stdate}"></span>
										<em>~</em>
										<span class="date"><input type="text" id="enDate" name="enDate" title="종료날짜선택" value="${params.endate}"></span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">이름</th>
								<td><input type="text" id="excu_name" name="excu_name" title="이름 입력" class="w430" value="${params.excu_name}"></td>
							</tr>
							<tr>
								<th scope="row">사용여부</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" name="useYn" value = "" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" name="useYn" value = "Y" <c:if test="${params.useYn eq 'Y'}">checked</c:if>>
											<label for="chk0102">사용</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" name="useYn" value = "N" <c:if test="${param.useYn eq 'N'}">checked</c:if>>
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
											<input type="radio" id="chk0201" name="languageType" value="" checked>
											<label for="chk0201">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0202" name="languageType" value="KOR" <c:if test="${params.languageType eq 'KOR'}">checked</c:if>>
											<label for="chk0202">국문</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0203" name="languageType" value="ENG" <c:if test="${params.languageType eq 'ENG'}">checked</c:if>>
											<label for="chk0203">영문</label>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					</form>
				</div>
				<div class="btnArea">
					<button class="btn btnPoint" id="searchBtn" onclick="getExcuList()"><span class="icoSearch">검색</span></button>
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
			
			<!-- colTable -->
			<div id="colTable" class="colTable">
				<!-- Grid 영역 -->
			</div>
			
			<!--// paging -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->
</div>
<!--// wrap -->
</body>
</html>
