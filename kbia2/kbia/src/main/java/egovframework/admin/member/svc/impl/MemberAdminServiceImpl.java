package egovframework.admin.member.svc.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.admin.member.dao.MemberAdminMapper;
import egovframework.admin.member.svc.MemberAdminService;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("MemberAdminService")
public class MemberAdminServiceImpl implements MemberAdminService{
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberAdminServiceImpl.class);
	
	// TODO mybatis 사용
	@Resource(name="MemberAdminMapper")
	private MemberAdminMapper memberAdminMapper;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;	
	
	
	@Override
	public List<Map<String, Object>> selectmemberList(Map<String, Object> params) throws Exception {
		LOGGER.info("@@ param : " + params);

		List<Map<String,Object>> result = memberAdminMapper.selectmemberList(params);
		
		return result;
	}


	@Override
	public int memberAdminRegist(Map<String, Object> params) {

		LOGGER.info("@@ param : " + params);
		int result = memberAdminMapper.memberAdminRegist(params);
		
		return result;
	}


	@Override
	public HashMap<String, Object> selectMemberDetails(Map<String, Object> param) {
		LOGGER.info("@@ param : " + param);
		HashMap<String,Object> result = memberAdminMapper.selectMemberDetails(param);
		return result;
	}


	@Override
	public Map<String, Object> loadAdminMember(Map<String, Object> param) {
		Map<String, Object> result = memberAdminMapper.loadAdminMember(param);
		
		return result;
	}


	@Override
	public int memberAdminReviseUpdate(Map<String, Object> params) {
		LOGGER.info("@@ param : " + params);
		int result = memberAdminMapper.memberAdminReviseUpdate(params);
		
		return result;
	}


	@Override
	public int memberAdminUserDelete(Map<String, Object> param) {
		LOGGER.info("@@ param : " + param);
		int result = memberAdminMapper.memberAdminUserDelete(param);
		
		return result;
	}


	



	
}
