<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="/resouces/js/admin/lnb.js"></script>
<script type="text/javascript">
/* $(document).ready(function() {
	var lnbset1 = $("#lnbset1").val();
	var lnbset2 = $("#lnbset2").val();
	
	var mainCurr = $('#'+lnbset1);
	var dtlCurr = $('#'+lnbset2);

	$("#navi").find("li").removeClass('curr'); //현채 curr 제거
	$("#"+lnbset1).addClass('curr');  
	$("#"+lnbset2).addClass('curr');  
	$("#dtlPath").hide();
	$("#"+lnbset1).find("ul").show();

	var author = $("#sessionAuthor").val();
	var authorList = author.split(",");
	
	$("li .authorList").on("click",function(){
//		console.log($(this).children().val());
		var mine = $(this).children().val();
		alert("mine의 값 : "+mine);
		var count=0;
		for(var i=0;i<authorList.length;i++){
			if(mine==authorList[i]){
				alert("if문 들어옴");
				count++;
			}
		}
		if(count!=1){
			alert("권한이 없습니다.");
			event.preventDefault();
		}
	});
}); */
</script>
	<!-- lnb -->
	<div class="lnb" id="navi">
		<ul>
			<li id="account" value="A"><a href="">계정</a>
				<ul id="dtlPath">
					<li id="accountUserList" class="authorList"><input type="hidden" value="A1"><a href="/admin/openAccount.do">홈페이지 회원</a></li>
					<li id="accountAUserList"class="authorList"><input type="hidden" value="A2"><a href="/admin/openAccountListAUser.do">관리자 회원</a></li>
				</ul>
			</li>
			<li id="content"><a href="">컨텐츠</a>
				<ul id="delPath">
					<li id="Mbanner" class="authorList" ><input type="hidden" value="C1"><a href="/admin/MbannerList.do">메인 배너</a></li>
					<li id="PopList" class="authorList" ><input type="hidden" value="C2"><a href="/admin/pupList.do">팝업</a></li>
					<li id="history" class="authorList" ><input type="hidden" value="C3"><a href="/admin/historyList.do">연혁</a></li>
					<li id="lit" class="authorList" ><input type="hidden" value="C4"><a href="/admin/litList.do">소배너</a></li>
					<li id="organ" class="authorList" ><input type="hidden" value="C5"><a href="/admin/moveOrganList.do">조직도</a></li>
					<li id="excu" class="authorList" ><input type="hidden" value="C6"><a href="/admin/excuList.do">임원현황</a></li>
				</ul>
			</li>
			<li id="notice"><a href="">알림마당</a>
				<ul id="dtlPath">
					<li id="Notice" class="authorList" ><input type="hidden" value="N1"><a href="/admin/NoticeList.do">공지사항</a></li>
					<li id="industry" class="authorList" ><input type="hidden" value="N2"><a href="/admin/openIndustry.do">산업뉴스</a></li>
					<!-- <li id="Event" class="authorList" ><input type="hidden" value="N3"><a href="/admin/EventList.do">행사정보</a></li>  -->
					<li id="seem" class="authorList" ><input type="hidden" value="N4"><a href="/admin/openSeem.do">산업계 동정</a></li>
				</ul>
			</li>
			<li id="info"><a href="">정보마당</a>
				<ul id="dtlPath">
					<li id="briefAdminList" class="authorList" ><input type="hidden" value="I1"><a href="/admin/openBrief.do">주간브리프</a></li>
					<li id="batteryAdminList" class="authorList" ><input type="hidden" value="I2"><a href="/admin/openBattery.do">The Battery</a></li>
					<li id="trendAdminList" class="authorList" ><input type="hidden" value="I3"><a href="/admin/openTrend.do">기술동향</a></li>
					<li id="referenceAdminList"class="authorList" ><input type="hidden" class="authorList" value="I4"><a href="/admin/openReference.do">기술자료실</a></li>
					<li id="hireAdminList"class="authorList" ><input type="hidden" value="I5"><a href="/admin/openHire.do">채용공고</a></li>
				</ul>
			</li>
			<li id="member" ><a href="">회원사</a>
				<ul id="dtlPath">
					<li id="memberAdminList" class="authorList" ><input type="hidden" value="M1"><a href="/admin/memberAdminList.do">회원사</a></li>
				</ul>
			</li>
			<li id="stats"><a href="">통계</a>
				<ul id="dtlPath">
					<li id="allStats"class="authorList" ><input type="hidden" value="S1"><a href="/admin/openAllStats.do">접속통계</a></li>
					<li id="monthStats"class="authorList" ><input type="hidden"  value="S2"><a href="/admin/openMonthStats.do">월별통계</a></li>
					<li id="dayStats"class="authorList" ><input type="hidden" value="S3"><a href="/admin/openDayStats.do">일일통계</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<!--// lnb -->

