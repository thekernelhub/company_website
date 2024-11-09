// Loading screen main page
var map;



window.addEventListener("load", function() {
  var loadingScreen = document.getElementById('loading-screen');
  var mainContent = document.getElementById('main-content');

  setTimeout(function() {
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';

    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Initialize the map after showing the main content
    var mapContainer = document.getElementById('map');
    if (mapContainer) {
      var map = L.map(mapContainer).setView([6.9271, 79.8612], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Invalidate the map size to ensure it displays correctly
      map.invalidateSize();
    }
  }, 1000); // 1-second delay
});




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
fetch('https://restcountries.com/v3.1/all') // RESTCountries API endpoint for all countries
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

// Phone number should match format XXXXXXXXXX (10 digits)
const phoneRegex = /^\d{3}\d{3}\d{4}$/;

if (phoneRegex.test(phoneNumber)) {
  phoneError.textContent = ''; // Clear error message
  phoneInput.classList.remove('invalid-input'); // Remove red border
} else {
  phoneError.textContent = 'Invalid phone number! Please enter a number in the format XXXXXXXXXX.';
  phoneInput.classList.add('invalid-input'); // Add red border
}
}


document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload

  validatePhoneNumber(); // Check phone validation

  const phoneError = document.getElementById('phoneError').textContent;
  if (phoneError) {
      return; // Don't proceed if there is an error
  }

});