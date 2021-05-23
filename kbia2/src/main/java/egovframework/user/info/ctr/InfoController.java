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
package egovframework.user.info.ctr;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.user.info.svc.InfoService;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

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


/**
 * @Class Name : ContentController.java
 * @Description : Content Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-10 노희원          최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class InfoController {

	private static final Logger LOGGER = LoggerFactory.getLogger(InfoController.class);
	
	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "infoService")
	private InfoService infoService;
	
	@Resource(name = "fileService")
	private FileService fileService;
	
	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();	

	/**
	 * 주간브리프 조회화면.
	 * @return 주간브리프 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openBrief.do")
	public String openBrief(Map<String, Object> param) throws Exception {		
		
		return "/view/user/info/briefList";
	}
	/**
	 * TheBattery 조회화면.
	 * @return TheBattery 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openBattery.do")
	public String openBattery(Map<String, Object> param) throws Exception {		
		
		return "/view/user/info/batteryList";
	}
	/**
	 * 기술자료실 조회화면.
	 * @return 주간브리프 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openReference.do")
	public String openReference(Map<String, Object> param) throws Exception {		
		
		return "/view/user/info/referenceList";
	}
	/**
	 * 협회 인재채용 조회화면.
	 * @return 협회 인재채용 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openGhireList.do")
	public String openGhire(Map<String, Object> param) throws Exception {		
		
		return "/view/user/info/gHireList";
	}
	/**
	 * 회원사 인재채용 조회화면.
	 * @return 협회 인재채용 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openMhireList.do")
	public String openHire(Map<String, Object> param) throws Exception {		
		
		return "/view/user/info/mHireList";
	}
	
	/**
	 * 내용 상세보기 조회화면.
	 * @return 내용 상세보기 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openBriefContent.do")
	public String openBriefContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		return "/view/user/info/briefContent";
	}
	/**
	 * 내용 상세보기 조회화면.
	 * @return 내용 상세보기 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openBatteryContent.do")
	public String openBatteryContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);

		return "/view/user/info/batteryContent";
	}
	
	/**
	 * 기술자료실 내용 상세보기 조회화면.
	 * @return 내용 상세보기 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openRefContent.do")
	public String openRefContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		return "/view/user/info/refContent";
	}
	
	/**
	 * 채용공고 내용 상세보기 조회화면.
	 * @return 내용 상세보기 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openHireContent.do")
	public String openHDetail(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		return "/view/user/info/hireContent";
	}
	
	/**
	 * 주간브리프 파일 다운로드.
	 * @return 공지사항 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/infoFileDown.do")
	public void infoFileDown(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		//fileService.filDown(request, res, "C:\\eGovFrameDev-3.10.0-64bit\\upFile\\upFile\\", "aaa.txt", "bbb.txt"); 
		List<Map<String,Object>> fileList = new ArrayList<Map<String, Object>>();
		fileList = fileService.selectFileList(param);
		fileList = CamelUtil.convertListMap(fileList);
		if(fileList.size() == 1) {
			Map<String, Object> fileMap = new HashMap<String, Object>();
			fileMap.put("filePath",fileList.get(0).get("filePath"));  //파일 경로
			fileMap.put("stFileNm",fileList.get(0).get("stFileNm"));  //파일 이름
			fileMap.put("ognFileNm",fileList.get(0).get("ognFileNm"));//파일기존이름
			
			fileService.filDown(request, res, fileMap); //파일 다운로드
		}
	}
	
	
	/**
	 * 주간 브리프를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/briefList.do", method = RequestMethod.POST)
	public void selectBrief(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> briefList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			briefList = infoService.selectBriefList(params);
			briefList = CamelUtil.convertListMap(briefList);
			json = mapper.writeValueAsString(briefList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 주간 브리프 갯수 조회
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/batteryListCnt.do", method = RequestMethod.POST)
	public void selectBatteryListCnt(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		int listCnt = 0;
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			listCnt = infoService.batteryListCnt(params);
			json = mapper.writeValueAsString(listCnt);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 베터리 세부사항 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/batteryContent.do", method = RequestMethod.POST)
	public void selectBatteryContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> batteryContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			batteryContentList = infoService.selectBatteryContent(params);
			batteryContentList = CamelUtil.convertMap(batteryContentList);
			json = mapper.writeValueAsString(batteryContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 주간브리프세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/briefContent.do", method = RequestMethod.POST)
	public void selectBriefContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> briefContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			briefContentList = infoService.selectBriefContent(params);
			briefContentList = CamelUtil.convertMap(briefContentList);
			json = mapper.writeValueAsString(briefContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	/**
	 * 기술자료실 세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/refContent.do", method = RequestMethod.POST)
	public void selectRefContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> refContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			refContentList = infoService.selectRefContent(params);
			refContentList = CamelUtil.convertMap(refContentList);
			json = mapper.writeValueAsString(refContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	/**
	 * 채용공고 세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/hireContent.do", method = RequestMethod.POST)
	public void selectHireContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> hireContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			hireContentList = infoService.selectHireContent(params);
			hireContentList = CamelUtil.convertMap(hireContentList);
			json = mapper.writeValueAsString(hireContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	/**
	 * 공지사항파일을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/infoFile.do", method = RequestMethod.POST)
	public void infoFile(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> fileList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			fileList = fileService.selectFileList(params);
			fileList = CamelUtil.convertListMap(fileList);
			json = mapper.writeValueAsString(fileList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	/**
	 * 기술자료실 파일을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/refFile.do", method = RequestMethod.POST)
	public void refFile(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> fileList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			fileList = fileService.selectFileList(params);
			fileList = CamelUtil.convertListMap(fileList);
			json = mapper.writeValueAsString(fileList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	@RequestMapping(value ="/user/batteryList.do", method = RequestMethod.POST)
	public void selectBattery(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> selectBatteryList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			selectBatteryList = infoService.selectBatteryList(params);
			selectBatteryList = CamelUtil.convertListMap(selectBatteryList);
			json = mapper.writeValueAsString(selectBatteryList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectBatteryList >>>" + selectBatteryList);
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/referenceList.do", method = RequestMethod.POST)
	public void selectReference(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> selectReferenceList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			selectReferenceList = infoService.selectReferenceList(params);
			selectReferenceList = CamelUtil.convertListMap(selectReferenceList);
			json = mapper.writeValueAsString(selectReferenceList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectReferenceList>>>" + selectReferenceList);
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/ghireList.do", method = RequestMethod.POST)
	public void selectgHire(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> selectgHireList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			selectgHireList = infoService.selectgHireList(params);
			selectgHireList = CamelUtil.convertListMap(selectgHireList);
			json = mapper.writeValueAsString(selectgHireList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectgHireList >>>" + selectgHireList);
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/mhireList.do", method = RequestMethod.POST)
	public void selectmHire(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> selectmHireList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			selectmHireList = infoService.selectmHireList(params);
			selectmHireList = CamelUtil.convertListMap(selectmHireList);
			json = mapper.writeValueAsString(selectmHireList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectmHireList >>>" + selectmHireList);
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/briefViewCnt.do", method = RequestMethod.POST)
	public void briefViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = infoService.briefViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}
	
	@RequestMapping(value ="/user/batteryViewCnt.do", method = RequestMethod.POST)
	public void batteryViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = infoService.batteryViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}
	
	@RequestMapping(value ="/user/refViewCnt.do", method = RequestMethod.POST)
	public void refViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = infoService.refViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}

}
