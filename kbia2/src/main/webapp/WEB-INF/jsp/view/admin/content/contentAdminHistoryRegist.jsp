<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminHistoryRegist.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="history"> <!-- 해당 jsp명 -->

	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		
		
		<div class="contents">
			<h2>연혁</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>분류, 년/월, 제목, 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">분류</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="chk01" value="A" checked>
										<label for="chk0101">협회</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01" value="C">
										<label for="chk0102">조합</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">년/월 <span class="cRed">*</span></th>
							<td>
								<div class="selectbox w100">
									<span id="#hisy">선택</span>
									<select title="년 선택" id="historyY">
										<option value="">년</option>
										<option value="2022">2022년</option>
										<option value="2021">2021년</option>
										<option value="2020">2020년</option>
										<option value="2019">2019년</option>
										<option value="2018">2018년</option>
										<option value="2017">2017년</option>
										<option value="2016">2016년</option>
										<option value="2015">2015년</option>
										<option value="2014">2014년</option>
										<option value="2013">2013년</option>
										<option value="2012">2012년</option>
										<option value="2011">2011년</option>
										<option value="2010">2010년</option>
										<option value="2009">2009년</option>
										<option value="2008">2008년</option>
										<option value="2007">2007년</option>
										<option value="2006">2006년</option>
										<option value="2005">2005년</option>
										<option value="2004">2004년</option>
										<option value="2003">2003년</option>
										<option value="2002">2002년</option>
										<option value="2001">2001년</option>
										<option value="2000">2000년</option>
										<option value="1999">1999년</option>
										<option value="1998">1998년</option>
										<option value="1997">1997년</option>
										
									</select>
								</div>
								<div class="selectbox w100">
									<span id="#hism">선택</span>
									<select title="월 선택" id="historyM">
										<option value="">월</option>
										<option value="12">12월</option>
										<option value="11">11월</option>
										<option value="10">10월</option>
										<option value="09">09월</option>
										<option value="08">08월</option>
										<option value="07">07월</option>
										<option value="06">06월</option>
										<option value="05">05월</option>
										<option value="04">04월</option>
										<option value="03">03월</option>
										<option value="02">02월</option>
										<option value="01">01월</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" id="title" title="제목 입력" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" value="KOR" checked>
										<label for="chk0201">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02" value="ENG">
										<label for="chk0202">영문</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">사용여부</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0301" name="chk03" value="Y"checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0302" name="chk03" value="N">
										<label for="chk0202">미사용</label>
									</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" id="cancel" class="btn btnPointL" id="cancel">취소</button>
					<button type="button" id= "registBtn" class="btn btnPoint" id="registBtn">저장</button>
				</div>
			</div>
			<!--// btnBottom -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->
</div>
<!--// wrap -->
</body>
</html>
