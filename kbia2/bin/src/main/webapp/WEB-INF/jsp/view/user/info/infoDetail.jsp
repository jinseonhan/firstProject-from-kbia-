<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<title>상세보기 &lt; 한국전지산업협회</title>


<!-- header -->
<jsp:include page="/WEB-INF/jsp/view/user/header.jsp" flush="false"></jsp:include>
<!--// header -->
<script src="/resouces/js/user/info/infoContent.js"></script>

<input type="hidden" id="path" value="noticeContent" /> <!-- 파일명 -->
<input type="hidden" id="mainPath" value="notice" /> <!-- 첫번째 path -->
<input type="hidden" id="mainPath2" value="noticeMap" /> <!-- 두번째 path -->
<input type="hidden" id="boardNo" value="${param.boardNo}" />
<input type="hidden" id="boardType" value="${param.boardType}" />

<!-- container -->
<div id="container">
	<!-- pageTit -->
	<div class="pageTit v5">
		<h2>정보마당</h2>
	</div>
	<!--// pageTit -->
	<!-- path -->
	<jsp:include page="/WEB-INF/jsp/view/user/path.jsp" flush="false"></jsp:include>
		
	<!-- contents -->
	<div class="contents">
		<h3>주간 브리프</h3>
		<!-- viewArea -->
		<div class="viewArea">
			<div class="tit">
				<strong id="title"> </strong> <span id="createDate"> </span>
			</div>
			<div class="fileArea">
				<a href="" class="btnFile" target="_blank" title="새창으로 열기">첨부파일입니다.hwp</a>
				<a href="" class="btnFile">첨부파일입니다.hwp</a> <span></span>
			</div>
			<div class="cont" id="content">
				
			</div>
		</div>
		<!--// viewArea -->

		<!-- naviArea -->
		<div class="naviArea">
			<a id="beforeBoard"><strong>이전글</strong> <span id="beforeTitle">이전글이 없습니다.</span></a> 
			<a id="nextBoard"><strong>다음글</strong> <span id="nextTtile">다음글이 없습니다.</span></a>
		</div>
		<!--// naviArea -->
		<!-- btnCenter -->
		<div class="btnCenter">
			<a href="/openBrief.do" class="btn btnGray">목록</a>
		</div>
		<!--// btnCenter -->
	</div>
	<!--// contents -->
</div>
<!--// container -->


<!-- footer -->
<jsp:include page="/WEB-INF/jsp/view/user/footer.jsp" flush="false"></jsp:include>
<!--// footer -->
