const firstMealFoodList = [
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 0,
    "category_id": 6,
    "description": "Carne, bovina, coxão mole, sem gordura, cozido",
    "energyInKcal": 218.6751,
    "fiber": 0,
    "highProtein": true,
    "id": 351,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/bovino-cozido.jpg?alt=media&token=166a2c1d-2538-4ba7-99c2-894e6df6147a",
    "lipid": 8.91333333333333,
    "protein": 32.3833333333333
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 0,
    "category_id": 4,
    "description": "Azeite, de oliva, extra virgem",
    "energyInKcal": 884,
    "fiber": 0,
    "highLipid": true,
    "id": 260,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/azeite-oliva.jpg?alt=media&token=4a7b3407-9257-4717-836f-c4f81740729e",
    "lipid": 100,
    "protein": 0
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
    "id": 3,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/arroz-branco.jpg?alt=media&token=ab13cc9b-9497-43e5-a79f-647015cb8e9d",
    "lipid": 0.227,
    "protein": 2.52081666666667
  }
]
const secondMealFoodList = [
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 0,
    "category_id": 6,
    "description": "Carne, bovina, coxão mole, sem gordura, cozido",
    "energyInKcal": 218.6751,
    "fiber": 0,
    "highProtein": true,
    "id": 351,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/bovino-cozido.jpg?alt=media&token=166a2c1d-2538-4ba7-99c2-894e6df6147a",
    "lipid": 8.91333333333333,
    "protein": 32.3833333333333
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 29.134966000557,
    "category_id": 15,
    "description": "Castanha-de-caju, torrada, salgada",
    "energyInKcal": 570.167626501619,
    "fiber": 3.663,
    "highLipid": true,
    "id": 588,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/castanha-caju.jpg?alt=media&token=4c4cfe2b-8689-4170-b2c7-0d9c6fa04cf3",
    "lipid": 46.2796666666667,
    "protein": 18.5093673327764
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 11.94375,
    "category_id": 2,
    "description": "Batata, inglesa, cozida",
    "energyInKcal": 51.5884766362707,
    "fiber": 1.34333333333333,
    "highCarb": true,
    "id": 91,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/batata-inglesa.jpg?alt=media&token=4d6b4ed7-dc90-4e1c-b5c6-b1451e74e1c1",
    "lipid": 0,
    "protein": 1.16458333333333
  }
]
const thirdMealFoodList = [
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 0,
    "category_id": 6,
    "description": "Frango, sobrecoxa, sem pele, assada",
    "energyInKcal": 232.883396666667,
    "fiber": 0,
    "highProtein": true,
    "id": 413,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/frango-sobrecoxa.jpg?alt=media&token=1f27ee09-4415-4873-ae90-749ae42536f9",
    "lipid": 12.0073333333333,
    "protein": 29.175
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 29.134966000557,
    "category_id": 15,
    "description": "Castanha-de-caju, torrada, salgada",
    "energyInKcal": 570.167626501619,
    "fiber": 3.663,
    "highLipid": true,
    "id": 588,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/castanha-caju.jpg?alt=media&token=4c4cfe2b-8689-4170-b2c7-0d9c6fa04cf3",
    "lipid": 46.2796666666667,
    "protein": 18.5093673327764
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 25.80975,
    "category_id": 1,
    "description": "Arroz, integral, cozido",
    "energyInKcal": 123.5348925,
    "fiber": 2.74933333333333,
    "highCarb": true,
    "id": 1,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/arroz-integral.jpg?alt=media&token=d5cae75f-ab6b-4bea-9c2f-c310122cf303",
    "lipid": 1.00033333333333,
    "protein": 2.58825
  }
]
const fourthMealFoodList = [
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 0,
    "category_id": 6,
    "description": "Frango, peito, sem pele, cozido",
    "energyInKcal": 162.874763346314,
    "fiber": 0,
    "highProtein": true,
    "id": 408,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/frango-peito-grelhado.jpg?alt=media&token=71e89715-68b0-42f6-be94-496faba9efff",
    "lipid": 3.16,
    "protein": 31.46875
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 18.702486509641,
    "description": "Amendoim, torrado, salgado",
    "energyInKcal": 605.781092917019,
    "fiber": 7.76333333333333,
    "highLipid": true,
    "id": 558,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/amendoim-torrado.jpg?alt=media&token=c015c15a-e715-4f32-ada3-e7fbfcea56a4",
    "lipid": 53.9633333333333,
    "protein": 22.4751801570257
  },
  {
    "baseQuantity": 100,
    "base_unit": "g",
    "carbohydrate": 25.80975,
    "category_id": 1,
    "description": "Arroz, integral, cozido",
    "energyInKcal": 123.5348925,
    "fiber": 2.74933333333333,
    "highCarb": true,
    "id": 1,
    "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/arroz-integral.jpg?alt=media&token=d5cae75f-ab6b-4bea-9c2f-c310122cf303",
    "lipid": 1.00033333333333,
    "protein": 2.58825
  }
]


let totalProteinInMeal = 160
let totalLipidInMeal = 80
let totalCaloriesInMeal = 2500

let totalProteinFirstMeal = totalProteinInMeal * 0.2
let totalLipidFirstMeal = totalLipidInMeal * 0.2
let totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

let totalProteinSecondMeal = totalProteinInMeal * 0.3
let totalLipidSecondMeal = totalLipidInMeal * 0.3
let totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.3

let totalProteinThirdMeal = totalProteinInMeal * 0.2
let totalLipidThirdMeal = totalLipidInMeal * 0.2
let totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2

let totalProteinInFourthMeal
let totalLipidInFourthMeal
let totalCaloriesInFourthMeal

let mealNumber = 1;

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

    if (mealNumber == 1 && (protein.protein / protein.lipid < 2.4 || lipid.protein / lipid.lipid < 2.4)) {
      let highFatMeal = totalCaloriesFirstMeal * 0.17;

      //  console.log(mealNumber)
      let totalGramsFromLipidSource = highFatMeal / lipidKcalPerGram
      //  console.log(totalGramsFromLipidSource)
      while (totalLipidGrams < totalGramsFromLipidSource) {
        proteinResult += lipidProteinPerGram;
        totalKcal += lipidKcalPerGram;
        carboResult += lipidCarboPerGram;
        lipidResult += lipidPerGram;
        totalLipidGrams++;
      }
    }
    while (proteinResult < totalProtein) {
      proteinResult += proteinPerGram;
      totalKcal += proteinKcalPerGram;
      carboResult += proteinCarboPerGram;
      lipidResult += proteinLipidPerGram;
      totalProteinGrams++;
    }
    if (lipidResult < totalLipid) {
      proteinResult += lipidProteinPerGram;
      totalKcal += lipidKcalPerGram;
      carboResult += lipidCarboPerGram;
      lipidResult += lipidPerGram;
      totalLipidGrams++;

    }
    if ((totalKcal >= totalCaloriesInMeal)) {

      while ((proteinResult < totalProtein) || (lipidResult > totalLipid)) {
        //salmao quebra pq tem "bastante proteina e bastante gordura"
        proteinResult -= lipidProteinPerGram;
        totalKcal -= lipidKcalPerGram;
        carboResult -= lipidCarboPerGram;
        lipidResult -= lipidPerGram;
        totalLipidGrams--;

        proteinResult += proteinPerGram;
        totalKcal += proteinKcalPerGram;
        carboResult += proteinCarboPerGram;
        lipidResult += proteinLipidPerGram;
        totalProteinGrams++;
      }

    }
    if (proteinResult > (totalProtein + (totalProtein * 0.03))) {
      while (proteinResult > (totalProtein + (totalProtein * 0.03))) {
        proteinResult -= proteinPerGram;
        totalKcal -= proteinKcalPerGram;
        carboResult -= proteinCarboPerGram;
        lipidResult -= proteinLipidPerGram;
        totalProteinGrams--;
      }
    }

    proteinResult += carboProteinPerGram;
    totalKcal += carboKcalPerGram;
    carboResult += carboPerGram;
    lipidResult += carboLipidPerGram;
    totalCarboGrams++;

  }
  const mealResult = {
    totalKcal: totalKcal,
    proteinSource: totalProteinGrams,
    lipidSource: totalLipidGrams,
    carboSource: totalCarboGrams,
    foods: foodList,
    totalProteinInMeal: proteinResult,
    totalLipidInMeal: lipidResult,
    totalCarboInMeal: carboResult,
  }
  mealNumber++
  return mealResult;
}

function calculateDiet(foodListFirstMeal, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal, secondMealFoodList, totalProteinSecondMeal,
  totalLipidSecondMeal,
  totalCaloriesInSecondMeal, thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal,) {
  const firstMealResult = calculateMeal(foodListFirstMeal, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
  const secondMealResult = calculateMeal(secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
  const thirdMealResult = calculateMeal(thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
  totalProteinInFourthMeal = totalProteinInMeal - (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal)
  totalLipidInFourthMeal = totalLipidInMeal - (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal)
  totalCaloriesInFourthMeal = totalCaloriesInMeal - (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal)
  const fourthMealResult = calculateMeal(fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

  const totalMacrosInDiet = {
    totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal + fourthMealResult.totalKcal),
    totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal + fourthMealResult.totalProteinInMeal),
    totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal + fourthMealResult.totalLipidInMeal),
    totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal + thirdMealResult.totalCarboInMeal + fourthMealResult.totalCarboInMeal)
  }
  const fullDiet = {
    firstMealResult,
    secondMealResult,
    thirdMealResult,
    fourthMealResult,
    totalMacrosInDiet
  }
  console.log(fullDiet)
  return fullDiet;
}
calculateDiet(firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal, secondMealFoodList, totalProteinSecondMeal,
  totalLipidSecondMeal,
  totalCaloriesInSecondMeal, thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
