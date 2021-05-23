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
			<h2>
				팝업
				<p><span class="cRed">*</span> 표시는 필수값 입력입니다.</p>
			</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>팝업 구분, 제목, 내용, 링크, 노출기간, 노출위치 , 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">팝업 구분 <span class="cRed">*</span></th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="chk01">
										<label for="chk0101">이미지</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01" checked>
										<label for="chk0102">텍스트</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">제목 <span class="cRed">*</span></th>
							<td><input type="text" title="제목 입력" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">내용 <span class="cRed">*</span></th>
							<td>
								<textarea title="내용 입력">에디터 영역</textarea>
							</td>
						</tr>
						<tr>
							<th scope="row">링크</th>
							<td><input type="text" title="링크 입력" class="w412"></td>
						</tr>
						<tr>
							<th scope="row">노출기간</th>
							<td>
								<span class="checkbox">
									<input type="checkbox" id="chk0101" checked>
									<label for="chk0101">상시노출</label>
								</span>
								<span class="date"><input type="text" title="등록일선택"></span>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="시 선택">
										<option value="">시</option>
										<option value="">00</option>
										<option value="">01</option>
										<option value="">02</option>
										<option value="">03</option>
										<option value="">04</option>
										<option value="">05</option>
										<option value="">06</option>
										<option value="">07</option>
										<option value="">08</option>
										<option value="">09</option>
										<option value="">10</option>
										<option value="">11</option>
										<option value="">12</option>
										<option value="">13</option>
										<option value="">14</option>
										<option value="">15</option>
										<option value="">16</option>
										<option value="">17</option>
										<option value="">18</option>
										<option value="">19</option>
										<option value="">20</option>
										<option value="">21</option>
										<option value="">22</option>
										<option value="">23</option>
									</select>
								</div>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="분 선택">
										<option value="">분</option>
										<option value="">00</option>
										<option value="">05</option>
										<option value="">10</option>
										<option value="">15</option>
										<option value="">20</option>
										<option value="">25</option>
										<option value="">30</option>
										<option value="">35</option>
										<option value="">40</option>
										<option value="">45</option>
										<option value="">50</option>
										<option value="">55</option>
									</select>
								</div>
								<span class="date"><input type="text" title="등록일선택"></span>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="시 선택">
										<option value="">시</option>
										<option value="">00</option>
										<option value="">01</option>
										<option value="">02</option>
										<option value="">03</option>
										<option value="">04</option>
										<option value="">05</option>
										<option value="">06</option>
										<option value="">07</option>
										<option value="">08</option>
										<option value="">09</option>
										<option value="">10</option>
										<option value="">11</option>
										<option value="">12</option>
										<option value="">13</option>
										<option value="">14</option>
										<option value="">15</option>
										<option value="">16</option>
										<option value="">17</option>
										<option value="">18</option>
										<option value="">19</option>
										<option value="">20</option>
										<option value="">21</option>
										<option value="">22</option>
										<option value="">23</option>
									</select>
								</div>
								<div class="selectbox w100">
									<span>선택</span>
									<select title="분 선택">
										<option value="">분</option>
										<option value="">00</option>
										<option value="">05</option>
										<option value="">10</option>
										<option value="">15</option>
										<option value="">20</option>
										<option value="">25</option>
										<option value="">30</option>
										<option value="">35</option>
										<option value="">40</option>
										<option value="">45</option>
										<option value="">50</option>
										<option value="">55</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">노출위치</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" checked>
										<label for="chk0201">좌측</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02">
										<label for="chk0202">중앙</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0203" name="chk02">
										<label for="chk0203">우측</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0301" name="chk03" checked>
										<label for="chk0201">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0302" name="chk03">
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
										<input type="radio" id="chk0401" name="chk04" checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0402" name="chk04">
										<label for="chk0202">미사용</label>
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
