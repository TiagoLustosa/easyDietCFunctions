import json
import random
import numpy as np

ages = list(range(18, 61))  # possible ages from 18 to 60
weights = list(range(50, 101))  # possible weights from 50 to 100 kg
heights = [165, 170, 175, 180, 185, 190]  # possible heights in cm
protein_per_kg = [1.6, 1.7, 1.8, 1.9, 2.0,  2.1, 2.2, 2.3]
activity_levels = ['sedentary', 'lightlyActive', 'moderatelyActive',
                   'veryActive', 'superActive']  # possible activity levels
genders = ['male', 'female']  # possible genders
diet_objectives = ['maintainWeight', 'loseWeight',
                   'gainWeight']  # possible diet objectives


def load_food_lists():
    with open("bancoAtual.json") as f:
        food_list = json.load(f)
    return food_list


def generate_user_data():
    mock_user_data = []
    for i in range(100):
        food_list = load_food_lists()

        # generate random user data
        age = random.choice(ages)
        weight = random.choice(weights)
        height = random.choice(heights)
        activity_level = random.choice(activity_levels)
        gender = random.choice(genders)
        diet_objective = random.choice(diet_objectives)
        proteinPerKilogramOfBodyWeight = random.choice(
            protein_per_kg)

        # create meal food lists
        first_meal_food_list = random.sample(
            [food for food in food_list if food.get('highProtein')], 1)
        first_meal_food_list += random.sample(
            [food for food in food_list if food.get('highLipid')], 1)
        first_meal_food_list += random.sample(
            [food for food in food_list if food.get('highCarb')], 1)

        second_meal_food_list = random.sample(
            [food for food in food_list if food.get('highProtein')], 1)
        second_meal_food_list += random.sample(
            [food for food in food_list if food.get('highLipid')], 1)
        second_meal_food_list += random.sample(
            [food for food in food_list if food.get('highCarb')], 1)

        third_meal_food_list = random.sample(
            [food for food in food_list if food.get('highProtein')], 1)
        third_meal_food_list += random.sample(
            [food for food in food_list if food.get('highLipid')], 1)
        third_meal_food_list += random.sample(
            [food for food in food_list if food.get('highCarb')], 1)

        fourth_meal_food_list = random.sample(
            [food for food in food_list if food.get('highProtein')], 1)
        fourth_meal_food_list += random.sample(
            [food for food in food_list if food.get('highLipid')], 1)
        fourth_meal_food_list += random.sample(
            [food for food in food_list if food.get('highCarb')], 1)

        # create user data dictionary
        mock_user_data.append({
            "age": age,
            "weight": weight,
            "height": height,
            "activityLevel": activity_level,
            "gender": gender,
            "proteinPerKilogramOfBodyWeight": proteinPerKilogramOfBodyWeight,
            "dietObjective": diet_objective,
            "firstMealFoodList": first_meal_food_list,
            "secondMealFoodList": second_meal_food_list,
            "thirdMealFoodList": third_meal_food_list,
            "fourthMealFoodList": fourth_meal_food_list,
        })
        with open('user_data.json', 'w', encoding='utf-8') as output_file:
            json.dump(mock_user_data, output_file, ensure_ascii=False)
        print(mock_user_data)
        # print("Current length of output_arr:", len(mock_user_data))
#         return user_data
generate_user_data()
# # example usage
# user_data = generate_user_data()
# print(user_data)

# Create a list of 100 mock userData objects with random values for each attribute
# mock_user_data = []
# for i in range(100):
#     age = random.choice(ages)
#     weight = random.choice(weights)
#     height = random.choice(heights)
#     activity_level = random.choice(activity_levels)
#     gender = random.choice(genders)
#     diet_objective = random.choice(diet_objectives)
#     mock_user_data.append({
#         'age': age,
#         'weight': weight,
#         'height': height,
#         'activityLevel': activity_level,
#         'gender': gender,
#         'dietObjective': diet_objective
#     })

#     with open('user_data.json', 'w', encoding='utf-8') as output_file:
#         json.dump(mock_user_data, output_file, ensure_ascii=False)
#     print(mock_user_data)
#     print("Current length of output_arr:", len(mock_user_data))
