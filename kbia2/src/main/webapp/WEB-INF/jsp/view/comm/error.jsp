<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.*" %>
<%@ page import="java.net.InetAddress" %>


<%
	String referer = request.getHeader("referer") == null ? "/main.do" : request.getHeader("referer").toString();
	String serPath = "";
	if(request.getAttribute("serPath") != null){
		serPath = request.getAttribute("serPath").toString();
		if("/admin.do".equals(serPath)){
			referer = "/admin.do";
		}
	}
	if(!"/main.do".equals(referer)){
		if( referer.indexOf("/admin/")>=0){
			referer = "/admin"+referer.substring(referer.lastIndexOf("/"));
		}else{
			referer = referer.substring(referer.lastIndexOf("/"));
		}
	}
	response.sendRedirect(referer);
%>
