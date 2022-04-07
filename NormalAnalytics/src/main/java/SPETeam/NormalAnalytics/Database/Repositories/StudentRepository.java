package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import SPETeam.NormalAnalytics.Database.Tables.TutorGroupTable;
import SPETeam.NormalAnalytics.Database.Tables.UnitTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends CrudRepository<StudentTable,Integer> {
    List<StudentTable> findStudentByTutorGroup(TutorGroupTable tutorGroup);
    Optional<StudentTable> findStudentTableByUsername(String username);
    List<StudentTable> findStudentTablesByUnitsContains(UnitTable unit);
}
