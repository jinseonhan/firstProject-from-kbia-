<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->

<script src="/resouces/js/admin/account/accountUserList.js"></script>
<input type="hidden" id="lnbset1" value="account"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="accountUserList"> <!-- 해당 jsp명 -->
	<!-- container -->
	<div id="container">
		
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>홈페이지 회원</h2>
			
			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>가입일, 검색어, 회원등급, 회원상태 항목으로 구성된 홈페이지 회원 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">가입일</th>
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
								<th scope="row">회원등급</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" name="author" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" value="U1" name="author">
											<label for="chk0102">일반회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" value="U2" name="author">
											<label for="chk0103">정회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0104" value="U3" name="author">
											<label for="chk0104">준회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0105" value="U4" name="author">
											<label for="chk0105">특별회원</label>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">회원상태</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0201" name="useYn" checked>
											<label for="chk0201">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0202" name="useYn" value="Y">
											<label for="chk0202">정상</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0203" name="useYn" value="N">
											<label for="chk0203">휴먼</label>
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
					<button type="button" id="btnExcel" class="btn btnPointL">엑셀 다운로드</button>
					<button type="button" id="btnReg" class="btn btnPoint" >등록</button>
				</div>
			</div>
			<!--// tableTop -->
			
			<!-- colTable -->
			<div id="colTable" class="colTable">
				<!-- Grid 영역 -->
			</div>
			
		</div>
		<!--// contents -->
	</div>
	<!--// container -->	
</div>
<!--// wrap -->

</body>
</html>
