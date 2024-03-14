// All the projects data

// TODO : LINKS

export const ProjectListInfo = [
  // Flipper
  {
    icon: "https://www.youtube.com/embed/SVi54v19RmY?si=w_dfB-CQd_LBLB9o",
    title: "Flipp3r",
    tags: ["C#", "Unity", "Animation", "Game"],
    description:
      "The game Flipp3r is a three-player pinball game projected onto a physical installation where artwork is created to produce a depth effect: augmented artwork. The rules of this pinball game are simple: you must defeat the boss by aiming at its weak points located on the playing field.",
    carousel: [
      "https://www.youtube.com/embed/SVi54v19RmY?si=w_dfB-CQd_LBLB9o",
      "https://www.youtube.com/watch?v=hILuqW0fJvU",
    ],
    content: [
      "Flipp3r",
      "Flipp3r was conceived as my bachelor project and showcased at the NIFFF 2022 event in Neuchâtel. Collaborating closely with another student, Diogo Lopes da Silva, and in partnership with Neuchâtelois artist Mandrill and his colleague Christopher Lanza, we brought this project to life. Our objective was to create a unique pinball experience designed for three players. The project was a large wooden structure, serving as the pinball game's framework. Onto this structure, we projected a custom-designed game. Mandril's drawings overlaid on the projection enhanced the structure, infusing it with vibrancy and dimension.   Players interacted with the game using buttons positioned along the sides of the pinball structure, controlling their flippers to propel and maneuver three balls across the field, aiming to rack up points. Additionally, strategic targets strategically placed on the field unlocked special cinematic sequences when successfully hit by players.",
      "Specifics",
      "The game was created using Unity, with my primary responsibility being the development of a robust physical system to facilitate high-speed ball movement without encountering glitches in the Unity Physics Engine. Moreover, I handled the game's animation and visual effects, managed the game logic, integrated sound effects, and established connections to the wooden structure.",
    ],
    others: [
      "https://lecourrier.ch/2022/07/05/un-flipper-geant-fantastique-au-nifff/",
      "https://www.he-arc.ch/agenda/flipper-en-dessin-augmente-presente-dans-le-cadre-du-nifff/",
      "https://www.rtn.ch/rtn/Actualite/Region/20220706-Bebe-cyborg-et-flipper-du-futur-a-NIFFF-Invasion.html",
      "https://m4ndril.com/post/690212134235340800/article-httpslecourrierch20220705un-flippe",
    ],
    link: "https://github.com/Psemata/flipp3r",
  },
  // Sightless
  {
    icon: "https://www.youtube.com/embed/LoqDiGrBrtE?si=c1UYTBs33aB4clQq",
    title: "Sightless",
    tags: ["C#", "Unity", "Animation", "Game"],
    description:
      "Sightless is a platform and horror game where players step into the shoes of Karna, a young boy who has suffered eye injuries, rendering him blind. His objective is to escape from a threatening forest... This game was made in collaboration with the swiss art school Ceruleum",
    carousel: ["https://www.youtube.com/embed/LoqDiGrBrtE?si=c1UYTBs33aB4clQq"],
    content: [
      "Sightless",
      "'Sightless' is an immersive platform and horror game that plunges players into the shoes of Karna, a young boy who has tragically lost his sight due to eye injuries. Tasked with escaping from a menacing forest, Karna must rely on his wits to survive. This collaborative project was developed in partnership with the Swiss art school Ceruleum. Using a unique mechanic, players can visualize their surroundings by clapping their hands, allowing Karna to perceive the dangers lurking in the forest. Navigating through the perilous environment, players must evade a lurking monster while unraveling puzzles along the way. To avoid detection by the monster, Karna can seek refuge in bushes and outmaneuver the creature's pursuit. Only through cunning strategy and quick thinking can players guide Karna to safety amidst the haunting forest.",
      "Specifics",
      "The graphic part was mostly realized by the members of the “Ceruleum” school. However, we discussed altogether about the story, the design and the gameplay together. Aditionnally, in this group project, my role was to focus on developing the character's controls and implementing his animations.",
    ],
    link: "https://github.com/Psemata/sightless",
  },
  // Purrse
  {
    icon: "",
    title: "Purrse",
    tags: ["Laravel", "PhP", "VueJS", "Inertia", "TailwindCSS"],
    description:
      "Purrse is a web application that lets you visualize expenses incurred or to be incurred. Lists can be created to group together invoices, payments and other expenses linked to a project, a flat-share, a vacation or a party. In these lists, the user can create a space, i.e. a sub-layer of the list theme. For example, this theme could represent a task such as buying food for a flat-share. Each list can be joined by other users. It is also possible to distribute an expense made by a user to all the other people he selects.",
    carousel: [],
    content: [
      "Purrse",
      "Purrse is a web application crafted with Laravel, Vue.js, and Tailwind CSS. Its primary goal is to facilitate expense management within group settings. For instance, in a shared living arrangement such as a colocation, when someone makes a purchase—like buying groceries—the total expense is automatically divided among the members. This ensures transparency and clarity, as each individual knows precisely how much they owe the purchaser.",
      "Specifics",
      "My responsibility entailed designing the user interface utilizing fundamental editing skills on Paint.NET. Subsequently, I implemented the design using HTML, Vue.js, and Tailwind CSS.",
    ],
    link: "https://github.com/HE-Arc/purrse",
  },
  // Camelote
  {
    icon: "",
    title: "Camelote",
    tags: ["Unity", "C#", "PhP", "PostSQL", "Google Maps SDK", "Game"],
    description: "",
    carousel: [],
    content: [
      "Camelote",
      "Camelote is a game developed as the flagship project during my third year at the HE-Arc Engineering school. Inspired by the immensely popular 'Pokémon Go,' Camelote invites players to embark on a journey where the objective is to explore their surroundings with their phone in hand, collecting resources from well-known locations. These resources are then utilized to enhance and upgrade their own castle, with the ultimate aim of becoming the most illustrious ruler in Camelote.",
      "Specifics",
      "The game was developed using Unity along with the Unity UI Toolkit for crafting the user interface. Leveraging the Google Maps SDK, the game environment was meticulously modeled, generating 3D representations of buildings, roads, and public locations to immerse players in their surroundings. To manage game data, a database was utilized, accessible through PHP scripts for seamless integration and efficient storage of player information and progress.",
    ],
    link: "https://github.com/HE-Arc/purrse",
  },
  // Pixel Dunker
  {
    icon: "",
    title: "Pixel Dunker",
    tags: ["C#", "Unity", "Animation", "Game"],
    description:
      "Pixel Dunker, made with the Unity engine, is a dynamic basketball versus game. The player have to win a basketball game using different powers available on the field and the best of theirs wits",
    carousel: [],
    content: [
      "Pixel Dunker",
      "Pixel Dunker is an exhilarating and dynamic family game where two players engage in a fast-paced basketball showdown. With a plethora of traps and abilities at their disposal, competitors shoot for the highest score to emerge victorious. Accessible via both controller and keyboard inputs, Pixel Dunker offers versatile gameplay options to accommodate different player preferences and styles. Whether duking it out with friends or family, the game promises hours of energetic fun and excitement.",
      "Specifics",
      "The project draw its inspiration from games such as Tricky Tower or Towerfall Ascension, the objective was to craft a local multiplayer game to enjoy as a group. In the Pixel Dunker project, my role involved implementing the character controls and creating the visual designs for various aspects of the game. This encompassed crafting character designs, designing traps, and creating sprites for different abilities.",
    ],
    link: "https://github.com/Psemata/pixel-dunker",
  },
  // Jeu de Dame X
  {
    icon: "",
    title: "Jeu de Dame X",
    tags: [".NET", "C#", "WPF", "Game"],
    description: "",
    carousel: [],
    content: [
      "Jeu de Dame X",
      "'Jeu de Dame X' is a unique take on the classic game of checkers, introducing special interactions that add a strategic twist. Each time a pawn is captured from your side, your 'power' gauge gradually fills up. Upon reaching certain thresholds, you gain access to special powers that can tip the balance of the game in your favor. These powers, along with their required percentages, include:\n\n- 15%: Grants the ability to make two moves in a single turn.\n\n- 50%: Allows the transformation of a regular pawn into a super pawn for one turn.\n\n- 100%: Enables the player to freely remove an opponent's pawn from the board.",
      "Specifics",
      "In preparation for developing the game, we meticulously analyzed the rules of traditional checkers, ensuring a thorough understanding of its mechanics. Multiple tests were conducted to evaluate the integration of the special powers and to assess their impact on gameplay, ensuring they wouldn't disrupt the balance of the game. Additionally, extensive research was conducted to determine if similar games already existed in the market, allowing us to identify what would be the best ways to perfect the application. In this group project, my responsibilities encompassed designing the game board, crafting the pawn pieces, and creating the user interface (UI) elements. Furthermore, I took charge of implementing the fundamental gameplay mechanics, including the selection of pawns upon user interaction and enabling their movement upon clicking the board.",
    ],
    link: "https://github.com/Psemata/pixel-dunker",
  },
  // PJTG
  {
    icon: "",
    title: "PJTG",
    tags: ["Unity", "C#", "Animation", "Game"],
    description: "",
    carousel: [],
    content: [
      "PJTG",
      "'PJTG,' short for 'Plus jamais trop gros' (Never too fat again), is an engaging rhythm game where players must quickly tap corresponding keyboard keys to fend off incoming junk food enemies. The objective is to prevent the player character from being hit by the villainous onslaught of unhealthy treats. Each successful evasion keeps the player fit, while failure results in the character progressively enlarging until they eventually explode. The primary goal of the game is to maintain fitness by effectively combating the incoming waves of junk food and surviving for as long as possible. The game was developed during a GameJam centered around the theme 'Always more.' Our group opted to explore the theme of eating disorders, leveraging the rhythm game genre to convey the message. This choice allowed us to juxtapose the extravagant, high-paced nature of rhythm games with the underlying narrative of struggling with the need to constantly push oneself further and beyond, mirroring the relentless pursuit often associated with eating disorders.",
      "Specifics",
      "Our inspiration stemmed from a mini-game featured in the PSP game 'Daxter.' In this mini-game, players combat waves of enemies utilizing a combination of attacks and combos. In this project, my responsibilities centered around crafting the Game Controller and designing the game controls. This involved creating the animations and implementing functionality for the arms to dynamically respond to the keys being touched. Additionally, I developed systems to monitor the player's health status and determine if the game was reaching its conclusion.",
    ],
    link: "https://github.com/Psemata/pixel-dunker",
  },
  // Dwar
  {
    icon: "",
    title: "Dwar",
    tags: ["Qt", "C++", "Game"],
    description:
      "Dwar is a tactical RPG where the user have to fight an army of Dwarves controlled by an AI. There a multiple difficulty choices and the player's army is customizable.",
    carousel: [],
    content: [
      "Dwar",
      "'Dwar' is a tactical RPG inspired by the renowned franchise 'Fire Emblem.' In this game, players assemble their army of dwarven warriors to engage in strategic battles against an AI opponent. Each soldier belongs to a distinct group, each with its own unique abilities and characteristics that can aid the player in various ways. The ultimate objective of 'Dwar' is to lead your army to victory by decimating the AI's forces and emerging triumphant in battle. With strategic planning and skillful maneuvering, players can outwit their opponent and claim victory on the battlefield.",
      "Specifics",
      "As previously mentioned, the game draws heavy inspiration from the 'Fire Emblem' franchise, resulting in gameplay that shares many similarities with the beloved series. In this group project, my tasks included creating the sprites for the dwarven soldiers, designing the user interface (UI) for the game, and implementing the artificial intelligence (AI) for the opponent.",
    ],
    link: "https://github.com/Psemata/dwar",
  },
  // Piarco Tile
  {
    icon: "",
    title: "Piarco Tile",
    tags: [".NET", "Xamarin", "C#", "WPF", "Game"],
    description: "",
    carousel: [],
    content: [
      "Piarco Tile",
      "'Piarco Tile' is an Android piano rhythm game where players tap on one of four corresponding tiles to match the music's rhythm. The game offers a variety of songs for players to enjoy, and their score is recorded based on their accuracy in hitting the tiles. Whether they miss entirely or hit the tile perfectly, their performance is tracked, adding to the challenge and enjoyment of the game.",
      "Specifics",
      "'Piano Tile' is an immensely popular game, and we were inspired to create our own unique version! Drawing inspiration from the diverse array of existing versions and the game 'Osu!', we set out to craft an experience that pays homage to the original while offering our own distinct twist. In this project, my primary job was to design and develop the user interface (UI) for the application. This included ensuring seamless interaction with the phone's touch functionality, optimizing touch responsiveness, and implementing smooth navigation between different interfaces within the application.",
    ],
    link: "https://github.com/Psemata/dwar",
  },
  // Starc
  {
    icon: "",
    title: "Starc",
    tags: ["Kotlin", "Android", "App"],
    description: "",
    carousel: [],
    content: [
      "Starc",
      "'Starc' is a mobile application that allows users to observe various stars and constellations above their heads. Users can navigate the celestial landscape either by utilizing the gyroscope for a dynamic experience or by using their fingers to explore specific stars.",
      "Specifics",
      "We drew inspiration from the widely acclaimed software Stellarium and aimed to create our own compact version tailored for pocket-sized devices. In this group project, my role involved creating the visual representations of stars and constellations. Additionally, I was responsible for designing the user interface (UI) and implementing a pop-up system to display the data of clicked stars.",
    ],
    link: "https://github.com/Psemata/dwar",
  },
  // Bio Sensation
  {
    icon: "",
    title: "Bio Sensation",
    tags: ["HTML", "PhP", "CSS", "Javascript", "Spotify"],
    description: "",
    carousel: [],
    content: [
      "Bio Sensation",
      "'Bio Sensation' is a web application crafted using HTML, PHP, and CSS, leveraging the Spotify Web API. Its primary objective is to offer users personalized playlists based on their current location. Whether they're at the beach, in town, or elsewhere, Bio Sensation tailors the playlist to suit the ambiance, ensuring an immersive musical experience for the user.",
      "Specifics",
      "Out of curiosity and a desire to explore the Spotify API, we conceived the idea of 'Biomes,' where music is curated based on different environments or settings. And this is how Bio Sensation was born. In this project, my primary responsibility involved designing the user interface (UI) and crafting the overall interface experience.",
    ],
    link: "https://github.com/Psemata/dwar",
  },
  // Arc Attorney
  {
    icon: "",
    title: "Arc Attorney",
    tags: ["Java", "LibGDX", "Game"],
    description: "",
    carousel: [],
    content: [
      "Arc Attorney",
      "Arc Attorney is a multiplayer game where users connect to a server to engage in discussions about a preestablished trial and collectively work to solve it. Each player assumes a distinct role, including the defendant, the accuser, and the judge. The game was developed using Java and LibGDX for the user interface (UI), providing a seamless and immersive experience for players.",
      "Specifics",
      "We drew inspiration from the 'Ace Attorney' franchise and sought to create a multiplayer experience inspired by its captivating courtroom drama. In this project, my responsibilities included creating the Java server and implementing connection management. Additionally, I was tasked with developing multiple windows and designing the user interface (UI) to ensure smooth navigation and an engaging experience for players.",
    ],
    link: "https://github.com/Psemata/dwar",
  },
  // Tontube
  {
    icon: "",
    title: "Tontube",
    tags: ["Spring", "Spring Boot", "Spring Security", "VueJS", "VueRouter"],
    description:
      "Tontube is a web application that combines a Spring backend with a Vue.js frontend, providing users with a homemade YouTube experience. Users can seamlessly add videos, watch a variety of content, and subscribe to other user accounts.",
    carousel: [],
    content: [
      "Tontube",
      "Tontube is a web application that combines a Spring backend with a Vue.js frontend, providing users with a homemade YouTube experience. Users can seamlessly add videos, watch a variety of content, and subscribe to other user accounts.",
      "Specifics",
      "The main inspiration for the application was the famous website YouTube.com. In the group project, my role involved designing the user interface (UI), implementing the UI components, and establishing the logistical connections between all the pages using Vue.js, Tailwind CSS, and Vue Router.",
    ],
    link: "https://github.com/Psemata/tontube",
  },
  // Arc-au-cou
  {
    icon: "",
    title: "Arc-au-cou",
    tags: ["Django", "Django RF API", "VueJS", "NuxtJS", "TailwindCSS", "Game"],
    description:
      "Every day, a new sudoku is proposed, and you have to solve it as quickly as possible. An overall ranking shows the best players of the day on Arc Au Cou.",
    carousel: [],
    content: [
      "Arc-Au-Cou",
      "Arc-Au-Cou is a web application that generates a fresh Sudoku puzzle daily. The objective is for users to solve the puzzle as swiftly as they can. Upon completion, the user's time is recorded in a leaderboard and compared with other players' times.",
      "Specifics",
      "We were inspired by games such as “motus”, “QuizUp” or “Wordscapes” which were and are still quite popular. The web application was developed using Django Rest Framework API, Vue.js, Nuxt, and Tailwind CSS. My role primarily focused on implementing the Sudoku functionality. This involved integrating the solving logic, creating the Sudoku puzzle itself, and managing its storage mechanism.",
    ],
    link: "https://github.com/HE-Arc/arc-au-cou",
  },
];
