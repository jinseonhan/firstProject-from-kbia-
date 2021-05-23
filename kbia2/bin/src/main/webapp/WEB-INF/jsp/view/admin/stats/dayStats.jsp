<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="lnbset1" value="stats"> <!-- 중분류 -->
	<input type="hidden" id="lnbset2" value="dayStats"> <!-- 해당 jsp명 -->
	<script src="/resouces/js/admin/stats/dayStats.js"></script>

	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>일별통계</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>검색기간 항목으로 구성된 일별통계 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">검색기간</th>
								<td>
									<div class="selectbox">
										<span id="spanYear">선택</span>
										<select title="년도 선택" id="selectYear">
											
										</select>
									</div>
									<div class="selectbox">
										<span id="spanMonth">선택</span>
										<select title="월 선택">
											<option value="1">1월</option>
											<option value="2">2월</option>
											<option value="3">3월</option>
											<option value="4">4월</option>
											<option value="5">5월</option>
											<option value="6">6월</option>
											<option value="7">7월</option>
											<option value="8">8월</option>
											<option value="9">9월</option>
											<option value="10">10월</option>
											<option value="11">11월</option>
											<option value="12">12월</option>
										</select>
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
			<!-- colTable -->
			<div class="colTable">
				<table>
					<caption>오늘 방문자 수, 이번달 방문자 수, 총방문자수 항목으로 구성된 접속통계 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">오늘 방문자 수</th>
							<th scope="col">이번달 방문자 수</th>
							<th scope="col">총방문자수</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td id="dayCnt"></td>
							<td id="monthCnt"></td>
							<td id="allCnt"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// colTable -->
			<!-- tableTop -->
			<div class="tableTop mT20">
				<p class="total" id="searchTerm"></p>
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
</div>
<!--// wrap -->
</body>
</html>
