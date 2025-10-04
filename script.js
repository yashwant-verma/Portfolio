// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetSection = this.getAttribute("data-section")

      // Update active nav link
      navLinks.forEach((navLink) => navLink.classList.remove("active"))
      this.classList.add("active")

      // Show target section
      sections.forEach((section) => {
        section.classList.remove("active")
        if (section.id === targetSection) {
          section.classList.add("active")
          const navbarHeight = document.querySelector(".nav").offsetHeight
          const sectionTop = section.offsetTop - navbarHeight - 20 // Extra 20px padding
          window.scrollTo({
            top: sectionTop,
            behavior: "smooth",
          })
        }
      })
    })
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const navbarHeight = document.querySelector(".nav").offsetHeight
        const targetTop = target.offsetTop - navbarHeight - 20
        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add typing effect to the name
  const nameElement = document.querySelector(".name")
  const originalText = nameElement.textContent

  function typeWriter(element, text, speed = 100) {
    element.textContent = ""
    let i = 0

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Start typing effect after a short delay
  setTimeout(() => {
    typeWriter(nameElement, originalText, 80)
  }, 500)

  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe project items and experience items
  document.querySelectorAll(".project-item, .experience-item").forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })

  // Add hover effects to tech tags
  document.querySelectorAll(".tech-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 4px 12px rgba(56, 189, 248, 0.3)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "none"
    })
  })

  // Add parallax effect to the left column
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const leftColumn = document.querySelector(".left-column")
    const rate = scrolled * -0.1

    if (window.innerWidth > 768) {
      leftColumn.style.transform = `translateY(${rate}px)`
    }
  })

  // Add loading animation
  document.body.style.opacity = "0"
  window.addEventListener("load", () => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  })
})

// Add cursor trail effect
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div")
  trail.className = "cursor-trail"
  trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    `

  document.body.appendChild(trail)

  setTimeout(() => {
    trail.style.opacity = "0"
    setTimeout(() => {
      document.body.removeChild(trail)
    }, 300)
  }, 100)
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Add CSS for keyboard navigation
const style = document.createElement("style")
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent) !important;
        outline-offset: 2px !important;
    }
`
document.head.appendChild(style)
