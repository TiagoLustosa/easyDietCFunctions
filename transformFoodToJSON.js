
const inputObj = {
    "id": 53,
    "description": "Pão, trigo, francês",
    "base_qty": 100,
    "base_unit": "g",
    "category_id": 1,
    "attributes": {
        "humidity": {
            "qty": 28.4833333333333,
            "unit": "percents"
        },
        "protein": {
            "qty": 7.9535652173913,
            "unit": "g"
        },
        "lipid": {
            "qty": 3.10333333333333,
            "unit": "g"
        },
        "cholesterol": {
            "qty": "NA",
            "unit": "mg"
        },
        "carbohydrate": {
            "qty": 58.6464347826087,
            "unit": "g"
        },
        "fiber": {
            "qty": 2.30666666666667,
            "unit": "g"
        },
        "ashes": {
            "qty": 1.81333333333333,
            "unit": "g"
        },
        "calcium": {
            "qty": 15.7533333333333,
            "unit": "mg"
        },
        "magnesium": {
            "qty": 25.4633333333333,
            "unit": "mg"
        },
        "phosphorus": {
            "qty": 94.74,
            "unit": "mg"
        },
        "iron": {
            "qty": 1,
            "unit": "mg"
        },
        "sodium": {
            "qty": 647.673333333333,
            "unit": "mg"
        },
        "potassium": {
            "qty": 142.2,
            "unit": "mg"
        },
        "copper": {
            "qty": 0.13,
            "unit": "mg"
        },
        "zinc": {
            "qty": 0.763333333333333,
            "unit": "mg"
        },
        "retinol": {
            "qty": 2.98666666666667,
            "unit": "mcg"
        },
        "thiamine": {
            "qty": 0.386666666666667,
            "unit": "mg"
        },
        "riboflavin": {
            "qty": 0.67,
            "unit": "mg"
        },
        "pyridoxine": {
            "qty": 0.6,
            "unit": "mg"
        },
        "niacin": {
            "qty": 2.33666666666667,
            "unit": "mg"
        },
        "energy": {
            "kcal": 299.810150434783,
            "kj": 1254.40566941913
        },
        "fatty_acids": {
            "saturated": {
                "qty": 1,
                "unit": "g"
            },
            "monounsaturated": {
                "qty": 0.9,
                "unit": "g"
            },
            "polyunsaturated": {
                "qty": 0.7,
                "unit": "g"
            },
            "12:0": {
                "qty": "Tr",
                "unit": "g"
            },
            "14:0": {
                "qty": 0.01,
                "unit": "g"
            },
            "16:0": {
                "qty": 0.65,
                "unit": "g"
            },
            "18:0": {
                "qty": 0.29,
                "unit": "g"
            },
            "20:0": {
                "qty": 0.01,
                "unit": "g"
            },
            "22:0": {
                "qty": 0.01,
                "unit": "g"
            },
            "16:1": {
                "qty": "Tr",
                "unit": "g"
            },
            "18:1": {
                "qty": 0.85,
                "unit": "g"
            },
            "20:1": {
                "qty": 0.01,
                "unit": "g"
            },
            "18:2 n-6": {
                "qty": 0.7,
                "unit": "g"
            },
            "18:3 n-3": {
                "qty": 0.04,
                "unit": "g"
            },
            "18:1t": {
                "qty": 0.35,
                "unit": "g"
            },
            "18:2t": {
                "qty": 0.02,
                "unit": "g"
            }
        },
        "manganese": {
            "qty": 0.463333333333333,
            "unit": "mg"
        }
    }
}
const outputObj = {
    "baseQuantity": inputObj.base_qty,
    "base_unit": inputObj.base_unit,
    "carbohydrate": inputObj.attributes.carbohydrate.qty,
    "category_id": 1,
    "description": inputObj.description,
    "energyInKcal": inputObj.attributes.energy.kcal,
    "fiber": inputObj.attributes.fiber.qty,
    "id": inputObj.id,
    "image": "",
    "lipid": inputObj.attributes.lipid.qty,
    "protein": inputObj.attributes.protein.qty,
};

if (!outputObj.energy) {
    outputObj.energy = {
        "kcal": null,
        "kj": null
    }
}
if (!outputObj.image) {
    outputObj.image = ""
}
if (!outputObj.lipid) {
    outputObj.lipid = {
        "qty": null,
        "unit": null
    }
}
if (!outputObj.protein) {
    outputObj.protein = {
        "qty": null,
        "unit": null
    }
}
if (!outputObj.carbohydrate) {
    outputObj.carbohydrate = {
        "qty": null,
        "unit": null
    }
}
if (!outputObj.fiber) {
    outputObj.fiber = {
        "qty": null,
        "unit": null
    }
}

if (!outputObj.energy.kcal) {
    outputObj.energy.kcal = null;
}
if (!outputObj.energy.kj) {
    outputObj.energy.kj = null;
}
if (!outputObj.lipid.qty) {
    outputObj.lipid.qty = null;
}
if (!outputObj.lipid.unit) {
    outputObj.lipid.unit = null;
}
if (!outputObj.protein.qty) {
    outputObj.protein.qty = null;
}
if (!outputObj.protein.unit) {
    outputObj.protein.unit = null;
}
if (!outputObj.carbohydrate.qty) {
    outputObj.carbohydrate.qty = null;
}
if (!outputObj.carbohydrate.unit) {
    outputObj.carbohydrate.unit = null;
}
if (!outputObj.fiber.qty) {
    outputObj.fiber.qty = null;
}
if (!outputObj.fiber.unit) {
    outputObj.fiber.unit = null;
}
const json = JSON.stringify(outputObj)
console.log(json);

