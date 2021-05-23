package egovframework.admin.content.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.admin.content.dao.LitMapper;
import egovframework.admin.content.svc.LitService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("LitService")
public class LitServiceImpl extends EgovAbstractServiceImpl implements LitService{
	private static final Logger LOGGER = LoggerFactory.getLogger(LitServiceImpl.class);

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;
	
	// TODO mybatis 사용
		@Resource(name = "LitMapper")
		private LitMapper litMapper;
		
	/**
	 * 메인소배너정보를 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 조회한 메인 소배너
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectLitList(Map<String, Object> param) throws Exception {

		List<Map<String, Object>> result = litMapper.selectLitList(param);

		return result;

	}
	
	/**
	 * 메인소배너정보를 등록한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 성공하면 1 반환
	 * @exception Exception
	 */
	@Override
	public int litRegist(Map<String, Object> param) throws Exception {
		int result = litMapper.litRegist(param);
		return result;
	}
	
	/**
	 * 노출순위 중복 체크한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 노출순위 중복 시 중복되는 count 반환
	 * @exception Exception
	 */
	@Override
	public int locationNcheck(Map<String, Object> param) throws Exception {
		int count = litMapper.locationNcheck(param);
		return count;
	}
	
	/**
	 * 수정할 때 노출 순위를 중복 체크한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return List
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> keepCheck(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = litMapper.keepCheck(param);
		return result;
	}
	
	/**
	 * 메인소배너 상세보기 조회한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 소배너 상세보기 내용
	 * @exception Exception
	 */
	@Override
	public List<Map<String, Object>> selectLitContent(Map<String, Object> param) throws Exception {

		List<Map<String, Object>> result = litMapper.selectLitContent(param);

		return result;

	}
	
	/**
	 * 메인소배너를 수정한다.
	 * 
	 * @param List<Map<String,Object>> - 조회할 정보가 담긴 contentVO
	 * @return 수정 성공 시 1반환
	 * @exception Exception
	 */
	@Override
	public int updateLit(Map<String, Object> param) throws Exception {
		int result = litMapper.updateLit(param);
		return result;
	}
	
	@Override
	public int deleteLit(Map<String, Object> param) throws Exception {
		int result = litMapper.deleteLit(param);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> srcPopList(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> result = litMapper.srcPopList(param);

		return result;
	}

	
}
