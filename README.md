# LA Orthos GitHub Pages Static Site

## Files
- `index.html`
- `about.html`
- `providers.html`
- `provider.html?slug=...`
- `services.html`
- `service.html?slug=...`
- `conditions.html`
- `condition.html?slug=...`
- `locations.html`
- `location.html?slug=...`
- `contact.html`
- `assets/styles.css`
- `assets/script.js`
- `assets/data.js`

## Deploy to GitHub Pages
1. Create a new GitHub repo.
2. Upload every file from this folder to the repo root.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Pick your default branch and `/root`.
6. Save.
7. Replace `YOUR-GITHUB-PAGES-URL` in `robots.txt` and `sitemap.xml` with your real Pages URL.

## Notes
- This build uses remote image URLs from `laorthos.com`.
- Booking and payment buttons are already pointed at external URLs.
- Provider and detail pages are driven by `assets/data.js`.
- To edit site content, update `assets/data.js`.
