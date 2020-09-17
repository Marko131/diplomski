package ftn.sbnz.SbnzProject.model;

import ftn.sbnz.SbnzProject.dto.RegisterUserDTO;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    private Gender gender;
    @Column(nullable = false)
    private double height;
    @Column(nullable = false)
    private double weight;
    @Column(nullable = true)
    private Double bodyFat;
    @Column
    private double bmi;
    @Column
    private String bodyStatus;
    @Column
    private double bmr;
    @Column
    private double calories;
    @Column
    private Activity activity;

    public User() {
    }

    public User(RegisterUserDTO registerUserDTO) {
        this.email = registerUserDTO.getEmail();
        this.password = registerUserDTO.getPassword1();
        this.firstName = registerUserDTO.getFirstName();
        this.lastName = registerUserDTO.getLastName();
        this.age = registerUserDTO.getAge();
        this.gender = registerUserDTO.getGender();
        this.height = registerUserDTO.getHeight();
        this.weight = registerUserDTO.getWeight();
        this.activity = registerUserDTO.getActivity();
        this.bodyFat = registerUserDTO.getBodyFat();
    }

    public User(String email, String password, String firstName, String lastName, int age, Gender gender, double height, double weight, Activity activity) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activity = activity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }


    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }


    public double getBmi() {
        return bmi;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }

    public void updateBmi() {
        this.bmi = this.weight / Math.pow(this.height, 2);
    }

    public String getBodyStatus() {
        return bodyStatus;
    }

    public void setBodyStatus(String bodyStatus) {
        this.bodyStatus = bodyStatus;
    }

    public double getBmr() {
        return bmr;
    }

    public void setBmr(double bmr) {
        this.bmr = bmr;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Double getBodyFat() {
        return bodyFat;
    }

    public void setBodyFat(Double bodyFat) {
        this.bodyFat = bodyFat;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", height=" + height +
                ", weight=" + weight +
                ", bodyFat=" + bodyFat +
                ", bmi=" + bmi +
                ", bodyStatus='" + bodyStatus + '\'' +
                ", bmr=" + bmr +
                ", calories=" + calories +
                ", activity=" + activity +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

}
