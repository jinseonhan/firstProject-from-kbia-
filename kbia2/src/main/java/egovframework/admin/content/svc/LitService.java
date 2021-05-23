package egovframework.admin.content.svc;

import java.util.List;
import java.util.Map;

/**
 * @Class Name : ContentService.java
 * @Description : ContentService Class
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ --------- --------- ------------------------------- @
 *   2021-04-06 박현 최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *      Copyright (C) by MOPAS All right reserved.
 */

public interface LitService {
	
	/* 소배너 리스트를 조회한다 */
	List<Map<String, Object>> selectLitList(Map<String, Object> param) throws Exception;
	
	/* 소배너를 등록한다 */
	int litRegist(Map<String, Object> param) throws Exception;
	
	/* 노출순서 체크 */
	int locationNcheck(Map<String, Object> param) throws Exception;

	/* 업데이트 시 기존 노출순서 체크 */
	List<Map<String, Object>> keepCheck(Map<String, Object> param) throws Exception;
	
	/* 소배너 자세히 보기 */
	List<Map<String, Object>> selectLitContent(Map<String, Object> param) throws Exception;
	
	/* 소배너 글 업데이트 */
	int updateLit(Map<String, Object> param) throws Exception;
	
	/* 소배너 글 삭제 */
	int deleteLit(Map<String, Object> param) throws Exception;
	
	/* 소배너 팝업 리스트 조회 */
	List<Map<String, Object>> srcPopList(Map<String, Object> param) throws Exception;
}
