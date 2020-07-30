package ftn.sbnz.SbnzProject.repository;

import ftn.sbnz.SbnzProject.model.UserDay;
import ftn.sbnz.SbnzProject.model.UserMealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface UserMealPlanRepository extends JpaRepository<UserMealPlan, Integer> {

    UserMealPlan findTopByUserIdAndDateOrderByIdDesc(Integer userId, Date date);
    void deleteAllByUserIdAndDate(Integer userId, Date date);
    
}
