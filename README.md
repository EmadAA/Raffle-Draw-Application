# Raffle Draw Application

A simple, fully client-side raffle draw app built with vanilla JavaScript, HTML, CSS, and Bootstrap 5. Enter participant names, set how many winners you need, and draw them one by one with a rolling animation — no repeats, no refresh needed.

---

## Project Structure

```
raffle-draw/
├── index.html   — markup and layout
├── style.css    — custom styles and responsive rules
├── script.js    — all application logic
└── README.md    — this file
```

---

## How to Use

1. I have published it to GitHub Pages, so you can open the link in any modern browser — no server or build step needed.
2. Type participant names in the textarea, separated by commas and a space (e.g. `Emad, Adil, Jamil`), then press **Enter**.
3. Repeat step 2 as many times as you like to add more batches of names.
4. Click **Show All Names** to verify the full participant list.
5. Set the **Number of Winners** (default is 3, max is 20).
6. Click **Give A Try** to draw one winner at a time with a rolling animation.
7. Keep clicking **Give A Try** until all winner slots are filled.
8. Use **Copy Winners** or **Download as TXT** to save the results.
9. Click **New Round** to clear winners and start a fresh draw with the same participants.

---

## Features

### Name Entry
- Enter multiple names at once, separated by `, ` (comma + space).
- Press **Enter** to add them — the field clears automatically after each batch.
- Use **Show All Names / Hide All Names** to toggle the participant list.

### Dynamic Winner Slots
- Set the number of winners between 1 and 20 before drawing.
- Winner slots are labelled by ordinal (First, Second, Third… up to Twentieth).
- Changing the winner count resets the slots and the draw pool automatically.

### Fair Draw — No Repeats
- On the first click, all participant names are shuffled into a pool.
- Each click picks one winner randomly from the remaining pool and removes them permanently.
- A name can never be drawn twice in the same session.

### Rolling Animation
- The display field cycles through random names before landing on the winner, giving a slot-machine effect.
- The **Give A Try** button is disabled during the animation and re-enables once it finishes, preventing duplicate draws from rapid clicking.

### New Round
- The **New Round** button clears all winner slots and resets the draw pool.
- Participant names are kept so you don't have to re-enter them.
- A confirmation prompt prevents accidental resets.

### Export Winners
- **Copy Winners** — copies the winner list to your clipboard. The button briefly shows "Copied!" as confirmation.
- **Download as TXT** — downloads a `winners.txt` file with a numbered list of winners.
- Both buttons only include slots that have been filled; empty slots are ignored.

### Responsive Design
- Layout works on desktop, tablet, and mobile.
- On screens below 768px, the two columns stack vertically for comfortable use on phones.

---

## Built With

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- [Bootstrap 5.3.3](https://getbootstrap.com/)

---

## Known Limitations

- Names and winners are stored in memory only — refreshing the page resets everything.
- The app does not validate for duplicate names on entry; if the same name is entered twice across separate Enter presses, it will appear twice in the pool.
- Clipboard copy (`navigator.clipboard`) requires the page to be served over HTTPS or `localhost` in some browsers.

---

## Author

**Emad Uddin Adil**
[Portfolio](https://emadaa.github.io/Emad-Uddin-Adil/)

Special thanks to **Stack Learner** and **HM Nayeem**.
