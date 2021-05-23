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
package egovframework.admin.notice.vo;

import java.io.Serializable;

/**
 * @Class Name : NoticeVO.java
 * @Description : NoticeVO Class
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2021.02.05 유지완 최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021.01.11
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */
public class NoticeVO implements Serializable {

	private static final long serialVersionUID = 20210119L;

	/** boardType */
	private String boardType;

	/** 작성자 */
	private String createId;

	/** 제목 */
	private String title;

	/** 내용 */
	private String content;

	/** 파일 */
	private String multiFileNo;

	/** 생성 날짜 */
	private String createDate;

	/** 수정 날짜 */
	private String updateDate;

	/** viewCnt */
	private int viewCnt;

	/** useYn */
	private String useYn;

	/** 사용 언어 */
	private String languageType;

	/** DIVISION */
	private String division;

	/** LINK */
	private String link;

	/** START_DT */
	private String startDt;

	/** END_DT */
	private String endDt;

	/** LOCATION */
	private String location;

	/** OUT_DIV */
	private String outDiv;

	/** MAIN_OUT */
	private String mainOut;

	/** EXT1 */
	private String ext1;

	/** 번호 */
	private int boardNo;

	public int getBoardNo() {
		return boardNo;
	}

	public String getMainOut() {
		return mainOut;
	}

	public void setMainOut(String mainOut) {
		this.mainOut = mainOut;
	}

	public void setBoardNo(int boardNo) {
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

	public String getMultiFileNo() {
		return multiFileNo;
	}

	public void setMultiFileNo(String multiFileNo) {
		this.multiFileNo = multiFileNo;
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

	public int getViewCnt() {
		return viewCnt;
	}

	public void setViewCnt(int viewCnt) {
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

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getStartDt() {
		return startDt;
	}

	public void setStartDt(String startDt) {
		this.startDt = startDt;
	}

	public String getEndDt() {
		return endDt;
	}

	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getOutDiv() {
		return outDiv;
	}

	public void setOutDiv(String outDiv) {
		this.outDiv = outDiv;
	}

	public String getExt1() {
		return ext1;
	}

	public void setExt1(String ext1) {
		this.ext1 = ext1;
	}

}
