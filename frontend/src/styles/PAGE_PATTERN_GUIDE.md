# Highest Waves - Page Responsive Pattern Guide

## Overview

This guide explains how to apply the page responsive design pattern to all pages in the Highest Waves application. The pattern is applied at the page level, which provides consistent responsive behavior across all components within each page.

## Quick Start

### 1. Import the Pattern

Add this import to your page component:

```jsx
import '../../styles/page-responsive-pattern.css'
```

### 2. Basic Page Structure

```jsx
import React from 'react'
import '../../styles/page-responsive-pattern.css'

function MyPage() {
  return (
    <div className="page-container page-bg-gradient">
      <div className="page-content-wrapper">
        <div className="page-card">
          <h1 className="page-title">Page Title</h1>
          
          <div className="page-two-column">
            <div className="page-sidebar">
              {/* Sidebar content */}
            </div>
            
            <div className="page-main-content">
              {/* Main content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Page Structure Classes

### Container Classes
- `page-container` - Main page wrapper with full viewport height
- `page-content-wrapper` - Centered content container with responsive padding
- `page-section` - Section container with responsive margins

### Layout Classes
- `page-two-column` - Two-column layout (sidebar + main content)
- `page-sidebar` - Sidebar container (25% width on desktop)
- `page-main-content` - Main content container (75% width on desktop)

### Typography Classes
- `page-title` - Responsive page title
- `page-subtitle` - Responsive page subtitle

### Card Classes
- `page-card` - Glass morphism card with responsive padding

## Breakpoint System

| Breakpoint | Min Width | Use Case |
|------------|-----------|----------|
| Mobile First | 320px+ | Mobile phones |
| Small | 640px+ | Large phones, small tablets |
| Medium | 768px+ | Tablets |
| Large | 1024px+ | Small laptops |
| Extra Large | 1280px+ | Large laptops |
| 2XL | 1536px+ | Desktop monitors |

## Page Examples

### Simple Page
```jsx
function SimplePage() {
  return (
    <div className="page-container page-bg-gradient">
      <div className="page-content-wrapper">
        <div className="page-card">
          <h1 className="page-title">Simple Page</h1>
          <div className="page-padding-md">
            <p>Content goes here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Two-Column Page
```jsx
function TwoColumnPage() {
  return (
    <div className="page-container page-bg-gradient">
      <div className="page-content-wrapper">
        <div className="page-card">
          <h1 className="page-title">Two Column Page</h1>
          
          <div className="page-two-column">
            <div className="page-sidebar">
              <div className="page-padding-md">
                <h2 className="page-subtitle">Sidebar</h2>
                <p>Sidebar content</p>
              </div>
            </div>
            
            <div className="page-main-content">
              <div className="page-padding-md">
                <h2 className="page-subtitle">Main Content</h2>
                <p>Main content area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Grid Page
```jsx
function GridPage() {
  return (
    <div className="page-container page-bg-gradient">
      <div className="page-content-wrapper">
        <div className="page-card">
          <h1 className="page-title">Grid Page</h1>
          
          <div className="page-grid-4 page-padding-md">
            <div className="page-padding-sm">
              <h3>Item 1</h3>
            </div>
            <div className="page-padding-sm">
              <h3>Item 2</h3>
            </div>
            <div className="page-padding-sm">
              <h3>Item 3</h3>
            </div>
            <div className="page-padding-sm">
              <h3>Item 4</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Spacing Classes

### Padding Classes
```css
.page-padding-xs   /* 0.5rem → 1.75rem */
.page-padding-sm   /* 1rem → 2.25rem */
.page-padding-md   /* 1.5rem → 2.75rem */
.page-padding-lg   /* 2rem → 3.25rem */
.page-padding-xl   /* 2.5rem → 3.75rem */
.page-padding-2xl  /* 3rem → 4.25rem */
```

### Margin Classes
```css
.page-margin-xs    /* 0.5rem → 1.75rem */
.page-margin-sm    /* 1rem → 2.25rem */
.page-margin-md    /* 1.5rem → 2.75rem */
.page-margin-lg    /* 2rem → 3.25rem */
.page-margin-xl    /* 2.5rem → 3.75rem */
.page-margin-2xl   /* 3rem → 4.25rem */
```

## Grid Classes

### Responsive Grids
```css
.page-grid-1       /* 1 column always */
.page-grid-2       /* 1 → 2 columns */
.page-grid-3       /* 1 → 2 → 3 columns */
.page-grid-4       /* 1 → 2 → 4 columns */
```

## Background Classes

### Background Options
```css
.page-bg-gradient   /* Brand gradient background */
.page-bg-overlay    /* Background with overlay */
```

## Utility Classes

### Layout Utilities
```css
.page-centered      /* Center content vertically and horizontally */
.page-full-width    /* Full width container */
.page-hidden-mobile /* Hidden on mobile */
.page-hidden-desktop /* Hidden on desktop */
```

### Text Utilities
```css
.page-text-center   /* Center text */
.page-text-left     /* Left align text */
.page-text-right    /* Right align text */
```

### Flex Utilities
```css
.page-flex          /* Display flex */
.page-flex-col      /* Flex column */
.page-flex-row      /* Flex row */
.page-items-center  /* Align items center */
.page-justify-center /* Justify center */
.page-justify-between /* Justify space between */
.page-justify-around /* Justify space around */
```

## Animation Classes

### Page Animations
```css
.page-fade-in       /* Fade in animation */
.page-slide-in      /* Slide in animation */
.page-scale-in      /* Scale in animation */
```

## Migration Guide

### From Tailwind Classes
Replace Tailwind responsive classes with page pattern classes:

```jsx
// Before (Tailwind)
<div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
  <div className="container mx-auto px-4 py-8">
    <div className="bg-gray-800 rounded-lg p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Title</h1>
    </div>
  </div>
</div>

// After (Page Pattern)
<div className="page-container page-bg-gradient">
  <div className="page-content-wrapper">
    <div className="page-card">
      <h1 className="page-title">Title</h1>
    </div>
  </div>
</div>
```

### From Custom CSS
Replace custom responsive CSS with page pattern classes:

```css
/* Before (Custom CSS) */
.my-page {
  min-height: 100vh;
  padding: 2rem;
}

@media (min-width: 768px) {
  .my-page {
    padding: 3rem;
  }
}

/* After (Page Pattern) */
.my-page {
  /* Use page-container and page-content-wrapper classes instead */
}
```

## Component Integration

### How Components Work with Pages

Components should focus on their specific functionality while pages handle the responsive layout:

```jsx
// Page (handles layout and responsiveness)
function MyPage() {
  return (
    <div className="page-container page-bg-gradient">
      <div className="page-content-wrapper">
        <div className="page-card">
          <h1 className="page-title">My Page</h1>
          
          <div className="page-two-column">
            <div className="page-sidebar">
              <MySidebarComponent />
            </div>
            
            <div className="page-main-content">
              <MyMainComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component (focuses on functionality)
function MySidebarComponent() {
  return (
    <div className="page-padding-md">
      {/* Component-specific content */}
    </div>
  )
}
```

## Best Practices

### 1. Page-Level Responsiveness
Apply responsive patterns at the page level, not individual components.

### 2. Consistent Structure
Use the same page structure across all pages for consistency.

### 3. Component Simplicity
Keep components focused on functionality, let pages handle layout.

### 4. Proper Nesting
Always use the proper nesting: page-container → page-content-wrapper → page-card.

### 5. Testing
Test pages across all breakpoints to ensure proper responsiveness.

## Troubleshooting

### Common Issues

1. **Content not centering**: Ensure you're using `page-content-wrapper`
2. **Padding not scaling**: Check that you're using page padding classes
3. **Layout breaking**: Verify page structure and class usage
4. **Background not showing**: Make sure `page-bg-gradient` is applied

### Debug Mode
Add this CSS for debugging page layouts:

```css
.debug-page * {
  outline: 1px solid red;
}

.debug-page .page-content-wrapper {
  outline: 2px solid blue;
}

.debug-page .page-card {
  outline: 2px solid green;
}
```

## Performance Notes

- Page patterns use CSS custom properties for better performance
- Media queries are optimized for mobile-first approach
- Minimal CSS output for unused breakpoints
- Efficient class reuse across pages

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS custom properties support required 