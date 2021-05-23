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
package egovframework.cmmn.file.vo;

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
public class FileVO {

	private static final long serialVersionUID = 2456L;
	
	private String idx;
	private String orgIdx;
	private String refIdx;
	private String refType;
	private String filePath;
	private String ognFileNm;
	private String stFileNm;
	private String fileSize;	
	private String rgtId;
	private String subFilePath;
	
	
	public String getSubFilePath() {
		return subFilePath;
	}
	public void setSubFilePath(String subFilePath) {
		this.subFilePath = subFilePath;
	}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getOrgIdx() {
		return orgIdx;
	}
	public void setOrgIdx(String orgIdx) {
		this.orgIdx = orgIdx;
	}
	public String getRefIdx() {
		return refIdx;
	}
	public void setRefIdx(String refIdx) {
		this.refIdx = refIdx;
	}
	public String getRefType() {
		return refType;
	}
	public void setRefType(String refType) {
		this.refType = refType;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getOgnFileNm() {
		return ognFileNm;
	}
	public void setOgnFileNm(String ognFileNm) {
		this.ognFileNm = ognFileNm;
	}
	public String getStFileNm() {
		return stFileNm;
	}
	public void setStFileNm(String stFileNm) {
		this.stFileNm = stFileNm;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public String getRgtId() {
		return rgtId;
	}
	public void setRgtId(String rgtId) {
		this.rgtId = rgtId;
	}	
}
