document.addEventListener('DOMContentLoaded', () => {

  const showFavoritesButton = document.getElementById('show-favorites');
  const favoritesList = document.getElementById('favorites-list');
  const favresult = document.querySelector("#favresult");

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-favorites')) {
      const button = event.target;
      const carId = button.dataset.id;
      const cars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
      if (!cars.includes(carId)) {
        cars.push(carId);
        localStorage.setItem('favoriteCars', JSON.stringify(cars));
        button.textContent = "Already added";
      } else {
        alert("You have already added this car to the list!!!");
      }
    }
  });

  if (showFavoritesButton != null) {
    showFavoritesButton.addEventListener('click', async () => {
      favresult.innerHTML = '';
      const favoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
      favoritesList.innerHTML = '';

      const table = document.createElement('table');
      const headerRow = `<tr>
                    <th>ID</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Country</th>
                    <th>Price</th>
                    <th>Odometer</th>
                    <th>Action</th>
                  </tr>`;
      table.innerHTML = headerRow;

      for (const carId of favoriteCars) {
        // const response = await fetch(`/cars/fav/carID?carID=${carId}`);
        const response = await fetch(`/cars/fav/carID?carID=${carId}`);
        const facar = await response.json();

        // Create a new table cell for the remove button
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove From Favourite List';
        removeButton.dataset.id = carId;
        removeButton.addEventListener('click', () => {
          const cars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
          const carIndex = cars.indexOf(carId);
          if (carIndex > -1) {
            cars.splice(carIndex, 1);
            localStorage.setItem('favoriteCars', JSON.stringify(cars));
            table.removeChild(row);
          }
        });
        removeCell.appendChild(removeButton);

        // Generate the table row with the remove button cell appended to it
        const row = document.createElement('tr');

        if (facar.id != null) {
          row.innerHTML = `<td>${facar.id}</td>
                   <td>${facar.carMake}</td>
                   <td>${facar.carModel}</td>
                   <td>${facar.carYear}</td>
                   <td>${facar.country}</td>
                   <td>${facar.price}</td>
                   <td>${facar.odometer}</td>`;
          row.appendChild(removeCell);
        }
        table.appendChild(row);

      }

      if (favoriteCars.length != 0) {
        favresult.appendChild(table);
      }
    });
  }

  const summaryResult = document.getElementById('summaryResult');
  const summaryYearButton = document.getElementById('summaryYearButton');
  const summaryMakeButton = document.getElementById('summaryMakeButton');
  const yearInput = document.getElementById('yearInput');
  const carmakeInput = document.getElementById('carmakeInput');

  if (summaryYearButton != null && summaryMakeButton != null) {
    summaryYearButton.addEventListener('click', async () => {
      const year = yearInput.value;
      const response = await fetch(`/summary/year?year=${year}`);
      const data = await response.json();
      if (data.count == 0) {
        alert(`The year ${year} doesn't have any cars.`)
      } else{
        summaryResult.innerHTML = `the caryear ${year}'s car amount: ${data.count}, the average price is $${data.averagePrice}`;
      }
    });

    summaryMakeButton.addEventListener('click', async () => {
      const make = carmakeInput.value;
      const response = await fetch(`/summary/make?make=${make}`);
      const data = await response.json();

      summaryResult.innerHTML = `the carmake ${make}'s car amount: ${data.count}, the average price is $${data.averagePrice}`;
    });

    const hideSummaryButton = document.getElementById("hideSummary");
    hideSummaryButton.addEventListener('click', () => {
      summaryResult.innerHTML = "";
    });

  }

});
