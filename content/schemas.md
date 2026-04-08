# Input Content Schemas

This folder structure allows you to directly edit the content of your pages without touching the React code. Each subpage reads from its corresponding `data.json` file.

Below are the guidelines for how to structure your input JSON.

---

## 1. About (`content/about/data.json`)
```json
{
  "title": "About Me",
  "paragraphs": [
    "I am currently pursuing a degree in Data Science...",
    "I focus on Agentic AI and..."
  ]
}
```

## 2. Experience (`content/experience/data.json`)
List your work history. You can group multiple roles under the same company by using the `roles` array! You can use `details` inside each role to provide a markdown-formatted string (lists, bold words using **bold**, or images using `![alt](/avatar.jpg)`) which will expand the role when clicked.
```json
[
  {
    "company": "NEU Lab",
    "total_timeline": "Aug 2024 - Present",
    "roles": [
      {
        "title": "Senior Data Researcher",
        "employment_type": "Full-time",
        "timeline": "Jan 2025 - Present",
        "description": "Led the agentic frameworks team.",
        "details": "Here are some more detailed notes:\n- Built **robust** pipelines.\n- ![Demo](/avatar.jpg)",
        "tags": ["AI", "SQL"]
      },
      {
        "title": "Data Researcher",
        "employment_type": "Intern",
        "timeline": "Aug 2024 - Dec 2024",
        "description": "Research on advanced agentic systems."
      }
    ]
  }
]
```

## 3. Projects (`content/projects/data.json`)
List your personal or professional projects.
```json
[
  {
    "name": "Intelligent Financial Pipeline",
    "description": "A robust system for handling...",
    "link": "https://github.com/...",
    "tags": ["Python", "Pandas", "Next.js"]
  }
]
```

## 4. Research (`content/research/data.json`)
List your research backgrounds or lab work. Like experience, you can group multiple roles under a single lab.
```json
[
  {
    "lab": "NEU AI Lab",
    "roles": [
      {
        "title": "Undergraduate Researcher",
        "topic": "Reinforcement Learning in EdTech",
        "timeline": "Jan 2024 - Present"
      }
    ]
  }
]
```

## 5. Publications (`content/publications/data.json`)
```json
[
  {
    "title": "Paper Title",
    "authors": "Hung N. Q., et al.",
    "venue": "Conference Name",
    "year": "2025",
    "link": "https://arxiv.org/..."
  }
]
```

## 6. Skills (`content/skills/data.json`)
```json
{
  "languages": ["Python", "JavaScript", "SQL"],
  "frameworks": ["PyTorch", "Next.js", "React"],
  "tools": ["Git", "Docker", "AWS"]
}
```
