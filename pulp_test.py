import pulp

# Define the problem
prob = pulp.LpProblem("Nutrition Optimization", pulp.LpMinimize)

# Define the decision variables
foods = ['Carne', 'Amendoim', 'Batata']  # Replace with the names of your food items
amounts = pulp.LpVariable.dicts("amount", foods, lowBound=0, cat='Continuous')

# Define the constraints
protein = 160  # Replace with the daily protein target
calories = 2500  # Replace with the daily calorie target
protein_per_unit = {'Carne': (13.5 / 100), 'Amendoim': (22 / 100), 'Batata': (1.1 / 100)}  # Replace with the protein content per unit of each food item
calories_per_unit = {'Carne': (145 / 100), 'Amendoim': (605 / 100), 'Batata': (51 / 100)}  # Replace with the calorie content per unit of each food item
prob += pulp.lpSum([protein_per_unit[f] * amounts[f] for f in foods]) == protein
# prob += pulp.lpSum([calories_per_unit[f] * amounts[f] for f in foods]) == calories

# Solve the problem
prob.solve()

# Print the results
for f in foods:
    print(f"{f}: {amounts[f].value():.2f} units")
