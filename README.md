# Developer Portfolio — GitHub Pages

A clean, dark, production-ready developer portfolio built with HTML, CSS, and Vanilla JS.  
No frameworks. No build tools. Just drop on GitHub Pages and you're live.

---

## 📁 Folder Structure

```
portfolio/
├── index.html           ← Main HTML file
├── css/
│   └── style.css        ← All styles
├── js/
│   ├── projects.js      ← Project data (edit this!)
│   └── main.js          ← All JavaScript logic
├── assets/
│   ├── avatar.jpg       ← Your photo (replace this)
│   └── resume.pdf       ← Your resume (replace this)
└── README.md
```

---

## 🚀 Deploy to GitHub Pages (Free)

1. **Create a GitHub repository** named `yourusername.github.io`
2. **Upload all portfolio files** to the root of that repo
3. Go to **Settings → Pages → Source** → select `main` branch
4. Your portfolio is live at `https://yourusername.github.io`

---

## ✅ What You Need to Update

### 1. Personal Info in `index.html`

Search and replace these placeholders:
- `Your Name` → your actual name
- `YN` → your initials (used in logo + avatar fallback)
- `you@example.com` → your email
- `+91 98765 43210` → your phone/WhatsApp
- `https://wa.me/919876543210` → your WhatsApp link
- `YOUR_WEB3FORMS_ACCESS_KEY` → your free key from [web3forms.com](https://web3forms.com)
- Social links: GitHub, LinkedIn, Twitter, Upwork

### 2. Get Your Free Web3Forms Key

1. Go to **https://web3forms.com**
2. Enter your email → get the access key
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in the form's hidden input
4. Form submissions will now arrive in your email — free, no backend needed

### 3. Replace Your Photo

- Add your photo as `assets/avatar.jpg`
- Recommended: 200×200px or square crop

### 4. Replace Resume

- Put your resume as `assets/resume.pdf`

### 5. Update Projects in `js/projects.js`

Each project looks like this:
```javascript
{
  id: 0,
  title: "Project Title",
  category: ["laravel", "crm"],    // used for filter tabs
  tech: ["Laravel", "MySQL"],      // tech stack badges
  description: "Short description...",
  features: [
    "Feature one",
    "Feature two",
  ],
  github: "https://github.com/...",
  live: "https://yoursite.com",
  bgColor: "linear-gradient(135deg, #1a1a2e, #16213e)",  // card thumbnail bg
  icon: "fa-briefcase"   // Font Awesome icon class
}
```

Categories available for filters:
`laravel`, `wordpress`, `woocommerce`, `api`, `crm`

### 6. Update Testimonials

Edit the testimonial cards directly in `index.html` (search for `tcard`).

---

## 💬 Contact Form

Uses **Web3Forms** (free, no backend):
- Get key at https://web3forms.com
- Paste into `value="YOUR_WEB3FORMS_ACCESS_KEY"` in index.html
- Form submissions hit your inbox instantly

**Alternative backends** (all free):
| Service | URL |
|---------|-----|
| FormSubmit | https://formsubmit.co |
| Netlify Forms | (works with Netlify hosting) |
| Basin | https://usebasin.com |
| EmailJS | https://emailjs.com |

---

## 🔧 Customization

### Change Name/Logo
Find `.nav-logo` in index.html and change `YN` to your initials.

### Change Accent Color
In `css/style.css`, change `--accent: #7c6eff;` to any hex color you like.

### Add a New Filter Tab
In `index.html`, add a new button:
```html
<button class="ftab" data-filter="vue">Vue.js</button>
```
Then in your project data, add `"vue"` to the category array.

---

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark theme with purple accent
- ✅ Project filtering by category
- ✅ Click-to-preview project modal
- ✅ Professional contact form with validation
- ✅ Toast notifications (success/error)
- ✅ File upload UI
- ✅ Scroll animations
- ✅ Sticky nav with active section highlight
- ✅ Scroll-to-top button
- ✅ Anti-spam honeypot field
- ✅ SEO meta tags
- ✅ No dependencies — no npm, no build step
- ✅ GitHub Pages ready out of the box

---

## 📄 License

Free to use for your personal portfolio.
