import { ForumPost, Facility, GameSession, Task, ScheduleItem, UserProfile } from './types';

// Initial Profiles of the 3 main students from the mockups
export const USER_PROFILES: UserProfile[] = [
  {
    name: "Kevin Sukias",
    email: "kevinsukias27@gmail.com",
    department: "Computer Science",
    avatar: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚽</text></svg>",
    level: 16,
    athleteTier: "Elite Ath",
    points: 2400,
    futsalProgress: 94,
    basketballProgress: 60,
    tennisProgress: 75
  },
  {
    name: "Kevin Sukias",
    email: "kevin.admin@binus.ac.id",
    department: "Admin",
    avatar: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏆</text></svg>",
    level: 16,
    athleteTier: "Senior Admin",
    points: 2400,
    futsalProgress: 94,
    basketballProgress: 60,
    tennisProgress: 75
  },
  {
    name: "Kevin Sukias",
    email: "kevin.moderator@binus.ac.id",
    department: "Moderator",
    avatar: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏅</text></svg>",
    level: 16,
    athleteTier: "Moderator",
    points: 2400,
    futsalProgress: 94,
    basketballProgress: 60,
    tennisProgress: 75
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
    image: "https://binus.ac.id/kemanggisan/campuslife-syahdan/wp-content/uploads/sites/4/2024/02/054-scaled.jpg",
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
  },
  {
    id: "fac_5",
    title: "Taman Menteng Basketball Court",
    location: "Menteng Area",
    campus: "Senayan Campus",
    rating: 4.5,
    pricePerHour: 0,
    image: "https://asset.kompas.com/crops/d5coSLkJY28A_qDW81OMeIdhbWs=/142x0:1158x677/750x500/data/photo/2022/10/19/634ff2c483b19.jpg",
    isVerified: false,
    amenities: [
      { icon: "sports_basketball", name: "Outdoor" },
      { icon: "park", name: "Park Area" }
    ],
    fullyBooked: false
  },
  {
    id: "fac_6",
    title: "Taman Singkarak Basketball Court",
    location: "Kemanggisan Area",
    campus: "Anggrek Campus",
    rating: 4.6,
    pricePerHour: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcGVq_8R3XYo7C9NZaYImxr4ELGnZUpBocKw&s",
    isVerified: false,
    amenities: [
      { icon: "sports_basketball", name: "Outdoor" },
      { icon: "group", name: "Concrete" }
    ],
    fullyBooked: false
  },
  {
    id: "fac_7",
    title: "Alam Sutera Public Running Track",
    location: "Alam Sutera Campus Perimeter",
    campus: "Alam Sutera",
    rating: 4.8,
    pricePerHour: 0,
    image: "https://student.binus.ac.id/wp-content/uploads/2018/09/RECTOR-CUP-OFFICIAL-FLAG-PRINT-size-150x100-Cm.jpg",
    isVerified: true,
    amenities: [
      { icon: "directions_run", name: "Rubber" },
      { icon: "nature_people", name: "Park Area" }
    ],
    fullyBooked: false
  }
];

// Initial preloaded database for Game Sessions
export const INITIAL_SESSIONS: GameSession[] = [
  {
    id: "ses_1",
    title: "Futsal Friendly Scrim",
    location: "Binus Kijang Futsal Court",
    time: "16:00 - 17:30",
    playersJoined: 6,
    playersMax: 10,
    sport: "Futsal",
    level: "Casual",
    hostName: "Michael Chandra",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    hostId: "2440129482",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUQ-xpFyyYyXzvUT0DhdWa4p6yY3Rx7thGw&s"
  },
  {
    id: "ses_2",
    title: "3v3 Half-Court Hoop",
    location: "Syahdan Basketball Court",
    time: "18:00 - 19:30",
    playersJoined: 3,
    playersMax: 6,
    sport: "Basketball",
    level: "Competitive",
    hostName: "Aditya Wijaya",
    hostAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    hostId: "2440188921",
    image: "https://binus.ac.id/kemanggisan/campuslife-syahdan/wp-content/uploads/sites/4/2024/02/054-scaled.jpg"
  },
  {
    id: "ses_3",
    title: "Badminton Singles Sparring",
    location: "Alam Sutera Main Hall",
    time: "15:00 - 16:30",
    playersJoined: 2,
    playersMax: 4,
    sport: "Badminton",
    level: "Casual",
    hostName: "Clara Setyawati",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    hostId: "2440177651",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA145ddY2ThBCZL6eTcRcir-Dr9l0A5wf4LA&s"
  }
];

// Initial Forum Posts from mockups
export const INITIAL_POSTS: ForumPost[] = [
  {
    id: "post_1",
    author: "Rian Hidayat",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    timeAgo: "2 hours ago",
    category: "Training Tips",
    title: "How to improve Futsal stamina for tournaments?",
    body: "Hey guys! I find myself getting gassed out after just 20 minutes of high-intensity play. Any recommendation on cardio drills or interval training methods that are specific to futsal court sizes? Cheers!",
    tag: "QUESTION",
    upvotes: 12,
    replies: 2,
    comments: [
      {
        id: "c1",
        author: "Sarah Natasha",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
        timeAgo: "1 hour ago",
        body: "HIIT sprints are key! Try doing 30-second full sprints followed by 30 seconds of slow walking on the futsal court dimensions. Repeat this 10 times."
      },
      {
        id: "c2",
        author: "Michael Chandra",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        timeAgo: "30 mins ago",
        body: "Agreed. Shuttle runs (suicide drills) help build that explosive agility and stamina together."
      }
    ]
  },
  {
    id: "post_2",
    author: "Sarah Natasha",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    timeAgo: "5 hours ago",
    category: "Hobby Talks",
    title: "Looking for regular tennis sparring partners at Senayan",
    body: "Hi everyone! I usually play tennis on weekend mornings at the Senayan campus courts. I'm currently at an intermediate level. Let me know if anyone wants to spar or practice rallies together. Open for singles or doubles!",
    tag: "ACTIVITIES",
    upvotes: 8,
    replies: 1,
    comments: [
      {
        id: "c3",
        author: "Kevin Sukias",
        avatar: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚽</text></svg>",
        timeAgo: "3 hours ago",
        body: "I'd love to play! I'm intermediate as well. I'll drop you a message next time I book a court."
      }
    ]
  }
];

// Initial preloaded Tasks
export const INITIAL_TASKS: Task[] = [
  {
    id: "task_1",
    title: "Morning Futsal Drills",
    time: "07:30 - 08:30",
    completed: true,
    isYesterday: true
  },
  {
    id: "task_2",
    title: "Attend court reservation briefing",
    time: "13:00 - 13:30",
    completed: false,
    isYesterday: false
  }
];

// Initial Calendar training lines
export const INITIAL_SCHEDULE: ScheduleItem[] = [];

