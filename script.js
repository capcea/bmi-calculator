// Lightweight BMI calculator logic (vanilla JS)
// Handles validation, BMI calculation, category styling, and UI messaging.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bmi-form");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const resultCard = document.getElementById("result-card");
  const bmiValue = document.getElementById("bmi-value");
  const bmiCategory = document.getElementById("bmi-category");
  const errorMessage = document.getElementById("form-error");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const categoryStyles = {
    underweight: { textClass: "text-indigo-600", bgClass: "bg-indigo-50" },
    normal: { textClass: "text-emerald-600", bgClass: "bg-emerald-50" },
    overweight: { textClass: "text-amber-600", bgClass: "bg-amber-50" },
    obese: { textClass: "text-rose-600", bgClass: "bg-rose-50" },
  };

  const CATEGORY_LABELS = {
    underweight: "Underweight",
    normal: "Normal weight",
    overweight: "Overweight",
    obese: "Obese",
  };

  function resetCategoryClasses() {
    resultCard.classList.remove("bg-slate-100/70");
    Object.values(categoryStyles).forEach(({ textClass, bgClass }) => {
      bmiCategory.classList.remove(textClass);
      resultCard.classList.remove(bgClass);
    });
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  }

  function triggerFadeIn(element) {
    element.classList.remove("fade-in");
    // Force reflow so the animation restarts every time
    void element.offsetWidth;
    element.classList.add("fade-in");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (Number.isNaN(height) || Number.isNaN(weight)) {
      showError("Please enter both height and weight using numbers only.");
      return;
    }

    if (height < 100 || height > 250) {
      showError("Height must be between 100 cm and 250 cm.");
      return;
    }

    if (weight < 30 || weight > 250) {
      showError("Weight must be between 30 kg and 250 kg.");
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = Math.round(bmi * 10) / 10;

    let categoryKey = "normal";

    if (bmi < 18.5) {
      categoryKey = "underweight";
    } else if (bmi < 25) {
      categoryKey = "normal";
    } else if (bmi < 30) {
      categoryKey = "overweight";
    } else {
      categoryKey = "obese";
    }

    resetCategoryClasses();
    const { textClass, bgClass } = categoryStyles[categoryKey];
    bmiValue.textContent = bmiRounded.toFixed(1);
    bmiCategory.textContent = CATEGORY_LABELS[categoryKey];
    bmiCategory.classList.add(textClass);
    resultCard.classList.add(bgClass);
    resultCard.classList.remove("hidden");
    triggerFadeIn(resultCard);
  });

  [heightInput, weightInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (!errorMessage.classList.contains("hidden")) {
        clearError();
      }
    });
  });
});
