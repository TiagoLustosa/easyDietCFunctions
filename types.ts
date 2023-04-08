// type Food = {
//     baseQuantity: number;
//     base_unit: string;
//     carbohydrate: number;
//     category_id: number;
//     description: string;
//     energyInKcal: number;
//     fiber: number;
//     highCarb: boolean;
//     isInMainMeal: boolean;
//     id: number;
//     image: string;
//     lipid: number;
//     protein: number;
// }

// type Meal = {
//     mealTotalCalories: number;
//     totalProteinInMeal: number;
//     totalLipidInMeal: number;
//     totalCarboInMeal: number;
//     mainProteinSourceGrams: number;
//     mainLipidSourceGrams: number;
//     mainCarbohydrateSourceGrams: number;
//     foods: Food[];
// };

// const foodList = [
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 0,
//         "category_id": 6,
//         "description": "Patinho, sem gordura, grelhado",
//         "energyInKcal": 219.259266666667,
//         "fiber": 0,
//         "highProtein": true,
//         "isInMainMeal": true,
//         "id": 377,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/bovino-grelhado.jpg?alt=media&token=8a278a7e-89ff-49d0-a17f-e3e7b14783c3",
//         "lipid": 7.31333333333333,
//         "protein": 35.9
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 0,
//         "category_id": 6,
//         "description": "Frango, peito, sem pele, cozido",
//         "energyInKcal": 162.874763346314,
//         "fiber": 0,
//         "highProtein": true,
//         "isInMainMeal": true,
//         "id": 408,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/frango-peito-grelhado.jpg?alt=media&token=71e89715-68b0-42f6-be94-496faba9efff",
//         "lipid": 3.16,
//         "protein": 31.46875
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 28.05985,
//         "category_id": 1,
//         "description": "Arroz, tipo 1, cozido",
//         "energyInKcal": 128.258485666667,
//         "fiber": 1.561,
//         "highCarb": true,
//         "isInMainMeal": true,
//         "id": 3,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/arroz-branco.jpg?alt=media&token=ab13cc9b-9497-43e5-a79f-647015cb8e9d",
//         "lipid": 0.227,
//         "protein": 2.52081666666667
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 11.94375,
//         "category_id": 2,
//         "description": "Batata inglesa, cozida",
//         "energyInKcal": 51.5884766362707,
//         "fiber": 1.34333333333333,
//         "highCarb": true,
//         "isInMainMeal": true,
//         "id": 91,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/batata-inglesa.jpg?alt=media&token=4d6b4ed7-dc90-4e1c-b5c6-b1451e74e1c1",
//         "lipid": 0,
//         "protein": 1.16458333333333
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 0,
//         "category_id": 4,
//         "description": "Azeite oliva, extra virgem",
//         "energyInKcal": 884,
//         "fiber": 0,
//         "highLipid": true,
//         "isInMainMeal": true,
//         "id": 260,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/azeite-oliva.jpg?alt=media&token=4a7b3407-9257-4717-836f-c4f81740729e",
//         "lipid": 100,
//         "protein": 0
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 0.614916666666674,
//         "category_id": 1,
//         "description": "Ovo inteiro, cozido",
//         "energyInKcal": 145.70017,
//         "fiber": 0,
//         "highProtein": true,
//         "isInMainMeal": false,
//         "id": 488,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/ovoCozido.jpg?alt=media&token=8df4d59e-0b3f-450e-a9ea-cf20ee211ce1",
//         "lipid": 9.47633333333333,
//         "protein": 13.29375
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 3.04933292706807,
//         "category_id": 1,
//         "description": "Queijo mussarela",
//         "energyInKcal": 329.870718420887,
//         "fiber": "NA",
//         "highProtein": true,
//         "isInMainMeal": false,
//         "id": 463,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/Mussarela.jpg?alt=media&token=16132a43-caca-4ee1-9704-b50d85467319",
//         "lipid": 25.183,
//         "protein": 22.6490004062653
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 1.91666666666666,
//         "category_id": 1,
//         "description": "Iogurte natural integral",
//         "energyInKcal": 51.4895333333333,
//         "fiber": "NA",
//         "highProtein": true,
//         "isInMainMeal": false,
//         "id": 448,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/IogurteIntegral.jpg?alt=media&token=e5eba4f6-b1fa-4248-93f4-71f4c4f5e8dc",
//         "lipid": 3.04,
//         "protein": 4.06333333333333
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 11.5547826086956,
//         "category_id": 1,
//         "description": "Mamão Formosa",
//         "energyInKcal": 45.3407478260869,
//         "fiber": 1.81333333333333,
//         "highCarb": true,
//         "isInMainMeal": false,
//         "id": 225,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/Mamao.jpg?alt=media&token=8a2cd73f-ab5c-46fa-8f22-9b235d266910",
//         "lipid": 0.12,
//         "protein": 0.815217391304348
//     },
//     {
//         "baseQuantity": 100,
//         "base_unit": "g",
//         "carbohydrate": 58.6464347826087,
//         "category_id": 1,
//         "description": "Pão francês",
//         "energyInKcal": 299.810150434783,
//         "fiber": 2.30666666666667,
//         "highCarb": true,
//         "isInMainMeal": false,
//         "id": 53,
//         "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/PaoFrances.jpg?alt=media&token=a866137b-68bf-42b3-9edf-1062107daf6a",
//         "lipid": 3.10333333333333,
//         "protein": 7.9535652173913
//     },
// ];