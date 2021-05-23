package egovframework.admin.notice.ctr;

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

import egovframework.admin.notice.svc.AdminNoticeService;
import egovframework.admin.notice.svc.impl.AdminNoticeServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class AdminNoticeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdminNoticeServiceImpl.class);

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
	@Resource(name = "AdminNoticeService")
	private AdminNoticeService adminnoticeService;


	/**
	 * 유저계정조회화면.
	 * 
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/NoticeList.do")
	public String openContent(Map<String, Object> param) throws Exception {

		return "/view/admin/notice/noticeList";
	}

	@RequestMapping(value = "/admin/NoticeRegist.do")
	public String openContent2(Map<String, Object> param) throws Exception {

		return "/view/admin/notice/noticeRegist";
	}

	@RequestMapping(value = "/admin/openNoticeSelet.do")
	public String open(@RequestParam Map<String, Object> params, ModelMap model) throws Exception {

		model.addAttribute("params", params);
		return "/view/admin/notice/noticeContent";
	}

	@RequestMapping(value = "/admin/NoticeList.do", method = RequestMethod.POST)
	public void selectNoticeList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> noticeList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			noticeList = adminnoticeService.selectNoticeList(params);
			noticeList = CamelUtil.convertListMap(noticeList);
			json = mapper.writeValueAsString(noticeList);
			System.out.println(json + "제이슨제이슨");
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("noticeList >>>" + noticeList);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/NoticeRegist.do", method = RequestMethod.POST)
	public void NoticeRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
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
			result = adminnoticeService.NoticeRegist(params);

			// max = pupService.popMax(params);

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(json);
		out.flush();
		out.close();
		
	}


	@RequestMapping(value = "/admin/selectNotice.do", method = RequestMethod.POST)
	public void selectNotice(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectNotice = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectNotice = adminnoticeService.selectNotice(params);
			selectNotice = CamelUtil.convertListMap(selectNotice);
			json = mapper.writeValueAsString(selectNotice);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("selectNotice >>>" + selectNotice);

		out.print(json);
		out.flush();
		out.close();
	}

	// 파일 리스트 검색
	@RequestMapping(value = "/admin/NoticeFile.do", method = RequestMethod.POST)
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

	//공지사항 업데이트
	@RequestMapping(value = "/admin/Noticeupdate.do", method = RequestMethod.POST)
	public void noticeUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		
		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			result = adminnoticeService.noticeUpdate(params);

			json = mapper.writeValueAsString(result);			
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	//공지사항 파일 업데이트
	@RequestMapping(value = "/admin/noticeFileUpdate.do", method = RequestMethod.POST)
	public void noticeFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
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
	
	
	@RequestMapping(value = "/admin/noticeDelete.do", method = RequestMethod.POST)
	public void deleteNotice(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		int result = 0;

		try {

			result = adminnoticeService.noticeDelete(params);
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
