package SPETeam.NormalAnalytics.Database.Tables;

import SPETeam.NormalAnalytics.Database.IGivesEntity;
import SPETeam.NormalAnalytics.Database.Repositories.AttendanceId;
import SPETeam.NormalAnalytics.entity.Responses.AttendancePoint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="attendance")
public class AttendanceTable implements IGivesEntity<AttendancePoint> {
    @EmbeddedId @Getter
    AttendanceId id;

    @ManyToOne
    @MapsId("student")
    @JoinColumn(name="student") @Getter @Setter
    StudentTable student;

    @ManyToOne
    @MapsId("unit")
    @JoinColumn(name="unit") @Getter @Setter
    UnitTable unit;

    @Column(name="present") @Getter @Setter
    boolean present;

    @Override
    public AttendancePoint asData(){
        AttendancePoint aPoint = new AttendancePoint();
        aPoint.setDate(id.getDate());
        aPoint.setPresent(present);
        return aPoint;
    }
}
