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
package egovframework.cmmn.seq.svc.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import egovframework.cmmn.file.dao.FileMapper;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.file.vo.FileVO;
import egovframework.cmmn.seq.dao.SeqMapper;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.seq.vo.SeqVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * @Class Name : BatteryServiceImpl.java
 * @Description : Battery Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-11 유지완           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */


@Service("seqService")
public class SeqServiceImpl extends EgovAbstractServiceImpl implements SeqService {

	private static final Logger LOGGER = LoggerFactory.getLogger(SeqServiceImpl.class);
	
	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertyService;	
	
	/* 파일 업/다운로드 서비스 */	
	@Resource(name="seqMapper")
	private SeqMapper seqMapper;

	/* ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;	
	
	/**
	 * File을 조회한다.
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 BatteryVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	@Override
	public int selectSeq(Map<String, Object> param) throws Exception {
		LOGGER.info("@@ param : " + param);
		
		String seqId = null;
		int result = 0;
		SeqVO seqVo = new SeqVO();
		
		seqId = String.valueOf(param.get("seqId"));
		
		seqVo.setSeqId(seqId);		
		
		result = seqMapper.selectSeq(seqVo);
		
		return result;
	}	
}
