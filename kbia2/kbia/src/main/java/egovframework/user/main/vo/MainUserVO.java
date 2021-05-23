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
package egovframework.user.main.vo;

/**
 * @Class Name : LoginUserVO.java
 * @Description : LoginUserVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-10 지승배           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class MainUserVO {

	private static final long serialVersionUID = 1L;

	/** 아이디 */
	private String ip;

	/** 이름 */
	private String logZsgr;

	/** 비밀번호 */
	private String logNum;

	/** 등록일 */
	private String regDm;
	
	/** 등록년 */
	private String logYear;
	
	/** 등록달*/
	private String logMonth;
	
	/** 등록일*/
	private String logDay;

	/**년월일*/
	private String ymd;
	
	/**시작일*/
	private String startDate;
	
	/**종료일*/
	private String endDate;
	
	/** 년*/
	private String year;
	
	
	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getLogZsgr() {
		return logZsgr;
	}

	public void setLogZsgr(String logZsgr) {
		this.logZsgr = logZsgr;
	}

	public String getLogNum() {
		return logNum;
	}

	public void setLogNum(String logNum) {
		this.logNum = logNum;
	}

	public String getRegDm() {
		return regDm;
	}

	public void setRegDm(String regDm) {
		this.regDm = regDm;
	}

	public String getLogYear() {
		return logYear;
	}

	public void setLogYear(String logYear) {
		this.logYear = logYear;
	}

	public String getLogMonth() {
		return logMonth;
	}

	public void setLogMonth(String logMonth) {
		this.logMonth = logMonth;
	}

	public String getLogDay() {
		return logDay;
	}

	public void setLogDay(String logDay) {
		this.logDay = logDay;
	}

	public String getYmd() {
		return ymd;
	}

	public void setYmd(String ymd) {
		this.ymd = ymd;
	}
	
	
}
