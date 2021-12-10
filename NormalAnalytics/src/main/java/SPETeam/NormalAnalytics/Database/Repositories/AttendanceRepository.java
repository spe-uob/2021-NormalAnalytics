package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.AttendanceTable;
import org.springframework.data.repository.CrudRepository;

public interface AttendanceRepository extends CrudRepository<AttendanceTable,AttendanceId> {
}
