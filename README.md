# 🌿 Kindred — Client

<p align="center">
  <img src="https://img.shields.io/badge/Kindred-Community%20%26%20Kindness-647e65?style=for-the-badge" alt="Kindred" />
  <img src="https://img.shields.io/badge/Next.js-Framework-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Type%20Safe-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <b>Small acts. Greater change.</b>
  <br />
  A community-driven platform for people who believe kindness can make a difference.
</p>

---

## 💚 About Kindred

Kindred brings people together through meaningful community events, volunteering, and social initiatives.

Discover opportunities to help, connect with people who share your passion, and turn small acts of kindness into something bigger.

## Related Repository

- **Kindred Client:** [View the Client Repository](https://github.com/fahiyahedayet/kindred-client)

## ✨ Features

- 🌱 **Discover Events** — Explore upcoming community initiatives.
- 🤝 **Join the Community** — Participate in events and make connections.
- 💚 **Create Initiatives** — Bring your own ideas to life.
- 🔐 **Authentication** — Secure user authentication with Better Auth.
- 📅 **Event Management** — Create, update, and manage events.
- 📱 **Responsive Design** — A smooth experience across devices.
- 🔔 **Interactive Feedback** — Helpful toast notifications.

## 🎨 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive layouts |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| Better Auth | Authentication |

## 📂 Project Structure

```text
client/
├── public/
├── src/
│   └── app/
│       ├── components/
│       ├── events/
│       ├── create-event/
│       ├── login/
│       ├── signup/
│       ├── profile/
│       ├── layout.tsx
│       └── page.tsx
├── .env.local
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🔗 API Integration

The client communicates with the Kindred backend to:

- Fetch community events
- Search and filter events
- Create and manage events
- Join or leave events
- Retrieve user-specific events
- Handle authentication

The API base URL is configured using `NEXT_PUBLIC_API_URL`.

## 🌍 Deployment

The frontend is designed to be deployed with [Vercel](https://vercel.com/).

Set the required environment variables in your deployment settings before building.

---

<p align="center">
  Made with 💚 for a kinder community.
  <br />
  <i>Designed with kindness. Built for connection.</i>
</p>
