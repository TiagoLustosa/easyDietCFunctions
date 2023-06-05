import { Food } from "./food";
import { Macros } from "./macros";

export interface Meal {
    totalKcal: number;
    proteinSourceTotalGrams: number;
    fatSourceTotalGrams: number;
    carbohydrateSourceTotalGrams: number;
    macros: Macros;
    foods: Food[];
}