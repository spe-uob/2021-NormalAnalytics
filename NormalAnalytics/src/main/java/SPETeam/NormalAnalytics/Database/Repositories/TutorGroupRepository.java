package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.TutorGroupTable;
import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TutorGroupRepository extends CrudRepository<TutorGroupTable,Integer> {
    List<TutorGroupTable> findTutorGroupTableByTutorUsername(String tutorUsername);
}
