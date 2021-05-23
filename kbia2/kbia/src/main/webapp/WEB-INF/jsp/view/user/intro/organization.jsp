<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>조직도 및 연락처 &lt; 협회/조합 소개 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="organization" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="intro" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="introMap" /> <!-- 두번째 path -->
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v1">
			<h2>협회/조합 소개</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>조직도 및 연락처</h3>
			<!-- orgaChart -->
			<div class="orgaChart">
				<strong>정순남<br />부회장/ 부이사장</strong>
				<strong>구회진<br />상무/ 사무국장</strong>
				<ul>
					<li>
						<dl>
							<dt>경영지원팀</dt>
							<dd>인사·총무<br />회원지원</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>기획조사팀</dt>
							<dd>기획·조사<br />전시등</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>표준·인증팀</dt>
							<dd>산업정책지원<br />표준화, 규제대응 </dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>기반조성팀</dt>
							<dd>제주,광주,나주분원<br />통합관리·운영</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>연구기획팀</dt>
							<dd>R&amp;D기획·개발<br />기반조성 등</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>연구개발팀</dt>
							<dd>공동R&amp;D 창출,수행<br />사후관리, 세미나등</dd>
						</dl>
					</li>
				</ul>
			</div>
			<!--// orgaChart -->
			<!-- orgaList -->
			<div class="orgaList">
				<!-- 경영지원팀 -->
				<div class="listTable">
					<table>
						<caption>번호, 직책, 이름, 업무, 전화번호, 이메일 항목으로 구성된 경영지원팀 연락처 정보 표입니다.</caption>
						<colgroup>
							<col span="6" style="width:auto">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">번호</th>
								<th scope="col">직책</th>
								<th scope="col">이름</th>
								<th scope="col">업무</th>
								<th scope="col">전화번호</th>
								<th scope="col">이메일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>경영지원팀</td>
								<td>책임(팀장)</td>
								<td>최인규</td>
								<td>회계, 인사, 총무</td>
								<td><a href="tel:02-3461-9416">02-3461-9416</a></td>
								<td><a href="mailto:igchoi@k-bia.or.kr" class="btnMail">igchoi@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>경영지원팀</td>
								<td>전임</td>
								<td>장희정</td>
								<td>회계, 인사, 총무, 회원사 가입/탈퇴, 회원사 대응 운영</td>
								<td><a href="tel:02-3461-9400">02-3461-9400</a></td>
								<td><a href="mailto:hjjang@k-bia.or.kr" class="btnMail">hjjang@k-bia.or.kr</a></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--// 경영지원팀 -->
				<!-- 기획조사팀 -->
				<div class="listTable">
					<table>
						<caption>번호, 직책, 이름, 업무, 전화번호, 이메일 항목으로 구성된 기획조사팀 연락처 정보 표입니다.</caption>
						<colgroup>
							<col span="6" style="width:auto">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">번호</th>
								<th scope="col">직책</th>
								<th scope="col">이름</th>
								<th scope="col">업무</th>
								<th scope="col">전화번호</th>
								<th scope="col">이메일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>기획조사팀</td>
								<td>수석(팀장)</td>
								<td>이명규</td>
								<td>기획, 조사업무 총괄</td>
								<td><a href="tel:02-3461-9404">02-3461-9404</a></td>
								<td><a href="mailto:mklee@k-bia.or.kr" class="btnMail">mklee@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기획조사팀</td>
								<td>책임</td>
								<td>최영호</td>
								<td>전시회/이사회/산업연수단 운영</td>
								<td><a href="tel:02-3461-9407">02-3461-9407</a></td>
								<td><a href="mailto:yhchoi@k-bia.or.kr" class="btnMail">yhchoi@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기획조사팀</td>
								<td>선임</td>
								<td>오동석</td>
								<td>통계/조세 및 관세</td>
								<td><a href="tel:02-3461-9408">02-3461-9408</a></td>
								<td><a href="mailto:dsoh@k-bia.or.kr" class="btnMail">dsoh@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기획조사팀</td>
								<td>전임</td>
								<td>장미</td>
								<td>컨퍼런스/규제/컨소시엄/대외업무(해외)</td>
								<td><a href="tel:070-5097-0687">070-5097-0687</a></td>
								<td><a href="mailto:mjang@k-bia.or.kr" class="btnMail">mjang@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기획조사팀</td>
								<td>선임</td>
								<td>박재현</td>
								<td>통계조사 및 정보제공/환경 및 원자재/인력양성</td>
								<td><a href="tel:02-3461-9405">02-3461-9405</a></td>
								<td><a href="mailto:jhpark@k-bia.or.kr" class="btnMail">jhpark@k-bia.or.kr</a></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--// 기획조사팀 -->
				<!-- 표준. 인증팀 -->
				<div class="listTable">
					<table>
						<caption>번호, 직책, 이름, 업무, 전화번호, 이메일 항목으로 구성된 표준인증팀 연락처 정보 표입니다.</caption>
						<colgroup>
							<col span="6" style="width:auto">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">번호</th>
								<th scope="col">직책</th>
								<th scope="col">이름</th>
								<th scope="col">업무</th>
								<th scope="col">전화번호</th>
								<th scope="col">이메일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>표준인증팀</td>
								<td>책임(팀장)</td>
								<td>조민영</td>
								<td>표준화/ 단체표준 인증</td>
								<td><a href="tel:02-3461-9409">02-3461-9409</a></td>
								<td><a href="mailto:mycho@k-bia.or.kr" class="btnMail">mycho@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>표준인증팀</td>
								<td>전임</td>
								<td>박예슬</td>
								<td>단체표준 인증 및 국가표준 개발</td>
								<td><a href="tel:02-3641-9418">02-3641-9418</a></td>
								<td><a href="mailto:yspark@k-bia.or.kr" class="btnMail">yspark@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>표준인증팀</td>
								<td>전임</td>
								<td>유기훈</td>
								<td>단체표준 인증 및 국가표준 개발</td>
								<td><a href="tel:02-3641-9406">02-3641-9406</a></td>
								<td><a href="mailto:khyu@k-bia.or.kr" class="btnMail">khyu@k-bia.or.kr</a></td>
							</tr>
							
						</tbody>
					</table>
				</div>
				<!--// 표준. 인증팀 -->
				<!-- 기반조성팀 -->
				<div class="listTable">
					<table>
						<caption>번호, 직책, 이름, 업무, 전화번호, 이메일 항목으로 구성된 기반조성팀 연락처 정보 표입니다.</caption>
						<colgroup>
							<col span="6" style="width:auto">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">번호</th>
								<th scope="col">직책</th>
								<th scope="col">이름</th>
								<th scope="col">업무</th>
								<th scope="col">전화번호</th>
								<th scope="col">이메일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>기반조성팀</td>
								<td>책임</td>
								<td>유어현</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:070-4647-1044">070-4647-1044</a></td>
								<td><a href="mailto:ehyoo@k-bia.or.kr" class="btnMail">ehyoo@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기반조성팀</td>
								<td>책임</td>
								<td>권오준</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td></td>
								<td><a href="mailto:ojkwon@k-bia.or.kr" class="btnMail">ojkwon@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기반조성팀</td>
								<td>선임</td>
								<td>박남환</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td></td>
								<td><a href="mailto:nhpark@k-bia.or.kr" class="btnMail">nhpark@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기반조성팀(조합)</td>
								<td>선임</td>
								<td>지현준</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:070-5097-0385"></a>070-5097-0385</td>
								<td><a href="mailto:hjji@k-bia.or.kr" class="btnMail">hjji@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>기반조성팀</td>
								<td>선임</td>
								<td>김동욱</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:070-4674-1045">070-4647-1045</a></td>
								<td><a href="mailto:dwkim@k-bia.or.kr" class="btnMail">dwkim@k-bia.or.kr</a></td>
							</tr>
														<tr>
								<td>기반조성팀</td>
								<td>전임</td>
								<td>이용희</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:070-4647-1046">070-4647-1046</a></td>
								<td><a href="mailto:yhlee@K-bia.or.kr" class="btnMail">yhlee@K-bia.or.kr</a></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--// 기반조성팀 -->
				<!-- 연구기획팀 -->
				<div class="listTable">
					<table>
						<caption>번호, 직책, 이름, 업무, 전화번호, 이메일 항목으로 구성된 연구기획팀 연락처 정보 표입니다.</caption>
						<colgroup>
							<col span="6" style="width:auto">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">번호</th>
								<th scope="col">직책</th>
								<th scope="col">이름</th>
								<th scope="col">업무</th>
								<th scope="col">전화번호</th>
								<th scope="col">이메일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>연구기획팀</td>
								<td>수석(팀장)</td>
								<td>김유탁</td>
								<td>R&amp;D 기획/ 표준화 및 국제협력총괄</td>
								<td><a href="tel:070-4647-1041">070-4647-1041</a></td>
								<td><a href="mailto:ytkim@k-bia.or.kr" class="btnMail">ytkim@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구기획팀</td>
								<td>선임</td>
								<td>이상아</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:02-3461-9413">02-3461-9413</a></td>
								<td><a href="mailto:salee@k-bia.or.kr" class="btnMail">salee@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구기획팀</td>
								<td>선임</td>
								<td>정수안</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:02-3461-9403">02-3461-9403</a></td>
								<td><a href="mailto:sajung@k-bia.or.kr" class="btnMail">sajung@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구기획팀</td>
								<td>선임</td>
								<td>차동민</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td></td>
								<td><a href="mailto:dmcha@k-bia.or.kr" class="btnMail">dmcha@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구기획팀</td>
								<td>전임</td>
								<td>유재승</td>
								<td>신사업 기획/ R&amp;D 기획 및 관리</td>
								<td><a href="tel:070-5097-1253">070-5097-1253</a></td>
								<td><a href="mailto:jsyoo@k-bia.or.kr" class="btnMail">jsyoo@k-bia.or.kr</a></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--// 연구기획팀 -->
				<!-- 연구개발팀 -->
				<div class="listTable">
					<table>
						<caption>번호, 직책, 이름, 업무, 전화번호, 이메일 항목으로 구성된 연구개발팀 연락처 정보 표입니다.</caption>
						<colgroup>
							<col span="6" style="width:auto">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">번호</th>
								<th scope="col">직책</th>
								<th scope="col">이름</th>
								<th scope="col">업무</th>
								<th scope="col">전화번호</th>
								<th scope="col">이메일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>연구개발팀</td>
								<td>수석(팀장)</td>
								<td>강석기</td>
								<td>R&amp;D기획 및 과제관리/ 산업/기술동향 총괄</td>
								<td><a href="tel:02-3461-9410">02-3461-9410</a></td>
								<td><a href="mailto:sgkang@k-bia.or.kr" class="btnMail">sgkang@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구개발팀</td>
								<td>책임</td>
								<td>전두진</td>
								<td>R&amp;D기획 및 과제관리/ 산업/기술동향</td>
								<td><a href="tel:02-3641-9411">02-3641-9411</a></td>
								<td><a href="mailto:djjun@k-bia.or.kr" class="btnMail">djjun@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구개발팀</td>
								<td>선임</td>
								<td>권하리</td>
								<td>R&amp;D 과제관리/ 산업/기술동향</td>
								<td><a href="tel:02-3641-9414">02-3641-9414</a></td>
								<td><a href="mailto:hrkwon@k-bia.or.kr" class="btnMail">hrkwon@k-bia.or.kr</a></td>
							</tr>
							<tr>
								<td>연구개발팀</td>
								<td>전임</td>
								<td>박미정</td>
								<td>R&amp;D과제관리/ 산업/기술동향</td>
								<td><a href="tel:02-3641-9412">02-3641-9412</a></td>
								<td><a href="mailto:mjpark@k-bia.or.kr" class="btnMail">mjpark@k-bia.or.kr</a></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--// 연구개발팀 -->
			</div>
			<!--// orgaList -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
