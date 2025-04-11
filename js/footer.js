const template = document.createElement('template');
template.innerHTML = `
<footer>
  <div class="container footer-content">
      <p>© 2025 Alzheimer's Disease Research Resources</p>
      <p>A collaborative platform for researchers, clinicians, and everyone involved in the fight against Alzheimer's disease.</p>
      <div class="social-links">
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      </div>
  </div>
</footer>
`
document.body.appendChild(template.content);