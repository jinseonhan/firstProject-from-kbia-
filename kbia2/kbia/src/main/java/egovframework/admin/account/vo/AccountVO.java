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

import java.io.Serializable;

import com.sun.xml.internal.ws.api.model.SEIModel;

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
/**
 * @author Administrator
 *
 */
public class AccountVO implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/** ID & 이름(검색용)	 */
	private String userIdNm;
	/** 아이디 */
	private String userId;

	/** 비밀번호 */
	private String passwd;

	/** 유저 이름 */
	private String userNm;

	/** from 가입일 */
	private String fromCreateDate;
	
	/** to 가입일 */
	private String toCreateDate;
	
	/** 회원상태 */
	private String useYn;
	
	
	/** 업종 */
	private String workTypeNm;
	
	/** 직책 */
	private String postionNm;
	
	
	/** 근무처 */
	private String workAddr;
	
	/** 전화번호 */
	private String homeTel;
	
	
	/** 회사 전화번호*/
	private String workTel;
	
	/** 휴대전화 번호*/
	private String perTel;
	
	/** 이메일*/
	private String email;
	
	
	/** 가입일*/
	private String createDate;
	
	/** 수정일 */
	private String updateDate;
	
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

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getWorkTypeNm() {
		return workTypeNm;
	}

	public void setWorkTypeNm(String workTypeNm) {
		this.workTypeNm = workTypeNm;
	}

	public String getPostionNm() {
		return postionNm;
	}

	public void setPostionNm(String postionNm) {
		this.postionNm = postionNm;
	}

	public String getWorkAddr() {
		return workAddr;
	}

	public void setWorkAddr(String workAddr) {
		this.workAddr = workAddr;
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

	public String getUserIdNm() {
		return userIdNm;
	}

	public void setUserIdNm(String userIdNm) {
		this.userIdNm = userIdNm;
	}

	
}

