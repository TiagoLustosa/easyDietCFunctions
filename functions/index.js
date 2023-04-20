
const functions = require("firebase-functions");

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

        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        const totalMacrosInDiet = {
            totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal),
            totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal),
            totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal),
            totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                firstMealResult,
                secondMealResult,
            },
            totalMacrosInDiet
        }

        return fullDiet;
    } else if (userData.numberOfMeals == 3) {

        const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        const secondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

        totalProteinInThirdMeal = totalProteinInMeal - (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal)
        totalLipidInThirdMeal = totalLipidInMeal - (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal)
        totalCaloriesInThirdMeal = totalCaloriesInMeal - (firstMealResult.totalKcal + secondMealResult.totalKcal)




        const thirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)
        const totalMacrosInDiet = {
            totalCaloriesInDiet: (firstMealResult.totalKcal + secondMealResult.totalKcal + thirdMealResult.totalKcal),
            totalProteinInDiet: (firstMealResult.totalProteinInMeal + secondMealResult.totalProteinInMeal + thirdMealResult.totalProteinInMeal),
            totalLipidInDiet: (firstMealResult.totalLipidInMeal + secondMealResult.totalLipidInMeal + thirdMealResult.totalLipidInMeal),
            totalCarboInDiet: (firstMealResult.totalCarboInMeal + secondMealResult.totalCarboInMeal + thirdMealResult.totalCarboInMeal)
        }
        const fullDiet = {
            meals: {
                firstMealResult,
                secondMealResult,
                thirdMealResult,
            },
            totalMacrosInDiet
        }


        return fullDiet;
    }
    else if (userData.numberOfMeals == 4 || user.userData == null) {
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
            meals: {
                firstMealResult,
                secondMealResult,
                thirdMealResult,
                fourthMealResult,
            },

            totalMacrosInDiet
        }


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
            meals: {
                firstMealResult,
                secondMealResult,
                thirdMealResult,
                fourthMealResult,
                fifthMealResult,
            },
            totalMacrosInDiet
        }


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
            meals: {
                firstMealResult,
                secondMealResult,
                thirdMealResult,
                fourthMealResult,
                sixthMealResult,
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

