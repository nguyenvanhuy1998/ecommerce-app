# E-Commerce App with Expo

This is an [Expo](https://expo.dev) e-commerce application created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Project Structure

```
ecommerce-app/
├── app/                      # Main application code (Expo Router)
│   ├── _layout.tsx           # Root layout component
│   ├── index.tsx             # Home screen
│   ├── (auth)/               # Authentication routes
│   │   ├── login.tsx         # Login screen
│   │   ├── register.tsx      # Registration screen
│   │   └── forgot-password.tsx # Password recovery
│   ├── (tabs)/               # Main app tabs
│   │   ├── _layout.tsx       # Tab navigation layout
│   │   ├── home.tsx          # Home tab
│   │   ├── categories.tsx    # Categories tab
│   │   ├── cart.tsx          # Shopping cart tab
│   │   ├── profile.tsx       # User profile tab
│   │   └── settings.tsx      # App settings tab
│   ├── product/              # Product related screens
│   │   ├── [id].tsx          # Product detail screen
│   │   └── search.tsx        # Product search screen
│   ├── checkout/             # Checkout process
│   │   ├── index.tsx         # Checkout main screen
│   │   ├── shipping.tsx      # Shipping information
│   │   ├── payment.tsx       # Payment information
│   │   └── confirmation.tsx  # Order confirmation
│   └── orders/               # Order management
│       ├── index.tsx         # Orders list
│       └── [id].tsx          # Order details
├── assets/                   # Static assets
│   ├── images/               # Image files
│   ├── fonts/                # Custom fonts
│   └── icons/                # App icons
├── components/               # Reusable components
│   ├── ui/                   # UI components
│   │   ├── Button.tsx        # Custom button component
│   │   ├── Card.tsx          # Card component
│   │   ├── Input.tsx         # Input component
│   │   └── ...               # Other UI components
│   ├── product/              # Product related components
│   │   ├── ProductCard.tsx   # Product card component
│   │   ├── ProductList.tsx   # Product list component
│   │   └── ...               # Other product components
│   ├── cart/                 # Cart related components
│   │   ├── CartItem.tsx      # Cart item component
│   │   └── ...               # Other cart components
│   └── ...                   # Other component categories
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useCart.ts            # Shopping cart hook
│   └── ...                   # Other custom hooks
├── services/                 # API and service integrations
│   ├── api.ts                # API client setup
│   ├── auth.ts               # Authentication service
│   ├── products.ts           # Products service
│   └── ...                   # Other services
├── utils/                    # Utility functions
│   ├── formatters.ts         # Data formatters
│   ├── validators.ts         # Form validators
│   └── ...                   # Other utilities
├── context/                  # React Context providers
│   ├── AuthContext.tsx       # Authentication context
│   ├── CartContext.tsx       # Shopping cart context
│   └── ...                   # Other contexts
├── constants/                # Application constants
│   ├── theme.ts              # Theme constants
│   ├── config.ts             # App configuration
│   └── ...                   # Other constants
├── types/                    # TypeScript type definitions
│   ├── product.ts            # Product types
│   ├── user.ts               # User types
│   └── ...                   # Other type definitions
├── node_modules/             # Dependencies
├── .expo/                    # Expo configuration
├── .vscode/                  # VS Code configuration
├── assets/                   # Static assets
├── app.json                  # Expo app configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Key Features

- **User Authentication**: Login, registration, and password recovery
- **Product Browsing**: Browse products by category, search, and view details
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **Checkout Process**: Multi-step checkout with shipping and payment options
- **Order Management**: View order history and track current orders
- **User Profile**: Manage personal information and preferences
- **Responsive Design**: Works on mobile and tablet devices

## Development Guidelines

- Use TypeScript for type safety
- Follow the component structure for reusability
- Implement context for global state management
- Use hooks for shared functionality
- Keep UI components separate from business logic
- Follow the file-based routing pattern of Expo Router

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
