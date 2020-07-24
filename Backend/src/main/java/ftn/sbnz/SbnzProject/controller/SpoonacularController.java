package ftn.sbnz.SbnzProject.controller;

import ftn.sbnz.SbnzProject.model.User;
import ftn.sbnz.SbnzProject.model.UserMealPlan;
import ftn.sbnz.SbnzProject.model.spoonacular.Meal;
import ftn.sbnz.SbnzProject.model.spoonacular.MealPlan;
import ftn.sbnz.SbnzProject.model.spoonacular.NutritionInfo;
import ftn.sbnz.SbnzProject.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SpoonacularController {

    @Value("${apiKey}")
    private String apiKey;

    @Value("${generateMealPlanUrl}")
    private String generateMealPlan;

    @Value("${informationBulkUrl}")
    private String informationBulkUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private ftn.sbnz.SbnzProject.service.SpoonacularService spoonacularService;


    @GetMapping("/api/test")
    public ResponseEntity<String> test() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(generateMealPlan)
                .queryParam("apiKey", apiKey);

        HttpEntity request = new HttpEntity(headers);

        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, String.class);
        System.out.println(response);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("/generate-meal-plan")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MealPlan> generateMealPlan() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userDetailsService.findUserByEmail(email);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(generateMealPlan)
                .queryParam("apiKey", apiKey)
                .queryParam("timeFrame", "day")
                .queryParam("targetCalories", user.getCalories());
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<MealPlan> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, MealPlan.class);

        return response;
    }

    @GetMapping("/nutrition-info/{id}")
    public ResponseEntity<NutritionInfo> getNutritionInfo(@PathVariable("id") Integer id) {
        String url = String.format("https://api.spoonacular.com/recipes/%d/nutritionWidget.json", id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(url)
                .queryParam("apiKey", apiKey);
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<NutritionInfo> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, NutritionInfo.class);
        return response;
    }

    @PostMapping("meal-plan")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserMealPlan> addMealPlan(@RequestBody UserMealPlan userMealPlan) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserMealPlan mealPlan = spoonacularService.addMealPlan(userMealPlan, email);
        return new ResponseEntity<>(mealPlan, HttpStatus.OK);
    }

    @GetMapping("meal-plan")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ArrayList<Meal>> getMealPlan() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserMealPlan mealPlan = spoonacularService.getMealPlan(email);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(informationBulkUrl)
                .queryParam("apiKey", apiKey)
                .queryParam("ids", String.join(",", mealPlan.getMealIds().stream().map(Object::toString).collect(Collectors.toCollection(ArrayList::new))));
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<ArrayList<Meal>> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, new ParameterizedTypeReference<ArrayList<Meal>>() {
        });

        return response;
    }
}
