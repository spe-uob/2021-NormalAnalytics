package SPETeam.NormalAnalytics.Database.Repositories;

import SPETeam.NormalAnalytics.Database.Tables.AttendanceTable;
import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import SPETeam.NormalAnalytics.Database.Tables.UnitTable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AttendanceRepository extends CrudRepository<AttendanceTable,AttendanceId> {
    List<AttendanceTable> findAttendanceTablesByStudentAndUnit(StudentTable student, UnitTable unit);
}
