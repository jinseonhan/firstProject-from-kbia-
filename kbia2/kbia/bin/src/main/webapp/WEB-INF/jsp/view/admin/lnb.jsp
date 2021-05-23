<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<script type="text/javascript">
$(document).ready(function() {
	var lnbset1 = $("#lnbset1").val();
	var lnbset2 = $("#lnbset2").val();
	
	var mainCurr = $('#'+lnbset1);
	var dtlCurr = $('#'+lnbset2);

	$("#navi").find("li").removeClass('curr'); //현채 curr 제거
	$("#"+lnbset1).addClass('curr');  
	$("#"+lnbset2).addClass('curr');  
	$("#dtlPath").hide();
	$("#"+lnbset1).find("ul").show();
});
</script>
	<!-- lnb -->
	<div class="lnb" id="navi">
		<ul>
			<li id="account" class="curr"><a href="/admin/openAccount.do">계정</a>
				<ul id="dtlPath">
					<li id="accountUserList" class="curr"><a href="/admin/openAccount.do">홈페이지 회원</a></li>
					<li id="accountAUserList"><a href="/admin/openAccountListAUser.do">관리자 회원</a></li>
				</ul>
			</li>
			<li id="content"><a href="">컨텐츠</a>
				<ul id="delPath">
					<li id="Mbanner"><a href="/admin/MbannerList.do">메인 배너</a></li>
					<li id="PopList"><a href="/admin/pupList.do">팝업</a></li>
					<li id="history"><a href="/admin/historyList.do">연혁</a></li>
				</ul>
			</li>
			<li><a href="">알림마당</a>
				<ul id="dtlPath">
					<li><a href="">공지사항</a></li>
					<li><a href="">산업뉴스</a></li>
					<li><a href="">행사정보</a></li>
				</ul>
			</li>
			<li id="info"><a href="">정보마당</a>
				<ul id="dtlPath">
					<li id="briefAdminList"><a href="/admin/openBrief.do">주간브리프</a></li>
					<li id="batteryAdminList"><a href="/admin/openBattery.do">The Battery</a></li>
					<li id="trendAdminList"><a href="/admin/openTrend.do">기술동향</a></li>
					<li id="referenceAdminList"><a href="/admin/openReference.do">기술자료실</a></li>
					<li id="hireAdminList"><a href="/admin/openHire.do">채용공고</a></li>
				</ul>
			</li>
			<li ID="member"><a href="/admin/memberAdminList.do">회원사</a></li>
			<li id="stats"><a href="">통계</a>
				<ul id="dtlPath">
					<li id="allStats"><a href="/admin/openAllStats.do">접속통계</a></li>
					<li id="monthStats"><a href="/admin/openMonthStats.do">월별통계</a></li>
					<li id="dayStats"><a href="/admin/openDayStats.do">일일통계</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<!--// lnb -->

