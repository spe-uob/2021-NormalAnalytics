package SPETeam.NormalAnalytics.Database.Tables;

import SPETeam.NormalAnalytics.Database.Repositories.AttendanceId;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="attendance")
public class AttendanceTable {
    @EmbeddedId
    AttendanceId id;

    @Column(name="attendance") @Getter @Setter
    float attendance;
}
