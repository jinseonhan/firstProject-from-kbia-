<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->

<script src="/resouces/js/admin/account/accountAUserUpdate.js"></script>
<input type="hidden" id="lnbset1" value="account"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="accountAUserUpdate"> <!-- 해당 jsp명 -->
<input type="hidden" id="tempId" value="${param.tempId}" />
<!-- 임시
<input type="hidden" id="temp" value="qwer"> 해당 jsp명 -->
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>
				관리자 회원
				<p><span class="cRed">*</span> 표시는 필수값 입력입니다.</p>
			</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>ID, 비밀번호, 비밀번호 확인, 이름, 전화번호, 휴대폰번호, 이메일, 소속, 권한, 사용여부, ID 발급 정보 항목으로 구성된 수정 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">ID <span class="cRed">*</span></th>
							<td>
								<input type="text" id="adminId"  value="${param.tempId}" readonly/>
							</td>
						</tr>
						<tr>
							<th scope="row">비밀번호 </th>
							<td>
								<input type="password" title="비밀번호 입력" placeholder="영문+숫자 6자 이상" id="passwd1">
							</td>
						</tr>
						<tr>
							<th scope="row">비밀번호 확인</th>
							<td>
								<input type="password" title="비밀번호 입력" placeholder="영문+숫자 6자 이상" id="passwd2">
							</td>
						</tr>
						<tr>
							<th scope="row">이름 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="이름 입력" id="userNm"/>
							</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td><input type="text" title="전화번호 입력" placeholder="- 없이 숫자만 입력해주세요."id="workTel" numberOnly></td>
						</tr>
						<tr>
							<th scope="row">휴대폰번호 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="전화번호 입력" placeholder="- 없이 숫자만 입력해주세요." id="perTel" numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">이메일 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="이메일 주소 입력" id="email1">
								<span>@</span>
								<input type="text" title="이메일 호스트 입력" id="email2">
							</td>
						</tr>
						<tr>
							<th scope="row">소속</th>
							<td><input type="text" title="소속 입력" id="workAddr"></td>
						</tr>
						<tr>
							<th scope="row">
								권한 <span class="cRed">*</span>
								<p>&#8251; 메뉴는 최소 1개 이상 선택해주세요.</p>
							</th>
							<td>
								<!-- colTable -->
								<div class="colTable checkTable">
									<table>
										<caption>계정, 컨텐츠, 알림마당, 정보마당, 회원사, 통계 항목으로 구성된 권한 선택 테이블입니다.</caption>
										<colgroup>
											<col style="width:auto">
											<col style="width:auto">
											<col style="width:auto">
											<col style="width:auto">
											<col style="width:auto">
											<col style="width:auto">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0101" name="chk" value="A">
														<label for="chk0101">계정</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0201" name="chk" value="C">
														<label for="chk0201">컨텐츠</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0301" name="chk" value="N">
														<label for="chk0301">알림마당</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0401" name="chk" value="I">
														<label for="chk0401">정보마당</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0501" name="chk" value="M">
														<label for="chk0501">회원사</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0601" name="chk" value="S">
														<label for="chk0601">통계</label>
													</span>
												</th>
											</tr>
										</thead>
										<tbody id="tbody">
											<tr>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0102" name="chk" value="A1">
														<label for="chk0102">홈페이지 회원</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0202" name="chk" value="C1">
														<label for="chk0202">메인 배너</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0302" name="chk" value="N1">
														<label for="chk0302">공지사항</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0402" name="chk" value="I1">
														<label for="chk0402">주간브리프</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0502" name="chk" value="M1">
														<label for="chk0502">회원사</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0602" name="chk" value="S1">
														<label for="chk0601">접속통계</label>
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0103" name="chk" value="A2">
														<label for="chk0103">관리자 회원</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0203" name="chk" value="C2">
														<label for="chk0203">연혁</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0303" name="chk" value="N2">
														<label for="chk0303">산업뉴스</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0403" name="chk" value="I2">
														<label for="chk0403">The battery</label>
													</span>
												</td>
												<td></td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0603" name="chk" value="S2">
														<label for="chk0603">월별통계</label>
													</span>
												</td>
											</tr>
											<tr>
												<td></td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0204" name="chk" value="C3">
														<label for="chk0204">직원연락처</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0304" name="chk" value="N3">
														<label for="chk0304">행사정보</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0404" name="chk" value="I3">
														<label for="chk0404">기술동향</label>
													</span>
												</td>
												<td></td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0604" name="chk" value="S3">
														<label for="chk0604">일일통계</label>
													</span>
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0305" name="chk" value="N4">
														<label for="chk0305">산업계 동정</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0405" name="chk" value="I4">
														<label for="chk0405">기술자료실</label>
													</span>
												</td>
												<td></td>
												<td></td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<span class="checkbox">
														<input type="checkbox" id="chk0406" name="chk" value="I5">
														<label for="chk0406">채용공고</label>
													</span>
												</td>
												<td></td>
												<td></td>
											</tr>
										</tbody>
									</table>
								</div>
								<!--// colTable -->
							</td>
						</tr>
						<tr>
							<th scope="row">사용여부</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chkUse01" name="chk01" value='Y' checked>
										<label for="chk0101">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chkUse02" name="chk01" value='N'>
										<label for="chk0102">미사용</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">ID 발급 정보</th>
							<td id="idAndUpdate"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" class="btn btnPointL"id="secession">삭제</button>
					<button type="button" class="btn btnPointL" id="btnCancel">취소</button>
					<button type="button" class="btn btnPoint" id="updateBtn">수정</button>
				</div>
			</div>
			<!--// btnBottom -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

</body>
</html>
