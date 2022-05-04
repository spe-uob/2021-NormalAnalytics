package SPETeam.NormalAnalytics;

import SPETeam.NormalAnalytics.entity.Responses.*;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Responsible for processing JPA entities from the repositories into classes and datatypes which can be returned as
 * JSON objects by controllers
 */
@Component
public interface IDatabaseReceiver {
    /**
     * Checks if provided username and password match the database. Should be implemented securely
     * @param name Tutor username
     * @param password Tutor password
     * @return True if successfully logged in, false if not
     */
    boolean VerifyLogin(String name,String password);

    /**
     * Gets all of a tutor's students from across all tutor groups
     * @param tutorUsername Tutor username
     * @return List of student data classes
     */
    List<Student> StudentsFromTutor(String tutorUsername);

    /**
     * Returns a list of assessments and the student's score on each of them for a given student and unit
     * @param studentUsername
     * @param unitCode
     * @return
     */
    AssessmentScoreList ScoresFromUnit(String studentUsername, String unitCode);

    /**
     * Returns a list of units a student is enrolled in
     * @param studentUsername
     * @return
     */
    List<Unit> UnitsFromStudent(String studentUsername);
    /**
     * Returns a students overall attendance for a unit
    */
    float AttendanceFromUnit(String studentUsername,String unitCode);

    /**
     * Returns the cohort medium scores for a given unit and assessment
     * @param unitCode
     * @param assessmentName
     * @return
     */
    float UnitMedianForAssessment(String unitCode,String assessmentName);

    /**
     * Returns a student data class from a given username
     * @param studentName
     * @return
     */
    Student StudentFromUsername(String studentName);

    /**
     * Returns a list of units a student is enrolled in and their assessments and scores from each
     * @param studentUsername
     * @return
     */
    UnitAndGrades[] UnitAndGradesFromStudent(String studentUsername);

    /**
     * Returns a students information with lists of their attendance and assessment scores for each unit they are
     * enrolled in embedded
     * @param studentUsername
     * @return
     */
    StudentData AllStudentData(String studentUsername);

    /**
     * Returns a list of tutor groups a tutor is the assigned tutor of with a list of tutees from each group embedded
     * @param tutorUsername
     * @return
     */
    List<GroupAndStudents> StudentsFromTutorByGroup(String tutorUsername);
}
