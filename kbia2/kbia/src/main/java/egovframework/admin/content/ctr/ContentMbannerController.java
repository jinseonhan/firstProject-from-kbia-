package egovframework.admin.content.ctr;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
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

import egovframework.admin.content.svc.MbannerService;
import egovframework.admin.content.svc.impl.MbannerServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class ContentMbannerController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MbannerServiceImpl.class);

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
	@Resource(name = "MbannerService")
	private MbannerService mbannerService;


	/**
	 * 유저계정조회화면.
	 * 
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/MbannerList.do")
	public String openContent(Map<String, Object> param) throws Exception {

		return "/view/admin/content/contentAdminMbannerList";
	}

	@RequestMapping(value = "/admin/MbannerRegist.do")
	public String openContent2(Map<String, Object> param) throws Exception {

		return "/view/admin/content/contentAdminMbannerRegist";
	}

	@RequestMapping(value = "/admin/openMbannerSelet.do")
	public String open(@RequestParam Map<String, Object> params, ModelMap model) throws Exception {

		model.addAttribute("params", params);
		return "/view/admin/content/contentAdminMbannerContent";
	}

	@RequestMapping(value = "/admin/MbannerList.do", method = RequestMethod.POST)
	public void selectPupList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> mbannerList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			mbannerList = mbannerService.selectMabnnerList(params);
			mbannerList = CamelUtil.convertListMap(mbannerList);
			json = mapper.writeValueAsString(mbannerList);
			System.out.println(json + "제이슨제이슨");
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("mbannerList >>>" + mbannerList);

		out.print(json);
		out.flush();
		out.close();
	}
	
	

	@RequestMapping(value = "/admin/MbannerRegist.do", method = RequestMethod.POST)
	public void MbannerRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {

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
			result = mbannerService.MbannerRegist(params);

			// max = pupService.popMax(params);

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
		
	}

	@RequestMapping(value = "/admin/Mbannercheck.do", method = RequestMethod.POST)
	public void locationNcheck(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int count = 0;

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
            
			count = mbannerService.locationNcheck(params);

			json = mapper.writeValueAsString(count);
			System.out.println(json + "제이슨제이슨");
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("count >>>" + count);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/selectMbanner.do", method = RequestMethod.POST)
	public void selectMbanner(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectMbanner = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectMbanner = mbannerService.selectMbanner(params);
			selectMbanner = CamelUtil.convertListMap(selectMbanner);
			json = mapper.writeValueAsString(selectMbanner);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectMbanner >>>" + selectMbanner);

		out.print(json);
		out.flush();
		out.close();
	}
	
	
	@RequestMapping(value = "/admin/selectCheck.do", method = RequestMethod.POST)
	public void selectCheck(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectCheck = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectCheck = mbannerService.selectCheck(params);
			selectCheck = CamelUtil.convertListMap(selectCheck);
			json = mapper.writeValueAsString(selectCheck);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectCheck >>>" + selectCheck);

		out.print(json);
		out.flush();
		out.close();
	}
	
	
	
	// 파일 리스트 검색
	@RequestMapping(value = "/admin/fileList.do", method = RequestMethod.POST)
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

	//배너글 업데이트
	@RequestMapping(value = "/admin/Mbannerupdate.do", method = RequestMethod.POST)
	public void mbannerUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = mbannerService.mbannerUpdate(params);

			json = mapper.writeValueAsString(result);			
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	//배너 파일 업데이트
	@RequestMapping(value = "/admin/bannerFileUpdate.do", method = RequestMethod.POST)
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
	
	@RequestMapping(value = "/admin/MbannerDelete.do", method = RequestMethod.POST)
	public void deleteMbanner(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		int result = 0;

		try {

			result = mbannerService.deleteMbanner(params);
				fileService.filedel(params);

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
	
	
	

}
