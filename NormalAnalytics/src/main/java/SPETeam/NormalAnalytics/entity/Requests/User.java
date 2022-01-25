package SPETeam.NormalAnalytics.entity.Requests;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.Entity;

@Data
@Entity
public class User {
    private String username;
    private String password;
    private String token;
}
