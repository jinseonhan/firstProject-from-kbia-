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
package egovframework.cmmn.file.svc.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import egovframework.cmmn.file.dao.FileMapper;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.file.vo.FileVO;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * @Class Name : BatteryServiceImpl.java
 * @Description : Battery Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-11 유지완           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */


@Service("fileService")
public class FileServiceImpl extends EgovAbstractServiceImpl implements FileService {

	private static final Logger LOGGER = LoggerFactory.getLogger(FileServiceImpl.class);
	
	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertyService;	
	
	/* 파일 업/다운로드 서비스 */	
	@Resource(name="fileMapper")
	private FileMapper fileMapper;

	/* ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;	
	
	/**
	 * File을 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 BatteryVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	@Override
	public List<Map<String,Object>> selectFileList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);		
		FileVO fileVo = new FileVO();
		String refIdx = null;
		String refType = null;
		String orgIdx = null;
		String subFilePath = null;
		
		refIdx = String.valueOf(param.get("refIdx"));
		refType = String.valueOf(param.get("refType"));
	    fileVo.setRefIdx(refIdx);
		fileVo.setRefType(refType);
		
		if(param.get("idx") != null ) {
			orgIdx = String.valueOf(param.get("idx"));
			fileVo.setOrgIdx(orgIdx);
		}
		if(param.get("subFilePath") != null ) {
			subFilePath = String.valueOf(param.get("subFilePath"));
			fileVo.setSubFilePath(subFilePath);
		}
		
		List<Map<String,Object>> result = fileMapper.selectFileList(fileVo);
		
		return result;
	}
	/**
	 * The Battery를 등록한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 InfoVO
	 * @return 등록
	 * @exception Exception
	 */
	 @Override
	 public List<Map<String,Object>> insertFileInfo(MultipartHttpServletRequest request, Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		LOGGER.info("@@ requestMap : {}", request.getFileMap().keySet().toArray());
				
		List<String> keyList = null;
		List<Map<String,Object>> result = new ArrayList<>();
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int dbResult = 0;
		String refIdx = null;
		String refType = null;
		String rgtId = null;
		FileVO fileVo = new FileVO();
		MultipartFile upFile = null;
		String ognFileNm = null;
		String stFileNm = null;
		String fileSize = null;
		String filePath = null;
		Calendar cal = null;
		Date date = null;
		SimpleDateFormat sdf = null;
		String getTime = null;
		int rn = 0;
		String ext = null;
		File dir = null;
		File fileAuth = null;
		FileOutputStream fos = null;
		InputStream is = null;	
		int readCount = 0;
		
		refIdx = String.valueOf(param.get("refIdx"));
		refType = String.valueOf(param.get("boardType"));
		//rgtId = String.valueOf(param.get("rgtId"));
		rgtId = String.valueOf("admin");
		
		/* 넘어온 파일정보를 Map -> List 변환 */
		keyList = request.getFileMap().keySet().stream().collect(Collectors.toCollection(ArrayList::new));
		LOGGER.info("@@ keyList : {}", keyList);
		
		/* 파일 List 처리 */
		for(String key : keyList) {			
			upFile = request.getFile(key);
			
			/* 파일의 원명칭 */
			ognFileNm = upFile.getOriginalFilename();
			
			/* 파일 크기 */
			fileSize = String.valueOf(upFile.getSize());
			
			try {
				/* 파일저장경로 생성 */
				key= key.replaceAll("[0-9]", ""); // ive n outh orea.
				filePath = propertyService.getString("file.upload.path") + key + propertyService.getString("file.path.div");
				LOGGER.debug("@@ filePath : {}", filePath);			
				
				/* 파일 확장자 추출 */
				ext = ognFileNm.substring(ognFileNm.lastIndexOf(".") + 1);
				
				/* 파일 저장용 이름 생성 (파일명 : 파일저장시점의 연월일시분초 + 4자리 난수) */
				/* 파일 저장 시 이름이 중복되는걸 최대한 방지하기 위함. */
				/* 파일저장시점의 연, 월, 일, 시, 분, 초 추출 */
				cal = Calendar.getInstance();
				date = cal.getTime();
				sdf = new SimpleDateFormat("yyyyMMddHHmmss");
				getTime = sdf.format(date);
				
				/* 파일명 중복 방지를 위한 4자리 난수 추출 */
				rn = (int)(Math.random() * 10000);
				
				/* 파일 저장 경로 체크 */
				dir = new File(filePath);		
				
				/* 경로가 존재하지 않는 경우 경로 생성 */
				if(!dir.exists()) {
					dir.setReadable(true, false);
					dir.setWritable(true, false);
					dir.setExecutable(true, false);
					dir.mkdirs();
				}
				
				/* 생성한 파일명 저장 */
				stFileNm = getTime + rn + "." + ext;
				
				/* 파일생성준비 */
				fos = new FileOutputStream(filePath + stFileNm);
				is = upFile.getInputStream();
				
				/* 읽어들인 파일정보를 지정한 경로에 저장 */
			    byte[] buffer = new byte[1024];
			    while((readCount = is.read(buffer)) != -1) {			    	
			    	fos.write(buffer, 0, readCount);			    	
			    }
			    
			    /* 저장한 파일의 권한 변경 */
			    fileAuth = new File(filePath + stFileNm);
			    fileAuth.setReadable(true, false);
			    fileAuth.setWritable(true, false);
			    fileAuth.setExecutable(true, false);
			    
			    /* 저장한 파일 정보를 VO에 Set */
			    fileVo.setRefIdx(refIdx);
				fileVo.setRefType(refType);
				fileVo.setFilePath(filePath);
				fileVo.setOgnFileNm(ognFileNm);
				fileVo.setStFileNm(stFileNm);
				fileVo.setFileSize(fileSize);
				fileVo.setRgtId(rgtId);
				
				/* 생성한 파일정보를 DB에 저장 */
				dbResult = fileMapper.insertFileInfo(fileVo);
				
				/* 결과를 컨트롤러로 반환 */
				resultMap.put("dbResult", dbResult);
				resultMap.put("refIdx", refIdx);
				resultMap.put("refType", refType);
				resultMap.put("filePath", filePath);
				resultMap.put("ognFileNm", ognFileNm);
				resultMap.put("stFileNm", stFileNm);
				resultMap.put("fileSize", fileSize);
				resultMap.put("rgtId", rgtId);
				
				result.add(resultMap);
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException("File Save Error");
			} finally {
				/* 사용한 자원 반환 */
				if(is != null) {
					try {
						is.close();
					} catch (IOException ioe) {
						LOGGER.info("FileOutStream Close Error");
					}					
				}				
				if(fos != null) {
					try {
						fos.close();
					} catch (IOException ioe) {
						LOGGER.info("FileOutStream Close Error");
					}					
				}				
			}			
		}		
		
		return result;
	 }
	 /**
	 * 파일을 다운로드 한다
	 * @param Map<String,Object>
	 * @return 등록
	 * @exception Exception
	 */
	 @Override
	 public void filDown(HttpServletRequest request,
				HttpServletResponse response, Map<String, Object> param) throws IOException {
			String filePath = param.get("filePath").toString(); 
			String realFilNm = param.get("stFileNm").toString();
			String viewFileNm = param.get("ognFileNm").toString();
			File file = new File( filePath + realFilNm);
			System.out.println("root = " + filePath + realFilNm);
			if (file.exists() && file.isFile()) {
				response.setContentType("application/octet-stream; charset=utf-8");
				response.setContentLength((int) file.length());
				String browser = getBrowser(request);
				String disposition = getDisposition(viewFileNm, browser);
				response.setHeader("Content-Disposition", disposition);
				response.setHeader("Content-Transfer-Encoding", "binary");
				OutputStream out = response.getOutputStream();
				FileInputStream fis = null;
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, out);
				if (fis != null)
					fis.close();
				out.flush();
				out.close();
			}
		}

	private String getBrowser(HttpServletRequest request) {
		String header = request.getHeader("User-Agent");
		if (header.indexOf("MSIE") > -1 || header.indexOf("Trident") > -1)
			return "MSIE";
		else if (header.indexOf("Chrome") > -1)
			return "Chrome";
		else if (header.indexOf("Opera") > -1)
			return "Opera";
		return "Firefox";
	}

	private String getDisposition(String filename, String browser)
			throws UnsupportedEncodingException {
		String dispositionPrefix = "attachment;filename=";
		String encodedFilename = null;
		if (browser.equals("MSIE")) {
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll(
					"\\+", "%20");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\""
					+ new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\""
					+ new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		}
		return dispositionPrefix + encodedFilename;
	}
	
	/**
	 * 파일삭제
	 * @param Map<String,Object>
	 * @return 등록
	 * @exception Exception
	 */
	@Override
	public int filedel(Map<String, Object> param) throws IOException {
		int result = 0;
		try {
			//파일 조회
			List<Map<String, Object>> fileList = selectFileList(param);
			fileList = CamelUtil.convertListMap(fileList);
			for(int i=0; i<fileList.size(); i++) {
				String filePath = fileList.get(i).get("filePath").toString();
				String stFileNm = fileList.get(i).get("stFileNm").toString();
				File file = new File(filePath + stFileNm); 
				if( file.exists() ){ 
					file.delete();
				}
			}
			result = fileMapper.filedel(param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 파일상태변경(N)
	 * @param Map<String,Object>
	 * @return 등록
	 * @exception Exception
	 */
	@Override
	public int fileStatUpdate(Map<String, Object> param) throws IOException {
		int result = 0;
		try {
			result = fileMapper.fileStatUpdate(param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

}
