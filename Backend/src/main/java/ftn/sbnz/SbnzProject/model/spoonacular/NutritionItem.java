package ftn.sbnz.SbnzProject.model.spoonacular;

public class NutritionItem {

    private String title;
    private String amount;
    private Boolean indented;
    private Double percentOfDailyNeeds;

    public NutritionItem() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Boolean getIndented() {
        return indented;
    }

    public void setIndented(Boolean indented) {
        this.indented = indented;
    }

    public Double getPercentOfDailyNeeds() {
        return percentOfDailyNeeds;
    }

    public void setPercentOfDailyNeeds(Double percentOfDailyNeeds) {
        this.percentOfDailyNeeds = percentOfDailyNeeds;
    }
}
