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
package egovframework.cmmn.smartEdit.vo;

import org.springframework.web.multipart.MultipartFile;

/**
 * @Class Name : InfoVO.java
 * @Description : InfoVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.01.11  유지완         최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021.01.11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class smartVO {

	public class Editor { 
		private MultipartFile Filedata; 
		public MultipartFile getFiledata() { 
			return Filedata; 
		} 
		public void setFiledata(MultipartFile filedata) { 
			Filedata = filedata; 
			} 
	}

}
