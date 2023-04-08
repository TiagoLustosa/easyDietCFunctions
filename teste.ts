const afternoonFoodList = [
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 66.6356405797102,
    "category_id": 1,
    "description": "Aveia flocos",
    "energyInKcal": 393.822689449275,
    "fiber": 9.13,
    "highCarb": true,
    "isInMainMeal": false,
    "id": 7,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/aveiaFlocos.jpg?alt=media&token=0840ca8a-297e-43fc-955e-6d465f6a0b1d",
    "lipid": 8.49666666666667,
    "protein": 13.9210260869565
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 4,
    "description": "Whey Protein(Concentrado) 80%",
    "energyInKcal": 122,
    "fiber": 0,
    "highProtein": true,
    "isInMainMeal": false,
    "id": 777,
    "image": "",
    "lipid": 1.6,
    "protein": 23
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 1.91666666666666,
    "category_id": 1,
    "description": "Iogurte natural integral",
    "energyInKcal": 51.4895333333333,
    "fiber": 0,
    "highLipid": true,
    "isInMainMeal": false,
    "id": 448,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/IogurteIntegral.jpg?alt=media&token=e5eba4f6-b1fa-4248-93f4-71f4c4f5e8dc",
    "lipid": 3.04,
    "protein": 4.06333333333333
  },
];
const foodListLunch = [{
  "baseQuantity": 100,
  "base_unit": "g",
  "carbohydrate": 0,
  "category_id": 6,
  "description": "Frango, peito, sem pele, cozido",
  "energyInKcal": 162.874763346314,
  "fiber": 0,
  "highProtein": true,
  "isInMainMeal": true,
  "id": 408,
  "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/frango-peito-grelhado.jpg?alt=media&token=71e89715-68b0-42f6-be94-496faba9efff",
  "lipid": 3.16,
  "protein": 31.46875
},
{
  "baseQuantity": 100,
  "base_unit": "g",
  "carbohydrate": 28.05985,
  "category_id": 1,
  "description": "Arroz, tipo 1, cozido",
  "energyInKcal": 128.258485666667,
  "fiber": 1.561,
  "highCarb": true,
  "isInMainMeal": true,
  "id": 3,
  "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/arroz-branco.jpg?alt=media&token=ab13cc9b-9497-43e5-a79f-647015cb8e9d",
  "lipid": 0.227,
  "protein": 2.52081666666667
},
{
  "baseQuantity": 100,
  "base_unit": "g",
  "carbohydrate": 0,
  "category_id": 4,
  "description": "Azeite oliva, extra virgem",
  "energyInKcal": 884,
  "fiber": 0,
  "highLipid": true,
  "isInMainMeal": true,
  "id": 260,
  "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/azeite-oliva.jpg?alt=media&token=4a7b3407-9257-4717-836f-c4f81740729e",
  "lipid": 100,
  "protein": 0
},
]
const breakFastFoodList = [{
  "baseQuantity": 100,
  "base_unit": "g",
  "carbohydrate": 0.614916666666674,
  "category_id": 1,
  "description": "Ovo inteiro, cozido",
  "energyInKcal": 145.70017,
  "fiber": 0,
  "highProtein": true,
  "isInMainMeal": false,
  "id": 488,
  "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/ovoCozido.jpg?alt=media&token=8df4d59e-0b3f-450e-a9ea-cf20ee211ce1",
  "lipid": 9.47633333333333,
  "protein": 13.29375
},
{
  "baseQuantity": 100,
  "base_unit": "g",
  "carbohydrate": 58.6464347826087,
  "category_id": 1,
  "description": "Pão francês",
  "energyInKcal": 299.810150434783,
  "fiber": 2.30666666666667,
  "highCarb": true,
  "isInMainMeal": false,
  "id": 53,
  "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/PaoFrances.jpg?alt=media&token=a866137b-68bf-42b3-9edf-1062107daf6a",
  "lipid": 3.10333333333333,
  "protein": 7.9535652173913
},
{
  "baseQuantity": 100,
  "base_unit": "g",
  "carbohydrate": 3.04933292706807,
  "category_id": 1,
  "description": "Queijo mussarela",
  "energyInKcal": 329.870718420887,
  "fiber": "NA",
  "highLipid": true,
  "isInMainMeal": false,
  "id": 463,
  "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/Mussarela.jpg?alt=media&token=16132a43-caca-4ee1-9704-b50d85467319",
  "lipid": 25.183,
  "protein": 22.6490004062653
},
]

let totalProteinInMeal = 160
let totalLipidInMeal = 80
let totalCaloriesInMeal = 3000

let totalProteinBreakfast = totalProteinInMeal * 0.2
let totalLipidBreakfast = totalLipidInMeal * 0.2
let totalCaloriesBreakfast = totalCaloriesInMeal * 0.2

let totalProteinLunch = totalProteinInMeal * 0.3
let totalLipidLunch = totalLipidInMeal * 0.3
let totalCaloriesInLunch = totalCaloriesInMeal * 0.3

let totalProteinAfternoonMeal = totalProteinInMeal * 0.2
let totalLipidAfternoonMeal = totalLipidInMeal * 0.2
let totalCaloriesInAfternoonMeal = totalCaloriesInMeal * 0.2

let totalProteinInLastMeal
let totalLipidInLastMeal
let totalCaloriesInLastMeal

const numberOfMeals = 4

const calculateMeal = (foodList, totalProtein, totalLipid, totalCaloriesInMeal) => {
  let totalProteinGrams = 0, proteinResult = 0;
  let totalLipidGrams = 0, lipidResult = 0;
  let totalCarboGrams = 0, carboResult = 0;
  let totalKcal = 0.0;
  const protein = foodList.find((e) => e.highProtein == true);
  const lipid = foodList.find((e) => e.highLipid == true);
  const carbo = foodList.find((e) => e.highCarb == true);

  const proteinPerGram = protein.protein / 100;
  const proteinKcalPerGram = protein.energyInKcal / 100;
  const proteinLipidPerGram = protein.lipid / 100;
  const proteinCarboPerGram = protein.carbohydrate / 100;

  const lipidPerGram = lipid.lipid / 100;
  const lipidKcalPerGram = lipid.energyInKcal / 100;
  const lipidProteinPerGram = lipid.protein / 100;
  const lipidCarboPerGram = lipid.carbohydrate / 100;

  const carboPerGram = carbo.carbohydrate / 100;
  const carboKcalPerGram = carbo.energyInKcal / 100;
  const carboLipidPerGram = carbo.lipid / 100;
  const carboProteinPerGram = carbo.protein / 100;

  while (totalKcal < totalCaloriesInMeal) {

    if (proteinResult < totalProtein) {
      proteinResult += proteinPerGram;
      totalKcal += proteinKcalPerGram;
      carboResult += proteinCarboPerGram;
      lipidResult += proteinLipidPerGram;
      totalProteinGrams++;
    } else {
      proteinResult -= proteinPerGram;
      totalKcal -= proteinKcalPerGram;
      carboResult -= proteinCarboPerGram;
      lipidResult -= proteinLipidPerGram;
      totalProteinGrams--;
    }
    if (lipidResult < totalLipid) {
      proteinResult += lipidProteinPerGram;
      totalKcal += lipidKcalPerGram;
      carboResult += lipidCarboPerGram;
      lipidResult += lipidPerGram;
      totalLipidGrams++;
    }
    // else {
    //   proteinResult -= lipidProteinPerGram;
    //   totalKcal -= lipidKcalPerGram;
    //   carboResult -= lipidCarboPerGram;
    //   lipidResult -= lipidPerGram;
    //   totalLipidGrams--;
    // }
    // if ((totalKcal >= bmrResult)) {

    //     while ((proteinResult < totalProtein) && (lipidResult > totalLipid)) {
    //         //salmao quebra pq tem "bastante proteina e bastante gordura"
    //         proteinResult -= lipidProteinPerGram;
    //         totalKcal -= lipidKcalPerGram;
    //         carboResult -= lipidCarboPerGram;
    //         lipidResult -= lipidPerGram;
    //         totalLipidGrams--;

    //         proteinResult += proteinPerGram;
    //         totalKcal += proteinKcalPerGram;
    //         carboResult += proteinCarboPerGram;
    //         lipidResult += proteinLipidPerGram;
    //         totalProteinGrams++;
    //     }

    // }
    // if (proteinResult > (totalProtein + (totalProtein * 0.03))) {
    //     while (proteinResult > (totalProtein + (totalProtein * 0.03))) {
    //         proteinResult -= proteinPerGram;
    //         totalKcal -= proteinKcalPerGram;
    //         carboResult -= proteinCarboPerGram;
    //         lipidResult -= proteinLipidPerGram;
    //         totalProteinGrams--;
    //     }
    // }


    proteinResult += carboProteinPerGram;
    totalKcal += carboKcalPerGram;
    carboResult += carboPerGram;
    lipidResult += carboLipidPerGram;
    totalCarboGrams++;
    // se precisar de mais fontes de carbo por exemplo, apenas criar outra..
    // proteinResult += carboProteinPerGram2;
    // totalKcal += carboKcalPerGram2;
    // carboResult += carboPerGram2;
    // lipidResult += carboLipidPerGram2;
    // totalCarboGrams2++;


  }
  const diet = {
    totalKcal: totalKcal,
    proteinSource: totalProteinGrams + `g ${protein.description.split(',')[0]}`,
    lipidSource: totalLipidGrams + `g ${lipid.description.split(',')[0]}`,
    carboSource: totalCarboGrams + `g ${carbo.description.split(',')[0]}`,
    foods: foodList,
    totalProteinInMeal: proteinResult,
    totalLipidInMeal: lipidResult,
    totalCarboInMeal: carboResult,
  }
  return diet;
}

function calculateDiet(foodListBreakfast, totalProteinBreakfast, totalLipidBreakfast, totalCaloriesBreakFast, foodListLunch, totalProteinLunch,
  totalLipidLunch,
  totalCaloriesInLunch, afternoonFoodList, totalProteinAfternoonMeal, totalLipidAfternoonMeal, totalCaloriesInAfternoonMeal,) {
  const breakfastResult = calculateMeal(foodListBreakfast, totalProteinBreakfast, totalLipidBreakfast, totalCaloriesBreakFast)
  const lunchResult = calculateMeal(foodListLunch, totalProteinLunch, totalLipidLunch, totalCaloriesInLunch)
  const afternoonMealResult = calculateMeal(afternoonFoodList, totalProteinAfternoonMeal, totalLipidAfternoonMeal, totalCaloriesInAfternoonMeal)
  totalProteinInLastMeal = totalProteinInMeal - (breakfastResult.totalProteinInMeal + lunchResult.totalProteinInMeal + afternoonMealResult.totalProteinInMeal)
  totalLipidInLastMeal = totalLipidInMeal - (breakfastResult.totalLipidInMeal + lunchResult.totalLipidInMeal + afternoonMealResult.totalLipidInMeal)
  totalCaloriesInLastMeal = totalCaloriesInMeal - (breakfastResult.totalKcal + lunchResult.totalKcal + afternoonMealResult.totalKcal)
  const lastMealResult = calculateMeal(foodListLunch, totalProteinInLastMeal, totalLipidInLastMeal, totalCaloriesInLastMeal)

  const totalMacrosInDiet = {
    totalCaloriesInDiet: (breakfastResult.totalKcal + lunchResult.totalKcal + afternoonMealResult.totalKcal + lastMealResult.totalKcal),
    totalProteinInDiet: (breakfastResult.totalProteinInMeal + lunchResult.totalProteinInMeal + afternoonMealResult.totalProteinInMeal + lastMealResult.totalProteinInMeal),
    totalLipidInDiet: (breakfastResult.totalLipidInMeal + lunchResult.totalLipidInMeal + afternoonMealResult.totalLipidInMeal + lastMealResult.totalLipidInMeal),
    totalCarboInDiet: (breakfastResult.totalCarboInMeal + lunchResult.totalCarboInMeal + afternoonMealResult.totalCarboInMeal + lastMealResult.totalCarboInMeal)
  }
  const fullDiet = {
    breakfastResult,
    lunchResult,
    afternoonMealResult,
    lastMealResult,
    totalMacrosInDiet
  }
  console.log(fullDiet)
}
calculateDiet(breakFastFoodList, totalProteinBreakfast, totalLipidBreakfast, totalCaloriesBreakfast, foodListLunch, totalProteinLunch,
  totalLipidLunch,
  totalCaloriesInLunch, afternoonFoodList, totalProteinAfternoonMeal, totalLipidAfternoonMeal, totalCaloriesInAfternoonMeal)
