import { ForumPost, Facility, GameSession, Task, ScheduleItem, UserProfile } from './types';

// Initial Profiles of the 3 main students from the mockups
export const USER_PROFILES: UserProfile[] = [
  {
    name: "Fiko Alexie",
    email: "fiko.alexie@binus.ac.id",
    department: "Computer Science",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/a181ac51-f03f-42f9-b7b5-53f536435c8b.jpg",
    level: 14,
    athleteTier: "Athletic",
    points: 920,
    futsalProgress: 82,
    basketballProgress: 45,
    tennisProgress: 68
  },
  {
    name: "Kevin Sukias",
    email: "kevinsukias27@gmail.com",
    department: "Computer Science",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/358b5564-adf8-4b75-a560-038582fcf63a.jpg",
    level: 16,
    athleteTier: "Elite Ath",
    points: 2400,
    futsalProgress: 94,
    basketballProgress: 60,
    tennisProgress: 75
  },
  {
    name: "Richtjhie Hartawan",
    email: "richtjhie.hartawan@binus.ac.id",
    department: "Computer Science",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/20961421-3353-400f-93c1-c263c931274a.jpg",
    level: 12,
    athleteTier: "Amateur III",
    points: 1800,
    futsalProgress: 40,
    basketballProgress: 35,
    tennisProgress: 80
  }
];

// Initial preloaded database for facilities
export const INITIAL_FACILITIES: Facility[] = [
  {
    id: "fac_1",
    title: "Binus Kijang Futsal Court",
    location: "Kijang Campus",
    campus: "Kijang Campus",
    rating: 4.9,
    pricePerHour: 120000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUQ-xpFyyYyXzvUT0DhdWa4p6yY3Rx7thGw&s",
    isVerified: true,
    amenities: [
      { icon: "shower", name: "Shower" },
      { icon: "wifi", name: "Wi-Fi" },
      { icon: "vitals", name: "First Aid" }
    ],
    fullyBooked: false
  },
  {
    id: "fac_2",
    title: "Alam Sutera Main Hall",
    location: "Alam Sutera Campus, Sports Complex",
    campus: "Alam Sutera",
    rating: 4.8,
    pricePerHour: 150000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA145ddY2ThBCZL6eTcRcir-Dr9l0A5wf4LA&s",
    isVerified: true,
    amenities: [
      { icon: "ac_unit", name: "Full AC" },
      { icon: "sports_basketball", name: "Pro Hoops" },
      { icon: "dry_cleaning", name: "Towel Svc" }
    ],
    fullyBooked: false
  },
  {
    id: "fac_3",
    title: "Syahdan Basketball Court",
    location: "Syahdan Campus",
    campus: "Syahdan Campus",
    rating: 4.7,
    pricePerHour: 110000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrc2xomvH-2z5Yy9ZFbDSZuy0ruxVw3RH-fA&s",
    isVerified: true,
    amenities: [
      { icon: "sports_basketball", name: "Concrete" },
      { icon: "wifi", name: "Wi-Fi" }
    ],
    fullyBooked: true // Syahdan Court is marked Booked
  },
  {
    id: "fac_4",
    title: "Senayan Aquatic Arena",
    location: "Senayan Campus, Level 1",
    campus: "Senayan Campus",
    rating: 5.0,
    pricePerHour: 80000,
    image: "https://gbk.id/upload/1619165400-aquatic_1.jpg",
    isVerified: true,
    amenities: [
      { icon: "pool", name: "Olympic" },
      { icon: "hot_tub", name: "Heated" }
    ],
    fullyBooked: false
  }
];

// Initial preloaded database for Game Sessions
export const INITIAL_SESSIONS: GameSession[] = [
  {
    id: "ses_1",
    title: "GBK Night Jog?",
    location: "Gelora Bung Karno Stadium",
    time: "18:00 - 20:00",
    playersJoined: 4,
    playersMax: 4,
    sport: "Running",
    level: "Casual",
    hostName: "David Sinambela",
    hostAvatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/866abfc1-af75-4133-a3de-1c0220c3ad05.jpg",
    hostId: "2802515942",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23UukNLYQRULFRNJKCbqe-sJCSwt3mTl5Sw&s",
    hasJoined: false
  },
  {
    id: "ses_2",
    title: "3v3 Half-Court Hoop",
    location: "Playfield Palmerah",
    time: "17:30 - 19:00",
    playersJoined: 5,
    playersMax: 6,
    sport: "Basketball",
    level: "Casual",
    hostName: "Gerald Adli",
    hostAvatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/ff842aa3-d5cc-470b-8407-181799771210.jpg",
    hostId: "2802524000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMHCnG3V3acaGf8MBzIxVtomMAOuYbhWC3Q&s",
    hasJoined: false
  },
  {
    id: "ses_3",
    title: "Mixed Doubles Tennis",
    location: "Tennis Plaza, Court 3",
    time: "09:00 - 11:00",
    playersJoined: 2,
    playersMax: 4,
    sport: "Tennis",
    level: "All Levels",
    hostName: "Andrew Christiansho",
    hostAvatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/448d0500-e942-4d75-9c66-27c2eed15635.jpg",
    hostId: "2802515942",
    image: "https://asset.ayo.co.id/image/venue/174731032673521.image_cropper_1747310022731.jpg_large.jpeg",
    hasJoined: false
  },
  {
    id: "ses_4",
    title: "Ranked Valorant",
    location: "Online (Discord/Server ID)",
    time: "20:00 - 21:30",
    playersJoined: 3,
    playersMax: 5,
    sport: "E-Sports",
    level: "Rank : Plat-Diamond",
    hostName: "Darren Christopher",
    hostAvatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/e80fd2f6-f08b-45f6-b970-7c9a154b423a.jpg",
    hostId: "2802522304",
    image: "https://i.ytimg.com/vi/c1xWaYGJKis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBbbG6FU0WO7EdurIdU7tVhHpOrsA",
    hasJoined: false
  }
];

// Initial Forum Posts from mockups
export const INITIAL_POSTS: ForumPost[] = [
  {
    id: "post_1",
    author: "Kevin Sukias",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/358b5564-adf8-4b75-a560-038582fcf63a.jpg",
    timeAgo: "2h ago",
    category: "Hobby Talks",
    tag: "RANDOM",
    title: "I GOT A 52 ON COMPUTATIONAL BIOLOGY WHAAAATTTT, basketball in Taman Menteng today?",
    body: "Seriously, computational biology is brutal. My brain is fried and I desperately need to touch grass and shoot some hoops. Anyone down for a casual pickup game at the Taman Menteng outdoor court later this afternoon? Need at least 4-6 people for a solid half-court, meet up around 16:30. Let's shake off these study stress levels!",
    replies: 12,
    upvotes: 24,
    voted: null,
    comments: [
      {
        id: "com_11",
        author: "Richtjhie Hartawan",
        avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/20961421-3353-400f-93c1-c263c931274a.jpg",
        timeAgo: "1h ago",
        body: "Calculus was already crazy, Computational Biology is next level. Count me in for basketball if my runs get done early!"
      },
      {
        id: "com_12",
        author: "Fiko Alexie",
        avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/a181ac51-f03f-42f9-b7b5-53f536435c8b.jpg",
        timeAgo: "45m ago",
        body: "Tempting! If I can lock in my thesis code before 4 PM I will match your run over there. See you guys."
      }
    ]
  },
  {
    id: "post_2",
    author: "Richtjhie Hartawan",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/20961421-3353-400f-93c1-c263c931274a.jpg",
    timeAgo: "5h ago",
    category: "Training Tips",
    tag: "ACTIVITIES",
    title: "i love to run but my schedule is tight, any suggestions?",
    body: "Hi community! I am a junior student running between campus sites, homework, and club activities. I want to build standard anaerobic capacity but only have 30-45 minute blocks. Should I focus on high-intensity interval training (HIIT), or are there running loops near local campuses (Kijang, Syahdan, Anggrek, Alam Sutera) that are highly optimal for quick intervals?",
    replies: 8,
    upvotes: 15,
    voted: null,
    comments: [
      {
        id: "com_21",
        author: "Gerald Adli",
        avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/ff842aa3-d5cc-470b-8407-181799771210.jpg",
        timeAgo: "4h ago",
        body: "Highly recommend doing early morning interval trials at Kijang - very low vehicle counts. Also, HIIT sprint drills inside back spaces really save a lot of transit hours."
      }
    ]
  },
  {
    id: "post_3",
    author: "Gerald Adli",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/ff842aa3-d5cc-470b-8407-181799771210.jpg",
    timeAgo: "2h ago",
    category: "Hobby Talks",
    tag: "RANDOM",
    title: "My rental bike in GBK got robbed",
    body: "Warning for everyone! Always stay vigilant on weekends at GBK. Left my rental mountain bicycle near the public locker benches for less than 10 minutes, and when I came back it was vanished. Make sure you use a proper mechanical wrap-lock even if you are stepping away for just a split minute. Anyone else experienced security concerns around there?",
    replies: 48,
    upvotes: 124,
    voted: 'up',
    comments: [
      {
        id: "com_31",
        author: "David Sinambela",
        avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/866abfc1-af75-4133-a3de-1c0220c3ad05.jpg",
        timeAgo: "1h ago",
        body: "Oh no! That is shocking. Security forces at GBK are usually quite active, keep their office notified immediately so they can search cameras."
      }
    ]
  },
  {
    id: "post_4",
    author: "Andrew Christiansho",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/448d0500-e942-4d75-9c66-27c2eed15635.jpg",
    timeAgo: "5h ago",
    category: "Training Tips",
    tag: "ACTIVITIES",
    title: "Akhirnya masuk tim inti voli binus le😂😂",
    body: "After months of training, practice scrims, and countless drills, I am extremely stoked to announce that I have officially been accepted into the primary Binus Volleyball Varsity starting rotation! Thanks to everyone in this forum who gave advice about explosive jump training and leg resilience drills. Let's make this tournament year legendary!",
    replies: 12,
    upvotes: 89,
    voted: null,
    comments: []
  },
  {
    id: "post_5",
    author: "Fiko Alexie",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/a181ac51-f03f-42f9-b7b5-53f536435c8b.jpg",
    timeAgo: "8h ago",
    category: "Hobby Talks",
    tag: "NBA",
    title: "WEMBY IS NOT FAIR #WOLVESIN5",
    body: "Can we talk about Victor Wembanyama's defensive gravity? Watch his recovery speed on the sweep blocks! NBA levels are in trouble next season. Do you think Minnesota's size can shut down his transition lines or are we seeing a total shift in basketball geometry? Discuss below!",
    image: "https://cdn.nba.com/manage/2026/05/GettyImages_Wemby_Game2.jpg",
    replies: 156,
    upvotes: 312,
    voted: null,
    comments: [
      {
        id: "com_51",
        author: "Kevin Sukias",
        avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/358b5564-adf8-4b75-a560-038582fcf63a.jpg",
        timeAgo: "7h ago",
        body: "The wolves height matches him closely but that wingspan is just alien biology. He shifts and deflects paths without even jumping."
      }
    ]
  }
];

// Initial preloaded Tasks
export const INITIAL_TASKS: Task[] = [
  {
    id: "task_1",
    title: "Latihan Volleyball",
    time: "15:00 - 18:00",
    completed: false,
    isYesterday: false
  },
  {
    id: "task_2",
    title: "Ranked Valorant (Hosted by Darren Christopher)",
    time: "19:00 - 20:30",
    completed: false,
    isYesterday: false
  },
  {
    id: "task_3",
    title: "Workout in FTL (Hosted by Kevin Sukias)",
    time: "Completed yesterday",
    completed: true,
    isYesterday: true
  }
];

// Initial Calendar training lines
export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch_1",
    day: "01",
    title: "BASKETBALL TRAINING",
    location: "Anggrek Campus, Hall B",
    color: "primary",
    time: "16:30 - 18:00"
  },
  {
    id: "sch_2",
    day: "05",
    title: "TENNIS COURT #3",
    location: "Tennis Plaza",
    color: "secondary",
    time: "09:00 - 11:00"
  },
  {
    id: "sch_3",
    day: "06",
    title: "Basketball in Syahdan",
    location: "Syahdan Campus",
    color: "tertiary",
    time: "17:30 - 19:30"
  },
  {
    id: "sch_4",
    day: "09",
    title: "FTL Training with Andrew",
    location: "FTL Gym",
    color: "success",
    time: "14:00 - 15:30"
  }
];
