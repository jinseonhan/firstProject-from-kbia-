<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/admin/member/memberAdminList.js"></script>
	<input type="hidden" id="lnbset1" value="member"> <!-- 중분류 -->
	<input type="hidden" id="lnbset2" value="memberAdminList"> <!-- 해당 jsp명 -->
	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>회원사</h2>

			<!-- searchArea -->
			<div class="searchArea">
				<div class="inBox">
					<table>
						<caption>등록일, 회사명, 구분, 사용여부, 언어 항목으로 구성된 회원사 검색 표 입니다.</caption>
						<colgroup>
							<col style="width:70px">
							<col style="width:450px">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">등록일</th>
								<td>
									<div class="dateWrap">
										<span class="date"><input type="text" title="시작날짜선택" id="startDate"></span>
										<em>~</em>
										<span class="date"><input type="text" title="종료날짜선택" id="endDate"></span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">회사명</th>
								<td><input type="text" title="회사명 입력" class="w430" id="comNm"></td>
							</tr>
							<tr>
								<th scope="row">구분</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0101" value="on" name="chk01" checked>
											<label for="chk0101">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0102" value="M2" name="chk01">
											<label for="chk0102">일반회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0103" value="M3"name="chk01">
											<label for="chk0103">준회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0104" value="M4" name="chk01">
											<label for="chk0104">특별회원</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0105" value="M1" name="chk01">
											<label for="chk0105">임원</label>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">사용여부</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0201" value="on" name="chk02" checked>
											<label for="chk0201">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0202" value="Y" name="chk02">
											<label for="chk0202">사용</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0203" value="N" name="chk02">
											<label for="chk0203">미사용</label>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">언어</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0301"  value="on" name="chk03" checked>
											<label for="chk0301">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0302" value="KOR" name="chk03">
											<label for="chk0302">국문</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0303" value="ENG" name="chk03">
											<label for="chk0303">영문</label>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">노출여부</th>
								<td>
									<div class="checkboxWrap">
										<span class="checkbox">
											<input type="radio" id="chk0401"  value="on" name="chk04" checked>
											<label for="chk0401">전체</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0402" value="Y" name="chk04">
											<label for="chk0402">Y</label>
										</span>
										<span class="checkbox">
											<input type="radio" id="chk0403" value="N" name="chk04">
											<label for="chk0403">N</label>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="btnArea">
					<button class="btn btnPoint" id="search"><span class="icoSearch">검색</span></button>
				</div>
			</div>
			<!--// searchArea -->
			<!-- tableTop -->
			<div class="tableTop">
				<div class="right">
					<button type="button" class="btn btnPoint" onclick="location.href='/admin/memberAdminRegist.do'">등록</button>
				</div>
			</div>
			<!--// tableTop -->
			<!-- colTable -->
			<div class="colTable" id="colTable">
				 <!-- <table>
					<caption>순번, 언어, 회원구분, 회사명, 사용여부, 작성자, 등록일 항목으로 구성된 회원사 조회 리스트 테이블입니다.</caption>
					<colgroup>
						<col style="width:80px">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:400px">
						<col style="width:auto">
						<col style="width:auto">
						<col style="width:auto">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">순번</th>
							<th scope="col">언어</th>
							<th scope="col">회원구분</th>
							<th scope="col">회사명</th>
							<th scope="col">사용여부</th>
							<th scope="col">작성자</th>
							<th scope="col">등록일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>100</td>
							<td><a href="">국문</a></td>
							<td>임원</td>
							<td></td>
							<td>사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>99</td>
							<td><a href="">국문</a></td>
							<td>일반회원</td>
							<td></td>
							<td>사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>98</td>
							<td><a href="">국문</a></td>
							<td>준회원</td>
							<td></td>
							<td>사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>97</td>
							<td><a href="">국문</a></td>
							<td>특별회원</td>
							<td></td>
							<td>미사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
						<tr>
							<td>96</td>
							<td><a href="">국문</a></td>
							<td>임원</td>
							<td></td>
							<td>미사용</td>
							<td>admin</td>
							<td>2019.05.10</td>
						</tr>
					</tbody>
				</table> -->
			</div>
			<!--// colTable -->
			<!-- paging -->
			<!-- <div class="paging">
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
			</div> -->
			<!--// paging -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

<!--// wrap -->
</body>
</html>
