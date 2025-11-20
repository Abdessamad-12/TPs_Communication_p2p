package exple1;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class BlacklistFilter implements Filter {

    private String[] blacklistedNames;

    @Override
    public void init(FilterConfig filterConfig) {
        String blacklist = filterConfig.getInitParameter("blacklist");
        blacklistedNames = blacklist.split(",");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String name = req.getParameter("nom");

        if (name != null) {
            for (String bad : blacklistedNames) {
                if (name.equalsIgnoreCase(bad.trim())) {

                    response.setContentType("text/html;charset=UTF-8");
                    response.getWriter().println("<h1>Accès refusé : Nom interdit !</h1>");
                    return;
                }
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() { }
}
