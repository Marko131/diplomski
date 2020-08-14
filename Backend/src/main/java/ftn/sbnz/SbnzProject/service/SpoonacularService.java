package ftn.sbnz.SbnzProject.service;

import ftn.sbnz.SbnzProject.model.*;
import ftn.sbnz.SbnzProject.repository.NotificationRepository;
import ftn.sbnz.SbnzProject.repository.UserDayRepository;
import ftn.sbnz.SbnzProject.repository.UserMealPlanRepository;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
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

    @Autowired
    private KieContainer kieContainer;

    @Autowired
    private NotificationRepository notificationRepository;

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

        Notification notification = new Notification(user);
        KieSession kieSession = kieContainer.newKieSession("day-session");
        kieSession.getAgenda().getAgendaGroup("day-rules").setFocus();
        kieSession.insert(userDay);
        kieSession.insert(notification);

        Notification notification1 = checkMeal(userDay, notification);

        kieSession.fireAllRules();
        notificationRepository.save(notification1);

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

    private Notification checkMeal(UserDay userDay, Notification notification) {
        KieSession kieSession = kieContainer.newKieSession("meal-session");
        kieSession.getAgenda().getAgendaGroup("query").setFocus();
        userDay.getMealRecipes().forEach(kieSession::insert);
        kieSession.insert(notification);
        kieSession.fireAllRules();
        return notification;
    }

}
