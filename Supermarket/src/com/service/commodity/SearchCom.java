package com.service.commodity;

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
 * Servlet implementation class SearchCom
 */
@WebServlet("/SearchCom")
public class SearchCom extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchCom() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String account = (String)session.getAttribute("acconut");
		String all = (String)request.getParameter("all");
		System.out.println("all:"+all);
		String comno = (String)request.getParameter("comno");
		System.out.println("comno:"+comno);
		String comname = "%"+(String)request.getParameter("comname")+"%";
		System.out.println("comname:"+comname);
		String sortno = (String)request.getParameter("sortno");
		System.out.println("sortno:"+sortno);
		String price1 = (String)request.getParameter("price1");
		System.out.println("price1:"+price1);
		String price2 = (String)request.getParameter("price2");
		System.out.println("price2:"+price2);
		
		
		String params[] = null;
		
		DBO db = new DBO();
		ResultSet rs = null;
		String sql = null;

		JSONObject json = new JSONObject();
		JSONArray js = new JSONArray();
		Boolean status = false;
		String detail = null;
		try {
			if(db.getConn()!=null){
				System.out.println("连接成功！");
			}
			if(all.equals("true")){
				params = new String[]{};
				sql = new String("SELECT commodity.comno,comname,price,sortname,supname,wareamount FROM commodity,sort,supply,warehouse "+
				"WHERE commodity.comno=warehouse.comno AND commodity.sortno=sort.sortno AND commodity.supno=supply.supno");
			}else if(!comno.equals("")){
				params = new String[]{comno};
				sql = new String("SELECT commodity.comno,comname,price,sortname,supname,wareamount FROM commodity,sort,supply,warehouse "+
				"WHERE commodity.comno=warehouse.comno AND commodity.sortno=sort.sortno AND commodity.supno=supply.supno AND commodity.comno=?");
			}else{
				String sql1="",sql2="",sql3="",sql4="";
				if(!comname.equals("%%")){
					sql1=" AND comname LIKE '"+comname+"'";
				}
				if(!sortno.equals("0")){
					sql2=" AND commodity.sortno="+sortno;
				}
				if(!price1.equals("")){
					sql3=" AND price>="+price1;
				}
				if(!price2.equals("")){
					sql4=" AND price<="+price2;
				}
				params = new String[]{};
				sql="SELECT commodity.comno,comname,price,sortname,supname,wareamount FROM commodity,sort,supply,warehouse "+
				"WHERE commodity.comno=warehouse.comno AND commodity.sortno=sort.sortno AND commodity.supno=supply.supno" +sql1+sql2+sql3+sql4;
			}
			
			rs = db.executeQuery(sql, params);
			if(rs.next()){
				status = true;
				detail = new String("查询成功！");
			}else{
				detail = new String("查询失败！");
			}
			rs = db.executeQuery(sql, params);
			while(rs.next()){
				JSONObject temp = new JSONObject();
				temp.put("comno", rs.getInt(1));
				temp.put("comname", rs.getString(2));
				temp.put("price", rs.getFloat(3));
				temp.put("sortname", rs.getString(4));
				temp.put("supname", rs.getString(5));
				temp.put("wareamount", rs.getInt(6));
				js.put(temp);
			}
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);
			out.println(json.toString());
			System.out.println(json.toString());
			db.closeAll();
		} catch (ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
