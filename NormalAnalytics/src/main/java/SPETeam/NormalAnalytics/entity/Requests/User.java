package SPETeam.NormalAnalytics.entity.Requests;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
public class User {
    private String username;
    private String password;
    private String token;
}
