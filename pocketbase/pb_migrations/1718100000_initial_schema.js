migrate((app) => {
  const dao = app.dao();

  // 1. Update users collection schema with custom fields
  const usersCollection = dao.findCollectionByNameOrId("users");
  usersCollection.schema.addField(new SchemaField({ name: "department", type: "text" }));
  usersCollection.schema.addField(new SchemaField({ name: "level", type: "number" }));
  usersCollection.schema.addField(new SchemaField({ name: "athleteTier", type: "text" }));
  usersCollection.schema.addField(new SchemaField({ name: "points", type: "number" }));
  usersCollection.schema.addField(new SchemaField({ name: "futsalProgress", type: "number" }));
  usersCollection.schema.addField(new SchemaField({ name: "basketballProgress", type: "number" }));
  usersCollection.schema.addField(new SchemaField({ name: "tennisProgress", type: "number" }));
  dao.saveCollection(usersCollection);

  // 2. Seed default users (using sport emojis instead of face pictures)
  const profiles = [
    {
      name: "Kevin Sukias",
      email: "kevinsukias27@gmail.com",
      password: "user123",
      department: "Computer Science",
      avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">⚽</text></svg>',
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
      password: "admin123",
      department: "Admin",
      avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🏆</text></svg>',
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
      password: "mod123",
      department: "Moderator",
      avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🏅</text></svg>',
      level: 16,
      athleteTier: "Moderator",
      points: 2400,
      futsalProgress: 94,
      basketballProgress: 60,
      tennisProgress: 75
    }
  ];

  for (const p of profiles) {
    const record = new Record(usersCollection);
    record.setEmail(p.email);
    record.setPassword(p.password);
    record.setVerified(true);
    record.set("name", p.name);
    record.set("department", p.department);
    record.set("level", p.level);
    record.set("athleteTier", p.athleteTier);
    record.set("points", p.points);
    record.set("futsalProgress", p.futsalProgress);
    record.set("basketballProgress", p.basketballProgress);
    record.set("tennisProgress", p.tennisProgress);
    record.set("avatar", p.avatar);
    dao.saveRecord(record);
  }

  // 3. Create forum_posts collection
  const forumCollection = new Collection({
    name: "forum_posts",
    type: "base",
    schema: [
      { name: "author", type: "text" },
      { name: "avatar", type: "text" },
      { name: "timeAgo", type: "text" },
      { name: "category", type: "text" },
      { name: "title", type: "text" },
      { name: "body", type: "text" },
      { name: "image", type: "text" },
      { name: "replies", type: "number" },
      { name: "upvotes", type: "number" },
      { name: "tag", type: "text" },
      { name: "comments", type: "json" }
    ],
    listRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: ""
  });
  dao.saveCollection(forumCollection);

  // Seed forum posts (replacing Kevin Sukias comments avatar with ⚽ as well)
  const posts = [
    {
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
          avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">⚽</text></svg>',
          timeAgo: "3 hours ago",
          body: "I'd love to play! I'm intermediate as well. I'll drop you a message next time I book a court."
        }
      ]
    }
  ];

  for (const p of posts) {
    const record = new Record(forumCollection);
    record.set("author", p.author);
    record.set("avatar", p.avatar);
    record.set("timeAgo", p.timeAgo);
    record.set("category", p.category);
    record.set("title", p.title);
    record.set("body", p.body);
    record.set("replies", p.replies);
    record.set("upvotes", p.upvotes);
    record.set("tag", p.tag);
    record.set("comments", p.comments);
    dao.saveRecord(record);
  }

  // 4. Create game_sessions collection
  const sessionsCollection = new Collection({
    name: "game_sessions",
    type: "base",
    schema: [
      { name: "title", type: "text" },
      { name: "location", type: "text" },
      { name: "time", type: "text" },
      { name: "playersJoined", type: "number" },
      { name: "playersMax", type: "number" },
      { name: "sport", type: "text" },
      { name: "level", type: "text" },
      { name: "hostName", type: "text" },
      { name: "hostAvatar", type: "text" },
      { name: "hostId", type: "text" },
      { name: "image", type: "text" }
    ],
    listRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: ""
  });
  dao.saveCollection(sessionsCollection);

  // Seed game sessions
  const sessions = [
    {
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

  for (const s of sessions) {
    const record = new Record(sessionsCollection);
    record.set("title", s.title);
    record.set("location", s.location);
    record.set("time", s.time);
    record.set("playersJoined", s.playersJoined);
    record.set("playersMax", s.playersMax);
    record.set("sport", s.sport);
    record.set("level", s.level);
    record.set("hostName", s.hostName);
    record.set("hostAvatar", s.hostAvatar);
    record.set("hostId", s.hostId);
    record.set("image", s.image);
    dao.saveRecord(record);
  }

  // 5. Create tasks collection
  const tasksCollection = new Collection({
    name: "tasks",
    type: "base",
    schema: [
      { name: "title", type: "text" },
      { name: "time", type: "text" },
      { name: "completed", type: "bool" },
      { name: "isYesterday", type: "bool" },
      { name: "userId", type: "text" }
    ],
    listRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: ""
  });
  dao.saveCollection(tasksCollection);

  // Seed tasks
  const tasks = [
    {
      title: "Morning Futsal Drills",
      time: "07:30 - 08:30",
      completed: true,
      isYesterday: true,
      userEmail: "kevinsukias27@gmail.com"
    },
    {
      title: "Attend court reservation briefing",
      time: "13:00 - 13:30",
      completed: false,
      isYesterday: false,
      userEmail: "kevinsukias27@gmail.com"
    }
  ];

  for (const t of tasks) {
    const userRecord = dao.findAuthRecordByEmail("users", t.userEmail);
    const record = new Record(tasksCollection);
    record.set("title", t.title);
    record.set("time", t.time);
    record.set("completed", t.completed);
    record.set("isYesterday", t.isYesterday);
    record.set("userId", userRecord.id);
    dao.saveRecord(record);
  }

  // 6. Create schedules collection
  const scheduleCollection = new Collection({
    name: "schedules",
    type: "base",
    schema: [
      { name: "day", type: "text" },
      { name: "month", type: "text" },
      { name: "year", type: "text" },
      { name: "title", type: "text" },
      { name: "location", type: "text" },
      { name: "color", type: "text" },
      { name: "time", type: "text" },
      { name: "userId", type: "text" }
    ],
    listRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: ""
  });
  dao.saveCollection(scheduleCollection);
}, (app) => {})
