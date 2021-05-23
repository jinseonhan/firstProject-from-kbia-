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
package egovframework.user.notice.svc;

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
public interface NoticeService {

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
	List<Map<String,Object>> selectNoticeList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> selectIndustryList(Map<String, Object> param) throws Exception;
	
	List<Map<String,Object>> memNewsList(Map<String, Object> param) throws Exception;

	
	List<Map<String, Object>> selectEventList(Map<String, Object> param) throws Exception;

	/**
	 * 공지사항 세부를 조회한다.
	 * @param vo - 조회할 정보가 담긴 SampleVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	Map<String, Object> selectNoticeContent(Map<String, Object> param) throws Exception;
	
	Map<String, Object> memNewsContent(Map<String, Object> param) throws Exception;
	
	/**
	 * 산업뉴스세부를 조회한다.
	 * @param vo - 조회할 정보가 담긴 SampleVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	Map<String, Object> selectIndustryContent(Map<String, Object> param) throws Exception;
	
	int updateViewCnt(Map<String, Object> param) throws Exception;
	
	int newsViewCnt(Map<String, Object> param) throws Exception;
}
