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

import egovframework.admin.notice.dao.AdminNoticeMapper;
import egovframework.admin.notice.svc.AdminNoticeService;
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

@Service("AdminNoticeService")
public class AdminNoticeServiceImpl extends EgovAbstractServiceImpl implements AdminNoticeService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdminNoticeServiceImpl.class);

	
	// TODO mybatis 사용
	@Resource(name = "AdminNoticeMapper")
	private AdminNoticeMapper adminNoticeMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;

	@Override
	public List<Map<String, Object>> selectNoticeList(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = adminNoticeMapper.selectNoticeList(param);

		return result;
	}

	@Override
	public int NoticeRegist(Map<String, Object> param) throws Exception {
		int result = adminNoticeMapper.NoticeRegist(param);
		return result;
	}

	@Override
	public List<Map<String, Object>> selectNotice(Map<String, Object> params) throws Exception {
		List<Map<String, Object>> result = adminNoticeMapper.selectNotice(params);

		return result;
	}

	@Override
	public int noticeUpdate(Map<String, Object> param) throws Exception {
		int result = adminNoticeMapper.noticeUpdate(param);
		return result;
	}

	@Override
	public int noticeDelete(Map<String, Object> param) throws Exception {
		int result = adminNoticeMapper.noticeDelete(param);
		return result;
	}

	
	
}
