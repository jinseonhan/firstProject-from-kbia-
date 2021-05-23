package egovframework.admin.content.ctr;

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

import egovframework.admin.content.svc.HistoryService;
import egovframework.admin.content.svc.impl.HistroyServiceImpl;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;
import egovframework.cmmn.utils.CryptoUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
public class ContentHistoryController {

	private static final Logger LOGGER = LoggerFactory.getLogger(HistroyServiceImpl.class);

	/* Server Properties */
	@Resource(name = "propertyService")
	private EgovPropertyService propertiesService;

	/** EgovTestService */
	@Resource(name = "HistoryService")
	private HistoryService historyService;
	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;

	/* 암호화 모듈 */
	private CryptoUtil cryptoUtil = new CryptoUtil();

	/**
	 * 유저계정조회화면.
	 * 
	 * @return 유저계정조회화면 주소
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/historyList.do")
	public String openContent(Map<String, Object> param) throws Exception {

		return "/view/admin/content/contentAdminHistory";
	}

	@RequestMapping(value = "/admin/historyRegist.do")
	public String openContent2(Map<String, Object> param) throws Exception {

		return "/view/admin/content/contentAdminHistoryRegist";
	}

	@RequestMapping(value = "/admin/openHistorySelet.do")
	public String open(@RequestParam Map<String, Object> params, ModelMap model) throws Exception {

		model.addAttribute("params", params);
		return "/view/admin/content/contentAdminHistoryContent";
	}

	@RequestMapping(value = "/admin/historyList.do", method = RequestMethod.POST)
	public void selectHistoryList(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> historyList = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			historyList = historyService.selectHistoryList(params);
			historyList = CamelUtil.convertListMap(historyList);
			json = mapper.writeValueAsString(historyList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("historyList >>>" + historyList);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/historyRegist.do", method = RequestMethod.POST)
	public void historyRegist(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		int seq = 0;

		System.out.println(params);
		seq = seqService.selectSeq(params);
		params.put("boardNo", seq);

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			result = historyService.historyRegist(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/selectHistory.do", method = RequestMethod.POST)
	public void selectHistory(HttpServletResponse res, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");

		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectHistory = new ArrayList<Map<String, Object>>();

		try {
			out = res.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectHistory = historyService.selectHistory(params);
			selectHistory = CamelUtil.convertListMap(selectHistory);
			json = mapper.writeValueAsString(selectHistory);
		} catch (Exception e) {
			e.printStackTrace();
		}
		LOGGER.info("pupList >>>" + selectHistory);

		out.print(json);
		out.flush();
		out.close();
	}

	@RequestMapping(value = "/admin/historyDelete.do", method = RequestMethod.POST)
	public void deleteHistory(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {
		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;

		try {

			result = historyService.deleteHistory(params);

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

	@RequestMapping(value = "/admin/historyupdate.do", method = RequestMethod.POST)
	public void historyupdate(HttpServletResponse res, HttpServletRequest request,
			@RequestParam Map<String, Object> params) throws Exception {

		String encKey = propertiesService.getString("common.encrypt.key");
		LOGGER.info("@@ encKey : " + encKey);

		res.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;

		try {

			result = historyService.historyupdate(params);

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

}
