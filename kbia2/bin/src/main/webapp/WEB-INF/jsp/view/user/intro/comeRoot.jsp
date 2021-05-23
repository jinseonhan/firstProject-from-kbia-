<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<title>오시는길 &lt; 협회/조합 소개 &lt; 한국전지산업협회</title>

	<!-- header -->
	<jsp:include page="../header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<input type="hidden" id="path" value="comeRoot" /> <!-- 파일명 -->
	<input type="hidden" id="mainPath" value="intro" /> <!-- 첫번째 path -->
	<input type="hidden" id="mainPath2" value="introMap" /> <!-- 두번째 path -->
	<!-- container -->
	<div id="container">
		<!-- pageTit -->
		<div class="pageTit v1">
			<h2>협회/조합 소개</h2>
		</div>
		<!--// pageTit -->
		<!-- path -->
		<jsp:include page="../path.jsp" flush="false"></jsp:include>
		<!--// path -->
		<!-- contents -->
		<div class="contents">
			<h3>오시는 길</h3>
			<!-- imgWrap -->
			<div class="imgWrap">
				<img src="/resouces/images/user/img10.png" alt="맵 이미지">
			</div>
			<!--// imgWrap -->
			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>기존주소, 새주소, 전화번호, 팩스번호, 주차안내 항목으로 구성된 오시는길 정보 표입니다.</caption>
					<colgroup>
						<col style="width:120px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">기존주소</th>
							<td>(137-888) 서울시 서초구 양재동 20-17 산기협회관 8층</td>
						</tr>
						<tr>
							<th scope="row">새주소</th>
							<td>(06744) 서울시 서초구 바우뫼로37길 37, 산업기술진흥협회회관 8층</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td>02-3461-9400</td>
						</tr>
						<tr>
							<th scope="row">팩스번호</th>
							<td>02-569-1895</td>
						</tr>
						<tr>
							<th scope="row">주차안내</th>
							<td>산기협 회관 후면 주차장 또는 주차타워 이용</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- mapInfo -->
			<div class="mapInfo">
				<dl>
					<dt>지하철을 이용하시는 경우</dt>
					<dd>3호선/신분당선 양재역 8번출구 성남방향으로 400M 도보</dd>
				</dl>
				<dl>
					<dt>버스를 이용하시는 경우</dt>
					<dd>양재역 정류장 하차 3분거리 (서울버스 노선안내)
						<ul>
							<li class="v1"><strong>마을버스(초록)</strong>서초08, 서초09, 서초17, 서초18, 서초19, 서초20, 서초21, 서초22</li>
							<li class="v2"><strong>간선버스(파랑)</strong>140, 400, 402, 406, 470, 641</li>
							<li class="v3"><strong>지선버스(초록)</strong>4312, 4417, 4421, 4422, 4423, 4424, 4511, 5411</li>
							<li class="v4"><strong>기타버스</strong>500-2, 1005, 1005-1, 1005-5, 1500, 1500-1, 1500-3, 1550, 1550-1, 1560, 2002, 2002-1, 3000, 3001, 5001, 5002, 5100</li>
						</ul>
					</dd>
				</dl>
			</div>
			<!--// mapInfo -->
		</div>
		<!--// contents -->
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
