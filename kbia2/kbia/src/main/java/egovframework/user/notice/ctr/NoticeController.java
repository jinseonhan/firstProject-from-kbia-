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
package egovframework.user.notice.ctr;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.user.notice.svc.NoticeService;
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
import org.springframework.web.bind.annotation.ResponseBody;
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
public class NoticeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(NoticeController.class);
	
	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "noticeService")
	private NoticeService noticeService;
	
	@Resource(name = "fileService")
	private FileService fileService;
	
	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();	

	/**
	 * 공지사항 조회화면.
	 * @return 메인 배너 조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openNotice.do")
	public String openNotice(Map<String, Object> param) throws Exception {		
		
		return "/view/user/notice/noticeList";
	}
	
	@RequestMapping(value = "/openIndustry.do")
	public String openIndustry(Map<String, Object> param) throws Exception {		
		
		return "/view/user/notice/industryList";
	}
	
	@RequestMapping(value = "/openEvent.do")
	public String openEvent(Map<String, Object> param) throws Exception {		
		
		return "/view/user/notice/eventInfo";
	}
	
	@RequestMapping(value = "/openMemberNewsList.do")
	public String openMemberNews(Map<String, Object> param) throws Exception {		
		
		return "/view/user/notice/memberNews";
	}
	/**
	 * 공지사항 상세 조회화면.
	 * @return 공지사항 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openViewContent.do")
	public String openContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		//fileService.filDown(request, res, "C:\\eGovFrameDev-3.10.0-64bit\\upFile\\upFile\\", "aaa.txt", "bbb.txt"); 
		return "/view/user/notice/noticeContent";
	}
	
	/**
	 * 회원사 동정 상세 조회화면.
	 * @return 회원사 동정 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openNewsContent.do")
	public String openNewsContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		//fileService.filDown(request, res, "C:\\eGovFrameDev-3.10.0-64bit\\upFile\\upFile\\", "aaa.txt", "bbb.txt"); 
		return "/view/user/notice/memNewsContent";
	}
	
	/**
	 * 산업뉴스 상세 조회화면.
	 * @return 공지사항 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/openIndContent.do")
	public String openIndContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		model.addAttribute("param", param);
		//fileService.filDown(request, res, "C:\\eGovFrameDev-3.10.0-64bit\\upFile\\upFile\\", "aaa.txt", "bbb.txt"); 
		return "/view/user/notice/industryContent";
	}
	
	/**
	 * 공지사항 파일 다운로드.
	 * @return 공지사항 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/noticeFileDown.do")
	public void noticeFileDown(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> param) throws Exception {		
		//fileService.filDown(request, res, "C:\\eGovFrameDev-3.10.0-64bit\\upFile\\upFile\\", "aaa.txt", "bbb.txt"); 
		System.out.println("fileDown >>>" + param);
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
	 * 공지사항을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/noticeList.do", method = RequestMethod.POST)
	public void selectNotice(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> noticeList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			noticeList = noticeService.selectNoticeList(params);
			noticeList = CamelUtil.convertListMap(noticeList);
			
			json = mapper.writeValueAsString(noticeList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 공지사항세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/noticeContent.do", method = RequestMethod.POST)
	public void selectNoticeContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> noticeContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			noticeContentList = noticeService.selectNoticeContent(params);
			noticeContentList = CamelUtil.convertMap(noticeContentList);
			json = mapper.writeValueAsString(noticeContentList);
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
	@RequestMapping(value ="/user/noticeFile.do", method = RequestMethod.POST)
	public void noticeFile(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
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
	 * 산업뉴스를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/industryList.do", method = RequestMethod.POST)
	public void selectIndustry(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> industryList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			industryList = noticeService.selectIndustryList(params);
			industryList = CamelUtil.convertListMap(industryList);
			json = mapper.writeValueAsString(industryList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	/**
	 * 산업뉴스세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/industryContent.do", method = RequestMethod.POST)
	public void selectIndustryContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> industryContentList = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			industryContentList = noticeService.selectIndustryContent(params);
			industryContentList = CamelUtil.convertMap(industryContentList);
			json = mapper.writeValueAsString(industryContentList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 공지사항을 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/memNewsList.do", method = RequestMethod.POST)
	public void selectMemNews(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> memNewsList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			memNewsList = noticeService.memNewsList(params);
			memNewsList = CamelUtil.convertListMap(memNewsList);
			
			json = mapper.writeValueAsString(memNewsList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 공지사항세부를 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param ContentVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/newsContent.do", method = RequestMethod.POST)
	public void selectNewsContent(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		Map<String,Object> memNewsContent = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			memNewsContent = noticeService.memNewsContent(params);
			memNewsContent = CamelUtil.convertMap(memNewsContent);
			json = mapper.writeValueAsString(memNewsContent);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value ="/user/updateViewCnt.do", method = RequestMethod.POST)
	public void updateViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = noticeService.updateViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}
	
	@RequestMapping(value ="/user/newsViewCnt.do", method = RequestMethod.POST)
	public void newsViewCnt(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
				
		/* 조회수 증가 */

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			int result = noticeService.newsViewCnt(param);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}
	
	@RequestMapping(value ="/user/eventList.do", method = RequestMethod.POST)
	public void selectShowinfo(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {			 
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		List<Map<String,Object>> eventList = new ArrayList<Map<String, Object>>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			eventList = noticeService.selectEventList(params);
			eventList = CamelUtil.convertListMap(eventList);
			json = mapper.writeValueAsString(eventList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}

}
