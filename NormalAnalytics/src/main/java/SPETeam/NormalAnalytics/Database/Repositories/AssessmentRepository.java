package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.AssessmentTable;
import SPETeam.NormalAnalytics.Database.Tables.UnitTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AssessmentRepository extends CrudRepository<AssessmentTable, Integer> {
    List<AssessmentTable> findAssessmentTablesByUnit(UnitTable unit);
    Optional<AssessmentTable> findAssessmentTableByNameAndUnit(String name, UnitTable unit);
}
