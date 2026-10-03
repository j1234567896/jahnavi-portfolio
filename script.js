"use strict";

/* =========================================================
   JAHNAVI PORTFOLIO - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================================
   PORTFOLIO DATA
   ========================================================= */

const skills = [
  {
    group: "Programming",
    items: [
      ["Python", 75],
      ["Java", 65],
      ["C", 70]
    ]
  },

  {
    group: "Computer Science",
    items: [
      ["Data Structures and Algorithms", 70],
      ["DBMS", 70]
    ]
  },

  {
    group: "Web Development",
    items: [
      ["HTML", 85],
      ["CSS", 80],
      ["JavaScript", 70],
      ["Web Development", 75]
    ]
  },

  {
    group: "Tools & Technologies",
    items: [
      ["Git", 70],
      ["GitHub", 70],
      ["DevOps Basics", 55]
    ]
  }
];


const projects = [

  {
    name: "EventMood",
    cat: "AI",
    label: "AI / NLP",
    area: "Emotion Detection",
    desc:
      "An NLP-based emotion detection project that analyzes text and identifies emotions using a pretrained language model."
  },

  {
    name: "Product Sentiment Analysis",
    cat: "AI",
    label: "AI / Machine Learning",
    area: "Sentiment Analysis",
    desc:
      "An AI and machine-learning based project that analyzes product-related text and identifies sentiment."
  },

  {
    name: "Music Recommendation System",
    cat: "Data",
    label: "Data / Recommendation",
    area: "TF-IDF, Cosine Similarity",
    desc:
      "A music recommendation system that uses TF-IDF and cosine similarity to identify and recommend similar songs."
  },

  {
    name: "AgriSmart",
    cat: "Web",
    label: "Web / Agriculture",
    area: "Crop Recommendation",
    desc:
      "A web-based agricultural application designed to provide useful crop-related recommendations and information."
  },

  {
    name: "AI Office Suite",
    cat: "AI",
    label: "AI / Productivity",
    area: "AI-powered Office Tools",
    desc:
      "An AI-powered office productivity application containing modules for documents, presentations, spreadsheets, letters, projects and files."
  }

];


const projectFilters = [
  "All",
  "AI",
  "Web",
  "Data"
];


const certificationTopics = [
  "Python",
  "C",
  "Data Structures",
  "Design Thinking",
  "Business Skills",
  "Machine Learning",
  "Feature Engineering",
  "Artificial Intelligence",
  "Quantum Computing",
  "Web Development"
];


/* =========================================================
   GREETING
   ========================================================= */

function setGreeting() {

  const greeting = $("#greeting");

  if (!greeting) return;

  const hour = new Date().getHours();

  let word;

  if (hour < 12) {
    word = "Good morning";
  } else if (hour < 18) {
    word = "Good afternoon";
  } else {
    word = "Good evening";
  }

  greeting.textContent =
    `${word}, welcome to my portfolio`;

}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function startTyping() {

  const el =
    $("#typedRole") ||
    $("#typed");

  if (!el) return;

  const words = [
    "Computer Science Engineering Student",
    "Web Developer",
    "AI Enthusiast"
  ];

  if (reduceMotion) {

    el.textContent = words[0];

    return;
  }

  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function type() {

    const word = words[wordIndex];

    if (deleting) {

      characterIndex--;

    } else {

      characterIndex++;

    }

    el.textContent =
      word.substring(0, characterIndex);


    let speed = deleting ? 45 : 80;


    if (!deleting &&
        characterIndex === word.length) {

      deleting = true;
      speed = 1800;

    }


    if (deleting &&
        characterIndex === 0) {

      deleting = false;

      wordIndex =
        (wordIndex + 1) % words.length;

      speed = 400;

    }


    setTimeout(type, speed);
  }

  type();

}


/* =========================================================
   RENDER SKILLS
   ========================================================= */

function renderSkills() {

  const grid = $("#skillGrid");

  if (!grid) return;

  let html = "";


  skills.forEach(group => {

    html += `
      <div class="col-md-6">

        <article class="card-box h-100">

          <h3 class="h5 mb-4">
            ${group.group}
          </h3>

          <div class="skill-list">
    `;


    group.items.forEach(([name, level]) => {

      html += `
        <div class="skill mb-3">

          <div class="d-flex justify-content-between mb-1">

            <span>
              ${name}
            </span>

            <small>
              ${level}%
            </small>

          </div>

          <div
            class="bar"
            aria-label="${name} skill level ${level}%"
          >

            <i
              data-w="${level}"
              style="width: 0%"
            ></i>

          </div>

        </div>
      `;

    });


    html += `
          </div>

        </article>

      </div>
    `;

  });


  grid.innerHTML = html;

}


/* =========================================================
   FILTER BUTTON CREATOR
   ========================================================= */

function makeFilters(box, list, callback) {

  if (!box) return;


  box.innerHTML = list.map(
    (item, index) => `
      <button
        type="button"
        class="btn btn-outline-custom btn-sm filter-btn ${
          index === 0 ? "active" : ""
        }"
        data-filter="${item}"
        aria-pressed="${index === 0}"
      >
        ${item}
      </button>
    `
  ).join("");


  box.addEventListener("click", event => {

    const button =
      event.target.closest("button[data-filter]");

    if (!button) return;


    $$("button", box).forEach(btn => {

      const active =
        btn === button;

      btn.classList.toggle(
        "active",
        active
      );

      btn.setAttribute(
        "aria-pressed",
        active
      );

    });


    callback(button.dataset.filter);

  });

}


/* =========================================================
   RENDER PROJECTS
   ========================================================= */

function renderProjects() {

  const grid = $("#projGrid");

  if (!grid) return;


  grid.innerHTML = projects.map(
    (project, index) => `

      <div
        class="col-md-6 proj"
        data-cat="${project.cat}"
      >

        <article class="card-box project-card h-100">

          <span class="badge mb-3">
            ${project.label}
          </span>

          <h3 class="h4">
            ${project.name}
          </h3>

          <p>
            ${project.desc}
          </p>

          <p>
            <strong>Area:</strong>
            ${project.area}
          </p>

          <div class="d-flex gap-2 flex-wrap">

            <button
              type="button"
              class="btn btn-primary-custom btn-sm project-view"
              data-index="${index}"
            >
              View Project
            </button>

          </div>

        </article>

      </div>
    `
  ).join("");


  /* Project filters */

  makeFilters(
    $("#projFilters"),
    projectFilters,
    filterProjects
  );


  /* Project modal */

  grid.addEventListener("click", event => {

    const button =
      event.target.closest(
        ".project-view"
      );

    if (!button) return;


    const index =
      Number(button.dataset.index);

    const project =
      projects[index];


    const title =
      $("#modalTitle");

    const category =
      $("#modalCat");

    const description =
      $("#modalDesc");


    if (title)
      title.textContent =
        project.name;

    if (category)
      category.textContent =
        project.label;

    if (description)
      description.textContent =
        project.desc;


    const modalElement =
      $("#projModal");

    if (
      modalElement &&
      window.bootstrap
    ) {

      const modal =
        bootstrap.Modal.getOrCreateInstance(
          modalElement
        );

      modal.show();

    }

  });

}


/* =========================================================
   PROJECT FILTER
   ========================================================= */

function filterProjects(filter) {

  const cards =
    $$(".proj");

  let visible = 0;


  cards.forEach(card => {

    const match =
      filter === "All" ||
      card.dataset.cat === filter;


    card.classList.toggle(
      "hide",
      !match
    );


    if (match) {

      visible++;

      if (!reduceMotion) {

        card.classList.add(
          "fade-in"
        );

      }

    }

  });


  let noProject =
    $("#noProj");


  if (!noProject) {

    noProject =
      document.createElement("p");

    noProject.id =
      "noProj";

    noProject.className =
      "hide";

    noProject.textContent =
      "No projects found.";

    const grid =
      $("#projGrid");

    if (grid)
      grid.appendChild(noProject);

  }


  noProject.classList.toggle(
    "hide",
    visible > 0
  );

}


/* =========================================================
   RENDER CERTIFICATIONS
   ========================================================= */

function renderCertifications() {

  const grid =
    $("#certGrid");

  if (!grid) return;


  grid.innerHTML =
    certificationTopics.map(
      topic => `

        <div
          class="col-sm-6 col-lg-4 cert-item"
          data-topic="${topic}"
        >

          <article class="card-box h-100">

            <div class="cert-icon">
              <i class="bi bi-award"></i>
            </div>

            <h3 class="h6">
              ${topic}
            </h3>

            <p class="small mb-0">
              Certification / course area
            </p>

          </article>

        </div>

      `
    ).join("");


  makeFilters(
    $("#certFilters"),
    ["All", ...certificationTopics],
    filterCertifications
  );

}


/* =========================================================
   CERTIFICATION FILTER
   ========================================================= */

function filterCertifications(filter) {

  $$(".cert-item").forEach(item => {

    const match =
      filter === "All" ||
      item.dataset.topic === filter;


    item.classList.toggle(
      "hide",
      !match
    );

  });

}


/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */

function initForm() {

  const form =
    $("#contactForm");

  if (!form) return;


  const rules = {

    name: value => {

      if (!value.trim()) {

        return "Please enter your name.";

      }

      return "";

    },


    email: value => {

      if (!value.trim()) {

        return "Please enter your email.";

      }


      const valid =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
          .test(value.trim());


      if (!valid) {

        return "Enter a valid email address.";

      }

      return "";

    },


    subject: value => {

      if (!value.trim()) {

        return "Please enter a subject.";

      }

      return "";

    },


    message: value => {

      if (!value.trim()) {

        return "Please write a message.";

      }

      return "";

    }

  };


  function validateField(id) {

    const input =
      $("#" + id);

    if (!input) return false;


    const error =
      rules[id](input.value);


    input.classList.toggle(
      "is-invalid",
      Boolean(error)
    );


    input.classList.toggle(
      "is-valid",
      !error && input.value.trim() !== ""
    );


    input.setAttribute(
      "aria-invalid",
      Boolean(error)
    );


    const feedback =
      input.nextElementSibling;


    if (
      feedback &&
      feedback.classList.contains(
        "invalid-feedback"
      )
    ) {

      feedback.textContent =
        error;

    }


    return !error;

  }


  Object.keys(rules).forEach(id => {

    const input =
      $("#" + id);

    if (!input) return;


    input.addEventListener(
      "input",
      () => validateField(id)
    );

  });


  /* Character counter */

  const message =
    $("#message");

  const count =
    $("#count");


  if (message && count) {

    message.addEventListener(
      "input",
      () => {

        count.textContent =
          message.value.length;

      }
    );

  }


  /* Submit */

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const alertBox =
        $("#formAlert");


      let valid = true;


      Object.keys(rules).forEach(id => {

        if (!validateField(id)) {

          valid = false;

        }

      });


      if (!valid) {

        if (alertBox) {

          alertBox.className =
            "alert alert-danger";

          alertBox.textContent =
            "Please fix the highlighted fields and try again.";

        }


        const firstInvalid =
          $(".is-invalid", form);

        if (firstInvalid)
          firstInvalid.focus();


        return;

      }


      /* Successful demo submission */

      const name =
        $("#name").value.trim();


      if (alertBox) {

        alertBox.className =
          "alert alert-success";

        alertBox.textContent =
          `Thank you, ${name}! Your message is ready. (Demo form: no email is sent.)`;

      }


      form.reset();


      if (count)
        count.textContent = "0";


      $$(".is-valid", form)
        .forEach(input => {

          input.classList.remove(
            "is-valid"
          );

        });

    }
  );

}


/* =========================================================
   DESKTOP / MOBILE PREVIEW
   ========================================================= */

function initPreview() {

  const buttons =
    $$(".preview-btn");


  if (!buttons.length)
    return;


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const mode =
          button.dataset.preview;


        /* Remove old mode */

        document.body.classList.remove(
          "preview-desktop",
          "preview-mobile"
        );


        /* Add selected mode */

        document.body.classList.add(
          `preview-${mode}`
        );


        /* Active button */

        buttons.forEach(btn => {

          btn.classList.toggle(
            "active",
            btn === button
          );

        });


        /* Status text */

        const status =
          $("#previewStatus");


        if (status) {

          status.textContent =
            mode === "mobile"
              ? "Mobile Preview"
              : "Desktop Preview";

        }

      }
    );

  });


  /* Default */

  document.body.classList.add(
    "preview-desktop"
  );

}


/* =========================================================
   SCROLL REVEAL + SKILL BARS
   ========================================================= */

function initScrollEffects() {

  const sections =
    $$("main section");


  if (!sections.length)
    return;


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;


            entry.target.classList.add(
              "show"
            );


            /* Animate skill bars */

            $$(
              "[data-w]",
              entry.target
            ).forEach(bar => {

              bar.style.width =
                bar.dataset.w + "%";

            });

          });

        },
        {
          threshold: 0.15
        }
      );


    sections.forEach(section => {

      section.classList.add(
        "reveal"
      );

      observer.observe(
        section
      );

    });

  } else {

    sections.forEach(section => {

      section.classList.add(
        "show"
      );

    });

  }

}


/* =========================================================
   NAVBAR ACTIVE LINK
   ========================================================= */

function initNavigation() {

  const links =
    $$(".nav-link");


  if (!links.length)
    return;


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;


            links.forEach(link => {

              const active =
                link.getAttribute("href") ===
                "#" + entry.target.id;


              link.classList.toggle(
                "active",
                active
              );

            });

          });

        },
        {
          rootMargin:
            "-40% 0px -50% 0px"
        }
      );


    $$("main section")
      .forEach(section =>
        observer.observe(section)
      );

  }


  /* Close mobile navbar after clicking */

  links.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        const menu =
          $("#mainMenu");


        if (
          menu &&
          menu.classList.contains("show") &&
          window.bootstrap
        ) {

          bootstrap.Collapse
            .getOrCreateInstance(menu)
            .hide();

        }

      }
    );

  });

}


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {

  const progress =
    $("#progress");


  if (!progress)
    return;


  window.addEventListener(
    "scroll",
    () => {

      const documentHeight =
        document.documentElement.scrollHeight;

      const windowHeight =
        window.innerHeight;

      const max =
        documentHeight - windowHeight;


      if (max <= 0) {

        progress.style.width =
          "0%";

        return;

      }


      const percentage =
        (window.scrollY / max) * 100;


      progress.style.width =
        `${percentage}%`;

    },
    {
      passive: true
    }
  );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

  const button =
    $("#topBtn");


  if (!button)
    return;


  window.addEventListener(
    "scroll",
    () => {

      button.hidden =
        window.scrollY < 500;

    },
    {
      passive: true
    }
  );


  button.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior:
          reduceMotion
            ? "auto"
            : "smooth"
      });

    }
  );

}


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

function initButtonEffects() {

  if (reduceMotion)
    return;


  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".btn-primary-custom, .btn-outline-custom"
        );


      if (!button)
        return;


      const rect =
        button.getBoundingClientRect();


      const size =
        Math.max(
          rect.width,
          rect.height
        );


      const ripple =
        document.createElement(
          "span"
        );


      ripple.className =
        "ripple";


      ripple.style.width =
        `${size}px`;

      ripple.style.height =
        
