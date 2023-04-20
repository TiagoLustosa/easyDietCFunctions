import json


import json


def convert_array_obj():
    output_arr = []
    with open('teste.json', 'r', encoding="utf8") as input_file:
        input_arr = json.load(input_file)

    for input_obj in input_arr:
        print(input_obj.get('description', ''))
        output_obj = {
            "baseQuantity": input_obj.get('base_qty', None),
            "base_unit": input_obj.get('base_unit', None),
            "carbohydrate": input_obj.get('attributes', {}).get('carbohydrate', {}).get('qty', None),
            "category_id": 1,
            "description": input_obj.get('description', ''),
            "energyInKcal": input_obj.get('attributes', {}).get('energy', {}).get('kcal', None),
            "fiber": input_obj.get('attributes', {}).get('fiber', {}).get('qty', None),
            "id": input_obj.get('id', None),
            "image": "",
            "lipid": input_obj.get('attributes', {}).get('lipid', {}).get('qty', None),
            "protein": input_obj.get('attributes', {}).get('protein', {}).get('qty', None),
        }

        if not output_obj['energyInKcal']:
            output_obj['energyInKcal'] = None

        if not output_obj['image']:
            output_obj['image'] = ""

        if not output_obj['lipid']:
            output_obj['lipid'] = {
                "qty": None,
                "unit": None
            }

        if not output_obj['protein']:
            output_obj['protein'] = {
                "qty": None,
                "unit": None
            }

        if not output_obj['carbohydrate']:
            output_obj['carbohydrate'] = {
                "qty": None,
                "unit": None
            }

        if not output_obj['fiber']:
            output_obj['fiber'] = {
                "qty": None,
                "unit": None
            }

        output_arr.append(output_obj)
    with open('resultado.json', 'w', encoding='utf-8') as output_file:
        json.dump(output_arr, output_file, ensure_ascii=False)
    print(output_arr)
    print("Current length of output_arr:", len(output_arr))
    return output_arr


convert_array_obj()
