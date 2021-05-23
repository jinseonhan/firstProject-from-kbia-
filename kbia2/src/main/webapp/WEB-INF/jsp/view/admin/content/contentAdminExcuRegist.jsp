<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/content/contentAdminExcuRegist.js"></script>

<!-- header -->
<jsp:include page="../header.jsp" flush="false"></jsp:include>
<!--// header -->
<input type="hidden" id="lnbset1" value="content"> <!-- 중분류 -->
<input type="hidden" id="lnbset2" value="excu"> <!-- 해당 jsp명 -->

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
										<option value="${item.CODE_DTL}">${item.CODE_NM}</option>
									</c:forEach>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">이름 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="이름 입력" class="w150" id="excu_name" msg="이름을 입력해주세요." request>
						</td>
					</tr>
					<tr>
						<th scope="row">직책 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="직책 입력" class="w150" id="excu_position" msg="직책을 입력해주세요." request>
						</td>
					</tr>
					<tr>
						<th scope="row">회사명 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="회사명 입력" class="w412" id="excu_company" msg="회사명을 입력해주세요" request>
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
						<th scope="row">순서 <span class="cRed">*</span></th>
						<td>
							<input type="text" title="순서 입력" class="w100" id="loaction_n" maxlength="3" msg="순서를 입력해주세요." request numberOnly>
						</td>
					</tr>
					<tr>
						<th scope="row">언어</th>
						<td>
							<!-- checkboxWrap -->
							<div class="checkboxWrap">
								<span class="checkbox"> <input type="radio" id="chk0101" name="language" value="KOR" checked>
									<label for="chk0101">국문</label>
								</span>
								 <span class="checkbox"> <input type="radio" id="chk0102" name="language" value="ENG">
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
								<span class="checkbox"> <input type="radio" id="chk0201" name="use_yn" value="Y" checked> 
								<label for="chk0201">사용</label>
								</span> 
								<span class="checkbox"> <input type="radio" id="chk0202" name="use_yn" value="N"> 
								<label for="chk0202">미사용</label>
								</span>
							</div> 
							<!--// checkboxWrap -->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--// rowTable -->
		<!-- btnBottom -->
		<div class="btnBottom">
			<div class="right">				
				<button type="button" class="btn btnPointL" onclick="cancel();">취소</button>
				<button type="button" class="btn btnPoint" onclick="valid();">저장</button>
			</div>
		</div>
		<!--// btnBottom -->
	</div>
	<!--// contents -->
</div>
