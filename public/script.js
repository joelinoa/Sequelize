function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

async function MealTable() {
    const request = await fetch('/api/wholeMeal');
    const meals = await request.json();
    const meals1 = meals.data
    const meal = document.querySelector("#meals");

    const mealArray = [1,2,3,4,5,6,7,8,9,10];
    const selected = mealArray.map((element) => {
        const rand = getRandomIntInclusive(0, meals1.length - 1);
        return meals1[rand];
    });
    console.table(selected);

    const cholesterol = [];
    const sodium = [];
    const carbs = [];
    const protein = [];
    const fat = [];
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Meals and Macros Chart"
        },
        toolTip: {
            shared: true
        },
	    data: [{
		    type: "stackedBar",
            name: 'cholesterol',
            dataPoints: cholesterol,
	    }, 
        {
		    type: "stackedBar",
            name: 'sodium',
            dataPoints: sodium,
	    },
        {
		    type: "stackedBar",
            name: 'carbs',
            dataPoints: carbs,
	    },
        {
		    type: "stackedBar",
            name: 'protein',
            dataPoints: protein,
	    },
        {
		    type: "stackedBar",
            name: 'fat',
            dataPoints: fat,
	    }]

    });
    selected.forEach((element) => {
        cholesterol.push({label: element.meal_name, y: element.cholesterol});
        sodium.push({label: element.meal_name, y: element.sodium});
        carbs.push({label: element.meal_name, y: element.carbs});
        protein.push({label: element.meal_name, y: element.protein});
        fat.push({label: element.meal_name, y: element.fat});

        const appendItem = document.createElement("tr");
        appendItem.innerHTML = `<th class='tbody'>${element.meal_name}</th>
        <td class='tbody'>${element.cholesterol}</td>
        <td class='tbody'>${element.sodium}</td>
        <td class='tbody'>${element.carbs}</td>
        <td class='tbody'>${element.protein}</td>
        <td class='tbody'>${element.fat}</td>`;
        meal.append(appendItem);
    });
    chart.render();
}

async function WindowActions() {
  await MealTable();
}

window.onload = WindowActions;
