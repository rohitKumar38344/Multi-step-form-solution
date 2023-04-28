const sectionRightEl = document.querySelector(".section-right");
const sectionLeftEl = document.querySelector(".section-left");
const infoSectionEl = document.querySelector(".info-section");
const optionCountEls = document.querySelectorAll(".option-count");
const planSectionEl = document.querySelector(".plan-section");
const addOnsSectionEl = document.querySelector(".add-ons-section");
const finalSubmissionSectionEl = document.querySelector(".final-submission");
const thankyouSectionEl = document.querySelector(".thankyou-sec");
const btnContainerEl = document.querySelector(".btn-container");

const infoFormEl = document.querySelector(".personal-info-form");
const nextBtn = document.querySelector(".btn--next");
const prevBtn = document.querySelector(".btn--go-back");

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

function selectPlan(planObj) {
  optionCountEls[0].classList.remove("selected");
  optionCountEls[1].classList.add("selected");
  prevBtn.style.display = "block";
  infoSectionEl.style.display = "none";
  planSectionEl.style.display = "block";

  let mode = "monthly";
  // initial setup of plans
  createPlan(mode, monthlyPlan, planObj);

  const paymentMode = function () {
    const btnCheckd = document.querySelector(
      '.toggle-btn input[type="radio"]:checked'
    );
    planObj.planMode = btnCheckd.value;
    if (btnCheckd.value == "monthly") {
      createPlan(btnCheckd.value, monthlyPlan, planObj);
    } else {
      createPlan(btnCheckd.value, yearlyPlan, planObj);
    }
  };

  const monthlyRadioBtn = document.getElementById("monthly-plan");
  const yearlyRadioBtn = document.getElementById("yearly-plan");
  monthlyRadioBtn.addEventListener("click", paymentMode);
  yearlyRadioBtn.addEventListener("click", paymentMode);
}

function createPlan(planType, planData, planObj) {
  const plansEl = [];

  for (let i = 0; i < planData.length; i++) {
    const plan = planData[i];
    const planName = planData[i].name.toLowerCase();
    const card = document.createElement("div");
    card.classList.add("plan", `plan-${planName}`);

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", planName);
    // BUG: ADDING / to the values by default
    const radioBtnEl = `<input type="radio" name="plan" id=${planName} value=${planName}/>`;

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
      // spanEl = `$<span class="price">${plan.price}/mo`;
    } else {
      cardContent.innerHTML += `<p>$<span class="price">${plan.price}</span>/yo</p>`;
      // spanEl = `$<span class="price">${plan.price}/yo`;
    }

    paraEl.innerHTML = spanEl;
    const containerEl = document.createElement("div");
    containerEl.setAttribute("class", "plan-container");
    containerEl.style.height = "100%";
    labelEl.appendChild(containerEl);
    containerEl.appendChild(imgEl);
    containerEl.append(cardContent);

    // cardContent.appendChild(paraEl);

    if (planType == "yearly") {
      const content = document.createElement("p");
      content.textContent = "2 months free";
      cardContent.appendChild(content);
    }
    plansEl.push(card);
  }

  displayPlans(plansEl);
  nextBtn.removeEventListener("click", validateField);
  nextBtn.addEventListener("click", addOnStep.bind(null, planObj));
}

function addOnStep(planObj) {
  optionCountEls[1].classList.remove("selected");
  optionCountEls[2].classList.add("selected");
  planSectionEl.style.display = "none";
  addOnsSectionEl.style.display = "block";
  // getSelectedPlan();
  let selectedPlan = document.querySelector(
    '.plan input[type="radio"]:checked'
  );

  const labelEl = document.querySelector(`label[for=${selectedPlan.id}]`);
  const selectedPlanPrice = labelEl.querySelector(".price").textContent;
  let planModeChoose = document.querySelector(
    '.toggle-btn input[type="radio"]:checked'
  );

  const temp = selectedPlan.value;

  selectedPlan = temp.slice(0, -1);
  // plan.name = selectedPlan;
  planObj.plan = {
    plan: selectedPlan,
    mode: planModeChoose.value,
    price: selectedPlanPrice, // price needs to be added
  };
  // console.log(planObj);
  const ctn = document.querySelector(".services-container");
  ctn.innerHTML = "";
  createServices(ctn, planObj, planModeChoose.value);

  nextBtn.removeEventListener("click", addOnStep);
  nextBtn.addEventListener("click", goToSummary.bind(null, planObj));
}

function goToSummary(planObj) {
  optionCountEls[2].classList.remove("selected");
  optionCountEls[3].classList.add("selected");

  addOnsSectionEl.style.display = "none";
  finalSubmissionSectionEl.style.display = "block";
  const billingAreaEl = document.querySelector(".billing-area");
  const headingEl = billingAreaEl.querySelector(".heading-secondary");
  let totalBill = 0;

  const planSelected = planObj.plan;
  console.log("plan selected ", planSelected);
  headingEl.innerHTML = `${planSelected.plan}(${planSelected.mode})`;

  const planChoosedEl = billingAreaEl.querySelector(".plan-choosed");
  planChoosedEl.querySelector("p").innerHTML = `$<span class="plan-price">${
    planSelected.price
  }</span>/${planSelected.mode == "monthly" ? "mo" : "yo"}</p>`;
  totalBill += Number(planSelected.price);

  const parentDiv = billingAreaEl.querySelector(".add-ons-bill");
  parentDiv.innerHTML = "";
  for (let plan of planObj.services) {
    const div = document.createElement("div");
    div.classList.add("display-flex");
    const serviceName = `<p>${plan.serviceName}</p>`;
    const servicePrice = `<p class="add-ons-price">+${plan.price}$/mo</p>`;
    totalBill += Number(plan.price);
    div.innerHTML = serviceName;
    div.innerHTML += servicePrice;
    parentDiv.appendChild(div);
  }
  const amountSpanEl = billingAreaEl.querySelector(".amount");
  amountSpanEl.textContent = totalBill;

  nextBtn.removeEventListener("click", goToSummary);
  nextBtn.addEventListener("click", displayFinalMessage);
  displayFinalMessage();
}

function displayFinalMessage() {
  finalSubmissionSectionEl.style.display = "none";
  thankyouSectionEl.style.display = "block";
  btnContainerEl.style.display = "none";
}

function displayPlans(plans) {
  const parent = document.querySelector(".plans");
  parent.innerHTML = "";
  for (let i = 0; i < plans.length; i++) {
    parent.appendChild(plans[i]);
  }
}

function validateField(ev) {
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const userContact = document.getElementById("user-contact");

  const formInputContainers = infoFormEl.querySelectorAll("div");

  const isFieldEmpty =
    userName.value == "" || userEmail.value == "" || userContact.value == "";
  if (isFieldEmpty) {
    ev.preventDefault();
  }
  if (userName.value == "") {
    userName.style.borderColor = "red";
    formInputContainers[0].appendChild(createParaEl());
  }
  if (userEmail.value == "") {
    userEmail.style.borderColor = "red";
    formInputContainers[1].appendChild(createParaEl());
  }
  if (userContact.value == "") {
    userContact.style.borderColor = "red";
    formInputContainers[2].appendChild(createParaEl());
  }

  const planObject = {};
  if (!isFieldEmpty) {
    planObject.userName = userName.value;
    planObject.userEmail = userEmail.value;
    planObject.userContact = userContact.value;
    ev.preventDefault();
    // console.log("validate field ", planObject);
    selectPlan(planObject);
  }
}

function createParaEl() {
  const paraEl = document.createElement("p");
  paraEl.textContent = "This filed is required";
  paraEl.style.color = "red";
  paraEl.style.position = "absolute";
  paraEl.style.right = "5px";
  return paraEl;
}

function createServices(ctn, planObj, planMode) {
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
    if (planMode == "monthly") {
      paraEl = `<p>+$<span class="add-ons-price">${service.price}</span>/mo</p>`;
    } else {
      paraEl = `<p>+$<span class="add-ons-price">${service.price}</span>/yo</p>`;
    }
    parentDiv.innerHTML = checkboxEl;
    parentDiv.appendChild(childDiv);
    childDiv.innerHTML = labelEl;
    parentDiv.innerHTML += paraEl;
    parentDiv.addEventListener("click", getService.bind(null, planObj));
    ctn.appendChild(parentDiv);
  }
}

function getService(planObj) {
  const servicesChoosed = [];
  const serviceEls = document.querySelectorAll(".service");
  for (let i = 0; i < serviceEls.length; i++) {
    const addOn = {};
    const el = serviceEls[i];
    const isChecked = el.querySelector('input[type="checkbox"').checked;

    if (isChecked) {
      addOn.serviceName = el.querySelector(".heading-secondary").textContent;
      addOn.price = el.querySelector(".add-ons-price").textContent;
      servicesChoosed.push(addOn);
    }
  }
  planObj.services = servicesChoosed;
  console.log(servicesChoosed);
  // console.log(planObj);
}
nextBtn.addEventListener("click", validateField);
