# Save Laurelhurst K-8

A fact-based website from a Laurelhurst parent on the Portland Public Schools rightsizing proposal to convert Laurelhurst from a K-8 to a K-5.

Plain static HTML and CSS served by GitHub Pages. There is no build step.

- `index.html`: the front page, with a card for each issue
- `busing.html`: the busing cost math, with methods and sources
- `style.css`: shared styles (the color and font tokens are at the top)
- `site.js`: the hamburger menu on small screens
- `assets/lion.svg`: the Laurelhurst lion, traced to a vector so it stays sharp at any size

To add an issue page, copy `busing.html`, change the content inside `<main>`, set `aria-current="page"` on its nav link, and update the nav links in every page.

Every number on the site should link to its source.
