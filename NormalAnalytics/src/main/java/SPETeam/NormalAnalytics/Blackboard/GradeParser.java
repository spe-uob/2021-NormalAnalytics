package SPETeam.NormalAnalytics.Blackboard;

import SPETeam.NormalAnalytics.Database.Repositories.AssessmentRepository;
import SPETeam.NormalAnalytics.Database.Tables.AssessmentTable;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

public class GradeParser {
    public List<BBAssessmentData> parse(String filePath){
        String sep = File.separator;
        String[] splitPath = filePath.split(Pattern.quote(sep));
        String studentUsername = splitPath[3];
        String unitCode = splitPath[4].substring(0,9);
        File toParse = new File(filePath);
        List<BBAssessmentData> data = new ArrayList<>();
        try {
            Document doc = Jsoup.parse(toParse, "UTF-8");
            //String unitName = doc.select(".streamHeader").select("a").text();
            Elements grades = doc.select(".sortable_item_row.graded_item_row.row.expanded");
            for(Element e : grades){
                String assessmentName = e.select(".cell.gradable").select("a").text();
                float scored = Float.parseFloat(
                        e.select(".cell.grade")
                                .select("span.grade")
                                .text()
                );
                float total = Float.parseFloat(
                        e.select(".cell.grade")
                                .select(".pointsPossible.clearfloats")
                                .text().substring(1)
                );
                data.add(new BBAssessmentData(unitCode,studentUsername,assessmentName,scored/total * 100));
            }
        }catch (IOException ex){
            System.out.println("couldn't read file");
        }
        return data;
    }
}
