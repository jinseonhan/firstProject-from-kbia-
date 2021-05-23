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

import egovframework.admin.content.svc.OrganService;
import egovframework.cmmn.seq.svc.SeqService;
import egovframework.cmmn.utils.CamelUtil;

@Controller
public class ContentOrganController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ContentOrganController.class);

	/** OrganService **/
	@Resource
	private OrganService oService;

	/** SeqService */
	@Resource(name = "seqService")
	private SeqService seqService;

	/*
	 * 조직도 화면으로 이동
	 */
	@RequestMapping(value = "/admin/moveOrganList.do")
	public String moveOrganList(ModelMap map, @RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call organList.do");
		map.addAttribute("search", params);
		return "/view/admin/content/contentAdminOrganList";
	}

	/*
	 * 조직도 등록화면으로 이동
	 */
	@RequestMapping(value = "/admin/moveOrganReg.do")
	public String moveOrganReg(ModelMap map, @RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call moveOrganReg.do");

		map.addAttribute("groupList", oService.getGroupList());
		map.addAttribute("search", params);

		return "/view/admin/content/contentAdminOrganRegist";
	}

	/*
	 * 조직도 수정페이지로 이동
	 */
	@RequestMapping(value = "/admin/moveOrganMod.do")
	public String moveOrganMod(ModelMap map, @RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call moveOrganMod.do");
		LOGGER.info("params : " + params);

		map.addAttribute("groupList", oService.getGroupList());
		map.addAttribute("organ", oService.getOrgan(params));
		map.addAttribute("search", params);

		return "/view/admin/content/contentAdminOrganModify";
	}

	/*
	 * 조직도 List 조회
	 */
	@RequestMapping(value = "/admin/organList.do")
	public void getOrganList(HttpServletResponse response, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call organList.do ajax");
		LOGGER.info("params : " + params);

		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		List<Map<String, Object>> organList = new ArrayList<>();

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			organList = oService.getOrganList(params);
			organList = CamelUtil.convertListMap(organList);
			json = mapper.writeValueAsString(organList);
			System.out.println(json + " ## Json");

		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/*
	 * 조직도 등록
	 */
	@RequestMapping(value = "/admin/organReg.do")
	public void organReg(HttpServletRequest request, HttpServletResponse response,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call organReg.ajax");
		LOGGER.info("params : " + params);

		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;
		int seq = 0;

		seq = seqService.selectSeq(params);
		params.put("seq", seq);

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			result = oService.organReg(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/*
	 * 조직도 수정
	 */
	@RequestMapping(value = "/admin/organModify.do")
	public void organModify(HttpServletRequest request, HttpServletResponse response,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call organModify.do");
		LOGGER.info("params : " + params);

		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			result = oService.organModify(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/*
	 * 조직도 삭제
	 */
	@RequestMapping(value = "/admin/organDelete.do")
	public void organDelete(HttpServletRequest request, HttpServletResponse response,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call organDelete.do");
		LOGGER.info("params : " + params);

		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		int result = 0;

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			result = oService.organDelete(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	/*
	 * 노출순서 중복 체크
	 */
	@RequestMapping(value = "/admin/organLocChk.do")
	public void chkLocationN(HttpServletRequest request, HttpServletResponse response,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call organLocChk.do");
		LOGGER.info("params : " + params);

		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		String json = null;
		boolean result = false;

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			result = oService.chkLocationN(params);
			json = mapper.writeValueAsString(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(result);
		out.flush();
		out.close();
	}

	/*
	 * 부회장 / 부이사장, 상무 / 사무국장 중복 체크
	 */
	@RequestMapping(value = "/admin/chkHigher.do")
	public void chkHigher(HttpServletRequest request, HttpServletResponse response,
			@RequestParam Map<String, Object> params) throws Exception {
		LOGGER.info("# Call chkHigher.do");
		LOGGER.info("params : " + params);

		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = null;
		boolean result = false;

		try {
			out = response.getWriter();

			result = oService.chkHigher(params);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(result);
		out.flush();
		out.close();
	}
}
