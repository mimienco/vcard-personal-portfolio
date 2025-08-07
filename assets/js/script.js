'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    }
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form && form.checkValidity()) {
      if (formBtn) {
        formBtn.removeAttribute("disabled");
      }
    } else {
      if (formBtn) {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Get the button text and convert to lowercase for comparison
    let buttonText = this.textContent.trim().toLowerCase();
    
    // Handle the special case where "About" button should show "about" page
    // and any other text mismatches
    let targetPage = buttonText;
    
    // Remove active class from all pages first
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    
    // Add active class to the target page
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        break;
      }
    }
    
    // Remove active class from all navigation links
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }
    
    // Add active class to clicked navigation link
    this.classList.add("active");
    
    // Scroll to top when switching pages
    window.scrollTo(0, 0);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  const closeBtn = modal.querySelector(".close-button");

  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalText = document.getElementById("modalText");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");

  document.querySelectorAll(".blog-post-item a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const card = this;

      const title = card.querySelector(".blog-item-title")?.innerText;
      const category = card.querySelector(".blog-category")?.innerText;
      const text = card.querySelector(".blog-text")?.innerText;

      const video = card.querySelector("video");
      const image = card.querySelector("img");

      modalTitle.innerText = title;
      modalCategory.innerText = category;
      modalText.innerText = text;

      // Show image or video depending on content
      if (video) {
        modalVideo.src = video.src;
        modalVideo.style.display = "block";
        modalImage.style.display = "none";
      } else if (image) {
        modalImage.src = image.src;
        modalImage.style.display = "block";
        modalVideo.style.display = "none";
      } else {
        modalImage.style.display = "none";
        modalVideo.style.display = "none";
      }

      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalVideo.pause();
  });

  // Optional: close on background click
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  });
});

