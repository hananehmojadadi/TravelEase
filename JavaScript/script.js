// Hero swiper (glass cards)
const heroSwiper = new Swiper(".hero-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: "#nextBtn",
    prevEl: "#prevBtn",
  },
  on: {
    slideChange: function () {
      document.getElementById("slide-number").innerText = (this.realIndex + 1)
        .toString()
        .padStart(2, "0");
    },
  },
});

const slideButtons = document.querySelectorAll(".glass-card button");

slideButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    let message = "";

    // show message according the button on hero swiper
    if (index === 0) {
      message = `
          🌍 <strong>Virtual Tour Activated!</strong><br>
          Enjoy a 360° view of our top destinations. ✨
        `;
    } else if (index === 1) {
      message = `
          📍 <strong>Location Insights!</strong><br>
          Discover nearby attractions and hidden gems 🗺️
        `;
    } else if (index === 2) {
      message = `
          🏨 <strong>Map & Amenities Ready!</strong><br>
          Explore all facilities and plan your stay comfortably 🛏️
        `;
    }

    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.innerHTML = `<div class="message-box">${message}</div>`;
    document.body.appendChild(popup);

    // remove after 3s
    setTimeout(() => popup.remove(), 3000);
  });
});
// ---------------------------------------------------------------------------------------------

// Destination swiper (3-card grouped slider)
const destinationSwiper = new Swiper(".destination-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: "#dest-next",
    prevEl: "#dest-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1, slidesPerGroup: 1 },
    768: { slidesPerView: 2, slidesPerGroup: 2 },
    1024: { slidesPerView: 3, slidesPerGroup: 3 },
  },
});

// ----------------------------------------------------------------------------------------------------

// API KEY of Unsplash
const accessKey = "Q2i_-8GCHDf1xnm64usUAeqNoZuVNOnOTqYGSZbKuAQ";
const searchBtn = document.getElementById("exploreSearchBtn");
const searchInput = document.querySelector(".explore-search-bar input");
const messageBox = document.getElementById("exploreMessageBox");

function showMessage(text, type = "loading") {
    messageBox.textContent = text;
    messageBox.className = "explore-message show " + type;
    messageBox.style.display = "block";
}

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        showMessage("Please enter a search term!", "warning");
        return;
    }

    showMessage("⏳ Loading...", "loading");

    const cards = document.querySelectorAll(".explore-card");
    let matchedCard = null;

    cards.forEach(card => {
        const spanText = card.querySelector("span").textContent.toLowerCase();
        if (spanText === query) {
            matchedCard = card;
        }
    });

    if (!matchedCard) {
        showMessage("No matching destination found!", "error");
        return;
    }

    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`);
        if (!response.ok) throw new Error("Failed to fetch image");
        const data = await response.json();

        matchedCard.querySelector("img").src = data.urls.regular;
        matchedCard.querySelector("img").alt = query;
        matchedCard.querySelector("span").textContent = query.charAt(0).toUpperCase() + query.slice(1);

        showMessage("✅ Image updated successfully!", "success");
    } catch (error) {
        console.error(error);
        showMessage("Error loading destination!", "error");
    }
});

// --------------------------------------------------------------------------------------------------

const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      const bg = section.dataset.navbarBg;
      const color = section.dataset.navbarColor;
      navbar.style.background = bg;
      navbar.style.color = color;

      // Change all links inside navbar
      navbar.querySelectorAll("a").forEach((link) => {
        link.style.color = color;
      });
    }
  });
});

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("nav-active");
}
// -------------------------------------------------------------------------------------

// Make buttons open
const packageButtons = document.querySelectorAll(".view-package-btn");
const modalTitle = document.getElementById("packageTitle");
const modalPrice = document.getElementById("packagePrice");
const packageModal = new bootstrap.Modal(
  document.getElementById("packageModal")
);

packageButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title;
    modalPrice.textContent = "Starting from " + btn.dataset.price;
    packageModal.show();
  });
});

// Book Now button
const bookButtons = document.querySelectorAll(".btn-book");
const destModalTitle = document.getElementById("destModalTitle");
const destModalPrice = document.getElementById("destModalPrice");
const destModal = new bootstrap.Modal(
  document.getElementById("destinationModal")
);
const destinationForm = document.getElementById("destinationForm");
const destSuccessMessage = document.getElementById("destSuccessMessage");

bookButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    destModalTitle.textContent = btn.dataset.title;
    destModalPrice.textContent = "Starting from " + btn.dataset.price;
    destModal.show();
    destSuccessMessage.classList.add("d-none");
    destinationForm.classList.remove("d-none");
    destinationForm.reset();
  });
});

destinationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  destinationForm.classList.add("d-none");
  destSuccessMessage.classList.remove("d-none");
  setTimeout(() => {
    destModal.hide();
    destinationForm.classList.remove("d-none");
  }, 2000);
});
document.getElementById("exploreBtn").addEventListener("click", function () {
  window.location.href = "accommodation.html";
});

// ----------------------------------------------------------------------------------------

const exploreBtn = document.getElementById("exploreBtn");
const tourMap = document.getElementById("tourMap");

exploreBtn.addEventListener("click", () => {
  tourMap.classList.add("active");

  exploreBtn.innerHTML =
    '<i class="fas fa-check-circle me-2"></i>Exploration Activated!';

  setTimeout(() => {
    tourMap.classList.remove("active");
    exploreBtn.innerHTML =
      '<i class="fas fa-globe-americas me-2"></i>Start Exploration';
  }, 4000);
});

// animation on scroll
const featureCards = document.querySelectorAll(".feature-card");

function showCardsOnScroll() {
  featureCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showCardsOnScroll);
showCardsOnScroll();

document.querySelectorAll(".toggle-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".review-card");
    const more = card.querySelector(".more-content");
    more.classList.toggle("show");
    button.textContent = more.classList.contains("show")
      ? "Show Less"
      : "Read More";
  });
});

document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const details = btn.previousElementSibling;
    details.classList.toggle("show");
    btn.textContent = details.classList.contains("show")
      ? "Show Less"
      : "Read More";
  });
});

// --------------------------------------------------------------------------------------------------
//  Sign Up / Log In System with Popup + Redirect + LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");
  const formTitle = document.getElementById("form-title");
  const formSubtitle = document.getElementById("form-subtitle");
  const authForm = document.getElementById("auth-form");
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const submitBtn = document.getElementById("submit-btn");

  //  Create popup
  let popup = document.getElementById("popup-message");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "popup-message";
    popup.className = "popup hidden";
    popup.innerHTML = `
      <div class="popup-content">
        <h3 id="popup-title">Success</h3>
        <p id="popup-text">You have signed up!</p>
        <button id="popup-close">OK</button>
      </div>`;
    document.body.appendChild(popup);
  }

  const popupTitle = popup.querySelector("#popup-title");
  const popupText = popup.querySelector("#popup-text");
  const popupClose = popup.querySelector("#popup-close");

  //  Popup CSS
  const styleId = "travel-auth-popup-style";
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = `
      .popup { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:9999; }
      .popup.hidden { display: none; }
      .popup-content { background: #fff; border-radius:14px; padding:22px 26px; text-align:center; box-shadow:0 8px 30px rgba(0,0,0,0.18); min-width:260px; max-width:90%; }
      .popup-content h3 { margin:0 0 8px 0; font-size:18px; color:#0072ff; }
      .popup-content p { margin:0 0 12px 0; color:#333; font-size:14px; }
      #popup-close { margin-top:8px; padding:8px 14px; border-radius:8px; border:0; background:#0072ff; color:#fff; cursor:pointer; }
      @media (max-width:420px){ .popup-content{ padding:18px; } }
    `;
    document.head.appendChild(styleEl);
  }

  //  Validation check
  if (
    !signupBtn ||
    !loginBtn ||
    !authForm ||
    !usernameField ||
    !emailField ||
    !passwordField ||
    !submitBtn
  ) {
    console.warn("Auth script: missing expected elements — check IDs.");
    return;
  }

  signupBtn.type = "button";
  loginBtn.type = "button";
  submitBtn.type = "submit";

  let isSignup = true;

  //  Switch between Signup / Login
  function setMode(toSignup) {
    isSignup = !!toSignup;
    if (isSignup) {
      signupBtn.classList.add("active");
      loginBtn.classList.remove("active");
      formTitle.textContent = "Begin Your Adventure";
      formSubtitle.textContent = "Sign up with an Open account";
      usernameField.style.display = "";
      usernameField.required = true;
      submitBtn.textContent = "Let's Start";
      usernameField.focus();
    } else {
      loginBtn.classList.add("active");
      signupBtn.classList.remove("active");
      formTitle.textContent = "Welcome Back!";
      formSubtitle.textContent = "Log in to your account";
      usernameField.style.display = "none";
      usernameField.required = false;
      submitBtn.textContent = "Log In";
      emailField.focus();
    }
  }

  setMode(true);

  signupBtn.addEventListener("click", () => setMode(true));
  loginBtn.addEventListener("click", () => setMode(false));

  function showPopup(title, message) {
    popupTitle.textContent = title;
    popupText.textContent = message;
    popup.classList.remove("hidden");
    popupClose.focus();
  }
  function hidePopup() {
    popup.classList.add("hidden");
  }

  popupClose.addEventListener("click", hidePopup);
  popup.addEventListener("click", (ev) => {
    if (ev.target === popup) hidePopup();
  });

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameVal = (usernameField.value || "").trim();
    const emailVal = (emailField.value || "").trim();

    if (isSignup) {
      // Save to localStorage
      localStorage.setItem("userEmail", emailVal);
      localStorage.setItem("userName", usernameVal);

      showPopup(
        "🎉 Sign Up Successful",
        `Welcome aboard${usernameVal ? ", " + usernameVal : ""}!`
      );
      authForm.reset();

      // Switch to login after sign up
      setTimeout(() => {
        setMode(false);
      }, 2000);
    } else {
      showPopup(
        "✨ Login Successful",
        `Welcome back${usernameVal ? ", " + usernameVal : ""}!`
      );
      authForm.reset();

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }
  });

  console.log("Auth script initialized — mode:", isSignup ? "signup" : "login");
});

// ---------------------------------------------------------------------------------------------
document.getElementById("auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(`${submitBtn.textContent} Successful! 🌍`);
});
