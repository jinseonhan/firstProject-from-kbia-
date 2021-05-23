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
package egovframework.admin.content.vo;

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
public class ContentVO {

	private static final long serialVersionUID = 1L;

	/** 게시자id */
	private String createId;
	
	/** 등록일 start */
	private String regStartDate;
	
	/** 등록일 end */
	private String regEndDate;

	/** 제목 */
	private String title;
	/** 내용 */
	private String content;
	
	/** 사용여부 */
	private String useYn;

	/** 언어타입 */
	private String languageType;
	
	private String priorty;
	
	
	/** 팝업구분*/
	private String division; 
	
	/** 링크*/
	private String link;
	
	/** 게시일*/
	private String startDt;
	
	
	/** 게시 종료일*/
	private String endDt;
	
	/** 노출위치*/
	private String location;
	
	/** 상시노출*/
	private String outDiv;
	
	
	/** 년월*/
	private String yearMonth;
	
	/** 년월*/
	private String locationN;
	
	/** 시작 시간 */
	private String mBannerStHour;
	
	/** 시작 분 */
	private String mBannerStMinute;
	/** 종료 시간 */
	private String mBannerEndHour;
	/** 종료 분 */
	private String mBannerEndMinute;	

	private String EXT1;
	
	private String EXT2;
	
	private String EXT3;
	
	private String EXT4;
	
	private String EXT5;
	
	private String EXT6;
	
	private String stdate;
	private String endate;
	private String bannerDate;
	private String popupDate;
	private String mainPage;
	
	
	
	public String getMainPage() {
		return mainPage;
	}

	public void setMainPage(String mainPage) {
		this.mainPage = mainPage;
	}

	public String getPopupDate() {
		return popupDate;
	}

	public void setPopupDate(String popupDate) {
		this.popupDate = popupDate;
	}

	public String getBannerDate() {
		return bannerDate;
	}

	public void setBannerDate(String bannerDate) {
		this.bannerDate = bannerDate;
	}

	public String getmBannerStHour() {
		return mBannerStHour;
	}

	public void setmBannerStHour(String mBannerStHour) {
		this.mBannerStHour = mBannerStHour;
	}

	public String getmBannerStMinute() {
		return mBannerStMinute;
	}

	public void setmBannerStMinute(String mBannerStMinute) {
		this.mBannerStMinute = mBannerStMinute;
	}

	public String getmBannerEndHour() {
		return mBannerEndHour;
	}

	public void setmBannerEndHour(String mBannerEndHour) {
		this.mBannerEndHour = mBannerEndHour;
	}

	public String getmBannerEndMinute() {
		return mBannerEndMinute;
	}

	public void setmBannerEndMinute(String mBannerEndMinute) {
		this.mBannerEndMinute = mBannerEndMinute;
	}

	public String getLocationN() {
		return locationN;
	}

	public void setLocationN(String locationN) {
		this.locationN = locationN;
	}

	public String getYearMonth() {
		return yearMonth;
	}

	public void setYearMonth(String yearMonth) {
		this.yearMonth = yearMonth;
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
	
	
	
	
	public String getStdate() {
		return stdate;
	}

	public void setStdate(String stdate) {
		this.stdate = stdate;
	}

	public String getEndate() {
		return endate;
	}

	public void setEndate(String endate) {
		this.endate = endate;
	}

	public String getEXT1() {
		return EXT1;
	}

	public void setEXT1(String eXT1) {
		EXT1 = eXT1;
	}

	public String getEXT2() {
		return EXT2;
	}

	public void setEXT2(String eXT2) {
		EXT2 = eXT2;
	}

	public String getEXT3() {
		return EXT3;
	}

	public void setEXT3(String eXT3) {
		EXT3 = eXT3;
	}

	public String getEXT4() {
		return EXT4;
	}

	public void setEXT4(String eXT4) {
		EXT4 = eXT4;
	}

	public String getEXT5() {
		return EXT5;
	}

	public void setEXT5(String eXT5) {
		EXT5 = eXT5;
	}

	public String getEXT6() {
		return EXT6;
	}

	public void setEXT6(String eXT6) {
		EXT6 = eXT6;
	}

	public String getPriorty() {
		return priorty;
	}

	public void setPriorty(String priorty) {
		this.priorty = priorty;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	public String getCreateId() {
		return createId;
	}

	public void setCreateId(String createId) {
		this.createId = createId;
	}

	public String getRegStartDate() {
		return regStartDate;
	}

	public void setRegStartDate(String regStartDate) {
		this.regStartDate = regStartDate;
	}

	public String getRegEndDate() {
		return regEndDate;
	}

	public void setRegEndDate(String regEndDate) {
		this.regEndDate = regEndDate;
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

	
	
}
