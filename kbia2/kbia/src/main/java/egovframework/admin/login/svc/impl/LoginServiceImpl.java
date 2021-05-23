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
package egovframework.admin.login.svc.impl;

import java.util.List;
import java.util.Map;

import egovframework.admin.login.dao.LoginMapper;
import egovframework.admin.login.svc.LoginService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : LoginServiceImpl.java
 * @Description : Login Controller Class
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

@Service("loginService")
public class LoginServiceImpl extends EgovAbstractServiceImpl implements LoginService {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginServiceImpl.class);
	
	// TODO mybatis 사용
	@Resource(name="loginMapper")
	private LoginMapper loginMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;

	/**
	 * 아이디를 체크한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int selectLoginChk(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		String pwd = null;
		String rvsPwd = null;
		
		pwd = String.valueOf(param.get("passwd"));		
		StringBuilder sb = new StringBuilder();
		rvsPwd = String.valueOf(sb.append(pwd).reverse());
		
		LOGGER.info("@@ rvsPwd : " + rvsPwd);
		
		param.put("passwd", rvsPwd);
		
		int result = loginMapper.selectLoginChk(param);
		
		return result;
	}
	
	/**
	 * 계정을 조회한다
	 * @param Map<String, Object>
	 * @return Map<String, Object>
	 * @exception Exception
	 */
	@Override
	public Map<String, Object> selectAdminLoginInfo(Map<String, Object> param) throws Exception {
		
		LOGGER.info("@@ param : " + param);
		Map<String, Object> result = loginMapper.selectAdminLoginInfo(param);	
		
		return result;
	}
	
}
