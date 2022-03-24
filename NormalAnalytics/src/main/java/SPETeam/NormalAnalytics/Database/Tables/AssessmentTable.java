package SPETeam.NormalAnalytics.Database.Tables;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="assessment")
public class AssessmentTable {
    @Id @Column(name="id") @GeneratedValue(strategy = GenerationType.IDENTITY) @Getter
    int id;

    @Column(name="name") @NotNull @Getter @Setter
    String name;

    @Column(name="summative") @NotNull @Getter @Setter
    boolean summative;

    @ManyToOne @JoinColumn(name = "unit") @NotNull @Getter @Setter
    UnitTable unit;
}
