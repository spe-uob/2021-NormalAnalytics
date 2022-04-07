package SPETeam.NormalAnalytics.entity.Responses;

import lombok.Data;

@Data
public class UnitData {
    private String name;
    private String code;
    private float overallAttendance;
    private AttendancePoint[] attendances;
    private AssessmentScore[] scores;
    private float unitAverage;
    private float cohortAverage;
}
