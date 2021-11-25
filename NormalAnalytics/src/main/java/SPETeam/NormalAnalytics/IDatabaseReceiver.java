package SPETeam.NormalAnalytics;

import org.springframework.stereotype.Component;

@Component
public interface IDatabaseReceiver {
    //Could send profile data if login is confirmed
    boolean VerifyLogin(String name,String password);
}
