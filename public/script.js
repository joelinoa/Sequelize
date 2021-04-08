function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

async function DiningHalls() {
  const request = await fetch("/api/dining");
  const dining = await request.json();
  const dining1 = dining.data;
  console.log(dining);

  const dine = document.querySelector("#dininghalls");

  dining1.forEach((element) => {
    const appendItem = document.createElement("tr");
    appendItem.innerHTML = `<th class='tbody'>${element.hall_id}</th>
        <td class='tbody'>${element.hall_name}</td>
        <td class='tbody'>${element.hall_address}</td>`;
    dine.append(appendItem);
  });
}

async function MealTable() {
    const request = await fetch('/api/wholeMeal');
    const meals = await request.json();
    const meals1 = meals.data
    console.log(meals.data)
    const mealArray = [1,2,3,4,5,6,7,8,9,10];
    const selected = mealArray.map((element) => {
        const rand = getRandomIntInclusive(0, meals1.length - 1);
        return meals1[rand];
    });
    console.table(selected);
    return selected
}

async function ChartMaker() {
    const table = MealTable()
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Meals and Macros"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
	    data: [{
		    type: "stackedBar",
		    name: "cholesterol",
		    showInLegend: "true",
		    dataPoints: [
			    table.forEach((element) => {
                   {x: element.meal_name, y: element.cholesterol} 
                })
		    ]
	    }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
}

async function WindowActions() {
  await DiningHalls();
  await MealTable();
}

window.onload = WindowActions;
