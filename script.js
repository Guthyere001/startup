// Data
const professionals = [
  {
    name: "Dr. Ana Silva",
    specialty: "Nutricionista",
    experience: "8 anos",
    rating: 4.9,
    description: "Especialista em nutrição esportiva e emagrecimento saudável",
  },
  {
    name: "Carlos Santos",
    specialty: "Treinador de Futebol/Futsal",
    experience: "12 anos",
    rating: 4.8,
    description: "Ex-jogador profissional, especialista em técnica e tática",
  },
  {
    name: "Marina Costa",
    specialty: "Treinadora de Vôlei",
    experience: "6 anos",
    rating: 4.9,
    description: "Campeã estadual, foco em fundamentos e estratégia",
  },
  {
    name: "Roberto Lima",
    specialty: "Treinador de Basquete",
    experience: "10 anos",
    rating: 4.7,
    description: "Especialista em desenvolvimento de jovens talentos",
  },
  {
    name: "Juliana Ferreira",
    specialty: "Treinadora de Handebol",
    experience: "7 anos",
    rating: 4.8,
    description: "Técnica certificada, foco em condicionamento físico",
  },
]

const exercises = {
  Bíceps: ["Rosca Direta com Barra", "Rosca Scott", "Rosca Martelo", "Rosca Concentrada", "Rosca 21"],
  Tríceps: ["Tríceps Pulley", "Tríceps Testa", "Mergulho em Paralelas", "Tríceps Coice", "Rosca Francesa"],
  Peito: ["Supino Reto", "Supino Inclinado", "Crucifixo", "Flexão de Braço", "Peck Deck"],
  Costas: ["Puxada Frontal", "Remada Curvada", "Pullover", "Remada Unilateral", "Levantamento Terra"],
  Pernas: ["Agachamento", "Leg Press", "Extensão de Pernas", "Flexão de Pernas", "Panturrilha em Pé"],
  Ombros: ["Desenvolvimento com Halteres", "Elevação Lateral", "Elevação Frontal", "Remada Alta", "Encolhimento"],
}

// AI Responses (simuladas)
const aiResponses = {
  exercicio:
    "Para exercícios eficazes, recomendo começar com 3 séries de 8-12 repetições. Sempre mantenha a forma correta e progrida gradualmente!",
  nutricao:
    "Uma alimentação balanceada deve incluir proteínas, carboidratos complexos e gorduras saudáveis. Beba bastante água e evite alimentos ultraprocessados.",
  treino:
    "Um bom treino deve incluir aquecimento, exercícios principais e alongamento. Descanse adequadamente entre os treinos para permitir a recuperação muscular.",
  peso: "Para ganhar massa muscular, combine treino de força com alimentação rica em proteínas. Para perder peso, crie um déficit calórico com exercícios e dieta balanceada.",
  default:
    "Ótima pergunta! Para te ajudar melhor, posso dar dicas sobre exercícios, nutrição, treinos ou objetivos específicos. O que você gostaria de saber?",
}

// Navigation
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn")
  const sections = document.querySelectorAll(".section")
  const heroButtons = document.querySelectorAll("[data-section]")

  // Navigation functionality
  function showSection(sectionId) {
    sections.forEach((section) => section.classList.remove("active"))
    navButtons.forEach((btn) => btn.classList.remove("active"))

    document.getElementById(sectionId).classList.add("active")
    document.querySelector(`[data-section="${sectionId}"]`).classList.add("active")
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section")
      showSection(sectionId)
    })
  })

  heroButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section")
      showSection(sectionId)
    })
  })

  // Load professionals
  loadProfessionals()

  // Load exercises
  loadExercises()

  // Setup chat
  setupChat()
})

// Load Professionals
function loadProfessionals() {
  const grid = document.getElementById("professionalsGrid")

  professionals.forEach((professional) => {
    const card = document.createElement("div")
    card.className = "professional-card"

    card.innerHTML = `
            <div class="professional-header">
                <div>
                    <div class="professional-name">${professional.name}</div>
                    <div class="specialty-badge">${professional.specialty}</div>
                </div>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${professional.rating}</span>
                </div>
            </div>
            <div class="professional-description">${professional.description}</div>
            <div class="experience">
                <i class="fas fa-trophy"></i>
                ${professional.experience} de experiência
            </div>
            <button class="btn contact-btn">Entrar em Contato</button>
        `

    grid.appendChild(card)
  })
}

// Load Exercises
function loadExercises() {
  const grid = document.getElementById("exercisesGrid")

  Object.entries(exercises).forEach(([muscle, exerciseList]) => {
    const card = document.createElement("div")
    card.className = "exercise-card"

    const exerciseItems = exerciseList.map((exercise) => `<div class="exercise-item">${exercise}</div>`).join("")

    card.innerHTML = `
            <div class="exercise-header">
                <i class="fas fa-dumbbell"></i>
                <h3>${muscle}</h3>
            </div>
            <div class="exercise-list">
                ${exerciseItems}
            </div>
        `

    grid.appendChild(card)
  })
}

// Chat Setup
function setupChat() {
  const chatInput = document.getElementById("chatInput")
  const sendBtn = document.getElementById("sendBtn")
  const chatMessages = document.getElementById("chatMessages")

  function sendMessage() {
    const message = chatInput.value.trim()
    if (!message) return

    // Add user message
    addMessage(message, "user")
    chatInput.value = ""

    // Show typing indicator
    showTypingIndicator()

    // Simulate AI response
    setTimeout(() => {
      hideTypingIndicator()
      const response = getAIResponse(message)
      addMessage(response, "ai")
    }, 1500)
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}`

    const contentDiv = document.createElement("div")
    contentDiv.className = "message-content"
    contentDiv.textContent = text

    messageDiv.appendChild(contentDiv)
    chatMessages.appendChild(messageDiv)

    // Remove welcome message if it exists
    const welcome = chatMessages.querySelector(".chat-welcome")
    if (welcome) {
      welcome.remove()
    }

    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.className = "message ai typing-message"
    typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `
    chatMessages.appendChild(typingDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function hideTypingIndicator() {
    const typingMessage = chatMessages.querySelector(".typing-message")
    if (typingMessage) {
      typingMessage.remove()
    }
  }

  function getAIResponse(message) {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("exercicio") || lowerMessage.includes("treino") || lowerMessage.includes("musculacao")) {
      return aiResponses.exercicio
    } else if (
      lowerMessage.includes("nutricao") ||
      lowerMessage.includes("dieta") ||
      lowerMessage.includes("alimentacao")
    ) {
      return aiResponses.nutricao
    } else if (lowerMessage.includes("treino") || lowerMessage.includes("rotina")) {
      return aiResponses.treino
    } else if (lowerMessage.includes("peso") || lowerMessage.includes("emagrecer") || lowerMessage.includes("massa")) {
      return aiResponses.peso
    } else {
      return aiResponses.default
    }
  }

  sendBtn.addEventListener("click", sendMessage)

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })
}

// Contact button functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("contact-btn")) {
    alert("Funcionalidade de contato será implementada em breve!")
  }
})
