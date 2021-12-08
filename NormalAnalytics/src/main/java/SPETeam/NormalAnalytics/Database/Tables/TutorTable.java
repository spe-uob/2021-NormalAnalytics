package SPETeam.NormalAnalytics.Database.Tables;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Tutor")
public class TutorTable {
    @Id
    @GeneratedValue @Column(name="Id") @Getter @Setter
    int id;

    @Column(name="username") @Getter @Setter
    String username;

    @Column(name="firstname") @Getter @Setter
    String firstname;

    @Column(name="surname") @Getter @Setter
    String surname;

    @Column(name="password") @Getter @Setter
    String password;
}
