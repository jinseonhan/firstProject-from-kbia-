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
package egovframework.user.intro.ctr;

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

import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.intro.svc.IntroService;
import egovframework.user.intro.svc.impl.IntroServiceImpl;


/**
 * @Class Name : AccountUserController.java
 * @Description : AccountUser Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-20 지승배           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class IntroController {

	private static final Logger LOGGER = LoggerFactory.getLogger(IntroServiceImpl.class);
	
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "introService")
	private IntroService introService;
	
	/**
	 * 인사말 조회.
	 * @return 인사말 조회 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openIntroComment.do")
	public String openIntroComment(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/introComment";
	}
	
	/**
	 * 연혁 조회.
	 * @return 연혁  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openIntroHistroy.do")
	public String openIntroHistroy(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/introHistroy";
	}
	
	@RequestMapping(value = "/openIntroHistory.do")
	public String openIntroHistory(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/introHistroy2";
	}
	
	/**
	 * 임원 조회.
	 * @return 임원  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openExecutives.do")
	public String openExecutives(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/executives";
	}
	
	/**
	 * 조직도 조회.
	 * @return 조직도  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openOrganization.do")
	public String openOrganization(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/organization";
	}
	
	/**
	 * 주요업무 조회.
	 * @return 주요업무  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openMainTask.do")
	public String openMainTask(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/mainTask";
	}
	
	/**
	 * CI 조회.
	 * @return 주요업무  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openCI.do")
	public String openCI(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/CI";
	}
	
	/**
	 * 오시는길 조회.
	 * @return 오시는길  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openComeRoot.do")
	public String openComeRoot(Map<String, Object> param) throws Exception {		
		
		return "/view/user/intro/comeRoot";
	}
	
	/**
	 * 약관조회 조회.
	 * @return 오시는길  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openTerms.do")
	public String openTerms(Map<String, Object> param) throws Exception {		
		
		return "/view/user/law/terms";
	}
	
	/**
	 * 개인정보법 조회.
	 * @return 오시는길  주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openPrivacyLaw.do")
	public String openPrivacyLaw(Map<String, Object> param) throws Exception {		
		
		return "/view/user/law/privacyLaw";
	}
	
	@RequestMapping(value ="/user/showHistory.do", method = RequestMethod.POST)
	public void selectIntroHistory(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> showHistory = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			showHistory = introService.selectIntroHistory(params);
			showHistory = CamelUtil.convertListMap(showHistory);
			json = mapper.writeValueAsString(showHistory);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
}
