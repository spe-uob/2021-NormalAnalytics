package SPETeam.NormalAnalytics;

import org.springframework.stereotype.Component;

@Component("TestingDatabaseReceiver")
public class TestingDatabaseReceiver implements IDatabaseReceiver {
    public String VerifyLogin(String name,String password){
        return "test";
    }
}
