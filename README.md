# 🛍️ E-Commerce Product Dashboard

A modern, fully-functional e-commerce admin dashboard built with React, Vite, and Tailwind CSS. Features complete CRUD operations, shopping cart, advanced filtering, and beautiful dark/light theme toggle.

## 🌐 Live Demo

**[View Live Demo](https://hamzahjal.github.io/react-ecommerce-dashboard/)**

> 💡 **Demo Login:** Enter any username and password to access the dashboard (mock authentication)

---

## ✨ Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete products
- ✅ **Shopping Cart** - Add to cart, adjust quantities, persistent storage
- ✅ **Advanced Filtering** - Search, sort, filter by category/price range
- ✅ **Product Management** - Add products with image upload simulation
- ✅ **Mock Authentication** - Login system (no backend required)
- ✅ **Dark/Light Theme** - Toggle with persistence across sessions
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **LocalStorage** - Cart and products persist between sessions

---

## 🚀 Tech Stack

- **React 18** - Modern React with Hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **FakeStore API** - Product data source
- **LocalStorage** - Data persistence

---

## 📁 Project Structure

```
ecommerce-dashboard/
├── .github/workflows/     # GitHub Actions deployment
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # Button, Card, Input, Select, Modal
│   │   ├── layout/       # Header, Sidebar, Layout
│   │   ├── products/     # Product components
│   │   └── cart/         # Cart components
│   ├── pages/            # Page components
│   ├── context/          # React Context providers
│   ├── services/         # API calls
│   └── utils/            # Helper functions
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Local Development

```bash
# Clone repository
git clone https://github.com/hamzahJal/react-ecommerce-dashboard.git
cd ecommerce-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## 🚀 Deploy to GitHub Pages

### Step-by-Step Deployment Guide

#### 1. Update Configuration

**Edit `vite.config.js`** - Change the base path to match your repository name:

```javascript
base: 'react-ecommerce-dashboard'
```

#### 2. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**

#### 4. Wait for Deployment

- Go to the **Actions** tab
- Watch the deployment workflow
- Once complete, your site will be live!

#### 5. Access Your Live Site

```
https://hamzahjal.github.io/react-ecommerce-dashboard/
```

---

## 🎯 Usage

### Login
Enter any username and password to access the dashboard.

### Dashboard
View statistics and recent products.

### Products Page
- Browse all products
- Search and filter products
- Add new products
- Click on a product to view details

### Product Details
- View full product information
- Edit product details
- Delete products
- Add to cart

### Shopping Cart
- View cart items
- Adjust quantities
- Remove items
- Proceed to checkout

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Update Repository Name

1. Update `vite.config.js` with new base path
2. Commit and push changes
3. GitHub Actions will automatically redeploy

---

## 📸 Screenshots

_Add your screenshots here after deployment_

---

## 👤 Author

**YOUR_NAME**
- GitHub: https://github.com/hamzahJal
- LinkedIn: https://www.linkedin.com/in/hamzahjalila/
- Email: hamzahjalila@gmail.com

---

## 🙏 Acknowledgments

- Product data from [FakeStore API](https://fakestoreapi.com/)
- Icons from Heroicons
- Built with React + Vite + Tailwind CSS

---

## 📝 License

MIT License - feel free to use this project for your portfolio!

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ and React

</div>
