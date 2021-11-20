package SPETeam.NormalAnalytics.controller;

import SPETeam.NormalAnalytics.entity.User;
import SPETeam.NormalAnalytics.utils.JwtUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    private final String USERNAME = "admin";
    private final String PASSWORD = "123123";

    @PostMapping("/login")
    public String login(@RequestBody User user){
        if(USERNAME.equals(user.getUsername()) && PASSWORD.equals(user.getPassword())){
            //add token
            user.setToken(JwtUtil.createToken());
            return user.getToken();
        }
        return "password incorrect";
    }

    @GetMapping("/verifyToken")
    public Boolean verifyToken(HttpServletRequest request){
        String token = request.getHeader("token");
        return JwtUtil.verifyToken(token);
    }
}
