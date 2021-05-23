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
package egovframework.admin.info.svc;

import java.util.List;
import java.util.Map;


/**
 * @Class Name : ReferenceService.java
 * @Description : ReferenceService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-12 유지완           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-12
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface BatteryService {

	/**
	 * The Battery를 조회한다.
	 * @param vo - 조회할 정보가 담긴 InfoVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String,Object>> selectBatteryList(Map<String, Object> param) throws Exception;
	
	/**
	 * The Battery를 등록한다.
	 * @param param
	 * @return String
	 * @throws Exception
	 */
	
	int batteryRegist(Map<String, Object>param) throws Exception;
	
	/**
	 * The Battery 수정페이지를 조회한다.
	 * @param List<Map<String, Object>> - 조회할 정보가 담긴 ContentVO
	 * @return 조회한 글
	 * @exception Exception
	 * */
	
	Map<String, Object> selectUpdateBattery(Map<String,Object> param) throws Exception;
	
	/**
	 * The Battery 수정을 한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int batteryUpdate(Map<String, Object> param) throws Exception;
	
	/**
	 * The Battery 삭제 한다.
	 * @param Map<String, Object>
	 * @return String
	 * @exception Exception
	 */
	int batteryDelete(Map<String, Object> params) throws Exception;
}
