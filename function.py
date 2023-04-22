
import csv
import json
# if lose weight filter some high fat foods


def calculateTotalMacros(userData):
    totalProtein = userData['weight'] * \
        userData['proteinPerKilogramOfBodyWeight']
    totalLipid = userData['weight'] * 1
    macros = {
        'totalProtein': totalProtein,
        'totalLipid': totalLipid
    }
    return macros


def calculateBasalMetabolicRate(userData):
    activityLevelFactor = 1.2
    dietObjective = 0
    if userData['dietObjective'] == 'maintainWeight':
        dietObjective = 0
    if userData['dietObjective'] == 'loseWeight':
        dietObjective = -500
    if userData['dietObjective'] == 'gainWeight':
        dietObjective = 500
    if userData['activityLevel'] == 'sedentary':
        activityLevelFactor = 1.2
    if userData['activityLevel'] == 'lightlyActive':
        activityLevelFactor = 1.375
    if userData['activityLevel'] == 'moderatelyActive':
        activityLevelFactor = 1.55
    if userData['activityLevel'] == 'veryActive':
        activityLevelFactor = 1.725
    if userData['activityLevel'] == 'superActive':
        activityLevelFactor = 1.9
    if userData['gender'] == 'male':
        return (66.47 + (13.75 * userData['weight'])
                + (5.003 * userData['height'])
                - (6.755 * userData['age'])) * activityLevelFactor + dietObjective
    else:
        return (655.1 + (9.563 * userData['weight'])
                + (1.85 * userData['height'])
                - (4.676 * userData['age'])) * activityLevelFactor + dietObjective


totalProteinInAllMeals = 0
totalLipidInAllMeals = 0
totalCaloriesInAllMeals = 0

totalProteinFirstMeal = 0
totalLipidFirstMeal = 0
totalCaloriesFirstMeal = 0
totalProteinSecondMeal = 0
totalLipidSecondMeal = 0
totalCaloriesInSecondMeal = 0
totalProteinThirdMeal = 0
totalLipidThirdMeal = 0
totalCaloriesInThirdMeal = 0
totalProteinFourthMeal = 0
totalLipidFourthMeal = 0
totalCaloriesInFourthMeal = 0
totalProteinFifthMeal = 0
totalLipidFifthMeal = 0
totalCaloriesInFifthMeal = 0


def pickedAmout():

    pickedAmount = True
    if (pickedAmount == True):
        aFirstMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])
        global totalProteinSecondMeal
        global totalLipidSecondMeal
        global totalCaloriesInSecondMeal
        global totalLipidFirstMeal
        global totalCaloriesFirstMeal
        global totalProteinSecondMeal
        global totalLipidSecondMeal
        global totalCaloriesInSecondMeal
        global totalProteinThirdMeal
        global totalLipidThirdMeal
        global totalCaloriesInThirdMeal
        global totalProteinFourthMeal
        global totalLipidFourthMeal
        global totalCaloriesInFourthMeal
        global totalProteinFifthMeal
        global totalLipidFifthMeal
        global totalCaloriesInFifthMeal
        totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult['totalProteinInMeal']) * 0.125
        totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult['totalLipidInMeal']) * 0.125
        totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult['totalKcal']) * 0.125

        totalProteinThirdMeal = (totalProteinInAllMeals - aFirstMealResult['totalProteinInMeal']) * 0.25
        totalLipidThirdMeal = (totalLipidInAllMeals - aFirstMealResult['totalLipidInMeal']) * 0.25
        totalCaloriesInThirdMeal = (totalCaloriesInAllMeals - aFirstMealResult['totalKcal']) * 0.25

        totalProteinFourthMeal = (totalProteinInAllMeals - aFirstMealResult['totalProteinInMeal']) * 0.125
        totalLipidFourthMeal = (totalLipidInAllMeals - aFirstMealResult['totalLipidInMeal']) * 0.125
        totalCaloriesInFourthMeal = (totalCaloriesInAllMeals - aFirstMealResult['totalKcal']) * 0.125

        totalProteinFifthMeal = (totalProteinInAllMeals - aFirstMealResult['totalProteinInMeal']) * 0.25
        totalLipidFifthMeal = (totalLipidInAllMeals - aFirstMealResult['totalLipidInMeal']) * 0.25
        totalCaloriesInFifthMeal = (totalCaloriesInAllMeals - aFirstMealResult['totalKcal']) * 0.25
    else:
        aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        totalProteinSecondMeal = totalProteinInAllMeals * 0.125
        totalLipidSecondMeal = totalLipidInAllMeals * 0.125
        totalCaloriesInSecondMeal = (totalCaloriesInAllMeals) * 0.125
        totalProteinThirdMeal = totalProteinInAllMeals * 0.25
        totalLipidThirdMeal = totalLipidInMeal * 0.25
        totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.25
        totalProteinFourthMeal = totalProteinInAllMeals * 0.125
        totalLipidFourthMeal = totalLipidInMeal * 0.125
        totalCaloriesInFourthMeal = totalCaloriesInMeal * 0.125
        totalProteinFifthMeal = totalProteinInAllMeals * 0.25
        totalLipidFifthMeal = totalLipidInMeal * 0.25
        totalCaloriesInFifthMeal = totalCaloriesInMeal * 0.25


def calculateMeal(foodList, totalProtein, totalLipid, totalCaloriesInMeal):
    totalProteinGrams = 0
    proteinResult = 0
    totalLipidGrams = 0
    lipidResult = 0
    totalCarboGrams = 0
    carboResult = 0
    totalKcal = 0.0

    protein = next((e for e in foodList if 'highProtein' in e and e['highProtein'] and ('highLipid' not in e or not e['highLipid'])), None)

    lipid = next(
        (e for e in foodList if 'highLipid' in e and e['highLipid']), None)
    carbo = next(
        (e for e in foodList if 'highCarb' in e and e['highCarb']), None)

    proteinPerGram = protein['protein'] / 100
    proteinKcalPerGram = protein['energyInKcal'] / 100
    proteinLipidPerGram = protein['lipid'] / 100
    proteinCarboPerGram = protein['carbohydrate'] / 100

    lipidPerGram = lipid['lipid'] / 100
    lipidKcalPerGram = lipid['energyInKcal'] / 100
    lipidProteinPerGram = lipid['protein'] / 100
    lipidCarboPerGram = lipid['carbohydrate'] / 100

    carboPerGram = carbo['carbohydrate'] / 100
    carboKcalPerGram = carbo['energyInKcal'] / 100
    carboLipidPerGram = carbo['lipid'] / 100
    carboProteinPerGram = carbo['protein'] / 100

    while (totalKcal < totalCaloriesInMeal):

        highFatProteinFood = (protein['protein'] / protein['lipid'] < 2.4)

        while (proteinResult < totalProtein):
            proteinResult += proteinPerGram
            totalKcal += proteinKcalPerGram
            carboResult += proteinCarboPerGram
            lipidResult += proteinLipidPerGram
            totalProteinGrams += 1
        if (lipidResult < totalLipid):
            proteinResult += lipidProteinPerGram
            totalKcal += lipidKcalPerGram
            carboResult += lipidCarboPerGram
            lipidResult += lipidPerGram
            totalLipidGrams += 1

        if ((totalKcal > totalCaloriesInMeal)):

            while ((proteinResult < totalProtein) and (lipidResult > totalLipid)):

                proteinResult -= lipidProteinPerGram
                totalKcal -= lipidKcalPerGram
                carboResult -= lipidCarboPerGram
                lipidResult -= lipidPerGram
                totalLipidGrams -= 1

                proteinResult += proteinPerGram
                totalKcal += proteinKcalPerGram
                carboResult += proteinCarboPerGram
                lipidResult += proteinLipidPerGram
                totalProteinGrams += 1

        if (proteinResult > (totalProtein + (totalProtein * 0.03))):
            while (proteinResult > (totalProtein + (totalProtein * 0.03))):
                proteinResult -= proteinPerGram
                totalKcal -= proteinKcalPerGram
                carboResult -= proteinCarboPerGram
                lipidResult -= proteinLipidPerGram
                totalProteinGrams -= 1

        proteinResult += carboProteinPerGram
        totalKcal += carboKcalPerGram
        carboResult += carboPerGram
        lipidResult += carboLipidPerGram
        totalCarboGrams += 1
    mealResult = {
        'totalKcal': totalKcal,
        'proteinSource': totalProteinGrams,
        'proteinSourceKcal': totalProteinGrams * proteinKcalPerGram,
        'lipidSource': totalLipidGrams,
        'lipidSourceKcal': totalLipidGrams * lipidKcalPerGram,
        'carboSource': totalCarboGrams,
        'carboSourceKcal': totalCarboGrams * carboKcalPerGram,
        'foods': foodList,
        'totalProteinInMeal': proteinResult,
        'totalLipidInMeal': lipidResult,
        'totalCarboInMeal': carboResult
    }
    return mealResult


def calculateMealPickedAmount(foodList):

    protein = next((e for e in foodList if 'highProtein' in e and e['highProtein'] and ('highLipid' not in e or not e['highLipid'])), None)

    lipid = next(
        (e for e in foodList if 'highLipid' in e and e['highLipid']), None)
    carbo = next(
        (e for e in foodList if 'highCarb' in e and e['highCarb']), None)

    proteinFoodGramsPerUnit = protein.get('amoutGramsPerUnit', None)
    proteinPerGram = protein['protein'] / 100
    proteinKcalPerGram = protein['energyInKcal'] / 100
    proteinLipidPerGram = protein['lipid'] / 100
    proteinCarboPerGram = protein['carbohydrate'] / 100
    proteinPickedAmount = protein.get('pickedAmount', None)

    lipidFoodGramsPerUnit = lipid.get('amoutGramsPerUnit', None)
    lipidPerGram = lipid['lipid'] / 100
    lipidKcalPerGram = lipid['energyInKcal'] / 100
    lipidProteinPerGram = lipid['protein'] / 100
    lipidCarboPerGram = lipid['carbohydrate'] / 100
    lipidPickedAmount = lipid.get('pickedAmount', None)

    carboFoodGramsPerUnit = carbo.get('amoutGramsPerUnit', None)
    carboPerGram = carbo['carbohydrate'] / 100
    carboKcalPerGram = carbo['energyInKcal'] / 100
    carboLipidPerGram = carbo['lipid'] / 100
    carboProteinPerGram = carbo['protein'] / 100
    carboPickedAmount = carbo.get('pickedAmount', None)

    proteinTotalProteinResult = proteinFoodGramsPerUnit * proteinPerGram * proteinPickedAmount
    proteinTotalKcalResult = proteinFoodGramsPerUnit * proteinKcalPerGram * proteinPickedAmount
    proteinTotalLipidResult = proteinFoodGramsPerUnit * proteinLipidPerGram * proteinPickedAmount
    proteinTotalCarboResult = proteinFoodGramsPerUnit * proteinCarboPerGram * proteinPickedAmount

    lipidTotalProteinResult = lipidFoodGramsPerUnit * lipidProteinPerGram * lipidPickedAmount
    lipidTotalKcalResult = lipidFoodGramsPerUnit * lipidKcalPerGram * lipidPickedAmount
    lipidTotalLipidResult = lipidFoodGramsPerUnit * lipidPerGram * lipidPickedAmount
    lipidTotalCarboResult = lipidFoodGramsPerUnit * lipidCarboPerGram * lipidPickedAmount

    carboTotalProteinResult = carboFoodGramsPerUnit * carboProteinPerGram * carboPickedAmount
    carboTotalKcalResult = carboFoodGramsPerUnit * carboKcalPerGram * carboPickedAmount
    carboTotalLipidResult = carboFoodGramsPerUnit * carboLipidPerGram * carboPickedAmount
    carboTotalCarboResult = carboFoodGramsPerUnit * carboPerGram * carboPickedAmount

    totalKcalInMeal = proteinTotalKcalResult + lipidTotalKcalResult + carboTotalKcalResult
    proteinTotalInMeal = proteinTotalProteinResult + lipidTotalProteinResult + carboTotalProteinResult
    lipidTotalInMeal = proteinTotalLipidResult + lipidTotalLipidResult + carboTotalLipidResult
    carboTotalInMeal = proteinTotalCarboResult + lipidTotalCarboResult + carboTotalCarboResult
    mealResult = {
        'totalKcal': totalKcalInMeal,
        'proteinSource': proteinFoodGramsPerUnit,
        'proteinSourceKcal': proteinTotalKcalResult,
        'lipidSource': lipidFoodGramsPerUnit,
        'lipidSourceKcal': proteinTotalKcalResult,
        'carboSource': carboFoodGramsPerUnit,
        'carboSourceKcal': carboTotalKcalResult,
        'foods': foodList,
        'totalProteinInMeal': proteinTotalInMeal,
        'totalLipidInMeal': lipidTotalInMeal,
        'totalCarboInMeal': carboTotalInMeal
    }
    return mealResult


def calculateDiet(userData):
    bmr = calculateBasalMetabolicRate(userData)

    macros = calculateTotalMacros(userData)
    totalProteinInAllMeals = macros['totalProtein']
    totalLipidInAllMeals = macros['totalLipid']
    totalCaloriesInAllMeals = bmr
    numberOfMeals = userData['numberOfMeals']
    if (numberOfMeals == 2):
        totalProteinFirstMeal = totalProteinInAllMeals * 0.5
        totalLipidFirstMeal = totalLipidInAllMeals * 0.5
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.5
        totalProteinSecondMeal = totalProteinInAllMeals * 0.5
        totalLipidSecondMeal = totalLipidInAllMeals * 0.5
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.5
    elif (numberOfMeals == 3):
        totalProteinFirstMeal = totalProteinInAllMeals * 0.33
        totalLipidFirstMeal = totalLipidInAllMeals * 0.33
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.33
        totalProteinSecondMeal = totalProteinInAllMeals * 0.33
        totalLipidSecondMeal = totalLipidInAllMeals * 0.33
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.33
    elif (numberOfMeals == 4):
        totalProteinFirstMeal = totalProteinInAllMeals * 0.2
        totalLipidFirstMeal = totalLipidInAllMeals * 0.2
        totalCaloriesFirstMeal = totalCaloriesInAllMeals * 0.2
        totalProteinSecondMeal = totalProteinInAllMeals * 0.3
        totalLipidSecondMeal = totalLipidInAllMeals * 0.3
        totalCaloriesInSecondMeal = totalCaloriesInAllMeals * 0.3
        totalProteinThirdMeal = totalProteinInAllMeals * 0.2
        totalLipidThirdMeal = totalLipidInAllMeals * 0.2
        totalCaloriesInThirdMeal = totalCaloriesInAllMeals * 0.2
    elif (numberOfMeals == 5):
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
    else:
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

    if (userData['numberOfMeals'] == 2):

        aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
        bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
        totalMacrosInDiet = {'totalCaloriesInDiet': (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal']),
                             'totalProteinInDiet': (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal']),
                             'totalLipidInDiet': (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal']),
                             'totalCarboInDiet': (aFirstMealResult['totalCarboInMeal'] + bSecondMealResult['totalCarboInMeal'])}

        fullDiet = {
            'meals': {
                'aFirstMealResult': aFirstMealResult,
                'bSecondMealResult': bSecondMealResult,
            },
            'totalMacrosInDiet': totalMacrosInDiet
        }

        return fullDiet
    elif (userData['numberOfMeals'] == 3):
        if (userData['numberOfMealsWithChosenQuantity'] == True):
            aFirstMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])
            totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult['totalProteinInMeal']) / 2
            totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult['totalLipidInMeal']) / 2
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult['totalKcal']) / 2
            bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            totalProteinInThirdMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'])
            totalLipidInThirdMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'])
            totalCaloriesInThirdMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'])

            cThirdMealResult = calculateMeal(userData['thirdMealFoodList'], totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)
        else:
            aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            totalProteinInThirdMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'])
            totalLipidInThirdMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'])
            totalCaloriesInThirdMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'])

            cThirdMealResult = calculateMeal(userData['thirdMealFoodList'], totalProteinInThirdMeal, totalLipidInThirdMeal, totalCaloriesInThirdMeal)
        totalMacrosInDiet = {
            'totalCaloriesInDiet': (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal']),
            'totalProteinInDiet': (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal']),
            'totalLipidInDiet': (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal']),
            'totalCarboInDiet': (aFirstMealResult['totalCarboInMeal'] + bSecondMealResult['totalCarboInMeal'] + cThirdMealResult['totalCarboInMeal'])
        }
        fullDiet = {
            'meals': {
                'aFirstMealResult': aFirstMealResult,
                'bSecondMealResult': bSecondMealResult,
                'cThirdMealResult': cThirdMealResult,
            },
            'totalMacrosInDiet': totalMacrosInDiet
        }

        return fullDiet
    elif (userData['numberOfMeals'] == 4):
        if (userData['numberOfMealsWithChosenQuantity'] == True):
            aFirstMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])
            totalProteinSecondMeal = (totalProteinInAllMeals - aFirstMealResult['totalProteinInMeal']) / 2
            totalLipidSecondMeal = (totalLipidInAllMeals - aFirstMealResult['totalLipidInMeal']) / 2
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals - aFirstMealResult['totalKcal']) / 2

            bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            cThirdMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])

            totalProteinInFourthMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'])
            totalLipidInFourthMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'])
            totalCaloriesInFourthMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'])

            dFourthMealResult = calculateMeal(userData['fourthMealFoodList'], totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

        else:
            aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            cThirdMealResult = calculateMeal(userData['thirdMealFoodList'], totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            totalProteinInFourthMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'])
            totalLipidInFourthMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'])
            totalCaloriesInFourthMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'])
            dFourthMealResult = calculateMeal(userData['fourthMealFoodList'], totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

        totalMacrosInDiet = {
            'totalCaloriesInDiet': (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal']),
            'totalProteinInDiet': (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal']),
            'totalLipidInDiet': (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal']),
            'totalCarboInDiet': (aFirstMealResult['totalCarboInMeal'] + bSecondMealResult['totalCarboInMeal'] + cThirdMealResult['totalCarboInMeal'] + dFourthMealResult['totalCarboInMeal'])
        }
        fullDiet = {
            'meals': {
                'aFirstMealResult': aFirstMealResult,
                'bSecondMealResult': bSecondMealResult,
                'cThirdMealResult': cThirdMealResult,
                'dFourthMealResult': dFourthMealResult,
            },

            'totalMacrosInDiet': totalMacrosInDiet
        }

        return fullDiet
    elif (userData['numberOfMeals'] == 5):
        if (userData['numberOfMealsWithChosenQuantity'] == True):
            aFirstMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])

            bSecondMealResult = calculateMealPickedAmount(userData['secondMealFoodList'])

            cThirdMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])

            totalProteinInFourthMeal = (totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'])) / 2
            totalLipidInFourthMeal = (totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'])) / 2
            totalCaloriesInFourthMeal = (totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'])) / 2

            dFourthMealResult = calculateMeal(userData['fourthMealFoodList'], totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'])
            totalLipidInFifthMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'])
            totalCaloriesInFifthMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'])

            eFifthMealResult = calculateMeal(userData['fifthMealFoodList'], totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)
        else:
            aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)

            bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)

            cThirdMealResult = calculateMeal(userData['thirdMealFoodList'], totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            dFourthMealResult = calculateMeal(userData['fourthMealFoodList'], totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'])
            totalLipidInFifthMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'])
            totalCaloriesInFifthMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'])

            eFifthMealResult = calculateMeal(userData['fifthMealFoodList'], totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

        totalMacrosInDiet = {
            'totalCaloriesInDiet': (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'] + eFifthMealResult['totalKcal']),
            'totalProteinInDiet': (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'] + eFifthMealResult['totalProteinInMeal']),
            'totalLipidInDiet': (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'] + eFifthMealResult['totalLipidInMeal']),
            'totalCarboInDiet': (aFirstMealResult['totalCarboInMeal'] + bSecondMealResult['totalCarboInMeal'] + cThirdMealResult['totalCarboInMeal'] + dFourthMealResult['totalCarboInMeal'] + eFifthMealResult['totalCarboInMeal'])
        }
        fullDiet = {
            'meals': {
                'aFirstMealResult': aFirstMealResult,
                'bSecondMealResult': bSecondMealResult,
                'cThirdMealResult': cThirdMealResult,
                'dFourthMealResult': dFourthMealResult,
                'eFifthMealResult': eFifthMealResult,
            },
            'totalMacrosInDiet': totalMacrosInDiet
        }

        return fullDiet
    else:

        if (userData['numberOfMealsWithChosenQuantity'] == True):
            aFirstMealResult = calculateMealPickedAmount(userData['firstMealFoodList'])
            bSecondMealResult = calculateMealPickedAmount(userData['secondMealFoodList'])
            cThirdMealResult = calculateMealPickedAmount(userData['thirdMealFoodList'])

            totalProteinInFourthMeal = (totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'])) / 3
            totalLipidInFourthMeal = (totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'])) / 3
            totalCaloriesInFourthMeal = (totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'])) / 3

            dFourthMealResult = calculateMeal(userData['fourthMealFoodList'], totalProteinInFourthMeal, totalLipidInFourthMeal, totalCaloriesInFourthMeal)

            totalProteinInFifthMeal = (totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'])) / 2
            totalLipidInFifthMeal = (totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'])) / 2
            totalCaloriesInFifthMeal = (totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'])) / 2

            eFifthMealResult = calculateMeal(userData['fifthMealFoodList'], totalProteinInFifthMeal, totalLipidInFifthMeal, totalCaloriesInFifthMeal)

            totalProteinInSixthMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'] + eFifthMealResult['totalProteinInMeal'])
            totalLipidInSixthMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'] + eFifthMealResult['totalLipidInMeal'])
            totalCaloriesInSixthMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'] + eFifthMealResult['totalKcal'])

            fSixthMealResult = calculateMeal(userData['sixthMealFoodList'], totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)

            totalMacrosInDiet = {
                'totalCaloriesInDiet': (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'] + eFifthMealResult['totalKcal'] + fSixthMealResult['totalKcal']),
                'totalProteinInDiet': (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'] + eFifthMealResult['totalProteinInMeal'] + fSixthMealResult['totalProteinInMeal']),
                'totalLipidInDiet': (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'] + eFifthMealResult['totalLipidInMeal'] + fSixthMealResult['totalLipidInMeal']),
                'totalCarboInDiet': (aFirstMealResult['totalCarboInMeal'] + bSecondMealResult['totalCarboInMeal'] + cThirdMealResult['totalCarboInMeal'] + dFourthMealResult['totalCarboInMeal'] + eFifthMealResult['totalCarboInMeal'] + fSixthMealResult['totalCarboInMeal'])
            }
            fullDiet = {
                'meals': {
                    'aFirstMealResult': aFirstMealResult,
                    'bSecondMealResult': bSecondMealResult,
                    'cThirdMealResult': cThirdMealResult,
                    'dFourthMealResult': dFourthMealResult,
                    'eFifthMealResult': eFifthMealResult,
                    'fSixthMealResult': fSixthMealResult,
                },
                'totalMacrosInDiet': totalMacrosInDiet
            }
            return fullDiet

        else:
            aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            totalProteinSecondMeal = (totalProteinInAllMeals) * 0.125
            totalLipidSecondMeal = (totalLipidInAllMeals) * 0.125
            totalCaloriesInSecondMeal = (totalCaloriesInAllMeals) * 0.125
            totalProteinThirdMeal = totalProteinInAllMeals * 0.25
            totalLipidThirdMeal = totalLipidInMeal * 0.25
            totalCaloriesInThirdMeal = totalCaloriesInMeal * 0.25
            totalProteinFourthMeal = totalProteinInAllMeals * 0.125
            totalLipidFourthMeal = totalLipidInMeal * 0.125
            totalCaloriesInFourthMeal = totalCaloriesInMeal * 0.125
            totalProteinFifthMeal = totalProteinInAllMeals * 0.25
            totalLipidFifthMeal = totalLipidInMeal * 0.25
            totalCaloriesInFifthMeal = totalCaloriesInMeal * 0.25

            aFirstMealResult = calculateMeal(userData['firstMealFoodList'], totalProteinFirstMeal, totalLipidFirstMeal, totalCaloriesFirstMeal)
            bSecondMealResult = calculateMeal(userData['secondMealFoodList'], totalProteinSecondMeal, totalLipidSecondMeal, totalCaloriesInSecondMeal)
            cThirdMealResult = calculateMeal(userData['thirdMealFoodList'], totalProteinThirdMeal, totalLipidThirdMeal, totalCaloriesInThirdMeal)
            dFourthMealResult = calculateMeal(userData['fourthMealFoodList'], totalProteinFourthMeal, totalLipidFourthMeal, totalCaloriesInFourthMeal)
            eFifthMealResult = calculateMeal(userData['fifthMealFoodList'], totalProteinFifthMeal, totalLipidFifthMeal, totalCaloriesInFifthMeal)

            totalProteinInSixthMeal = totalProteinInMeal - (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'] + eFifthMealResult['totalProteinInMeal'])
            totalLipidInSixthMeal = totalLipidInMeal - (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'] + eFifthMealResult['totalLipidInMeal'])
            totalCaloriesInSixthMeal = totalCaloriesInMeal - (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'] + eFifthMealResult['totalKcal'])

            fSixthMealResult = calculateMeal(userData['sixthMealFoodList'], totalProteinInSixthMeal, totalLipidInSixthMeal, totalCaloriesInSixthMeal)

            totalMacrosInDiet = {
                'totalCaloriesInDiet': (aFirstMealResult['totalKcal'] + bSecondMealResult['totalKcal'] + cThirdMealResult['totalKcal'] + dFourthMealResult['totalKcal'] + eFifthMealResult['totalKcal'] + fSixthMealResult['totalKcal']),
                'totalProteinInDiet': (aFirstMealResult['totalProteinInMeal'] + bSecondMealResult['totalProteinInMeal'] + cThirdMealResult['totalProteinInMeal'] + dFourthMealResult['totalProteinInMeal'] + eFifthMealResult['totalProteinInMeal'] + fSixthMealResult['totalProteinInMeal']),
                'totalLipidInDiet': (aFirstMealResult['totalLipidInMeal'] + bSecondMealResult['totalLipidInMeal'] + cThirdMealResult['totalLipidInMeal'] + dFourthMealResult['totalLipidInMeal'] + eFifthMealResult['totalLipidInMeal'] + fSixthMealResult['totalLipidInMeal']),
                'totalCarboInDiet': (aFirstMealResult['totalCarboInMeal'] + bSecondMealResult['totalCarboInMeal'] + cThirdMealResult['totalCarboInMeal'] + dFourthMealResult['totalCarboInMeal'] + eFifthMealResult['totalCarboInMeal'] + fSixthMealResult['totalCarboInMeal'])
            }
            fullDiet = {
                'meals': {
                    'aFirstMealResult': aFirstMealResult,
                    'bSecondMealResult': bSecondMealResult,
                    'cThirdMealResult': cThirdMealResult,
                    'dFourthMealResult': dFourthMealResult,
                    'eFifthMealResult': eFifthMealResult,
                    'fSixthMealResult': fSixthMealResult,
                },
                'totalMacrosInDiet': totalMacrosInDiet
            }

            return fullDiet


with open('C:/projects/easy_diet_cloud_functions/user_test_new_function/userDataNewFoods2.json', 'r', encoding="utf8") as input_file:
    userData = json.load(input_file)
# user = []
# for i in userDataJson:

bmr = calculateBasalMetabolicRate(userData)
macros = calculateTotalMacros(userData)
totalProteinInMeal = macros['totalProtein']
totalLipidInMeal = macros['totalLipid']
totalCaloriesInMeal = bmr

fullDiet = calculateDiet(userData)
with open('C:/projects/easy_diet_cloud_functions/user_test_new_function/user_data_result_newFoods2.csv', mode='w', newline='') as output_file:
    writer = csv.writer(output_file)
    writer.writerow(
        ['PtnIdeal',
         'LipidIdeal',
            'KcalIdeal',
            'totalPtnCalculated',
            'totalLipidCalculated',
            'totalKcalCalculated',
            'totalKcalInMealCalc',
            'fstMPtnFoodG',
            'fstMLipidFoodG',
            'fstMCarbFoodG',
            'secMPtnFoodG',
            'secMLipidFoodG',
            'secMCarbFoodG',
            'thirdMPtnFoodG',
            'thirdMLipidFoodG',
            'thirdMCarboFoodG',
            'fourthMPtnFoodG',
            'fourthMLipidFoodG',
            'fourthMealCarboFoodG',
            'fifthMPtnFoodG',
            'fifthMLipidFoodG',
            'fifthMealCarboFoodG',
            'sixthMPtnFoodG',
            'sixthMLipidFoodG',
            'sixthMealCarboFoodG',
         ])
    if 'cThirdMealResult' in fullDiet['meals']:
        meal_dict = fullDiet['meals']['cThirdMealResult']
        third_protein_source = meal_dict.get('proteinSource', None)
        third_lipid_source = meal_dict.get('lipidSource', None)
        third_carbo_source = meal_dict.get('carboSource', None)
    else:
        third_protein_source = None
        third_lipid_source = None
        third_carbo_source = None
    if 'dFourthMealResult' in fullDiet['meals']:
        meal_dict = fullDiet['meals']['dFourthMealResult']
        fourth_protein_source = meal_dict.get('proteinSource', None)
        fourth_lipid_source = meal_dict.get('lipidSource', None)
        fourth_carbo_source = meal_dict.get('carboSource', None)
    else:
        fourth_protein_source = None
        fourth_lipid_source = None
        fourth_carbo_source = None
    if 'eFifthMealResult' in fullDiet['meals']:
        meal_dict = fullDiet['meals']['eFifthMealResult']
        fifth_protein_source = meal_dict.get('proteinSource', None)
        fifth_lipid_source = meal_dict.get('lipidSource', None)
        fifth_carbo_source = meal_dict.get('carboSource', None)
    else:
        fifth_protein_source = None
        fifth_lipid_source = None
        fifth_carbo_source = None
    if 'fSixthMealResult' in fullDiet['meals']:
        meal_dict = fullDiet['meals']['fSixthMealResult']
        sixth_protein_source = meal_dict.get('proteinSource', None)
        sixth_lipid_source = meal_dict.get('lipidSource', None)
        sixth_carbo_source = meal_dict.get('carboSource', None)
    else:
        sixth_protein_source = None
        sixth_lipid_source = None
        sixth_carbo_source = None

    writer.writerow([totalProteinInMeal,
                     totalLipidInMeal,
                     bmr,
                     fullDiet['totalMacrosInDiet']['totalProteinInDiet'],
                     fullDiet['totalMacrosInDiet']['totalLipidInDiet'],
                     fullDiet['totalMacrosInDiet']['totalCaloriesInDiet'],
                     fullDiet['meals']['aFirstMealResult']['totalKcal'],
                     fullDiet['meals']['aFirstMealResult']['proteinSource'],
                     fullDiet['meals']['aFirstMealResult']['lipidSource'],
                     fullDiet['meals']['aFirstMealResult']['carboSource'],
                     fullDiet['meals']['bSecondMealResult']['proteinSource'],
                     fullDiet['meals']['bSecondMealResult']['lipidSource'],
                     fullDiet['meals']['bSecondMealResult']['carboSource'],
                     third_protein_source,
                     third_lipid_source,
                     third_carbo_source,
                     fourth_protein_source,
                     fourth_lipid_source,
                     fourth_carbo_source,
                     fifth_protein_source,
                     fifth_lipid_source,
                     fifth_carbo_source,
                     sixth_protein_source,
                     sixth_lipid_source,
                     sixth_carbo_source,
                     ])
# with open('C:/projects/easy_diet_cloud_functions/user_test_new_function/userResult.json', 'w', encoding='utf-8') as output_file:
#     json.dump(result, output_file, ensure_ascii=False)
