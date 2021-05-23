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

<!-- Grid Css -->
<link href="/resouces/solution/tabulator-master/dist/css/tabulator.css" rel="stylesheet">
<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/jquery-ui.js"></script>
<!-- Grid Js -->
<script type="text/javascript" src="/resouces/solution/tabulator-master/dist/js/tabulator.js"></script>
<!-- Excel -->
<script type="text/javascript" src="https://oss.sheetjs.com/sheetjs/xlsx.full.min.js"></script>
<script src="/resouces/js/admin/common.js"></script>
<script src="/resouces/js/admin/header.js"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="/resouces/static/js/service/HuskyEZCreator.js"></script>
 
<body>
<input type="hidden" id="author" value="${adminInfo.author}"/>
<input type="hidden" id="createId" value="${adminInfo.userNm}" />
<!-- wrap -->
<div id="wrap" class="jui">
	<!-- header -->
	<div id="header">
		<div class="inner">
			<h1><a href="">한국전지산업협회</a></h1>
			<div class="util">
				<strong>환영합니다. ${adminInfo.userNm} 님</strong>
				<button type="button" id="mypage">마이페이지</button>
				<button type="button" id="logout">로그아웃</button>
			</div>
		</div>
	</div>

