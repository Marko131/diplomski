package ftn.sbnz.SbnzProject.dto;

import ftn.sbnz.SbnzProject.model.MealEnum;

public class AddMealDTO {

    private Integer id;
    private String title;
    private MealEnum mealEnum;

    public AddMealDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public MealEnum getMealEnum() {
        return mealEnum;
    }

    public void setMealEnum(MealEnum mealEnum) {
        this.mealEnum = mealEnum;
    }
}
