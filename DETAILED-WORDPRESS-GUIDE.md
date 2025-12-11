# HART'S Haiti Website Enhancement
## Detailed WordPress Implementation Guide

This guide provides step-by-step instructions with detailed explanations for adding the enhanced animations and interactive features to your WordPress.com website.

---

## Table of Contents
1. [Before You Begin](#before-you-begin)
2. [Step 1: Adding Custom CSS](#step-1-adding-custom-css)
3. [Step 2: Adding Custom JavaScript](#step-2-adding-custom-javascript)
4. [Step 3: Updating Your Home Page](#step-3-updating-your-home-page)
5. [Testing Your Changes](#testing-your-changes)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Before You Begin

### What You'll Need
- Admin access to your WordPress.com dashboard
- About 15-20 minutes
- The three files from this repository:
  - `assets/css/harts-animations.css`
  - `assets/js/harts-interactions.js`
  - `templates/home-page-enhanced.html`

### Important Notes
- **WordPress.com Business or eCommerce plan** is required to add custom CSS/JavaScript
- If you're on a free or Personal plan, you may need to upgrade
- Always preview changes before publishing

---

## Step 1: Adding Custom CSS

The CSS file contains all the animation styles, hover effects, and visual enhancements.

### Method A: Using the WordPress Customizer (Easiest)

1. **Log in to WordPress**
   - Go to `hartshaitiorg.wordpress.com/wp-admin`
   - Enter your username and password

2. **Open the Customizer**
   - In the left sidebar, click **"Appearance"**
   - Click **"Customize"**
   - A new page will open showing your site preview

3. **Find Additional CSS**
   - In the Customizer sidebar, scroll down
   - Click **"Additional CSS"**
   - You'll see a text box where you can add custom CSS

4. **Add the CSS Code**
   - Open the file `assets/css/harts-animations.css` from this repository
   - Select ALL the code (Ctrl+A or Cmd+A)
   - Copy it (Ctrl+C or Cmd+C)
   - Click inside the "Additional CSS" text box in WordPress
   - Paste the code (Ctrl+V or Cmd+V)

5. **Preview and Publish**
   - Look at the preview on the right side
   - If everything looks good, click the blue **"Publish"** button at the top
   - If you see any issues, click **"Discard Changes"** and try again

### Method B: Using a Plugin (Alternative)

If Method A doesn't work or you want more control:

1. **Install "Simple Custom CSS and JS" Plugin**
   - Go to **Plugins > Add New**
   - Search for "Simple Custom CSS and JS"
   - Click **"Install Now"**
   - Click **"Activate"**

2. **Add Custom CSS**
   - Go to **Custom CSS & JS** in the left sidebar
   - Click **"Add Custom CSS"**
   - Give it a title: "HART'S Animations"
   - Paste the CSS code from `harts-animations.css`
   - In the right sidebar, make sure "Internal" is selected
   - Click **"Publish"**

---

## Step 2: Adding Custom JavaScript

The JavaScript file makes the animations work, including the counting numbers, back-to-top button, and interactive card effects.

### Understanding WordPress.com JavaScript Limitations

**Important:** WordPress.com has restrictions on adding JavaScript:
- **Free/Personal/Premium plans**: Cannot add custom JavaScript
- **Business/eCommerce plans**: Can add JavaScript via plugins

### Method A: Using the "Insert Headers and Footers" Plugin

1. **Install the Plugin**
   - Go to **Plugins > Add New**
   - Search for "Insert Headers and Footers" (by WPCode)
   - Click **"Install Now"**
   - Click **"Activate"**

2. **Access the Plugin Settings**
   - In the left sidebar, find **"Code Snippets"** or **"WPCode"**
   - Click on it

3. **Add New Code Snippet**
   - Click **"+ Add Snippet"**
   - Click **"Add Your Custom Code (New Snippet)"**
   - Click **"Use Snippet"**

4. **Configure the Snippet**
   - **Name:** Enter "HART'S Interactive Features"
   - **Code Type:** Select **"JavaScript Snippet"**
   - **Code:** Paste the entire contents of `assets/js/harts-interactions.js`

5. **Set the Location**
   - Scroll down to the **"Insertion"** section
   - For **"Location"**, select **"Site Wide Footer"**
   - This ensures the code loads after the page content

6. **Activate and Save**
   - Toggle the switch at the top to **"Active"**
   - Click **"Save Snippet"**

### Method B: Using "Simple Custom CSS and JS" Plugin

If you installed this plugin for CSS:

1. **Add Custom JavaScript**
   - Go to **Custom CSS & JS** in the left sidebar
   - Click **"Add Custom JS"**
   - Give it a title: "HART'S Interactions"
   - Paste the JavaScript code from `harts-interactions.js`

2. **Configure Settings**
   - In the right sidebar:
     - **Linking type:** Internal
     - **Where on page:** Footer
     - **Where in site:** Front-end
   - Click **"Publish"**

### Method C: For Self-Hosted WordPress (WordPress.org)

If you have a self-hosted WordPress site:

1. **Access your theme files via FTP or File Manager**

2. **Upload the JavaScript file**
   - Upload `harts-interactions.js` to `/wp-content/themes/your-theme/js/`

3. **Edit functions.php**
   - Add this code at the end of your theme's `functions.php`:

```php
// HART'S Haiti Custom Scripts
function harts_custom_scripts() {
    wp_enqueue_script(
        'harts-interactions',
        get_template_directory_uri() . '/js/harts-interactions.js',
        array(),
        '1.0.0',
        true // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'harts_custom_scripts');
```

---

## Step 3: Updating Your Home Page

Now you need to update your home page content to include the animation classes.

### Step-by-Step Instructions

1. **Go to Your Pages**
   - In WordPress admin, click **"Pages"** in the left sidebar
   - Find your **Home** page (it might be called "Home", "Front Page", or similar)
   - Click to **edit** it

2. **Switch to Code Editor**
   - Look at the top-right corner of the editor
   - Click the **three dots (⋮)** menu
   - Select **"Code editor"**
   - You'll see the raw HTML/block code

3. **Backup Your Current Content**
   - **IMPORTANT:** Before making changes, copy ALL the current code
   - Paste it into a text file on your computer (e.g., `backup-home-page.txt`)
   - Save it somewhere safe

4. **Replace with Enhanced Code**
   - Select ALL the code in the editor (Ctrl+A or Cmd+A)
   - Delete it
   - Open `templates/home-page-enhanced.html` from this repository
   - Copy ALL the code from that file
   - Paste it into the WordPress editor

5. **Switch Back to Visual Editor**
   - Click the **three dots (⋮)** menu again
   - Select **"Visual editor"**
   - You should see your page with all the content

6. **Preview Your Changes**
   - Click **"Preview"** at the top
   - Select **"Preview in new tab"**
   - Check that everything looks correct

7. **Update/Publish**
   - If everything looks good, click **"Update"** (or "Publish" if it's a new page)

---

## Testing Your Changes

After implementing all three steps, test these features:

### Checklist

| Feature | How to Test | Expected Result |
|---------|-------------|-----------------|
| Scroll animations | Scroll down the page slowly | Elements should fade in as they enter view |
| Counter animation | Scroll to the stats section | Numbers should count up (10+, 1000+, 30+, 5) |
| Button hover | Hover over any button | Button should lift up with shadow |
| Image hover | Hover over any image | Image should zoom slightly |
| Back-to-top button | Scroll down the page | A round button appears in bottom-right corner |
| Progress bar | Scroll down | A colored bar at the top shows scroll progress |
| Program cards | Hover over program cards | Cards should lift and tilt slightly |
| Event cards | Hover over event cards | Cards should glow with animated border |

### Testing on Different Devices

1. **Desktop:** Test on Chrome, Firefox, Safari, Edge
2. **Tablet:** Check responsive layout
3. **Mobile:** Ensure animations work on touch devices

---

## Troubleshooting Common Issues

### Issue: CSS Not Working

**Symptoms:** No visual changes, no hover effects

**Solutions:**
1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check if CSS was saved correctly in Customizer
3. Make sure there are no error messages in the CSS editor
4. Try viewing in an incognito/private browser window

### Issue: JavaScript Not Working

**Symptoms:** Counters don't animate, no back-to-top button, no scroll animations

**Solutions:**
1. Check browser console for errors:
   - Press F12 to open Developer Tools
   - Click "Console" tab
   - Look for red error messages
2. Verify the plugin is active
3. Make sure JavaScript is set to load in "Footer"
4. Check your WordPress plan supports custom JavaScript

### Issue: Page Layout Broken

**Symptoms:** Content appears wrong, missing sections, strange spacing

**Solutions:**
1. Restore your backup (the code you saved earlier)
2. Check that you copied ALL the code from the template file
3. Make sure you're in "Code editor" mode when pasting
4. Verify the header and footer template parts match your theme

### Issue: Animations Too Fast/Slow

**Customization:**

To change animation speed, modify these values in the CSS:

```css
/* Find this section in harts-animations.css */
:root {
  --harts-transition-fast: 0.2s ease;    /* Change 0.2s to adjust */
  --harts-transition-medium: 0.4s ease;  /* Change 0.4s to adjust */
  --harts-transition-slow: 0.6s ease;    /* Change 0.6s to adjust */
}
```

### Issue: Counter Numbers Wrong

**Fix:**
The counter looks for numbers in this format: `10+`, `1000+`, `30+`, `5`

Make sure your stats section has h3 headings with exactly these formats.

---

## Quick Reference: File Locations

| What | Where to Add in WordPress |
|------|--------------------------|
| CSS Code | Appearance > Customize > Additional CSS |
| JavaScript Code | WPCode Plugin > Add Snippet > Footer |
| Page Template | Pages > Home > Edit > Code Editor |

---

## Need More Help?

### WordPress.com Support
- Visit: https://wordpress.com/support/
- Use the Help button in your dashboard

### Plugin Documentation
- WPCode: https://wpcode.com/docs/
- Simple Custom CSS & JS: https://developer.wordpress.org/

### Video Tutorials
Search YouTube for:
- "How to add custom CSS to WordPress"
- "How to add JavaScript to WordPress"
- "WordPress block editor code view"

---

## Summary

You've successfully enhanced your HART'S Haiti website with:

1. **Smooth scroll animations** that make content appear elegantly
2. **Interactive counters** that show your impact dynamically
3. **Engaging hover effects** on buttons, images, and cards
4. **Modern UI elements** like progress bars and back-to-top buttons
5. **Professional polish** while keeping your brand identity

Your website now provides a more engaging, modern experience for visitors while maintaining all your original content, branding colors, and messaging.

---

*Guide created for HART'S Haiti Inc.*
*Last updated: December 2025*
