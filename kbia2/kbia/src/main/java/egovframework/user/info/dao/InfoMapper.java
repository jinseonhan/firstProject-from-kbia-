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
package egovframework.user.info.dao;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * @Class Name : InfoMapper.java
 * @Description : Info Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-10 노희원           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Mapper("infoMapper")
public interface InfoMapper {
	/**
	 * 유저 수를 조회한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	//int selectUserCnt(Map<String, Object> param) throws Exception;
	List<Map<String,Object>> selectBriefList(Map<String, Object> param) throws Exception;
	
	List<Map<String,Object>> selectBatteryList(Map<String, Object> param) throws Exception;
	/**
	 * 배너리스트를 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 ContentVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectReferenceList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> selectgHireList(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> selectmHireList(Map<String, Object> param) throws Exception;
	
	Map<String, Object> selectBriefContent(Map<String, Object> param) throws Exception;
	
	Map<String, Object> selectRefContent(Map<String, Object> param) throws Exception;
	
	Map<String, Object> selectHireContent(Map<String, Object> param) throws Exception;
	
	int briefViewCnt(Map<String, Object> param) throws Exception;
	
	int refViewCnt(Map<String, Object> param) throws Exception;

	int batteryViewCnt(Map<String, Object> param) throws Exception;

	Map<String, Object> selectBatteryContent(Map<String, Object> param) throws Exception;
	/**
	 * 배터리리스트 카운트
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 ContentVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	int batteryListCnt(Map<String, Object> param) throws Exception;
	
}
