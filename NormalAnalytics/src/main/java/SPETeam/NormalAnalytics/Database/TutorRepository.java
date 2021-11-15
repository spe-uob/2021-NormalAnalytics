package SPETeam.NormalAnalytics.Database;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TutorRepository extends CrudRepository<Tutors,Integer> {
    Optional<Tutors> findByUsername(String username);
}
