package ftn.sbnz.SbnzProject.dto;

import ftn.sbnz.SbnzProject.model.Activity;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class UpdateProfileDTO {

    @NotNull(message = "Age is required")
    @Min(value = 15, message = "Please provide number between 15 and 80")
    @Max(value = 80, message = "Please provide number between 15 and 80")
    private Integer age;
    @NotNull(message = "Height is required")
    @Positive(message = "Please provide positive number")
    private Double height;
    @NotNull(message = "Weight is required")
    @Positive(message = "Please provide positive number")
    private Double weight;
    @NotNull(message = "Activity is required")
    private Activity activity;
    private Double bodyFat;


    public UpdateProfileDTO() {

    }


    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getBodyFat() {
        return bodyFat;
    }

    public void setBodyFat(Double bodyFat) {
        this.bodyFat = bodyFat;
    }
}
