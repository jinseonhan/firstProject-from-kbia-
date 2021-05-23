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

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>가입일, 검색어, 회원등급, 회원상태 항목으로 구성된 홈페이지 회원 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
							<col style="width:70px">
							<col style="width:auto">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">가입일</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" title="시작날짜선택"></span>
										<em>~</em>
										<span class="date"><input type="text" title="종료날짜선택"></span>
									</div>
								</td>
								<th scope="row">검색어</th>
								<td><input type="text" title="검색어 입력" placeholder="ID or 이름 입력"></td>
							</tr>
							<tr>
								<th scope="row">회원등급</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" name="chk01" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" name="chk01">
											<label for="chk0102">일반회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" name="chk01">
											<label for="chk0103">정회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0104" name="chk01">
											<label for="chk0104">준회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0105" name="chk01">
											<label for="chk0105">특별회원</label>
										</span>
									</div>
								</td>
								<th scope="row">회원상태</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0201" name="chk02" checked>
											<label for="chk0201">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0202" name="chk02">
											<label for="chk0202">정상</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0203" name="chk02">
											<label for="chk0203">휴먼</label>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="btnArea">
					<button class="btn btnPoint"><span class="icoSearch">검색</span></button>
				</div>
			</div>
			<!--// searchArea -->
			<!-- tableTop -->
			<div class="tableTop">
				<p class="total">회원 수: <strong>0000</strong>명</p>
				<div class="right">
					<button type="button" class="btn btnPointL">엑셀 다운로드</button>
					<button type="button" class="btn btnPoint">등록</button>
				</div>
			</div>
			<!--// tableTop -->
			<!-- colTable -->
			<div class="colTable">
				<table>
					<caption> 항목으로 구성된 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:80px">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">순번</th>
							<th scope="col">ID</th>
							<th scope="col">이름</th>
							<th scope="col">회원등급</th>
							<th scope="col">회원상태</th>
							<th scope="col">가입일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>100</td>
							<td><a href="">abcdef</a></td>
							<td><a href="">이도</a></td>
							<td>준회원</td>
							<td>정상</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>100</td>
							<td><a href="">abcdef</a></td>
							<td><a href="">이도</a></td>
							<td>준회원</td>
							<td>정상</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>100</td>
							<td><a href="">abcdef</a></td>
							<td><a href="">이도</a></td>
							<td>준회원</td>
							<td>정상</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>100</td>
							<td><a href="">abcdef</a></td>
							<td><a href="">이도</a></td>
							<td>준회원</td>
							<td>정상</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>100</td>
							<td><a href="">abcdef</a></td>
							<td><a href="">이도</a></td>
							<td>준회원</td>
							<td>정상</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>100</td>
							<td><a href="">abcdef</a></td>
							<td><a href="">이도</a></td>
							<td>준회원</td>
							<td>정상</td>
							<td>2019.05.10</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// colTable -->
			<!-- paging -->
			<div class="paging">
				<div class="inner">
					<a href="" class="btnFirst">처음 페이지</a>
					<a href="" class="btnPrev">이전 페이지</a>
					<div class="page">
						<a href="">1</a>
						<a href="">2</a>
						<a href="">3</a>
						<strong>4</strong>
						<a href="">5</a>
					</div>
					<a href="" class="btnNext">다음 페이지</a>
					<a href="" class="btnLast">마지막 페이지</a>
				</div>
			</div>
			<!--// paging -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->
</div>
<!--// wrap -->
</body>
</html>
