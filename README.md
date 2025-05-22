# Norse Yacht Co.

This is a collaborative educational project where we are developing a marketplace for yachts from Norway. The project includes a separate backend system and involves a team consisting of developers, a designer, and a tester. Our goal is to learn and apply various skills while creating a functional and user-friendly platform for yacht buyers and sellers.

The front-end of the project is built using Next.js with TypeScript, Tailwind CSS, Ant Design, and integrates images from AWS S3, while maintaining code quality with Prettier, ESLint, and Husky.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Folder Structure](#folder-structure)
- [App folder Structure](#app-folder-structure)
- [License](#license)
- [Learn More](#learn-more)

## Installation

Instructions on how to install the project.

```bash
git clone https://github.com/finedefinition/nyc-frontend.git
cd repo
npm install
```

## Usage

```bash
npm run dev
```

This will open your browser at http://localhost:3000.

## Contributing

To display yacht photos, you need to follow a few simple steps. ⛵

1. Create an `.env.local` file in the project's root directory.
2. Fill this file with the necessary data.

**You'll get the required data from the repository owner.**

### Branching Guidelines

We recommend creating a new branch from the `test` branch.
Additionally, please create pull requests for your changes.

## Folder Structure

```bash
src/
├── app/ # Main application routing, including routing.
├── components/ # Reusable UI components.
├── context/ # Context API files for managing global state.
├── data/ # Static or mock data used for development.
├── hooks/ # Custom React hooks for encapsulating reusable logic.
├── interfaces/ # TypeScript interfaces and types for type safety across the application.
├── lib/ # Contains configuration for third-party libraries.
├── public/ # Static assets such as images, fonts, and other files served directly.
└── utils/ # Utility functions and helper methods used throughout the application.
```

## App folder Structure

```bash
app/
├── (admin)/ # pages for the admin CRM interface.
├── (pages)/ # user-facing pages, accessible routes for standard users.
├── @modal/ # intercepting routes for modal, enabling custom route handling for modals.
├── contactform/ # Route for intercepting and displaying the contact form modal via @modal/(.)contactform.
├── menu/ # Route for displaying the mobile menu.
├── signin/ # Route for intercepting and displaying the sign-in modal via @modal/(.)signin.
├── signup/ # Route for intercepting and displaying the sign-up modal via @modal/(.)signup.
├── favicon.ico # The favicon for the application, displayed in browser tabs.
├── global.css # Global CSS styles applied across the entire application.
├── layout.tsx # Defines the layout for all pages, including shared components like headers or footers.
├── loading.tsx # Displays a loading indicator while content or data is being fetched.
└── page.tsx # The main entry point for the root route, rendering the content for the base URL.
```

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
