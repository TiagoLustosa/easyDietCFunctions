const functions = require("firebase-functions");

exports.diet = functions.database.ref('/user/{id}').onCreate((snapshot, context) => {
    const userData = snapshot.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);


    // if (context.params.id == 'QrWi0NJpQYP31S1B4mVbxFfMJ1L2' || context.params.id == 'uwzRdt1fOZYoXaFyNUZRXYpeTQ82') {
    totalProteinInAllMeals = macros.totalProtein
    totalLipidInAllMeals = macros.totalLipid
    totalCaloriesInAllMeals = bmr

    const diet = calculateDiet(userData);
    return snapshot.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
    // } else {
    //     totalProteinInMeal = macros.totalProtein
    //     totalLipidInMeal = macros.totalLipid
    //     totalCaloriesInMeal = bmr

    //     totalProteinFirstMeal = totalProteinInMeal * 0.2
    //     totalLipidFirstMeal = totalLipidInMeal * 0.2
    //     totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

    //     totalProteinSecondMeal = totalProteinInMeal * 0.3
    //     totalLipidSecondMeal = totalLipidInMeal * 0.3
    //     totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.3

    //     totalProteinThirdMeal = totalProteinInMeal * 0.2
    //     totalLipidThirdMeal = totalLipidInMeal * 0.2
    //     totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2

    //     const diet = calculateDietFourMeals(userData);
    //     return snapshot.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
    // }


});

exports.dietUpdate = functions.database.ref('/user/{id}').onUpdate((change, context) => {
    if (!change.after.exists()) {
        return null;
    }
    const userData = change.after.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);
    // if (context.params.id == 'QrWi0NJpQYP31S1B4mVbxFfMJ1L2' || context.params.id == 'uwzRdt1fOZYoXaFyNUZRXYpeTQ82') {
    totalProteinInAllMeals = macros.totalProtein
    totalLipidInAllMeals = macros.totalLipid
    totalCaloriesInAllMeals = bmr
    const diet = calculateDiet(userData);
    return change.after.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
    // } else {
    //     totalProteinInMeal = macros.totalProtein
    //     totalLipidInMeal = macros.totalLipid
    //     totalCaloriesInMeal = bmr

    //     totalProteinFirstMeal = totalProteinInMeal * 0.2
    //     totalLipidFirstMeal = totalLipidInMeal * 0.2
    //     totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

    //     totalProteinSecondMeal = totalProteinInMeal * 0.3
    //     totalLipidSecondMeal = totalLipidInMeal * 0.3
    //     totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.3

    //     totalProteinThirdMeal = totalProteinInMeal * 0.2
    //     totalLipidThirdMeal = totalLipidInMeal * 0.2
    //     totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2

    //     const diet = calculateDietFourMeals(userData);
    //     return change.after.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
    // }


});

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

// const calculateDiet = (foodList, totalProtein, totalLipid, bmrResult) => {
//     let totalProteinGrams = 0, proteinResult = 0;
//     let totalLipidGrams = 0, lipidResult = 0;
//     let totalCarboGrams = 0, carboResult = 0;
//     let totalKcal = 0.0;
//     const protein = foodList.find((e) => e.highProtein == true);
//     const lipid = foodList.find((e) => e.highLipid == true);
//     const carbo = foodList.find((e) => e.highCarb == true);

//     const proteinPerGram = protein.protein / 100;
//     const proteinKcalPerGram = protein.energyInKcal / 100;
//     const proteinLipidPerGram = protein.lipid / 100;
//     const proteinCarboPerGram = protein.carbohydrate / 100;

//     const lipidPerGram = lipid.lipid / 100;
//     const lipidKcalPerGram = lipid.energyInKcal / 100;
//     const lipidProteinPerGram = lipid.protein / 100;
//     const lipidCarboPerGram = lipid.carbohydrate / 100;

//     const carboPerGram = carbo.carbohydrate / 100;
//     const carboKcalPerGram = carbo.energyInKcal / 100;
//     const carboLipidPerGram = carbo.lipid / 100;
//     const carboProteinPerGram = carbo.protein / 100;
//     while (totalKcal < bmrResult) {
//         while (proteinResult < totalProtein) {
//             proteinResult += proteinPerGram;
//             totalKcal += proteinKcalPerGram;
//             carboResult += proteinCarboPerGram;
//             lipidResult += proteinLipidPerGram;
//             totalProteinGrams++;
//         }
//         if (lipidResult < totalLipid) {
//             proteinResult += lipidProteinPerGram;
//             totalKcal += lipidKcalPerGram;
//             carboResult += lipidCarboPerGram;
//             lipidResult += lipidPerGram;
//             totalLipidGrams++;

//         }
//         if ((totalKcal >= bmrResult)) {

//             while ((proteinResult < totalProtein) && (lipidResult > totalLipid)) {
//                 //salmao quebra pq tem "bastante proteina e bastante gordura"
//                 proteinResult -= lipidProteinPerGram;
//                 totalKcal -= lipidKcalPerGram;
//                 carboResult -= lipidCarboPerGram;
//                 lipidResult -= lipidPerGram;
//                 totalLipidGrams--;

//                 proteinResult += proteinPerGram;
//                 totalKcal += proteinKcalPerGram;
//                 carboResult += proteinCarboPerGram;
//                 lipidResult += proteinLipidPerGram;
//                 totalProteinGrams++;
//             }

//         }
//         if (proteinResult > (totalProtein + (totalProtein * 0.03))) {
//             while (proteinResult > (totalProtein + (totalProtein * 0.03))) {
//                 proteinResult -= proteinPerGram;
//                 totalKcal -= proteinKcalPerGram;
//                 carboResult -= proteinCarboPerGram;
//                 lipidResult -= proteinLipidPerGram;
//                 totalProteinGrams--;
//             }
//         }

//         proteinResult += carboProteinPerGram;
//         totalKcal += carboKcalPerGram;
//         carboResult += carboPerGram;
//         lipidResult += carboLipidPerGram;
//         totalCarboGrams++;

//     }

//     const diet = {
//         totalKcal: totalKcal,
//         protein: totalProteinGrams,
//         lipid: totalLipidGrams,
//         carbohydrate: totalCarboGrams,
//         foods: foodList,
//         totalProteinInDiet: proteinResult,
//         totalLipidInDiet: lipidResult,
//         totalCarboInDiet: carboResult,
//     }
//     return diet;
// }

const calculateTotalMacros = (userData) => {
    const totalProtein = userData.weight * userData.proteinPerKilogramOfBodyWeight;
    const totalLipid = userData.weight * 1;
    const macros = {
        totalProtein: totalProtein,
        totalLipid: totalLipid,
    }
    return macros;
}
let totalProteinInAllMeals
let totalLipidInAllMeals
let totalCaloriesInAllMeals
let numberOfMeals

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

let totalProteinInSixthMeal
let totalLipidInSixthMeal
let totalCaloriesInSixthMeal

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

function calculateDietFourMeals(userData) {
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
    return fullDiet;
}






function calculateMealChosenQuantity(foodList) {

    const protein = foodList.find((e) => e.highProtein == true);
    const lipid = foodList.find((e) => e.highLipid == true);
    const carbo = foodList.find((e) => e.highCarb == true);
    const proteinFoodGramsPerUnit = protein.amoutGramsPerUnit
    const proteinPerGram = protein.protein / 100
    const proteinKcalPerGram = protein.energyInKcal / 100
    const proteinLipidPerGram = protein.lipid / 100
    const proteinCarboPerGram = protein.carbohydrate / 100
    const proteinChosenQuantity = protein.chosenQuantity

    const lipidFoodGramsPerUnit = lipid.amoutGramsPerUnit
    const lipidPerGram = lipid.lipid / 100
    const lipidKcalPerGram = lipid.energyInKcal / 100
    const lipidProteinPerGram = lipid.protein / 100
    const lipidCarboPerGram = lipid.carbohydrate / 100
    const lipidChosenQuantity = lipid.chosenQuantity

    const carboFoodGramsPerUnit = carbo.amoutGramsPerUnit
    const carboPerGram = carbo.carbohydrate / 100
    const carboKcalPerGram = carbo.energyInKcal / 100
    const carboLipidPerGram = carbo.lipid / 100
    const carboProteinPerGram = carbo.protein / 100
    const carboChosenQuantity = carbo.chosenQuantity

    const proteinTotalProteinResult = proteinFoodGramsPerUnit * proteinPerGram * proteinChosenQuantity
    const proteinTotalKcalResult = proteinFoodGramsPerUnit * proteinKcalPerGram * proteinChosenQuantity
    const proteinTotalLipidResult = proteinFoodGramsPerUnit * proteinLipidPerGram * proteinChosenQuantity
    const proteinTotalCarboResult = proteinFoodGramsPerUnit * proteinCarboPerGram * proteinChosenQuantity

    const lipidTotalProteinResult = lipidFoodGramsPerUnit * lipidProteinPerGram * lipidChosenQuantity
    const lipidTotalKcalResult = lipidFoodGramsPerUnit * lipidKcalPerGram * lipidChosenQuantity
    const lipidTotalLipidResult = lipidFoodGramsPerUnit * lipidPerGram * lipidChosenQuantity
    const lipidTotalCarboResult = lipidFoodGramsPerUnit * lipidCarboPerGram * lipidChosenQuantity

    const carboTotalProteinResult = carboFoodGramsPerUnit * carboProteinPerGram * carboChosenQuantity
    const carboTotalKcalResult = carboFoodGramsPerUnit * carboKcalPerGram * carboChosenQuantity
    const carboTotalLipidResult = carboFoodGramsPerUnit * carboLipidPerGram * carboChosenQuantity
    const carboTotalCarboResult = carboFoodGramsPerUnit * carboPerGram * carboChosenQuantity

    const totalKcalInMeal = proteinTotalKcalResult + lipidTotalKcalResult + carboTotalKcalResult
    const proteinTotalInMeal = proteinTotalProteinResult + lipidTotalProteinResult + carboTotalProteinResult
    const lipidTotalInMeal = proteinTotalLipidResult + lipidTotalLipidResult + carboTotalLipidResult
    const carboTotalInMeal = proteinTotalCarboResult + lipidTotalCarboResult + carboTotalCarboResult

    mealResult = {
        totalKcal: totalKcalInMeal,
        proteinSource: proteinFoodGramsPerUnit * proteinChosenQuantity,
        proteinSourceKcal: proteinTotalKcalResult,
        lipidSource: lipidFoodGramsPerUnit * lipidChosenQuantity,
        lipidSourceKcal: proteinTotalKcalResult,
        carboSource: carboFoodGramsPerUnit * carboChosenQuantity,
        carboSourceKcal: carboTotalKcalResult,
        foods: foodList,
        totalProteinInMeal: proteinTotalInMeal,
        totalLipidInMeal: lipidTotalInMeal,
        totalCarboInMeal: carboTotalInMeal
    }
    return mealResult
}

function calculateDiet(userData) {
    const bmr = calculateBasalMetabolicRate(userData)

    const macros = calculateTotalMacros(userData)
    const totalProteinInAllMeals = macros.totalProtein
    const totalLipidInAllMeals = macros.totalLipid
    const totalCaloriesInAllMeals = bmr
    const numberOfMeals = userData.numberOfMeals

    if (numberOfMeals == 2) {
        totalProteinFirstMeal = totalProteinInAllMeals * 0.5
        totalLipidFirstMeal = totalLipidInAllMeals * 0.5
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.5
        totalProteinSecondMeal = totalProteinInAllMeals * 0.5
        totalLipidSecondMeal = totalLipidInAllMeals * 0.5
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.5
    }
    else if (numberOfMeals == 3) {
        totalProteinFirstMeal = totalProteinInAllMeals * 0.33
        totalLipidFirstMeal = totalLipidInAllMeals * 0.33
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.33
        totalProteinSecondMeal = totalProteinInAllMeals * 0.33
        totalLipidSecondMeal = totalLipidInAllMeals * 0.33
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.33
    }
    else if (numberOfMeals == 4) {
        totalProteinFirstMeal = totalProteinInAllMeals * 0.2
        totalLipidFirstMeal = totalLipidInAllMeals * 0.2
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.2
        totalProteinSecondMeal = totalProteinInAllMeals * 0.3
        totalLipidSecondMeal = totalLipidInAllMeals * 0.3
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.3
        totalProteinThirdMeal = totalProteinInAllMeals * 0.2
        totalLipidThirdMeal = totalLipidInAllMeals * 0.2
        totalCaloriesInThirdMeal = totalCaloriesInAllMeals * 0.2
    }
    else if (numberOfMeals == 5) {
        totalProteinFirstMeal = totalProteinInAllMeals * 0.2
        totalLipidFirstMeal = totalLipidInAllMeals * 0.2
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.2
        totalProteinSecondMeal = totalProteinInAllMeals * 0.2
        totalLipidSecondMeal = totalLipidInAllMeals * 0.2
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.2
        totalProteinThirdMeal = totalProteinInAllMeals * 0.2
        totalLipidThirdMeal = totalLipidInAllMeals * 0.2
        totalCaloriesInThirdMeal = totalCaloriesInAllMeals * 0.2
        totalProteinFourthMeal = totalProteinInAllMeals * 0.2
        totalLipidFourthMeal = totalLipidInAllMeals * 0.2
        totalCaloriesInFourthMeal = totalCaloriesInAllMeals * 0.2
    }
    else {
        totalProteinFirstMeal = totalProteinInAllMeals * 0.125
        totalLipidFirstMeal = totalLipidInAllMeals * 0.125
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.125
        totalProteinSecondMeal = totalProteinInAllMeals * 0.125
        totalLipidSecondMeal = totalLipidInAllMeals * 0.125
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.125
        totalProteinThirdMeal = totalProteinInAllMeals * 0.25
        totalLipidThirdMeal = totalLipidInAllMeals * 0.25
        totalCaloriesInThirdMeal = totalCaloriesInAllMeals * 0.25
        totalProteinFourthMeal = totalProteinInAllMeals * 0.125
        totalLipidFourthMeal = totalLipidInAllMeals * 0.125
        totalCaloriesInFourthMeal = totalCaloriesInAllMeals * 0.125
        totalProteinFifthMeal = totalProteinInAllMeals * 0.25
        totalLipidFifthMeal = totalLipidInAllMeals * 0.25
        totalCaloriesInFifthMeal = totalCaloriesInAllMeals * 0.25
    }
    if (userData.numberOfMeals == 2) {

        aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal)
        }

        fullDiet = {
            meals: {
                aFirstMealResult: aFirstMealResult,
                bSecondMealResult: bSecondMealResult,
            },
            totalMacrosInDiet: totalMacrosInDiet
        }

        return fullDiet
    }
    else if (userData.numberOfMeals == 3) {
        if (userData.numberOfMealsWithChosenQuantity == 1) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult.totalProteinInMeal) / 2
            totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult.totalLipidInMeal) / 2
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult.totalKcal) / 2
            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            totalProteinInThirdMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)
            totalLipidInThirdMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)
            totalCaloriesInThirdMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)


        } else {
            aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            totalProteinInThirdMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)
            totalLipidInThirdMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)
            totalCaloriesInThirdMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)
        }
        totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal)
        }
        fullDiet = {
            meals: {
                aFirstMealResult: aFirstMealResult,
                bSecondMealResult: bSecondMealResult,
                cThirdMealResult: cThirdMealResult,
            },
            totalMacrosInDiet: totalMacrosInDiet
        }

        return fullDiet
    }
    else if (userData.numberOfMeals == 4) {
        if (userData.numberOfMealsWithChosenQuantity == 2) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            bSecondMealResult = calculateMealChosenQuantity(userData.secondMealFoodList)
            totalProteinThirdMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)) / 2
            totalLipidThirdMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)) / 2
            totalCaloriesInThirdMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)) / 2

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)

            totalProteinInFourthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)
            totalLipidInFourthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)
            totalCaloriesInFourthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)
        } else if (userData.numberOfMealsWithChosenQuantity == 1) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult.totalProteinInMeal) / 3
            totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult.totalLipidInMeal) / 3
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult.totalKcal) / 3

            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            totalProteinInFourthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)
            totalLipidInFourthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)
            totalCaloriesInFourthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)
        }
        else {
            aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            totalProteinInFourthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)
            totalLipidInFourthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)
            totalCaloriesInFourthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)
            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

        }
        totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal)
        }
        fullDiet = {
            meals: {
                aFirstMealResult: aFirstMealResult,
                bSecondMealResult: bSecondMealResult,
                cThirdMealResult: cThirdMealResult,
                dFourthMealResult: dFourthMealResult,
            },

            totalMacrosInDiet: totalMacrosInDiet
        }

        return fullDiet
    }
    else if (userData.numberOfMeals == 5) {
        if (userData.numberOfMealsWithChosenQuantity == 3) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)

            bSecondMealResult = calculateMealChosenQuantity(userData.secondMealFoodList)

            cThirdMealResult = calculateMealChosenQuantity(userData.thirdMealFoodList)

            totalProteinInFourthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)) / 2
            totalLipidInFourthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)) / 2
            totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)) / 2

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)
            totalLipidInFifthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)
            totalCaloriesInFifthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

        }
        else if (userData.numberOfMealsWithChosenQuantity == 2) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            bSecondMealResult = calculateMealChosenQuantity(userData.secondMealFoodList)
            totalProteinThirdMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)) / 3
            totalLipidThirdMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)) / 3
            totalCaloriesInThirdMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)) / 3

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)

            totalProteinInFourthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)) / 2
            totalLipidInFourthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)) / 2
            totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)) / 2

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)
            totalLipidInFifthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)
            totalCaloriesInFifthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)
        }
        else if (userData.numberOfMealsWithChosenQuantity == 1) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult.totalProteinInMeal) / 4
            totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult.totalLipidInMeal) / 4
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult.totalKcal) / 4
            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            totalProteinThirdMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)) / 3
            totalLipidThirdMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)) / 3
            totalCaloriesInThirdMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)) / 3

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)

            totalProteinInFourthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)) / 2
            totalLipidInFourthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)) / 2
            totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)) / 2

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)
            totalLipidInFifthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)
            totalCaloriesInFifthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

        }
        else {
            aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)

            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)
            totalLipidInFifthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)
            totalCaloriesInFifthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

        }
        totalMacrosInDiet = {
            totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal),
            totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal),
            totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal),
            totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal)
        }
        fullDiet = {
            meals: {
                aFirstMealResult: aFirstMealResult,
                bSecondMealResult: bSecondMealResult,
                cThirdMealResult: cThirdMealResult,
                dFourthMealResult: dFourthMealResult,
                eFifthMealResult: eFifthMealResult,
            },
            totalMacrosInDiet: totalMacrosInDiet
        }

        return fullDiet
    }
    else {

        if (userData.numberOfMealsWithChosenQuantity == 3) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            bSecondMealResult = calculateMealChosenQuantity(userData.secondMealFoodList)
            cThirdMealResult = calculateMealChosenQuantity(userData.thirdMealFoodList)

            totalProteinInFourthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)) / 3
            totalLipidInFourthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)) / 3
            totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)) / 3

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)) / 2
            totalLipidInFifthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)) / 2
            totalCaloriesInFifthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)) / 2

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

            totalProteinInSixthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal)
            totalLipidInSixthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal)
            totalCaloriesInSixthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal)

            fSixthMealResult = calculateMeal(userData.sixthMealFoodList, totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)

            totalMacrosInDiet = {
                totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal + fSixthMealResult.totalKcal),
                totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal + fSixthMealResult.totalProteinInMeal),
                totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal + fSixthMealResult.totalLipidInMeal),
                totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal + fSixthMealResult.totalCarboInMeal)
            }
            fullDiet = {
                meals: {
                    aFirstMealResult: aFirstMealResult,
                    bSecondMealResult: bSecondMealResult,
                    cThirdMealResult: cThirdMealResult,
                    dFourthMealResult: dFourthMealResult,
                    eFifthMealResult: eFifthMealResult,
                    fSixthMealResult: fSixthMealResult,
                },
                totalMacrosInDiet: totalMacrosInDiet
            }
            return fullDiet
        }
        else if (userData.numberOfMealsWithChosenQuantity == 2) {
            const aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            const bSecondMealResult = calculateMealChosenQuantity(userData.secondMealFoodList)

            totalProteinThirdMeal = (totalProteinInAllMeals - aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal) / 4
            totalLipidThirdMeal = (totalLipidInAllMeals - aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal) / 4
            totalCaloriesInThirdMeal = (totalCaloriesInAllMeals - aFirstMealResult.totalKcal + bSecondMealResult.totalKcal) / 4

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            totalProteinInFourthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)) / 3
            totalLipidInFourthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)) / 3
            totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)) / 3

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)
            totalProteinInFifthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)) / 2
            totalLipidInFifthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)) / 2
            totalCaloriesInFifthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)) / 2

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

            totalProteinInSixthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal)
            totalLipidInSixthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal)
            totalCaloriesInSixthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal)

            fSixthMealResult = calculateMeal(userData.sixthMealFoodList, totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)
            const totalMacrosInDiet = {
                totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal + fSixthMealResult.totalKcal),
                totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal + fSixthMealResult.totalProteinInMeal),
                totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal + fSixthMealResult.totalLipidInMeal),
                totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal + fSixthMealResult.totalCarboInMeal)
            }
            const fullDiet = {
                meals: {
                    aFirstMealResult: aFirstMealResult,
                    bSecondMealResult: bSecondMealResult,
                    cThirdMealResult: cThirdMealResult,
                    dFourthMealResult: dFourthMealResult,
                    eFifthMealResult: eFifthMealResult,
                    fSixthMealResult: fSixthMealResult,
                },
                totalMacrosInDiet: totalMacrosInDiet
            }
            return fullDiet
        }
        else if (userData.numberOfMealsWithChosenQuantity == 1) {
            aFirstMealResult = calculateMealChosenQuantity(userData.firstMealFoodList)
            totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult.totalProteinInMeal) / 5
            totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult.totalLipidInMeal) / 5
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult.totalKcal) / 5
            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            totalProteinThirdMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal)) / 4
            totalLipidThirdMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal)) / 4
            totalCaloriesInThirdMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal)) / 4

            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)

            totalProteinInFourthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal)) / 3
            totalLipidInFourthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal)) / 3
            totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal)) / 3

            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = (totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal)) / 2
            totalLipidInFifthMeal = (totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal)) / 2
            totalCaloriesInFifthMeal = (totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal)) / 2

            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)
            totalProteinInSixthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal)
            totalLipidInSixthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal)
            totalCaloriesInSixthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal)

            fSixthMealResult = calculateMeal(userData.sixthMealFoodList, totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)
            totalMacrosInDiet = {
                totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal + fSixthMealResult.totalKcal),
                totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal + fSixthMealResult.totalProteinInMeal),
                totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal + fSixthMealResult.totalLipidInMeal),
                totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal + fSixthMealResult.totalCarboInMeal)
            }
            fullDiet = {
                meals: {
                    aFirstMealResult: aFirstMealResult,
                    bSecondMealResult: bSecondMealResult,
                    cThirdMealResult: cThirdMealResult,
                    dFourthMealResult: dFourthMealResult,
                    eFifthMealResult: eFifthMealResult,
                    fSixthMealResult: fSixthMealResult,
                },
                totalMacrosInDiet: totalMacrosInDiet
            }
            return fullDiet
        }
        else {

            aFirstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            bSecondMealResult = calculateMeal(userData.secondMealFoodList, totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            cThirdMealResult = calculateMeal(userData.thirdMealFoodList, totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            dFourthMealResult = calculateMeal(userData.fourthMealFoodList, totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)
            eFifthMealResult = calculateMeal(userData.fifthMealFoodList, totalProteinFifthMeal, totalLipidFifthMeal, totalCaloriesInFifthMeal)

            totalProteinInSixthMeal = totalProteinInAllMeals - (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal)
            totalLipidInSixthMeal = totalLipidInAllMeals - (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal)
            totalCaloriesInSixthMeal = totalCaloriesInAllMeals - (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal)

            fSixthMealResult = calculateMeal(userData.sixthMealFoodList, totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)

            totalMacrosInDiet = {
                totalCaloriesInDiet: (aFirstMealResult.totalKcal + bSecondMealResult.totalKcal + cThirdMealResult.totalKcal + dFourthMealResult.totalKcal + eFifthMealResult.totalKcal + fSixthMealResult.totalKcal),
                totalProteinInDiet: (aFirstMealResult.totalProteinInMeal + bSecondMealResult.totalProteinInMeal + cThirdMealResult.totalProteinInMeal + dFourthMealResult.totalProteinInMeal + eFifthMealResult.totalProteinInMeal + fSixthMealResult.totalProteinInMeal),
                totalLipidInDiet: (aFirstMealResult.totalLipidInMeal + bSecondMealResult.totalLipidInMeal + cThirdMealResult.totalLipidInMeal + dFourthMealResult.totalLipidInMeal + eFifthMealResult.totalLipidInMeal + fSixthMealResult.totalLipidInMeal),
                totalCarboInDiet: (aFirstMealResult.totalCarboInMeal + bSecondMealResult.totalCarboInMeal + cThirdMealResult.totalCarboInMeal + dFourthMealResult.totalCarboInMeal + eFifthMealResult.totalCarboInMeal + fSixthMealResult.totalCarboInMeal)
            }
            fullDiet = {
                meals: {
                    aFirstMealResult: aFirstMealResult,
                    bSecondMealResult: bSecondMealResult,
                    cThirdMealResult: cThirdMealResult,
                    dFourthMealResult: dFourthMealResult,
                    eFifthMealResult: eFifthMealResult,
                    fSixthMealResult: fSixthMealResult,
                },
                totalMacrosInDiet: totalMacrosInDiet
            }

            return fullDiet

        }
    }
}