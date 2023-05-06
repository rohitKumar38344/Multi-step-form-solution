const sectionRightEl = document.querySelector(".section-right");
const sectionLeftEl = document.querySelector(".section-left");
const infoSectionEl = document.querySelector(".info-section");
const optionCountEls = document.querySelectorAll(".option-count");
const planSectionEl = document.querySelector(".plan-section");
const addOnsSectionEl = document.querySelector(".add-ons-section");
const finalSubmissionSectionEl = document.querySelector(".final-submission");
const thankyouSectionEl = document.querySelector(".thankyou-sec");
const btnContainerEl = document.querySelector(".btn-container");

const form = document.getElementById("multi-step-form");
const prevBtns = document.querySelectorAll(".prev-btn");
const nextBtns = document.querySelectorAll(".next-btn");
const formPages = document.querySelectorAll(".form-page");
let currentPage = 0;
const plan = {};

function showPage(pageNum) {
  formPages[currentPage].style.display = "none";
  formPages[pageNum].style.display = "block";
  currentPage = pageNum;
  switch (pageNum) {
    case 0:
      optionCountEls[0].classList.add("selected");
      break;
    case 1:
      optionCountEls[0].classList.remove("selected");
      optionCountEls[1].classList.add("selected");
      break;
    case 2:
      optionCountEls[1].classList.remove("selected");
      optionCountEls[2].classList.add("selected");
      break;
    case 3:
      optionCountEls[2].classList.remove("selected");
      optionCountEls[3].classList.add("selected");
      break;

    default:
      console.log("Hello world");
      break;
  }
}

// Initialize the form by showing the first page
showPage(0);

// Event listeners for the forward and backward buttons
prevBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    optionCountEls[currentPage].classList.remove("selected");
    showPage(currentPage - 1);
  })
);
nextBtns.forEach((btn, i) =>
  btn.addEventListener("click", () => {
    if (i !== nextBtns.length - 1) {
      showPage(currentPage + 1);
    }
  })
);

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  displayFinalMessage();
});

const formStates = ["info", "plans", "add-ons", "summary", "thankyou"];
const monthlyPlan = [
  {
    name: "Arcade",
    price: 9,
    imgUrl: "icon-arcade.svg",
  },
  {
    name: "Advanced",
    price: 12,
    imgUrl: "icon-advanced.svg",
  },
  {
    name: "Pro",
    price: 15,
    imgUrl: "icon-pro.svg",
  },
];
const yearlyPlan = [
  {
    name: "Arcade",
    price: 90,
    imgUrl: "icon-arcade.svg",
  },
  {
    name: "Advanced",
    price: 120,
    imgUrl: "icon-advanced.svg",
  },
  {
    name: "Pro",
    price: 150,
    imgUrl: "icon-pro.svg",
  },
];

const servicesOffered = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    name: "Large storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];
let currentState = "info";

function selectPlan() {
  plan.name = "Arcade";
  plan.mode = "monthly";
  plan.price = "9";
  // initial setup of plans
  createPlan("monthly", monthlyPlan);

  const planMode = function () {
    const btnCheckd = document.querySelector(
      '.toggle-btn input[type="radio"]:checked'
    );
    // updates object state
    plan.mode = btnCheckd.value;

    if (btnCheckd.value == "monthly") {
      createPlan(btnCheckd.value, monthlyPlan);
    } else {
      createPlan(btnCheckd.value, yearlyPlan);
    }
  };

  const monthlyRadioBtn = document.getElementById("monthly-plan");
  const yearlyRadioBtn = document.getElementById("yearly-plan");
  monthlyRadioBtn.addEventListener("click", planMode);
  yearlyRadioBtn.addEventListener("click", planMode);
}

function createPlan(planType, planData) {
  const plansEl = [];

  for (let i = 0; i < planData.length; i++) {
    const plan = planData[i];
    const planName = planData[i].name.toLowerCase();
    const card = document.createElement("div");
    card.classList.add("plan", `plan-${planName}`);

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", planName);
    // BUG: ADDING / to the values by default
    let radioBtnEl = "";
    if (i == 0) {
      radioBtnEl = `<input type="radio" name="plan" id=${planName} value=${planName} checked/>`;
    } else {
      radioBtnEl = `<input type="radio" name="plan" id=${planName} value=${planName}/>`;
    }

    card.innerHTML = radioBtnEl;
    card.appendChild(labelEl);

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", `assets/images/${plan.imgUrl}`);
    imgEl.setAttribute("class", "plan-icons");

    const cardContent = document.createElement("div");
    const headingEl = document.createElement("h2");
    headingEl.textContent = plan.name;
    headingEl.setAttribute("class", "heading-secondary");
    const paraEl = document.createElement("p");

    cardContent.appendChild(headingEl);
    let spanEl;
    if (planType == "monthly") {
      cardContent.innerHTML += `<p>$<span class="price">${plan.price}</span>/mo</p>`;
    } else {
      cardContent.innerHTML += `<p>$<span class="price">${plan.price}</span>/yo</p>`;
    }

    paraEl.innerHTML = spanEl;
    const containerEl = document.createElement("div");
    containerEl.setAttribute("class", "plan-container");
    containerEl.style.height = "100%";
    labelEl.appendChild(containerEl);
    containerEl.appendChild(imgEl);
    containerEl.append(cardContent);

    if (planType == "yearly") {
      const content = document.createElement("p");
      content.textContent = "2 months free";
      cardContent.appendChild(content);
    }
    plansEl.push(card);
  }
  console.log("create plan function: ", plan);
  plansEl.forEach((plan) => {
    plan
      .querySelector(".plan-container")
      .addEventListener("click", function () {
        setTimeout(updateSelectedPlanStateInplan, 500);
      });

    plan
      .querySelector(".plan-container")
      .addEventListener("click", createServices);
  });
  displayPlans(plansEl);
}

function updateSelectedPlanStateInplan() {
  let selectedPlan = document.querySelector(
    '.plan input[type="radio"]:checked'
  );

  const labelEl = document.querySelector(`label[for=${selectedPlan.id}]`);
  const selectedPlanPrice = labelEl.querySelector(".price").textContent;
  let planModeChoose = document.querySelector(
    '.toggle-btn input[type="radio"]:checked'
  );

  // const temp = selectedPlan.value;

  // selectedPlan = temp.slice(0, -1);
  // plan.name = selectedPlan;
  plan.name = selectedPlan.value;
  plan.mode = planModeChoose.value;
  plan.price = selectedPlanPrice; // price needs to be added
  console.log("state updated: ", plan);
}

function createSummary() {
  getService();

  const billingAreaEl = document.querySelector(".billing-area");
  const headingEl = billingAreaEl.querySelector(".heading-secondary");
  let totalBill = 0;

  headingEl.innerHTML = `${plan.name}(${plan.mode})`;
  headingEl.style.textTransform = "capitalize";

  const planChoosedEl = billingAreaEl.querySelector(".plan-choosed");
  planChoosedEl.querySelector("p").innerHTML = `$<span class="plan-price">${
    plan.price
  }</span>/${plan.mode == "monthly" ? "mo" : "yo"}</p>`;
  totalBill += Number(plan.price);

  const parentDiv = billingAreaEl.querySelector(".add-ons-bill");
  parentDiv.innerHTML = "";
  console.log("summary ", plan.servicesChoosed);
  for (let service of plan.servicesChoosed) {
    const div = document.createElement("div");
    div.classList.add("display-flex");
    const serviceName = `<p>${service.name}</p>`;
    const servicePrice = `<p class="add-ons-price">+${service.price}$/mo</p>`;
    totalBill += Number(service.price);
    div.innerHTML = serviceName;
    div.innerHTML += servicePrice;
    parentDiv.appendChild(div);
  }
  const amountSpanEl = billingAreaEl.querySelector(".amount");
  amountSpanEl.textContent = totalBill;
}

function displayFinalMessage() {
  console.log("hey");
  form.style.display = "none";
  thankyouSectionEl.style.display = "block";
  // btnContainerEl.style.display = "none";
}

function displayPlans(plans) {
  const parent = document.querySelector(".plans");
  parent.innerHTML = "";
  for (let i = 0; i < plans.length; i++) {
    parent.appendChild(plans[i]);
  }
}

function validateField() {
  const inputs = form.querySelectorAll("input");
  const errorMessages = form.querySelectorAll(".error-message");

  inputs.forEach((input, index) => {
    input.addEventListener("blur", () => {
      if (input.value === "") {
        errorMessages[index].classList.add("show");
      }
    });

    input.addEventListener("input", () => {
      if (input.value !== "") {
        errorMessages[index].classList.remove("show");
      }
    });
  });
}

function createServices() {
  const ctn = document.querySelector(".services-container");
  ctn.innerHTML = "";
  for (let i = 0; i < servicesOffered.length; i++) {
    const service = servicesOffered[i];
    let serviceName = service.name.toLowerCase();
    serviceName = serviceName.replace(/\s+/g, "-");

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("service");
    const checkboxEl = `<input type="checkbox" name="add-ons" id=${serviceName} value=${serviceName} />`;

    const childDiv = document.createElement("div");
    childDiv.classList.add("service-description");
    const labelEl = `<label for=${serviceName}>
    <h2 class="heading-secondary">${service.name}</h2>
    <p>${service.description}</p>
  </label>`;

    let paraEl = "";
    if (plan.mode == "monthly") {
      paraEl = `<p>+$<span class="add-ons-price">${service.price}</span>/mo</p>`;
    } else {
      paraEl = `<p>+$<span class="add-ons-price">${service.price}</span>/yo</p>`;
    }
    parentDiv.innerHTML = checkboxEl;
    parentDiv.appendChild(childDiv);
    childDiv.innerHTML = labelEl;
    parentDiv.innerHTML += paraEl;
    // parentDiv.addEventListener("click", getService);
    parentDiv.addEventListener("click", createSummary);
    ctn.appendChild(parentDiv);
  }
}

function getService() {
  plan.servicesChoosed = [];
  const serviceEls = document.querySelectorAll(".service");
  for (let i = 0; i < serviceEls.length; i++) {
    const addOn = {};
    const el = serviceEls[i];
    const isChecked = el.querySelector('input[type="checkbox"').checked;
    console.log("checkbox checked in services ", isChecked);
    if (isChecked) {
      addOn.name = el.querySelector(".heading-secondary").textContent;
      addOn.price = el.querySelector(".add-ons-price").textContent;
      plan.servicesChoosed.push(addOn);
    }
  }
  console.log("inside get service ", plan.servicesChoosed);
  console.log(plan);
}

validateField();
selectPlan();
