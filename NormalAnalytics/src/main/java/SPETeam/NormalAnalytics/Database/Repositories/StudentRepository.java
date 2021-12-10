package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends CrudRepository<StudentTable,Integer> {
    List<StudentTable> findStudentByTutorUsername(String tutorUsername);
    Optional<StudentTable> findStudentTableByUsername(String username);
}
