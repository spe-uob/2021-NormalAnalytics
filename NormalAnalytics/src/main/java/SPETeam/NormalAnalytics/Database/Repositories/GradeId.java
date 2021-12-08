package SPETeam.NormalAnalytics.Database.Repositories;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class GradeId implements Serializable {
    @Column(name="student")
    private int student;
    @Column(name="assessment")
    private int assessment;
}
