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
package egovframework.user.login.ctr;

import java.io.PrintWriter;

import java.util.Map;

import egovframework.user.account.svc.AccountUserService;

import egovframework.user.login.svc.LoginUserService;
import egovframework.user.login.svc.impl.LoginUserServiceImpl;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @Class Name : LoginUserController.java
 * @Description : EgovTest Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-11 지승배           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class LoginUserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginUserServiceImpl.class);
	/** EgovTestService */
	@Resource(name = "loginUserService")
	private LoginUserService loginUserService;
	
	/** EgovTestService */
	@Resource(name = "accountUserService")
	private AccountUserService accountUserService;

	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;

	/**
	 * user 로그인창 오픈.
	 * @exception Exception
	 */
	@RequestMapping(value = "/openLoginUser.do")
	public String openLoginUser(Map<String, Object> param) throws Exception {		

		return "/view/user/account/userLogin";
	}

	
	/**
	 * 로그아웃(세션종료.
	 * @exception Exception
	 */
	@RequestMapping(value = "/openLogOutUser.do")
	public String openLogOutUser(HttpServletRequest request,HttpSession session, Map<String, Object> param) throws Exception {		

		session.removeAttribute("loginInfo");
		return "/view/user/main";
	}
	
	/**
	 * 로그인 확인 체크
	 * @param Map<String, Object> 
	 * @param loginUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/loginUserChk.do", method = RequestMethod.POST)
	public void selectLoginUser(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		HttpSession session = request.getSession(true);
		int idChkCount = 0; 
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			idChkCount = loginUserService.selectLoginUserChk(params);
			if(idChkCount == 1) {
				
				Map<String, Object> loginInfo = loginUserService.selectLoginInfo(params);
				loginInfo = CamelUtil.convertMap(loginInfo);
				System.out.println("loginInfo>>>>" + loginInfo);
				session.setAttribute("loginInfo", loginInfo);				
			}
			json = mapper.writeValueAsString(idChkCount);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
}
