package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.AssessmentTable;
import SPETeam.NormalAnalytics.Database.Tables.GradeTable;
import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GradesRepository extends CrudRepository<GradeTable,GradeId> {
    List<GradeTable> findGradeTablesByStudent(StudentTable student);
    List<GradeTable> findGradeTablesByAssessmentOrderByGrade(AssessmentTable student);
}
