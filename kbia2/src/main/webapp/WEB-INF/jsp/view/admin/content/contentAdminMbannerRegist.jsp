<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminMbannerRegist.js?20210120_1"></script>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
	<input type="hidden" id="lnbset2" value="Mbanner"> <!-- 해당 jsp명 -->
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		
		<div class="contents">
			<h2>
				메인 배너
				<p><span class="cRed">*</span> 표시는 필수값 입력입니다.</p>
			</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>배너명, 웹 이미지, 모바일이미지, 링크, 노출기간, 노출순서, 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">배너명 <span class="cRed">*</span></th>
							<td>
								<textarea  id="text" title="배너명 입력"></textarea>
							</td>
						</tr>
						
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" title="제목 입력" id="title" class="w412"></td>
						</tr>
						
						
						<!-- 웹 이미지시 -->
						<tr id="image">
							<th scope="row">웹 이미지 <span class="cRed">*</span></th>
							<td>
								<!-- 파일 div / 파일받을 위치 -->
								<div class="fileDiv" id="file1">	
								</div>
							</td>
						</tr>
						
						
						<!-- 모바일 이미지 -->
						<tr id="mobile">
							<th scope="row">모바일 이미지 <span class="cRed">*</span></th>
							<td>
								<div class="fileDiv" id="file2">	
								</div>
							</td>
						</tr>
						
						
						
						<tr >
							<th scope="row">링크</th>
							<td><input type="text" title="링크 입력" id="link"class="w412"></td>
						</tr>
						<tr>
							<th scope="row">노출기간</th>
							<td>
								<span class="checkbox">
									<input type="checkbox" id="chk0000" name="chk000" value="Y" checked>
									<label for="chk0101">상시노출</label>
								</span>
									
									<span class="date"><input type="text" title="등록일선택" id="stdate" name="ho"></span>
									<button type="button" class="ui-datepicker-trigger"></button>
									<div class="selectbox w100">
										<span id="mBannerSt">00</span>
										<select title="시 선택" id="mBannerStHour">
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
										<span id="mBannerSm">00</span>
										<select title="분 선택" id="mBannerStMinute">
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
									<span class="date"><input type="text" title="등록일선택" id="endate"></span>
									<div class="selectbox w100">
										<span id="mBannerEs">00</span>
										<select title="시 선택" id="mBannerEndHour">
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
										<span id="mBannerEm"></span>
										<select title="분 선택" id="mBannerEndMinute">
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
							<th scope="row">노출순서 <span class="cRed">*</span></th>
							<td>
								<div class="selectbox">
									<span id="locationN">선택</span>
									<select title="노출순서 선택" id="locationNo">
										<option value="">선택해주세요</option>
										<option value="1번">1번</option>
										<option value="2번">2번</option>
										<option value="3번">3번</option>
										<option value="4번">4번</option>
										<option value="5번">5번</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0301" name="chk03"  value="KOR"checked>
										<label for="chk0201">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0302" name="chk03" value="ENG">
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
										<input type="radio" id="chk0401" name="chk04" value = "Y" checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0402" name="chk04" value = "N">
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
					<button type="button" class="btn btnPointL" id="cancel">취소</button>
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
