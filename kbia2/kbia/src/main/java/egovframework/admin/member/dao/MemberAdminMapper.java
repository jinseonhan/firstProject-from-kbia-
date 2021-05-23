package egovframework.admin.member.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("MemberAdminMapper")
public interface MemberAdminMapper{
	
	/** 회원리스트 조회
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> selectmemberList(Map<String, Object> params);

	int memberAdminRegist(Map<String, Object> params);

	HashMap<String, Object> selectMemberDetails(Map<String, Object> param);

	Map<String, Object> loadAdminMember(Map<String, Object> param);

	int memberAdminReviseUpdate(Map<String, Object> params);

	int memberAdminUserDelete(Map<String, Object> param);

	
	
}
