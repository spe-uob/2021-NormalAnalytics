package SPETeam.NormalAnalytics.entity.Responses;

import lombok.Data;

import java.util.Date;

@Data
public class AttendancePoint {
    Date date;
    boolean present;
    float totalAttendance;
}
