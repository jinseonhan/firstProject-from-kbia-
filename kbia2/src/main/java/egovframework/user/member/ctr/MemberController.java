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
package egovframework.user.member.ctr;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
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

import egovframework.admin.member.svc.impl.MemberAdminServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.member.svc.MemberService;


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
public class MemberController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberAdminServiceImpl.class);
	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;
	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Resource(name = "fileService")
	private FileService fileService;
	
	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * 유저계정조회화면.
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openMemberGuide.do")
	public String openAccountUser(Map<String, Object> param) throws Exception {		
		
		return "/view/user/member/memberGuide";
	}
	
	@RequestMapping(value = "/openMemberInfo.do")
	public String openMemberInfo(Map<String, Object> param) throws Exception {		
		
		return "/view/user/member/memberInfo";
	}
	
	@RequestMapping(value = "/openMemberInfo2.do")
	public String openMemberInfo2(Map<String, Object> param) throws Exception {		
		
		return "/view/user/member/memberInfo2";
	}
	
	@RequestMapping(value = "/openMemberInfo3.do")
	public String openMemberInfo3(Map<String, Object> param) throws Exception {		
		
		return "/view/user/member/memberInfo3";
	}
	
	@RequestMapping(value = "/openMemberInfo4.do")
	public String openMemberInfo4(Map<String, Object> param) throws Exception {		
		
		return "/view/user/member/memberInfo4";
	}
	
	@RequestMapping(value = "/openMemInfoContent.do")
	public String openHDetail(Map<String, Object> param) throws Exception {		
		
		return "/view/user/member/memInfoContent";
	}
	
	@RequestMapping(value ="/user/fcMemList.do", method = RequestMethod.POST)
	public void selectFcMember(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> fcMemList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			fcMemList = memberService.selectFcMemList(params);
			fcMemList = CamelUtil.convertListMap(fcMemList);
			json = mapper.writeValueAsString(fcMemList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/bcMemList.do", method = RequestMethod.POST)
	public void selectBcMember(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> bcMemList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			bcMemList = memberService.selectBcMemList(params);
			bcMemList = CamelUtil.convertListMap(bcMemList);
			json = mapper.writeValueAsString(bcMemList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/ecMemList.do", method = RequestMethod.POST)
	public void selectEcMember(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> ecMemList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			ecMemList = memberService.selectEcMemList(params);
			ecMemList = CamelUtil.convertListMap(ecMemList);
			json = mapper.writeValueAsString(ecMemList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/scMemList.do", method = RequestMethod.POST)
	public void selectScMember(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> scMemList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			scMemList = memberService.selectScMemList(params);
			scMemList = CamelUtil.convertListMap(scMemList);
			json = mapper.writeValueAsString(scMemList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/memInfoContent.do", method = RequestMethod.POST)
	public void memInfoContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> memInfoContent = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			memInfoContent = memberService.memInfoContent(params);
			memInfoContent = CamelUtil.convertMap(memInfoContent);
			json = mapper.writeValueAsString(memInfoContent);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
}
