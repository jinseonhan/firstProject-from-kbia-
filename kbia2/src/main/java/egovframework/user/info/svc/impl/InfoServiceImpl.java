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
package egovframework.user.info.svc.impl;

import java.util.List;
import java.util.Map;

import egovframework.user.info.dao.InfoMapper;
import egovframework.user.info.svc.InfoService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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

@Service("infoService")
public class InfoServiceImpl extends EgovAbstractServiceImpl implements InfoService {

	private static final Logger LOGGER = LoggerFactory.getLogger(InfoServiceImpl.class);

	// TODO mybatis 사용
	@Resource(name = "infoMapper")
	private InfoMapper infoMapper;

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
	 * 주간브리프 정보를 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 infoVO
	 * @return 조회한 주간브리프
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectBriefList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);

		List<Map<String, Object>> result = infoMapper.selectBriefList(param);

		return result;
	}
	

	@Override
	public List<Map<String, Object>> selectBatteryList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		List<Map<String, Object>> result = infoMapper.selectBatteryList(param);
		
		return result;
	}
	
	@Override
	public List<Map<String, Object>> selectReferenceList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		List<Map<String, Object>> result = infoMapper.selectReferenceList(param);
		
		return result;
	}
	
	@Override
	public List<Map<String, Object>> selectgHireList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		List<Map<String, Object>> result = infoMapper.selectgHireList(param);
		
		return result;
	}
	
	@Override
	public List<Map<String, Object>> selectmHireList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		List<Map<String, Object>> result = infoMapper.selectmHireList(param);
		
		return result;
	}
	
	@Override
	public Map<String, Object> selectBatteryContent(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		Map<String, Object> result = infoMapper.selectBatteryContent(param);
		
		return result;
	}
	
	@Override
	public Map<String, Object> selectBriefContent(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		Map<String, Object> result = infoMapper.selectBriefContent(param);
		
		return result;
	}
	
	@Override
	public Map<String, Object> selectRefContent(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		Map<String, Object> result = infoMapper.selectRefContent(param);
		
		return result;
	}
	
	@Override
	public Map<String, Object> selectHireContent(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		Map<String, Object> result = infoMapper.selectHireContent(param);
		
		return result;
	}
	
	@Override
	public int batteryViewCnt(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		int result = 0;
		result = infoMapper.batteryViewCnt(param);
		
		return result;
	}
	
	@Override
	public int briefViewCnt(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		int result = 0;
		result = infoMapper.briefViewCnt(param);
		
		return result;
	}
	
	@Override
	public int refViewCnt(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		int result = 0;
		result = infoMapper.refViewCnt(param);
		
		return result;
	}
	
	@Override
	public int batteryListCnt(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		int result = 0;
		result = infoMapper.batteryListCnt(param);
		
		return result;
	}
}
