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
<script src="/resouces/js/admin/member/memberAdminRevise.js"></script>
<!-- 스마트 에디터를 적용하기 위한 스크립트 -->
<script src="/resouces/static/js/service/HuskyEZCreator.js"></script>

</head>

<body>
<input type="hidden" id="lnbset1" value="member"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="memberAdminRevise"> <!-- 해당 jsp명 -->
<input type="hidden" id="boardNo" value="${param.boardNo}" />
<!-- 파일 전환용 -->
<input type="hidden" id="flag" value="N"/>
<input type="hidden" id="delYn" value="N">
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
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		<div class="contents">
			<h2>회원사</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>회원구분, 회사명, 대표자명, 업종, 로고 이미지, 설립년도, 종업원수, 대표전화번호, 팩스번호, 홈페이지, 회사소개, 언어, 사용여부, 등록정보 항목으로 구성된 수정 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">회원구분 <span class="cRed">*</span></th>
							<td>
								<div class="selectbox">
									<span id="divisionSpan">선택</span>
									<select title="시 선택" id="division">
										<option value="선택하세요."selected></option>
										<option value="임원">임원</option>
										<option value="일반회원">일반회원</option>
										<option value="준회원">준회원</option>
										<option value="특별회원">특별회원</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">회사명 <span class="cRed">*</span></th>
							<td><input type="text" title="회사명 입력" id="comNm" maxlength='12'></td>
						</tr>
						<tr>
							<th scope="row">대표자명 <span class="cRed">*</span></th>
							<td><input type="text" title="대표자명 입력" id="comRepreNm" maxlength='12'></td>
						</tr>
						<tr>
							<th scope="row">업종 <span class="cRed">*</span></th>
							<td><input type="text" title="업종 입력" id="sectors" maxlength='5'></td>
						</tr>
						<tr>
							<th scope="row">로고 이미지</th>
							<td>
								<div class="file" id="multiFileNo">
									<input type="text" id="fileNm" title="첨부파일 명" readonly >
									<input type="file" title="파일 첨부" id="upfile" name="upfile" accept="image/gif,image/jpeg,image/png"/>
								</div>
								<div class="fileDelete" id="fileDelete">
									<div>
										<span><a href="javascript:void(0);" id="ognFileNm" ></a></span>
										<button type="button" onclick="tempDel();">[삭제]</button>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">설립년도 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="설립년도 입력" class="w100" placeholder="0000" id="estYear" maxlength='4' pattern="[0-9]+" maxlength='4' numberOnly>
								<span>년도</span>
							</td>
						</tr>
						<tr>
							<th scope="row">종업원수</th>
							<td>
								<input type="text" title="종업원수 입력" class="w100" placeholder="숫자만 입력" id="comEmplCnt" pattern="[0-9]+" maxlength='6' numberOnly>
								<span>명</span>
							</td>
						</tr>
						<tr>
							<th scope="row">대표전화번호 <span class="cRed">*</span></th>
							<td>
								<input type="text" title="국가코드 입력" class="w100" value="+82"id="comRepreNum1" maxlength='3' numberOnly>
								<span>-</span>
								<input type="text" title="대표전화번호 입력" placeholder="숫자 입력" id="comRepreNum2" maxlength='8' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">팩스번호</th>
							<td>
								<input type="text" title="국가코드 입력" class="w100" value="+82" id="fax1" maxlength='3' numberOnly>
								<span>-</span>
								<input type="text" title="팩스번호 입력" placeholder="숫자 입력" id="fax2" maxlength='8' numberOnly>
							</td>
						</tr>
						<tr>
							<th scope="row">홈페이지</th>
							<td><input type="text" title="홈페이지 입력" id="homePage"></td>
						</tr>
						<tr>
							<th scope="row">회사소개</th>
							<td style="padding: 6px 12px;">
								<textarea title="회사소개 입력" id="contentArea" placeholder="에디터영역" style="width: 100%;"></textarea>
							</td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0101" name="chk01" checked>
										<label for="chk0101">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0102" name="chk01">
										<label for="chk0102">영문</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">사용여부</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="chk02" value='Y' checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="chk02" value='N'>
										<label for="chk0202">미사용</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">등록정보</th>
							<td id="regist">등록자 ID / 최종수정일</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--// rowTable -->
			<!-- btnBottom -->
			<div class="btnBottom">
				<div class="right">
					<button type="button" class="btn btnPointL" onclick="userDelete()">삭제</button>
					<button type="button" class="btn btnPointL" id="cancelBtn">취소</button>
					<button type="button" class="btn btnPoint" id="registBtn">수정</button>
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
