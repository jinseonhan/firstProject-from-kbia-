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
package egovframework.admin.info.dao;

import java.util.List;
import java.util.Map;

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
@Mapper("referenceMapper")
public interface ReferenceMapper {
	
	/**
	 * 기술자료실 리스트를 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 ReferenceVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectReferenceList(Map<String, Object> param) throws Exception;
	
	/**
	 * 주간브리프 수정페이지를 조회 한다.
	 * @param Map<String, Object>
	 * @return
	 * @throws Exception
	 * */
	Map<String, Object> selectUpdateReference(Map<String, Object> param) throws Exception;
	
	
	/**
	 * 기술자료실 등록한다
	 * @param Map<String, Object>
	 * @return 
	 * @throws Exception
	 */
	int referenceRegist(Map<String, Object>params) throws Exception;
	
	/**
	 * 기술 자료실 수정을 한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int referenceUpdate(Map<String, Object> param) throws Exception;
	
	/**
	 * 기술 자료실을 삭제한다
	 * @param Map<String, Object>
	 * @return 삭제 수
	 * @exception Exception
	 */
	int referenceDelete(Map<String, Object> param) throws Exception;
}
