package gestionRessource.backend.Presentation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class login {
    @GetMapping("/login")
    public String index() {

        return "login";  // This will look for /WEB-INF/jsp/index.jsp
    }
    @PostMapping("/Login")
    public String login(@RequestParam(name = "username")String username
                        ,@RequestParam(name = "password")String password) {

        return "index";  // This will look for /WEB-INF/jsp/index.jsp
    }

}
