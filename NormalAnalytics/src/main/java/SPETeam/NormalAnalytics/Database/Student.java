package SPETeam.NormalAnalytics.Database;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(name="Student")
public class Student {
    @Id
    @GeneratedValue
    @Column(name="Id") @Getter @Setter
    int id;

    @Column(name="username") @Getter @Setter
    String username;

    @Column(name="firstName") @Getter @Setter
    String firstName;

    @Column(name="surname") @Getter @Setter
    String surname;

    @ManyToOne @JoinColumn(name="tutor") @Getter @Setter
    Tutors tutor;
}
