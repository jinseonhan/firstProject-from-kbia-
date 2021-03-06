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
package egovframework.admin.info.ctr;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import org.springframework.ui.ModelMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.admin.info.svc.BriefService;
import egovframework.admin.info.svc.impl.BriefServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import net.sf.json.JSONArray;

/**
 * @Class Name : BriefController.java
 * @Description : Brief Controller Class
 * @Modification Information
 * @ @ ????????? ????????? ???????????? @ --------- --------- ------------------------------- @
 *   2021-01-11 ????????? ????????????
 *
 * @author ????????????????????? ???????????? ?????????
 * @since 2021-01-11
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class BriefController {

	private static final Logger LOGGER = LoggerFactory.getLogger(BriefServiceImpl.class);

	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;

	/** FileServiece */
	@Resource(name = "fileService")
	private FileService fileService;

	/** EgovTestService */
	@Resource(name = "briefService")
	private BriefService briefService;

	/* ????????? ?????? */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * ??????????????? ??????????????????.
	 * 
	 * @return ???????????????????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openBrief.do")
	public String openBrief(Map<String, Object> param) throws Exception {

		return "/view/admin/info/briefAdminList";
	}

	/**
	 * ??????????????? ????????? ????????????.
	 * 
	 * @return ???????????????????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openRegistBrief.do")
	public String openRegistBrief(Map<String, Object> param) throws Exception {
		return "/view/admin/info/briefAdminRegist";
	}

	/**
	 * ??????????????? ????????? ????????????.
	 * 
	 * @return ???????????????????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openUpdateBrief.do")
	public String openUpdateBrief(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		model.addAttribute("param", param);

		return "/view/admin/info/briefAdminUpdate";
	}

	/**
	 * ?????????????????? ????????????.
	 * 
	 * @param Map<String, Object> - ????????? ????????? ?????? VO
	 * @param InfoVO      - ?????? ???????????? ????????? ?????? VO
	 * @param status
	 * @return List<Map<String,Object>> - ????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/briefAdminList.do", method = RequestMethod.POST)
	public void selectInfo(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> infoBriefList = new ArrayList<Map<String, Object>>();
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			infoBriefList = briefService.selectBriefList(param);
			infoBriefList = CamelUtil.convertListMap(infoBriefList);
			json = mapper.writeValueAsString(infoBriefList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("infoBriefList >>>" + infoBriefList);

		out.print(json);
		out.flush();
		out.close();
	}

	/**
	 * ?????????????????? ????????????.
	 * 
	 * @param Map<String, Object> - ????????? ????????? ?????? VO
	 * @param InfoVO      - ?????? ???????????? ????????? ?????? VO
	 * @param status
	 * @return List<Map<String,Object>> - ????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/briefRegist.do", method = RequestMethod.POST)
	public void briefRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		String seqId = null;
		int seq = 0;
		int result = 0;
		/* Seq ?????? */
		seq = seqService.selectSeq(param);

		param.put("refIdx", seq);
		param.put("boardNo", seq);

		/* ?????? ?????? */
		try {
			fileResult = fileService.insertFileInfo(request, param);

		} catch (Exception e) {
			e.printStackTrace();
		}

		/* ??? ?????? */
		result = briefService.briefRegist(param);

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
	 * ????????????????????????????????? ????????????.
	 * 
	 * @param Map<String, Object> - ????????? ????????? ?????? VO
	 * @param InfoVO      - ?????? ???????????? ????????? ?????? VO
	 * @param status
	 * @return List<Map<String,Object>> - ????????? ??????
	 * @exception Exception
	 */

	@RequestMapping(value = "/admin/selectUpdateBrief.do", method = RequestMethod.POST)
	public void selectUpdateBrief(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param ) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
	
		Map<String, Object> selectUpdateBrief = new HashMap<>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectUpdateBrief = briefService.selectUpdateBrief(param);
			selectUpdateBrief = CamelUtil.convertMap(selectUpdateBrief);

			json = mapper.writeValueAsString(selectUpdateBrief);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/**
	 * ????????????????????? ????????????.
	 * 
	 * @param Map<String, Object> - ????????? ????????? ?????? VO
	 * @param ContentVO   - ?????? ???????????? ????????? ?????? VO
	 * @param status
	 * @return List<Map<String,Object>> - ????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/briefFile.do", method = RequestMethod.POST)
	public void birefFile(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			fileList = fileService.selectFileList(params);
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
	 * ??????????????? ??????
	 * 
	 * @param Map<String, Object>
	 * @param InfoVO      - ?????? ???????????? ????????? ?????? VO
	 * @param status
	 * @return List<Map<String,Object>> - ????????? ??????
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/briefUpdate.do", method = RequestMethod.POST)
	public void briefUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> param) 
			throws Exception {
		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = briefService.briefUpdate(param);

			json = mapper.writeValueAsString(result);			
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}
	
// ?????? ????????????
	@RequestMapping(value = "/admin/briefFileUpdate.do", method = RequestMethod.POST)
	public void briefFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
	@RequestParam Map<String, Object> params) throws Exception {
			res.setContentType("text/html; charset=utf-8");
			PrintWriter out = null;
			String json = null;
			try {
				String[] filePathArr = params.get("filePath").toString().split(","); //????????????  
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
				/* ?????? ?????? */
				fileResult = fileService.insertFileInfo(request, params);

				/* ??????????????????????????? ????????????*/
				for(int i=0; i<delYnList.size(); i++) {
					for(int j=0; j<delYnList.get(i).length; j++) {
						if("Y".equals(delYnList.get(i)[j])) {
							params.put("idx", idxList.get(i)[j]);
							params.put("orgIdx", idxList.get(i)[j]);
							params.put("delYn", delYnList.get(i)[j]);
							
							//?????? ??????
							fileList = fileService.selectFileList(params);
							fileList = CamelUtil.convertListMap(fileList);
			
							String filePath = fileList.get(0).get("filePath").toString();
							String stFileNm = fileList.get(0).get("stFileNm").toString();
							File file = new File(filePath + stFileNm); 
							if( file.exists() ){ 
								file.delete();
								System.out.println("????????????");
							}else {
								System.out.println("????????????");
							}
							
							//?????? ??????
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
	 * ??????????????? ??????
	 * 
	 * @param Map<String, Object>
	 * @param InfoVO      - ?????? ???????????? ????????? ?????? VO
	 * @param status
	 * @return int
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/briefDelete.do", method = RequestMethod.POST)
	public void briefDelete(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		List<Map<String, Object>> fileResult = null;
		String json = null;
		int result = 0;
		String briefFlag = String.valueOf(param.get("fileupdateflag"));

		try {
			result = briefService.briefDelete(param);
			if (result > 0 && "Y".equals(briefFlag)) {

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
