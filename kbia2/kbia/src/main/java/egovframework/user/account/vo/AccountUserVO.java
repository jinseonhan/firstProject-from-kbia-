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
package egovframework.user.account.vo;

/**
 * @Class Name : AccountUserVO.java
 * @Description : AccountUserVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.01.11      지승배         최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class AccountUserVO {

	private static final long serialVersionUID = 1L;

	/** user_id */
	private String userId;
	
	/** passwd */
	private String passwd;
	
	/** 이름 */
	private String userNm;
	
	/** 업종 */
	private String workTypeNm;
	
	/** 직책 */
	private String positionNm;
	
	/** 근무처 */
	private String workAddr;
	
	/** 권한 */
	private String author;
	
	/** 전화번호 */
	private String homeTel;
	
	/** 회사전화 */
	private String workTel;
	
	/** 휴대폰번호 */
	private String perTel;
	
	/** email */
	private String email;
	
	/** 파일번호 */
	private String fileNo;

	/** 생성일 */
	private String createDate;
	
	/** 수정일 */
	private String updateDate;
	
	/** 생성아이디 */
	private String createId;
	
	/** 수정아이디 */
	private String updateId;
	
	/** 주소 */
	private String address;
	
	/** 우편번호 */
	private String addressNo;
	
	/** 상세주소 */
	private String addressDtl;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getWorkTypeNm() {
		return workTypeNm;
	}

	public void setWorkTypeNm(String workTypeNm) {
		this.workTypeNm = workTypeNm;
	}

	public String getPositionNm() {
		return positionNm;
	}

	public void setPositionNm(String positionNm) {
		this.positionNm = positionNm;
	}

	public String getWorkAddr() {
		return workAddr;
	}

	public void setWorkAddr(String workAddr) {
		this.workAddr = workAddr;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getHomeTel() {
		return homeTel;
	}

	public void setHomeTel(String homeTel) {
		this.homeTel = homeTel;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFileNo() {
		return fileNo;
	}

	public void setFileNo(String fileNo) {
		this.fileNo = fileNo;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddressNo() {
		return addressNo;
	}

	public void setAddressNo(String addressNo) {
		this.addressNo = addressNo;
	}

	public String getAddressDtl() {
		return addressDtl;
	}

	public void setAddressDtl(String addressDtl) {
		this.addressDtl = addressDtl;
	}

	public String getCreateId() {
		return createId;
	}

	public void setCreateId(String createId) {
		this.createId = createId;
	}

	public String getUpdateId() {
		return updateId;
	}

	public void setUpdateId(String updateId) {
		this.updateId = updateId;
	}
	
	
}
