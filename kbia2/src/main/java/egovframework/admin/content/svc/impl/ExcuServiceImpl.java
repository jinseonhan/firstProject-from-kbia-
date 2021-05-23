package egovframework.admin.content.svc.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.admin.content.dao.ExcuMapper;
import egovframework.admin.content.svc.ExcuService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("excuService")
public class ExcuServiceImpl extends EgovAbstractServiceImpl implements ExcuService{

	@Resource
	private ExcuMapper excuMapper;
	
	@Override
	public List<Map<String, Object>> selectExcuList(Map<String, Object> param) throws Exception {
		return excuMapper.selectExcuList(param);
	}

	@Override
	public int excuReg(Map<String, Object> param) throws Exception {
		int result = excuMapper.excuReg(param);
		return result;
	}

	@Override
	public int excuNumChk(Map<String, Object> param) throws Exception {
		int result = excuMapper.excuNumChk(param);
		return result;
	}

	@Override
	public Map<String, Object> getExcu(Map<String, Object> param) throws Exception {
		Map<String, Object> result = null;
		result = excuMapper.getExcu(param);
		return result;
	}

	@Override
	public int excuModify(Map<String, Object> param) throws Exception {
		int result = excuMapper.excuModify(param);
		return result;
	}

	@Override
	public int excuDel(Map<String, Object> param) throws Exception {
		int result = excuMapper.excuDel(param);
		return result;
	}

	@Override
	public List<Map<String, Object>> getExcuType() throws Exception {
		return excuMapper.getExcuType();
	}

	
}
