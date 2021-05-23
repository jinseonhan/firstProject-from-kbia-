<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta name="format-detection" content="telephone=no, address=no, email=no">
<title>관리자</title>
<link rel="stylesheet" href="../css/style.css" />
<!--[if lte IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="../js/jquery-3.4.1.min.js"></script>
<script src="../js/jquery-ui.js"></script>
<script src="../js/common.js"></script>
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
			<h2>홈페이지 회원</h2>
			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>항목, 항목, 항목 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">인풋</th>
							<td><input type="text" title="ㅇㅇ 입력"></td>
						</tr>
						<tr>
							<th scope="row">셀렉트</th>
							<td>
								<div class="selectbox">
									<span>선택</span>
									<select title="ㅇㅇ 선택">
										<option value="">선택</option>
										<option value="">옵션</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">텍스트</th>
							<td><span>홍길동</span></td>
						</tr>
						<tr>
							<th scope="row">텍스트&amp;버튼</th>
							<td>
								<span>홍길동</span>
								<button type="button" class="btn btnGray">비밀번호 초기화</button>
							</td>
						</tr>
						<tr>
							<th scope="row">이메일</th>
							<td>
								<input type="text" title="이메일 주소 입력">
								<span>@</span>
								<input type="text" title="이메일 호스트 입력">
								<div class="selectbox">
									<span>직접 입력</span>
									<select title="호스트 선택">
										<option value="">직접 입력</option>
										<option value="">옵션</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">주소</th>
							<td>
								<input type="text" class="w100" title="우편번호 입력">
								<button type="button" class="btn btnGray">주소검색</button>
								<div class="line">
									<input type="text" class="flexItem" title="주소 입력">
									<input type="text" class="flexItem" title="상세주소 입력">
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="전화번호 첫번째 자리 선택">
										<option value="">선택</option>
										<option value="">010</option>
									</select>
								</div>
								<span>-</span>
								<input type="text" class="w100" title="전화번호 두번째 자리 입력">
								<span>-</span>
								<input type="text" class="w100" title="전화번호 세번째 자리 입력">
							</td>
						</tr>
						<tr>
							<th scope="row">라디오</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="chk01" checked>
										<label for="chk0101">라디오 1</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01">
										<label for="chk0102">라디오 2</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0103" name="chk01">
										<label for="chk0103">라디오 3</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">체크박스</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="checkbox" id="chk0201" checked>
										<label for="chk0201">체크박스 1</label>
									</span>
									<span class="checkbox">
										<input type="checkbox" id="chk0202">
										<label for="chk0202">체크박스 2</label>
									</span>
									<span class="checkbox">
										<input type="checkbox" id="chk0203">
										<label for="chk0203">체크박스 3</label>
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
				<div class="left">
					<button type="button" class="btn btnGray">휴먼해지</button>
					<button type="button" class="btn btnPointL">탈퇴처리</button>
				</div>
				<div class="right">
					<button type="button" class="btn btnPointL">삭제</button>
					<button type="button" class="btn btnPointL">취소</button>
					<button type="button" class="btn btnPointL">목록</button>
					<button type="button" class="btn btnPoint">수정</button>
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
