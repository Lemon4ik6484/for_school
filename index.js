const lessonsTime = [
  { start: "08.20", end: "09.05" },
  { start: "09.15", end: "10.00" },
  { start: "10.10", end: "10.55" },
  { start: "11.05", end: "11.50" },
  { start: "12.20", end: "13.05" },
  { start: "13.15", end: "14.00" },
  { start: "14.10", end: "14.55" },
  { start: "15.05", end: "15.50" },
  { start: "17.00", end: "17.45" },
  { start: "18.00", end: "18.45" },
  { start: "19.00", end: "19.45" },
];

const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];

const lessons = [
  {
    name: "physics",
    title: "Фізика",
    link: "https://us04web.zoom.us/j/76266447216?pwd=stEsW7m8FoYDpFsaTS9YyvLGKSA2ix.1",
  },
  {
    name: "algebra",
    title: "Алгебра",
    link: "https://us04web.zoom.us/j/78388130486?pwd=cnTD7LvyaPHxKx7AmE7R7ox5kPetX3.1",
  },
  {
    name: "geometry",
    title: "Геометрія",
    link: "https://us04web.zoom.us/j/78388130486?pwd=cnTD7LvyaPHxKx7AmE7R7ox5kPetX3.1",
  },
  {
    name: "computerscience",
    title: "Інформатика",
    link: "https://us04web.zoom.us/j/8540626601?pwd=UkFyQWpFWW1GU0xSRnlteEMwSUNWdz09",
  },
  {
    name: "literature",
    title: "Література",
    link: "https://us04web.zoom.us/j/77586110056?pwd=E2pJOVQeQPUtJSJgPAHeRki5YzdBAg.1",
  },
  {
    name: "ukrliterature",
    title: "Українська література",
    link: "",
  },
  {
    name: "ukrlanguage",
    title: "Українська мова",
    link: "https://us05web.zoom.us/j/8525252562?pwd=UytGVTVLV2RFWnh6bGU4RTFGU1FUdz09",
  },
  {
    name: "english",
    title: "Англійська мова",
    link: "https://us04web.zoom.us/j/5626783573?pwd=WDRJWXQyekNVL1k1S3dsdSs5WEVJZz09",
  },
  {
    name: "history",
    title: "Всесвітня історія",
    link: "https://us04web.zoom.us/j/9228531715?pwd=ZjBrVXFZRHQyU0puS1RGOGxzYUNLdz09",
  },
  {
    name: "ukrhistory",
    title: "Історія України",
    link: "https://us04web.zoom.us/j/9228531715?pwd=ZjBrVXFZRHQyU0puS1RGOGxzYUNLdz09",
  },
  {
    name: "kharkiv",
    title: "Харківщино-знавство",
    link: "https://us04web.zoom.us/j/9228531715?pwd=ZjBrVXFZRHQyU0puS1RGOGxzYUNLdz09",
  },
  {
    name: "chemistry",
    title: "Хімія",
    link: "https://us04web.zoom.us/j/8717700620?pwd=eUxIcW1rZjRXZ21va0ZVQnlWVzFpUT09",
  },
  {
    name: "biology",
    title: "Біологія",
    link: "https://us05web.zoom.us/j/5282604925?pwd=OEViMkxNTTRLb3p4MnpUN0NKck5HZz09",
  },
  {
    name: "geography",
    title: "Географія",
    link: "https://us04web.zoom.us/j/75463486414?pwd=77bNt9iuKZ7FEF5RnDqBd6ZJW6itlK.1",
  },
  {
    name: "health",
    title: "Основи здоров'я",
    link: "https://us05web.zoom.us/j/5282604925?pwd=OEViMkxNTTRLb3p4MnpUN0NKck5HZz09",
  },
  {
    name: "physicaleducation",
    title: "Фізична культура",
    link: "",
  },
  {
    name: "arts",
    title: "Мистецтво",
    link: "https://us05web.zoom.us/j/83512290078?pwd=fclEKRAuLF7DiJgdi2sjWoW6FaUmV1.1",
  },
  {
    name: "labors",
    title: "Трудове навчання",
    link: "https://us04web.zoom.us/j/78388130486?pwd=cnTD7LvyaPHxKx7AmE7R7ox5kPetX3.1",
  },
];

const schedule = [{}];

const headerTextRef = document.querySelector(".header_text");
const lessonsTimeRef = document.querySelector(".lessons_time");
const lessonsRef = document.querySelector(".lessons");

const updateTime = () => {
  const curDate = new Date();
  const curTime = curDate.toLocaleTimeString("uk-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });
  headerTextRef.textContent = `Київський час: ${curTime}`;

  if (curDate.getDay() < 5) {
  }
};

setInterval(updateTime, 1000);

lessonsTimeRef.innerHTML = '<td class="box"></td>';
lessonsTime.forEach((lesson, idx) => {
  const time = `${lesson.start} - ${lesson.end}`;
  lessonsTimeRef.insertAdjacentHTML(
    "beforeend",
    `
    <td class="box">
        <div class="lesson">
            <h2 class="lesson_number">${idx + 1}</h2>
            <p class="lesson_time">${time}</p>
        </div>
    </td>
    `,
  );
});

lessons.forEach((lesson) => {
  const curLessonRefs = document.querySelectorAll(`.${lesson.name}`);
  curLessonRefs.forEach((lessonRef) => {
    lessonRef.insertAdjacentHTML(
      "afterbegin",
      `<strong>
      <a href="${lesson.link}" target="_blank" class="no_link_black">
      ${lesson.title}
      </a>
      </strong>
`,
    );
  });
});

clearInterval(updateTime);
