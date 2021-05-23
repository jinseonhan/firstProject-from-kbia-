<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

	<title>회원가입 &lt; 멤버쉽 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	
	<script src="/resouces/js/user/account/signUp2.js"></script>
	<input type="hidden" id="path" value="signUp" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="membership" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="account1" /> <!-- 두번째 path -->
	<input type="hidden" id="idChk" value="none"/>
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v7">
			<h2>멤버쉽</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>회원가입</h3>
			<!-- step -->
			<div class="step">
				<ol>
					<li class="curr">
						<span>Step 1</span>
						<strong>약관동의</strong>
					</li>
					<li class="curr">
						<span>Step 2</span>
						<strong>정보입력</strong>
					</li>
					<li>
						<span>Step 3</span>
						<strong>가입완료</strong>
					</li>
				</ol>
			</div>
			<!--// step -->
			<!-- titArea -->
			<div class="titArea">
				<h4>아이디 정보</h4>
			</div>
			<!--// titArea -->
			<!-- inputTable -->
			<div class="inputTable">
				<table>
					<caption>희망 아이디, 비밀번호, 비밀번호 확인 항목으로 구성된 아이디 정보 표입니다.</caption>
					<colgroup>
						<col style="width:180px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">희망 아이디<span class="cRed">*</span></th>
							<td>
								<div class="inputBtn">
									<input type="text" id="userId" title="희망 아이디 입력" maxlength='12'>
									<button type="button" id="redupBtn" class="btn btnGray">아이디 중복확인</button>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">비밀번호<span class="cRed">*</span></th>
							<td><input type="password" id="passwd" title="비밀번호 입력" maxlength='20'></td>
						</tr>
						<tr>
							<th scope="row">비밀번호 확인<span class="cRed">*</span></th>
							<td><input type="password" id="passwd2" title="비밀번호 확인 재입력" maxlength='20'></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// inputTable -->

			<!-- titArea -->
			<div class="titArea">
				<h4>개인 정보</h4>
			</div>
			<!--// titArea -->
			<!-- inputTable -->
			<div class="inputTable">
				<table>
					<caption>이름, 전화번호, 휴대폰 번호, 이메일, 주소 항목으로 구성된 개인 정보 표입니다.</caption>
					<colgroup>
						<col style="width:180px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">이름<span class="cRed">*</span></th>
							<td><input type="text" id="userNm" title="이름 입력" class="byteLimit" limitbyte="25"></td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td>
								<div class="tel">
									<div class="selectBox">
										<span>02</span>
										<select id="homeTel1" title="전화번호 첫번째 자리 선택">
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
									<input type="text" id="homeTel2" title="전화번호 두번째 자리 입력" maxlength='4' numberOnly>
									<span>-</span>
									<input type="text" id="homeTel3" title="전화번호 세번째 자리 입력" maxlength='4' numberOnly>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">휴대폰 번호</th>
							<td>
								<div class="tel">
									<div class="selectBox">
										<span>010</span>
										<select id="perTel1" title="휴대폰 번호 첫번째 자리 선택">
											<option value="010" selected>010</option>
											<option value="011">011</option>
											<option value="016">016</option>
											<option value="018">018</option>
											<option value="019">019</option>
										</select>
									</div>
									<span>-</span>
									<input type="text" id="perTel2" title="휴대폰 번호 두번째 자리 입력" maxlength='4' numberOnly>
									<span>-</span>
									<input type="text" id="perTel3" title="휴대폰 번호 세번째 자리 입력" maxlength='4' numberOnly>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row" >이메일</th>
							<td id="email">${param.email }</td>
						</tr>
						<tr>
							<th scope="row">주소<span class="cRed">*</span></th>
							<td>
								<div class="address">
									<div class="inputBtn">
										<input type="text" id="addressNo" title="우편번호 검색 입력" readonly>
										<button type="button" id="addressBtn" class="btn btnGray">우편번호 찾기</button>
									</div>
									<input type="text" id="address" title="주소 입력" readonly>
									<input type="text" id="addressDtl" title="상세주소 입력">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// inputTable -->
			<!-- titArea -->
			<div class="titArea">
				<h4>부가 정보</h4>
			</div>
			<!--// titArea -->
			<!-- inputTable -->
			<div class="inputTable">
				<table>
					<caption>업종, 근무처, 팩스번호, 직책 항목으로 구성된 부가 정보 표입니다.</caption>
					<colgroup>
						<col style="width:180px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">업종</th>
							<td><input type="text" id="workTypeNm" title="업종 입력" class="byteLimit" limitbyte="50"></td>
						</tr>
						<tr>
							<th scope="row">회사명(근무처)<span class="cRed">*</span></th>
							<td><input type="text" id="workAddr" title="근무처 입력" class="byteLimit" limitbyte="100"></td>
						</tr>
						<tr>
							<th scope="row">회사전화</th>
							<td>
								<div class="tel">
									<div class="selectBox">
										<span>02</span>
										<select id="workTel1" title="회사전화 첫번째 자리 선택">
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
									<input type="text" id="workTel2" title="회사전화 두번째 자리 입력" maxlength='4' numberOnly>
									<span>-</span>
									<input type="text" id="workTel3" title="회사전화 세번째 자리 입력" maxlength='4' numberOnly>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">직책</th>
							<td><input type="text" id="positionNm" title="직책 입력" class="byteLimit" limitbyte="50"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// inputTable -->

			<!-- btnCenter -->
			<div class="btnCenter v2">
				<button type="button" id="signUpBtn" class="btn btnBlue">회원가입</button>
			</div>
			<!--// btnCenter -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
