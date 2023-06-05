import { Meal } from "./Meal";
import { Macros } from "./macros";

export interface Diet {
    totalKcalInDiet: number;
    meals: Meal[];
    totalMacrosInDiet: Macros;
}