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

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
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
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2021-01-20 지승배 최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class IntroController {

	private static final Logger LOGGER = LoggerFactory.getLogger(IntroServiceImpl.class);

	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	/** EgovTestService */
	@Resource(name = "introService")
	private IntroService introService;

	/**
	 * 인사말 조회.
	 * 
	 * @return 인사말 조회 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openIntroComment.do")
	public String openIntroComment(Map<String, Object> param) throws Exception {

		return "/view/user/intro/introComment";
	}

	/**
	 * 연혁 조회.
	 * 
	 * @return 연혁 주소
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
	 * 임원 조회 페이지 호출
	 * 
	 * @return 임원 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openExecutives.do")
	public String openExecutives(Map<String, Object> params) throws Exception {
		
		return "/view/user/intro/executives";
	}
	
	/*임원 조회 데이터 호출*/
	@RequestMapping(value="/json/openExecutives.do", method = RequestMethod.POST)
	public void excuDate(@RequestParam Map<String, Object> params,HttpServletResponse response, HttpServletRequest request, ModelMap model) throws Exception{
		JSONObject jObj = new JSONObject();
		
		List<Map<String,Object>> result = introService.getFntExcuList(params);
		List<Map<String,Object>> execCode = introService.getFntExcuType();
		
		response.setContentType("text/html; charset=utf-8");
		
		jObj.put("result", result);
		jObj.put("execCode", execCode);
		
		response.addHeader("Content-Type", "text/plain");
		OutputStream out = response.getOutputStream();
		out.write(jObj.toString().getBytes("UTF-8"));
		out.flush();
		out.close();
	}

	/**
	 * 조직도 조회.
	 * 
	 * @return 조직도 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openOrganization.do")
	public String openOrganization(@RequestParam Map<String, Object> params) throws Exception {
		return "/view/user/intro/organization";
	}

	/*
	 * 조직도 조회
	*/
	@RequestMapping(value = "/getOrganList.do")
	public void getOrganList(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> param) throws Exception {
		
		PrintWriter out = null;
		String json = null;
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> groupList = introService.getGroupCode(param);
		List<Map<String, Object>> clist = new ArrayList<>();
		List<Map<String, Object>> glist = new ArrayList<>();
		
		response.setContentType("text/html; charset=utf-8");
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			if( groupList.size() != 0 ) {
				for (int i = 0; i < groupList.size(); i++) {
					param.put("groupCode", groupList.get(i).get("codeDtl"));
					groupList.get(i).put("organ", introService.getOrganList(param));
					
					if (groupList.get(i).get("codeDtl").toString().contentEquals("VCHAIRMAN")) {
						clist = (List<Map<String, Object>>) groupList.get(i).get("organ");
					} else if (groupList.get(i).get("codeDtl").toString().contentEquals("GENERAL")) {
						glist = (List<Map<String, Object>>) groupList.get(i).get("organ");
					}
				}
			}
			
			groupList = CamelUtil.convertListMap(groupList);
			clist = CamelUtil.convertListMap(clist);
			glist = CamelUtil.convertListMap(glist);
			
			result.put("groupList", groupList);
			result.put("clist", clist);
			result.put("glist", glist);
			
			json = mapper.writeValueAsString(result);
		} catch(Exception e) {
			e.printStackTrace();
		}
		out.write(json);
		out.flush();
		out.close();
		
	}
	
	/**
	 * 주요업무 조회.
	 * 
	 * @return 주요업무 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openMainTask.do")
	public String openMainTask(Map<String, Object> param) throws Exception {

		return "/view/user/intro/mainTask";
	}

	/**
	 * CI 조회.
	 * 
	 * @return 주요업무 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openCI.do")
	public String openCI(Map<String, Object> param) throws Exception {

		return "/view/user/intro/CI";
	}

	/**
	 * 오시는길 조회.
	 * 
	 * @return 오시는길 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openComeRoot.do")
	public String openComeRoot(Map<String, Object> param) throws Exception {

		return "/view/user/intro/comeRoot";
	}

	/**
	 * 약관조회 조회.
	 * 
	 * @return 오시는길 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openTerms.do")
	public String openTerms(Map<String, Object> param) throws Exception {

		return "/view/user/law/terms";
	}

	/**
	 * 개인정보법 조회.
	 * 
	 * @return 오시는길 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openPrivacyLaw.do")
	public String openPrivacyLaw(Map<String, Object> param) throws Exception {

		return "/view/user/law/privacyLaw";
	}

	@RequestMapping(value = "/user/showHistory.do", method = RequestMethod.POST)
	public void selectIntroHistory(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> showHistory = new ArrayList<Map<String, Object>>();

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

	/**
	 * 조직도 및 연락처 상단
	 * 
	 * @return 조직도 및 연락처 상단
	 * @exception Exception
	 */
	@RequestMapping(value = "/user/selectOrganTop.do", method = RequestMethod.POST)
	public void selectPopContent(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectOrganTop = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectOrganTop = introService.selectOrganTop(params);
			selectOrganTop = CamelUtil.convertListMap(selectOrganTop);
			json = mapper.writeValueAsString(selectOrganTop);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/**
	 * 조직도 및 연락처 하단
	 * 
	 * @return 조직도 및 연락처 상단
	 * @exception Exception
	 */
	@RequestMapping(value = "/user/selectOrganBottom.do", method = RequestMethod.POST)
	public void selectOrganBottom(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectOrganBottom = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectOrganBottom = introService.selectOrganBottom(params);
			selectOrganBottom = CamelUtil.convertListMap(selectOrganBottom);
			json = mapper.writeValueAsString(selectOrganBottom);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

}
