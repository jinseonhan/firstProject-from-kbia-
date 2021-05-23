package egovframework.admin.member.vo;

import java.io.Serializable;

public class MemberAdminVO implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**boardNo */
	private int boardNo;
	/** 게시판 타입 */
	private String boardType;
	
	/** create_Id */
	private String createId;
	
	/**홈페이지 */
	private String homePage;

	/** 회사소개*/
	private String content;
	
	/** 언어타입 */
	private String languageType;

	/**회원구분*/
	private String division;
	
	/**회사명*/
	private String comNm;
	
	/** 사용여부 */
	private String useYn;

	/** 등록일 start */
	private String startDate;
	
	/** 등록일 end */
	private String endDate;

	/** 업데이트 아이디 */
	private String updateId;
	/** 대표자명 */
	private String comRepreNm;
	/** 업종 */
	private String sectors;
	/** 설립년도 */
	private String estYear;
	/** 종업원 수*/
	private String comEmplCnt;
	/** 대표번호*/
	private String comRepreNum;
	/** 팩스번호*/
	private String faxNum;
	/** 홈페이지*/
	private String title;
	
	/** 메인 노출 여부 **/
	private String outDiv;
	private String isExpo;
	/** 노출 순서 **/
	private String outSeq;
	private String expoNo;

	
	public String getCreateId() {
		return createId;
	}

	public void setCreateId(String createId) {
		this.createId = createId;
	}

	public String getHomePage() {
		return homePage;
	}

	public void setHomePage(String homePage) {
		this.homePage = homePage;
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

	public String getComNm() {
		return comNm;
	}

	public void setComNm(String comNm) {
		this.comNm = comNm;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
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

	public String getBoardType() {
		return boardType;
	}

	public void setBoardType(String boardType) {
		this.boardType = boardType;
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



	public String getFaxNum() {
		return faxNum;
	}

	public void setFaxNum(String faxNum) {
		this.faxNum = faxNum;
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


	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getUpdateId() {
		return updateId;
	}

	public void setUpdateId(String updateId) {
		this.updateId = updateId;
	}

	public String getOutDiv() {
		return outDiv;
	}

	public void setOutDiv(String outDiv) {
		this.outDiv = outDiv;
	}

	public String getIsExpo() {
		return isExpo;
	}

	public void setIsExpo(String isExpo) {
		this.isExpo = isExpo;
	}

	public String getOutSeq() {
		return outSeq;
	}

	public void setOutSeq(String outSeq) {
		this.outSeq = outSeq;
	}

	public String getExpoNo() {
		return expoNo;
	}

	public void setExpoNo(String expoNo) {
		this.expoNo = expoNo;
	}


	
}
