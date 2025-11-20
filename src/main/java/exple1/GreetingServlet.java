package exple1;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class GreetingServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        // 1) Lire le nom
        String name = request.getParameter("nom");
        if (name == null || name.trim().isEmpty()) {
            name = "Anonymous";
        } else {
            name = name.trim().toUpperCase();
        }

        // 2) Calculer le gain
        double gain = Math.random() * 10;
        String formattedGain = String.format("%.2f", gain);

        // 3) Placer les données dans la requête
        request.setAttribute("nom", name);
        request.setAttribute("gain", formattedGain);

        // 4) Rediriger vers la JSP
        request.getRequestDispatcher("/result.jsp").forward(request, response);
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}