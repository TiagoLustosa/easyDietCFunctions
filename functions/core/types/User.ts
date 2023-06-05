import { Food } from "./food";

export interface User {
    numberOfMeals: number;
    numberOfMealsWithChosenQuantity: number;
    age: number;
    height: number;
    weight: number;
    proteinPerKilogramOfBodyWeight: number;
    firstMealFoodList: Food[] | null;
    secondMealFoodList: Food[] | null;
    thirdMealFoodList: Food[] | null;
    fourthMealFoodList: Food[] | null;
    fifthMealFoodList: Food[] | null;
    sixthMealFoodList: Food[] | null;
    gender: EnumGender;
    activityLevel: EnumActivityLevel;
    dietObjective: EnumDietObjective;
}