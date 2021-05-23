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
package egovframework.admin.notice.dao;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * @Class Name : IndustryMapper.java
 * @Description : Industry Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-02-05 유지완           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Mapper("industryMapper")
public interface IndustryMapper {
	
	/**
	 * 산업 뉴스리스트를 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 noticeVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectIndustryList(Map<String, Object> param) throws Exception;
	
	/**
	 * 산업뉴스 등록한다
	 * @param Map<String, Object>
	 * @return 
	 * @throws Exception
	 */
	int industryRegist(Map<String, Object> param) throws Exception;
	
	/**
	 * 산업뉴스 수정페이지를 조회 한다.
	 * @param Map<String, Object>
	 * @return
	 * @throws Exception
	 * */
	Map<String, Object> selectUpdateIndustry(Map<String, Object> param) throws Exception;
	
	/**
	 * 산업뉴스 수정을 한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int industryUpdate(Map<String, Object> param) throws Exception;
	
	/**
	 * 산업뉴스 를 삭제한다
	 * @param Map<String, Object>
	 * @return 삭제 수
	 * @exception Exception
	 */
	int industryDelete(Map<String, Object> param) throws Exception;
	
}
