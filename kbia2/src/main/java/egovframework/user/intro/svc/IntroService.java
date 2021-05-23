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
package egovframework.user.intro.svc;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


/**
 * @Class Name : NoticeService.java
 * @Description : NoticeService Class
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
public interface IntroService {

	/**
	 * 아이디를 체크한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	//int selectUserCnt(Map<String, Object> param) throws Exception;
	
	/**
	 * 배너를 조회한다.
	 * @param vo - 조회할 정보가 담긴 SampleVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectIntroHistory(Map<String, Object> param) throws Exception;

	/**
	 * 조직도 및 연락처 상단
	 * @param mapList
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectOrganTop(Map<String, Object> params)  throws Exception;

	/**
	 * 조직도 및 연락처 하단
	 * @param mapList
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String, Object>> selectOrganBottom(Map<String, Object> params) throws Exception;
	
	/*
	 * 조직도 부서코드 조회
	*/
	public List<Map<String, Object>> getGroupCode(Map<String, Object> params);
	
	/*
	 * 조직도 조회
	*/
	public List<Map<String, Object>> getOrganList(Map<String, Object> param);
	
	/* 임원 리스트 조회 */
	List<Map<String, Object>> getFntExcuList(Map<String, Object> params) throws Exception;
	
	/* 임원 타입 불러오기 */
	List<Map<String, Object>> getFntExcuType() throws Exception;
	
}
