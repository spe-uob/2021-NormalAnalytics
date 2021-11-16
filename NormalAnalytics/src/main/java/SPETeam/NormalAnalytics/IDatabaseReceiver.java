package SPETeam.NormalAnalytics;

import org.springframework.stereotype.Component;

public interface IDatabaseReceiver {
    //Could send profile data if login is confirmed
    String VerifyLogin(String name,String password);
}
