<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<script src="/resouces/js/admin/info/hireAdminRegist.js"></script>
	<!-- 스마트 에디터를 적용하기 위한 스크립트 -->
	<script src="/resouces/static/js/service/HuskyEZCreator.js"></script>
			<!-- 파일업데이트 플래그 -->
  			 <input type="hidden" id="flag" value="N">
  			 <input type="hidden" id="delYn" value="N">
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>채용공고</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>분류, 구분, 제목, 내용, 첨부파일, 채용 기간, 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
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
										<input type="radio" id="chk0102" name="chk01" value="M">
										<label for="chk0102">회원사</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">구분</th>
							<td><input type="text" title="구분 입력" id="division" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" title="제목 입력" id="hireTitle" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">내용 <span class="cRed">*</span></th>
							<td style="padding: 6px 12px;">
								<textarea title="내용 입력" id="hireContent" placeHolder="에디터영역" style="width: 100%;">
								</textarea>								
							</td>
						</tr>
						<tr>
							<th scope="row">첨부파일</th>
							<td id="fileList">
								<div class="file">
									<input type="text" id="upFilePath" title="첨부파일 명">
									<input type="file" id="upFile" name="upFile" title="파일 첨부">
								</div>
									<button type="button" id="plusBtn" class="btn btnGray" >추가</button>
							</td>
						</tr>
						<tr>
							<th scope="row">채용 기간</th>
							<td>
								<span class="date">
									<input type="text" id="hireStartDate" title="등록일선택" >
								</span>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="시 선택" id="hireStartHour">
										<option value="">시</option>
										<option value="00">00</option>
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
										<option value="21">21</option>
										<option value="22">22</option>
										<option value="23">23</option>
									</select>
								</div>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="분 선택" id="hireStartMinute">
									<option value="">분</option>
										<option value="00">00</option>
										<option value="05">05</option>
										<option value="10">10</option>
										<option value="15">15</option>
										<option value="20">20</option>
										<option value="25">25</option>
										<option value="30">30</option>
										<option value="35">35</option>
										<option value="40">40</option>
										<option value="45">45</option>
										<option value="50">50</option>
										<option value="55">55</option>
									</select>
								</div>
								<span class="date">
									<input type="text" id="hireEndDate" title="등록일선택">
								</span>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="시 선택" id="hireEndHour">
										<option value="">시</option>
										<option value="00">00</option>
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
										<option value="21">21</option>
										<option value="22">22</option>
										<option value="23">23</option>
									</select>
								</div>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="분 선택" id="hireEndMinute">
										<option value="">분</option>
										<option value="00">00</option>
										<option value="05">05</option>
										<option value="10">10</option>
										<option value="15">15</option>
										<option value="20">20</option>
										<option value="25">25</option>
										<option value="30">30</option>
										<option value="35">35</option>
										<option value="40">40</option>
										<option value="45">45</option>
										<option value="50">50</option>
										<option value="55">55</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" value="KOR"checked>
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
										<input type="radio" id="chk0301" name="chk03" value="Y" checked>
										<label for="chk0301">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0302" name="chk03" value="N">
										<label for="chk0302">미사용</label>
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
					<button type="button" class="btn btnPointL" id="cancelBtn" >취소</button>
					<button type="button" class="btn btnPoint" id="registBtn">저장</button>
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
