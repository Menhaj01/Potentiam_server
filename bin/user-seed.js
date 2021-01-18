require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

const users = [
  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://facebook.com", network: "Facebook" },
    ],
    pseudo: "Dohris",
    email: "dohris@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05d9d",
  },
  {
    links: [
      { url: "http://instagram.com", network: "Instagram" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Polar",
    email: "polar@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da6",
  },
  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Isar",
    email: "isar@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da5",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Allmight",
    email: "allmight@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da4",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Saitama",
    email: "saitama@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da3",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Conan",
    email: "conan@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da2",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Zorro",
    email: "zorro@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da1",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Luffy",
    email: "luffy@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05da0",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Vegeta",
    email: "vegeta@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05d9f",
  },

  {
    links: [
      { url: "http://youtube.com", network: "Youtube" },
      { url: "http://twitter.com", network: "Twitter" },
    ],
    pseudo: "Sangoku",
    email: "sangoku@hotmail.com",
    password: "$2b$10$kltF4VRKJ2HQLa1PVGaAiuWuLlHyGivkRtFEuzxM3kZz6kJkBq0OK",
    description: "TESTONS ENCORE",
    id_category: "5ffff6173c707e2fb0b05d9e",
  },
];

(async () => {
  try {
    const self = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connection to ${self.connection.name} succesful.`);
    const createdusers = await User.create(users);
    console.log(createdusers);
    self.connection.close();
  } catch (error) {
    console.log(`An error has occured while seeding... ${error}`);
  }
})();
