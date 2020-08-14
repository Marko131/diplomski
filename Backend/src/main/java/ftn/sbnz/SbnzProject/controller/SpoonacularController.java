package ftn.sbnz.SbnzProject.controller;

import ftn.sbnz.SbnzProject.dto.AddMealDTO;
import ftn.sbnz.SbnzProject.model.MealRecipe;
import ftn.sbnz.SbnzProject.model.User;
import ftn.sbnz.SbnzProject.model.UserMealPlan;
import ftn.sbnz.SbnzProject.model.spoonacular.Meal;
import ftn.sbnz.SbnzProject.model.spoonacular.MealPlan;
import ftn.sbnz.SbnzProject.model.spoonacular.NutritionInfo;
import ftn.sbnz.SbnzProject.model.spoonacular.SearchMealResult;
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

    @Value("${complexSearchUrl}")
    private String complexSearchUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private ftn.sbnz.SbnzProject.service.SpoonacularService spoonacularService;


    @GetMapping("/generate-meal-plan")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MealPlan> generateMealPlan() {
        System.out.println("GENERATE MEAL PLAN");
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
        System.out.println("NUTRITION INFO");
        return getNutritionInfoApi(id);
    }

    @PostMapping("meal-plan")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserMealPlan> addMealPlan(@RequestBody UserMealPlan userMealPlan) {
        System.out.println("ADD MEAL PLAN");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserMealPlan mealPlan = spoonacularService.addMealPlan(userMealPlan, email);
        return new ResponseEntity<>(mealPlan, HttpStatus.OK);
    }

    @GetMapping("meal-plan")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ArrayList<Meal>> getMealPlan() {
        System.out.println("GET MEAL PLAN");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserMealPlan mealPlan = spoonacularService.getMealPlan(email);

        if (mealPlan == null)
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);

        if (mealPlan.getMealIds().size() == 0)
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);

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

    @PostMapping("add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MealRecipe> addMeal(@RequestBody AddMealDTO addMealDTO) {
        System.out.println("ADD MEAL");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        ResponseEntity<NutritionInfo> nutritionInfoResponseEntity = getNutritionInfoApi(addMealDTO.getId());
        NutritionInfo nutritionInfo = nutritionInfoResponseEntity.getBody();

        MealRecipe mealRecipe = new MealRecipe();
        mealRecipe.setIngredients(new ArrayList<>());
        mealRecipe.setName(addMealDTO.getTitle());
        mealRecipe.setMealEnum(addMealDTO.getMealEnum());
        mealRecipe.setCalories(Double.parseDouble(nutritionInfo.getCalories()));
        mealRecipe.setCarbohydrates(Double.parseDouble(nutritionInfo.getCarbs().substring(0, nutritionInfo.getCarbs().length() - 1)));
        mealRecipe.setProtein(Double.parseDouble(nutritionInfo.getProtein().substring(0, nutritionInfo.getProtein().length() - 1)));
        mealRecipe.setFat(Double.parseDouble(nutritionInfo.getFat().substring(0, nutritionInfo.getFat().length() - 1)));
        nutritionInfo.getBad().forEach(nutritionItem -> {
            if (nutritionItem.getTitle().equals("Saturated Fat"))
                mealRecipe.setSaturatedFat(Double.parseDouble(nutritionItem.getAmount().substring(0, nutritionItem.getAmount().length() - 1)));
            if (nutritionItem.getTitle().equals("Sugar"))
                mealRecipe.setSugars(Double.parseDouble(nutritionItem.getAmount().substring(0, nutritionItem.getAmount().length() - 1)));
        });

        spoonacularService.addMealFromApi(mealRecipe,email);
        spoonacularService.deleteMealFromPlan(email, addMealDTO.getId());

        return new ResponseEntity<>(mealRecipe, HttpStatus.OK);
    }

    @GetMapping("search-meals/{value}")
    public ResponseEntity<SearchMealResult> searchMeals(@PathVariable("value") String searchValue){
        System.out.println("SEARCH MEALS");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(complexSearchUrl)
                .queryParam("query", searchValue)
                .queryParam("apiKey", apiKey);
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<SearchMealResult> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, SearchMealResult.class);
        return response;
    }

    @GetMapping("info/{id}")
    public ResponseEntity<?> getInfo(@PathVariable("id") Integer id){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl("https://api.spoonacular.com/recipes/" + id + "/information")
                .queryParam("includeNutrition", "false")
                .queryParam("apiKey", apiKey);
        HttpEntity request = new HttpEntity(headers);
        return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, Meal.class);
    }

    private ResponseEntity<NutritionInfo> getNutritionInfoApi(Integer id){
        System.out.println("GET NUTRITION INFO");
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
}
