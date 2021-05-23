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
package egovframework.user.main.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.user.main.dao.MainUserMapper;
import egovframework.user.main.svc.MainUserService;
import egovframework.user.member.dao.MemberMapper;

/**
 * @Class Name : LogUserServiceImpl.java
 * @Description : LogUser Controller Class
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

@Service("mainUserService")
public class MainUserServiceImpl extends EgovAbstractServiceImpl implements MainUserService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MainUserServiceImpl.class);
	
	
	// TODO mybatis 사용
	@Resource(name="mainUserMapper")
	private MainUserMapper mainUserMapper;

	@Resource(name="memberMapper")
	private MemberMapper memberMapper;

	/**
	 * 로그cnt 조회
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int selectLogCnt(Map<String, Object> param) throws Exception {
		
		int result = mainUserMapper.selectLogCnt(param);
		
		return result;
	}
	
	/**
	 * 로그 인서트
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int insertLog(Map<String, Object> param) throws Exception {
		
		int result = mainUserMapper.insertLog(param);
		
		return result;
	}
	
	/**
	 * 로그 업데이트
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	@Override
	public int updateLog(Map<String, Object> param) throws Exception {
		
		int result = mainUserMapper.updateLog(param);
		
		return result;
	}
	
	/**
	 * 로그 조회
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 infoVO
	 * @return 로그 조회
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectAllStatslist(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = mainUserMapper.selectAllStatslist(param);

		return result;
	}
	
	/**
	 * 월로그 조회
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 infoVO
	 * @return 월로그 조회
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectMonthStatslist(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = mainUserMapper.selectMonthStatslist(param);

		return result;
	}
	
	/**
	 * 일로그 조회
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 infoVO
	 * @return 일로그 조회
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectDayStatslist(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = mainUserMapper.selectDayStatslist(param);

		return result;
	}
	
	/**
	 * 로그 카운트 조회
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 infoVO
	 * @return 로그 카운트조회
	 * @exception Exception
	 */
	@Override
	public Map<String, Object> selectAllStatsCnt(Map<String, Object> param) throws Exception {
		Map<String, Object> result = mainUserMapper.selectAllStatsCnt(param);

		return result;
	}
	
	/*
	 * 메인 회원사 로고 조회
	*/
	@Override
	public List<Map<String, Object>> selectAllMemberLogo(Map<String, Object> params) throws Exception {
		List<Map<String, Object>> resultList = null;
		resultList = memberMapper.selectMainMemberLogo(params);
		return resultList;
	}
	
	/*
	 * 메인 회원사 로고 조회
	*/
	@Override
	public List<Map<String, Object>> selectLitBanner(Map<String, Object> params) throws Exception {
		List<Map<String, Object>> resultList = null;
		resultList = memberMapper.selectLitBanner(params);
		return resultList;
	}
}
