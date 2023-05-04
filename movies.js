// Set up event listener for select element with id "cities"
document.getElementById("cities").addEventListener("change", function () {
  // Get the current date
  const currentDate = new Date();

  // Convert the date to a formatted string
  const dateString = currentDate.toLocaleDateString();

  // Log the date string to the console
  console.log(dateString);

  // Update the HTML element with id "date" to display the date string
  document.getElementById("date").innerHTML = dateString;

  // Get the value of the selected option in the "cities" select element
  var city = this.value;

  // Build the URL for the Finnkino API based on the selected city
  var url =
    "https://www.finnkino.fi/xml/Schedule/?area=" + encodeURIComponent(city);

  // Create a new XML HTTP request object
  var xhttp = new XMLHttpRequest();

  // Set up a callback function to handle the response from the API
  xhttp.onreadystatechange = function () {
    // Check if the request is complete and was successful
    if (this.readyState == 4 && this.status == 200) {
      // Parse the response XML into a DOM object
      var xmlDoc = this.responseXML;

      // Get an array of all the "Show" elements in the response
      var shows = xmlDoc.getElementsByTagName("Show");

      // Get a reference to the HTML element with id "movies"
      var movieList = document.getElementById("movies");

      // Clear any existing movie listings from the HTML element
      movieList.innerHTML = "";

      // Loop through each "Show" element in the response
      for (var i = 0; i < shows.length; i++) {
        // Get references to various elements within the "Show" element
        var show = shows[i];
        var title =
          show.getElementsByTagName("Title")[0].childNodes[0].nodeValue;
        var image = show.getElementsByTagName("EventMediumImagePortrait")[0]
          .childNodes[0].nodeValue;
        var startTime =
          show.getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
        const date = new Date(startTime);
        date.setSeconds(0);
        var ratingImageUrl =
          show.getElementsByTagName("RatingImageUrl")[0].childNodes[0]
            .nodeValue;
        var hall =
          show.getElementsByTagName("TheatreAuditorium")[0].childNodes[0]
            .nodeValue + " | ";
        var genres =
          show.getElementsByTagName("Genres")[0].childNodes[0].nodeValue;

        // Format the time strings for display
        let dateT = date.toLocaleTimeString();
        let dateTime = dateT.slice(0, -3);

        // Create new HTML elements to display the movie information
        var li = document.createElement("li");
        li.classList.add("movie-item");
        var img = document.createElement("img");
        img.src = image;
        var time = document.createElement("span");
        time.classList.add("time");
        time.textContent = dateTime;

        var showHall = document.createElement("span");
        showHall.classList.add("hall");
        showHall.textContent = hall;
        var titleSpan = document.createElement("span");
        titleSpan.classList.add("title");
        titleSpan.textContent = title;
        var ratingImg = document.createElement("img");
        ratingImg.src = ratingImageUrl;
        ratingImg.classList.add("ratingImg");
        var genresSpan = document.createElement("span");
        genresSpan.classList.add("genres");
        genresSpan.textContent = genres;

        // Append the new elements to the HTML page
        li.appendChild(img);
        li.appendChild(titleSpan);
        li.appendChild(genresSpan);
        li.appendChild(ratingImg);
        li.appendChild(showHall);
        li.appendChild(time);
        movieList.appendChild(li);
      }
    }
  };

  // Send the HTTP request to get the XML data
  xhttp.open("GET", url, true);
  xhttp.send();
});
