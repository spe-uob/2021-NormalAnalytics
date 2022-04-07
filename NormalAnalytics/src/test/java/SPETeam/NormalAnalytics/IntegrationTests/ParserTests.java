package SPETeam.NormalAnalytics.IntegrationTests;

import SPETeam.NormalAnalytics.Blackboard.BBReceiver;
import SPETeam.NormalAnalytics.Database.Repositories.*;
import SPETeam.NormalAnalytics.Database.Tables.AssessmentTable;
import SPETeam.NormalAnalytics.Database.Tables.GradeTable;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

@SpringBootTest
public class ParserTests {
    @Autowired
    BBReceiver bbReceiver;

    @Autowired
    AssessmentRepository assessmentRepo;
    @Autowired
    UnitRepository unitRepo;
    @Autowired
    GradesRepository gradeRepo;
    @Autowired
    StudentRepository studentRepo;

    String sep = File.separator;
    String rootPath = "."+sep+"test-blackboard";
    String tutor = "jross";
    String student = "iq20064";
    String unitFile = "COMS20008.html";

    @Test
    void AllParserTests() throws IOException{
        TestFileSystemCreatedIfNotPresent();
        File rootFolder = new File(rootPath);
        TestDatabaseUpdated();
        try {
            FileUtils.deleteDirectory(rootFolder);
        }catch (IOException e){
            System.out.println("Testing error: "+e.getMessage());
        }
        assert !(new File(rootPath).exists());
    }

    void TestFileSystemCreatedIfNotPresent(){
        String path = rootPath+sep+tutor;
        File tutorFolder = new File(path);
        assert !tutorFolder.exists();
        bbReceiver.UpdateDatabase(tutor,rootPath);
        assert tutorFolder.exists();
    }

    void TestDatabaseUpdated() throws IOException{

        String path = rootPath+sep+tutor+sep+student;
        new File(path).mkdirs();
        File testfile = new File(path+sep+unitFile);
        testfile.createNewFile();
        File resourceFile = new ClassPathResource(unitFile).getFile();
        FileUtils.copyFile(resourceFile,testfile);

        bbReceiver.UpdateDatabase(tutor,rootPath);
        List<AssessmentTable> assessments = assessmentRepo.findAssessmentTablesByUnit(unitRepo.findUnitTableByCode("COMS20008").get());
        boolean addedToDB = false;
        for(AssessmentTable a : assessments){
            if(a.getName().equals("While Program Syntax and Semantics Quiz")) {
                addedToDB = true;
                GradeTable grade = gradeRepo.findById(
                        new GradeId(studentRepo.findStudentTableByUsername(student).get().getId(), a.getId()))
                        .get();
                float expectedGrade = (146.95652f / 169f) * 100f;
                assert Math.abs(grade.getGrade() - expectedGrade) < 0.00001f;
                break;
            }
        }
        assert addedToDB;
    }


}
