/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.cmmn.session;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import egovframework.user.login.svc.LoginUserService;

public class LoginInterceptor extends HandlerInterceptorAdapter {
    @Override // 이부분은 컨트롤러 타기전에
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	
    	// 세션 객체 생성
        HttpSession session = request.getSession(false);
        System.out.println("@serPath >>>> " + request.getServletPath());
        request.setAttribute("serPath", request.getServletPath());
        // 세션에 id가 null이면(유저)
        if(session.getAttribute("loginInfo") == null) {
            // 로그인 페이지로 이동    	
        	String requestMapping = request.getServletPath().toString();
        	switch (requestMapping) {
        	  case "/openAccountUpdate.do": //회원가입
        	  case "/openSecession.do":		//회원탈퇴
        	  case "/openIndustryStat.do":	//산업통계
        	  case "/openBrief.do":			//브리프
        	  case "/openReference.do":		//기술자료실
        	  case "/openRelatedTrend.do":	//유관산업동향
        	  case "/openTechTrend.do":		//기술동향
        		  response.sendRedirect("main.do");
        		  break;
        	}
        }

        
        // 세션에 id가 null이면(유저)
        if(session.getAttribute("adminInfo") == null) {
            // 로그인 페이지로 이동    	
        	String requestMapping = request.getServletPath().toString();
        
        	if(!"/admin/loginChk.do".equals(requestMapping) && requestMapping.indexOf("/admin/")>=0) {
        		
        		response.sendRedirect("/admin.do");
        	}
        	
        }
        
        return true;
    }
}