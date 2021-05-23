<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.*" %>
<%@ page import="java.net.InetAddress" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta name="format-detection" content="telephone=no, address=no, email=no">
<!-- E : mobile -->
<!-- Grid Css -->
<link href="/resouces/solution/tabulator-master/dist/css/tabulator_user.css" rel="stylesheet">
<title>한국전지산업협회</title>
<link rel="stylesheet" type="text/css" href="/resouces/css/user/style.css" />
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<script type="text/javascript" src="/resouces/js/user/jquery-2.2.4.js"></script>
<script type="text/javascript" src="/resouces/js/user/swiper.js"></script>
<script type="text/javascript" src="/resouces/js/user/common.js"></script>
<script type="text/javascript" src="/resouces/js/cookie.js"></script>
<script type="text/javascript" src="/resouces/js/bluebird.js"></script>
<script type="text/javascript" src="/resouces/js/user/header.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="/resouces/solution/tabulator-master/dist/js/tabulator.js"></script>

<!-- <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<script src="js/selectivizr.js">
 -->
<!--[if lte IE 9]>
</script>
<![endif]-->
</head>
<body>
<%
	String referer = request.getHeader("referer") == null ? "BookMark" : request.getHeader("referer").toString();

%>
<input type="hidden" id="sessionAuthor" value="${loginInfo.author}" />
<input type="hidden" id="referer" value="<%=referer %>" />
<!-- skipNav -->
<dl id="skipNav">
	<dt>바로가기 메뉴</dt>
	<dd><a href="#container">본문 바로가기</a></dd>
	<dd><a href="#header">메뉴 바로가기</a></dd>
	<dd><a href="#footer">페이지 하단 바로가기</a></dd>
</dl>
<!-- //skipNav -->
<!-- wrap -->
<div id="wrap">
	<!-- header -->
	<div id="header">
		<!-- inner -->
		<div class="inner">
			<h1><a href="/">KBIA 한국전지산업협회</a></h1>
			<a href="" class="btnMenu">메뉴보기</a>
		</div>
		<!--// inner -->
		<!-- gnb -->
		<div id="gnb">
			<div class="inner">
				<!-- lang -->
				<div class="lang">
					<ul>
						<li id="KOR"><a href="/">KOREAN</a></li>
						<li id="ENG"><a href="">ENGLISH</a></li>
					</ul>
					<input type="hidden" id="langType" value="${empty langType ? 'KOR' : langType}">
				</div>
				<!--// lang -->
				<!-- util -->
				<div class="util">
					<ul>
						<li class="btnHome"><a href="/">홈</a></li>
						<c:if test="${empty loginInfo}">
						<li class="btnLogIn"><a href="/openLoginUser.do">로그인</a></li>		
						<li class="btnJoin"><a href="/openSignUp.do">회원가입</a></li>
						</c:if>
						<c:if test="${not empty loginInfo}">
						<li class="btnLogOut"><a href="/openLogOutUser.do">로그아웃</a></li> 
						<li class="btnMypage"><a href="/openAccountUpdate.do">마이페이지</a></li>
						</c:if>
				
					</ul>
				</div>
				<!--// util -->
				<ul>
					<li><a href="/openIntroComment.do">협회/조합 소개</a>
						<ul>
							<li><a class="headerA" href="/openIntroComment.do">인사말</a></li>
							<li><a class="headerA" href="/openIntroHistroy.do">연혁</a></li>
							<li><a class="headerA" href="/openOrganization.do">조직도 및 연락처</a></li>
							<li><a class="headerA" href="/openExecutives.do">임원현황</a></li>
							<li><a class="headerA" href="/openMainTask.do">주요업무</a></li>
							<li><a class="headerA" href="/openCI.do">CI</a></li>
							<li><a class="headerA" href="/openComeRoot.do">오시는 길</a></li>
						</ul>
					</li>
					
					<li><a href="/openMemberGuide.do">회원사 안내</a>
						<ul>
							<li><a class="headerA" href="/openMemberGuide.do">회원사 가입안내</a></li>
							<li><a class="headerA" href="/openMemberInfo.do">회원사 안내</a></li>
						</ul>
					</li>
					<!-- <li><a href="">사업안내</a></li> -->
					<li><a href="/openNotice.do">알림마당</a>
						<ul>
							<li><a class="headerA" href="/openNotice.do">공지사항</a></li>
							<li><a class="headerA" href="/openIndustry.do">산업뉴스</a></li>
							<li><a class="headerA" href="/openEvent.do">행사정보</a></li>
							<li><a class="headerA" href="/openMemberNewsList.do">산업계(회원사) 동정</a></li>
						</ul>
					</li>
					<li><a class="headerA" id="brief" href="/openBrief.do">정보마당</a>
						<ul>
							<li><a class="headerA" id="brief" href="/openBrief.do">주간브리프</a></li>
							<li><a class="headerA" id="battery" href="/openBattery.do">The Battery</a></li>
							<li><a class="headerA" id="tRoom" href="/openReference.do">기술자료실</a></li>
							<li><a class="headerA" href="/openGhireList.do">채용공고</a></li>
						</ul>
					</li>
					<li><a href="/openTechKnow.do">산업/기술동향</a>
						<ul>
							<li><a class="headerA" href="/openTechKnow.do">전지의 이해</a></li>
							<li><a class="headerA" id="industryStat" href="/openIndustryStat.do">산업통계</a></li>
							<li><a class="headerA" id="aTrends" href="/openRelatedTrend.do">유관산업 동향</a></li>
                            <li><a class="headerA" id="tTrends" href="/openTechTrend.do">기술동향</a></li>
						</ul>
					</li>
				</ul>
			</div>
			<a href="" class="btnClose">메뉴닫기</a>
		</div>
		<!--// gnb -->
	</div>
	<!--// header -->
