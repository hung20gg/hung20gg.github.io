````markdown
# Nguyen Quang Hung Personal Website Project Plan

This document is a complete project blueprint for a personal website. It combines the full structure, page plan, content plan, navigation flow, reusable sections, and implementation notes into one single markdown file.

The content is primarily based on the CV provided by Nguyen Quang Hung, including education, research experience, work experience, publications, awards, and technical skills. :contentReference[oaicite:0]{index=0}

---

# 1. Project Goal

The goal of this website is to present Nguyen Quang Hung as:

- an AI Engineer
- a Data Scientist
- a Researcher

The website should feel professional, clear, modern, and easy to navigate.

It should help visitors quickly understand:

- who you are
- what you do
- what you have built
- what you have researched
- what skills you have
- how to contact you

The homepage should contain the main information and short portfolio summaries. Each summary section should be clickable and redirect users to a dedicated page.

---

# 2. Website Style Direction

## Overall Feel

- clean
- modern
- academic but practical
- technical but accessible
- minimal clutter
- easy to scan

## Tone of Writing

- confident but not exaggerated
- clear and direct
- professional
- focused on impact and specialization

## Visual Direction

Recommended style:

- large hero heading
- lots of white space
- section-based layout
- card summaries on homepage
- readable typography
- subtle animations if implemented later
- responsive design for desktop and mobile

---

# 3. Main Website Structure

```text
Home
About
Experience
Research
Projects
Publications
Skills
Contact
````

This is the full recommended information architecture for the website.

---

# 4. Routing / Page Map

```text
/
├── /about
├── /experience
├── /research
├── /projects
├── /publications
├── /skills
└── /contact
```

The homepage acts as the central hub. It contains short summaries of the other parts of the portfolio. Users click those summary sections to go deeper.

---

# 5. Project Folder Structure

This is a suggested structure if the website is built with Next.js.

```text
portfolio-website/
│
├── app/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── research/page.tsx
│   ├── projects/page.tsx
│   ├── publications/page.tsx
│   ├── skills/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PortfolioCard.tsx
│   ├── SectionHeader.tsx
│   └── PageContainer.tsx
│
├── content/
│   ├── about.md
│   ├── experience.md
│   ├── research.md
│   ├── projects.md
│   ├── publications.md
│   ├── skills.md
│   └── contact.md
│
├── public/
│   ├── avatar.jpg
│   ├── resume.pdf
│   └── project-images/
│
└── README.md
```

---

# 6. Navigation Plan

The navigation bar should include:

* Home
* About
* Experience
* Research
* Projects
* Publications
* Skills
* Contact

## Navigation Behavior

* visible on all pages
* fixed or sticky at the top
* simple hover effects
* mobile menu for small screens

## Footer

The footer should include:

* your name
* copyright
* email
* GitHub
* Google Scholar
* LinkedIn

---

# 7. Homepage Plan

The homepage is the most important page. It should immediately introduce you and show the major categories of your portfolio.

The homepage should **not** use call-to-action buttons for the portfolio sections.
Instead, each portfolio summary should be presented as a clickable block or card that redirects to another page.

## Homepage Sections

1. Hero section
2. Short summary / introduction
3. Portfolio overview cards
4. Featured highlights
5. Contact strip / footer preview

---

# 8. Homepage Content

## 8.1 Hero Section

### Main Heading

# Nguyen Quang Hung

### Role Line

AI Engineer | Data Scientist | AI Researcher

### Intro Sentence

I build intelligent systems that combine large language models, data pipelines, and real-world applications in finance, education, and analytics.

### Supporting Summary

I am a Data Science student at National Economics University with research and industry experience in Agentic AI, Text-to-SQL, machine learning systems, and large-scale data processing. My work focuses on building AI systems that are both technically strong and practically useful. This summary is grounded in your degree, GPA, research roles, and engineering experience from the CV.  

---

## 8.2 Short About Summary on Homepage

This should be a compact paragraph below the hero section.

### Homepage About Summary

I am currently pursuing a degree in Data Science in Economics and Business at National Economics University, where I have maintained a GPA of 3.83/4. My interests lie in building AI systems that can reason, interact with structured data, and support real-world decision making. I have worked across research labs and industry teams on projects involving agentic AI, financial analytics, recommendation systems, educational data mining, and large-scale analytics pipelines.  

---

## 8.3 Portfolio Overview Section

This section should consist of clickable summary cards.

### Section Title

## Portfolio

### Card
