package com.unitbv.accessGatewayManager.controller;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@RestController
@RequestMapping("/")
public class WebController {

    /**
     * The Constant LOGGER.
     */
    private static final Logger LOGGER = LogManager.getLogger();
    @Autowired
    public RequestMappingHandlerMapping requestMappingHandlerMapping;

    /**
     * @return index page
     */
    @RequestMapping("/")
    public void main(HttpServletResponse response) throws IOException {
        LOGGER.info("redirecting to index");
        response.sendRedirect("/index.html");
    }

    @RequestMapping("/#/*")
    public void redirectng(HttpServletResponse response) throws IOException {
        LOGGER.info("redirecting to index");
        response.sendRedirect("/index.html");
    }

    @RequestMapping("/endpoints")
    public @ResponseBody Object showEndpointsAction() throws SQLException {
        return requestMappingHandlerMapping.getHandlerMethods().keySet().stream()
                .map(t -> (t.getMethodsCondition().getMethods().size() == 0 ? "GET"
                        : t.getMethodsCondition().getMethods().toArray()[0]) + " "
                        + t.getPatternsCondition().getPatterns().toArray()[0])
                .toArray();
    }
}
