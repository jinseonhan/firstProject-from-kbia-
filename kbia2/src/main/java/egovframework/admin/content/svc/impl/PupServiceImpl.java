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
package egovframework.admin.content.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.admin.content.dao.PupMapper;
import egovframework.admin.content.svc.PupService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Class Name : LoginServiceImpl.java
 * @Description : Login Controller Class
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2021-01-10 지승배 최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */

@Service("PupService")
public class PupServiceImpl extends EgovAbstractServiceImpl implements PupService {

	private static final Logger LOGGER = LoggerFactory.getLogger(PupServiceImpl.class);

	// TODO mybatis 사용
	@Resource(name = "PupMapper")
	private PupMapper pupMapper;

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
	 *           int result = contentMapper.selectUserCnt(param);
	 * 
	 *           return result; }
	 */

	/**
	 * 유저정보를 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectPupList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);

		List<Map<String, Object>> result = pupMapper.selectPupList(param);

		return result;
	}

	@Override
	public int popupRegist(Map<String, Object> param) throws Exception {

		int result = pupMapper.popupRegist(param);
		return result;
	}

	@Override
	public int popMax(Map<String, Object> param) throws Exception {

		int max = pupMapper.popMax(param);

		return max;
	}

	@Override
	public List<Map<String, Object>> selectPopup(Map<String, Object> params) throws Exception {
		List<Map<String, Object>> result = pupMapper.selectPopup(params);
		return result;
	}

	@Override
	public int popupUpdate(Map<String, Object> param) throws Exception {
		int result = pupMapper.popupUpdate(param);
		return result;
	}

	@Override
	public int popupDelete(Map<String, Object> param) throws Exception {

		int result = pupMapper.popupDelete(param);
		return result;
	}
}
