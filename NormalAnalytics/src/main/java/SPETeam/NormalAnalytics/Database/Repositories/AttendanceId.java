package SPETeam.NormalAnalytics.Database.Repositories;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Date;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Data
public class AttendanceId implements Serializable {
    @Column(name="unit")
    private int unit;
    @Column(name="student")
    private int student;
    @Column(name="date")
    private Date date;
}
