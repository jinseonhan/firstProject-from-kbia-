<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminOrganModify.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="organ"> <!-- 해당 jsp명 -->

<input type="hidden" id="getBoardNo" value="${organ.boardNo}">
<input type="hidden" id="getBoardType" value="${organ.boardType}">
<input type="hidden" id="getGroupCode" value="${organ.organGroupCode}">
<input type="hidden" id="getUseYn" value="${organ.useYn}">
<input type="hidden" id="getLanguageType" value="${organ.languageType}">
<input type="hidden" id="getLocationN" value="${organ.locationN}">
<input type="hidden" id="getCreateId" value="${organ.createId}">
<input type="hidden" id="getUpdateDate" value="${organ.updateDate}">

<input type="hidden" id="searchStDate" value="${search.stDate}">
<input type="hidden" id="searchEnDate" value="${search.enDate}">
<input type="hidden" id="searchName" value="${search.name}">
<input type="hidden" id="searchUseYn" value="${search.useYn}">
<input type="hidden" id="searchLang" value="${search.lang}">

<script>
	console.log("${organ}");
</script>

	<!-- container -->
	<div id="container">
		<!-- lnb -->
		<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
		<!--// lnb -->
		<!-- contents -->
		
		
		<div class="contents">
			<h2>조직도</h2>

			<!-- rowTable -->
			<div class="rowTable">
				<table>
					<caption>분류, 년/월, 제목, 언어, 사용여부 항목으로 구성된 입력 테이블입니다.</caption>
					<colgroup>
						<col style="width:150px">
						<col style="width:auto">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">부서선택<span class="cRed">*</span></th>
							<td>
								<div class="selectbox">
									<span id="groupSelect">부서 선택</span>
									<select title="부서 선택">
										<option value="">부서 선택</option>
										<c:forEach var="i" items="${groupList}">
										<option value="${i.codeDtl}">${i.codeNm}</option>
										</c:forEach>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">이름<span class="cRed">*</span></th>
							<td><input type="text" id="name" title="이름 입력" class="w100" value="${organ.organName}"></td>
						</tr>
						<tr>
							<th scope="row">직책<span class="cRed">*</span></th>
							<td><input type="text" id="position" title="직책 입력" class="w100" value="${organ.organPositionName}"></td>
						</tr>
						<tr>
							<th scope="row">업무<span class="cRed">*</span></th>
							<td><input type="text" id="task" title="업무 입력" class="w412" value="${organ.organTask}"></td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td><input type="text" id="phone" title="전화번호 입력" value="${organ.organPhoneNum}"></td>
						</tr>
						<tr>
							<th scope="row">이메일</th>
							<td><input type="text" id="email" title="이메일 입력" class="w412" value="${organ.organEmail}"></td>
						</tr>
						<tr>
							<th scope="row">순서</th>
							<td>
								<div class="selectbox">
									<span id="locationN">선택</span>
									<select title="노출순서" id="locationNo">
										<option value="">노출 순서 선택</option>
										<c:forEach var="i" begin="1" end="10">
										<option value="${i}">${i}</option>
										</c:forEach>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">언어</th>
							<td>
								<div class="checkboxWrap">
									<span class="checkbox">
										<input type="radio" id="chk0201" name="lang" value="KOR" checked>
										<label for="chk0201">국문</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0202" name="lang" value="ENG">
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
										<input type="radio" id="chk0301" name="useYn" value="Y"checked>
										<label for="chk0201">사용</label>
									</span>
									<span class="checkbox">
										<input type="radio" id="chk0302" name="useYn" value="N">
										<label for="chk0202">미사용</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">등록정보</th>
							<td>
								<div>
									<span id="regInfo"></span>
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
					<button type="button" id= "btnDelete" class="btn btnPointL">삭제</button>
					<button type="button" id="btnCancel" class="btn btnPointL">취소</button>
					<button type="button" id="btnModify" class="btn btnPoint">수정</button>
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
