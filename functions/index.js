const functions = require("firebase-functions");

exports.diet = functions.database.ref('/user/{id}').onCreate((snapshot, context) => {
    const userData = snapshot.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);
    const diet = calculateDiet(userData.foods, macros.totalProtein, macros.totalLipid, bmr);
    return snapshot.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
});

exports.dietUpdate = functions.database.ref('/user/{id}').onUpdate((change, context) => {
    if (!change.after.exists()) {
        return null;
    }
    const userData = change.after.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);
    const diet = calculateDiet(userData.foods, macros.totalProtein, macros.totalLipid, bmr);

    return change.after.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
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

const calculateDiet = (foodList, totalProtein, totalLipid, bmrResult) => {
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
    while (totalKcal < bmrResult) {
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
        if ((totalKcal >= bmrResult)) {

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

    const diet = {
        totalKcal: totalKcal,
        protein: totalProteinGrams,
        lipid: totalLipidGrams,
        carbohydrate: totalCarboGrams,
        foods: foodList,
        totalProteinInDiet: proteinResult,
        totalLipidInDiet: lipidResult,
        totalCarboInDiet: carboResult,
    }
    return diet;
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
/* 4 meals working
const functions = require("firebase-functions");

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
exports.diet = functions.database.ref('/user/{id}').onCreate((snapshot, context) => {
    const userData = snapshot.val();
    const bmr = calculateBasalMetabolicRate(userData);
    const macros = calculateTotalMacros(userData);

    totalProteinInMeal = macros.totalProtein
    totalLipidInMeal = macros.totalLipid
    totalCaloriesInMeal = bmr

    totalProteinFirstMeal = totalProteinInMeal * 0.2
    totalLipidFirstMeal = totalLipidInMeal * 0.2
    totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

    totalProteinSecondMeal = totalProteinInMeal * 0.3
    totalLipidSecondMeal = totalLipidInMeal * 0.3
    totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.3

    totalProteinThirdMeal = totalProteinInMeal * 0.2
    totalLipidThirdMeal = totalLipidInMeal * 0.2
    totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2

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


    totalProteinFirstMeal = totalProteinInMeal * 0.2
    totalLipidFirstMeal = totalLipidInMeal * 0.2
    totalCaloriesFirstMeal = totalCaloriesInMeal * 0.2

    totalProteinSecondMeal = totalProteinInMeal * 0.3
    totalLipidSecondMeal = totalLipidInMeal * 0.3
    totalCaloriesInSecondMeal = totalCaloriesInMeal * 0.3

    totalProteinThirdMeal = totalProteinInMeal * 0.2
    totalLipidThirdMeal = totalLipidInMeal * 0.2
    totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.2

    const diet = calculateDiet(userData);

    return change.after.ref.parent.child(`${context.params.id}`).update({ bmr: bmr, diet: diet, macros: macros });
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
    // while (totalKcal < totalCaloriesInMeal) {

    //     if (proteinResult < totalProtein) {
    //         proteinResult += proteinPerGram;
    //         totalKcal += proteinKcalPerGram;
    //         carboResult += proteinCarboPerGram;
    //         lipidResult += proteinLipidPerGram;
    //         totalProteinGrams++;
    //     } else {
    //         proteinResult -= proteinPerGram;
    //         totalKcal -= proteinKcalPerGram;
    //         carboResult -= proteinCarboPerGram;
    //         lipidResult -= proteinLipidPerGram;
    //         totalProteinGrams--;
    //     }
    //     if (lipidResult < totalLipid) {
    //         proteinResult += lipidProteinPerGram;
    //         totalKcal += lipidKcalPerGram;
    //         carboResult += lipidCarboPerGram;
    //         lipidResult += lipidPerGram;
    //         totalLipidGrams++;
    //     }

    //     proteinResult += carboProteinPerGram;
    //     totalKcal += carboKcalPerGram;
    //     carboResult += carboPerGram;
    //     lipidResult += carboLipidPerGram;
    //     totalCarboGrams++;

    // }
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
    const firstMealResult = calculateMeal(userData.firstMealFoodList, totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
    console.log(totalProteinFirstMeal)
    console.log(totalCaloriesFirstMeal)
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
    console.table(firstMealResult)
    console.table(secondMealResult)
    console.table(thirdMealResult)
    console.table(fourthMealResult)
    console.log(fullDiet)
    return fullDiet;
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
*/