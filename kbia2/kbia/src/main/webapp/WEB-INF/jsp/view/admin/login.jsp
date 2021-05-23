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
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<!--[if lte IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="/resouces/js/admin/jquery-3.4.1.min.js"></script>
<script src="/resouces/js/admin/jquery-ui.js"></script>
<script src="/resouces/js/admin/common.js"></script>
<script src="/resouces/js/admin/login/login.js"></script>

</head>

<body>
<!-- wrap -->
<div id="wrap">
	<div id="fullWrap">
		<div class="loginWrap">
			<div class="loginTit">
				<img src="resouces/images/admin/common/logo.png" alt="">
				<h1>전지산업협회 관리자</h1>
			</div>
			<div class="inputBox">
				<p>
					<input type="text" id="userId" title="아이디 입력" placeholder="아이디를 입력하세요.">
				</p>
				<p>
					<input type="password" id="passwd" title="비밀번호 입력" placeholder="비밀번호를 입력하세요.">
				</p>
				<p>
					<button type="button" id="loginBtn">로그인</button>
				</p>
				<p class="txt">계정 발급은 IT사업팀에 문의주시기 바랍니다.</p>
			</div>
		</div>
	</div>
</div>
<!--// wrap -->
</body>
</html>
