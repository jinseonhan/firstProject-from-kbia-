<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script type="text/javascript" >
$(document).ready(function() {
	var dtlPath = $("#path").val();
	var mainPath =$("#mainPath").val();
	var mainPath2 =$("#mainPath2").val();
	
	var mainCurr = $('#'+mainPath);
	var dtlCurr = $('#'+dtlPath);
	$("#navi").find("li").removeClass('curr'); //현재 아래 윗창 설정 제거
	dtlCurr.addClass('curr');  //현재 아래 윗창 설정
	$("#mainHref").text(mainCurr.text()); //
	
	$("#"+mainPath2).find("#dtlHref").text(dtlCurr.text()); //
	$(".naviDtl").css("display","none");
	$("#"+mainPath).removeClass('curr');  //현재 맨 윗창 설정 제거
	$("#"+mainPath).addClass('curr');  //현재 맨 윗창 설정
	$("#"+mainPath2).css("display",'');
	
	//권한관리
	var author = $("#sessionAuthor").val();
	
	$('.pathA').click(function(){
		console.log(author);
    	var id_check = $(this).attr("id");
		switch(id_check) {
		  	case "industryStat": //산업통계
		    if(author != "U2" && author != "U3" && author != "U4"){
				alert("준회원이상 이용 가능한 서비스입니다.(문의:02-3461-9405)");
				event.preventDefault();
			}
			break;
			case "brief": //브리프
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "battery": //베터리
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "tRoom": //기술자료실
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "tTrends": //기술동향
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
		 	break;
			case "aTrends": //유관
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
		 	break;
		  default:
		    // code block
		}
	});
	
});
</script>
<!-- wrap -->
	<!-- path -->
	<div class="path" id="navi">
		<div class="inner">
			<a href="/main.do">HOME</a>
			<div>
				<a id="mainHref">멤버쉽</a>
				<ul>
					<li id="intro"><a class="pathA" href="/openIntroComment.do">협회/조합 소개</a></li> <!-- 첫번째 path -->
					<li id="member"><a class="pathA" href="/openMemberGuide.do">회원사 안내</a></li>
					<li id="notice"><a class="pathA" href="/openNotice.do">알림마당</a></li>
					<li id="info"><a class="pathA" id="brief" href="/openBrief.do">정보마당</a></li>
					<li id="tech"><a class="pathA" href="/openTechKnow.do">산업/기술동향</a></li>
					<!-- <li id="membership"><a class="pathA" href="">멤버쉽</a></li>  -->
				</ul>
			</div>
			<!-- 회원가입, 로그인, id찾기 -->
			<div class="naviDtl" id="account1" style="display:none"> <!-- 두번째 path -->
				<a id="dtlHref" href="">회원가입</a>
				<ul> 
					<li id="signUp"><a href="/openSignUp.do">회원가입</a></li> <!-- 파일명 -->
					<li id="userLogin"><a href="/openLoginUser.do">로그인</a></li>
					<li id="findAccount"><a href="/openFindAccount.do">ID/PW찾기</a></li>
				</ul>
			</div>
			<!--// 회원가입, 로그인, id찾기 -->
			<!-- 회원정보수정,회원탈퇴 -->
			<div class="naviDtl" id="account2" style="display:none">
				<a id="dtlHref" href="">회원정보수정</a>
				<ul>
					<li id="accountUpdate"><a href="/openAccountUpdate.do">회원정보수정</a></li>
					<li id="secession"><a href="/openSecession.do">회원탈퇴</a></li>
				</ul>
			</div>
			<!-- 회원정보수정,회원탈퇴 -->
			<!-- 인사말 -길찾기(intro) -->
			<div class="naviDtl" id="introMap" style="display:none">
				<a id="dtlHref" href="">인사말</a>
				<ul>
					<li id="introComment"><a class="pathA" href="/openIntroComment.do">인사말</a></li>
					<li id="introHistroy"><a class="pathA" href="/openIntroHistroy.do">연혁</a></li>
					<li id="organization"><a class="pathA" href="/openOrganization.do">조직도 및 연락처</a></li>
					<li id="executives"><a class="pathA" href="/openExecutives.do">임원현황</a></li>
					<li id="mainTask"><a class="pathA" href="/openMainTask.do">주요업무</a></li>
					<li id="CI"><a class="pathA" href="/openCI.do">CI</a></li>
					<li id="comeRoot"><a class="pathA" href="/openComeRoot.do">오시는 길</a></li>
				</ul>
			</div>
			<!--// 인사말 -길찾기(intro)-->
			<!-- 회원사 -->
			<div class="naviDtl" id="memberMap" style="display:none">
				<a id="dtlHref" href="">회원사 가입안내</a>
				<ul>
					<li id="memberGuide"><a class="pathA" href="/openMemberGuide.do">회원사 가입안내</a></li>
					<li id="memberInfo"><a class="pathA" href="/openMemberInfo.do">회원사 안내</a></li>
				</ul>
			</div>
			<!-- //회원사 -->
			<!-- 산업기술동향 -->
			<div class="naviDtl" id="techMap" style="display:none">
				<a id="dtlHref" href="">전지의 이해</a>
				<ul>
					<li id="techKnow"><a class="pathA" href="/openTechKnow.do">전지의 이해</a></li>
					<li id="industryStat"><a class="pathA" id="industryStat" href="/openIndustryStat.do">산업통계</a></li>
					<li id="relatedTrendList"><a class="pathA" id="aTrends" href="/openRelatedTrend.do">유관산업 동향</a></li>
                    <li id="techTrendList"><a class="pathA" id="tTrends" href="/openTechTrend.do">기술동향</a></li>
				</ul>
			</div>
			<!-- //산업기술동향 -->
			<!-- 알림마당 -->
			<div class="naviDtl" id="noticeMap" style="display:none">
				<a id="dtlHref" href="">공지사항</a>
				<ul>
					<li id="noticeList"><a class="pathA" href="/openNotice.do">공지사항</a></li>
					<li id="industryList"><a class="pathA" href="/openIndustry.do">산업뉴스</a></li>
					<li id="eventInfo"><a class="pathA" href="/openEvent.do">행사정보</a></li>
					<li id="memberNewsList"><a class="pathA" href="/openMemberNewsList.do">산업계(회원사) 동정</a></li>
				</ul>
			</div>
			<!-- //알림마당 -->
			<!-- 정보마당 -->
			<div class="naviDtl" id="infoMap" style="display:none">
				<a id="dtlHref" href="/openBrief.do">주간 브리프</a>
				<ul>
					<li id="infoList"><a class="pathA" id="brief" href="/openBrief.do">주간 브리프</a></li>
					<li id="batteryList"><a class="pathA" id="battery" href="/openBattery.do">The Battery</a></li>
					<li id="refList"><a class="pathA" id="tRoom" href="/openReference.do">기술자료실</a></li>
					<li id="hireList"><a class="pathA" href="/openGhireList.do">채용공고</a></li>
				</ul>
			</div>
			<!-- //정보마당 -->
		</div>
	</div>
	<!--// path -->


