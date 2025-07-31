
// header scroll 
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");  // Applies new style
  } else {
    header.classList.remove("scrolled");  // Reverts back
  }
});




// Always scroll to top on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};




const attractions = [
  {
    name: "Baga Beach",
    image: "images/baga-beach.jpg",
    category: "Beach",
    shortDesc: "Popular beach with water sports and nightlife.",
    fullDesc: "This beach is perfect for swimming, jet skiing, and sunset parties. Don't miss out on the beach shacks and live music."
  },
  {
    name: "Aguada Fort",
    image: "images/Aguada_Fort1.jpg",
    category: "History",
    shortDesc: "17th-century fort with scenic views.",
    fullDesc: "Built by the Portuguese in 1612, Aguada Fort served as a crucial defense point. It also has a lighthouse and a massive freshwater reservoir."
  },
  {
    name: "Dudhsagar Falls",
    image: "images/Dudhsagar_Falls.jpg",
    category: "Nature",
    shortDesc: "Four-tiered waterfall in the forest.",
    fullDesc: "One of India’s tallest waterfalls. Take a jeep safari through the forest and enjoy a scenic picnic near the base of the falls."
  },
  {
    name: "Goan Cuisine",
    image: "images/Goan_Cuisine.jpg",
    category: "Food",
    shortDesc: "Authentic Goan seafood thali.",
    fullDesc: "From prawn balchão to fish curry rice, enjoy a mix of Portuguese and Konkani flavors that define Goan food culture."
  }
];

const grid = document.querySelector(".attractions-grid");

// Render attractions
function renderAttractions(filter = "All") {
  grid.innerHTML = "";

  const filtered = filter === "All" ? attractions : attractions.filter(item => item.category === filter);

  filtered.forEach(attraction => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.setAttribute("data-category", attraction.category);

    card.innerHTML = `
      <img src="${attraction.image}" alt="${attraction.name}" />
      <h3>${attraction.name}</h3>
      <span class="badge">${getCategoryBadge(attraction.category)}</span>
      <p class="desc">${attraction.shortDesc}</p>
      <p class="full-desc hidden">${attraction.fullDesc}</p>
      <button class="read-more">Read More</button>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll(".read-more").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".attraction-card");
      const fullDesc = card.querySelector(".full-desc");
      fullDesc.classList.toggle("hidden");
      button.textContent = fullDesc.classList.contains("hidden") ? "Read More" : "Read Less";
    });
  });
}

// Category icon function
function getCategoryBadge(category) {
  const icons = {
    Beach: "🏖️ Beach",
    History: "🏰 History",
    Nature: "🌿 Nature",
    Food: "🍛 Food"
  };
  return icons[category] || category;
}

renderAttractions();





/* Itinerary Planner Section form */
document.getElementById("itinerary-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const duration = document.getElementById("duration").value;
  const beaches = document.querySelector('input[value="beaches"]').checked;
  const culture = document.querySelector('input[value="culture"]').checked;
  const food = document.querySelector('input[value="food"]').checked;

  const output = document.getElementById("itinerary-result");
  output.innerHTML = `<h3>Your ${duration}-Day Itinerary:</h3>`;

  const plans = [];

  if (beaches) {
    plans.push({
      day: "Day 1",
      activity: "Relax at Baga Beach",
      img: "images/baga-sea-beach2.jpg"
    });
  }
  
  if (culture) {
    plans.push({
      day: "Day 2",
      activity: "Visit  Mangueshi Temple",
      img: "images/Mangueshi_Temple.jpg"
    });
  }
  
  if (food) {
    plans.push({
      day: "Day 3",
      activity: "Try Goan seafood at Fisherman's Wharf",
      img: "images/fish_wharf.png"
    });
  }
  
  if (duration === "5") {
    plans.push({
      day: "Day 4",
      activity: "Shop at Anjuna Flea Market",
      img: "images/Anjuna_market.jpg"
    });
    plans.push({
      day: "Day 5",
      activity: "Sunset at Palolem Beach",
      img: "images/Palolem_Beach.jpg"
    });
  }
  

  plans.forEach(plan => {
    output.innerHTML += `
      <div class="day">
        <img src="${plan.img}" alt="${plan.activity}" />
        <div>
          <strong>${plan.day}:</strong> ${plan.activity}
        </div>
      </div>
    `;
  });
});



// Lightbox functionality
const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

galleryItems.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Also close when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImage) {
    lightbox.style.display = "none";
  }
});




// Contact Form Validation
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const formMessage = document.getElementById("form-message");

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    formMessage.textContent = "Please fill out all required fields.";
    formMessage.style.color = "red";
    return;
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Thank you! Your message has been sent.";
  formMessage.style.color = "green";
  this.reset();
});



