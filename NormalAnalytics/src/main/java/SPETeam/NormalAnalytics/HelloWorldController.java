package SPETeam.NormalAnalytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.Access;

@Controller
public class HelloWorldController {

    @GetMapping("/hello")
    @ResponseBody
    public String helloWorld(){
        return "Hello world";
    }
}
