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

import egovframework.admin.notice.dao.SeemMapper;
import egovframework.admin.notice.svc.SeemService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : SeemServiceImpl.java
 * @Description : Seem Controller Class
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


@Service("seemService")
public class SeemServiceImpl extends EgovAbstractServiceImpl implements SeemService {

	private static final Logger LOGGER = LoggerFactory.getLogger(SeemServiceImpl.class);
	
	// TODO mybatis 사용
	@Resource(name="seemMapper")
	private SeemMapper seemMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;	
	
	/**
	 * 회원사 동정를 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 NoticeVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	@Override
	public List<Map<String,Object>> selectSeemList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		List<Map<String,Object>> result = seemMapper.selectSeemList(param);
		return result;
	}
	
	/**
	 * 회원사 동정 등록한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 NoticeVO
	 * @return 등록
	 * @exception Exception
	 */
	 @Override
	 public int seemRegist(Map<String, Object> param) throws Exception {		 
		 LOGGER.info("@@param : " + param);
		 int result = 0;
		 result = seemMapper.seemRegist(param);
		 return result;
	 }
	 
	 /**
	  * 회원사 동정 수정 페이지를 조회한다.
	  * @param Map<String,Object> - 조회할 정보가 담긴 NoticeVO
	  * @return 조회한 글
	  * @exception Exception
	  */
		
	@Override
	public Map<String, Object> selectUpdateSeem(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		Map<String, Object> result = seemMapper.selectUpdateSeem(param);
		return result;
	}
		
	/**
	 * 회원사 동정 수정한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 NoticeVO
	 * @return 등록
	 * @exception Exception
	 */
	@Override
	public int seemUpdate(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		int result = 0;
		result = seemMapper.seemUpdate(param);
		return result;
	}
	/**
	 * 회원사 동정 삭제한다.
	 * @param Map<String, Object>
	 * @return 
	 * @exception Exception
	 */
	@Override
	public int seemDelete(Map<String, Object> param) throws Exception {	
		LOGGER.info("@@ param : " + param);
		int result = 0;
		result = seemMapper.seemDelete(param);
		return result;
	}
}
