package egovframework.admin.content.dao;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("LitMapper")
public interface LitMapper {

	/**
	 * 소배너리스트를 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 ContentVO
	 * @return 조회한 글
	 * @exception Exception
	 */
	List<Map<String, Object>> selectLitList(Map<String, Object> param) throws Exception;
	
	/* 소배너를 등록한다. */
	int litRegist(Map<String, Object> param) throws Exception;
	
	/* 노출 순위 중복체크 */
	int locationNcheck(Map<String, Object> param) throws Exception;
	
	/* 업데이트 시 노출 순위 중복체크 */
	List<Map<String, Object>> keepCheck (Map<String, Object> param) throws Exception;
	
	/* 소배너 자세히보기 */
	List<Map<String, Object>> selectLitContent(Map<String, Object> param) throws Exception;
	
	/* 소배너 글 업데이트 */
	int updateLit(Map<String, Object> param) throws Exception;
	
	/* 소배너 글 삭제 */
	int deleteLit(Map<String, Object> param) throws Exception;
	
	/* 팝업 내용 조회 */
	List<Map<String, Object>> srcPopList(Map<String, Object> param) throws Exception;
}
