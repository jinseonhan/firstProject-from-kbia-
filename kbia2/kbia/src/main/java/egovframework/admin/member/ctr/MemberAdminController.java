package egovframework.admin.member.ctr;

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

import egovframework.admin.member.svc.MemberAdminService;
import egovframework.admin.member.svc.impl.MemberAdminServiceImpl;
import egovframework.cmmn.file.svc.FileService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class MemberAdminController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MemberAdminServiceImpl.class);
	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;

	/** FileServiece */
	@Resource(name = "fileService")
	private FileService fileService;

	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	@Resource(name = "MemberAdminService")
	private MemberAdminService memberAdminService;

	/**
	 * 회원사 검색화면
	 * 
	 * @param param
	 * @return 회원사 검색화면 주소
	 * @throws Exception
	 */
	@RequestMapping(value = "/admin/memberAdminList.do")
	public String openMemberAdminList(Map<String, Object> param) throws Exception {

		return "/view/admin/member/memberAdminList";
	}

	@RequestMapping(value = "/admin/memberAdminRegist.do")
	public String openMemberAdminRegist(Map<String, Object> param) throws Exception {

		return "/view/admin/member/memberAdminRegist";
	}
	
	/** 회원정보 수정 페이지이동
	 * @param res
	 * @param request
	 * @param model
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/admin/memberAdminRevise.do")
	public String openMemberRevise(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) throws Exception {

		model.addAttribute("param", param);

		return "/view/admin/member/memberAdminRevise";
	}
	/**
	 * 회원정보 불러오기
	 * 
	 * @param response
	 * @param request
	 * @param model
	 * @param params
	 */
	@RequestMapping(value = "/admin/selectmemberList.do", method = RequestMethod.POST)
	public void selectmemberList(HttpServletResponse response, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) {
		response.setContentType("application/json; charset=utf-8");
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectmemberList = new ArrayList<Map<String, Object>>();
//		Iterator<String> keys = params.keySet().iterator();
//        while (keys.hasNext()){
//            String key = keys.next();
//            System.out.println("KEY : " + key); // Key2 , Key1, Key4, Key3, Key5
//        }
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectmemberList = memberAdminService.selectmemberList(params); // 일치하는 값을 list로 반환
			selectmemberList = CamelUtil.convertListMap(selectmemberList);
			json = mapper.writeValueAsString(selectmemberList);
		} catch (Exception e) {
			e.printStackTrace();
		}

		LOGGER.info("selectmemberList >>>" + selectmemberList);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/memberAdminRegist.do", method = RequestMethod.POST)
	public void memberAdminRegist(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("application/json; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> fileResult = null;
		int seq = 0;
		int result = 0;

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

		/* 글 등록 */
		result = memberAdminService.memberAdminRegist(params);

		if (result > 0) {

			try {
				out = res.getWriter();
				ObjectMapper mapper = new ObjectMapper();

				json = mapper.writeValueAsString(result);
			} catch (Exception e) {
				e.printStackTrace();
			}
			out.print(json);
			out.flush();
			out.close();
		}

	}
	@RequestMapping(value = "/admin/AdminMemberLogoFileDown.do")
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
	
	
	
	@RequestMapping(value = "/memberAdminReviseUpdate.do", method = RequestMethod.POST)
	public void memberAdminReviseUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		res.setContentType("application/json; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		// 형변환
		params.put("boardNo", Integer.parseInt((String) params.get("boardNo")));
		//String delYn= String.valueOf(params.get("delYn"));
		
		int result = 0;
		List<Map<String, Object>> fileResult = null;
		//System.out.println(params.get("upFIle")+"<<<<< upFile");
		/* 글 등록 */		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			/* 글 등록 */
			result = memberAdminService.memberAdminReviseUpdate(params);

			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.print(json);
		out.flush();
		out.close();

	}

	// 파일 리스트 검색
		@RequestMapping(value = "/admin/MemberFile.do", method = RequestMethod.POST)
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

	
	@RequestMapping(value = "/memberAdminUserDelete.do", method = RequestMethod.POST)
	public String memberAdminUserDelete(HttpServletResponse res, 
			@RequestParam Map<String, Object> param) throws Exception {
		res.setContentType("application/json; charset=utf-8");
		// 형변환
		param.put("boardNo", Integer.parseInt((String) param.get("boardNo")));
		
		// refIdx , refType param에 담아야 함
		int result = 0;
		
		int resultF = 0;
			// 1. 게시물을 정지시키고(완료)
			result = memberAdminService.memberAdminUserDelete(param);
			
			// 2. 저장된 사진이 있으면 그값또한 변경한다. 파일이 없을 경우	
			if(result>0) {
				resultF = fileService.filedel(param);
			}

			
				return "redirect:/admin/memberAdminList.do";
		
	}
	/** 회원 상세보기
	 * @param res
	 * @param request
	 * @param model
	 * @param param
	 */
	@RequestMapping(value = "/admin/loadAdminMember.do", method = RequestMethod.POST)
	public void loadAdminMember(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> param) {
		
		
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);
		res.setContentType("text/html; charset=utf-8");

		PrintWriter out = null;
		String json = null;

		param.put("boardNo", Integer.parseInt((String) param.get("boardNo")));
		Map<String, Object> loadAdminMember = new HashMap<>();
		
		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			loadAdminMember = memberAdminService.loadAdminMember(param);
			loadAdminMember = CamelUtil.convertMap(loadAdminMember);
			json = mapper.writeValueAsString(loadAdminMember);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("loadAdminMember >>>" + loadAdminMember);
		out.print(json);
		out.flush();
		out.close();
	}
	
	//MEMBER 파일 업데이트
	@RequestMapping(value = "/admin/memberFileUpdate.do", method = RequestMethod.POST)
	public void memberFileUpdate(HttpServletResponse res, final MultipartHttpServletRequest request,
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
						}else {
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
	
}

