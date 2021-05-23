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
package egovframework.user.member.vo;

import java.io.Serializable;

/**
 * @Class Name : SampleVO.java
 * @Description : SampleVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-10 노희원           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class MemberVO implements Serializable{

	private static final long serialVersionUID = 1L;

	/** rownum */
	private String rownum;
	/** 게시판 번호*/
	private String boardNo;
	/** 게시판 타입 */
	private String boardType;
	/** 작성자 */
	private String createId;
	/** 제목 */
	private String title;
	/** 내용 */
	private String content;
	/** 생성일 */
	private String createDate;
	/** 수정일 */
	private String updateDate;
	/** 조회수 */
	private String viewCnt;
	/** 사용여부 */
	private String useYn;
	/** 언어타입 */
	private String languageType;
	/** ext1 */
	private String ext1;
	/** ext2 */
	private String ext2;
	/** ext3 */
	private String ext3;
	/** ext4 */
	private String ext4;
	/** ext5 */
	private String ext5;
	/** ext6 */
	private String ext6;
	/** ext7 */
	private String ext7;
	/** 이전 글 PK넘버 */
	private String bfBoardNo;
	/** 이전글 타이틀 */
	private String bfTitle;
	/** 이전글 타입 */
	private String bfBoardType;
	/** 다음 글 pk넘버 */
	private String ntBoardNo;
	/** 다음글 타이틀 */
	private String ntTitle;
	/** 이전글 타입 */
	private String ntBoardType;
	/** 원 CREATEDATE */
	private String orgCreateDate;
	/** 원 이전 CREATEDATE */
	private String orgBfCreateDate;
	/** 원 다음 CREATEDATE */
	private String orgNtCreateDate;
	
	private String homepage;
	
	private String division;
	
	private String comNm;
	
	private String comRepreNm;
	
	private String sectors;
	
	private String estYear;
	
	private String comEmplCnt;
	
	private String comRepreNum;
	
	private String fax;
	
	private String idx;
	
	private String refIdx;
	
	private String refType;
	
	private String stFileNm;
	
	public String getOrgBfCreateDate() {
		return orgBfCreateDate;
	}
	public void setOrgBfCreateDate(String orgBfCreateDate) {
		this.orgBfCreateDate = orgBfCreateDate;
	}
	public String getOrgNtCreateDate() {
		return orgNtCreateDate;
	}
	public void setOrgNtCreateDate(String orgNtCreateDate) {
		this.orgNtCreateDate = orgNtCreateDate;
	}
	public String getOrgCreateDate() {
		return orgCreateDate;
	}
	public void setOrgCreateDate(String orgCreateDate) {
		this.orgCreateDate = orgCreateDate;
	}
	public String getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(String boardNo) {
		this.boardNo = boardNo;
	}
	public String getBoardType() {
		return boardType;
	}
	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}
	public String getCreateId() {
		return createId;
	}
	public void setCreateId(String createId) {
		this.createId = createId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
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
	public String getViewCnt() {
		return viewCnt;
	}
	public void setViewCnt(String viewCnt) {
		this.viewCnt = viewCnt;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getLanguageType() {
		return languageType;
	}
	public void setLanguageType(String languageType) {
		this.languageType = languageType;
	}
	public String getExt1() {
		return ext1;
	}
	public void setExt1(String ext1) {
		this.ext1 = ext1;
	}
	public String getExt2() {
		return ext2;
	}
	public void setExt2(String ext2) {
		this.ext2 = ext2;
	}
	public String getExt3() {
		return ext3;
	}
	public void setExt3(String ext3) {
		this.ext3 = ext3;
	}
	public String getExt4() {
		return ext4;
	}
	public void setExt4(String ext4) {
		this.ext4 = ext4;
	}
	public String getExt5() {
		return ext5;
	}
	public void setExt5(String ext5) {
		this.ext5 = ext5;
	}
	public String getExt6() {
		return ext6;
	}
	public void setExt6(String ext6) {
		this.ext6 = ext6;
	}
	public String getExt7() {
		return ext7;
	}
	public void setExt7(String ext7) {
		this.ext7 = ext7;
	}
	public String getRownum() {
		return rownum;
	}
	public void setRownum(String rownum) {
		this.rownum = rownum;
	}
	public String getBfBoardNo() {
		return bfBoardNo;
	}
	public void setBfBoardNo(String bfBoardNo) {
		this.bfBoardNo = bfBoardNo;
	}
	public String getBfTitle() {
		return bfTitle;
	}
	public void setBfTitle(String bfTitle) {
		this.bfTitle = bfTitle;
	}
	public String getNtBoardNo() {
		return ntBoardNo;
	}
	public void setNtBoardNo(String ntBoardNo) {
		this.ntBoardNo = ntBoardNo;
	}
	public String getNtTitle() {
		return ntTitle;
	}
	public void setNtTitle(String ntTitle) {
		this.ntTitle = ntTitle;
	}
	public String getBfBoardType() {
		return bfBoardType;
	}
	public void setBfBoardType(String bfBoardType) {
		this.bfBoardType = bfBoardType;
	}
	public String getNtBoardType() {
		return ntBoardType;
	}
	public void setNtBoardType(String ntBoardType) {
		this.ntBoardType = ntBoardType;
	}
	public String getHomepage() {
		return homepage;
	}
	public void setHomepage(String homepage) {
		this.homepage = homepage;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public String getComNm() {
		return comNm;
	}
	public void setComNm(String comNm) {
		this.comNm = comNm;
	}
	public String getComRepreNm() {
		return comRepreNm;
	}
	public void setComRepreNm(String comRepreNm) {
		this.comRepreNm = comRepreNm;
	}
	public String getSectors() {
		return sectors;
	}
	public void setSectors(String sectors) {
		this.sectors = sectors;
	}
	public String getEstYear() {
		return estYear;
	}
	public void setEstYear(String estYear) {
		this.estYear = estYear;
	}
	public String getComEmplCnt() {
		return comEmplCnt;
	}
	public void setComEmplCnt(String comEmplCnt) {
		this.comEmplCnt = comEmplCnt;
	}
	public String getComRepreNum() {
		return comRepreNum;
	}
	public void setComRepreNum(String comRepreNum) {
		this.comRepreNum = comRepreNum;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
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
	public String getStFileNm() {
		return stFileNm;
	}
	public void setStFileNm(String stFileNm) {
		this.stFileNm = stFileNm;
	}
	
	
}
