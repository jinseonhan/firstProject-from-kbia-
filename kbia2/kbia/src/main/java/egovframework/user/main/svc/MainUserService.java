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
package egovframework.user.main.svc;

import java.util.List;
import java.util.Map;

import egovframework.user.account.vo.AccountUserVO;


/**
 * @Class Name : LogUserService.java
 * @Description : LogUserService Class
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
public interface MainUserService {

	/**
	 * 로그수 체크
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int selectLogCnt(Map<String, Object> param) throws Exception;

	/**
	 * 로그수 체크
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int insertLog(Map<String, Object> param) throws Exception;
	
	/**
	 * 로그수 체크
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int updateLog(Map<String, Object> param) throws Exception;

	/**
	 * 로그 조회
	 * @param Map<String, Object>
	 * @return 로그 조회
	 * @exception Exception
	 */
	List<Map<String, Object>> selectAllStatslist(Map<String, Object> params) throws Exception;

	/**
	 * 로그 카운트 조회
	 * @param Map<String, Object>
	 * @return  로그 카운트 조회
	 * @exception Exception
	 */
	Map<String, Object> selectAllStatsCnt(Map<String, Object> params) throws Exception;

	/**
	 * 월로그 조회
	 * @param Map<String, Object>
	 * @return 월로그 조회
	 * @exception Exception
	 */
	List<Map<String, Object>> selectMonthStatslist(Map<String, Object> params) throws Exception;

	/**
	 * 일로그 조회
	 * @param Map<String, Object>
	 * @return 일로그 조회
	 * @exception Exception
	 */
	List<Map<String, Object>> selectDayStatslist(Map<String, Object> params) throws Exception;

	
}
