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
package egovframework.admin.account.svc;

import java.util.List;
import java.util.Map;


/**
 * @Class Name : AccountService.java
 * @Description : AccountService Class
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
public interface AccountAUserService {

	/**
	 * 아이디를 체크한다.
	 * @param Map<String, Object>
	 * @return 아이디 체크 수
	 * @exception Exception
	 */
	int selectAUserCnt(Map<String, Object> param) throws Exception;
	
	/**
	 * 유저을 조회한다.
	 * @param Map<String, Object>
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectAUserList(Map<String, Object> param) throws Exception;

	int userASignUp(Map<String, Object> params);

	/** 관리자 회원정보를 불러온다.
	 * @param params
	 * @return
	 * @throws Exception 
	 */
	Map<String, Object> selectAdminLoginInfo(Map<String, Object> params) throws Exception;

	/**
	 * 관리자 유저의 정보를 수정을 한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int AuserAccountUpdate(Map<String, Object> param) throws Exception;
	
	/**
	 * 관리자 계정을 삭제한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int AUsersecession(Map<String, Object> params) throws Exception;
	
}
