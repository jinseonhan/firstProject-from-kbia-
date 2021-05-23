<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
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
			<h2>팝업</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>등록일, 제목, 사용여부, 언어 항목으로 구성된 팝업 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">등록일</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" title="시작날짜선택"></span>
										<em>~</em>
										<span class="date"><input type="text" title="종료날짜선택"></span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">제목</th>
								<td><input type="text" title="제목 입력" class="w430"></td>
							</tr>
							<tr>
								<th scope="row">사용여부</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" name="chk01" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" name="chk01">
											<label for="chk0102">사용</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" name="chk01">
											<label for="chk0103">미사용</label>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">언어</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0201" name="chk02" checked>
											<label for="chk0201">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0202" name="chk02">
											<label for="chk0202">국문</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0203" name="chk02">
											<label for="chk0203">영문</label>
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
				<div class="right">
					<button type="button" class="btn btnPoint">등록</button>
				</div>
			</div>
			<!--// tableTop -->
			<!-- colTable -->
			<div class="colTable">
				<table>
					<caption>순번, 언어, 제목, 노출위치, 사용여부, 작성자, 등록일 항목으로 구성된 팝업 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:80px">
						<col style="width:auto">
						<col style="width:400px">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">순번</th>
							<th scope="col">언어</th>
							<th scope="col">제목</th>
							<th scope="col">노출위치</th>
							<th scope="col">사용여부</th>
							<th scope="col">작성자</th>
							<th scope="col">등록일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>100</td>
							<td>국문</td>
							<td class="txtL"><a href="">리튬이차전지시험평가인증센터 홈페이지 안내</a></td>
							<td>좌</td>
							<td>사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>99</td>
							<td>국문</td>
							<td class="txtL"><a href="">리튬이차전지시험평가인증센터 홈페이지 안내</a></td>
							<td>우</td>
							<td>사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>98</td>
							<td>국문</td>
							<td class="txtL"><a href="">리튬이차전지시험평가인증센터 홈페이지 안내</a></td>
							<td>중</td>
							<td>사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>97</td>
							<td>국문</td>
							<td class="txtL"><a href="">리튬이차전지시험평가인증센터 홈페이지 안내</a></td>
							<td>-</td>
							<td>미사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>96</td>
							<td>국문</td>
							<td class="txtL"><a href="">리튬이차전지시험평가인증센터 홈페이지 안내</a></td>
							<td>-</td>
							<td>미사용</td>
							<td>admin</td>
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
