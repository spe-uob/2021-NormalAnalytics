package SPETeam.NormalAnalytics.Blackboard;

import SPETeam.NormalAnalytics.Database.Repositories.*;
import SPETeam.NormalAnalytics.Database.Tables.AssessmentTable;
import SPETeam.NormalAnalytics.Database.Tables.GradeTable;
import SPETeam.NormalAnalytics.Database.Tables.StudentTable;
import SPETeam.NormalAnalytics.Database.Tables.UnitTable;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Used to modify the database based on locally downloaded Blackboard data
 */

@Component
public class BBReceiver {

    @Autowired
    AssessmentRepository assessmentRepo;
    @Autowired
    UnitRepository unitRepo;
    @Autowired
    GradesRepository gradeRepo;
    @Autowired
    StudentRepository studentRepo;

    /**
     * Checks the local machine for Blackboard HTML grade pages to extract data from and update the database with
     * @param user the username of the tutor logging in
     * @param path the filepath of the folder in which tutor directories are/will be stored
     */
    public void UpdateDatabase(String user,String path) {
        String sep = File.separator;
        if(verifyOrCreateFolder(path+sep+user)){
            System.out.println("Loading Blackboard data from "+path+sep+user);
            File[] studentDirectories = new File(path+sep+user).listFiles((dir, name) -> dir.isDirectory());

            if(studentDirectories.length > 0) {
                GradeParser parser = new GradeParser();
                for (File student : studentDirectories) {
                    for (String f : student.list()) {
                        updateDatabaseFromFile(parser, student.getPath() + sep + f);
                    }
                }
            }else System.out.println("No student data found");

        }else{
            System.out.println("No Blackboard data found");
        }
    }

    private AssessmentTable persistNewAssessment(String name,String unitCode){
        AssessmentTable newAssessment = new AssessmentTable();
        newAssessment.setName(name);
        newAssessment.setWeight(0);
        newAssessment.setUnit(unitRepo.findUnitTableByCode(unitCode).get());
        assessmentRepo.save(newAssessment);
        return newAssessment;
    }

    private void updateDatabaseFromFile(GradeParser parser,String filePath){

        Set<String> existingAssessments = new HashSet<>();
        for(AssessmentTable a : assessmentRepo.findAll()){
            existingAssessments.add(a.getName());
        }

        List<BBAssessmentData> data = parser.parse(filePath);
        for(BBAssessmentData d : data){
            AssessmentTable assessment;
            if(!existingAssessments.contains(d.assessmentName)){
                System.out.println("New assessment found: "+d.assessmentName);
                assessment = persistNewAssessment(d.assessmentName,d.unitCode);
            }else{
                assessment = assessmentRepo.findAssessmentTableByNameAndUnit(d.getAssessmentName(),unitRepo.findUnitTableByCode(d.unitCode).get()).get();
            }
            addOrUpdateGrade(assessment,d);
        }
    }

    private void addOrUpdateGrade(AssessmentTable assessment,BBAssessmentData data){
        StudentTable student = studentRepo.findStudentTableByUsername(data.studentUsername).get();
        Optional<GradeTable> existingGrade = gradeRepo.findById(
                new GradeId(
                        student.getId(),
                        assessment.getId()
                )
        );
        if(existingGrade.isPresent()){
            if(existingGrade.get().getGrade() != data.assessmentScore){
                System.out.println("Updating grade");
                existingGrade.get().setGrade(data.assessmentScore);
                gradeRepo.save(existingGrade.get());
            }
        }else{
            System.out.println("Adding new grade");
            persistNewGrade(student,assessment,data);
        }
    }

    private void persistNewGrade(StudentTable student,AssessmentTable assessment,BBAssessmentData data){
        GradeTable newGrade = new GradeTable();
        newGrade.setGradeId(new GradeId(student.getId(),assessment.getId()));
        newGrade.setGrade(data.assessmentScore);
        newGrade.setAssessment(assessment);
        newGrade.setStudent(student);
        gradeRepo.save(newGrade);
    }

    private boolean verifyOrCreateFolder(String path){
        File folder = new File(path);
        if(!folder.exists()){
            folder.mkdirs();
            return false;
        }
        return true;
    }
}