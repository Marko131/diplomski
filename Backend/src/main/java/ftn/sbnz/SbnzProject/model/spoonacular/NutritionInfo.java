package ftn.sbnz.SbnzProject.model.spoonacular;

import java.util.ArrayList;

public class NutritionInfo {

    private String calories;
    private String carbs;
    private String fat;
    private String protein;
    private ArrayList<NutritionItem> good;
    private ArrayList<NutritionItem> bad;

    public NutritionInfo() {
    }

    public String getCalories() {
        return calories;
    }

    public void setCalories(String calories) {
        this.calories = calories;
    }

    public String getCarbs() {
        return carbs;
    }

    public void setCarbs(String carbs) {
        this.carbs = carbs;
    }

    public String getFat() {
        return fat;
    }

    public void setFat(String fat) {
        this.fat = fat;
    }

    public String getProtein() {
        return protein;
    }

    public void setProtein(String protein) {
        this.protein = protein;
    }

    public ArrayList<NutritionItem> getGood() {
        return good;
    }

    public void setGood(ArrayList<NutritionItem> good) {
        this.good = good;
    }

    public ArrayList<NutritionItem> getBad() {
        return bad;
    }

    public void setBad(ArrayList<NutritionItem> bad) {
        this.bad = bad;
    }
}
