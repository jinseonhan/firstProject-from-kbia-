package egovframework.admin.content.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.admin.content.dao.OrganMapper;
import egovframework.admin.content.svc.OrganService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service
public class OrganServiceImpl extends EgovAbstractServiceImpl implements OrganService{
	
	@Resource(name = "organMapper")
	private OrganMapper oMapper;
	
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;
	
	/*
	 * 조직도 조회
	*/
	public List<Map<String, Object>> getOrganList(Map<String, Object> params){
		return oMapper.getOrganList(params);
	}

	/*
	 * 부서 조회
	*/
	@Override
	public List<Map<String, Object>> getGroupList() {
		List<Map<String, Object>> resultList = null;
		resultList = oMapper.getGroupList();
		
		return resultList;
	}
	
	/*
	 * 조직도 등록
	*/
	@Override
	public int organReg(Map<String, Object> params) {
		int result = oMapper.organReg(params);
		return result;
	}
	
	/*
	 * 조직도 상세조회
	*/
	@Override
	public Map<String, Object> getOrgan(Map<String, Object> params) {
		Map<String, Object> result = null;
		result = oMapper.getOrgan(params);
		return result;
	}
	
	/*
	 * 조직도 수정
	*/
	@Override
	public int organModify(Map<String, Object> params) {
		int result = 0;
		result = oMapper.organModify(params);
		return result;
	}
	
	/*
	 * 조직도 삭제
	*/
	@Override
	public int organDelete(Map<String, Object> params) {
		int result = 0;
		result = oMapper.organDelete(params);
		return result;
	}
	
	/*
	 * 노출순서 중복 체크
	*/
	@Override
	public boolean chkLocationN(Map<String, Object> params) {
		boolean result = true;
		result = oMapper.chkLocationN(params);
		return !result;
	}
	
	/*
	 * 부회장 / 부이사장, 상무 / 사무국장 중복 체크
	*/
	 @Override
	public boolean chkHigher(Map<String, Object> params) {
		boolean result = true;
		result = oMapper.chkHigher(params);
		return !result;
	}
}
