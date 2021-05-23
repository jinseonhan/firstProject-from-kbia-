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
package egovframework.user.intro.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.admin.content.dao.OrganMapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.user.intro.dao.IntroMapper;
import egovframework.user.intro.svc.IntroService;

/**
 * @Class Name : LoginServiceImpl.java
 * @Description : Login Controller Class
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2021-01-10 노희원 최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */

@Service("introService")
public class IntroServiceImpl extends EgovAbstractServiceImpl implements IntroService {

	private static final Logger LOGGER = LoggerFactory.getLogger(IntroServiceImpl.class);

	// TODO mybatis 사용
	@Resource(name = "introMapper")
	private IntroMapper introMapper;

	// OrganMapper
	@Resource(name = "organMapper")
	private OrganMapper oMapper;
	
	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;

	/**
	 * 유저수를 조회한다.
	 * 
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 * 
	 * @Override public int selectUserCnt(Map<String, Object> param) throws
	 *           Exception { LOGGER.info("@@ param : " + param);
	 * 
	 *           int result = noticeMapper.selectUserCnt(param);
	 * 
	 *           return result; }
	 */

	/**
	 * 메인배너정보를 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 noticeVO
	 * @return 조회한 배너
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectIntroHistory(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);

		List<Map<String, Object>> result = introMapper.selectIntroHistory(param);

		return result;
	}
	
	/**
	 * 조직도 및 연락처 상단
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 noticeVO
	 * @return 조회한 배너
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectOrganTop(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);

		List<Map<String, Object>> result = introMapper.selectOrganTop(param);

		return result;
	}
	
	/**
	 * 조직도 및 연락처 하단
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 noticeVO
	 * @return 조회한 배너
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectOrganBottom(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);

		List<Map<String, Object>> result = introMapper.selectOrganBottom(param);

		return result;
	}
	
	/*
	 * 조직도 부서코드 조회
	*/
	@Override
	public List<Map<String, Object>> getGroupCode(Map<String, Object> params) {
		List<Map<String, Object>> resultList = null;
		resultList = oMapper.getGroupList();
		return resultList;
	}
	
	/*
	 * 조직도 조회
	*/
	@Override
	public List<Map<String, Object>> getOrganList(Map<String, Object> param) {
		List<Map<String, Object>> resultList = null;
		resultList = oMapper.getOrganList(param);
		return resultList;
	}

	@Override
	public List<Map<String, Object>> getFntExcuList(Map<String, Object> params) throws Exception {
		return introMapper.getFntExcuList(params);
	}

	@Override
	public List<Map<String, Object>> getFntExcuType() throws Exception {
		return introMapper.getFntExcuType();
	}
}
