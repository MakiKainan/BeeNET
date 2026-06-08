import { ForumPost, Facility, GameSession, Task, ScheduleItem, UserProfile } from './types';

// Initial Profiles of the 3 main students from the mockups
export const USER_PROFILES: UserProfile[] = [
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
    name: "Kevin Sukias",
    email: "kevin.admin@binus.ac.id",
    department: "Admin",
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/358b5564-adf8-4b75-a560-038582fcf63a.jpg",
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
    avatar: "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/358b5564-adf8-4b75-a560-038582fcf63a.jpg",
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
export const INITIAL_SESSIONS: GameSession[] = [];

// Initial Forum Posts from mockups
export const INITIAL_POSTS: ForumPost[] = [];

// Initial preloaded Tasks
export const INITIAL_TASKS: Task[] = [];

// Initial Calendar training lines
export const INITIAL_SCHEDULE: ScheduleItem[] = [];

