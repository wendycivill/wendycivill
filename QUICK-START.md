# HART'S Haiti - Quick Start Guide

## 3 Steps to Enhance Your Website

---

### STEP 1: Add CSS (5 minutes)

```
WordPress Admin → Appearance → Customize → Additional CSS
```

1. Open `assets/css/harts-animations.css`
2. Copy ALL the code
3. Paste into Additional CSS box
4. Click **Publish**

---

### STEP 2: Add JavaScript (5 minutes)

```
WordPress Admin → Plugins → Add New → Search "WPCode"
```

1. Install & activate **WPCode** plugin
2. Go to **Code Snippets → + Add Snippet**
3. Choose **"Add Your Custom Code"**
4. Name it: `HART'S Interactions`
5. Set Code Type: **JavaScript**
6. Open `assets/js/harts-interactions.js`
7. Copy ALL the code and paste
8. Set Location: **Site Wide Footer**
9. Toggle to **Active**
10. Click **Save Snippet**

---

### STEP 3: Update Home Page (5 minutes)

```
WordPress Admin → Pages → Home → Edit
```

1. Click **⋮** (three dots) → **Code editor**
2. **BACKUP:** Copy current code to a text file first!
3. Delete all code in editor
4. Open `templates/home-page-enhanced.html`
5. Copy ALL and paste into editor
6. Click **⋮** → **Visual editor**
7. Click **Preview** to check
8. Click **Update**

---

## Test Checklist

- [ ] Scroll down - elements fade in
- [ ] Stats numbers count up (10+, 1000+, 30+, 5)
- [ ] Buttons lift on hover
- [ ] Images zoom on hover
- [ ] Back-to-top button appears when scrolling
- [ ] Progress bar shows at top of page

---

## If Something Breaks

1. **CSS issues:** Go back to Customizer, delete CSS, re-paste
2. **JS issues:** Disable the WPCode snippet
3. **Page issues:** Restore from your backup file

---

## Files in This Repository

| File | Purpose |
|------|---------|
| `assets/css/harts-animations.css` | Animations & hover effects |
| `assets/js/harts-interactions.js` | Interactive features |
| `templates/home-page-enhanced.html` | Updated page template |
| `DETAILED-WORDPRESS-GUIDE.md` | Full instructions |
| `QUICK-START.md` | This file |

---

*Need more help? See DETAILED-WORDPRESS-GUIDE.md*
