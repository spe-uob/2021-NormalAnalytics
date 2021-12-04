package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import SPETeam.NormalAnalytics.Database.Tables.UnitTable;
import SPETeam.NormalAnalytics.entity.Unit;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UnitRepository extends CrudRepository<UnitTable,Integer> {
    Set<UnitTable> findUnitTablesByMembersContaining(StudentTable student);
    Optional<UnitTable> findUnitTableByCode(String code);
}
