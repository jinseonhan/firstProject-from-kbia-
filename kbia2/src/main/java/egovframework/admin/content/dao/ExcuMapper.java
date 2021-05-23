package egovframework.admin.content.dao;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("excuMapper")
public interface ExcuMapper {
	/*임원 list*/
	List<Map<String, Object>> selectExcuList(Map<String, Object> param) throws Exception;
	
	/*임원 등록*/
	int excuReg(Map<String, Object> param) throws Exception;
	
	/*순서 체크*/
	int excuNumChk(Map<String, Object> param) throws Exception;

	/*임원 상세내용*/
	Map<String,Object> getExcu(Map<String, Object> param) throws Exception;

	/*임원 수정*/
	int excuModify(Map<String, Object> param) throws Exception;
	
	/*임원 삭제*/
	int excuDel(Map<String, Object> param) throws Exception;
	
	/*임원 구분 select값 불러오기*/
	List<Map<String,Object>> getExcuType() throws Exception; 
}
