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
package egovframework.user.main.ctr;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
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

import egovframework.admin.content.svc.MbannerService;
import egovframework.admin.content.svc.PupService;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.account.svc.AccountUserService;
import egovframework.user.login.svc.impl.LoginUserServiceImpl;
import egovframework.user.main.svc.MainUserService;


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
public class MainController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginUserServiceImpl.class);
	
	/** EgovTestService */
	@Resource(name = "mainUserService")
	private MainUserService mainUserService;

	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/** EgovTestService */
	@Resource(name = "PupService")
	private PupService pupService;
	
	/** FileService */
	@Resource(name = "fileService")
	private FileService fileService;
	
	/** 메인배너(어드민) */
	@Resource(name = "MbannerService")
	private MbannerService mbannerService;
	
	/**
	 * 메인화면
	 * @return 메인화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/main.do")
	public String openMain(ModelMap model, Map<String, Object> param) throws Exception {		
		return "/view/user/main";
	}
	
	/**
	 * 팝업창
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/mainPopup.do")
	public String openMainPopup(HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {		
		model.addAttribute("params", params);
		
		return "/view/user/popup";
	}
	
	/**
	 * ip marge
	 * @param Map<String, Object> 
	 * @param logVO - 목록 조회조건 정보가 담긴 VO
	 * @param status
	 * @return 
	 * @exception Exception
	 */
	@RequestMapping(value ="/user/logMarge.do", method = RequestMethod.POST)
	public void margeIpLog(HttpServletResponse res, HttpServletRequest request, ModelMap model, @RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			String referer = params.get("referer").toString();
	        String host = request.getHeader("host").toString();
	        String ip = request.getRemoteHost().toString();
	        params.put("ip", ip);
	        params.put("logZsgr", referer);
	        int logCount = 0; 
			
			int margeCnt = 0;
        	if(referer.indexOf(host) < 0 ) {	
        		
				logCount = mainUserService.selectLogCnt(params);
				if(logCount != 1) {
					margeCnt= mainUserService.insertLog(params);			
				}else if(logCount == 1) {
					margeCnt= mainUserService.updateLog(params);			
				}
        	}
        	json = mapper.writeValueAsString(margeCnt);
		} catch (Exception e) {
				e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value = "/user/pupList.do", method = RequestMethod.POST)
	public void selectPupList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		String filePath = null;

		List<Map<String, Object>> pupList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			pupList = pupService.selectPupList(params);
			pupList = CamelUtil.convertListMap(pupList);
			//파일 정보 추가
			if(!pupList.isEmpty()) {
				if(pupList.size() > 0) {
					for(int i=0; i<pupList.size(); i++) {
						//이미지타입일 경우
						if("IMG".equals(pupList.get(i).get("division"))) {
							Map<String, Object> newParams = new HashMap<String, Object>();
							newParams.put("refIdx", pupList.get(i).get("boardNo"));
							newParams.put("refType", "POPUP");
							fileList = fileService.selectFileList(newParams);
							fileList = CamelUtil.convertListMap(fileList);
							if(!fileList.isEmpty()) {
								if(fileList.size() > 0) {
									pupList.get(i).put("delYn", fileList.get(0).get("delYn"));
									pupList.get(i).put("filePath", fileList.get(0).get("filePath"));
									filePath = propertiesService.getString("file.upload.path");
									String newPath = fileList.get(0).get("filePath").toString().replace(filePath, "");
									newPath = "/"+newPath.replace("\\", "/");
									pupList.get(i).put("newPath", newPath);
									pupList.get(i).put("idx", fileList.get(0).get("idx"));
									pupList.get(i).put("ognFileNm", fileList.get(0).get("ognFileNm"));
									pupList.get(i).put("refIdx", fileList.get(0).get("refIdx"));
									pupList.get(i).put("refType", fileList.get(0).get("refType"));
									pupList.get(i).put("stFileNm", fileList.get(0).get("stFileNm"));
									long[] size = getImageInfoByFilePath(fileList.get(0).get("filePath").toString()+fileList.get(0).get("stFileNm").toString());
									if(size != null) {
										pupList.get(i).put("width", size[0]);
										pupList.get(i).put("height", size[1]);
									}
								}
							}
						}
					}
				}
			}
			json = mapper.writeValueAsString(pupList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		//LOGGER.info("pupList >>>" + pupList);

		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value = "/selectPopup.do", method = RequestMethod.POST)
	public void selectPopContent(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		Map<String, Object> selectPopContent = new HashMap<String, Object>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectPopContent = pupService.selectPopup(params).get(0);
			selectPopContent = CamelUtil.convertMap(selectPopContent);
			json = mapper.writeValueAsString(selectPopContent);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("pupList >>>" + selectPopContent);

		out.print(json);
		out.flush();
		out.close();
	}
	
	// image info (imgage width, image height, image file size)
	private long[] getImageInfoByFilePath(String filePath){
		try{
		File imageFile = new File(filePath);
		   long imageInfo[] = null;
		   if(imageFile.exists()){
		    BufferedImage bi = ImageIO.read(new File(filePath));
		    imageInfo = new long[3];
		    imageInfo[0] = bi.getWidth();
		    imageInfo[1] = bi.getHeight();
		    imageInfo[2] = imageFile.length();
		}
		   
		if(imageInfo == null) return null;   
		return imageInfo;
		
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@RequestMapping(value = "/user/bannerList.do", method = RequestMethod.POST)
	public void selectBannerList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		String filePath = null;
		List<Map<String, Object>> mbannerList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			mbannerList = mbannerService.selectMabnnerList(params);
			mbannerList = CamelUtil.convertListMap(mbannerList);
			//파일 정보 추가
			if(!mbannerList.isEmpty()) {
				if(mbannerList.size() > 0) {
					for(int i=0; i<mbannerList.size(); i++) {
						//이미지타입일 경우
						Map<String, Object> newParams = new HashMap<String, Object>();
						newParams.put("refIdx", mbannerList.get(i).get("boardNo"));
						newParams.put("refType", "MAIN");
						fileList = fileService.selectFileList(newParams);
						fileList = CamelUtil.convertListMap(fileList);
						if(!fileList.isEmpty()) {
							if(fileList.size() > 0) {
								mbannerList.get(i).put("delYn", fileList.get(0).get("delYn"));
								mbannerList.get(i).put("filePath", fileList.get(0).get("filePath"));
								filePath = propertiesService.getString("file.upload.path");
								String newPath = fileList.get(0).get("filePath").toString().replace(filePath, "");
								newPath = "/"+newPath.replace("\\", "/");
								mbannerList.get(i).put("newPath", newPath);
								mbannerList.get(i).put("idx", fileList.get(0).get("idx"));
								mbannerList.get(i).put("ognFileNm", fileList.get(0).get("ognFileNm"));
								mbannerList.get(i).put("refIdx", fileList.get(0).get("refIdx"));
								mbannerList.get(i).put("refType", fileList.get(0).get("refType"));
								mbannerList.get(i).put("stFileNm", fileList.get(0).get("stFileNm"));
							}
						}
					}
				}
			}
			json = mapper.writeValueAsString(mbannerList);

		} catch (Exception e) {
			e.printStackTrace();
		}
		//LOGGER.info("mbannerList >>>" + mbannerList);

		out.print(json);
		out.flush();
		out.close();
	}
	
	/*
	 *  메인 회원사 조회
	 */
	@RequestMapping(value = "/user/getMainMembers.do")
	public void getMainMembers( HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params ) throws Exception {
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			List<Map<String, Object>> resultList = mainUserService.selectAllMemberLogo(params);
			resultList = CamelUtil.convertListMap(resultList);
			json = mapper.writeValueAsString(resultList);
		} catch( Exception e ) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/*
	 * 메인에서 소배너를 조회
	 * */
	@RequestMapping(value = "/user/getLitBanners.do")
	public void getLitBanners(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#CALL /user/getLitBanners.do");
		LOGGER.info("#params : "+params);
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			List<Map<String, Object>> resultList = mainUserService.selectLitBanner(params);
			resultList = CamelUtil.convertListMap(resultList);
			json = mapper.writeValueAsString(resultList);
		} catch( Exception e ) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
		
	}
	
	/*
	 * 언어타입 설정
	*/
	@RequestMapping(value = "/user/setLangType.do")
	public void setLangType(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call setLangType.do");
		LOGGER.info("params : " + params);
		
		request.getSession().setAttribute("langType", params.get("langType"));
		PrintWriter out = null;
		String json = null;
		int result = 1;
		response.setContentType("text/html; charset=utf-8");
		out = response.getWriter();
		ObjectMapper mapper = new ObjectMapper();
		json = mapper.writeValueAsString(result);
		out.write(json);
		out.flush();
		out.close();
	}
}

