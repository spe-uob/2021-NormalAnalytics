package SPETeam.NormalAnalytics.controller;

import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import SPETeam.NormalAnalytics.IDatabaseReceiver;
import SPETeam.NormalAnalytics.entity.Responses.ResponseResult;

import SPETeam.NormalAnalytics.entity.Requests.User;
import SPETeam.NormalAnalytics.service.LoginService;
import SPETeam.NormalAnalytics.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseResult login(@RequestBody TutorTable tutor){
        return loginService.login(tutor);
    }

    @RequestMapping("/logout")
    public ResponseResult logout(){
        return loginService.logout();

    }
}
