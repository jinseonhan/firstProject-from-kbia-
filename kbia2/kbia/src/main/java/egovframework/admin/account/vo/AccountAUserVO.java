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
package egovframework.admin.account.vo;

/**
 * @Class Name : SampleVO.java
 * @Description : SampleVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class AccountAUserVO {

	private static final long serialVersionUID = 1L;

	/** 아이디,이름 */
	private String userIdNm;

	/** 아이디 */
	private String adminId;

	/** 이름 */
	private String userNm;

	/** 비밀번호 */
	private String passwd;

	/** from 가입일 */
	private String fromCreateDate;
	
	/** to 가입일 */
	private String toCreateDate;
	
	/** 회원상태 */
	private String useYn;
	
	/** 회원등급 */
	private String author;
	
	/** 권한 */
	private String workAddr;
	
	/** 전화번호 */
	private String workTel;
	
	/**휴대폰 번호 */
	private String perTel;
	
	/** 업데이트 일 */
	private String updateDate;
	
	/**생성일 */
	private String createDate;
	
	/** 업데이트 ID */
	private String updateId;
	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getFromCreateDate() {
		return fromCreateDate;
	}

	public void setFromCreateDate(String fromCreateDate) {
		this.fromCreateDate = fromCreateDate;
	}

	public String getToCreateDate() {
		return toCreateDate;
	}

	public void setToCreateDate(String toCreateDate) {
		this.toCreateDate = toCreateDate;
	}

	public String getUserIdNm() {
		return userIdNm;
	}

	public void setUserIdNm(String userIdNm) {
		this.userIdNm = userIdNm;
	}

	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passWd) {
		this.passwd = passWd;
	}

	public String getWorkAddr() {
		return workAddr;
	}

	public void setWorkAddr(String workAddr) {
		this.workAddr = workAddr;
	}

	public String getWorkTel() {
		return workTel;
	}

	public void setWorkTel(String workTel) {
		this.workTel = workTel;
	}

	public String getPerTel() {
		return perTel;
	}

	public void setPerTel(String perTel) {
		this.perTel = perTel;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateId() {
		return updateId;
	}

	public void setUpdateId(String updateId) {
		this.updateId = updateId;
	}
	
	
}
