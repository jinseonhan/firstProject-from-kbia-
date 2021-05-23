package egovframework.admin.content.svc;

import java.util.List;
import java.util.Map;

public interface OrganService {

	/*
	 * 조직도 조회
	*/
	public List<Map<String, Object>> getOrganList( Map<String, Object> params );
	
	/*
	 * 부서 조회
	*/
	public List<Map<String, Object>> getGroupList();
	
	/*
	 * 조직도 등록
	*/
	public int organReg(Map<String, Object> params);
	
	/*
	 * 조직도 상세조회
	*/
	public Map<String, Object> getOrgan(Map<String, Object> params);
	
	/*
	 * 조직도 수정
	*/
	public int organModify(Map<String, Object> params);
	
	/*
	 * 조직도 삭제
	*/
	public int organDelete(Map<String, Object> params);
	
	/*
	 * 노출 순서 중복 체크
	*/
	public boolean chkLocationN(Map<String, Object> params);
	
	/*
	 * 부회장 / 부이사장, 상무 / 사무국장 중복 체크
	*/
	public boolean chkHigher(Map<String, Object> params);
}
