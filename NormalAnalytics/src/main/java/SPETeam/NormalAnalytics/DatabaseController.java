package SPETeam.NormalAnalytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DatabaseController {
    @Autowired
    @Qualifier("TestingDatabaseReceiver")
    private IDatabaseReceiver receiver;

    @GetMapping("/login")
    @ResponseBody
    public String helloWorld(){
        return receiver.VerifyLogin("jross","donthackme");
    }
}
