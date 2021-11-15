package SPETeam.NormalAnalytics.Database;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Tutors")
public class Tutors {
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
