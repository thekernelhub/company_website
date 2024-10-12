// Loading screen main page
var map;


// // Initialize the map and set its view to your chosen location and zoom level
// const map = L.map('map').setView([6.9271, 79.8612], 13);

// // Load and display the map tiles
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// // Add a marker at the chosen location
// L.marker([51.505, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();



document.addEventListener("DOMContentLoaded", function() {
  // Initialize the map when the document is loaded
  map = L.map('map').setView([6.9271, 79.8612], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  window.addEventListener("load", function() {
      var loadingScreen = document.getElementById('loading-screen');
      var mainContent = document.getElementById('main-content');
      
      // Add a delay of 2 seconds (2000 milliseconds)
      setTimeout(function() {
        // // Hide the loading screen
        loadingScreen.style.display = 'none';
        
        // // Show the main content
        mainContent.style.display = 'block';
        
        // // Restore overflow for body and html after loading screen is hidden
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';

        // Invalidate the map size to ensure it is displayed correctly
        map.invalidateSize();
    }, 1000); // 1000 milliseconds = 1 seconds
  });
});


// Loading screen second page

// document.addEventListener("DOMContentLoaded", function() {
//   window.addEventListener("load", function() {
//       var loadingScreen = document.getElementById('loading-screen2');
//       var mainContent = document.getElementById('main-content2');
      
//       // Add a delay of 2 seconds (2000 milliseconds)
//       setTimeout(function() {
//         // Hide the loading screen
//         loadingScreen.style.display = 'none';
        
//         // Show the main content
//         mainContent.style.display = 'block';
        
//         // Restore overflow for body and html after loading screen is hidden
//         document.body.style.overflow = 'auto';
//         document.documentElement.style.overflow = 'auto';

//         // Invalidate the map size to ensure it is displayed correctly
//         map.invalidateSize();
//     }, 1000); // 1000 milliseconds = 1 seconds
//   });
// });


// Leaflet Map



//navbar toggle effect
  document.querySelector('.navbar-toggler').addEventListener('click', function() {
    var icon = document.querySelector('#togglerIcon');
    if (icon.innerHTML === 'close') {
      icon.innerHTML = 'menu';
    } else {
      icon.innerHTML = 'close';
    }
  });

  // Array of words to cycle through
  const words = [ "Revolution", "Journey", "Transformation" ];
  let index = 0;

  // Function to change the word
  function changeWord() {
    const changingWord = document.getElementById('changing-word');
    changingWord.textContent = words[index];
    index = (index + 1) % words.length;
  }

  // Start changing the word every 2 seconds
  setInterval(changeWord, 2000);

  // JavaScript to toggle the visibility of the icon
  // setTimeout(function() {
  //   document.querySelector('.animate1"').style.display = 'block'; // Show the icon after a delay
  // }, 1000);

  //typewriter effect

  // const wordss = 'About'; // Word to be typed out
  const typewriterElement = document.getElementById('typewriter-text');
  const wordss = typewriterElement.textContent.trim(); // Trim to remove any leading/trailing whitespace
  let indexx = 0;
  
  function typeWriter() {
    const textElement = document.getElementById('typewriter-text');
    textElement.textContent = wordss.substring(0, indexx++);
  }
  
  setInterval(typeWriter, 500); // Change letter every 200 milliseconds
  
  
  // Country selector

    fetch('https://restcountries.com/v3.1/all') // GeoNames API endpoint for all countries
      .then(response => response.json())
      .then(data => {
        const countriesList = document.getElementById('countryInput');
        data.forEach(country => {
          const option = document.createElement('option');
          option.value = country.name.common; // Use the common name of the country
          countriesList.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching countries:', error));


// Phone number validator

function validatePhoneNumber() {
  const phoneInput = document.getElementById('phoneInput');
  const phoneError = document.getElementById('phoneError');
  const phoneNumber = phoneInput.value;
  const phoneRegex = /^\d{3}\d{3}\d{4}$/; // Example regex for format XXXXXXXXXX

  if (phoneRegex.test(phoneNumber)) {
    phoneError.textContent = ''; // Clear error message
    phoneInput.classList.remove('invalid-input'); // Remove red border
    // alert('Valid phone number!');
  } else {
    phoneError.textContent = 'Invalid phone number! Please enter a number in the format XXXXXXXXXX.';
    phoneInput.classList.add('invalid-input'); // Add red border
  }
}


// Contact us form

document.getElementById('ContactUs').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const data = {
      nameInput: formData.get('nameInput'),
      emailInput: formData.get('emailInput'),
      countryInput: formData.get('countryInput'),
      phoneInput: formData.get('phoneInput'),
      messageinput: formData.get('messageinput')
  };

  try {
      const response = await fetch('/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          alert('Message sent successfully!');
      } else {
          alert('Failed to send message.'+ response.status);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message.' + error.message);
  }
});