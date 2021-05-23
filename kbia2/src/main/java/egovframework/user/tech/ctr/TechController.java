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
package egovframework.user.tech.ctr;

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
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.tech.ctr.TechController;
import egovframework.user.tech.svc.TechService;


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
public class TechController {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TechController.class);
	
	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "techService")
	private TechService techService;
	
	@Resource(name = "fileService")
	private FileService fileService;
	
	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * 전지의이해 화면.
	 * @return 전지의이해 화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openTechKnow.do")
	public String openTechKnow(Map<String, Object> param) throws Exception {		
		
		return "/view/user/tech/techKnow";
	}
	/**
	 * 산업통계 화면.
	 * @return 산업통계화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openIndustryStat.do")
	public String openIndustryStat(Map<String, Object> param) throws Exception {		
		
		return "/view/user/tech/industryStat";
	}
	
	/**
	 * 기술동향 화면.
	 * @return 기술동향화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openTechTrend.do")
	public String openTechTrend(Map<String, Object> param) throws Exception {		
		
		return "/view/user/tech/techTrendList";
	}
	/**
	 * 기술동향 상세 화면.
	 * @return 기술동향 상세화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openTechContent.do")
	public String openTrendContent(Map<String, Object> param) throws Exception {		
		
		return "/view/user/tech/techTrendContent";
	}
	
	/**
	 * 유관산업동향 화면.
	 * @return 유관산업동향화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openRelatedTrend.do")
	public String openRelatedTrend(Map<String, Object> param) throws Exception {		
		
		return "/view/user/tech/relatedTrendList";
	}
	/**
	 * 유관산업동향 상세 화면.
	 * @return 기술동향 상세화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openRelatedContent.do")
	public String openRelatedContent(Map<String, Object> param) throws Exception {		
		
		return "/view/user/tech/relatedTrendContent";
	}
	
	/**
	 * 기술동향을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/techTrendList.do", method = RequestMethod.POST)
	public void selectTrend(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> trendList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			trendList = techService.techTrendList(params);
			trendList = CamelUtil.convertListMap(trendList);
			json = mapper.writeValueAsString(trendList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 기술동향 세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/techTrendContent.do", method = RequestMethod.POST)
	public void selectTrendContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> trendContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			trendContentList = techService.techTrendContent(params);
			trendContentList = CamelUtil.convertMap(trendContentList);
			json = mapper.writeValueAsString(trendContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 유관산업동향을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/relatedTrendList.do", method = RequestMethod.POST)
	public void selectRelatedTrend(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> relatedTrendList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			relatedTrendList = techService.techTrendList(params);
			relatedTrendList = CamelUtil.convertListMap(relatedTrendList);
			json = mapper.writeValueAsString(relatedTrendList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 유관산업동향 세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/relatedTrendContent.do", method = RequestMethod.POST)
	public void selectRelatedContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> relatedContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			relatedContentList = techService.techTrendContent(params);
			relatedContentList = CamelUtil.convertMap(relatedContentList);
			json = mapper.writeValueAsString(relatedContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/trendViewCnt.do", method = RequestMethod.POST)
	public void techViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = techService.trendViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}
	
	@RequestMapping(value ="/user/relatedViewCnt.do", method = RequestMethod.POST)
	public void relatedViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = techService.relatedViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}
	
}
