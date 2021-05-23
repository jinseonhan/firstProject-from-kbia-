<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/account/accountUserUpdate.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<input type="hidden" id="lnbset1" value="account"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="accountUserList"> <!-- 해당 jsp명 -->
<input type="hidden" id="userId" value="${param.userId}" />
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>홈페이지 회원</h2>
			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>회원등급, ID, 이름, 이메일, 전화번호, 휴대폰번호, 주소, 업종, 회사명, 회사전화, 직책, 회원상태, 가입일 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">회원등급</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="author" value="U1" checked>
										<label for="chk0101">일반회원</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="author" value="U2">
										<label for="chk0102">정회원</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0103" name="author" value="U3">
										<label for="chk0103">준회원</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0104" name="author" value="U4">
										<label for="chk0104">특별회원</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">ID</th>
							<td>
								<span>${param.userId}</span>
								<button type="button" class="btn btnGray" id="btnFindPw">비밀번호 초기화</button>
							</td>
						</tr>
						<tr>
							<th scope="row">이름<span class="cRed">*</span></th>
							<td id="userNm"></td>
						</tr>
						<tr>
							<th scope="row">이메일</th>
							<td>
								<input type="text" title="이메일 주소 입력" id="email1">
								<span>@</span>
								<input type="text" title="이메일 호스트 입력" id="email2">
								<!-- <div class="selectbox">
									<span>직접 입력</span>
									<select title="호스트 선택" id="emailGn">
										<option value="">직접 입력</option>
										<option value="">naver.com</option>
										<option value="">gmail.com</option>
										<option value="">daum.net</option>
									</select>
								</div>
								 -->
							</td>
						</tr>
						<tr>
							<th scope="row" >전화번호</th>
							<td>
								<div class="selectbox w100">
									<span id="homeTelSpan">02</span>
									<select title="전화번호 첫번째 자리 선택" id="homeTel1">
										<option value="02" selected>02</option>
										<option value="031">031</option>
										<option value="032">032</option>
										<option value="033">033</option>
										<option value="041">041</option>
										<option value="042">042</option>
										<option value="043">043</option>
										<option value="051">051</option>
										<option value="052">052</option>
										<option value="053">053</option>
										<option value="054">054</option>
										<option value="055">055</option>
										<option value="061">061</option>
										<option value="062">062</option>
										<option value="063">063</option>
										<option value="064">064</option>
									</select>
								</div>
								<span>-</span>
								<input type="text" class="w100" id="homeTel2" title="전화번호 두번째 자리 입력" maxlength='4' numberOnly>
								<span>-</span>
								<input type="text" class="w100" id="homeTel3" title="전화번호 세번째 자리 입력" maxlength='4' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">휴대폰번호</th>
							<td>
								<div class="selectbox w100">
									<span id="perTelSpan">010</span>
									<select title="전화번호 첫번째 자리 선택" id="perTel1">
										<option value="010" selected>010</option>
										<option value="011">011</option>
										<option value="016">016</option>
										<option value="018">018</option>
										<option value="019">019</option>
									</select>
								</div>
								<span>-</span>
								<input type="text" class="w100" id="perTel2" title="전화번호 두번째 자리 입력" maxlength='4' numberOnly>
								<span>-</span>
								<input type="text" class="w100" id="perTel3" title="전화번호 세번째 자리 입력" maxlength='4' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">주소<span class="cRed">*</span></th>
							<td>
								<input type="text" class="w100" id="addressNo" title="우편번호 입력" readonly>
								<button type="button" class="btn btnGray" id="addressBtn">주소검색</button>
								<div class="line">
									<input type="text" class="flexItem" id="address" title="주소 입력" readonly>
									<input type="text" class="flexItem" id="addressDtl" title="상세주소 입력">
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">업종</th>
							<td><input type="text" id="workTypeNm" title="업종 입력" ></td>
						</tr>
						<tr>
							<th scope="row">회사명 <span class="cRed">*</span></th>
							<td><input type="text" id="workAddr" title="회사명 입력" ></td>
						</tr>
						<tr>
							<th scope="row">회사전화</th>
							<td>
								<div class="selectbox w100">
									<span id="workTelSpan">02</span>
									<select title="전화번호 첫번째 자리 선택" id="workTel1">
										<option value="02" selected>02</option>
										<option value="031">031</option>
										<option value="032">032</option>
										<option value="033">033</option>
										<option value="041">041</option>
										<option value="042">042</option>
										<option value="043">043</option>
										<option value="051">051</option>
										<option value="052">052</option>
										<option value="053">053</option>
										<option value="054">054</option>
										<option value="055">055</option>
										<option value="061">061</option>
										<option value="062">062</option>
										<option value="063">063</option>
										<option value="064">064</option>
									</select>
								</div>
								<span>-</span>
								<input type="text" class="w100" id="workTel2" title="전화번호 두번째 자리 입력" maxlength='4' numberOnly>
								<span>-</span>
								<input type="text" class="w100" id="workTel3" title="전화번호 세번째 자리 입력" maxlength='4' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">직책</th>
							<td><input type="text" id="positionNm" title="직책 입력" ></td>
						</tr>
						<tr>
							<th scope="row">회원상태</th>
							<td id="useYn">정상</td>
						</tr>
						<tr>
							<th scope="row">가입일</th>
							<td id="createDate">2020.12.03</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="left">
					<button type="button" class="btn btnGray" id="useYnUpdate">휴먼해지</button>
					<button type="button" class="btn btnPointL" id="secession">탈퇴처리</button>
				</div>
				<div class="right">
					<button type="button" class="btn btnPointL" id="listBtn">목록</button>
					<button type="button" class="btn btnPoint" id="updateBtn">수정</button>
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
