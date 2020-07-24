package ftn.sbnz.SbnzProject.service;

import ftn.sbnz.SbnzProject.model.User;
import ftn.sbnz.SbnzProject.model.UserMealPlan;
import ftn.sbnz.SbnzProject.repository.UserMealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SpoonacularService {

    @Autowired
    private UserMealPlanRepository userMealPlanRepository;

    @Autowired UserDetailsServiceImpl userDetailsService;

    public UserMealPlan addMealPlan(UserMealPlan userMealPlan, String userEmail) {
        User user = userDetailsService.findUserByEmail(userEmail);
        userMealPlan.setUser(user);
        userMealPlan.setDate(new Date());
        return userMealPlanRepository.save(userMealPlan);
    }

    public UserMealPlan getMealPlan(String userEmail){
        User user = userDetailsService.findUserByEmail(userEmail);
        return userMealPlanRepository.findTopByUserIdAndDateOrderByIdDesc(user.getId(), new Date());
    }
}
