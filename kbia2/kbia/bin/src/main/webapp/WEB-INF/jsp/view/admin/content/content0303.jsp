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
			<h2>연혁</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>분류, 년/월, 제목, 언어, 사용여부, 등록정보 항목으로 구성된 수정 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">분류</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="chk01" checked>
										<label for="chk0101">협회</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01">
										<label for="chk0102">조합</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">년/월 <span class="cRed">*</span></th>
							<td>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="년 선택">
										<option value="">년</option>
										<option value="">2022년</option>
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
										<option value="">2009년</option>
										<option value="">2008년</option>
										<option value="">2007년</option>
										<option value="">2006년</option>
										<option value="">2005년</option>
									</select>
								</div>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="월 선택">
										<option value="">월</option>
										<option value="">12월</option>
										<option value="">11월</option>
										<option value="">10월</option>
										<option value="">9월</option>
										<option value="">8월</option>
										<option value="">7월</option>
										<option value="">6월</option>
										<option value="">5월</option>
										<option value="">4월</option>
										<option value="">3월</option>
										<option value="">2월</option>
										<option value="">1월</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" title="제목 입력" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" checked>
										<label for="chk0201">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02">
										<label for="chk0202">영문</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">사용여부</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0301" name="chk03" checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0302" name="chk03">
										<label for="chk0202">미사용</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">등록정보</th>
							<td>등록자 ID / 최종수정일</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" class="btn btnPointL">삭제</button>
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
