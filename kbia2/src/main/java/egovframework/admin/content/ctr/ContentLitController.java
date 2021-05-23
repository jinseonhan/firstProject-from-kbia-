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

import egovframework.admin.content.svc.LitService;
import egovframework.admin.content.svc.impl.LitServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class ContentLitController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LitServiceImpl.class);
	
	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;
	
	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;
	
	/** FileService */
	@Resource(name = "fileService")
	private FileService fileService;
	
	/** EgovTestService */
	@Resource(name="LitService")
	private LitService litService;
	/**
	 * 소배너리스트 조회화면.
	 * 
	 * @return 소배너리스트 조회화면(jsp) 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/litList.do")
	public String moveLitList(Map<String, Object> param) throws Exception {
		LOGGER.info("#Call moveLitList.do");
		
		return "/view/admin/content/contentAdminLitList";
	}
	
	/**
	 * 소배너 등록화면.
	 * 
	 * @return 소배너 등록화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/litRegist.do")
	public String litRegist(Map<String, Object> param) throws Exception {
		LOGGER.info("#Call moveLitList.do");
		
		return "/view/admin/content/contentAdminLitRegist";
	}
	
	/**
	 * 소배너 자세히보기 화면.
	 * 
	 * @return 소배너 글 자세히보기 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/viewLitContent.do")
	public String viewLitContent(@RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		LOGGER.info("#Call litView.do");
		LOGGER.info("#params : " + params);
		System.out.println("params 정보 확인 -->> " + params);
		model.addAttribute("params", params);
		return "/view/admin/content/contentAdminLitContent";
	}
	
	
	/* 소배너 리스트 조회 */
	@RequestMapping(value = "/admin/selectLitList.do", method = RequestMethod.POST)
	public void selectLitList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#Call selectLitList.do");
		LOGGER.info("#params :"+params);
		
		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> litList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			litList = litService.selectLitList(params);
			litList = CamelUtil.convertListMap(litList);
			json = mapper.writeValueAsString(litList);
			System.out.println(json + "제이슨제이슨");
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("-------litList >>>" + litList);

		out.print(json);
		out.flush();
		out.close();
	}
	
	/* 소배너 등록 */
	@RequestMapping(value = "/admin/insertLitRegist.do", method = RequestMethod.POST)
	public void insertLitRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#Call insertLitRegist.do");
		LOGGER.info("#params :"+params);
		
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
			result = litService.litRegist(params);
			// max = pupService.popMax(params);

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
		
	}
	
	/* 소배너 노출순서 중복 체크 */
	@RequestMapping(value = "/admin/LitCheck.do", method=RequestMethod.POST)
	public void litCheck(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#Call LitCheck.do");
		LOGGER.info("#params :"+params);
		
		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int count = 0;

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
            
			count = litService.locationNcheck(params);

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
	
	/* 업데이트 시 노출순서 중복 체크 */
	@RequestMapping(value = "/admin/keepCheck.do", method = RequestMethod.POST)
	public void keepCheck(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#Call keepCheck.do");
		LOGGER.info("#params :"+params);
		
		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> keepCheck = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			keepCheck  = litService.keepCheck(params);
			keepCheck  = CamelUtil.convertListMap(keepCheck );
			json = mapper.writeValueAsString(keepCheck);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("keepCheck  >>>" + keepCheck );

		out.print(json);
		out.flush();
		out.close();
	}
	
	/* 소배너 상세내용 조회 */
	@RequestMapping(value = "/admin/selectLitContents.do", method = RequestMethod.POST)
	public void selectLitContents(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("#Call selectLitContents.do");
		LOGGER.info("#params :"+params);
		
		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectLitContent = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectLitContent = litService.selectLitContent(params);
			selectLitContent = CamelUtil.convertListMap(selectLitContent);
			json = mapper.writeValueAsString(selectLitContent);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectLitContent >>>" + selectLitContent);

		out.print(json);
		out.flush();
		out.close();
	}
	
	//소배너 파일 업데이트
		@RequestMapping(value = "/admin/litFileUpdate.do", method = RequestMethod.POST)
		public void bannerFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
				@RequestParam Map<String, Object> params) throws Exception {
			LOGGER.info("#Call litFileUpdate.do");
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
		
		//소배너글 업데이트
		@RequestMapping(value = "/admin/updateLit.do", method = RequestMethod.POST)
		public void updateLit(HttpServletResponse res, final MultipartHttpServletRequest request,
				@RequestParam Map<String, Object> params) throws Exception {
			LOGGER.info("#Call updateLit.do");
			LOGGER.info("#params :"+params);
			
			res.setContentType("text/html; charset=utf-8");
			PrintWriter out = null;
			String json = null;
			int result = 0;
			try {
				out = res.getWriter();
				ObjectMapper mapper = new ObjectMapper();
				result = litService.updateLit(params);
				System.out.println("------------------------->>>" + result);
				json = mapper.writeValueAsString(result);			
			} catch (Exception e) {
				e.printStackTrace();
			}

			out.print(json);
			out.flush();
			out.close();
		}
		
		/* 소배너 글 삭제 */
		@RequestMapping(value = "/admin/deleteLit.do", method = RequestMethod.POST)
		public void deleteLit(HttpServletResponse res, HttpServletRequest request,
				@RequestParam Map<String, Object> params) throws Exception {
			LOGGER.info("#Call deleteLit.do");
			LOGGER.info("#params :"+params);
			String encKey = propertiesService.getString("common.encrypt.key");
			LOGGER.info("@@ encKey : " + encKey);

			res.setContentType("text/html; charset=utf-8");
			PrintWriter out = null;
			String json = null;
			List<Map<String, Object>> fileResult = null;
			int result = 0;

			try {
				result = fileService.filedel(params);
				if (result > 0) {
					litService.deleteLit(params);
				}

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
		
		/* 소배너  팝업 리스트 조회 */
		@RequestMapping(value = "/admin/srcPopList.do", method = RequestMethod.POST)
		public void srcPopList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
				@RequestParam Map<String, Object> params) throws Exception {
			LOGGER.info("#Call srcPopList.do.do");
			LOGGER.info("#params :"+params);
			
			String encKey = propertiesService.getString("common.encrypt.key");

			LOGGER.info("@@ encKey : " + encKey);

			res.setContentType("text/html; charset=utf-8");
			PrintWriter out = null;
			String json = null;

			List<Map<String, Object>> litList = new ArrayList<Map<String, Object>>();

			try {
				out = res.getWriter();
				ObjectMapper mapper = new ObjectMapper();

				litList = litService.srcPopList(params);
				litList = CamelUtil.convertListMap(litList);
				json = mapper.writeValueAsString(litList);
				System.out.println(json + "제이슨제이슨");
			} catch (Exception e) {
				e.printStackTrace();
			}
			LOGGER.info("-------litList >>>" + litList);

			out.print(json);
			out.flush();
			out.close();
		}
		
	
}

	
