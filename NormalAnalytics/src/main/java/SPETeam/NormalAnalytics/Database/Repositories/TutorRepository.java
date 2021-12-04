package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.TutorTable;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TutorRepository extends CrudRepository<TutorTable,Integer> {
    Optional<TutorTable> findByUsername(String username);
}
