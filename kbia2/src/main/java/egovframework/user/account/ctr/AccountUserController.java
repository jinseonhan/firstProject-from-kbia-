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
package egovframework.user.account.ctr;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.sendEmail;
import egovframework.user.account.svc.AccountUserService;
import egovframework.user.account.svc.impl.AccountUserServiceImpl;
import egovframework.user.login.svc.LoginUserService;

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
 * @Class Name : AccountUserController.java
 * @Description : AccountUser Controller Class
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
public class AccountUserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountUserServiceImpl.class);
	private String email = "";
	private String userId = "";
	private String tempPasswd = "";
	private String findGubun = "";
	/** EgovTestService */
	@Resource(name = "accountUserService")
	private AccountUserService accountUserService;
	
	@Resource(name = "loginUserService")
	private LoginUserService loginUserService;
	
	/**
	 * 회원가입1화면.
	 * @return 회원가입1 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openSignUp.do")
	public String openSignUp(Map<String, Object> param) throws Exception {		
		return "/view/user/account/signUp";
	}
	
	/**
	 * 회원가입2화면.
	 * @return 회원가입2 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openSignUp2.do")
	public String openSignUp2(HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		model.addAttribute("email", email);
		email = "";
		return "/view/user/account/signUp2";
	}
	
	/**
	 * 회원가입2화면.
	 * @return 회원가입2 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openSignUp3.do")
	public String openSignUp3(HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		model.addAttribute("userId", userId);
		userId = "";
		return "/view/user/account/signUp3";
	}
	/**
	 * 회원 찾기 오픈
	 * @return 회원찾기 화면 오픈
	 * @exception Exception
	 */
	@RequestMapping(value = "/openFindAccount.do")
	public String openFindAccount(Map<String, Object> params) throws Exception {	
		return "/view/user/account/findAccount";
	}
	/**
	 * 회원찾기 결과창
	 * @return 회원찾기 화면 오픈
	 * @exception Exception
	 */
	@RequestMapping(value = "/openResultFindAccount.do")
	public String openResultFindAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		if("id".equals(findGubun)) {
			model.addAttribute("userId", userId);
			userId = "";
		}else {
			model.addAttribute("email", email);
			model.addAttribute("tempPasswd", tempPasswd);
			model.addAttribute("userId", userId);
			userId = "";
			tempPasswd = "";
			email = "";
		}
		return "/view/user/account/findAccount2";
	}
	/**
	 * 회원 수정 오픈
	 * @return 회원수정 화면 오픈
	 * @exception Exception
	 */
	@RequestMapping(value = "/openAccountUpdate.do")
	public String openAccountUpdate(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		
		model.addAttribute("userId", userId);
		return "/view/user/account/accountUpdate";
	}
	/**
	 * 회원 탈되 오픈
	 * @return 회원수정 화면 오픈
	 * @exception Exception
	 */
	@RequestMapping(value = "/openSecession.do")
	public String openSecession(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		
		return "/view/user/account/secession";
	}
	/**
	 * emailCntChk 확인 체크
	 * @param Map<String, Object> 
	 * @param accountUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/emailCntChk.do", method = RequestMethod.POST)
	public void emailCntChk(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		email = params.get("email").toString();
		int chkCnt = 0; 
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			chkCnt = accountUserService.emailCntChk(params);
			json = mapper.writeValueAsString(chkCnt);
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * idCntChk 확인 체크
	 * @param Map<String, Object> 
	 * @param accountUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/idCntChk.do", method = RequestMethod.POST)
	public void idCntChk(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		userId = params.get("userId").toString();
		int chkCnt = 0; 
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			chkCnt = accountUserService.idCntChk(params);
			json = mapper.writeValueAsString(chkCnt);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/**
	 * 회원가입
	 * @param Map<String, Object> 
	 * @param accountUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return 회원가입
	 * @exception Exception
	 */
	@RequestMapping(value ="/userSignUp.do", method = RequestMethod.POST)
	public void userSignUp(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		try {		
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = accountUserService.userSignUp(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();

	}
	
	/**
	 * 회원수정
	 * @param Map<String, Object> 
	 * @param accountUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return 회원가입
	 * @exception Exception
	 */
	@RequestMapping(value ="/userAccountUpdate.do", method = RequestMethod.POST)
	public void userAccountUpdate(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		try {		
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = accountUserService.userAccountUpdate(params);
			json = mapper.writeValueAsString(result);
			//세션종료. 재확인
			HttpSession session = request.getSession(true);
			Map<String, Object> loginInfo = loginUserService.selectLoginInfo(params);
			loginInfo = CamelUtil.convertMap(loginInfo);
			session.setAttribute("loginInfo", loginInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();

	}
	
	/**
	 * 아이디 찾기, 비밀번호 찾기
	 * @param Map<String, Object> 
	 * @param loginUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/findAccount.do", method = RequestMethod.POST)
	public void findAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		Map<String, Object> account = null;
		findGubun = params.get("gubun").toString();
		
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			account = loginUserService.selectLoginInfo(params);
			if(account != null) {
				account = CamelUtil.convertMap(account);
				if("id".equals(findGubun)) userId = account.get("userId").toString();
				else {
					userId = account.get("userId").toString();
					email = account.get("email").toString();
					tempPasswd = sendEmail.sendEmail(email); 
				}
			}
			json = mapper.writeValueAsString(account);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 계정 삭제
	 * @param Map<String, Object> 
	 * @param accountVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return int
	 * @exception Exception
	 */
	@RequestMapping(value ="/secession.do", method = RequestMethod.POST)
	public void secession(HttpServletResponse res, HttpServletRequest request, HttpSession session, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			int secessionCnt = accountUserService.secession(params);
			session.removeAttribute("loginInfo");
			json = mapper.writeValueAsString(secessionCnt);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
}
