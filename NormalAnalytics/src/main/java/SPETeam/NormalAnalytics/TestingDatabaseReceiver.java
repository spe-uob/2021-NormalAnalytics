package SPETeam.NormalAnalytics;

import org.springframework.stereotype.Component;

@Component("TestingDatabaseReceiver")
public class TestingDatabaseReceiver implements IDatabaseReceiver {
    public boolean VerifyLogin(String name,String password)
    {
        final String username = "admin";
        final String pass = "123123";
        if(name.equals(username) && password.equals(pass)) return true;
        else return false;
    }
}
