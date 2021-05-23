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
package egovframework.admin.info.vo;

import java.io.Serializable;

/**
 * @Class Name : InfoVO.java
 * @Description : InfoVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.01.11  유지완         최초생성
 * @ 2021.01.19  오현웅         수정
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021.01.11
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class InfoVO implements Serializable {

	private static final long serialVersionUID = 20210119L;
	
	/** 번호 */
	private int boardNo;

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
	
	
	/** 생성 날짜*/
	private String createDate;
	

	/** 수정 날짜*/
	private String updateDate;
	
	/** viewCnt*/
	private int viewCnt;
	
	/** useYn*/
	private String useYn;
	
	/** 사용 언어*/
	private String languageType;
	
	
	
	/** EXT1*/
	private String ext1;
	
	/** EXT2*/
	private String ext2;
	
	/** EXT3*/
	private String ext3;
	
	/** EXT4*/
	private String ext4;
	
	
	public String getcreateDate() {
		return createDate;
	}
	
	public void setcreateDate(String createDate) {
		this.createDate = createDate;
	}

	public int getboardNo() {
		return boardNo;
	}

	public void setboardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getboardType() {
		return boardType;
	}

	public void setboardType(String boardType) {
		this.boardType = boardType;
	}

	public String getcreateId() {
		return createId;
	}

	public void setcreateId(String createId) {
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

	public String getmultiFileNo() {
		return multiFileNo;
	}

	public void setmultiFileNo(String multiFileNo) {
		this.multiFileNo = multiFileNo;
	}

	public String getupdateDate() {
		return updateDate;
	}

	public void setupdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public int getviewCnt() {
		return viewCnt;
	}

	public void setviewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}

	public String getuseYn() {
		return useYn;
	}

	public void setuseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getlanguageType() {
		return languageType;
	}

	public void setlanguageType(String languageType) {
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
}
