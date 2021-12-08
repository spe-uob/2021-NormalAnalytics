package SPETeam.NormalAnalytics.Database.Tables;

import SPETeam.NormalAnalytics.Database.Repositories.GradeId;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="grades")
public class GradeTable {
    @EmbeddedId
    private GradeId gradeId;

    @ManyToOne
    @MapsId("student")
    @JoinColumn(name="student") @Getter @Setter
    StudentTable student;

    @ManyToOne
    @MapsId("assessment")
    @JoinColumn(name="assessment") @Getter @Setter
    AssessmentTable assessment;

    @Column(name="grade") @Getter @Setter
    float grade;
}
