package ftn.sbnz.SbnzProject.model.spoonacular;

import java.util.List;

public class SearchMealResult {

    private Integer offset;
    private Integer number;
    private List<SearchMealResultListItem> results;

    public SearchMealResult() {
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public List<SearchMealResultListItem> getResults() {
        return results;
    }

    public void setResults(List<SearchMealResultListItem> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "SearchMealResult{" +
                "offset=" + offset +
                ", number=" + number +
                ", results=" + results +
                '}';
    }
}
