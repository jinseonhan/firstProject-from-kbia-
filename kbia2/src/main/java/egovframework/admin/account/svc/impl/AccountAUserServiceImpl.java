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
package egovframework.admin.account.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.admin.account.dao.AccountAUserMapper;
import egovframework.admin.account.svc.AccountAUserService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Class Name : LoginServiceImpl.java
 * @Description : Login Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-02-01 한진선           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */


@Service("accountAUserService")
public class AccountAUserServiceImpl extends EgovAbstractServiceImpl implements AccountAUserService{

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountAUserServiceImpl.class);
	
	// TODO mybatis 사용
	@Resource(name="accountAUserMapper")
	private AccountAUserMapper accountAUserMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;	

	/**
	 * 유저수를 조회한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int selectAUserCnt(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		int result = accountAUserMapper.selectAUserCnt(param);
		
		return result;
	}
	/**
	 * 유저정보를 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 accountVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	@Override
	public List<Map<String,Object>> selectAUserList(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		List<Map<String,Object>> result = accountAUserMapper.selectAUserList(param);
		
		return result;
	}
	@Override
	public int userASignUp(Map<String, Object> param) {
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
		int result = accountAUserMapper.userASignUp(param);
		
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
		Map<String, Object> result = accountAUserMapper.selectAdminLoginInfo(param);
		
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
	
	/**
	 * 관리자 유저의 정보를 수정한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int AuserAccountUpdate(Map<String, Object> param) throws Exception {
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
		int result = accountAUserMapper.AuserAccountUpdate(param);
		return result;
	}
	
	/**
	 * 유저계정을 삭제한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int AUsersecession(Map<String, Object> param) throws Exception {
		String pwd = null;
		String rvsPwd = null;
		
		pwd = String.valueOf(param.get("passwd"));		
		StringBuilder sb = new StringBuilder();
		rvsPwd = String.valueOf(sb.append(pwd).reverse());
		
		param.put("passwd", rvsPwd);
		
		LOGGER.info("@@ param : " + param);
		
		int result = accountAUserMapper.AUsersecession(param);
		
		return result;
	}
	
}
