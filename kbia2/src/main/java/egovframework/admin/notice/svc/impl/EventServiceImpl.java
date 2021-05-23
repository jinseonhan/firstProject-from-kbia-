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
package egovframework.admin.notice.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.admin.content.dao.MbannerMapper;
import egovframework.admin.content.svc.MbannerService;
import egovframework.admin.notice.dao.EventMapper;
import egovframework.admin.notice.svc.EventService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

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

@Service("EventService")
public class EventServiceImpl extends EgovAbstractServiceImpl implements EventService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EventServiceImpl.class);

	// TODO mybatis 사용
	@Resource(name = "EventMapper")
	private EventMapper eventMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;

	@Override
	public List<Map<String, Object>> selectEventList(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = eventMapper.selectEventList(param);
		return result;
	}

	@Override
	public int EventRegist(Map<String, Object> param) throws Exception {
		int result = eventMapper.EventRegist(param);
		return result;
	}

	@Override
	public List<Map<String, Object>> selectEvent(Map<String, Object> params) throws Exception {
		List<Map<String, Object>> result = eventMapper.selectEvent(params);
		return result;
	}

	@Override
	public int eventUpdate(Map<String, Object> param) throws Exception {
		int result = eventMapper.eventUpdate(param);
		return result;
	}

	@Override
	public int deleteEvent(Map<String, Object> param) throws Exception {
		int result = eventMapper.deleteEvent(param);
		return result;
	}

	
	

	

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
	 *           int result = contentMapper.selectUserCnt(param);
	 * 
	 *           return result; }
	 */

	/**
	 * 메인배너정보를 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 조회한 배너
	 * @exception Exception
	 */
	
}
