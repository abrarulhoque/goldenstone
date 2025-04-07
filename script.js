// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })

  // Navbar color change on scroll
  const navbar = document.querySelector('.navbar')
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  // Number counter animation
  const countElements = document.querySelectorAll('[data-counter]')

  // Only run the animation if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target
            const countTo = parseInt(target.getAttribute('data-counter'))
            let count = 0
            const duration = 2000 // animation duration in milliseconds
            const interval = duration / countTo

            const counter = setInterval(() => {
              count++
              target.innerText = count

              if (count >= countTo) {
                clearInterval(counter)
              }
            }, interval)

            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.2 }
    )

    countElements.forEach(el => {
      observer.observe(el)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        const headerOffset = 90 // Adjust based on your navbar height
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        // If using a mobile menu, close it after clicking a link
        const navbarToggler = document.querySelector('.navbar-toggler')
        const navbarCollapse = document.querySelector('.navbar-collapse')
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click()
        }
      }
    })
  })

  // Add floating animation to service cards
  const serviceCards = document.querySelectorAll('.service-card')
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add('floating-animation')
  })

  // Add hover effect to testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card')
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)'
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)'
    })

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)'
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
    })
  })

  // Form validation
  const qualifyForm = document.querySelector('.qualify-form-card form')
  if (qualifyForm) {
    qualifyForm.addEventListener('submit', function (e) {
      e.preventDefault()

      // Simple validation
      let valid = true
      this.querySelectorAll('input, select').forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid')
          valid = false
        } else {
          input.classList.remove('is-invalid')
        }
      })

      if (valid) {
        // Submit form or show success message
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerText

        submitBtn.disabled = true
        submitBtn.innerHTML =
          '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...'

        // Simulate API call
        setTimeout(() => {
          submitBtn.innerHTML = 'Success!'
          submitBtn.classList.remove('btn-primary')
          submitBtn.classList.add('btn-success')

          // Reset form after successful submission
          setTimeout(() => {
            this.reset()
            submitBtn.disabled = false
            submitBtn.innerText = originalText
            submitBtn.classList.add('btn-primary')
            submitBtn.classList.remove('btn-success')

            // Show success message
            const formSuccess = document.createElement('div')
            formSuccess.className = 'alert alert-success mt-3'
            formSuccess.innerText =
              'Your application has been submitted successfully! Our team will contact you shortly.'
            this.appendChild(formSuccess)

            // Remove message after 5 seconds
            setTimeout(() => {
              formSuccess.remove()
            }, 5000)
          }, 1500)
        }, 2000)
      }
    })
  }

  // Add floating animation
  const addFloatingAnimation = (selector, duration = 4, distance = 10) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      el.style.animation = `floatAnimation ${duration}s ease-in-out infinite`
      el.style.animationDelay = `${index * 0.5}s`
    })
  }

  // Apply floating animation to certain elements
  addFloatingAnimation('.hero-image-container')
  addFloatingAnimation('.qualify-form-card', 5, 15)

  // Add material ripple effect to buttons
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left
      const y = e.clientY - e.target.getBoundingClientRect().top

      const ripple = document.createElement('span')
      ripple.classList.add('ripple-effect')
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for the ripple effect
  const style = document.createElement('style')
  style.innerHTML = `
        .ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .floating-animation {
            animation: floatAnimation 4s ease-in-out infinite;
        }
    `
  document.head.appendChild(style)

  // Add parallax effect to hero section
  window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset
    const heroSection = document.querySelector('.hero-section')

    if (heroSection) {
      const parallaxElements = heroSection.querySelectorAll('.col-lg-6')
      parallaxElements[0].style.transform = `translateY(${
        scrollPosition * 0.1
      }px)`
      parallaxElements[1].style.transform = `translateY(${
        scrollPosition * 0.05
      }px)`
    }
  })
})
