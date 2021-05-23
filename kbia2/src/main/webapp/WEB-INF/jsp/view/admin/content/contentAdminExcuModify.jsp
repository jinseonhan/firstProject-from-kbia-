<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminExcuModify.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="excu"> <!-- 해당 jsp명 -->

<input type="hidden" id="boardNo" value="${result.BOARD_NO}" />
<input type="hidden" id="boardType" value="${result.BOARD_TYPE}" />

<form id="listForm" action="/admin/excuList.do" method="post">
<input type="hidden" id="stDate" name="stDate" value="${params.stDate}">
<input type="hidden" id="enDate" name="enDate" value="${params.enDate}">
<input type="hidden" id="excu_name" name="excu_name" value="${params.excu_name}">
<input type="hidden" id="useYn" name="useYn" value="${params.useYn}">
<input type="hidden" id="languageType" name="languageType" value="${params.languageType}">
</form>

<!-- 파일업데아트 플래그 -->
<input type="hidden" id="fileupdateflag" value="N">
<input type="hidden" id="delYn" value="N">

<div id="container">
	<!-- lnb -->
	<jsp:include page="../lnb.jsp" flush="false"></jsp:include>
	<!--// lnb -->
	
	<!-- contents -->
	<div class="contents">
		<h2>임원현황</h2>
		<!-- rowTable -->
		<div class="rowTable">
			<table>
				<caption>유형, 제목, 내용, 첨부파일, 등록일, 언어, 사용여부 항목으로 구성된 등록
					테이블입니다.</caption>
				<colgroup>
					<col style="width: 150px">
					<col style="width: auto">
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">구분 <span class="cRed">*</span></th>
						<td>
							<div class="selectbox" id="excu_select_box">
								<span>유형을 선택해주세요.</span> <select title="유형 선택" id="excu_select">
									<option value="">유형을 선택해주세요.</option>
									<c:forEach items="${etCode}" var="item" varStatus="status">
										<option value="${item.CODE_DTL}" <c:if test="${result.EXCU_TYPE eq item.CODE_DTL}">selected</c:if>>${item.CODE_NM}</option>
									</c:forEach>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">이름 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="이름 입력" class="w150" id="excu_name1" value="${result.EXCU_NAME}" msg="이름을 입력해주세요." request>
						</td>
					</tr>
					<tr>
						<th scope="row">직책 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="직책 입력" class="w150" id="excu_position" value="${result.EXCU_POSITION}" msg="직책을 입력해주세요." request>
						</td>
					</tr>
					<tr>
						<th scope="row">회사명 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="회사명 입력" class="w412" id="excu_company" value="${result.EXCU_COMPANY}" msg="회사명을 입력해주세요" request>
						</td>
					</tr>
					<tr>
						<th scope="row">사진 <span class="cRed">*</span></th>
						<td>
							<div class="fileDiv" id="file1">	
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">순서<span class="cRed">*</span></th>
						<td>
							<input type="text" title="회사명 입력" class="w100" id="loaction_n" value="${result.LOCATION_N}" maxlength="3" msg="순서를 입력해주세요" request numberOnly>
							<input type="hidden" id="loaction_n_org" value="${result.LOCATION_N}">
						</td>
					</tr>
					<tr>
						<th scope="row">언어</th>
						<td>
							<!-- checkboxWrap -->
							<div class="checkboxWrap">
								<span class="checkbox"> <input type="radio" id="chk0101" name="language" value="KOR" <c:if test="${result.LANGUAGE_TYPE eq 'KOR'}">checked</c:if>>
									<label for="chk0101">국문</label>
								</span>
								 <span class="checkbox"> <input type="radio" id="chk0102" name="language" value="ENG" <c:if test="${result.LANGUAGE_TYPE eq 'ENG'}">checked</c:if>>
									<label for="chk0102">영문</label>
								</span>
							</div> <!--// checkboxWrap -->
						</td>
					</tr>
					<tr>
						<th scope="row">사용여부</th>
						<td>
							<!-- checkboxWrap -->
							<div class="checkboxWrap">
								<span class="checkbox"> <input type="radio" id="chk0201" name="use_yn" value="Y" <c:if test="${result.USE_YN eq 'Y'}">checked</c:if>> 
								<label for="chk0201">사용</label>
								</span> 
								<span class="checkbox"> <input type="radio" id="chk0202" name="use_yn" value="N" <c:if test="${result.USE_YN eq 'N'}">checked</c:if>> 
								<label for="chk0202">미사용</label>
								<input type="hidden" id="use_yn_org" value="${result.USE_YN}">
								</span>
							</div> 
							<!--// checkboxWrap -->
						</td>
					</tr>
					<tr>
						<th scope="row">등록정보</th>
						<td id ="regist">${result.CREATE_ID} / ${result.CREATE_DATE}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--// rowTable -->
		<!-- btnBottom -->
		<div class="btnBottom">
			<div class="right">								
				<button type="button" class="btn btnPoint" onclick="valid();">수정</button>
				<button type="button" class="btn btnPointL" onclick="cancel();">취소</button>
				<button type="button" class="btn btnPointL" onclick="del()">삭제</button>
			</div>
		</div>
		<!--// btnBottom -->
	</div>
	<!--// contents -->
</div>
