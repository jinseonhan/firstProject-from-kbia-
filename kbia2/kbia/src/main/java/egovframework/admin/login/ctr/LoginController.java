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
package egovframework.admin.login.ctr;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.admin.login.svc.LoginService;
import egovframework.admin.login.svc.impl.LoginServiceImpl;
import egovframework.admin.login.vo.LoginVO;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONObject;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

/**
 * @Class Name : LoginController.java
 * @Description : EgovTest Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-10 지승배           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class LoginController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginServiceImpl.class);
	
	/** EgovTestService */
	@Resource(name = "loginService")
	private LoginService loginService;

	/**
	 * admin 로그인창 오픈.
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin.do")
	public String openLogin(HttpServletRequest request, Map<String, Object> param) throws Exception {		
		HttpSession session = request.getSession(false);
		session.invalidate(); //로그인창으로 향하면 항상 세션해제
		return "/view/admin/login";
	}
	
	
	/**
	 * 로그인 확인 체크
	 * @param Map<String, Object> 
	 * @param loginVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/loginChk.do", method = RequestMethod.POST)
	public void selectLogin(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		HttpSession session = request.getSession(true);
		int idChkCount = 0; 
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			idChkCount = loginService.selectLoginChk(params);
			if(idChkCount == 1) {
				
				Map<String, Object> adminInfo = loginService.selectAdminLoginInfo(params);
				adminInfo = CamelUtil.convertMap(adminInfo);
				System.out.println("adminInfo>>>>" + adminInfo);
				session.setAttribute("adminInfo", adminInfo);				
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
