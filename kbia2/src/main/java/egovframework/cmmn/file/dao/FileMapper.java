/*
 * Copyright 2011 MOPAS(Ministry of Public Administration and Security).
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
package egovframework.cmmn.file.dao;

import java.util.List;
import java.util.Map;

import egovframework.cmmn.file.vo.FileVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * @Class Name : ReferenceMapper.java
 * @Description : Reference Controller Class
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
@Mapper("fileMapper")
public interface FileMapper {	
	/**
	 * 파일 리스트를 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 InfoVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectFileList(FileVO fileVo) throws Exception;
	
	/**
	 * 파일등록
	 * @param Map<String, Object>
	 * @return 
	 * @throws Exception
	 */
	int insertFileInfo(FileVO fileVo) throws Exception;

	/**
	 * 파일삭제
	 * @param Map<String, Object>
	 * @return 
	 * @throws Exception
	 */
	int filedel(Map<String, Object> param) throws Exception;
	
	/**
	 * 파일상태변경(N)
	 * @param Map<String, Object>
	 * @return 
	 * @throws Exception
	 */
	int fileStatUpdate(Map<String, Object> param) throws Exception;
}
