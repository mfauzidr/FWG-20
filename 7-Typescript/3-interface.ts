interface Biodata {
  name: string;
  age: number;
  hobbies: string[];
  isMarried: boolean;
  schoolList: School[];
  skills: Skill[];
  interestInCoding: boolean;
}

type School = {
  name: string;
  yearIn: number;
  yearOut: number | null;
  major: string;
}

type Skill = {
  skillName: string;
  level: string;
}

const biodata: Biodata = {
  name: "Mochammad Fauzi Dwi Rusdiansyah",
  age: 26,
  hobbies: ["Gaming", "Dancing"],
  isMarried: false,
  schoolList: [
    {
      name: "SMK NEGERI 1 Kota Sukabumi",
      yearIn: 2013,
      yearOut: 2016,
      major: "Teknik Elektronika Industri",
    },
    {
      name: "Universitas Muhammadiyah Sukabumi",
      yearIn: 2016,
      yearOut: null,
      major: "Teknik Informatika",
    },
    {
      name: "Universitas Nusa Putra Sukabumi",
      yearIn: 2022,
      yearOut: null,
      major: "Teknik Informatika",
    },
  ],
  skills: [
    {
      skillName: "Gaming",
      level: "Advanced (Varies)",
    },
    {
      skillName: "Javascript",
      level: "Beginner",
    },
    {
      skillName: "HTML",
      level: "Beginner",
    },
    {
      skillName: "English",
      level: "Advanced",
    },
  ],
  interestInCoding: true,
};

console.log(biodata);
