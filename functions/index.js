
const functions = require("firebase-functions");

const userData = {
    "age": 49,
    "weight": 71,
    "height": 190,
    "activityLevel": "lightlyActive",
    "gender": "female",
    "proteinPerKilogramOfBodyWeight": 2.0,
    "dietObjective": "loseWeight",
    "numberOfMeals": 6,
    "firstMealFoodList": [
        {
            "baseQuantity": 100,
            "base_unit": "g",
            "carbohydrate": 0,
            "category_id": 6,
            "description": "Carne, bovina, acém, moído, cozido",
            "energyInKcal": 212.4204,
            "fiber": 0,
            "highProtein": true,
            "id": 326,
            "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/carne-moida-cozida.jpg?alt=media&token=773ea7bd-59b4-4565-9c7b-75edf3718518",
            "lipid": 10.9166666666667,
            "protein": 26.6866666666667
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
            "carbohydrate": 30.09,
            "category_id": 2,
            "description": "Mandioca, cozida",
            "energyInKcal": 125.35825,
            "fiber": 1.55666666666667,
            "highCarb": true,
            "id": 129,
            "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/mandioca-cozida.jpg?alt=media&token=48631a39-3b12-4131-be0d-f087d3b78ef3",
            "lipid": 0.298333333333333,
            "protein": 0.575
        }
    ],
    "secondMealFoodList": [
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
            "carbohydrate": 18.4223333333333,
            "category_id": 2,
            "description": "Batata, doce, cozida",
            "energyInKcal": 76.7596105034352,
            "fiber": 2.212,
            "highCarb": true,
            "id": 88,
            "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/batata-doce.jpg?alt=media&token=4e0066dd-3a6d-4ad2-8c40-e5a6c50b8a19",
            "lipid": 0.087666666666667,
            "protein": 0.641666666666667
        }
    ],
    "thirdMealFoodList": [
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
            "carbohydrate": 18.4223333333333,
            "category_id": 2,
            "description": "Batata, doce, cozida",
            "energyInKcal": 76.7596105034352,
            "fiber": 2.212,
            "highCarb": true,
            "id": 88,
            "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/batata-doce.jpg?alt=media&token=4e0066dd-3a6d-4ad2-8c40-e5a6c50b8a19",
            "lipid": 0.087666666666667,
            "protein": 0.641666666666667
        }
    ],
    "fourthMealFoodList": [
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
    ],
    "fifthMealFoodList": [{
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
        "carbohydrate": 30.09,
        "category_id": 2,
        "description": "Mandioca, cozida",
        "energyInKcal": 125.35825,
        "fiber": 1.55666666666667,
        "highCarb": true,
        "id": 129,
        "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/mandioca-cozida.jpg?alt=media&token=48631a39-3b12-4131-be0d-f087d3b78ef3",
        "lipid": 0.298333333333333,
        "protein": 0.575
    },],
    "sixthMealFoodList": [{
        "baseQuantity": 100,
        "base_unit": "g",
        "carbohydrate": 0,
        "category_id": 6,
        "description": "Carne, bovina, acém, moído, cozido",
        "energyInKcal": 212.4204,
        "fiber": 0,
        "highProtein": true,
        "id": 326,
        "image": "https://firebasestorage.googleapis.com/v0/b/easydiet-48b9e.appspot.com/o/carne-moida-cozida.jpg?alt=media&token=773ea7bd-59b4-4565-9c7b-75edf3718518",
        "lipid": 10.9166666666667,
        "protein": 26.6866666666667
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
    },]
}


const calculateTotalMacros = (userData) => {
    const totalProtein = userData.weight * userData.proteinPerKilogramOfBodyWeight;
    const totalLipid = userData.weight * 1;
    const macros = {
        totalProtein: totalProtein,
        totalLipid: totalLipid,
    }
    return macros;
}


let totalProteinInMeal;
let totalLipidInMeal;
let totalCaloriesInMeal;

let totalProteinFirstMeal;
let totalLipidFirstMeal;
let totalCaloriesFirstMeal;

let totalProteinSecondMeal;
let totalLipidSecondMeal;
let totalCaloriesInSecondMeal;

let totalProteinThirdMeal;
let totalLipidThirdMeal;
let totalCaloriesInThirdMeal;

let totalProteinInFourthMeal
let totalLipidInFourthMeal
let totalCaloriesInFourthMeal

let totalProteinInFifthMeal
let totalLipidInFifthMeal
let totalCaloriesInFifthMeal

function calculateBasalMetabolicRate(userData) {
    let activityLevelFactor = 1.2;
    let dietObjective = 0;

    if (userData.dietObjective == 'maintainWeight') {
        dietObjective = 0;
    }
    if (userData.dietObjective == 'loseWeight') {
        dietObjective = -500;
    }
    if (userData.dietObjective == 'gainWeight') {
        dietObjective = 500;
    }
    if (userData.activityLevel == 'sedentary') {
        activityLevelFactor = 1.2
    }
    if (userData.activityLevel == 'lightlyActive') {
        activityLevelFactor = 1.375
    }
    if (userData.activityLevel == 'moderatelyActive') {
        activityLevelFactor = 1.55
    }
    if (userData.activityLevel == 'veryActive') {
        activityLevelFactor = 1.725
    }
    if (userData.activityLevel == 'superActive') {
        activityLevelFactor = 1.9
    }
    if (userData.gender == 'male') {
        return (66.47 + (13.75 * userData.weight)
            + (5.003 * userData.height)
            - (6.755 * userData.age)) * activityLevelFactor + dietObjective;
    } else {
        return (655.1 + (9.563 * userData.weight)
            + (1.85 * userData.height)
            - (4.676 * userData.age)) * activityLevelFactor + dietObjective;
    }
}





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

            while ((proteinResult < totalProtein) && (lipidResult > totalLipid)) {
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
    return mealResult;
}

function calculateDiet(userData) {
    numberOfMeals(userData.numberOfMeals)
    if (userData.numberOfMeals == 2) {
        console.log('to aqui no 2')
        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        const totalMacrosInDiet = {
            totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal),
            totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal),
            totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal),
            totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            firstMealResult,
            secondMealResult,
            totalMacrosInDiet
        }
        console.table(fullDiet)
        return fullDiet;
    } else if (userData.numberOfMeals == 3) {
        console.log('to aqui no 3')
        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

        totalProteinInThirdMeal = totalProteinInMeal - (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal)
        totalLipidInThirdMeal = totalLipidInMeal - (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal)
        totalCaloriesInThirdMeal = totalCaloriesInMeal - (firstMealResult.totalKcal + secondMealResult.totalKcal)

        console.log(totalProteinInThirdMeal)
        console.log(totalLipidInThirdMeal)
        console.log(totalCaloriesInThirdMeal)
        const thirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)
        const totalMacrosInDiet = {
            totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal),
            totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal),
            totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal),
            totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal + thirdMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            firstMealResult,
            secondMealResult,
            thirdMealResult,
            totalMacrosInDiet
        }

        console.table(fullDiet)
        return fullDiet;
    }
    else if (userData.numberOfMeals == 4) {
        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)

        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)


        const thirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
        totalProteinInFourthMeal = totalProteinInMeal - (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal)
        totalLipidInFourthMeal = totalLipidInMeal - (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal)
        totalCaloriesInFourthMeal = totalCaloriesInMeal - (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal)
        const fourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

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
        console.log('to no 4')
        console.table(fullDiet)
        return fullDiet;
    } else if (userData.numberOfMeals == 5) {
        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)

        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)


        const thirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
        const fourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)

        totalProteinInFifthMeal = totalProteinInMeal - (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal + fourthMealResult.totalProteinInMeal)
        totalLipidInFifthMeal = totalLipidInMeal - (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal + fourthMealResult.totalLipidInMeal)
        totalCaloriesInFifthMeal = totalCaloriesInMeal - (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal + fourthMealResult.totalKcal)

        const fifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

        const totalMacrosInDiet = {
            totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal + fourthMealResult.totalKcal + fifthMealResult.totalKcal),
            totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal + fourthMealResult.totalProteinInMeal + fifthMealResult.totalProteinInMeal),
            totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal + fourthMealResult.totalLipidInMeal + fifthMealResult.totalLipidInMeal),
            totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal + thirdMealResult.totalCarboInMeal + fourthMealResult.totalCarboInMeal + fifthMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            firstMealResult,
            secondMealResult,
            thirdMealResult,
            fourthMealResult,
            fifthMealResult,
            totalMacrosInDiet
        }
        console.log('to no 5')
        console.table(fullDiet)
        return fullDiet;
    } else {
        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        const thirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
        const fourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)
        const fifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinFifthMeal, totalLipidFifthMeal, totalCaloriesInFifthMeal)

        totalProteinInSixthMeal = totalProteinInMeal - (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal + fourthMealResult.totalProteinInMeal + fifthMealResult.totalProteinInMeal)
        totalLipidInSixthMeal = totalLipidInMeal - (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal + fourthMealResult.totalLipidInMeal + fifthMealResult.totalLipidInMeal)
        totalCaloriesInSixthMeal = totalCaloriesInMeal - (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal + fourthMealResult.totalKcal + fifthMealResult.totalKcal)

        const sixthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)

        const totalMacrosInDiet = {
            totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal + fourthMealResult.totalKcal + fifthMealResult.totalKcal + sixthMealResult.totalKcal),
            totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal + fourthMealResult.totalProteinInMeal + fifthMealResult.totalProteinInMeal + sixthMealResult.totalProteinInMeal),
            totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal + fourthMealResult.totalLipidInMeal + fifthMealResult.totalLipidInMeal + sixthMealResult.totalLipidInMeal),
            totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal + thirdMealResult.totalCarboInMeal + fourthMealResult.totalCarboInMeal + fifthMealResult.totalCarboInMeal + sixthMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            firstMealResult,
            secondMealResult,
            thirdMealResult,
            fourthMealResult,
            sixthMealResult,
            totalMacrosInDiet
        }
        console.log('to no 6')
        console.table(fullDiet)
        return fullDiet;
    }
}
const bmr = calculateBasalMetabolicRate(userData);
const macros = calculateTotalMacros(userData);

totalProteinInMeal = macros.totalProtein
totalLipidInMeal = macros.totalLipid
totalCaloriesInMeal = bmr
function numberOfMeals(numberOfMeals) {
    if (numberOfMeals == 2) {
        totalProteinFirstMeal = totalProteinInMeal * 0.5
        totalLipidFirstMeal = totalLipidInMeal * 0.5
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.5

        totalProteinSecondMeal = totalProteinInMeal * 0.5
        totalLipidSecondMeal = totalLipidInMeal * 0.5
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.5
    } else if (numberOfMeals == 3) {
        totalProteinFirstMeal = totalProteinInMeal * 0.30
        totalLipidFirstMeal = totalLipidInMeal * 0.30
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.30

        totalProteinSecondMeal = totalProteinInMeal * 0.35
        totalLipidSecondMeal = totalLipidInMeal * 0.35
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.35

    }
    else if (numberOfMeals == 4) {
        totalProteinFirstMeal = totalProteinInMeal * 0.2
        totalLipidFirstMeal = totalLipidInMeal * 0.2
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

        totalProteinSecondMeal = totalProteinInMeal * 0.3
        totalLipidSecondMeal = totalLipidInMeal * 0.3
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.3

        totalProteinThirdMeal = totalProteinInMeal * 0.2
        totalLipidThirdMeal = totalLipidInMeal * 0.2
        totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2
    }
    else if (numberOfMeals == 5) {
        totalProteinFirstMeal = totalProteinInMeal * 0.2
        totalLipidFirstMeal = totalLipidInMeal * 0.2
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

        totalProteinSecondMeal = totalProteinInMeal * 0.2
        totalLipidSecondMeal = totalLipidInMeal * 0.2
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.2

        totalProteinThirdMeal = totalProteinInMeal * 0.2
        totalLipidThirdMeal = totalLipidInMeal * 0.2
        totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2

        totalProteinFourthMeal = totalProteinInMeal * 0.2
        totalLipidFourthMeal = totalLipidInMeal * 0.2
        totalCaloriesInFourthMeal = totalCaloriesInMeal * 0.2
    } else {
        totalProteinFirstMeal = totalProteinInMeal * 0.125
        totalLipidFirstMeal = totalLipidInMeal * 0.125
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.125

        totalProteinSecondMeal = totalProteinInMeal * 0.125
        totalLipidSecondMeal = totalLipidInMeal * 0.125
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.125

        totalProteinThirdMeal = totalProteinInMeal * 0.25
        totalLipidThirdMeal = totalLipidInMeal * 0.25
        totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.25

        totalProteinFourthMeal = totalProteinInMeal * 0.125
        totalLipidFourthMeal = totalLipidInMeal * 0.125
        totalCaloriesInFourthMeal = totalCaloriesInMeal * 0.125

        totalProteinFifthMeal = totalProteinInMeal * 0.25
        totalLipidFifthMeal = totalLipidInMeal * 0.25
        totalCaloriesInFifthMeal = totalCaloriesInMeal * 0.25
    }
}

exports.diet = functions.database.ref('/user/{id}').onCreate((snapshot, context) => {
    const userData = snapshot.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);

    const diet = calculateDiet(userData);
    return snapshot.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });

});

exports.dietUpdate = functions.database.ref('/user/{id}').onUpdate((change, context) => {
    if (!change.after.exists()) {
        return null;
    }
    const userData = change.after.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);

    const diet = calculateDiet(userData);
    return change.after.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
});