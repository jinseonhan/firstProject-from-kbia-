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
			<h2>마이페이지</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>ID, 비밀번호, 비밀번호 확인, 이름, 전화번호, 휴대폰번호, 이메일, 소속 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">ID <span class="cRed">*</span></th>
							<td>abcdefg</td>
						</tr>
						<tr>
							<th scope="row">비밀번호 <span class="cRed">*</span></th>
							<td><input type="password" title="비밀번호 입력" placeholder="영문+숫자 6자 이상"></td>
						</tr>
						<tr>
							<th scope="row">비밀번호 확인 <span class="cRed">*</span></th>
							<td><input type="password" title="비밀번호 확인 입력" placeholder="영문+숫자 6자 이상"></td>
						</tr>
						<tr>
							<th scope="row">이름 <span class="cRed">*</span></th>
							<td><input type="text" title="이름 입력"></td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td><input type="text" title="전화번호 입력" placeholder="- 없이 숫자만 입력해주세요."></td>
						</tr>
						<tr>
							<th scope="row">휴대폰번호 <span class="cRed">*</span></th>
							<td><input type="text" title="휴대폰번호 입력" placeholder="- 없이 숫자만 입력해주세요."></td>
						</tr>
						<tr>
							<th scope="row">이메일 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="이메일 입력">
								<span>@</span>
								<input type="text" title="도메인 입력">
							</td>
						</tr>
						<tr>
							<th scope="row">소속</th>
							<td><input type="text" title="소속 입력"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" class="btn btnPointL">취소</button>
					<button type="button" class="btn btnPoint">수정</button>
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
