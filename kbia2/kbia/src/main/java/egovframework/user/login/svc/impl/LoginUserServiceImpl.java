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
package egovframework.user.login.svc.impl;

import java.util.Map;

import egovframework.user.login.dao.LoginUserMapper;
import egovframework.user.login.svc.LoginUserService;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : LoginUserServiceImpl.java
 * @Description : LoginUser Controller Class
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

@Service("loginUserService")
public class LoginUserServiceImpl extends EgovAbstractServiceImpl implements LoginUserService {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginUserServiceImpl.class);
	
	
	// TODO mybatis 사용
	@Resource(name="loginUserMapper")
	private LoginUserMapper loginUserMapper;

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
	public int selectLoginUserChk(Map<String, Object> param) throws Exception {
		String pwd = null;
		String rvsPwd = null;
		
		pwd = String.valueOf(param.get("passwd"));		
		StringBuilder sb = new StringBuilder();
		rvsPwd = String.valueOf(sb.append(pwd).reverse());
		
		param.put("passwd", rvsPwd);
		
		LOGGER.info("@@ param : " + param);
		
		int result = loginUserMapper.selectLoginUserChk(param);
		
		return result;
	}
	
	/**
	 * 계정을 조회한다
	 * @param Map<String, Object>
	 * @return Map<String, Object>
	 * @exception Exception
	 */
	@Override
	public Map<String, Object> selectLoginInfo(Map<String, Object> param) throws Exception {
		
		LOGGER.info("@@ param : " + param);
		Map<String, Object> result = loginUserMapper.selectLoginInfo(param);
		
		/*
		 * if(result != null) { String encKey =
		 * "WooriCncEncKey";//propertiesService.getString("common.encrypt.key"); 안먹힘;;
		 * StringBuilder sb = new StringBuilder();
		 * 
		 * if( result.get("HOME_TEL") !=null &&
		 * !result.get("HOME_TEL").toString().equals("") ) { sb = new StringBuilder();
		 * String homeTel=
		 * String.valueOf(sb.append(result.get("HOME_TEL").toString()).reverse());
		 * homeTel = CryptoUtil.decryptAES256(homeTel, encKey); result.put("HOME_TEL",
		 * homeTel); } if(result.get("WORK_TEL") !=null &&
		 * !result.get("WORK_TEL").toString().equals("")) { sb = new StringBuilder();
		 * String workTel=
		 * String.valueOf(sb.append(result.get("WORK_TEL").toString()).reverse());
		 * workTel = CryptoUtil.decryptAES256(workTel, encKey); result.put("WORK_TEL",
		 * workTel); } if(result.get("PER_TEL") !=null &&
		 * !result.get("PER_TEL").toString().equals("") ) { sb = new StringBuilder();
		 * String perTel=
		 * String.valueOf(sb.append(result.get("PER_TEL").toString()).reverse()); perTel
		 * = CryptoUtil.decryptAES256(perTel, encKey); result.put("PER_TEL", perTel); }
		 * }
		 */
		
		return result;
	}
	
	
}
