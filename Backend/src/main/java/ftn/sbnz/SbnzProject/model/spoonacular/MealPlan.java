package ftn.sbnz.SbnzProject.model.spoonacular;

import java.util.ArrayList;

public class MealPlan {

    private ArrayList<Meal> meals;
    private Nutrients nutrients;

    public MealPlan() {
    }

    public ArrayList<Meal> getMeals() {
        return meals;
    }

    public void setMeals(ArrayList<Meal> meals) {
        this.meals = meals;
    }

    public Nutrients getNutrients() {
        return nutrients;
    }

    public void setNutrients(Nutrients nutrients) {
        this.nutrients = nutrients;
    }
}
