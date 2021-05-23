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
package egovframework.user.account.svc.impl;

import java.util.Map;

import egovframework.user.account.dao.AccountUserMapper;
import egovframework.user.account.svc.AccountUserService;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : AccountServiceImpl.java
 * @Description : Account Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-11 지승배           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */


@Service("accountUserService")
public class AccountUserServiceImpl extends EgovAbstractServiceImpl implements AccountUserService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountUserServiceImpl.class);
	
	// TODO mybatis 사용
	@Resource(name="accountUserMapper")
	private AccountUserMapper accountUserMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;	

	/**
	 * 유저테이블의 email 수를 조회한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int emailCntChk(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		int result = accountUserMapper.accountCntChk(param);
		
		return result;
	}
	
	/**
	 * 유저테이블의 id 수를 조회한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int idCntChk(Map<String, Object> param) throws Exception {
		String pwd = null;
		String rvsPwd = null;
		
		pwd = String.valueOf(param.get("passwd"));		
		StringBuilder sb = new StringBuilder();
		rvsPwd = String.valueOf(sb.append(pwd).reverse());
		
		param.put("passwd", rvsPwd);
		
		LOGGER.info("@@ param : " + param);
		
		int result = accountUserMapper.accountCntChk(param);
		
		return result;
	}
	
	/**
	 * 유저 회원가입을 한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int userSignUp(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		String pwd = null;
		String rvsPwd = null;
		pwd = String.valueOf(param.get("passwd"));		
		StringBuilder sb = new StringBuilder();
		rvsPwd = String.valueOf(sb.append(pwd).reverse());
		param.put("passwd", rvsPwd);
		
		String encKey = "WooriCncEncKey";//propertiesService.getString("common.encrypt.key"); 안먹힘;;
		/*if(!param.get("homeTel").toString().equals("") && param.get("homeTel").toString() !=null) {
			String homeTel= CryptoUtil.encryptAES256(param.get("homeTel").toString(), encKey);
			sb = new StringBuilder();
			param.put("homeTel", String.valueOf(sb.append(homeTel).reverse()));
		}
		if(!param.get("workTel").toString().equals("") && param.get("workTel").toString() !=null) {
			String workTel= CryptoUtil.encryptAES256(param.get("workTel").toString(), encKey);
			sb = new StringBuilder();
			param.put("workTel", String.valueOf(sb.append(workTel).reverse()));
		}
		if(!param.get("perTel").toString().equals("") && param.get("perTel").toString() !=null) {
			String perTel= CryptoUtil.encryptAES256(param.get("perTel").toString(), encKey);
			sb = new StringBuilder();
			param.put("perTel", String.valueOf(sb.append(perTel).reverse()));
		}
		*/
		int result = accountUserMapper.userSignUp(param);
		return result;
	}
	
	/**
	 * 유저 회원수정을 한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int userAccountUpdate(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		StringBuilder sb = new StringBuilder();
		if(param.get("passwd")!=null||param.get("passwd")!="") {
			String pwd = null;
			String rvsPwd = null;
			pwd = String.valueOf(param.get("passwd"));		
			rvsPwd = String.valueOf(sb.append(pwd).reverse());
			param.put("passwd", rvsPwd);
		}
		String encKey = "WooriCncEncKey";//propertiesService.getString("common.encrypt.key"); 안먹힘;;
		
		/*if( param.get("homeTel") !=null) {
			String homeTel= CryptoUtil.encryptAES256(param.get("homeTel").toString(), encKey);
			sb = new StringBuilder();
			param.put("homeTel", String.valueOf(sb.append(homeTel).reverse()));
		}
		if( param.get("workTel") !=null) {
			String workTel= CryptoUtil.encryptAES256(param.get("workTel").toString(), encKey);
			sb = new StringBuilder();
			param.put("workTel", String.valueOf(sb.append(workTel).reverse()));
		}
		if( param.get("perTel") !=null) {
			String perTel= CryptoUtil.encryptAES256(param.get("perTel").toString(), encKey);
			sb = new StringBuilder();
			param.put("perTel", String.valueOf(sb.append(perTel).reverse()));
		}
		*/
		int result = accountUserMapper.userAccountUpdate(param);
		return result;
	}
	
	/**
	 * 유저계정을 삭제한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int secession(Map<String, Object> param) throws Exception {
		String pwd = null;
		String rvsPwd = null;
		
		pwd = String.valueOf(param.get("passwd"));		
		StringBuilder sb = new StringBuilder();
		rvsPwd = String.valueOf(sb.append(pwd).reverse());
		
		param.put("passwd", rvsPwd);
		
		LOGGER.info("@@ param : " + param);
		
		int result = accountUserMapper.secession(param);
		
		return result;
	}
}
