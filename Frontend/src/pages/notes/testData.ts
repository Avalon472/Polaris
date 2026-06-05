import type { Note, NoteListItem } from "@/types/notes";

export const noteDataLong: NoteListItem[] = [
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    title: "React",
    slug: "react-6-1",
    tags: ["javascript", "state", "rerender", "popular", "very cool"],
    type: "framework",
    updatedAt: "6-1-25",
    description: "React is a javascript framework based on composeable content",
    pinned: true,
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d2",
    title: "Docker Compose",
    slug: "docker-6-1",
    tags: ["javascript", "homelab", "container", "ci/cd"],
    type: "framework",
    updatedAt: "6-2-25",
    description:
      "Tailwind is a css framework that aims to bring your css straight into the html with short, concise class names",
    pinned: true,
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d8",
    title: "React",
    slug: "react-6-1",
    tags: ["javascript", "state", "rerender", "popular", "very cool"],
    type: "framework",
    updatedAt: "6-1-25",
    description: "React is a javascript framework based on composeable content",
    pinned: true,
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d6",
    title: "Tailwind",
    slug: "tailwind-6-1",
    tags: ["javascript", "css", "themes", "class-based"],
    type: "framework",
    updatedAt: "6-2-25",
    description:
      "Tailwind is a css framework that aims to bring your css straight into the html with short, concise class names",
    pinned: true,
  },
];

export const noteDataShort: NoteListItem[] = [
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    title: "React",
    slug: "react-6-1",
    description:
      "Component model, hooks, and state management patterns for building the Akashic frontend.",
    tags: ["frontend", "framework"],
    type: "framework",
    pinned: true,
    updatedAt: "2024-11-14T10:32:00.000Z",
    notecard: {
      summary:
        "Declarative UI library. Everything is a function that maps state to UI.",
      coverIcon: "⚛️",
      tags: ["frontend", "framework"],
    },
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d2",
    title: "Docker Compose",
    slug: "docker-6-1",
    description:
      "Multi-service orchestration for running the full Akashic stack locally and in the homelab.",
    tags: ["devops", "homelab"],
    type: "tool",
    pinned: false,
    updatedAt: "2024-11-10T08:15:00.000Z",
    notecard: {
      summary:
        "Defines and runs multi-container applications from a single YAML file.",
      coverIcon: "🐳",
      tags: ["devops", "homelab"],
    },
  },
];

export const fullNoteData: Note[] = [
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    title: "React",
    slug: "react-6-1",
    description:
      "Component model, hooks, and state management patterns for building the Akashic frontend.",
    tags: ["frontend", "framework"],
    type: "framework",
    pinned: true,
    updatedAt: "2024-11-14T10:32:00.000Z",
    createdAt: "2024-09-01T12:00:00.000Z",
    archivedAt: null,
    author: "64f1a2b3c4d5e6f7a8b9c0a1",
    body: `## What it is\nA declarative UI library for building component-based interfaces. Everything is a function that maps state to UI. Learn the mental model, not just the syntax.\n\n## Setup\n\`\`\`bash\nnpm create vite@latest akashic-ui -- --template react\ncd akashic-ui && npm install\nnpm run dev\n\`\`\`\n\n## Key concepts\nuseState, useEffect, useContext. Lifting state up. Controlled vs uncontrolled components. React Query for server state.\n\n## Use in Akashic\nThe entire frontend. Note editor, project dashboard, calendar view, AI chat panel.`,
    notecard: {
      summary:
        "Declarative UI library. Everything is a function that maps state to UI.",
      coverIcon: "⚛️",
      tags: ["frontend", "framework"],
    },
    references: [
      {
        _id: "64f1a2b3c4d5e6f7a8b9c0d3",
        title: "Vite",
        slug: "vite",
        notecard: {
          summary:
            "Fast frontend build tool. Pairs with React as the dev server and bundler.",
          coverIcon: "⚡",
          tags: ["frontend", "tool"],
        },
      },
    ],
    referencedBy: [
      {
        _id: "64f1a2b3c4d5e6f7a8b9c0d4",
        title: "Akashic Frontend",
        slug: "akashic-frontend",
        notecard: {
          summary: "Project spec for the Akashic React frontend.",
          coverIcon: "📋",
          tags: ["project-spec"],
        },
      },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d2",
    title: "Docker Compose",
    slug: "docker-6-1",
    description:
      "Multi-service orchestration for running the full Akashic stack locally and in the homelab.",
    tags: ["devops", "homelab"],
    type: "tool",
    pinned: false,
    updatedAt: "2024-11-10T08:15:00.000Z",
    createdAt: "2024-09-15T09:00:00.000Z",
    archivedAt: null,
    author: "64f1a2b3c4d5e6f7a8b9c0a1",
    body: `## What it is\nA tool for defining and running multi-container Docker applications from a single YAML file. Essential for wiring together the Akashic stack locally.\n\n## Setup\n\`\`\`bash\n# docker-compose.yml at project root\ndocker compose up --build\ndocker compose down\n\`\`\`\n\n## Key concepts\nServices, networks, volumes. Each service is a container — React, Node, .NET, Rails, Postgres all defined in one file. Environment variables via .env.\n\n## Use in Akashic\nPhase 7 homelab deployment. Replaces running each service manually. Nginx sits in front and routes by subdomain.`,
    notecard: {
      summary:
        "Defines and runs multi-container applications from a single YAML file.",
      coverIcon: "🐳",
      tags: ["devops", "homelab"],
    },
    references: [
      {
        _id: "64f1a2b3c4d5e6f7a8b9c0d5",
        title: "Nginx",
        slug: "nginx",
        notecard: {
          summary: "Reverse proxy that routes traffic to each Akashic service.",
          coverIcon: "🔀",
          tags: ["devops", "homelab"],
        },
      },
    ],
    referencedBy: [],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d6",
    title: "ASP.NET Core",
    slug: "aspnet-core",
    description:
      "The .NET 8 Web API layer — controllers, middleware, Entity Framework, and JWT auth.",
    tags: ["backend", "framework", ".net"],
    type: "framework",
    pinned: false,
    updatedAt: "2024-11-12T14:20:00.000Z",
    createdAt: "2024-10-01T11:00:00.000Z",
    archivedAt: null,
    author: "64f1a2b3c4d5e6f7a8b9c0a1",
    body: `## What it is\nMicrosoft's cross-platform web framework for building APIs in C#. The backend rewrite target for Phase 4 — same endpoints as Express, different runtime.\n\n## Setup\n\`\`\`bash\ndotnet new webapi -n AkashicApi\ncd AkashicApi && dotnet run\n\`\`\`\n\n## Key concepts\nControllers handle routing. Middleware pipeline (auth, logging, error handling) configured in Program.cs. Dependency injection is built in — no third-party container needed.\n\n## Entity Framework\nORM for PostgreSQL. Define models as C# classes, EF generates migrations.\n\`\`\`bash\ndotnet ef migrations add InitialCreate\ndotnet ef database update\n\`\`\`\n\n## Use in Akashic\nParallel backend to the Node/Express API. Feature-flagged so the frontend can hit either one.`,
    notecard: {
      summary:
        "Cross-platform C# web framework. Controllers, middleware, and EF Core in one stack.",
      coverIcon: "🔷",
      tags: ["backend", ".net"],
    },
    references: [
      {
        _id: "64f1a2b3c4d5e6f7a8b9c0d7",
        title: "Entity Framework Core",
        slug: "entity-framework-core",
        notecard: {
          summary:
            "ORM for .NET. Maps C# classes to PostgreSQL tables via migrations.",
          coverIcon: "🗄️",
          tags: ["backend", ".net"],
        },
      },
    ],
    referencedBy: [
      {
        _id: "64f1a2b3c4d5e6f7a8b9c0d1",
        title: "React",
        slug: "react-6-1",
        notecard: {
          summary:
            "Declarative UI library. Everything is a function that maps state to UI.",
          coverIcon: "⚛️",
          tags: ["frontend", "framework"],
        },
      },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d8",
    title: "Ruby on Rails 7",
    slug: "ruby-on-rails-7",
    description:
      "Convention-over-configuration MVC framework. Used for the Akashic wiki/docs microservice in Phase 5.",
    tags: ["backend", "framework", "rails"],
    type: "framework",
    pinned: false,
    updatedAt: "2024-11-08T16:45:00.000Z",
    createdAt: "2024-10-20T10:30:00.000Z",
    archivedAt: null,
    author: "64f1a2b3c4d5e6f7a8b9c0a1",
    body: `## What it is\nA full-stack MVC framework built on Ruby. Famous for convention over configuration — Rails makes a lot of decisions for you, which means less boilerplate but more to unlearn if you fight it.\n\n## Setup\n\`\`\`bash\ngem install rails\nrails new akashic-wiki --api --database=postgresql\ncd akashic-wiki && rails server\n\`\`\`\n\n## Key concepts\nMVC: models (ActiveRecord), controllers, routes. \`rails console\` for live DB inspection. Serializers via jsonapi-serializer for clean API responses.\n\n## vs Express vs .NET\nRails is the most opinionated of the three. Express gives you nothing by default, .NET gives you structure but you wire it yourself. Rails gives you everything and expects you to follow the pattern.\n\n## Use in Akashic\nPhase 5 microservice handling the wiki/framework docs module. Runs alongside Node and .NET as a separate service behind Nginx.`,
    notecard: {
      summary:
        "Opinionated MVC framework. Convention over configuration — less boilerplate, more pattern.",
      coverIcon: "💎",
      tags: ["backend", "rails"],
    },
    references: [],
    referencedBy: [
      {
        _id: "64f1a2b3c4d5e6f7a8b9c0d5",
        title: "Nginx",
        slug: "nginx",
        notecard: {
          summary: "Reverse proxy that routes traffic to each Akashic service.",
          coverIcon: "🔀",
          tags: ["devops", "homelab"],
        },
      },
    ],
  },
];
