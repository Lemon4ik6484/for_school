import { lessons } from "./lessons.js";
import { lessonsTime } from "./time.js";

// const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];

// const schedule = [{}];

const headerTextRef = document.querySelector(".header_text");
const lessonsTimeRef = document.querySelector(".lessons_time");
const lessonsDayRef = document.querySelectorAll(".lessons");
const lessonsRef = document.querySelectorAll(".lesson");

const themeBtn = document.getElementById("theme_button");
const darkModeKey = "darkModeEnabled";

const timetoMinutes = (time, delimiter) => {
  const timeParts = time.split(delimiter);
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

const updateTime = () => {
  const curDate = new Date();
  const curTime = curDate.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Kyiv", // Antarctica/South_Pole Europe/Kyiv
  });
  headerTextRef.textContent = `Київський час: ${curTime}`;

  const curDay = curDate.getDay();
  const dayRef = lessonsDayRef[curDay - 1];

  if (curDay > 0 && curDay < 6) {
    const curLesson = lessonsTime.findIndex(
      (lessonTime) =>
        timetoMinutes(curTime, ":") >= timetoMinutes(lessonTime.start, ".") &&
        timetoMinutes(curTime, ":") <= timetoMinutes(lessonTime.end, "."),
    );

    let nextLesson = -1;
    if (curLesson === -1)
      nextLesson = lessonsTime.findIndex(
        (lesson, idx, lessons) =>
          idx !== lessons.length - 1 &&
          timetoMinutes(curTime, ":") > timetoMinutes(lesson.end, ".") &&
          timetoMinutes(curTime, ":") <
            timetoMinutes(lessons[idx + 1].start, "."),
      );

    if (curLesson !== -1) {
      const lessonRef = dayRef.querySelectorAll(".lesson")[curLesson];
      if (lessonRef.innerHTML) lessonRef.classList.toggle("now");
    }
    if (nextLesson !== -1) {
      const lessonRef = dayRef.querySelectorAll(".lesson")[nextLesson + 1];
      if (lessonRef.innerHTML) lessonRef.classList.toggle("later");
    }
  }
};

const clearColors = () => {
  lessonsRef.forEach((lesson) => lesson.classList.remove(["now", "later"]));
};

setInterval(updateTime, 1000);
setInterval(clearColors, 20000);

lessonsTimeRef.innerHTML = '<td class="box"></td>';
lessonsTime.forEach((lesson, idx) => {
  const time = `${lesson.start} - ${lesson.end}`;
  lessonsTimeRef.insertAdjacentHTML(
    "beforeend",
    `
    <td class="box">
        <div class="lesson_time_box">
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
      <a href="${lesson.link}" target="_blank">
      ${lesson.title}
      </a>
      </strong>
`,
    );
  });
});

const enableDarkMode = () => {
  document.body.classList.add("darkMode");
  document.body.querySelector("table").classList.add("darkMode");
  document.body
    .querySelectorAll("a")
    .forEach((link) => link.classList.add("darkMode"));
  document.body
    .querySelectorAll("div.top")
    .forEach((div) => div.classList.add("darkMode"));
  document.body
    .querySelectorAll("div.bottom")
    .forEach((div) => div.classList.add("darkMode"));

  localStorage.setItem(darkModeKey, "true");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkMode");
  document.body.querySelector("table").classList.remove("darkMode");
  document.body
    .querySelectorAll("a")
    .forEach((link) => link.classList.remove("darkMode"));
  document.body
    .querySelectorAll("div.top")
    .forEach((div) => div.classList.remove("darkMode"));
  document.body
    .querySelectorAll("div.bottom")
    .forEach((div) => div.classList.remove("darkMode"));

  localStorage.setItem(darkModeKey, "false");
};

const isDarkModeEnabled = localStorage.getItem(darkModeKey) === "true";
if (isDarkModeEnabled) {
  themeBtn.classList.add("moon");
  enableDarkMode();
}

document.body.classList.remove("temporary-dark");

themeBtn.onclick = () => {
  themeBtn.classList.toggle("moon");
  if (themeBtn.classList.contains("moon")) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};