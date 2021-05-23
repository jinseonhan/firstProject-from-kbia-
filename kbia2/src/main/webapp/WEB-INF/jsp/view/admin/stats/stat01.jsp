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
			<h2>접속통계</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>검색기간 항목으로 구성된 접속통계 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">검색기간</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" title="시작날짜선택"></span>
										<em>~</em>
										<span class="date"><input type="text" title="종료날짜선택"></span>
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
			<!-- colTable -->
			<div class="colTable">
				<table>
					<caption>오늘 방문자 수, 이번달 방문자 수, 총방문자수 항목으로 구성된 접속통계 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">오늘 방문자 수</th>
							<th scope="col">이번달 방문자 수</th>
							<th scope="col">총방문자수</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>0000</td>
							<td>0000</td>
							<td>00000000</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// colTable -->
			<!-- tableTop -->
			<div class="tableTop mT20">
				<p class="total">검색기간: <strong>0000.00.00 ~ 0000.00.00</strong></p>
			</div>
			<!--// tableTop -->
			<!-- colTable -->
			<div class="colTable">
				<table>
					<caption>IP, 접속경로, 접속수, 접속일 항목으로 구성된 접속통계 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:auto">
						<col style="width:500px">
						<col style="width:auto">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">IP</th>
							<th scope="col">접속경로</th>
							<th scope="col">접속수</th>
							<th scope="col">접속일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>125.209.235.179</td>
							<td class="txtL"><a href="">https://search.naver .com/search.naver?sm =tab_hty.top&where=n exearch&query=%ED%95 %9C%EA%B5%AD%EC%A0%8 4%EC%A7%80%EC%82%B0% EC%97%85%ED%98%91%ED %9A%8C&oquery=%ED%95 %9C%EA%B5%AD%EC%A0%8 4%EC%A7%80%ED%98%91% ED%9A%8C&tqi=U8JCHsp 0JywssKKFbIlssssssXV -043950</a></td>
							<td>0000</td>
							<td><u>0000.00.00</u></td>
						</tr>
						<tr>
							<td>125.209.235.179</td>
							<td class="txtL"><a href="">https://www.google.co.kr/</a></td>
							<td>0000</td>
							<td><u>0000.00.00</u></td>
						</tr>
						<tr>
							<td>125.209.235.179</td>
							<td class="txtL"><a href="">BookMark</a></td>
							<td>0000</td>
							<td><u>0000.00.00</u></td>
						</tr>
						<tr>
							<td>125.209.235.179</td>
							<td class="txtL"><a href="">https://www.google.co.kr/</a></td>
							<td>0000</td>
							<td><u>0000.00.00</u></td>
						</tr>
						<tr>
							<td>125.209.235.179</td>
							<td class="txtL"><a href="">BookMark</a></td>
							<td>0000</td>
							<td><u>0000.00.00</u></td>
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
