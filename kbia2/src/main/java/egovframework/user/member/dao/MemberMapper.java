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
package egovframework.user.member.dao;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * @Class Name : ContentMapper.java
 * @Description : Content Controller Class
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
@Mapper("memberMapper")
public interface MemberMapper {
	
	
	List<Map<String,Object>> selectFcMemList(Map<String, Object> param) throws Exception;
	
	/**
	 * 공지사항을 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 ContentVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectBcMemList(Map<String, Object> param) throws Exception;
	
	List<Map<String,Object>> selectEcMemList(Map<String, Object> param) throws Exception;
	
	List<Map<String,Object>> selectScMemList(Map<String, Object> param) throws Exception;
	
	Map<String,Object> memInfoContent(Map<String, Object> param) throws Exception;
	
	/*
	 * 메인 회원사 로고 조회
	*/
	public List<Map<String, Object>> selectMainMemberLogo(Map<String, Object> params) throws Exception;
	
	/**
	 * 소배너 조회
	 */
	public List<Map<String, Object>> selectLitBanner(Map<String, Object> param) throws Exception;
}
