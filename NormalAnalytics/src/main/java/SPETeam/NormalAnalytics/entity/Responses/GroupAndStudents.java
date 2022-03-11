package SPETeam.NormalAnalytics.entity.Responses;

import lombok.Data;

@Data
public class GroupAndStudents {
    String groupName;
    Student[] students;
}
