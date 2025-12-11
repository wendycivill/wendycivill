# HART'S Haiti Website Enhancement - Implementation Guide

This guide will help you implement the enhanced, animated, and interactive features on your WordPress website.

## Overview of Enhancements

### Visual & Animation Features
- **Scroll-triggered animations**: Elements fade in smoothly as users scroll
- **Animated counters**: Stats numbers count up when visible
- **Button hover effects**: Lift and shadow effects on all buttons
- **Image hover zoom**: Subtle zoom effect on images
- **Animated separators**: Gradient flow animation on dividers
- **Parallax effects**: Subtle depth on hero images

### Interactive Features
- **Back to top button**: Floating button appears on scroll
- **Scroll progress bar**: Shows reading progress at top of page
- **Program card 3D tilt**: Cards respond to mouse movement
- **Event card glow effect**: Animated border glow on hover
- **Form enhancements**: Focus states and visual feedback

### Performance & UX
- **Page loader**: Smooth loading animation
- **Smooth scrolling**: For anchor links
- **Accessibility support**: Respects reduced motion preferences

---

## Installation Steps

### Step 1: Add Custom CSS

1. Log in to your WordPress admin dashboard
2. Navigate to **Appearance > Customize > Additional CSS**
3. Copy the entire contents of `assets/css/harts-animations.css`
4. Paste it into the Additional CSS field
5. Click **Publish**

**Alternative method (for more control):**
- Install a plugin like "Simple Custom CSS and JS"
- Create a new CSS code block
- Paste the CSS content
- Set it to load on all pages

### Step 2: Add Custom JavaScript

Since WordPress.com doesn't allow direct JavaScript in the Customizer, use one of these methods:

**Method A: Using a Plugin (Recommended)**
1. Install "Insert Headers and Footers" or "WPCode" plugin
2. Create a new code snippet
3. Paste the contents of `assets/js/harts-interactions.js`
4. Set location to "Footer"
5. Enable on all pages

**Method B: Using Theme Functions (if self-hosted)**
Add this to your theme's `functions.php`:
```php
function harts_enqueue_custom_scripts() {
    wp_enqueue_script(
        'harts-interactions',
        get_template_directory_uri() . '/js/harts-interactions.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'harts_enqueue_custom_scripts');
```

### Step 3: Update Your Home Page Content

1. Go to **Pages** in WordPress admin
2. Edit your Home page
3. Switch to **Code Editor** (click the three dots menu > Code Editor)
4. Replace the content with the code from `templates/home-page-enhanced.html`
5. Switch back to Visual Editor to verify
6. Click **Update**

---

## Customization Options

### Changing Animation Speed

In `harts-animations.css`, modify these variables:
```css
:root {
  --harts-transition-fast: 0.2s ease;    /* Quick interactions */
  --harts-transition-medium: 0.4s ease;  /* Standard animations */
  --harts-transition-slow: 0.6s ease;    /* Slower, smoother effects */
}
```

### Adjusting Counter Speed

In `harts-interactions.js`, find the CONFIG object:
```javascript
const CONFIG = {
  counterDuration: 2000,  // Change this value (milliseconds)
};
```

### Enabling/Disabling Features

In `harts-interactions.js`, at the bottom of `initializeAll()`:
```javascript
// Comment out any features you don't want:
// initPageLoader();      // Disable page loader
// initScrollProgress();  // Disable progress bar
// initParallax();        // Enable parallax (uncomment to enable)
```

### Customizing Brand Colors

The CSS uses WordPress theme colors by default. To override:
```css
:root {
  --harts-primary: #1e3a5f;      /* Your primary blue */
  --harts-secondary: #2c5282;    /* Secondary blue */
  --harts-accent: #ed8936;       /* Accent orange */
}
```

---

## Feature Details

### Scroll Animations

Elements with these classes will animate on scroll:
- `.harts-animate` - Fade up
- `.harts-animate-left` - Slide from left
- `.harts-animate-right` - Slide from right
- `.harts-animate-scale` - Scale up

Add delay classes for staggered effects:
- `.harts-delay-1` through `.harts-delay-5`

### Stats Counter

The counter automatically detects numbers in h3 elements with format:
- `10+` - Counts to 10, displays "+"
- `1000+` - Counts to 1000, displays "+"
- `30+` - Counts to 30, displays "+"

### Program Cards

Cards in the tertiary background section automatically get:
- Hover lift effect
- 3D tilt on mouse movement
- Gradient overlay on hover

### Event Cards

Cards with `.is-style-section-2` class receive:
- Animated gradient border on hover
- Lift and shadow effect
- Button scale on card hover

---

## Troubleshooting

### Animations not working?
1. Check that both CSS and JavaScript are loaded
2. Verify JavaScript console for errors (F12 > Console)
3. Ensure CSS is placed after theme styles

### Counter not counting?
1. Numbers must be in `h3` tags with specific format (e.g., "10+")
2. Ensure the stats section has proper class structure

### Page loader stuck?
1. Check for JavaScript errors
2. The loader removes itself after page load
3. Can be disabled in JavaScript if problematic

### Performance issues?
1. Enable reduced motion in browser settings
2. Disable parallax effect
3. Reduce animation durations in CSS

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

Animations gracefully degrade in older browsers.

---

## Files Reference

| File | Purpose | Installation |
|------|---------|--------------|
| `assets/css/harts-animations.css` | All animations and visual styles | WordPress Customizer > Additional CSS |
| `assets/js/harts-interactions.js` | Interactive features and counters | Header/Footer plugin |
| `templates/home-page-enhanced.html` | Updated page template | Page Editor (Code view) |

---

## Support

For additional customization or questions:
- Review the code comments for detailed explanations
- Test changes on a staging site first
- Back up your site before making major changes

---

*Last updated: December 2025*
*Created for HART'S Haiti Inc.*
