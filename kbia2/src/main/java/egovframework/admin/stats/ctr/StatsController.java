/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.admin.stats.ctr;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import org.springframework.ui.ModelMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.cmmn.utils.CamelUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.user.account.svc.AccountUserService;
import egovframework.user.login.svc.impl.LoginUserServiceImpl;
import egovframework.user.main.svc.MainUserService;


/**
 * @Class Name : AccountUserController.java
 * @Description : AccountUser Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021-01-10 지승배           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2021-01-10
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class StatsController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginUserServiceImpl.class);
	
	/** EgovTestService */
	@Resource(name = "mainUserService")
	private MainUserService mainUserService;

	/* Server Properties */
	@Resource(name="propertyService")
	private EgovPropertyService propertiesService;
	
	/**
	 * 모든통계.
	 * @return 모든통계 
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openAllStats.do")
	public String openAllStats(Map<String, Object> param) throws Exception {		
		
		return "/view/admin/stats/allStats";
	}
	
	/**
	 * 월통계.
	 * @return 월통계 
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openMonthStats.do")
	public String openMonthStats(Map<String, Object> param) throws Exception {		
		
		return "/view/admin/stats/monthStats";
	}
	
	/**
	 * 일통계.
	 * @return 월통계 
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/openDayStats.do")
	public String openDayStats(Map<String, Object> param) throws Exception {		
		
		return "/view/admin/stats/dayStats";
	}
	
	/**
	 * 로그조회 
	 * 
	 * @param response
	 * @param request
	 * @param model
	 * @param params
	 */
	@RequestMapping(value = "/admin/selectAllStatslist.do", method = RequestMethod.POST)
	public void selectAllStatslist(HttpServletResponse response, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) {
		response.setContentType("application/json; charset=utf-8");

		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectAllStatslist = new ArrayList<Map<String, Object>>();

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectAllStatslist = mainUserService.selectAllStatslist(params); // 일치하는 값을 list로 반환
			selectAllStatslist = CamelUtil.convertListMap(selectAllStatslist);
			json = mapper.writeValueAsString(selectAllStatslist);
		} catch (Exception e) {
			e.printStackTrace();
		}


		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 월로그조회 
	 * 
	 * @param response
	 * @param request
	 * @param model
	 * @param params
	 */
	@RequestMapping(value = "/admin/selectMonthStatslist.do", method = RequestMethod.POST)
	public void selectMonthStatslist(HttpServletResponse response, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) {
		response.setContentType("application/json; charset=utf-8");

		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectMonthStatslist = new ArrayList<Map<String, Object>>();

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectMonthStatslist = mainUserService.selectMonthStatslist(params); // 일치하는 값을 list로 반환
			selectMonthStatslist = CamelUtil.convertListMap(selectMonthStatslist);
			json = mapper.writeValueAsString(selectMonthStatslist);
		} catch (Exception e) {
			e.printStackTrace();
		}


		out.print(json);
		out.flush();
		out.close();
	}
	
	/**
	 * 일로그조회 
	 * 
	 * @param response
	 * @param request
	 * @param model
	 * @param params
	 */
	@RequestMapping(value = "/admin/selectDayStatslist.do", method = RequestMethod.POST)
	public void selectDayStatslist(HttpServletResponse response, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) {
		response.setContentType("application/json; charset=utf-8");

		PrintWriter out = null;
		String json = null;

		List<Map<String, Object>> selectDayStatslist = new ArrayList<Map<String, Object>>();

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			selectDayStatslist = mainUserService.selectDayStatslist(params); // 일치하는 값을 list로 반환
			selectDayStatslist = CamelUtil.convertListMap(selectDayStatslist);
			json = mapper.writeValueAsString(selectDayStatslist);
		} catch (Exception e) {
			e.printStackTrace();
		}


		out.print(json);
		out.flush();
		out.close();
	}
	
	
	/**
	 * 로그카운트조회 
	 * 
	 * @param response
	 * @param request
	 * @param model
	 * @param params
	 */
	@RequestMapping(value = "/admin/selectAllStatsCnt.do", method = RequestMethod.POST)
	public void selectAllStatsCnt(HttpServletResponse response, HttpServletRequest request, ModelMap model,
			@RequestParam Map<String, Object> params) {
		response.setContentType("application/json; charset=utf-8");

		PrintWriter out = null;
		String json = null;

		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();

			Map<String, Object> selectAllStatsCnt = mainUserService.selectAllStatsCnt(params); 
			selectAllStatsCnt = CamelUtil.convertMap(selectAllStatsCnt);
			json = mapper.writeValueAsString(selectAllStatsCnt);
		} catch (Exception e) {
			e.printStackTrace();
		}

		out.print(json);
		out.flush();
		out.close();
	}

	
}
