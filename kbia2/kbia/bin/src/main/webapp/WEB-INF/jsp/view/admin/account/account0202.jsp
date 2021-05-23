<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta name="format-detection" content="telephone=no, address=no, email=no">
<title>관리자</title>
<link rel="stylesheet" href="/resouces/css/admin/style.css" />
<!--[if lte IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/jquery-ui.js"></script>
<script src="/resouces/js/admin/common.js"></script>
</head>

<body>
<!-- wrap -->
<div id="wrap">
	<!-- header -->
	<div id="header">
		<div class="inner">
			<h1><a href="">한국전지산업협회</a></h1>
			<div class="util">
				<strong>환영합니다. 000님</strong>
				<button type="button">마이페이지</button>
				<button type="button">로그아웃</button>
			</div>
		</div>
		<!-- <div id="gnb">
			<ul>
				<li><a href="">대시보드</a></li>
				<li><a href="">등록</a></li>
				<li><a href="">조회</a></li>
				<li><a href="">통계</a>
					<ul>
						<li><a href="">유형별 전체</a></li>
						<li><a href="">유형별 상세</a></li>
						<li><a href="">심판별</a></li>
						<li><a href="">심판조별</a></li>
						<li><a href="">팀별</a></li>
						<li><a href="">시간별 분석표</a></li>
						<li><a href="">오독</a></li>
						<li><a href="">판독거부</a></li>
					</ul>
				</li>
				<li><a href="">관리</a>
					<ul>
						<li><a href="">경기관리</a></li>
						<li><a href="">코드관리</a></li>
						<li><a href="">사용자관리</a></li>
					</ul>
				</li>
			</ul>
		</div> -->
	</div>
	<!--// header -->

	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<div class="lnb">
			<ul>
				<li class="curr"><a href="">계정</a>
					<ul>
						<li class="curr"><a href="">홈페이지 회원</a></li>
						<li><a href="">관리자 회원</a></li>
					</ul>
				</li>
				<li><a href="">컨텐츠</a>
					<ul>
						<li><a href="">메인 배너</a></li>
						<li><a href="">팝업</a></li>
						<li><a href="">연혁</a></li>
					</ul>
				</li>
				<li><a href="">알림마당</a>
					<ul>
						<li><a href="">공지사항</a></li>
						<li><a href="">산업뉴스</a></li>
						<li><a href="">행사정보</a></li>
					</ul>
				</li>
				<li><a href="">정보마당</a>
					<ul>
						<li><a href="">주간브리프</a></li>
						<li><a href="">The Battery</a></li>
						<li><a href="">기술동향</a></li>
						<li><a href="">기술자료실</a></li>
						<li><a href="">채용공고</a></li>
					</ul>
				</li>
				<li><a href="">회원사</a></li>
				<li><a href="">통계</a>
					<ul>
						<li><a href="">접속통계</a></li>
						<li><a href="">월별통계</a></li>
						<li><a href="">일일통계</a></li>
					</ul>
				</li>
			</ul>
		</div>
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
					<caption>ID, 비밀번호, 비밀번호 확인, 이름, 전화번호, 휴대폰번호, 이메일, 소속, 권한 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">ID <span class="cRed">*</span></th>
							<td>
								<input type="text" title="ID 입력" placeholder="영문 3자 이상">
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
						<tr>
							<th scope="row">비밀번호 <span class="cRed">*</span></th>
							<td>
								<input type="password" title="비밀번호 입력" placeholder="영문+숫자 6자 이상">
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
						<tr>
							<th scope="row">비밀번호 확인 <span class="cRed">*</span></th>
							<td>
								<input type="password" title="비밀번호 입력" placeholder="영문+숫자 6자 이상">
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
						<tr>
							<th scope="row">이름 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="이름 입력">
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td><input type="text" title="전화번호 입력" placeholder="- 없이 숫자만 입력해주세요."></td>
						</tr>
						<tr>
							<th scope="row">휴대폰번호 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="전화번호 입력" placeholder="- 없이 숫자만 입력해주세요.">
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
						<tr>
							<th scope="row">이메일 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="이메일 주소 입력">
								<span>@</span>
								<input type="text" title="이메일 호스트 입력">
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
						<tr>
							<th scope="row">소속</th>
							<td><input type="text" title="소속 입력"></td>
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
														<input type="checkbox" id="chk0101">
														<label for="chk0101">계정</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0201">
														<label for="chk0201">컨텐츠</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0301">
														<label for="chk0301">알림마당</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0401">
														<label for="chk0401">정보마당</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0501">
														<label for="chk0501">회원사</label>
													</span>
												</th>
												<th scope="col">
													<span class="checkbox">
														<input type="checkbox" id="chk0601">
														<label for="chk0601">통계</label>
													</span>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0102">
														<label for="chk0102">홈페이지 회원</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0202">
														<label for="chk0202">메인 배너</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0302">
														<label for="chk0302">공지사항</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0402">
														<label for="chk0402">주간브리프</label>
													</span>
												</td>
												<td></td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0602">
														<label for="chk0601">접속통계</label>
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0103">
														<label for="chk0103">관리자 회원</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0203">
														<label for="chk0203">연혁</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0303">
														<label for="chk0303">산업뉴스</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0403">
														<label for="chk0403">The battery</label>
													</span>
												</td>
												<td></td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0603">
														<label for="chk0603">월별통계</label>
													</span>
												</td>
											</tr>
											<tr>
												<td></td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0204">
														<label for="chk0204">직원연락처</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0304">
														<label for="chk0304">행사정보</label>
													</span>
												</td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0404">
														<label for="chk0404">기술동향</label>
													</span>
												</td>
												<td></td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0604">
														<label for="chk0604">일일통계</label>
													</span>
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<span class="checkbox">
													<span class="checkbox">
														<input type="checkbox" id="chk0405">
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
													<span class="checkbox">
														<input type="checkbox" id="chk0406">
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
								<span class="cRed">[에러메시지 영역]</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" class="btn btnPointL">취소</button>
					<button type="button" class="btn btnPoint">저장</button>
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
