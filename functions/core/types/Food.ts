export interface Food {
    description: string;
    baseQuantity: number;
    chosenQuantity: number;
    amountGramsPerUnit: number | null;
    energyInKcal: number;
    fiber: number;
    fat: number;
    protein: number;
    carbohydrate: number;
    highProtein: boolean | null;
    highCarbohydrate: boolean | null;
    highFat: boolean | null;
    isInMainMeal: boolean;
    image: string;
}