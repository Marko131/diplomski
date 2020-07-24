package ftn.sbnz.SbnzProject.model;

import ftn.sbnz.SbnzProject.model.spoonacular.Meal;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class UserMealPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User user;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Column
    @ElementCollection(targetClass=Integer.class, fetch = FetchType.EAGER)
    public List<Integer> mealIds;

    public UserMealPlan() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Integer> getMealIds() {
        return mealIds;
    }

    public void setMealIds(List<Integer> mealIds) {
        this.mealIds = mealIds;
    }
}
