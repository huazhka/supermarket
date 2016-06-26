package com.service.stock;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.dao.DBO;

/**
 * Servlet implementation class InsertStock
 */
@WebServlet("/InsertStock")
public class InsertStock extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public InsertStock() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String comno = request.getParameter("comno");
		String stano = "1";// request.getParameter("stano");
		Date currDate = (Date) Calendar.getInstance().getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateTime = sdf.format(currDate);
		String stoamount = request.getParameter("stoamount");

		String params[] = new String[] { comno, stano, dateTime, stoamount };

		DBO db = new DBO();
		int n = 0;
		String sql = null;

		JSONObject json = new JSONObject();
		JSONObject js = new JSONObject();
		Boolean status = false;
		String detail = null;
		try {
			if (db.getConn() != null) {
				System.out.println("连接成功！");
			}
			sql = new String(
					"INSERT INTO stock(comno,stano,stodate,stoamount) VALUES(?,?,?,?)");
			n = db.executeUpdate(sql, params);
			if (n != 0) {
				status = true;
				detail = new String("进货成功！");
			} else {
				detail = new String("进货失败！");
			}
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);
			out.println(json.toString());
			db.closeAll();
		} catch (ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
