package SPETeam.NormalAnalytics.Database.Tables;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(name="tutor_group")
public class TutorGroupTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id") @Getter
    @Setter
    int id;
    @Column(name="name") @Getter @Setter
    String name;
    @ManyToOne @JoinColumn(name="tutor") @Getter @Setter
    TutorTable tutor;
}
