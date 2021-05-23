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

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.admin.account.svc.AccountAUserService;
import egovframework.admin.account.svc.AccountService;
import egovframework.admin.account.svc.impl.AccountServiceImpl;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.account.svc.AccountUserService;
import egovframework.user.login.svc.LoginUserService;


/**
 * @Class Name : AccountController.java
 * @Description : Account Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-02-01 한진선           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class AccountAUserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountServiceImpl.class);

	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;

	
	/** EgovTestService */
	@Resource(name = "loginUserService")
	private LoginUserService loginUserService;
	
	/** EgovTestService */
	@Resource(name = "accountAUserService")
	private AccountAUserService accountAUserService;
	
	/** EgovTestService */
	@Resource(name = "accountUserService")
	private AccountUserService accountUserService;
	
	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();	

	/**
	 * 관리자 유저 계정조회화면.
	 * @return 관리자 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openAccountListAUser.do")
	public String openAccountListAUser(Map<String, Object> param) throws Exception {		
		return "/view/admin/account/accountListAUser";
	}
	
	/**
	 * 관리자 유저계정상세(수정)
	 * @return 관리자 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/accountUpdateAUser.do")
	public String accountUpdateAUser(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);

		return "/view/admin/account/accountUpdateAUser";
	}
	
	/**
	 * 유저계정등록
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openAccountAUserReg.do")
	public String openAccountAUserReg(ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		return "/view/admin/account/accountRegAUser";
	}
	/**
	 * 유저수 확인
	 * @param Map<String, Object> 
	 * @param loginVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return cnt(로그인 체크 수) - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/AUserCnt.do", method = RequestMethod.POST)
	public void AUserCnt(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		int idChkCount = 0; 
		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			idChkCount = accountAUserService.selectAUserCnt(params);
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
	@RequestMapping(value ="/admin/accountListAUser.do", method = RequestMethod.POST)
	public void selectAUserAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {		
		res.setContentType("text/html; charset=utf-8");
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> accountList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			accountList = accountAUserService.selectAUserList(params);
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
	 * 회원가입
	 * @param Map<String, Object> 
	 * @param accountAUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return 회원가입
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/AUserSignUp.do", method = RequestMethod.POST)
	public void AUserSignUp(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		try {		
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = accountAUserService.userASignUp(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();

	}
	
	/**
	 * 관리자 유저를 상세 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param AccountVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/accountAUserDtl.do", method = RequestMethod.POST)
	public void selectAUserDtlAccount(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			Map<String, Object> userInfo = accountAUserService.selectAdminLoginInfo(params);
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
	 * @param accountAUserVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return 회원가입
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/AUserUpdate.do", method = RequestMethod.POST)
	public void AUserUpdate(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		try {		
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = accountAUserService.AuserAccountUpdate(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();

	}
	/**
	 * 관리자 계정 삭제
	 * @param Map<String, Object> 
	 * @param accountVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return int
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/AUsersecession.do", method = RequestMethod.POST)
	public void AUsersecession(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		 try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			int secessionCnt = accountAUserService.AUsersecession(params);
			json = mapper.writeValueAsString(secessionCnt);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	
}
