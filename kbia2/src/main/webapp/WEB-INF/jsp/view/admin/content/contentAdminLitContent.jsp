<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminLitContent.js"></script>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
	<input type="hidden" id="lnbset2" value="Lit"> <!-- 해당 jsp명 -->
	
	<input type="hidden" id="boardNo" value="${params.boardNo}" />
	<input type="hidden" id="boardType" value="${params.boardType}" />

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
				메인 소배너
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
					
						<!-- 배너 이미지시 -->
						<tr id="image">
							<th scope="row">배너 이미지 <span class="cRed">*</span></th>
							<td>
								<!-- 파일 div / 파일받을 위치 -->
								<div class="fileDiv" id="file1">	
								</div>
							</td>
						</tr>
						

						<tr>
							<th scope="row">URL <span class="cRed">*</span></th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0501" name="chk05"  value="NEW"checked>
										<label for="chk0501">새창</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0502" name="chk05" value="PRE">
										<label for="chk0502">현재창</label>
									</span>
									<input type="text" title="링크 입력" id="link"class="w412">
									<button class="btn btnPoint" id="findUrl">화면찾기</button>
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
						<tr>
							<th scope="row">등록정보</th>
							<td id ="regist">등록자 ID / 최종수정일</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" class="btn btnPointL" id="deleteBtn">삭제</button>
					<button type="button" class="btn btnPointL" id="cancelBtn">취소</button>
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
<!-- URL 현재창 선택 시 -->
<div class="layerPop pop01" style="display: none;">
	<div class="inner">
		<p class="tit">화면찾기</p>
		<div class="cont">
			<p class="topTxt">기존에 등록한 화면을 찾을 수 있습니다.</p>
			<div class="rowTable">
				<table>
					<caption>기존에 등록된  url 적용 표입니다.</caption>
					<colgroup>
						<col style="width:120px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">화면구분 <span class="cRed">*</span></th>
							<td colspan="3">
								<div class="selectbox">
									<span id="disTypeSpan">선택</span>
										<select title="노출순서 선택" id="disType">
											<option value="">선택해주세요</option>
											<option value="NOTICE">공지사항</option>
											<option value="INDUSTRY">산업뉴스</option>
											<option value="SEEM">산업계 동정</option>
											<option value="BRIEF">주간브리프</option>
											<option value="BATTERY">The Battery</option>
											<option value="T_TRENDS">기술동향</option>
											<option value="T_ROOM">기술자료실</option>
											<option value="HIRE">채용공고</option>
											
										</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">제목 </th>
							<td colspan="2"><input type="text" id="srcTit" title="제목 입력"></td>
							<td><button class="btn btnPoint" id="srcBtn">조회</button></td>
						</tr>
					</tbody>
				</table>
				<br>
				<p class="topTxt"><span class="cRed">*</span>&nbsp;더블 클릭 시 기존 화면을 적용할 수 있습니다.</p>
				<div id="colTable" class="colTable">
					
				</div>
			</div>

			<div class="btnBottom">
				<button class="btn btnPointL" id="popCancelBtn">취소</button>
			</div>
		</div>
		<a href="javascript:void(0)" onclick="fn_layer_close(this)">닫기</a>
	</div>
</div>
<!-- //URL 현재창 선택 시 -->
</body>
</html>
