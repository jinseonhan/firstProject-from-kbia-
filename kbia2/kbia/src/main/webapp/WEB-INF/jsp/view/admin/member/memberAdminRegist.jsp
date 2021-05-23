<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/admin/member/memberAdminRegist.js?20210120_1"></script>
	<input type="hidden" id="lnbset1" value="member"> <!-- 중분류 -->
	<input type="hidden" id="lnbset2" value="memberAdminRevise"> <!-- 해당 jsp명 -->
	
	<!-- 스마트 에디터를 적용하기 위한 스크립트 -->
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
			<h2>회원사</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>회원구분, 회사명, 대표자명, 업종, 로고 이미지, 설립년도, 종업원수, 대표전화번호, 팩스번호, 홈페이지, 회사소개, 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">회원구분 <span class="cRed">*</span></th>
							<td>
								<div class="selectbox">
									<span>선택</span>
									<select title="시 선택" id="division">
										<option value="">선택해주세요</option>
										<option value="M1">임원</option>
										<option value="M2">일반회원</option>
										<option value="M3">준회원</option>
										<option value="M4">특별회원</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">회사명 <span class="cRed">*</span></th>
							<td><input type="text" title="회사명 입력" id="comNm"></td>
						</tr>
						<tr>
							<th scope="row">대표자명 <span class="cRed">*</span></th>
							<td><input type="text" title="대표자명 입력" id="comRepreNm"></td>
						</tr>
						<tr>
							<th scope="row">업종 <span class="cRed">*</span></th>
							<td><input type="text" title="업종 입력" id="sectors"></td>
						</tr>
						<tr>
							<th scope="row">로고 이미지 <span class="cRed">*</span></th><!-- 로고이미지 필수항목 추가(210208) -->
							<td>
								<!-- 파일 div / 파일받을 위치 -->
								<div class="fileDiv" id="file1">	
								</div>
								<span>이미지 사이즈: 000X000</span>
								<span>/</span>
								<span>확장자: jpg, png</span>
							</td>
						</tr>
						<tr>
							<th scope="row">설립년도 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="설립년도 입력" class="w100" placeholder="0000" id="estYear" maxlength='4' numberOnly>
								<span>년도</span>
							</td>
						</tr>
						<tr>
							<th scope="row">종업원수</th>
							<td>
								<input type="text" title="종업원수 입력" class="w100" placeholder="숫자만 입력" id="comEmplCnt" pattern="[0-9]{1,4}" numberOnly>
								<span>명</span>
							</td>
						</tr>
						<tr>
							<th scope="row">대표전화번호 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="국가코드 입력" class="w100" value="+82" id="comRepreNum1" maxlength='3' numberOnly>
								<span>-</span>
								<input type="text" title="대표전화번호 입력" placeholder="숫자 입력" id="comRepreNum2" maxlength='11' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">팩스번호</th>
							<td>
								<input type="text" title="국가코드 입력" class="w100" value="+82" id="fax1" maxlength='3' numberOnly>
								<span>-</span>
								<input type="text" title="팩스번호 입력" placeholder="숫자 입력" id="fax2" maxlength='11' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">홈페이지</th>
							<td><input type="text" title="홈페이지 입력" id="homePage"></td>
						</tr>
						<tr>
							<th scope="row">회사소개</th>
							<td style="padding: 6px 12px;">
								<textarea title="회사소개 입력" id="contentArea" placeholder="에디터영역" style="width: 100%;"></textarea>
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
										<input type="radio" id="chk0201" name="chk02" value='Y' checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02" value='N'>
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
</html>
