# 🚗 SparkleWash — Car Cleaning Website with AI Assistant

A complete car cleaning service website with a free AI chat assistant powered by Groq.

## 📁 Files

```
├── index.html    ← Main website
├── style.css     ← All styles
├── chat.js       ← AI assistant logic
└── README.md     ← This file
```

## 🚀 Deploy in 5 Steps (100% Free)

### Step 1 — Get a Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
1. Sign up (free)
1. Create an API key
1. Copy it

### Step 2 — Add Your API Key

Open `chat.js` and replace line 7:

```js
const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
```

With your actual key:

```js
const GROQ_API_KEY = "gsk_xxxxxxxxxxxxxxxxxxxx";
```

### Step 3 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sparklewash.git
git push -u origin main
```

### Step 4 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free)
1. Click **“Add New Project”**
1. Import your GitHub repo
1. Click **Deploy** — that’s it!

### Step 5 — Secure Your API Key (Important!)

Instead of hardcoding the key, use Vercel Environment Variables:

1. In Vercel dashboard → Your project → Settings → Environment Variables
1. Add: `GROQ_API_KEY` = your key
1. Then update `chat.js` to use a backend proxy (see Advanced below)

## ✏️ Customize Your Business Info

Edit these in the files:

**index.html** — Update:

- Business name (search “SparkleWash”)
- Services and descriptions
- Contact info (address, phone, email, hours)

**chat.js** — Update `SYSTEM_PROMPT`:

- Your real services and prices
- Your real business info
- Your booking process

## 🆓 Why This Is Free

- **Hosting**: Vercel free tier (unlimited static sites)
- **AI**: Groq free tier (fast Llama 3, generous limits)
- **No database needed** — pure frontend

## 📞 Support

For questions, open an issue on GitHub.
