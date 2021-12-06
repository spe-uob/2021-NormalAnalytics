package SPETeam.NormalAnalytics.controller;

import SPETeam.NormalAnalytics.IDatabaseReceiver;
import SPETeam.NormalAnalytics.entity.Responses.Token;
import SPETeam.NormalAnalytics.entity.Requests.User;
import SPETeam.NormalAnalytics.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    @Autowired
    IDatabaseReceiver receiver;

    @PostMapping("/login")
    public Token login(@RequestBody User user){
        if(receiver.VerifyLogin(user.getUsername(), user.getPassword())){
            //add token
            user.setToken(JwtUtil.createToken());
            return Token.fromUser(user);
        }
        return Token.failed();
    }
    /*
    public Token login(@RequestBody User user){
        if(receiver.VerifyLogin(user.getUsername(), user.getPassword())){
            //add token
            user.setToken(JwtUtil.createToken());
            return Token.fromUser(user);
        }
        return Token.failed();
    }*/

    @GetMapping("/verifyToken")
    public Boolean verifyToken(HttpServletRequest request){
        String token = request.getHeader("token");
        return JwtUtil.verifyToken(token);
    }
}
