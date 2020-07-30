package ftn.sbnz.SbnzProject.service;

import ftn.sbnz.SbnzProject.model.MealRecipe;
import ftn.sbnz.SbnzProject.model.User;
import ftn.sbnz.SbnzProject.model.UserDay;
import ftn.sbnz.SbnzProject.model.UserMealPlan;
import ftn.sbnz.SbnzProject.repository.UserDayRepository;
import ftn.sbnz.SbnzProject.repository.UserMealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SpoonacularService {

    @Autowired
    private UserMealPlanRepository userMealPlanRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserDayRepository userDayRepository;

    public UserMealPlan addMealPlan(UserMealPlan userMealPlan, String userEmail) {
        User user = userDetailsService.findUserByEmail(userEmail);
        userMealPlan.setUser(user);
        userMealPlan.setDate(new Date());
        return userMealPlanRepository.save(userMealPlan);
    }

    public UserMealPlan getMealPlan(String userEmail) {
        User user = userDetailsService.findUserByEmail(userEmail);
        return userMealPlanRepository.findTopByUserIdAndDateOrderByIdDesc(user.getId(), new Date());
    }

    public void addMealFromApi(MealRecipe mealRecipe, String userEmail) {
        User user = userDetailsService.findUserByEmail(userEmail);
        UserDay userDay = userDayRepository.findByDateAndUser(new Date(), user);
        if (userDay == null) userDay = new UserDay(user);

        userDay.getMealRecipes().add(mealRecipe);
        userDayRepository.save(userDay);

    }

    public void deleteMealFromPlan(String userEmail, Integer mealId) {
        User user = userDetailsService.findUserByEmail(userEmail);
        UserMealPlan mealPlan = userMealPlanRepository.findTopByUserIdAndDateOrderByIdDesc(user.getId(), new Date());
        int index = -1;
        for (int i = 0; i < mealPlan.getMealIds().size(); i++) {
            if (mealPlan.getMealIds().get(i).equals(mealId))
                index = i;
        }
        if (index != -1) mealPlan.getMealIds().remove(index);
        userMealPlanRepository.save(mealPlan);
    }

}
