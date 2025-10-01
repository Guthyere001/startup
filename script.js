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
    name: "Marcus David",
    specialty: "Treinador de Futebol/Futsal",
    experience: "12 anos",
    description: "Ex-jogador profissional, especialista em técnica e tática",
  },
  {
    name: "Romulo Jardel",
    specialty: "Treinadora de Vôlei",
    experience: "6 anos",
    description: "Campeã estadual, foco em fundamentos e estratégia",
  },
  {
    name: "Roberto Lima",
    specialty: "Treinador de Basquete",
    experience: "10 anos",
    description: "Especialista em desenvolvimento de jovens talentos",
  },
  {
    name: "Nyck Jhonson",
    specialty: "Treinadora de Handebol",
    experience: "7 anos",
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

// Auth state management
let currentUser = null

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn")
  const sections = document.querySelectorAll(".section")
  const heroButtons = document.querySelectorAll("[data-section]")

  // Check for saved user session
  checkUserSession()

  // Navigation functionality
  function showSection(sectionId) {
    sections.forEach((section) => section.classList.remove("active"))
    navButtons.forEach((btn) => btn.classList.remove("active"))

    document.getElementById(sectionId).classList.add("active")
    const navButton = document.querySelector(`[data-section="${sectionId}"]`)
    if (navButton && navButton.classList.contains('nav-btn')) {
      navButton.classList.add("active")
    }
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

  // Load content
  loadProfessionals()
  loadExercises()
  setupChat()
  setupAuth()
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
    if (currentUser) {
      alert(`Olá ${currentUser.name}! Funcionalidade de contato será implementada em breve!`)
    } else {
      alert("Faça login para entrar em contato com profissionais!")
    }
  }
})

// Authentication functions
function checkUserSession() {
  const savedUser = localStorage.getItem('nutreimUser')
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUIForLoggedUser()
  }
}

function updateUIForLoggedUser() {
  const navMenu = document.querySelector('.nav-menu')
  const userSection = document.getElementById('userSection')
  const userName = document.getElementById('userName')
  
  if (currentUser) {
    navMenu.style.display = 'none'
    userSection.style.display = 'flex'
    userName.textContent = currentUser.name.split(' ')[0]
  } else {
    navMenu.style.display = 'flex'
    userSection.style.display = 'none'
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem('nutreimUser')
  updateUIForLoggedUser()
  
  // Reset to home section
  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'))
  document.getElementById('home').classList.add('active')
  
  showMessage('Logout realizado com sucesso!', 'success')
}

function setupAuth() {
  const authTabs = document.querySelectorAll('.auth-tab')
  const loginForm = document.getElementById('loginForm')
  const registerForm = document.getElementById('registerForm')
  const loginFormElement = document.getElementById('loginFormElement')
  const registerFormElement = document.getElementById('registerFormElement')
  const logoutBtn = document.getElementById('logoutBtn')

  // Tab switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabType = tab.getAttribute('data-tab')
      
      authTabs.forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      
      if (tabType === 'login') {
        loginForm.classList.remove('hidden')
        registerForm.classList.add('hidden')
      } else {
        loginForm.classList.add('hidden')
        registerForm.classList.remove('hidden')
      }
      
      clearMessages()
    })
  })

  // Login form submission
  loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault()
    handleLogin()
  })

  // Register form submission
  registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault()
    handleRegister()
  })

  // Logout functionality
  logoutBtn.addEventListener('click', logout)

  // Real-time validation
  setupRealTimeValidation()
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  const rememberMe = document.getElementById('rememberMe').checked

  clearErrors()

  // Basic validation
  if (!validateEmail(email)) {
    showFieldError('loginEmailError', 'Por favor, insira um e-mail válido')
    return
  }

  if (password.length < 6) {
    showFieldError('loginPasswordError', 'A senha deve ter pelo menos 6 caracteres')
    return
  }

  // Simulate authentication
  const users = JSON.parse(localStorage.getItem('nutreimUsers') || '[]')
  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    currentUser = user
    if (rememberMe) {
      localStorage.setItem('nutreimUser', JSON.stringify(user))
    }
    updateUIForLoggedUser()
    showMessage(`Bem-vindo de volta, ${user.name}!`, 'success')
    
    // Switch to home section
    setTimeout(() => {
      document.querySelectorAll('.section').forEach(section => section.classList.remove('active'))
      document.getElementById('home').classList.add('active')
    }, 1500)
  } else {
    showMessage('E-mail ou senha incorretos!', 'error')
  }
}

function handleRegister() {
  const name = document.getElementById('registerName').value
  const email = document.getElementById('registerEmail').value
  const password = document.getElementById('registerPassword').value
  const confirmPassword = document.getElementById('registerConfirmPassword').value
  const agreeTerms = document.getElementById('agreeTerms').checked

  clearErrors()

  // Validation
  let isValid = true

  if (name.length < 2) {
    showFieldError('registerNameError', 'Nome deve ter pelo menos 2 caracteres')
    isValid = false
  }

  if (!validateEmail(email)) {
    showFieldError('registerEmailError', 'Por favor, insira um e-mail válido')
    isValid = false
  }

  if (password.length < 6) {
    showFieldError('registerPasswordError', 'A senha deve ter pelo menos 6 caracteres')
    isValid = false
  }

  if (password !== confirmPassword) {
    showFieldError('registerConfirmPasswordError', 'As senhas não coincidem')
    isValid = false
  }

  if (!agreeTerms) {
    showMessage('Você deve concordar com os termos de uso', 'error')
    isValid = false
  }

  if (!isValid) return

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem('nutreimUsers') || '[]')
  if (users.find(u => u.email === email)) {
    showFieldError('registerEmailError', 'Este e-mail já está cadastrado')
    return
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  localStorage.setItem('nutreimUsers', JSON.stringify(users))
  
  currentUser = newUser
  localStorage.setItem('nutreimUser', JSON.stringify(newUser))
  updateUIForLoggedUser()
  
  showMessage(`Conta criada com sucesso! Bem-vindo, ${name}!`, 'success')
  
  // Switch to home section
  setTimeout(() => {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'))
    document.getElementById('home').classList.add('active')
  }, 1500)
}

function setupRealTimeValidation() {
  const inputs = document.querySelectorAll('.form-group input')
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input))
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input)
      }
    })
  })
}

function validateField(input) {
  const value = input.value
  const fieldType = input.type
  let isValid = true
  let errorMessage = ''

  switch(input.id) {
    case 'loginEmail':
    case 'registerEmail':
      isValid = validateEmail(value)
      errorMessage = 'E-mail inválido'
      break
    case 'loginPassword':
    case 'registerPassword':
      isValid = value.length >= 6
      errorMessage = 'Senha deve ter pelo menos 6 caracteres'
      break
    case 'registerName':
      isValid = value.length >= 2
      errorMessage = 'Nome deve ter pelo menos 2 caracteres'
      break
    case 'registerConfirmPassword':
      const password = document.getElementById('registerPassword').value
      isValid = value === password
      errorMessage = 'Senhas não coincidem'
      break
  }

  if (isValid) {
    input.classList.remove('error')
    input.classList.add('success')
    hideFieldError(input.id + 'Error')
  } else {
    input.classList.remove('success')
    input.classList.add('error')
    if (value.length > 0) {
      showFieldError(input.id + 'Error', errorMessage)
    }
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId)
  errorElement.textContent = message
  errorElement.classList.add('show')
}

function hideFieldError(fieldId) {
  const errorElement = document.getElementById(fieldId)
  errorElement.classList.remove('show')
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(error => {
    error.classList.remove('show')
  })
  document.querySelectorAll('.form-group input').forEach(input => {
    input.classList.remove('error', 'success')
  })
}

function showMessage(message, type) {
  // Create toast notification
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    </div>
  `
  
  document.body.appendChild(toast)
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 100)
  
  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 3000)
  
  // Also update auth message for mobile users
  const messageElement = document.getElementById('authMessage')
  messageElement.textContent = message
  messageElement.className = `auth-message ${type}`
  
  setTimeout(() => {
    messageElement.textContent = ''
    messageElement.className = 'auth-message'
  }, 3000)
}

function clearMessages() {
  const messageElement = document.getElementById('authMessage')
  messageElement.textContent = ''
  messageElement.className = 'auth-message'
  
  // Remove any existing toasts
  document.querySelectorAll('.toast').forEach(toast => {
    toast.classList.remove('show')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  })
}

// Enhanced contact functionality with user awareness
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("contact-btn")) {
    const professionalCard = e.target.closest('.professional-card')
    const professionalName = professionalCard?.querySelector('.professional-name')?.textContent
    
    if (currentUser) {
      showMessage(`Olá ${currentUser.name}! Em breve você poderá entrar em contato com ${professionalName || 'este profissional'}.`, 'success')
    } else {
      showMessage("Faça login para entrar em contato com profissionais!", 'error')
      // Automatically switch to auth section
      setTimeout(() => {
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'))
        document.getElementById('auth').classList.add('active')
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))
        document.querySelector('[data-section="auth"]').classList.add('active')
      }, 1500)
    }
  }
})

// Add loading states to forms
function addLoadingState(button) {
  button.classList.add('loading')
  button.disabled = true
}

function removeLoadingState(button) {
  button.classList.remove('loading')
  button.disabled = false
}

// Enhanced form submissions with loading states
function handleLogin() {
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  const rememberMe = document.getElementById('rememberMe').checked
  const submitBtn = document.querySelector('#loginFormElement button[type="submit"]')

  clearErrors()
  addLoadingState(submitBtn)

  // Basic validation
  if (!validateEmail(email)) {
    showFieldError('loginEmailError', 'Por favor, insira um e-mail válido')
    removeLoadingState(submitBtn)
    return
  }

  if (password.length < 6) {
    showFieldError('loginPasswordError', 'A senha deve ter pelo menos 6 caracteres')
    removeLoadingState(submitBtn)
    return
  }

  // Simulate network delay
  setTimeout(() => {
    // Simulate authentication
    const users = JSON.parse(localStorage.getItem('nutreimUsers') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    removeLoadingState(submitBtn)

    if (user) {
      currentUser = user
      if (rememberMe) {
        localStorage.setItem('nutreimUser', JSON.stringify(user))
      }
      updateUIForLoggedUser()
      showMessage(`Bem-vindo de volta, ${user.name.split(' ')[0]}! 🎉`, 'success')
      
      // Switch to home section
      setTimeout(() => {
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'))
        document.getElementById('home').classList.add('active')
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))
        document.querySelector('[data-section="home"]').classList.add('active')
      }, 1500)
    } else {
      showMessage('E-mail ou senha incorretos! 😞', 'error')
    }
  }, 1000)
}

function handleRegister() {
  const name = document.getElementById('registerName').value
  const email = document.getElementById('registerEmail').value
  const password = document.getElementById('registerPassword').value
  const confirmPassword = document.getElementById('registerConfirmPassword').value
  const agreeTerms = document.getElementById('agreeTerms').checked
  const submitBtn = document.querySelector('#registerFormElement button[type="submit"]')

  clearErrors()
  addLoadingState(submitBtn)

  // Validation
  let isValid = true

  if (name.length < 2) {
    showFieldError('registerNameError', 'Nome deve ter pelo menos 2 caracteres')
    isValid = false
  }

  if (!validateEmail(email)) {
    showFieldError('registerEmailError', 'Por favor, insira um e-mail válido')
    isValid = false
  }

  if (password.length < 6) {
    showFieldError('registerPasswordError', 'A senha deve ter pelo menos 6 caracteres')
    isValid = false
  }

  if (password !== confirmPassword) {
    showFieldError('registerConfirmPasswordError', 'As senhas não coincidem')
    isValid = false
  }

  if (!agreeTerms) {
    showMessage('Você deve concordar com os termos de uso', 'error')
    isValid = false
  }

  if (!isValid) {
    removeLoadingState(submitBtn)
    return
  }

  // Simulate network delay
  setTimeout(() => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('nutreimUsers') || '[]')
    if (users.find(u => u.email === email)) {
      showFieldError('registerEmailError', 'Este e-mail já está cadastrado')
      removeLoadingState(submitBtn)
      return
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('nutreimUsers', JSON.stringify(users))
    
    currentUser = newUser
    localStorage.setItem('nutreimUser', JSON.stringify(newUser))
    updateUIForLoggedUser()
    
    removeLoadingState(submitBtn)
    showMessage(`🎉 Conta criada com sucesso! Bem-vindo ao Nutrein, ${name.split(' ')[0]}!`, 'success')
    
    // Switch to home section
    setTimeout(() => {
      document.querySelectorAll('.section').forEach(section => section.classList.remove('active'))
      document.getElementById('home').classList.add('active')
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))
      document.querySelector('[data-section="home"]').classList.add('active')
    }, 1500)
  }, 1200)
}
