// Admin Dashboard Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in as admin
    checkAdminAuth()
  
    // DOM Elements
    const adminSidebar = document.querySelector(".admin-sidebar")
    const toggleSidebarBtn = document.getElementById("toggle-sidebar")
    const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle")
    const adminNavItems = document.querySelectorAll(".admin-nav-item")
    const pageTitle = document.getElementById("page-title")
    const themeToggle = document.getElementById("theme-toggle")
    const notificationsBtn = document.getElementById("notifications-btn")
    const notificationsModal = document.getElementById("notifications-modal")
    const adminLogoutBtn = document.getElementById("admin-logout")
    const loginModal = document.getElementById("login-modal")
    const loginForm = document.getElementById("login-form")
    const confirmModal = document.getElementById("confirm-modal")
    const confirmActionBtn = document.getElementById("confirm-action-btn")
    const cancelConfirmBtn = document.getElementById("cancel-confirm-btn")
    const closeModalBtns = document.querySelectorAll(".close-modal")
  
    // User Management
    const addUserBtn = document.getElementById("add-user-btn")
    const userModal = document.getElementById("user-modal")
    const userForm = document.getElementById("user-form")
    const cancelUserBtn = document.getElementById("cancel-user-btn")
  
    // Notes Management
    const addNoteBtn = document.getElementById("add-note-btn")
    const noteModal = document.getElementById("note-modal")
    const noteForm = document.getElementById("note-form")
    const cancelNoteBtn = document.getElementById("cancel-note-btn")
  
    // Events Management
    const addEventBtn = document.getElementById("add-event-btn")
    const eventModal = document.getElementById("event-modal")
    const eventForm = document.getElementById("event-form")
    const cancelEventBtn = document.getElementById("cancel-event-btn")
  
    // Announcements Management
    const addAnnouncementBtn = document.getElementById("add-announcement-btn")
    const announcementModal = document.getElementById("announcement-modal")
    const announcementForm = document.getElementById("announcement-form")
    const cancelAnnouncementBtn = document.getElementById("cancel-announcement-btn")
  
    // Settings Forms
    const generalSettingsForm = document.getElementById("general-settings-form")
    const gamificationSettingsForm = document.getElementById("gamification-settings-form")
    const securitySettingsForm = document.getElementById("security-settings-form")
    const exportDataBtn = document.getElementById("export-data-btn")
    const importDataBtn = document.getElementById("import-data-btn")
    const resetDataBtn = document.getElementById("reset-data-btn")
  
    // Initialize data
    initializeAdminData()
  
    // Load dashboard data
    loadDashboardData()
  
    // Toggle sidebar
    if (toggleSidebarBtn) {
      toggleSidebarBtn.addEventListener("click", () => {
        adminSidebar.classList.toggle("collapsed")
      })
    }
  
    // Mobile sidebar toggle
    if (mobileSidebarToggle) {
      mobileSidebarToggle.addEventListener("click", () => {
        adminSidebar.classList.toggle("open")
      })
    }
  
    // Navigation
    if (adminNavItems) {
      adminNavItems.forEach((item) => {
        item.addEventListener("click", function () {
          const sectionName = this.getAttribute("data-section")
  
          // Update active nav item
          adminNavItems.forEach((navItem) => navItem.classList.remove("active"))
          this.classList.add("active")
  
          // Update page title
          if (pageTitle) {
            pageTitle.textContent = this.querySelector("span").textContent
          }
  
          // Show active section
          const sections = document.querySelectorAll(".admin-section")
          sections.forEach((section) => section.classList.remove("active"))
          document.getElementById(`${sectionName}-section`).classList.add("active")
  
          // Load section data
          loadSectionData(sectionName)
  
          // Close mobile sidebar
          if (window.innerWidth <= 768) {
            adminSidebar.classList.remove("open")
          }
        })
      })
    }
  
    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark")
  
        // Save theme preference
        const isDarkMode = document.body.classList.contains("dark")
        localStorage.setItem("darkMode", isDarkMode)
      })
  
      // Set initial theme
      const savedTheme = localStorage.getItem("darkMode")
      if (savedTheme === "true") {
        document.body.classList.add("dark")
      }
    }
  
    // Notifications
    if (notificationsBtn) {
      notificationsBtn.addEventListener("click", () => {
        loadNotifications()
        notificationsModal.style.display = "block"
      })
    }
  
    // Logout
    if (adminLogoutBtn) {
      adminLogoutBtn.addEventListener("click", () => {
        logoutAdmin()
      })
    }
  
    // Login form
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        loginAdmin()
      })
    }
  
    // User management
    if (addUserBtn) {
      addUserBtn.addEventListener("click", () => {
        openUserModal()
      })
    }
  
    if (userForm) {
      userForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveUser()
      })
    }
  
    if (cancelUserBtn) {
      cancelUserBtn.addEventListener("click", () => {
        userModal.style.display = "none"
      })
    }
  
    // Notes management
    if (addNoteBtn) {
      addNoteBtn.addEventListener("click", () => {
        openNoteModal()
      })
    }
  
    if (noteForm) {
      noteForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveNote()
      })
    }
  
    if (cancelNoteBtn) {
      cancelNoteBtn.addEventListener("click", () => {
        noteModal.style.display = "none"
      })
    }
  
    // Events management
    if (addEventBtn) {
      addEventBtn.addEventListener("click", () => {
        openEventModal()
      })
    }
  
    if (eventForm) {
      eventForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveEvent()
      })
    }
  
    if (cancelEventBtn) {
      cancelEventBtn.addEventListener("click", () => {
        eventModal.style.display = "none"
      })
    }
  
    // Announcements management
    if (addAnnouncementBtn) {
      addAnnouncementBtn.addEventListener("click", () => {
        openAnnouncementModal()
      })
    }
  
    if (announcementForm) {
      announcementForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveAnnouncement()
      })
    }
  
    if (cancelAnnouncementBtn) {
      cancelAnnouncementBtn.addEventListener("click", () => {
        announcementModal.style.display = "none"
      })
    }
  
    // Settings forms
    if (generalSettingsForm) {
      generalSettingsForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveGeneralSettings()
      })
    }
  
    if (gamificationSettingsForm) {
      gamificationSettingsForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveGamificationSettings()
      })
    }
  
    if (securitySettingsForm) {
      securitySettingsForm.addEventListener("submit", (e) => {
        e.preventDefault()
        saveSecuritySettings()
      })
    }
  
    // Data management
    if (exportDataBtn) {
      exportDataBtn.addEventListener("click", () => {
        exportData()
      })
    }
  
    if (importDataBtn) {
      importDataBtn.addEventListener("click", () => {
        importData()
      })
    }
  
    if (resetDataBtn) {
      resetDataBtn.addEventListener("click", () => {
        showConfirmModal(
          "Reset All Data",
          "Are you sure you want to reset all data? This action cannot be undone.",
          resetAllData,
        )
      })
    }
  
    // Close modals
    if (closeModalBtns) {
      closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const modal = this.closest(".modal")
          if (modal) {
            modal.style.display = "none"
          }
        })
      })
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        event.target.style.display = "none"
      }
    })
  
    // Confirm modal
    if (confirmActionBtn) {
      confirmActionBtn.addEventListener("click", () => {
        const action = confirmActionBtn.getAttribute("data-action")
        if (typeof window[action] === "function") {
          window[action]()
        }
        confirmModal.style.display = "none"
      })
    }
  
    if (cancelConfirmBtn) {
      cancelConfirmBtn.addEventListener("click", () => {
        confirmModal.style.display = "none"
      })
    }
  
    // Initialize charts
    initializeCharts()
  })
  
  // Check if user is logged in as admin
  function checkAdminAuth() {
    const adminUser = JSON.parse(localStorage.getItem("adminUser"))
  
    if (!adminUser || !adminUser.isLoggedIn) {
      // Show login modal
      document.getElementById("login-modal").style.display = "block"
    } else {
      // Update admin info
      document.getElementById("admin-username").textContent = adminUser.name
      document.getElementById("admin-avatar").textContent = getInitials(adminUser.name)
    }
  }
  
  // Login admin
  function loginAdmin() {
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value
  
    // In a real app, this would validate against a server
    // For demo purposes, we'll use a simple check
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser = {
        name: "Admin User",
        email: email,
        isLoggedIn: true,
      }
  
      localStorage.setItem("adminUser", JSON.stringify(adminUser))
  
      // Update admin info
      document.getElementById("admin-username").textContent = adminUser.name
      document.getElementById("admin-avatar").textContent = getInitials(adminUser.name)
  
      // Hide login modal
      document.getElementById("login-modal").style.display = "none"
    } else {
      alert("Invalid email or password")
    }
  }
  
  // Logout admin
  function logoutAdmin() {
    localStorage.removeItem("adminUser")
    window.location.reload()
  }
  
  // Initialize admin data
  function initializeAdminData() {
    // Check if admin settings exist
    if (!localStorage.getItem("adminSettings")) {
      // Create default settings
      const defaultSettings = {
        general: {
          siteTitle: "College Data Science & AI Department",
          siteDescription:
            "A platform for students and faculty to share notes, projects, and collaborate on AI and Data Science topics.",
          contactEmail: "ai-department@college.edu",
          defaultTheme: "light",
        },
        gamification: {
          enabled: true,
          points: {
            note: 10,
            project: 20,
            event: 15,
            chat: 5,
            message: 1,
            download: 2,
          },
        },
        security: {
          requireApproval: false,
          contentModeration: true,
          sessionTimeout: 60,
        },
      }
  
      localStorage.setItem("adminSettings", JSON.stringify(defaultSettings))
    }
  
    // Check if admin users exist
    if (!localStorage.getItem("users")) {
      // Create sample users
      const sampleUsers = [
        {
          id: 1,
          name: "Alice Smith",
          email: "alice@example.com",
          password: "password123",
          role: "student",
          status: "active",
          joinedDate: "2025-01-15T10:30:00",
          lastLogin: "2025-03-12T14:30:00",
        },
        {
          id: 2,
          name: "Bob Johnson",
          email: "bob@example.com",
          password: "password123",
          role: "student",
          status: "active",
          joinedDate: "2025-01-20T09:15:00",
          lastLogin: "2025-03-11T11:20:00",
        },
        {
          id: 3,
          name: "Carol Williams",
          email: "carol@example.com",
          password: "password123",
          role: "faculty",
          status: "active",
          joinedDate: "2025-01-10T13:45:00",
          lastLogin: "2025-03-13T13:10:00",
        },
        {
          id: 4,
          name: "David Miller",
          email: "david@example.com",
          password: "password123",
          role: "student",
          status: "inactive",
          joinedDate: "2025-02-05T11:30:00",
          lastLogin: "2025-03-09T10:30:00",
        },
        {
          id: 5,
          name: "Emily Jones",
          email: "emily@example.com",
          password: "password123",
          role: "faculty",
          status: "active",
          joinedDate: "2025-01-05T15:20:00",
          lastLogin: "2025-03-13T09:20:00",
        },
        {
          id: 6,
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
          status: "active",
          joinedDate: "2025-01-01T09:00:00",
          lastLogin: "2025-03-14T08:30:00",
        },
      ]
  
      localStorage.setItem("users", JSON.stringify(sampleUsers))
    }
  
    // Check if notes exist
    if (!localStorage.getItem("notes")) {
      // Create sample notes
      const sampleNotes = [
        {
          id: 1,
          title: "Introduction to Machine Learning",
          category: "machine-learning",
          description: "A comprehensive introduction to machine learning concepts and algorithms.",
          content:
            'Machine learning is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to "learn" from data, without being explicitly programmed.',
          author: "carol@example.com",
          authorName: "Carol Williams",
          status: "published",
          downloads: 45,
          createdDate: "2025-02-10T13:30:00",
          updatedDate: "2025-02-10T13:30:00",
        },
        {
          id: 2,
          title: "Deep Learning Fundamentals",
          category: "deep-learning",
          description: "An overview of deep learning concepts, neural networks, and applications.",
          content:
            "Deep learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to analyze various factors of data.",
          author: "emily@example.com",
          authorName: "Emily Jones",
          status: "published",
          downloads: 32,
          createdDate: "2025-02-15T10:15:00",
          updatedDate: "2025-02-15T10:15:00",
        },
        {
          id: 3,
          title: "Data Preprocessing Techniques",
          category: "data-science",
          description: "Essential techniques for cleaning and preparing data for analysis.",
          content:
            "Data preprocessing is a crucial step in the data mining process that involves transforming raw data into a clean and understandable format.",
          author: "alice@example.com",
          authorName: "Alice Smith",
          status: "published",
          downloads: 28,
          createdDate: "2025-02-20T14:45:00",
          updatedDate: "2025-02-20T14:45:00",
        },
        {
          id: 4,
          title: "Ethical Considerations in AI",
          category: "ai-ethics",
          description: "Exploring ethical issues and considerations in artificial intelligence development.",
          content:
            "As AI systems become more prevalent, it is important to consider the ethical implications of their development and deployment.",
          author: "carol@example.com",
          authorName: "Carol Williams",
          status: "published",
          downloads: 19,
          createdDate: "2025-02-25T11:30:00",
          updatedDate: "2025-02-25T11:30:00",
        },
        {
          id: 5,
          title: "Computer Vision Applications",
          category: "computer-vision",
          description: "Exploring applications of computer vision in various domains.",
          content:
            "Computer vision is a field of artificial intelligence that trains computers to interpret and understand the visual world.",
          author: "emily@example.com",
          authorName: "Emily Jones",
          status: "draft",
          downloads: 0,
          createdDate: "2025-03-01T09:20:00",
          updatedDate: "2025-03-01T09:20:00",
        },
      ]
  
      localStorage.setItem("notes", JSON.stringify(sampleNotes))
    }
  
    // Check if projects exist
    if (!localStorage.getItem("projects")) {
      // Create sample projects
      const sampleProjects = [
        {
          id: 1,
          title: "Neural Style Transfer",
          category: "deep-learning",
          description: "A project implementing neural style transfer using deep learning techniques.",
          author: "alice@example.com",
          authorName: "Alice Smith",
          status: "active",
          featured: true,
          createdDate: "2025-02-05T14:30:00",
          updatedDate: "2025-02-05T14:30:00",
        },
        {
          id: 2,
          title: "Sentiment Analysis Tool",
          category: "nlp",
          description: "A tool for analyzing sentiment in text using natural language processing.",
          author: "bob@example.com",
          authorName: "Bob Johnson",
          status: "active",
          featured: false,
          createdDate: "2025-02-10T11:15:00",
          updatedDate: "2025-02-10T11:15:00",
        },
        {
          id: 3,
          title: "Ethical AI Framework",
          category: "ai-ethics",
          description: "A framework for developing and evaluating ethical AI systems.",
          author: "carol@example.com",
          authorName: "Carol Williams",
          status: "completed",
          featured: true,
          createdDate: "2025-02-15T09:45:00",
          updatedDate: "2025-02-15T09:45:00",
        },
        {
          id: 4,
          title: "Object Detection System",
          category: "computer-vision",
          description: "A system for detecting and classifying objects in images and videos.",
          author: "emily@example.com",
          authorName: "Emily Jones",
          status: "active",
          featured: false,
          createdDate: "2025-02-20T13:20:00",
          updatedDate: "2025-02-20T13:20:00",
        },
        {
          id: 5,
          title: "Data Visualization Dashboard",
          category: "data-science",
          description: "A dashboard for visualizing and exploring complex datasets.",
          author: "alice@example.com",
          authorName: "Alice Smith",
          status: "archived",
          featured: false,
          createdDate: "2025-01-25T10:30:00",
          updatedDate: "2025-01-25T10:30:00",
        },
      ]
  
      localStorage.setItem("projects", JSON.stringify(sampleProjects))
    }
  
    // Check if notifications exist
    if (!localStorage.getItem("adminNotifications")) {
      // Create sample notifications
      const sampleNotifications = [
        {
          id: 1,
          title: "New User Registration",
          message: "A new user has registered and is pending approval.",
          type: "user",
          read: false,
          createdDate: "2025-03-14T09:30:00",
        },
        {
          id: 2,
          title: "New Project Submitted",
          message: "A new project has been submitted by Alice Smith.",
          type: "project",
          read: false,
          createdDate: "2025-03-13T14:15:00",
        },
        {
          id: 3,
          title: "System Update",
          message: "The system will be updated on March 20, 2025 at 02:00 AM.",
          type: "system",
          read: true,
          createdDate: "2025-03-12T11:45:00",
        },
      ]
  
      localStorage.setItem("adminNotifications", JSON.stringify(sampleNotifications))
    }
  }
  
  // Load dashboard data
  function loadDashboardData() {
    // Load stats
    loadDashboardStats()
  
    // Load recent users
    loadRecentUsers()
  
    // Load recent activity
    loadRecentActivity()
  }
  
  // Load dashboard stats
  function loadDashboardStats() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    const projects = JSON.parse(localStorage.getItem("projects")) || []
    const events = JSON.parse(localStorage.getItem("events")) || []
  
    // Update stats
    document.getElementById("total-users").textContent = users.length
    document.getElementById("total-notes").textContent = notes.length
    document.getElementById("total-projects").textContent = projects.length
  
    // Count upcoming events
    const today = new Date()
    const upcomingEvents = events.filter((event) => new Date(event.date) >= today)
    document.getElementById("total-events").textContent = upcomingEvents.length
  }
  
  // Load recent users
  function loadRecentUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const recentUsersTable = document.getElementById("recent-users-table")
  
    if (!recentUsersTable) return
  
    // Sort users by join date (newest first)
    users.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate))
  
    // Get 5 most recent users
    const recentUsers = users.slice(0, 5)
  
    // Clear table
    recentUsersTable.innerHTML = ""
  
    // Add users to table
    recentUsers.forEach((user) => {
      const row = document.createElement("tr")
  
      // Format date
      const joinedDate = new Date(user.joinedDate)
      const formattedDate = joinedDate.toLocaleDateString()
  
      row.innerHTML = `
              <td>
                  <div class="user-cell">
                      <div class="user-avatar">${getInitials(user.name)}</div>
                      <div class="user-info">
                          <h4>${user.name}</h4>
                          <p>${user.role}</p>
                      </div>
                  </div>
              </td>
              <td>${user.email}</td>
              <td>${user.role === "admin" ? "Admin" : user.role === "faculty" ? "Faculty" : "Student"}</td>
              <td>${getPointsForUser(user.email)}</td>
              <td>${formattedDate}</td>
          `
  
      recentUsersTable.appendChild(row)
    })
  }
  
  // Load recent activity
  function loadRecentActivity() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || []
    const recentActivityTable = document.getElementById("recent-activity-table")
  
    if (!recentActivityTable) return
  
    // Get all activities from all users
    const allActivities = []
  
    leaderboard.forEach((user) => {
      if (user.activities && user.activities.length > 0) {
        user.activities.forEach((activity) => {
          allActivities.push({
            user: user.name,
            email: user.email,
            ...activity,
          })
        })
      }
    })
  
    // Sort activities by date (newest first)
    allActivities.sort((a, b) => new Date(b.date) - new Date(a.date))
  
    // Get 5 most recent activities
    const recentActivities = allActivities.slice(0, 5)
  
    // Clear table
    recentActivityTable.innerHTML = ""
  
    // Add activities to table
    recentActivities.forEach((activity) => {
      const row = document.createElement("tr")
  
      // Format date
      const activityDate = new Date(activity.date)
      const formattedDate = activityDate.toLocaleString()
  
      row.innerHTML = `
              <td>
                  <div class="user-cell">
                      <div class="user-avatar">${getInitials(activity.user)}</div>
                      <div class="user-info">
                          <h4>${activity.user}</h4>
                      </div>
                  </div>
              </td>
              <td>${activity.reason}</td>
              <td>+${activity.points}</td>
              <td>${formattedDate}</td>
          `
  
      recentActivityTable.appendChild(row)
    })
  }
  
  // Load section data
  function loadSectionData(section) {
    switch (section) {
      case "users":
        loadUsers()
        break
      case "notes":
        loadNotes()
        break
      case "projects":
        loadProjects()
        break
      case "events":
        loadEvents()
        break
      case "announcements":
        loadAnnouncements()
        break
      case "chats":
        loadChats()
        break
      case "leaderboard":
        loadLeaderboard()
        break
      case "settings":
        loadSettings()
        break
    }
  }
  
  // Load users
  function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const usersTable = document.getElementById("users-table")
  
    if (!usersTable) return
  
    // Get filters
    const roleFilter = document.getElementById("user-role-filter").value
    const statusFilter = document.getElementById("user-status-filter").value
    const levelFilter = document.getElementById("user-level-filter").value
    const searchTerm = document.getElementById("users-search").value.toLowerCase()
  
    // Filter users
    const filteredUsers = users.filter((user) => {
      // Role filter
      const matchesRole = roleFilter === "all" || user.role === roleFilter
  
      // Status filter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
  
      // Level filter
      const userLevel = getLevelForUser(user.email)
      const matchesLevel = levelFilter === "all" || userLevel.toString() === levelFilter
  
      // Search filter
      const matchesSearch =
        searchTerm === "" || user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
  
      return matchesRole && matchesStatus && matchesLevel && matchesSearch
    })
  
    // Sort users by name
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name))
  
    // Clear table
    usersTable.innerHTML = ""
  
    // Add users to table
    filteredUsers.forEach((user) => {
      const row = document.createElement("tr")
  
      // Format date
      const joinedDate = new Date(user.joinedDate)
      const formattedDate = joinedDate.toLocaleDateString()
  
      // Get user level and points
      const userLevel = getLevelForUser(user.email)
      const userPoints = getPointsForUser(user.email)
  
      row.innerHTML = `
              <td>
                  <input type="checkbox" class="user-checkbox" data-id="${user.id}">
              </td>
              <td>
                  <div class="user-cell">
                      <div class="user-avatar">${getInitials(user.name)}</div>
                      <div class="user-info">
                          <h4>${user.name}</h4>
                          <p>${user.role}</p>
                      </div>
                  </div>
              </td>
              <td>${user.email}</td>
              <td>${user.role === "admin" ? "Admin" : user.role === "faculty" ? "Faculty" : "Student"}</td>
              <td>
                  <span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
              </td>
              <td>Level ${userLevel}</td>
              <td>${userPoints}</td>
              <td>${formattedDate}</td>
              <td>
                  <div class="table-actions">
                      <button class="action-btn edit-btn" data-id="${user.id}" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                      </button>
                      <button class="action-btn delete-btn" data-id="${user.id}" title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                      </button>
                  </div>
              </td>
          `
  
      usersTable.appendChild(row)
  
      // Add event listeners
      const editBtn = row.querySelector(".edit-btn")
      const deleteBtn = row.querySelector(".delete-btn")
  
      editBtn.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        editUser(userId)
      })
  
      deleteBtn.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        deleteUser(userId)
      })
    })
  }
  
  // Load notes
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    const notesTable = document.getElementById("notes-table")
  
    if (!notesTable) return
  
    // Get filters
    const categoryFilter = document.getElementById("note-category-filter").value
    const statusFilter = document.getElementById("note-status-filter").value
    const searchTerm = document.getElementById("notes-search").value.toLowerCase()
  
    // Filter notes
    const filteredNotes = notes.filter((note) => {
      // Category filter
      const matchesCategory = categoryFilter === "all" || note.category === categoryFilter
  
      // Status filter
      const matchesStatus = statusFilter === "all" || note.status === statusFilter
  
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        note.title.toLowerCase().includes(searchTerm) ||
        note.description.toLowerCase().includes(searchTerm) ||
        note.authorName.toLowerCase().includes(searchTerm)
  
      return matchesCategory && matchesStatus && matchesSearch
    })
  
    // Sort notes by created date (newest first)
    filteredNotes.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
  
    // Clear table
    notesTable.innerHTML = ""
  
    // Add notes to table
    filteredNotes.forEach((note) => {
      const row = document.createElement("tr")
  
      // Format date
      const createdDate = new Date(note.createdDate)
      const formattedDate = createdDate.toLocaleDateString()
  
      row.innerHTML = `
              <td>
                  <input type="checkbox" class="note-checkbox" data-id="${note.id}">
              </td>
              <td>
                  <div class="note-title">${note.title}</div>
                  <div class="note-description">${note.description.substring(0, 50)}${note.description.length > 50 ? "..." : ""}</div>
              </td>
              <td>
                  <span class="category-badge ${note.category}">${formatCategory(note.category)}</span>
              </td>
              <td>${note.authorName}</td>
              <td>
                  <span class="status-badge ${note.status}">${note.status.charAt(0).toUpperCase() + note.status.slice(1)}</span>
              </td>
              <td>${note.downloads}</td>
              <td>${formattedDate}</td>
              <td>
                  <div class="table-actions">
                      <button class="action-btn edit-btn" data-id="${note.id}" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                      </button>
                      <button class="action-btn delete-btn" data-id="${note.id}" title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                      </button>
                  </div>
              </td>
          `
  
      notesTable.appendChild(row)
  
      // Add event listeners
      const editBtn = row.querySelector(".edit-btn")
      const deleteBtn = row.querySelector(".delete-btn")
  
      editBtn.addEventListener("click", function () {
        const noteId = this.getAttribute("data-id")
        editNote(noteId)
      })
  
      deleteBtn.addEventListener("click", function () {
        const noteId = this.getAttribute("data-id")
        deleteNote(noteId)
      })
    })
  }
  
  // Load projects
  function loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects")) || []
    const projectsTable = document.getElementById("projects-table")
  
    if (!projectsTable) return
  
    // Get filters
    const categoryFilter = document.getElementById("project-category-filter").value
    const statusFilter = document.getElementById("project-status-filter").value
    const searchTerm = document.getElementById("projects-search").value.toLowerCase()
  
    // Filter projects
    const filteredProjects = projects.filter((project) => {
      // Category filter
      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
  
      // Status filter
      const matchesStatus = statusFilter === "all" || project.status === statusFilter
  
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.authorName.toLowerCase().includes(searchTerm)
  
      return matchesCategory && matchesStatus && matchesSearch
    })
  
    // Sort projects by created date (newest first)
    filteredProjects.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
  
    // Clear table
    projectsTable.innerHTML = ""
  
    // Add projects to table
    filteredProjects.forEach((project) => {
      const row = document.createElement("tr")
  
      // Format date
      const createdDate = new Date(project.createdDate)
      const formattedDate = createdDate.toLocaleDateString()
  
      row.innerHTML = `
              <td>
                  <input type="checkbox" class="project-checkbox" data-id="${project.id}">
              </td>
              <td>
                  <div class="project-title">${project.title}</div>
                  <div class="project-description">${project.description.substring(0, 50)}${project.description.length > 50 ? "..." : ""}</div>
              </td>
              <td>
                  <span class="category-badge ${project.category}">${formatCategory(project.category)}</span>
              </td>
              <td>${project.authorName}</td>
              <td>
                  <span class="status-badge ${project.status}">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
              </td>
              <td>
                  <div class="toggle-switch small">
                      <input type="checkbox" id="featured-${project.id}" ${project.featured ? "checked" : ""}>
                      <label for="featured-${project.id}" data-id="${project.id}" class="toggle-featured"></label>
                  </div>
              </td>
              <td>${formattedDate}</td>
              <td>
                  <div class="table-actions">
                      <button class="action-btn edit-btn" data-id="${project.id}" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                      </button>
                      <button class="action-btn delete-btn" data-id="${project.id}" title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                      </button>
                  </div>
              </td>
          `
  
      projectsTable.appendChild(row)
  
      // Add event listeners
      const editBtn = row.querySelector(".edit-btn")
      const deleteBtn = row.querySelector(".delete-btn")
      const toggleFeatured = row.querySelector(".toggle-featured")
  
      editBtn.addEventListener("click", function () {
        const projectId = this.getAttribute("data-id")
        editProject(projectId)
      })
  
      deleteBtn.addEventListener("click", function () {
        const projectId = this.getAttribute("data-id")
        deleteProject(projectId)
      })
  
      toggleFeatured.addEventListener("click", function () {
        const projectId = this.getAttribute("data-id")
        toggleProjectFeatured(projectId)
      })
    })
  }
  
  // Load events
  function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || []
    const eventsTable = document.getElementById("events-table")
  
    if (!eventsTable) return
  
    // Get filters
    const typeFilter = document.getElementById("event-type-filter").value
    const timeFilter = document.getElementById("event-time-filter").value
    const searchTerm = document.getElementById("events-search").value.toLowerCase()
  
    // Filter events
    const filteredEvents = events.filter((event) => {
      // Type filter
      const matchesType = typeFilter === "all" || event.type === typeFilter
  
      // Time filter
      const eventDate = new Date(event.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
  
      const isUpcoming = eventDate >= today
      const isPast = eventDate < today
  
      const matchesTime =
        timeFilter === "all" || (timeFilter === "upcoming" && isUpcoming) || (timeFilter === "past" && isPast)
  
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.organizer.toLowerCase().includes(searchTerm)
  
      return matchesType && matchesTime && matchesSearch
    })
  
    // Sort events by date
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
  
    // Clear table
    eventsTable.innerHTML = ""
  
    // Add events to table
    filteredEvents.forEach((event) => {
      const row = document.createElement("tr")
  
      // Format date
      const eventDate = new Date(event.date)
      const formattedDate = eventDate.toLocaleDateString()
  
      row.innerHTML = `
              <td>
                  <input type="checkbox" class="event-checkbox" data-id="${event.id}">
              </td>
              <td>
                  <div class="event-title">${event.title}</div>
                  <div class="event-description">${event.description.substring(0, 50)}${event.description.length > 50 ? "..." : ""}</div>
              </td>
              <td>
                  <span class="event-type-badge ${event.type}">${formatEventType(event.type)}</span>
              </td>
              <td>
                  <div>${formattedDate}</div>
                  <div>${formatTime(event.time)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ""}</div>
              </td>
              <td>${event.location}</td>
              <td>${event.organizer}</td>
              <td>
                  <div class="toggle-switch small">
                      <input type="checkbox" id="featured-${event.id}" ${event.featured ? "checked" : ""}>
                      <label for="featured-${event.id}" data-id="${event.id}" class="toggle-featured"></label>
                  </div>
              </td>
              <td>
                  <div class="table-actions">
                      <button class="action-btn edit-btn" data-id="${event.id}" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                      </button>
                      <button class="action-btn delete-btn" data-id="${event.id}" title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                      </button>
                  </div>
              </td>
          `
  
      eventsTable.appendChild(row)
  
      // Add event listeners
      const editBtn = row.querySelector(".edit-btn")
      const deleteBtn = row.querySelector(".delete-btn")
      const toggleFeatured = row.querySelector(".toggle-featured")
  
      editBtn.addEventListener("click", function () {
        const eventId = this.getAttribute("data-id")
        editEvent(eventId)
      })
  
      deleteBtn.addEventListener("click", function () {
        const eventId = this.getAttribute("data-id")
        deleteEvent(eventId)
      })
  
      toggleFeatured.addEventListener("click", function () {
        const eventId = this.getAttribute("data-id")
        toggleEventFeatured(eventId)
      })
    })
  }
  
  // Load announcements
  function loadAnnouncements() {
  
  
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    const announcementsTable = document.getElementById("announcements-table");
  
    if (!announcementsTable) return;
  
    // Get filters
    const tagFilter = document.getElementById("announcement-tag-filter").value;
    const searchTerm = document.getElementById("announcements-search").value.toLowerCase();
  
    // Filter announcements
    const filteredAnnouncements = announcements.filter((announcement) => {
      // Tag filter
      const matchesTag = tagFilter === "all" || announcement.tag === tagFilter;
  
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        announcement.title.toLowerCase().includes(searchTerm) ||
        announcement.content.toLowerCase().includes(searchTerm) ||
        announcement.authorName.toLowerCase().includes(searchTerm);
  
      return matchesTag && matchesSearch;
    });
  
    // Sort announcements by date (newest first)
    filteredAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    // Clear table
    announcementsTable.innerHTML = "";
  
    // Add announcements to table
    filteredAnnouncements.forEach((announcement) => {
      const row = document.createElement("tr");
  
      // Format date
      const announcementDate = new Date(announcement.date);
      const formattedDate = announcementDate.toLocaleDateString();
      row.innerHTML = `
        <td>
          <input type="checkbox" class="announcement-checkbox" data-id="${announcement.id}">
        </td>
        <td>
          <div class="announcement-title">${announcement.title}</div>
          <div class="announcement-content">${announcement.content.substring(0, 50)}${announcement.content.length > 50 ? "..." : ""}</div>
        </td>
        <td>
          <span class="announcement-tag-badge ${announcement.tag}">${announcement.tag}</span>
        </td>
        <td>${announcement.authorName}</td>
        <td>${formattedDate}</td>
        <td>
          <div class="table-actions">
            <button class="action-btn edit-btn" data-id="${announcement.id}" title="Edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="action-btn delete-btn" data-id="${announcement.id}" title="Delete">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </td>
      `;
  
      announcementsTable.appendChild(row);
  
      // Add event listeners
      const editBtn = row.querySelector(".edit-btn");
      const deleteBtn = row.querySelector(".delete-btn");
  
      editBtn.addEventListener("click", function () {
        const announcementId = this.getAttribute("data-id");
        editAnnouncement(announcementId);
      });
  
      deleteBtn.addEventListener("click", function () {
        const announcementId = this.getAttribute("data-id");
        deleteAnnouncement(announcementId);
      });
    });
  }
  
  // Load chats
  function loadChats() {
    // Implement chat loading logic here
  }
  
  // Load leaderboard
  function loadLeaderboard() {
    // Implement leaderboard loading logic here
  }
  
  // Load settings
  function loadSettings() {
    const settings = JSON.parse(localStorage.getItem("adminSettings"));
  
    if (settings) {
      // Populate general settings
      document.getElementById("site-title").value = settings.general.siteTitle;
      document.getElementById("site-description").value = settings.general.siteDescription;
      document.getElementById("contact-email").value = settings.general.contactEmail;
      document.getElementById("default-theme").value = settings.general.defaultTheme;
  
      // Populate gamification settings
      document.getElementById("enable-gamification").checked = settings.gamification.enabled;
      document.getElementById("note-points").value = settings.gamification.points.note;
      document.getElementById("project-points").value = settings.gamification.points.project;
      document.getElementById("event-points").value = settings.gamification.points.event;
      document.getElementById("chat-points").value = settings.gamification.points.chat;
      document.getElementById("message-points").value = settings.gamification.points.message;
      document.getElementById("download-points").value = settings.gamification.points.download;
  
      // Populate security settings
      document.getElementById("require-approval").checked = settings.security.requireApproval;
      document.getElementById("content-moderation").checked = settings.security.contentModeration;
      document.getElementById("session-timeout").value = settings.security.sessionTimeout;
    }
  }
  
  // Open user modal
  function openUserModal(user = null) {
    const modalTitle = document.getElementById("user-modal-title");
    const userForm = document.getElementById("user-form");
  
    if (user) {
      modalTitle.textContent = "Edit User";
      userForm["user-id"].value = user.id;
      userForm["user-name"].value = user.name;
      userForm["user-email"].value = user.email;
      userForm["user-role"].value = user.role;
      userForm["user-status"].value = user.status;
    } else {
      modalTitle.textContent = "Add User";
      userForm.reset();
    }
  
    userModal.style.display = "block";
  }
  
  // Save user
  function saveUser() {
    const userForm = document.getElementById("user-form");
    const formData = new FormData(userForm);
    const userData = Object.fromEntries(formData.entries());
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (userData["user-id"]) {
      // Edit user
      const index = users.findIndex((user) => user.id === parseInt(userData["user-id"]));
      if (index !== -1) {
        users[index] = {
          id: parseInt(userData["user-id"]),
          name: userData["user-name"],
          email: userData["user-email"],
          role: userData["user-role"],
          status: userData["user-status"],
        };
      }
    } else {
      // Add new user
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: userData["user-name"],
        email: userData["user-email"],
        role: userData["user-role"],
        status: userData["user-status"],
        joinedDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      users.push(newUser);
    }
  
    localStorage.setItem("users", JSON.stringify(users));
    userModal.style.display = "none";
    loadUsers();
  }
  
  // Edit user
  function editUser(userId) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.id === userId);
  
    if (user) {
      openUserModal(user);
    }
  }
  
  // Delete user
  function deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((user) => user.id === userId);
  
    if (index !== -1) {
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      loadUsers();
    }
  }
  
  // Open note modal
  function openNoteModal(note = null) {
    const modalTitle = document.getElementById("note-modal-title");
    const noteForm = document.getElementById("note-form");
  
    if (note) {
      modalTitle.textContent = "Edit Note";
      noteForm["note-id"].value = note.id;
      noteForm["note-title"].value = note.title;
      noteForm["note-category"].value = note.category;
      noteForm["note-description"].value = note.description;
      noteForm["note-content"].value = note.content;
      noteForm["note-status"].value = note.status;
    } else {
      modalTitle.textContent = "Add Note";
      noteForm.reset();
    }
  
    noteModal.style.display = "block";
  }
  
  // Save note
  function saveNote() {
    const noteForm = document.getElementById("note-form");
    const formData = new FormData(noteForm);
    const noteData = Object.fromEntries(formData.entries());
  
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
  
    if (noteData["note-id"]) {
      // Edit note
      const index = notes.findIndex((note) => note.id === parseInt(noteData["note-id"]));
      if (index !== -1) {
        notes[index] = {
          id: parseInt(noteData["note-id"]),
          title: noteData["note-title"],
          category: noteData["note-category"],
          description: noteData["note-description"],
          content: noteData["note-content"],
          status: noteData["note-status"],
          author: noteData["note-author"],
          authorName: noteData["note-author-name"],
          downloads: noteData["note-downloads"],
          createdDate: noteData["note-created-date"],
          updatedDate: new Date().toISOString(),
        };
      }
    } else {
      // Add new note
      const newNote = {
        id: notes.length ? notes[notes.length - 1].id + 1 : 1,
        title: noteData["note-title"],
        category: noteData["note-category"],
        description: noteData["note-description"],
        content: noteData["note-content"],
        status: noteData["note-status"],
        author: noteData["note-author"],
        authorName: noteData["note-author-name"],
        downloads: 0,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };
      notes.push(newNote);
    }
  
    localStorage.setItem("notes", JSON.stringify(notes));
    noteModal.style.display = "none";
    loadNotes();
  }
  
  // Edit note
  function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find((note) => note.id === noteId);
  
    if (note) {
      openNoteModal(note);
    }
  }
  
  // Delete note
  function deleteNote(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const index = notes.findIndex((note) => note.id === noteId);
  
    if (index !== -1) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
    }
  }
  
  // Open event modal
  function openEventModal(event = null) {
    const modalTitle = document.getElementById("event-modal-title");
    const eventForm = document.getElementById("event-form");
  
    if (event) {
      modalTitle.textContent = "Edit Event";
      eventForm["event-id"].value = event.id;
      eventForm["event-title"].value = event.title;
      eventForm["event-type"].value = event.type;
      eventForm["event-description"].value = event.description;
      eventForm["event-date"].value = event.date;
      eventForm["event-time"].value = event.time;
      eventForm["event-end-time"].value = event.endTime;
      eventForm["event-location"].value = event.location;
      eventForm["event-organizer"].value = event.organizer;
      eventForm["event-featured"].checked = event.featured;
    } else {
      modalTitle.textContent = "Add Event";
      eventForm.reset();
    }
  
    eventModal.style.display = "block";
  }
  
  // Save event
  function saveEvent() {
    const eventForm = document.getElementById("event-form");
    const formData = new FormData(eventForm);
    const eventData = Object.fromEntries(formData.entries());
  
    const events = JSON.parse(localStorage.getItem("events")) || [];
  
    if (eventData["event-id"]) {
      // Edit event
      const index = events.findIndex((event) => event.id === parseInt(eventData["event-id"]));
      if (index !== -1) {
        events[index] = {
          id: parseInt(eventData["event-id"]),
          title: eventData["event-title"],
          type: eventData["event-type"],
          description: eventData["event-description"],
          date: eventData["event-date"],
          time: eventData["event-time"],
          endTime: eventData["event-end-time"],
          location: eventData["event-location"],
          organizer: eventData["event-organizer"],
          featured: eventData["event-featured"] === "on",
        };
      }
    } else {
      // Add new event
      const newEvent = {
        id: events.length ? events[events.length - 1].id + 1 : 1,
        title: eventData["event-title"],
        type: eventData["event-type"],
        description: eventData["event-description"],
        date: eventData["event-date"],
        time: eventData["event-time"],
        endTime: eventData["event-end-time"],
        location: eventData["event-location"],
        organizer: eventData["event-organizer"],
        featured: eventData["event-featured"] === "on",
      };
      events.push(newEvent);
    }
  
    localStorage.setItem("events", JSON.stringify(events));
    eventModal.style.display = "none";
    loadEvents();
  }
  
  // Edit event
  function editEvent(eventId) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const event = events.find((event) => event.id === eventId);
  
    if (event) {
      openEventModal(event);
    }
  }
  
  // Delete event
  function deleteEvent(eventId) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const index = events.findIndex((event) => event.id === eventId);
  
    if (index !== -1) {
      events.splice(index, 1);
      localStorage.setItem("events", JSON.stringify(events));
      loadEvents();
    }
  }
  
  // Open announcement modal
  function openAnnouncementModal(announcement = null) {
    const modalTitle = document.getElementById("announcement-modal-title");
    const announcementForm = document.getElementById("announcement-form");
  
    if (announcement) {
      modalTitle.textContent = "Edit Announcement";
      announcementForm["announcement-id"].value = announcement.id;
      announcementForm["announcement-title"].value = announcement.title;
      announcementForm["announcement-content"].value = announcement.content;
      announcementForm["announcement-tag"].value = announcement.tag;
    } else {
      modalTitle.textContent = "Add Announcement";
      announcementForm.reset();
    }
  
    announcementModal.style.display = "block";
  }
  
  // Save announcement
  function saveAnnouncement() {
    const announcementForm = document.getElementById("announcement-form");
    const formData = new FormData(announcementForm);
    const announcementData = Object.fromEntries(formData.entries());
  
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  
    if (announcementData["announcement-id"]) {
      // Edit announcement
      const index = announcements.findIndex((announcement) => announcement.id === parseInt(announcementData["announcement-id"]));
      if (index !== -1) {
        announcements[index] = {
          id: parseInt(announcementData["announcement-id"]),
          title: announcementData["announcement-title"],
          content: announcementData["announcement-content"],
          tag: announcementData["announcement-tag"],
          author: announcementData["announcement-author"],
          authorName: announcementData["announcement-author-name"],
          date: new Date().toISOString(),
        };
      }
    } else {
      // Add new announcement
      const newAnnouncement = {
        id: announcements.length ? announcements[announcements.length - 1].id + 1 : 1,
        title: announcementData["announcement-title"],
        content: announcementData["announcement-content"],
        tag: announcementData["announcement-tag"],
        author: announcementData["announcement-author"],
        authorName: announcementData["announcement-author-name"],
        date: new Date().toISOString(),
      };
      announcements.push(newAnnouncement);
    }
  
    localStorage.setItem("announcements", JSON.stringify(announcements));
    announcementModal.style.display = "none";
    loadAnnouncements();
  }
  
  // Edit announcement
  function editAnnouncement(announcementId) {
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    const announcement = announcements.find((announcement) => announcement.id === announcementId);
  
    if (announcement) {
      openAnnouncementModal(announcement);
    }
  }
  
  // Delete announcement
  function deleteAnnouncement(announcementId) {
    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    const index = announcements.findIndex((announcement) => announcement.id === announcementId);
  
    if (index !== -1) {
      announcements.splice(index, 1);
      localStorage.setItem("announcements", JSON.stringify(announcements));
      loadAnnouncements();
    }
  }
  
  // Save general settings
  function saveGeneralSettings() {
    const settingsForm = document.getElementById("general-settings-form");
    const formData = new FormData(settingsForm);
    const settingsData = Object.fromEntries(formData.entries());
  
    const settings = JSON.parse(localStorage.getItem("adminSettings"));
    settings.general = {
      siteTitle: settingsData["site-title"],
      siteDescription: settingsData["site-description"],
      contactEmail: settingsData["contact-email"],
      defaultTheme: settingsData["default-theme"],
    };
  
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }
  
  // Save gamification settings
  function saveGamificationSettings() {
    const settingsForm = document.getElementById("gamification-settings-form");
    const formData = new FormData(settingsForm);
    const settingsData = Object.fromEntries(formData.entries());
  
    const settings = JSON.parse(localStorage.getItem("adminSettings"));
    settings.gamification = {
      enabled: settingsData["enable-gamification"] === "on",
      points: {
        note: parseInt(settingsData["note-points"]),
        project: parseInt(settingsData["project-points"]),
        event: parseInt(settingsData["event-points"]),
        chat: parseInt(settingsData["chat-points"]),
        message: parseInt(settingsData["message-points"]),
        download: parseInt(settingsData["download-points"]),
      },
    };
  
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }
  
  // Save security settings
  function saveSecuritySettings() {
    const settingsForm = document.getElementById("security-settings-form");
    const formData = new FormData(settingsForm);
    const settingsData = Object.fromEntries(formData.entries());
  
    const settings = JSON.parse(localStorage.getItem("adminSettings"));
    settings.security = {
      requireApproval: settingsData["require-approval"] === "on",
      contentModeration: settingsData["content-moderation"] === "on",
      sessionTimeout: parseInt(settingsData["session-timeout"]),
    };
  
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }
  
  // Export data
  function exportData() {
    const data = {
      users: JSON.parse(localStorage.getItem("users")),
      notes: JSON.parse(localStorage.getItem("notes")),
      projects: JSON.parse(localStorage.getItem("projects")),
      events: JSON.parse(localStorage.getItem("events")),
      announcements: JSON.parse(localStorage.getItem("announcements")),
      settings: JSON.parse(localStorage.getItem("adminSettings")),
    };
  
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "admin_data_export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  // Import data
  function importData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
  
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
  
        localStorage.setItem("users", JSON.stringify(data.users));
        localStorage.setItem("notes", JSON.stringify(data.notes));
        localStorage.setItem("projects", JSON.stringify(data.projects));
        localStorage.setItem("events", JSON.stringify(data.events));
        localStorage.setItem("announcements", JSON.stringify(data.announcements));
        localStorage.setItem("adminSettings", JSON.stringify(data.settings));
  
        window.location.reload();
      };
  
      reader.readAsText(file);
    });
  
    input.click();
  }
  
  // Reset all data
  function resetAllData() {
    localStorage.clear();
    window.location.reload();
  }
  
  // Load notifications
  function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem("adminNotifications")) || [];
    const notificationsList = document.getElementById("notifications-list");
  
    if (!notificationsList) return;
  
    // Clear list
    notificationsList.innerHTML = "";
  
    // Add notifications to list
    notifications.forEach((notification) => {
      const notificationItem = document.createElement("div");
      notificationItem.classList.add("notification-item");
  
      // Format date
      const notificationDate = new Date(notification.createdDate);
      const formattedDate = notificationDate.toLocaleString();
  
      notificationItem.innerHTML = `
        <div class="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12" y2="16"></line>
          </svg>
        </div>
        <div class="notification-info">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
          <div class="notification-time">${formattedDate}</div>
        </div>
      `;
  
      notificationsList.appendChild(notificationItem);
    });
  }
  
  // Show confirm modal
  function showConfirmModal(title, message, action) {
    const confirmTitle = document.getElementById("confirm-title");
    const confirmMessage = document.getElementById("confirm-message");
    const confirmActionBtn = document.getElementById("confirm-action-btn");
  
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmActionBtn.setAttribute("data-action", action);
    confirmModal.style.display = "block";
  }
  
  // Get initials for avatar
  function getInitials(name) {
    const names = name.split(" ");
    let initials = "";
  
    for (const part of names) {
      initials += part.charAt(0);
    }
  
    return initials.toUpperCase();
  }
  
  // Get level for user
  function getLevelForUser(email) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const user = leaderboard.find((user) => user.email === email);
  
    if (user) {
      return user.level;
    }
  
    return 1;
  }
  
  // Get points for user
  function getPointsForUser(email) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const user = leaderboard.find((user) => user.email === email);
  
    if (user) {
      return user.points;
    }
  
    return 0;
  }
  
  // Format category
  function formatCategory(category) {
    switch (category) {
      case "machine-learning":
        return "Machine Learning";
      case "deep-learning":
        return "Deep Learning";
      case "data-science":
        return "Data Science";
      case "ai-ethics":
        return "AI Ethics";
      case "computer-vision":
        return "Computer Vision";
      case "nlp":
        return "Natural Language Processing";
      default:
        return category;
    }
  }
  
  // Format event type
  function formatEventType(type) {
    switch (type) {
      case "conference":
        return "Conference";
      case "workshop":
        return "Workshop";
      case "seminar":
        return "Seminar";
      case "deadline":
        return "Deadline";
      default:
        return type;
    }
  }
  
  // Format time
  function formatTime(time) {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(`1970-01-01T${time}`).toLocaleTimeString(undefined, options);
  }
  
  // Toggle project featured
  function toggleProjectFeatured(projectId) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find((project) => project.id === projectId);
  
    if (project) {
      project.featured = !project.featured;
      localStorage.setItem("projects", JSON.stringify(projects));
      loadProjects();
    }
  }
  
  // Toggle event featured
  function toggleEventFeatured(eventId) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const event = events.find((event) => event.id === eventId);
  
    if (event) {
      event.featured = !event.featured;
      localStorage.setItem("events", JSON.stringify(events));
      loadEvents();
    }
  }
  
  // Initialize charts
  function initializeCharts() {
    // Implement chart initialization logic here
  }
  