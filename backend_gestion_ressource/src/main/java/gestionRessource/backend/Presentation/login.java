package gestionRessource.backend.Presentation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import gestionRessource.backend.controler.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.dto.AuthentificationDTO;
import gestionRessource.backend.model.User;

@Controller
public class login {

    @Autowired
    private UserControler userControler;

    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // This will look for login.jsp or login.html
    }

    @PostMapping("/Login")
    public String handleLogin(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            RedirectAttributes redirectAttributes, Model model, HttpServletRequest request) {
        AuthentificationDTO authDto = new AuthentificationDTO();
        authDto.setLogin(username);
        authDto.setPassword(password);

        User user = userControler.authentification(authDto);

        if (user != null) {
            // Login successful
            HttpSession session = request.getSession();
            // Store data in the session
            session.setAttribute("user", user); // Store the actual username
           // Set a flag to indicate user is logged in

            redirectAttributes.addFlashAttribute("message", "Login successful!");
            System.out.println("l7wa");
            return "redirect:/home"; // Change to your secure page
        } else {
            // Login failed
            model.addAttribute("error", "Invalid username or password");
            return "login"; // Return to login page with error message
        }
    }


}