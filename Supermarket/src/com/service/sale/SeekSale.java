package com.service.sale;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dao.DBO;

/**
 * Servlet implementation class SeekSale
 */
@WebServlet("/SeekSale")
public class SeekSale extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SeekSale() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String saleall = request.getParameter("all");
		String saleno = request.getParameter("saleno");
		String salecomno = request.getParameter("salecomno");
		String stano = request.getParameter("stano");
		String state = request.getParameter("state");
		String dateTime = request.getParameter("saledate");
		String saleamount1 = request.getParameter("saleamount1");
		String saleamount2 = request.getParameter("saleamount2");

		String params[] = null;

		DBO db = new DBO();
		ResultSet rs = null;
		String sql = null;

		JSONObject json = new JSONObject();
		JSONArray js = new JSONArray();
		Boolean status = false;
		String detail = null;
		try {
			if (db.getConn() != null) {
				System.out.println("连接成功！");
			}
			if (saleall.equals("true")) {
				sql = new String(
						"SELECT saleno,sale.stano,commodity.comno,comname,saleamount,saledate FROM sale,commodity WHERE sale.comno=commodity.comno");
			} else if (!saleno.equals("")) {
				params = new String[] { saleno };
				sql = new String(
						"SELECT saleno,sale.stano,commodity.comno,comname,saleamount,saledate FROM sale,commodity WHERE sale.comno=commodity.comno AND saleno=?");
			} else {
				String sql1 = "", sql2 = "", sql3 = "", sql4 = "", sql5 = "", sql6 = "";
				Boolean j = false;
				if (!salecomno.equals("")) {
					sql1 = " sale.comno=" + salecomno;
					j = true;
				}
				
				if (j == true) {
					sql3 = " AND state=" + state;
				} else {
					sql3 = " state=" + state;
					j = true;
				}
				if (j == true) {
					if (dateTime.equals("1")) {
						sql4 = " AND TO_DAYS(NOW()) - TO_DAYS(saledate) <= 1";
					} else if (dateTime.equals("2")) {
						sql4 = " AND TO_DAYS(NOW()) - TO_DAYS(saledate) <= 7";
					} else {
						sql4 = " AND TO_DAYS(NOW()) - TO_DAYS(saledate) <= 30";
					}
				} else {
					if (dateTime.equals("1")) {
						sql4 = " TO_DAYS(NOW()) - TO_DAYS(saledate) <= 1";
					} else if (dateTime.equals("2")) {
						sql4 = " TO_DAYS(NOW()) - TO_DAYS(saledate) <= 7";
					} else {
						sql4 = " TO_DAYS(NOW()) - TO_DAYS(saledate) <= 30";
					}
					j = true;
				}
				if (!saleamount1.equals("")) {
					if (j == true) {
						sql5 = " AND saleamount>" + saleamount1;
					} else {
						sql5 = " saleamount>" + saleamount1;
						j = true;
					}
				}
				if (!saleamount2.equals("")) {
					if (j == true) {
						sql6 = " AND saleamount<" + saleamount2;
					} else {
						sql6 = " saleamount<" + saleamount2;
						j = true;
					}
				}
				
				if(!stano.equals("")){ 
					if(j==true){
						sql2=" AND sale.stano="+stano; 
				 	}else{
				 		sql2=" sale.stano="+stano; 
				 	}
				}
				 
				sql = "SELECT saleno,sale.stano,commodity.comno,comname,saleamount,saledate FROM sale,commodity WHERE"
						+ sql1
						+ sql3
						+ sql4
						+ sql5
						+ sql6
						+ sql2
						+ " AND sale.comno=commodity.comno";
			}

			rs = db.executeQuery(sql, params);
			if (rs.next()) {
				status = true;
				detail = new String("查询成功！");
			} else {
				detail = new String("查询失败！");
			}
			rs = db.executeQuery(sql, params);
			while (rs.next()) {
				JSONObject temp = new JSONObject();
				temp.put("saleno", rs.getInt(1));
				temp.put("stano", rs.getInt(2));
				temp.put("comno", rs.getInt(3));
				temp.put("comname", rs.getString(4));
				temp.put("saleamount", rs.getInt(5));
				temp.put("date", rs.getDate(6).toString());
				js.put(temp);
			}
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);

			System.out.print(json);
			out.println(json.toString());
			db.closeAll();
		} catch (ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
