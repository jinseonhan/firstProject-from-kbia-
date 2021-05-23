package egovframework.admin.member.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;

public interface MemberAdminService {
	List<Map<String,Object>> selectmemberList(Map<String, Object> params) throws Exception;

	int memberAdminRegist(Map<String, Object> params);

	HashMap<String, Object> selectMemberDetails(Map<String, Object> param);

	Map<String, Object> loadAdminMember(Map<String, Object> param);

	int memberAdminReviseUpdate(Map<String, Object> params);

	int memberAdminUserDelete(Map<String, Object> param);

}
