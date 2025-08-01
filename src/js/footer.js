const template = document.createElement('template');
template.innerHTML = `
<footer>
  <div class="container footer-content">
      <p>© 2025 Alzheimer's Disease Research Resources</p>
      <p>A collaborative platform for researchers, clinicians, and everyone involved in the fight against Alzheimer's disease.</p>
      <p style="font-size: 0.9rem; color: #888;">
        Data presented on this site are sourced from publicly available research repositories. This platform is intended for educational and scientific purposes only.
      </p><div class="social-links">
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="https://danymukesha.github.io/" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/dany-mukesha/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      </div>
  </div>
</footer>
`
document.body.appendChild(template.content);