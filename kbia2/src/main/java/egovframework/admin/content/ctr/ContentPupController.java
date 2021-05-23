package egovframework.admin.content.ctr;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.admin.content.svc.PupService;
import egovframework.admin.content.svc.impl.PupServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class ContentPupController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PupServiceImpl.class);

	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;

	/** FileService */
	@Resource(name = "fileService")
	private FileService fileService;

	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	/** EgovTestService */
	@Resource(name = "PupService")
	private PupService pupService;

	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * 유저계정조회화면.
	 * 
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/pupList.do")
	public String openContent(Map<String, Object> param) throws Exception {

		return "/view/admin/content/contentAdminPupList";
	}

	@RequestMapping(value = "/admin/popRegist.do")
	public String openContent2(Map<String, Object> param) throws Exception {

		return "/view/admin/content/contentAdminPopRegist";
	}

	@RequestMapping(value = "/admin/openPopSelet.do")
	public String open(@RequestParam Map<String, Object> params, ModelMap model) throws Exception {

		model.addAttribute("params", params);
		return "/view/admin/content/contentAdminPopContent";
	}

	@RequestMapping(value = "/admin/pupList.do", method = RequestMethod.POST)
	public void selectPupList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> pupList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			pupList = pupService.selectPupList(params);
			pupList = CamelUtil.convertListMap(pupList);
			json = mapper.writeValueAsString(pupList);
			System.out.println(json + "제이슨제이슨");
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("pupList >>>" + pupList);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/popRegist.do", method = RequestMethod.POST)
	public void popupRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		String seqId = null;
		int seq = 0;
		int result = 0;
		int max = 0;

		/* Seq 추출 */
		seq = seqService.selectSeq(params);

		params.put("refIdx", seq);
		params.put("boardNo", seq);

		/* 파일 첨부 */
		try {
			fileResult = fileService.insertFileInfo(request, params);

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 글 등록 */
			result = pupService.popupRegist(params);

			max = pupService.popMax(params);

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/selectPopup.do", method = RequestMethod.POST)
	public void selectPopContent(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectPopContent = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectPopContent = pupService.selectPopup(params);
			selectPopContent = CamelUtil.convertListMap(selectPopContent);
			json = mapper.writeValueAsString(selectPopContent);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info(" selectPopContent >>>" + selectPopContent);

		out.print(json);
		out.flush();
		out.close();
	}
	

	@RequestMapping(value = "/admin/popupFile.do", method = RequestMethod.POST)
	public void noticeFile(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			fileList = fileService.selectFileList(params);
			fileList = CamelUtil.convertListMap(fileList);
			json = mapper.writeValueAsString(fileList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("fileList >>>" + fileList);

		out.print(json);
		out.flush();
		out.close();

	}

	@RequestMapping(value = "/admin/popupFiledel.do")
	public int filedelete(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {
		System.out.println("파잃삭제!!!!!");
		String filePath = param.get("filePath").toString();
		String realFilNm = param.get("stFileNm").toString();
		File file = new File(filePath + realFilNm);
		int result = 0;
		if (file.exists()) {
			if (file.delete()) {

				result = fileService.filedel(param);

			}

		}

		return result;
	}

	@RequestMapping(value = "/admin/popupdate.do", method = RequestMethod.POST)
	public void popupUdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		int result = 0;

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = pupService.popupUpdate(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}
	
	//파업 파일 업데이트
		@RequestMapping(value = "/admin/PopupFileUpdate.do", method = RequestMethod.POST)
		public void bannerFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
				@RequestParam Map<String, Object> params) throws Exception {
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
	
	
	
	

	@RequestMapping(value = "/admin/popupDelete.do", method = RequestMethod.POST)
	public void deletePopup(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		int result = 0;
		String Popflag = String.valueOf(params.get("fileupdateflag"));

		try {

			result = pupService.popupDelete(params);

			if (result > 0 && "Y".equals(Popflag)) {

				fileService.filedel(params);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 글 등록 */

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
	}
	
	
	
	@RequestMapping(value = "/admin/popupFileDown.do")
	public void popupFileDown(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {

		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		fileList = fileService.selectFileList(param);
		fileList = CamelUtil.convertListMap(fileList);

		if (fileList.size() == 1) {
			Map<String, Object> fileMap = new HashMap<String, Object>();
			fileMap.put("filePath", fileList.get(0).get("filePath"));
			fileMap.put("stFileNm", fileList.get(0).get("stFileNm"));
			fileMap.put("ognFileNm", fileList.get(0).get("ognFileNm"));
			fileService.filDown(request, res, fileMap); // 파일 다운로드
		}
	}
	
	
	

}
