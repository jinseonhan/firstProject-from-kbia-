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
package egovframework.admin.account.ctr;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import egovframework.admin.account.svc.AccountService;
import egovframework.admin.account.svc.impl.AccountServiceImpl;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.cmmn.utils.sendEmail;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.account.svc.AccountUserService;
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
 * @Class Name : AccountController.java
 * @Description : Account Controller Class
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
public class AccountController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountServiceImpl.class);

	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "accountService")
	private AccountService accountService;
	
	/** EgovTestService */
	@Resource(name = "loginUserService")
	private LoginUserService loginUserService;
	
	/** EgovTestService */
	@Resource(name = "accountUserService")
	private AccountUserService accountUserService;
	
	
	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();	

	/**
	 * 유저계정조회화면.
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openAccount.do")
	public String openAccount(Map<String, Object> param) throws Exception {		
		
		return "/view/admin/account/accountUserList";
	}
	
	/**
	 * 유저계정상세(수정)
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openAccountUserUpdate.do")
	public String openAccountUserUpdate(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);

		return "/view/admin/account/accountUserUpdate";
	}
	
	/**
	 * 유저계정등록
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openAccountUserReg.do")
	public String openAccountUserReg(ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		return "/view/admin/account/accountUserReg";
	}
	
	/**
	 * 유저수 확인
	 * @param Map<String, Object> 
	 * @param loginVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/gUserCnt.do", method = RequestMethod.POST)
	public void selectLogin(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		int idChkCount = 0; 
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			idChkCount = accountService.selectUserCnt(params);
			json = mapper.writeValueAsString(idChkCount);
		} catch (Exception e) {
			e.printStackTrace();
		}		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 유저리스트을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param AccountVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/accountUserList.do", method = RequestMethod.POST)
	public void selectAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> accountList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			accountList = accountService.selectUserList(params);
			accountList = CamelUtil.convertListMap(accountList);
			json = mapper.writeValueAsString(accountList);
		} catch (Exception e) {
			e.printStackTrace();
		}	
		
		out.print(json);
		out.flush();
		out.close();
	}	
	
	/**
	 * 유저상세 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param AccountVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/accountUserDtl.do", method = RequestMethod.POST)
	public void selectUserDtlAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			Map<String, Object> userInfo = loginUserService.selectLoginInfo(params);
			userInfo = CamelUtil.convertMap(userInfo);
			json = mapper.writeValueAsString(userInfo);
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
	@RequestMapping(value ="/admin/userAccountUpdate.do", method = RequestMethod.POST)
	public void userAccountUpdate(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		try {		
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = accountUserService.userAccountUpdate(params);
			json = mapper.writeValueAsString(result);
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
	@RequestMapping(value ="/admin/findAccount.do", method = RequestMethod.POST)
	public void findAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			Map<String, Object> account = loginUserService.selectLoginInfo(params);
			if(account != null) {
				account = CamelUtil.convertMap(account);
				
				String email = account.get("email").toString();
				String tempPasswd = sendEmail.sendEmail(email);
				account.put("tempPasswd", tempPasswd);
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
	@RequestMapping(value ="/admin/secession.do", method = RequestMethod.POST)
	public void secession(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			int secessionCnt = accountService.secession(params);
			json = mapper.writeValueAsString(secessionCnt);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 휴먼 해지
	 * @param Map<String, Object> 
	 * @param accountVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return int
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/useYnUpdate.do", method = RequestMethod.POST)
	public void useYnUpdate(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			int useYnUpdate = accountService.useYnUpdate(params);
			json = mapper.writeValueAsString(useYnUpdate);	
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
	@RequestMapping(value ="/admin/userSignUp.do", method = RequestMethod.POST)
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
}
