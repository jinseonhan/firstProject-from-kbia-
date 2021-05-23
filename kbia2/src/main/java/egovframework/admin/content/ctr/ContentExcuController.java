package egovframework.admin.content.ctr;

import java.io.File;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.admin.content.svc.ExcuService;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.intro.svc.IntroService;



@Controller
public class ContentExcuController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ContentExcuController.class);
	
	/* SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;
	
	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;
	
	/* Excu Service */
	@Resource(name = "excuService")
	private ExcuService excuService;
	
	/* FileService */
	@Resource(name = "fileService")
	private FileService fileService;
	
	
	/*임원현황 list 페이지 호출*/
	@RequestMapping(value = "/admin/excuList.do")
	public String openContent(ModelMap model,@RequestParam Map<String, Object> params) throws Exception{
		
		LOGGER.info("# Call excuList.do");
		LOGGER.info("params : " + params);
		System.out.println(params.get("useYn"));
		model.addAttribute("params",params);
		return "/view/admin/content/contentAdminExcuList";
	}
	
	/*임원현황 list data*/
	@RequestMapping(value = "/admin/json/excuList.do", method = RequestMethod.POST)
	public void excuListData(HttpServletRequest request, HttpServletResponse response, ModelMap model,@RequestParam Map<String, Object> params) throws Exception{
		
		LOGGER.info("# Call /admin/json/excuList.do");
		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);//어떤 형식으로 프로퍼티값 얻을지.
		LOGGER.info("@@ params : " + params);//한번에 모든 값 확인
		System.out.println(params.get("boardType"));
		System.out.println("시작값 : "+params.get("stDate"));
		System.out.println("끝값 : "+params.get("enDate"));

		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> excuList = new ArrayList<Map<String, Object>>();
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			
			excuList = excuService.selectExcuList(params);
			excuList = CamelUtil.convertListMap(excuList);
			json = mapper.writeValueAsString(excuList);
			System.out.println(json);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("-------excuList >>>" + excuList);
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	/*임원현황 등록 페이지 호출*/
	@RequestMapping(value = "/admin/excuReg.do")
	public String excuReg(@RequestParam Map<String,Object> param,ModelMap model) throws Exception{
		LOGGER.info("#Call excuReg.do");
		LOGGER.info("params : " + param);
		
		List<Map<String,Object>> etCode = excuService.getExcuType();
		
		
		model.addAttribute("etCode",etCode);
		return "/view/admin/content/contentAdminExcuRegist";
	}
	
	/*임원현황 등록 data*/
	@RequestMapping(value="/admin/json/excuReg.do", method = RequestMethod.POST)
	public void excuRegData(final MultipartHttpServletRequest request, HttpServletResponse response, ModelMap model,@RequestParam Map<String, Object> params) throws Exception{
		LOGGER.info("#Call /json/excuReg.do");
		LOGGER.info("#params : "+ params);
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		int seq = 0;
		int result = 0;
		
		//Seq 추출 
		seq = seqService.selectSeq(params);
		
		params.put("refIdx", seq);
		params.put("boardNo", seq);
		
		//파일 첨부 
		try {

			fileResult = fileService.insertFileInfo(request, params);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//임원 등록 
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = excuService.excuReg(params);
			json = mapper.writeValueAsString(result);
		}catch(Exception e) {
			e.printStackTrace();
		};
		out.print(json);
		out.flush();
		out.close();
	}
	
	/*노출 순서 중복 확인*/
	@RequestMapping(value = "/admin/json/excuNumChk.do", method = RequestMethod.POST)
	public void excuNumChk(HttpServletRequest request, HttpServletResponse response,@RequestParam Map<String, Object> params) throws Exception{
		LOGGER.info("#Call json/excuNumChk.do");
		LOGGER.info("#params :"+params);
		
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int count = 0;
		
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
            
			count = excuService.excuNumChk(params);
					
			json = mapper.writeValueAsString(count);
			System.out.println(json + "제이슨제이슨");
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("count >>>" + json);

		out.print(json);
		out.flush();
		out.close();		
	}
	
	/*임원현황 수정 페이지*/
	@RequestMapping(value = "/admin/excuModify.do")
	public String excuModify(HttpServletRequest request, HttpServletResponse response, ModelMap model,@RequestParam Map<String, Object> params) throws Exception{
		LOGGER.info("# Call excuModify.do");
		LOGGER.info("params : " + params);
		
		Map<String,Object> result = excuService.getExcu(params);	
		List<Map<String,Object>> etCode = excuService.getExcuType();
		
		model.addAttribute("etCode",etCode);
		model.addAttribute("result",result);
		model.addAttribute("params",params);
		return "/view/admin/content/contentAdminExcuModify";
	}
	
	/*임원현황 수정 data */
	@RequestMapping(value = "/admin/json/excuModify.do", method = RequestMethod.POST)
	public void excuModifyData(HttpServletResponse response, MultipartHttpServletRequest request, ModelMap model,@RequestParam Map<String, Object> params) throws Exception{
		LOGGER.info("# Call excuModifyData.do");
		LOGGER.info("params : " + params);
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = excuService.excuModify(params);
			System.out.println("------------------------->>>" + result);
			json = mapper.writeValueAsString(result);			
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();		
	}
	
	//임원 파일 업데이트
	@RequestMapping(value = "/admin/json/excuFileUpdate.do", method = RequestMethod.POST)
	public void bannerFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#Call excuFileUpdate.do");
		LOGGER.info("#params :"+params);
		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		try {
			String[] filePathArr = params.get("filePath").toString().split(","); //사용여부  
			ArrayList<String[]> delYnList = new ArrayList<String[]>();
			ArrayList<String[]> idxList = new ArrayList<String[]>();

			for(int i=0; i<filePathArr.length; i++) {
				String filePath = filePathArr[i];
				delYnList.add(params.get("delYn"+filePath).toString().split(","));
				idxList.add(params.get("idx"+filePath).toString().split(","));
			}
			
			
			List<Map<String, Object>> fileResult = null;
			List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
			params.put("refIdx", params.get("boardNo"));		
		
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 파일 첨부 */
			fileResult = fileService.insertFileInfo(request, params);

			/* 파일변경여부있을시 파일삭제*/
			for(int i=0; i<delYnList.size(); i++) {
				for(int j=0; j<delYnList.get(i).length; j++) {
					if("Y".equals(delYnList.get(i)[j])) {
						params.put("idx", idxList.get(i)[j]);
						params.put("orgIdx", idxList.get(i)[j]);
						params.put("delYn", delYnList.get(i)[j]);
						
						//파일 조회
						fileList = fileService.selectFileList(params);
						fileList = CamelUtil.convertListMap(fileList);
		
						String filePath = fileList.get(0).get("filePath").toString();
						String stFileNm = fileList.get(0).get("stFileNm").toString();
						File file = new File(filePath + stFileNm); 
						if( file.exists() ){ 
							file.delete();
							System.out.println("파일삭제");
						}else {
							System.out.println("파일없음");
						}
						
						//파일 삭제
						fileService.filedel(params);
					}
				}
			}
			
			json = mapper.writeValueAsString(fileResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();
	}
	
	@RequestMapping(value="/admin/json/excuDel.do")
	public void excuDel(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String,Object> params) throws Exception{
		
		LOGGER.info("#Call excuDel.do");
		LOGGER.info("#params : "+params);
		
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		String excuFlag = String.valueOf(params.get("fileupdateflag"));
		
		try {
			result = fileService.filedel(params);
					
			if (result > 0 ) {
				excuService.excuDel(params);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		out = response.getWriter();
		ObjectMapper mapper = new ObjectMapper();
		json = mapper.writeValueAsString(result);
		out.print(json);
		out.flush();
		out.close();		
	}
	
}
