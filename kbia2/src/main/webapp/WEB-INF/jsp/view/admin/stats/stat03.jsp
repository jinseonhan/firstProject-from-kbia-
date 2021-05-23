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
			<h2>일별통계</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>검색기간 항목으로 구성된 일별통계 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">검색기간</th>
								<td>
									<div class="selectbox">
										<span>선택</span>
										<select title="년도 선택">
											<option value="">년도</option>
											<option value="">2021년</option>
											<option value="">2020년</option>
											<option value="">2019년</option>
											<option value="">2018년</option>
											<option value="">2017년</option>
											<option value="">2016년</option>
											<option value="">2015년</option>
											<option value="">2014년</option>
											<option value="">2013년</option>
											<option value="">2012년</option>
											<option value="">2011년</option>
											<option value="">2010년</option>
										</select>
									</div>
									<div class="selectbox">
										<span>선택</span>
										<select title="월 선택">
											<option value="">월</option>
											<option value="">1월</option>
											<option value="">2월</option>
											<option value="">3월</option>
											<option value="">4월</option>
											<option value="">5월</option>
											<option value="">6월</option>
											<option value="">7월</option>
											<option value="">8월</option>
											<option value="">9월</option>
											<option value="">10월</option>
											<option value="">11월</option>
											<option value="">12월</option>
										</select>
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
					<caption>오늘 방문자 수, 이번달 방문자 수, 총방문자수 항목으로 구성된 일별통계 조회 리스트 테이블입니다.</caption>
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
				<p class="total">검색기간: <strong>2020년도 1월</strong></p>
			</div>
			<!--// tableTop -->
			<!-- colTable -->
			<div class="colTable">
				<table>
					<caption>날짜, 그래프, 접속통계 항목으로 구성된 일별통계 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:auto">
						<col style="width:700px">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">날짜</th>
							<th scope="col">그래프</th>
							<th scope="col">접속통계</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1일</td>
							<td>
								<div class="graph">
									<p><span style="width:50%"></span></p>
									<strong>00000000</strong>
								</div>
							</td>
							<td>3362 / 1.3%</td>
						</tr>
						<tr>
							<td>2일</td>
							<td>
								<div class="graph">
									<p><span style="width:50%"></span></p>
									<strong>00000000</strong>
								</div>
							</td>
							<td>3362 / 1.3%</td>
						</tr>
						<tr>
							<td>3일</td>
							<td>
								<div class="graph">
									<p><span style="width:50%"></span></p>
									<strong>00000000</strong>
								</div>
							</td>
							<td>3362 / 1.3%</td>
						</tr>
						<tr>
							<td>4일</td>
							<td>
								<div class="graph">
									<p><span style="width:50%"></span></p>
									<strong>00000000</strong>
								</div>
							</td>
							<td>3362 / 1.3%</td>
						</tr>
						<tr>
							<td>5일</td>
							<td>
								<div class="graph">
									<p><span style="width:50%"></span></p>
									<strong>00000000</strong>
								</div>
							</td>
							<td>3362 / 1.3%</td>
						</tr>
						<tr>
							<td>31일</td>
							<td>데이터가 없습니다.</td>
							<td>3362 / 1.3%</td>
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
