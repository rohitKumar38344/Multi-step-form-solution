const sectionRightEl = document.querySelector(".section-right");
const sectionLeftEl = document.querySelector(".section-left");
const infoSectionEl = document.querySelector(".info-section");
const optionCountEls = document.querySelectorAll(".option-count");
const planSectionEl = document.querySelector(".plan-section");
const addOnsSectionEl = document.querySelector(".add-ons-section");
const finalSubmissionSectionEl = document.querySelector(".final-submission");

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

  const monthly = document.getElementById("monthly-plan");
  const yearly = document.getElementById("yearly-plan");
  monthly.addEventListener("click", paymentMode);
  yearly.addEventListener("click", paymentMode);
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

    let spanEl;
    if (planType == "monthly") {
      spanEl = `$<span class=${planName}-price>${plan.price}/mo`;
    } else {
      spanEl = `$<span class=${planName}-price>${plan.price}/yo`;
    }

    paraEl.innerHTML = spanEl;
    const containerEl = document.createElement("div");
    containerEl.setAttribute("class", "plan-container");
    containerEl.style.height = "100%";
    labelEl.appendChild(containerEl);
    containerEl.appendChild(imgEl);
    containerEl.append(cardContent);
    cardContent.appendChild(headingEl);
    cardContent.appendChild(paraEl);

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
  const temp = selectedPlan.value;
  console.log(temp);
  selectedPlan = temp.slice(0, -1);
  planObj.planChoosed = selectedPlan;
  console.log("ads on step ", planObj);
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
    console.log("validate field ", planObject);
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
nextBtn.addEventListener("click", validateField);
