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
package egovframework.cmmn.file.svc;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartHttpServletRequest;


/**
 * @Class Name : ReferenceService.java
 * @Description : ReferenceService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-12 유지완           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-12
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface FileService {

	/**
	 * 파일목록을 조회한다.
	 * @param param - 조회할 정보가 담긴 Map
	 * @return 파일정보목록
	 * @exception Exception
	 */
	List<Map<String,Object>> selectFileList(Map<String, Object> param) throws Exception;
	
	/**
	 * 첨부파일들을 등록한다.
	 * @param request, param
	 * @return List<Map<String,Object>>
	 * @throws Exception
	 */	
	List<Map<String,Object>> insertFileInfo(MultipartHttpServletRequest request, Map<String, Object> param) throws Exception;
	
	/**
	 * 첨부파일들을 다운로드한다.
	 * @param request, param
	 * @return Map<String,Object>
	 * @throws Exception
	 */	
	void filDown(HttpServletRequest request,
				HttpServletResponse response, Map<String, Object> paramm) throws IOException;
	
	/**
	 * 파일 삭제
	 * @param request, param
	 * @return Map<String,Object>
	 * @throws Exception
	 */	
	int filedel(Map<String, Object> param) throws IOException;
		
	/**
	 * 파일 상태변경 (N)
	 * @param request, param
	 * @return Map<String,Object>
	 * @throws Exception
	 */	
	int fileStatUpdate(Map<String, Object> param) throws IOException;
			 
}


