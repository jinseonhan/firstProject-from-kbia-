<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->

<script src="/resouces/js/admin/account/accountAUserList.js"></script>
<input type="hidden" id="lnbset1" value="account"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="accountAUserList"> <!-- 해당 jsp명 -->

	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>관리자 회원</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>생성일, 검색어, 사용여부 항목으로 구성된 관리자 회원 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">생성일</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" id="fromCreateDate" title="시작날짜선택"></span>
										<em>~</em>
										<span class="date"><input type="text" id="toCreateDate" title="종료날짜선택"></span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">검색어</th>
								<td><input type="text" id="userIdNm" title="검색어 입력" class="w430" placeholder="ID or 이름 입력"></td>
							</tr>
							<tr>
								<th scope="row">사용여부</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" name="useYn" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" name="useYn" value="Y">
											<label for="chk0102">사용</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" name="useYn" value="N">
											<label for="chk0103">미사용</label>
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
				<p class="total">회원 수: <strong id="userCnt"></strong>명</p>
				<div class="right">
					<button type="button" class="btn btnPoint" id="btnReg">등록</button>
				</div>
			</div>
			<!--// tableTop -->
			<!-- colTable -->
			<div class="colTable" id="colTable">
				
			</div>
			<!--// colTable -->
			
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

</body>
</html>
