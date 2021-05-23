<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<script src="/resouces/js/admin/info/referenceAdminRegist.js"></script>
<!-- 파일업데이트 플래그 -->
<input type="hidden" id="flag" value="N">
<input type="hidden" id="delYn" value="N">
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<input type="hidden" id="lnbset1" value="info"> <!-- 중분류 -->
		<input type="hidden" id="lnbset2" value="referenceAdminList"> <!-- 해당 jsp명 -->
		<!-- contents -->
		<div class="contents">
			<h2>기술자료실</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>제목, 내용, 첨부파일, 등록일, 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" title="제목 입력"  id="referenceTitle" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">내용 <span class="cRed">*</span></th>
							<td style="padding: 6px 12px;">
								<textarea title="내용 입력" id="referenceContent" placeHolder="에디터영역" style="width: 100%;">
								</textarea>								
							</td>
						</tr>
						<tr id="file">
							<th scope="row">첨부파일<span class="cRed"></span></th>
							<td>
								<!-- 파일 div / 파일받을 위치 -->
								<div class="fileDiv" id="file1" style="margin:-8px 0px 0px 0px;">	
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">게시일</th>
							<td>
								<span class="date">
									<input type="text" title="등록일선택" id="referenceDate">
								</span>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="시 선택" id="referenceHour">
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
									<select title="분 선택" id="referenceMinute">
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
										<input type="radio" id="chk0101" name="chk01" value="KOR" checked>
										<label for="chk0101">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01" value="ENG">
										<label for="chk0102">영문</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">사용여부</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" value="Y" checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02" value="N">
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
					<button type="button" class="btn btnPointL" id="cancelBtn">취소</button>
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
