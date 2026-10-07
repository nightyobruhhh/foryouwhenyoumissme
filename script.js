// Edit the words and asset paths in this object to make these letters yours.
const letters = {
  pageTitle: "Open When — For Sumiko",
  recipient: "Sumiko",
  intro: {
    prelude: "You told me you miss me a lot, so...",
    invitation: "Open this when you miss me 🤍",
    button: "Open",
    spacerPrompt: "click to open",
  },
  main: {
    eyebrow: "A little something, just for you",
    title: "Open when...",
    subtitle: "Four little pieces of me, for whenever you need them",
    signoff: "Made with all my love",
  },
  images: {
    cat: "cat.png",
    spacer: "spacer.png",
    background: "bg.png.png",
  },
  envelopes: [
    {
      id: "miss-you",
      image: "env-pink.png",
      label: "Open when you miss me",
      kind: "message",
      photo: "us.jpeg",
      photoTitle: "A memory I love",
      caption: "Whenever I miss you, I look at this and remember how lucky I am to have you.",
      message: `My Sumiko,

If you're reading this, it means you're missing me, and I want you to know I'm missing you too. Probably even more.

Distance is annoying, but it has never changed one thing: you are the first person I think of when I wake up and the last one before I sleep.

Close your eyes for a second and imagine me hugging you tight. I'm there. I'm always there.

Until I can hold you for real, keep smiling for me, okay?

And another thing, you are the most important person to me.
Cuídate mi amor.
Te amo 3000.

Yours,
Govind 🤍`,
    },
    {
      id: "hard-day",
      image: "env-blue.png",
      label: "Open when today wasn't your day",
      kind: "message",
      message: `Mi amor,

Lo siento mucho, sé que hoy fue un día difícil. Desearía estar ahí contigo, con tu comida favorita, dándote abrazos y besitos calentitos.

Pase lo que pase, eso no te define. Eres más fuerte, mejor y más amable; eres muchísimo más que este día difícil.

Habrá días malos, pero yo siempre me quedaré y estaré ahí para ti, a un mensaje o una llamada de distancia.

Te llevaría afuera conmigo, a la playa, tomaría tu mano y caminaría contigo mientras te digo lo fuerte que eres y cuánto te quiero.

Siempre te amaré incondicionalmente, pase lo que pase.

Mi bebé, mi linda wawita.

Te amodoro muchísisisisisisisisimo más.

Cuídate.❤️
`,
    },
    {
      id: "feel-close",
      image: "env-red.png",
      label: "Open when you need to feel close to me",
      kind: "song",
      songTitle: "Ain't Nobody Else Like You",
      songTagline: "Press play and let this be me, singing to you.",
      song: "song.mp3",
      photo: "us2.jpeg",
      caption: "My favourite photo of us. Whenever I miss you, I look at this and feel like you're right next to me.",
      message: `I'm right here.

Maybe not in the same room, but always in your corner, always in your heart, always one message away.

Play the song, look at our photo, and feel me close.

Ain't nobody else like you, and there never will be. 🤍

Always yours,
Govind`,
    },
    {
      id: "poems",
      image: "env-poem.png",
      label: "Open when you need a poem",
      kind: "poem",
      poems: [
        `The False Shadows,
The False Lies,
I'll never let them be,
On your side,

I will take care of you,
I wanna touch your soft skin,
Gently with Gentles,
Loving you more than anyone ever had,

You are my princess,
You are the soft embrace of the golden sunlight,
You are the sweetest part of a chocolate cake,
Indeed,
You are the sweetest part of my life,
My wife,

I'll bring the moon,
I'll descend the stars,
I'll grow a flower garden,
I'll grow my love for you,
It's crazy but it's true,
There's nothing I won't do,
I'd risk it all for you,
For you.

Yours,
Vin`,
        `Was I dreaming?
When I feel your gentle touches,
Was I dreaming
When you said you love me,
Was I dreaming
When we shared our beautiful love.

Even if,
Those were dreams,
They are still a reality,
And always will be,
Our love,
Never was unreal,
It was pure,
It is pure,
It is deep,
Deeper than the ocean,
Beyond the skies.

You are my pretty young thing,
All 11:11 of mine,
Will always shine,
To ask to be with you forever,
Just forever.

My love,
You will always be my prettiest rainbow,
You would see a lot of love,
If you could see yourself through my eyes,
You will always be perfect,
My Princess.

Yours,
Vin`,
        `My Love,
My Hermosa,
I'm all yours,
Just like you are mine,
My beautiful sunshine,

I love you as my wife,
My life,
My everything,
My baby,
You are brave,
Strong and kind,
You have a beautiful mind,

You are my love,
My beautiful dove,
I'll always adore you,
I'll always love you,
Like you love the beaches,
Loving you as much as you love Patita,

Mi cielo,
You are all that I will ever ask for,
I'm calm like a steady lamp,
To love you forever.

I love you 3000.

Yours,
Vin`,
      ],
      labelPrefix: "A little poem for you",
    },
    {
      id: "together",
      image: "env-gold.png",
      label: "Open when we're finally together",
      kind: "reunion",
      reunionTitle: "We made it 🤍",
      plans: [
        "Hug for almost 10 mins",
        "Exchange our favorite drinks",
        "Sit in park with silence just the two of us",
        "Sing a song for each other",
        "See the beach sunset together",
        "Sign an agreement for staying together forever",
        "Love each other forever",
      ],
      message: `My Princess,

We finally made it, all the late night texts, all the shared joys, all the enjoyment, fixing things, accepting each other, it was always worth it.

We're finally together now and we will never let go of each other no matter what.

We can do the things we've always imagined to do when we were apart.

I've always waited for this moment, to be with you, to share my love with you.

Thank you for waiting, for trusting me, and for choosing me every single day, even from miles away.

I'm not letting go of our first hug for a very long time.

I love you Summy, our eternity starts now.

Yours,
Govind`,
    },
  ],
};

const loadingScreen = document.querySelector("#loadingScreen");
const introScreen = document.querySelector("#introScreen");
const spacerScreen = document.querySelector("#spacerScreen");
const mainScreen = document.querySelector("#mainScreen");
const envelopeGrid = document.querySelector("#envelopeGrid");
const letterOverlay = document.querySelector("#letterOverlay");
const letterDialog = document.querySelector("#letterDialog");
const letterContent = document.querySelector("#letterContent");
const closeLetterButton = document.querySelector("#closeLetterButton");
const confettiLayer = document.querySelector("#confettiLayer");
const announcement = document.querySelector("#announcement");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeAudio = null;
let lastEnvelopeButton = null;
let openingLetter = false;

// Preload all images before showing the first screen, so the opening feels ready.
function preloadImages(paths) {
  return Promise.all(paths.map((path) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(path);
    image.onerror = () => reject(new Error(`Could not load image: ${path}`));
    image.src = path;
  })));
}

// Keep screen changes in one place so every transition behaves consistently.
function showScreen(name) {
  const screens = {
    intro: introScreen,
    spacer: spacerScreen,
    main: mainScreen,
  };
  const nextScreen = screens[name];

  if (!nextScreen) {
    throw new Error(`Unknown screen: ${name}`);
  }

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen === nextScreen);
    screen.setAttribute("aria-hidden", String(screen !== nextScreen));
  });

  if (name === "main") {
    animateEnvelopeEntrance();
  }
}

// Stagger the envelopes, then start each envelope's own floating rhythm.
function animateEnvelopeEntrance() {
  const cards = envelopeGrid.querySelectorAll(".envelope-card");
  cards.forEach((card, index) => {
    card.classList.remove("is-entering", "is-floating");
    card.style.setProperty("--entrance-delay", `${index * 250}ms`);
    void card.offsetWidth;
    card.classList.add("is-entering");
    window.setTimeout(() => card.classList.add("is-floating"), 650 + index * 250);
  });
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

// Build the envelope grid from the editable letter data above.
function buildEnvelopes() {
  letters.envelopes.forEach((letter, index) => {
    const card = makeElement("article", "envelope-card");
    card.style.setProperty("--float-duration", `${4.5 + index * 0.7}s`);
    card.style.setProperty("--float-delay", `${index * -0.85}s`);

    const button = makeElement("button", "envelope-art");
    button.type = "button";
    button.setAttribute("aria-label", `${letter.label} — open letter`);
    button.addEventListener("click", () => openLetter(letter, button));

    const imageWrap = makeElement("span", "envelope-image-wrap image-shadow-wrap");
    const image = makeElement("img", "envelope-image");
    image.src = letter.image;
    image.alt = "";
    image.draggable = false;
    imageWrap.append(image);
    button.append(imageWrap, makeElement("span", "seal-sparkle"));

    const label = makeElement("p", "envelope-label", letter.label);
    card.append(button, label);
    envelopeGrid.append(card);
  });
}

function makePaper(message, title, extraClass = "") {
  const paper = makeElement("section", `letter-paper letter-animate${extraClass ? ` ${extraClass}` : ""}`);
  paper.setAttribute("aria-label", title || "A handwritten letter");
  if (title) paper.append(makeElement("h3", "paper-title", title));
  paper.append(makeElement("p", "paper-message", message));
  return paper;
}

function makePhotoFrame(photo, title, caption) {
  const frame = makeElement("figure", "retro-frame letter-animate");
  const image = makeElement("img", "frame-photo");
  image.src = photo;
  image.alt = title || caption;
  image.loading = "eager";
  frame.append(image);
  if (title) frame.append(makeElement("h3", "frame-title", title));
  if (caption) frame.append(makeElement("figcaption", "frame-caption", caption));
  frame.append(makeElement("span", "frame-heart", "♡"));
  return frame;
}

function makeAudioPlayer(title, tagline, source) {
  const player = makeElement("section", "audio-player letter-animate");
  player.setAttribute("aria-label", `Audio player: ${title}`);
  const audio = document.createElement("audio");
  audio.src = source;
  audio.preload = "metadata";

  const topLine = makeElement("div", "audio-topline");
  const playButton = makeElement("button", "audio-play-button", "▶");
  playButton.type = "button";
  playButton.setAttribute("aria-label", "Play audio");
  const audioCopy = makeElement("div", "audio-copy");
  const songTitle = makeElement("h3", "audio-title", title);
  const songTagline = makeElement("p", "audio-tagline", tagline);
  audioCopy.append(songTitle, songTagline);
  const wave = makeElement("span", "sound-wave");
  wave.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 5; index += 1) {
    const bar = makeElement("span");
    bar.style.setProperty("--bar-index", index);
    wave.append(bar);
  }
  topLine.append(playButton, audioCopy, wave);

  const progress = document.createElement("input");
  progress.className = "audio-progress";
  progress.type = "range";
  progress.min = "0";
  progress.max = "1000";
  progress.value = "0";
  progress.setAttribute("aria-label", "Audio position");

  const times = makeElement("div", "audio-times");
  const currentTime = makeElement("span", "", "0:00");
  const duration = makeElement("span", "", "0:00");
  times.append(currentTime, duration);
  const status = makeElement("p", "audio-status");
  status.setAttribute("role", "status");

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
  }

  function updateProgress() {
    currentTime.textContent = formatTime(audio.currentTime);
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    }
  }

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        status.textContent = "Sorry, the song couldn't be played. Check that the audio file is in the same folder.";
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    activeAudio = audio;
    player.classList.add("is-playing");
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pause audio");
    status.textContent = "";
  });
  audio.addEventListener("pause", () => {
    player.classList.remove("is-playing");
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play audio");
  });
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    updateProgress();
  });
  audio.addEventListener("ended", () => {
    progress.value = "0";
    currentTime.textContent = "0:00";
  });
  audio.addEventListener("error", () => {
    status.textContent = "Sorry, the song couldn't be loaded. Check that the audio file is in the same folder.";
  });
  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(progress.value) / 1000) * audio.duration;
      updateProgress();
    }
  });

  player.append(audio, topLine, progress, times, status);
  return player;
}

// Reuse the same paper and photo components in each letter.
function buildLetter(letter) {
  const heading = makeElement("h2", "letter-heading letter-animate", letter.label);
  heading.id = "letterTitle";
  const content = letter.kind === "reunion" ? [] : [heading];

  if (letter.kind === "message") {
    content.push(makePaper(letter.message));
    if (letter.photo) {
      content.push(makePhotoFrame(letter.photo, letter.photoTitle, letter.caption));
    }
  } else if (letter.kind === "memory") {
    const paper = makePaper(letter.message);
    paper.classList.add("has-glow", "letter-animate");
    content.push(paper, makePhotoFrame(letter.photo, letter.photoTitle, letter.caption));
  } else if (letter.kind === "song") {
    content.push(
      makeAudioPlayer(letter.songTitle, letter.songTagline, letter.song),
      makePhotoFrame(letter.photo, "", letter.caption),
      makePaper(letter.message),
    );
  } else if (letter.kind === "poem") {
    const poemMessage = letter.poems[Math.floor(Math.random() * letter.poems.length)];
    const poemPaper = makePaper(poemMessage, letter.labelPrefix || "A little poem for you");
    poemPaper.classList.add("has-glow");
    const randomReminder = makeElement("p", "paper-message", "A new little poem for you, every time you open this one ✨");
    randomReminder.style.marginTop = "18px";
    poemPaper.append(randomReminder);
    content.push(poemPaper);
  } else if (letter.kind === "reunion") {
    const reunionHeading = makeElement("h2", "reunion-heading letter-animate", letter.reunionTitle);
    reunionHeading.id = "letterTitle";
    const reunionPaper = makePaper(letter.message);
    reunionPaper.classList.add("letter-animate");
    const plans = makeElement("section", "reunion-plans letter-animate");
    plans.setAttribute("aria-labelledby", "reunionPlansTitle");
    const plansHeading = makeElement("h3", "reunion-plans-title", "Things we're going to do together");
    plansHeading.id = "reunionPlansTitle";
    const plansList = makeElement("ol", "reunion-plans-list");
    letter.plans.forEach((plan, index) => {
      const item = makeElement("li", "", plan);
      item.style.setProperty("--plan-index", index);
      plansList.append(item);
    });
    plans.append(plansHeading, plansList);
    content.push(reunionHeading, reunionPaper, plans);
  }

  letterContent.replaceChildren(...content);
  letterContent.querySelectorAll(".letter-animate").forEach((item, index) => {
    item.style.setProperty("--item-delay", `${80 + index * 100}ms`);
  });
}

// Pop the wax seal first, then reveal the shared letter overlay.
function openLetter(letter, envelopeButton) {
  if (openingLetter || letterOverlay.classList.contains("is-open")) return;
  openingLetter = true;
  lastEnvelopeButton = envelopeButton;
  envelopeButton.classList.add("is-sealing");

  window.setTimeout(() => {
    envelopeButton.classList.remove("is-sealing");
    buildLetter(letter);
    letterOverlay.classList.add("is-open");
    letterOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("letter-is-open");
    letterDialog.focus();
    openingLetter = false;

    if (letter.kind === "reunion") burstConfetti();
  }, reducedMotion.matches ? 0 : 480);
}

function closeLetter() {
  if (!letterOverlay.classList.contains("is-open")) return;
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }

  letterOverlay.classList.remove("is-open");
  letterOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("letter-is-open");
  confettiLayer.replaceChildren();
  if (lastEnvelopeButton) lastEnvelopeButton.focus();
}

function burstConfetti() {
  if (reducedMotion.matches) return;

  const colors = ["#c76878", "#e6c472", "#fff0df", "#9b5662", "#f7d4d6"];
  const pieces = [];
  for (let index = 0; index < 32; index += 1) {
    const piece = makeElement("span", "confetti-piece");
    const angle = (Math.PI * 2 * index) / 32;
    const distance = 90 + Math.random() * 190;
    piece.style.setProperty("--confetti-x", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--confetti-y", `${Math.sin(angle) * distance + 160}px`);
    piece.style.setProperty("--confetti-rotation", `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    pieces.push(piece);
  }
  confettiLayer.replaceChildren(...pieces);
  window.setTimeout(() => confettiLayer.replaceChildren(), 1700);
}

function setUpPage() {
  document.title = letters.pageTitle;
  document.querySelector("#introPrelude").textContent = letters.intro.prelude;
  document.querySelector("#introTitle").textContent = letters.intro.invitation;
  document.querySelector("#openButton").textContent = letters.intro.button;
  document.querySelector("#clickToOpen").textContent = letters.intro.spacerPrompt;
  document.querySelector("#mainTitle").textContent = letters.main.title;
  document.querySelector("#mainSubtitle").textContent = letters.main.subtitle;
  document.querySelector("#mainEyebrow").textContent = letters.main.eyebrow;
  document.querySelector("#mainSignoff").prepend(
    document.createTextNode(`${letters.main.signoff}, for ${letters.recipient} `),
  );

  const catSticker = document.querySelector("#catSticker");
  catSticker.src = letters.images.cat;
  const spacerImage = document.querySelector("#spacerImage");
  spacerImage.src = letters.images.spacer;
  document.body.style.backgroundImage = `url("${letters.images.background}")`;

  buildEnvelopes();
  document.querySelector("#openButton").addEventListener("click", () => showScreen("spacer"));
  document.querySelector("#spacerButton").addEventListener("click", () => showScreen("main"));
  closeLetterButton.addEventListener("click", closeLetter);
  letterOverlay.querySelector("[data-close-letter]").addEventListener("click", closeLetter);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLetter();
  });

  const imagePaths = [
    letters.images.background,
    letters.images.cat,
    letters.images.spacer,
    ...letters.envelopes.flatMap((letter) => [letter.image, ...(letter.photo ? [letter.photo] : [])]),
  ];

  preloadImages([...new Set(imagePaths)])
    .then(() => {
      loadingScreen.classList.add("is-hidden");
      window.setTimeout(() => loadingScreen.remove(), 550);
    })
    .catch((error) => {
      loadingScreen.querySelector(".loading-message").textContent = `${error.message} Keep the images beside index.html and reload.`;
      announcement.textContent = error.message;
    });
}

setUpPage();
