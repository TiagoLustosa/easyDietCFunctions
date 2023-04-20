
const functions = require("firebase-functions");

exports.diet = functions.database.ref('/user/{id}').onCreate((snapshot, context) => {
    const userData = snapshot.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);
    totalProteinInMeal = macros.totalProtein
    totalLipidInMeal = macros.totalLipid
    totalCaloriesInMeal = bmr
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
    totalProteinInMeal = macros.totalProtein
    totalLipidInMeal = macros.totalLipid
    totalCaloriesInMeal = bmr
    const diet = calculateDiet(userData);
    return change.after.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
});

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

        const aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        const totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                aFirstMealResult,
                bSecondMealResult,
            },
            totalMacrosInDiet
        }

        return fullDiet;
    } else if (userData.numberOfMeals == 3) {

        const aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

        totalProteinInThirdMeal = totalProteinInMeal - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)
        totalLipidInThirdMeal = totalLipidInMeal - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)
        totalCaloriesInThirdMeal = totalCaloriesInMeal - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)




        const cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)
        const totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                aFirstMealResult,
                bSecondMealResult,
                cThirdMealResult,
            },
            totalMacrosInDiet
        }


        return fullDiet;
    }
    else if (userData.numberOfMeals == 4 || userData.numberOfMeals == null) {
        const aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)

        const bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)


        const cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
        totalProteinInFourthMeal = totalProteinInMeal - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)
        totalLipidInFourthMeal = totalLipidInMeal - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)
        totalCaloriesInFourthMeal = totalCaloriesInMeal - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)
        const dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

        const totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                aFirstMealResult,
                bSecondMealResult,
                cThirdMealResult,
                dFourthMealResult,
            },

            totalMacrosInDiet
        }


        return fullDiet;
    } else if (userData.numberOfMeals == 5) {
        const aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)

        const bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)


        const cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
        const dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)

        totalProteinInFifthMeal = totalProteinInMeal - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)
        totalLipidInFifthMeal = totalLipidInMeal - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)
        totalCaloriesInFifthMeal = totalCaloriesInMeal - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)

        const eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

        const totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                aFirstMealResult,
                bSecondMealResult,
                cThirdMealResult,
                dFourthMealResult,
                eFifthMealResult,
            },
            totalMacrosInDiet
        }


        return fullDiet;
    } else {
        const aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        const cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
        const dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)
        const eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinFifthMeal, totalLipidFifthMeal, totalCaloriesInFifthMeal)

        totalProteinInSixthMeal = totalProteinInMeal - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal)
        totalLipidInSixthMeal = totalLipidInMeal - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal)
        totalCaloriesInSixthMeal = totalCaloriesInMeal - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal)

        const fSixthMealResult = calculateMeal(userData.sixthMealFoodList, totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)

        const totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal + fSixthMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal + fSixthMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal + fSixthMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal + fSixthMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                aFirstMealResult,
                bSecondMealResult,
                cThirdMealResult,
                dFourthMealResult,
                eFifthMealResult,
                fSixthMealResult,
            },
            totalMacrosInDiet
        }


        return fullDiet;
    }
}

function numberOfMeals(numberOfMeals) {
    if (numberOfMeals == 2) {
        totalProteinFirstMeal = totalProteinInMeal * 0.5
        totalLipidFirstMeal = totalLipidInMeal * 0.5
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.5

        totalProteinSecondMeal = totalProteinInMeal * 0.5
        totalLipidSecondMeal = totalLipidInMeal * 0.5
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.5
    } else if (numberOfMeals == 3) {
        totalProteinFirstMeal = totalProteinInMeal * 0.33
        totalLipidFirstMeal = totalLipidInMeal * 0.33
        totalCaloriesFirstMeal = totalCaloriesInMeal * 0.33

        totalProteinSecondMeal = totalProteinInMeal * 0.33
        totalLipidSecondMeal = totalLipidInMeal * 0.33
        totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.33

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

