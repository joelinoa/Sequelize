async function DiningHalls() {
    const request = await fetch('/api/dining');
    const dining = await request.json();
    const dining1 = dining.data
    console.log(dining);

    const dine = document.querySelector('#dininghalls');

    dining1.forEach((element) => {
        const appendItem = document.createElement('tr');
        appendItem.innerHTML =`<th class='tbody'>${element.hall_id}</th>
        <td class='tbody'>${element.hall_name}</td>
        <td class='tbody'>${element.hall_address}</td>`;
        dine.append(appendItem);
    });

}

async function WindowActions() {
    await DiningHalls();
}

window.onload = WindowActions;