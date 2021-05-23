<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminPupContent.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<!-- 스마트 에디터를 적용하기 위한 스크립트 -->
<script src="/resouces/static/js/service/HuskyEZCreator.js"></script>

<input type="hidden" id="boardNo" value="${params.boardNo}" />
<input type="hidden" id="boardType" value="${params.boardType}" />
<input type="hidden" id="stFileNm" value="${params.stFileNm }" /> <!-- 파일명 -->
<input type="hidden" id="filePath" value="${params.filePath}" /> <!-- 파일경로 -->
<input type="hidden" id="ognFileNm" value="${params.ognFileNm}" /> <!-- 오리지널 -->

			<!-- 파일업데아트 플래그 -->
  			 <input type="hidden" id="fileupdateflag" value="N">
  			 <input type="hidden" id="delYn" value="N">
   
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		
		<div class="contents">
			<h2>
				팝업
				<p><span class="cRed">*</span> 표시는 필수값 입력입니다.</p>
			</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>팝업 구분, 제목, 이미지, 링크, 노출기간, 노출위치 , 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">팝업 구분</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="chk01" value = "img" checked>
										<label for="chk0101">이미지</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01" value = "text">
										<label for="chk0102">텍스트</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" title="제목 입력" id="title" class="w412" placeholder="관리용 제목으로 고객화면에 노출되지 않습니다."></td>
						</tr>
						
						<!-- 이미지시 -->
						<tr id="image">
							<th scope="row">이미지 <span class="cRed">*</span></th>
							<td>
								<div class="file" id="popfile">
									<input type="text" title="첨부파일 명" id="address" >
									<input type="file"  id="upfile" name="upfile" title="파일 첨부">								
								</div>
								<div id="fileNameList">
								
								</div>								
							</td>
						</tr>
						
						
						<!-- 텍스트사용시 -->
						<tr style="display: none;" id="text">
							<th scope="row">내용 <span class="cRed">*</span></th>
							<td>
								<textarea title="내용 입력" id="textt"></textarea>
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
								<span class="date"><input type="text" title="등록일선택" id="stdate"></span>
								<div class="selectbox w100">
									<span id="popupSt">선택</span>
									<select title="시 선택" id="popupStHour">
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
									<span id="popupSm">선택</span>
									<select title="분 선택" id="popupStMinute">
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
									<span id="popupEs">선택</span>
									<select title="시 선택" id="popupEndSHour">
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
									<span id ="popupEm">선택</span>
									<select title="분 선택" id="popupEndEHour">
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
							<th scope="row">노출위치</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" value= "LEFT" checked>
										<label for="chk0201">좌측</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02" value= "CENTER">
										<label for="chk0202">중앙</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0203" name="chk02" value= "RIGHT">
										<label for="chk0203">우측</label>
									</span>
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
					<button type="button" class="btn btnPointL" id="deleteBtn">삭제</button>
					<button type="button" class="btn btnPointL" id="cencelBtn">취소</button>
					<button type="button" class="btn btnPoint" id="saveBtn">저장</button>
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
