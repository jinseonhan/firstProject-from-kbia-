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
package egovframework.user.account.svc;

import java.util.List;
import java.util.Map;

import egovframework.user.account.vo.AccountUserVO;


/**
 * @Class Name : AccountUserService.java
 * @Description : AccountUserService Class
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
public interface AccountUserService {

	/**
	 * 유저테이블의 email 수를 조회한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int emailCntChk(Map<String, Object> param) throws Exception;
	
	/**
	 * 유저테이블의 id 수를 조회한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int idCntChk(Map<String, Object> param) throws Exception;
	
	/**
	 * 유저회원 가입을 한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int userSignUp(Map<String, Object> param) throws Exception;
	
	/**
	 * 유저회원 수정을 한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int userAccountUpdate(Map<String, Object> param) throws Exception;

	/**
	 * 유저회원 삭제를 한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int secession(Map<String, Object> params) throws Exception;
	
}
