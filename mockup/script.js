// Global state
let currentQuantity = 10
let isDarkMode = false

// Screen navigation
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })

  // Remove active class from all tabs
  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected screen
  document.getElementById(screenId + "-screen").classList.add("active")

  // Add active class to selected tab
  event.target.classList.add("active")
}

// Category selection
document.addEventListener("DOMContentLoaded", () => {
  const categoryCards = document.querySelectorAll(".category-card")

  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove selected class from all cards
      categoryCards.forEach((c) => c.classList.remove("selected"))
      // Add selected class to clicked card
      this.classList.add("selected")
    })
  })

  // Option buttons
  const optionGroups = document.querySelectorAll(".option-group")

  optionGroups.forEach((group) => {
    const buttons = group.querySelectorAll(".option-btn")

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove selected class from siblings
        buttons.forEach((b) => b.classList.remove("selected"))
        // Add selected class to clicked button
        this.classList.add("selected")
      })
    })
  })

  // Answer buttons
  const answerButtons = document.querySelectorAll(".answer-btn")

  answerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove selected class from all answer buttons
      answerButtons.forEach((b) => b.classList.remove("selected"))
      // Add selected class to clicked button
      this.classList.add("selected")
    })
  })

  // Range slider
  const rangeSlider = document.querySelector(".range-slider")
  const quantityDisplay = document.querySelector(".quantity-display")

  if (rangeSlider) {
    rangeSlider.addEventListener("input", function () {
      currentQuantity = Number.parseInt(this.value)
      quantityDisplay.textContent = currentQuantity
    })
  }
})

// Quantity selector functions
function changeQuantity(delta) {
  const newQuantity = currentQuantity + delta
  if (newQuantity >= 5 && newQuantity <= 20) {
    currentQuantity = newQuantity
    document.querySelector(".quantity-display").textContent = currentQuantity
    document.querySelector(".range-slider").value = currentQuantity
  }
}

// Theme toggle
function toggleTheme() {
  isDarkMode = !isDarkMode
  const body = document.body
  const themeBtn = document.querySelector(".theme-btn")

  if (isDarkMode) {
    body.setAttribute("data-theme", "dark")
    themeBtn.textContent = "☀️"
  } else {
    body.removeAttribute("data-theme")
    themeBtn.textContent = "🌙"
  }
}

// Timer simulation for game screen
function startTimer() {
  let timeLeft = 30
  const timerElement = document.querySelector(".timer")

  const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    timerElement.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, "0")}`

    if (timeLeft <= 0) {
      clearInterval(timer)
      // Auto-advance to next question or end game
    }

    timeLeft--
  }, 1000)
}

// Progress bar animation
function updateProgress(current, total) {
  const progressFill = document.querySelector(".progress-fill")
  const percentage = (current / total) * 100
  progressFill.style.width = percentage + "%"
}

// Utility functions for Angular integration
const TriviaUtils = {
  // Function to get selected category
  getSelectedCategory() {
    const selectedCard = document.querySelector(".category-card.selected")
    return selectedCard ? selectedCard.querySelector("h3").textContent : null
  },

  // Function to get game configuration
  getGameConfig() {
    const difficulty = document.querySelector(".option-group .option-btn.selected")?.textContent
    const questionType = document
      .querySelectorAll(".option-group")[1]
      ?.querySelector(".option-btn.selected")?.textContent

    return {
      difficulty: difficulty?.toLowerCase(),
      type: questionType === "Opción Múltiple" ? "multiple" : "boolean",
      amount: currentQuantity,
    }
  },

  // Function to set question data
  setQuestionData(question, answers, currentIndex, total) {
    document.querySelector(".question-text").textContent = question
    document.querySelector(".question-counter").textContent = `Pregunta ${currentIndex} de ${total}`

    const answerButtons = document.querySelectorAll(".answer-btn")
    answers.forEach((answer, index) => {
      if (answerButtons[index]) {
        answerButtons[index].querySelector(".answer-text").textContent = answer
      }
    })

    updateProgress(currentIndex, total)
  },

  // Function to get selected answer
  getSelectedAnswer() {
    const selectedButton = document.querySelector(".answer-btn.selected")
    return selectedButton ? selectedButton.querySelector(".answer-text").textContent : null
  },

  // Function to show results
  showResults(score, total, reviewData) {
    document.querySelector(".score-number").textContent = score
    document.querySelector(".score-total").textContent = `/${total}`
    document.querySelector(".score-percentage").textContent = `${Math.round((score / total) * 100)}%`

    // Update stats
    document.querySelectorAll(".stat-number")[0].textContent = score
    document.querySelectorAll(".stat-number")[1].textContent = total - score

    // Populate review section with actual data
    // This would be implemented based on your specific data structure
  },
}

// Export for Angular integration
if (typeof module !== "undefined" && module.exports) {
  module.exports = TriviaUtils
}
