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
package egovframework.admin.notice.ctr;

import java.io.File;
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

import egovframework.admin.notice.svc.IndustryService;
import egovframework.admin.notice.svc.impl.IndustryServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Class Name : IndustryController.java
 * @Description : Industry Controller Class
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2021-02-05 유지완 최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-11
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class IndustryController {

	private static final Logger LOGGER = LoggerFactory.getLogger(IndustryServiceImpl.class);

	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;

	/** FileService */
	@Resource(name = "fileService")
	private FileService fileService;

	/** IndustryService */
	@Resource(name = "industryService")
	private IndustryService industryService;

	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * 산업뉴스 계정조회화면.
	 * 
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openIndustry.do")
	public String openIndustry(Map<String, Object> param) throws Exception {

		return "/view/admin/notice/industryAdminList";
	}

	/**
	 * 산업뉴스 등록화면.
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openRegistIndustry.do")
	public String openRegistIndustry(Map<String, Object> param) throws Exception {
		return "/view/admin/notice/industryAdminRegist";
	}
	
	/**
	 * 산업뉴스 게시글 수정화면.
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openUpdateIndustry.do")
	public String openUpdateIndustry(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		model.addAttribute("param", param);

		return "/view/admin/notice/industryAdminUpdate";
	}

	
	/**
	 * 산업뉴스 조회한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param IndustryVO   - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/industryAdminList.do", method = RequestMethod.POST)
	public void selectIndustry(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		System.out.println("넘어옴");
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> noticeIndustryList = new ArrayList<Map<String, Object>>();
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			noticeIndustryList = industryService.selectIndustryList(param);
			noticeIndustryList = CamelUtil.convertListMap(noticeIndustryList);
			json = mapper.writeValueAsString(noticeIndustryList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("noticeIndustryList >>>" + noticeIndustryList);

		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 산업뉴스 등록한다.
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param NoticeVO      - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/industryRegist.do", method = RequestMethod.POST)
	public void industryRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		String seqId = null;
		int seq = 0;
		int result = 0;

		/* Seq 추출 */
		seq = seqService.selectSeq(param);

		param.put("refIdx", seq);
		param.put("boardNo", seq);

		/* 파일 첨부 */
		try {
			fileResult = fileService.insertFileInfo(request, param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		/* 글 등록 */
		result = industryService.industryRegist(param);
		if (result > 0) {

			try {
				out = res.getWriter();
				ObjectMapper mapper = new ObjectMapper();

				json = mapper.writeValueAsString(result);
			} catch (Exception e) {
				e.printStackTrace();
			}
			out.print(json);
			out.flush();
			out.close();
		}
	}
	
	/**
	 * 산업뉴스 수정페이지를 조회한다. 
	 * @param Map<String, Object> - 조회할 정보가 담긴 VO
	 * @param NoticeVO      - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/selectUpdateIndustry.do", method = RequestMethod.POST)
	public void selectUpdateIndustry(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		Map<String, Object> selectUpdateIndustry = new HashMap<>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectUpdateIndustry = industryService.selectUpdateIndustry(param);
			selectUpdateIndustry = CamelUtil.convertMap(selectUpdateIndustry);

			json = mapper.writeValueAsString(selectUpdateIndustry);
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
	 * @param FileVO   - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/industryFile.do", method = RequestMethod.POST)
	public void industryFile(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			fileList = fileService.selectFileList(param);
			fileList = CamelUtil.convertListMap(fileList);
			json = mapper.writeValueAsString(fileList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("fileList >>>" + fileList);

		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 산업뉴스 수정
	 * @param Map<String, Object> 
	 * @param NoticeVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return List<Map<String,Object>> - 조회한 정보
	 * @exception Exception
	 */
	@RequestMapping(value ="/admin/industryUpdate.do", method = RequestMethod.POST)
	public void industryUpdate(HttpServletResponse res, final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = industryService.industryUpdate(param);

			json = mapper.writeValueAsString(result);			
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}
	// 파일 업데이트
	@RequestMapping(value = "/admin/industryFileUpdate.do", method = RequestMethod.POST)
	public void industryFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		try {
			String[] filePathArr = params.get("filePath").toString().split(","); //사용여부  
			ArrayList<String[]> delYnList = new ArrayList<String[]>();
			ArrayList<String[]> idxList = new ArrayList<String[]>();

			for(int i=0; i<filePathArr.length; i++) {
				String filePath = filePathArr[i];
				delYnList.add(params.get("delYn"+filePath).toString().split(","));
				idxList.add(params.get("idx"+filePath).toString().split(","));
			}


			List<Map<String, Object>> fileResult = null;
			List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
			params.put("refIdx", params.get("boardNo"));		

			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 파일 첨부 */
			fileResult = fileService.insertFileInfo(request, params);
			/* 파일변경여부있을시 파일삭제*/
			for(int i=0; i<delYnList.size(); i++) {
				for(int j=0; j<delYnList.get(i).length; j++) {
					if("Y".equals(delYnList.get(i)[j])) {
						params.put("idx", idxList.get(i)[j]);
						params.put("orgIdx", idxList.get(i)[j]);
						params.put("delYn", delYnList.get(i)[j]);

						//파일 조회
						fileList = fileService.selectFileList(params);
						fileList = CamelUtil.convertListMap(fileList);

						String filePath = fileList.get(0).get("filePath").toString();
						String stFileNm = fileList.get(0).get("stFileNm").toString();
						File file = new File(filePath + stFileNm); 
						if( file.exists() ){ 
							file.delete();
							System.out.println("파일삭제");
						}else {
							System.out.println("파일없음");
						}

						//파일 삭제
						fileService.filedel(params);
					}
				}
			}

			json = mapper.writeValueAsString(fileResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/**
	 * 산업뉴스 삭제
	 * @param Map<String, Object> 
	 * @param NoticeVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return int
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/industryDelete.do" , method = RequestMethod.POST)
	public void industryDelete(HttpServletResponse res,final MultipartHttpServletRequest request, @RequestParam Map<String, Object> param) throws Exception {	
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		List<Map<String, Object>> fileResult = null;
		String json = null;
		int result = 0;
		String industryFlag = String.valueOf(param.get("fileupdateflag"));
		
		try {
			result = industryService.industryDelete(param);
			if(result > 0 && "Y".equals(industryFlag)) {
				
				fileService.filedel(param);
							    
	         }
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			json = mapper.writeValueAsString(result);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	
}
