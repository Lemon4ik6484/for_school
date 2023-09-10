import { lessons } from "./lessons.js";
import { lessonsTime } from "./time.js";

// const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];

// const schedule = [{}];

const headerTextRef = document.querySelector(".header_text");
const lessonsTimeRef = document.querySelector(".lessons_time");
const lessonsRef = document.querySelector(".lessons");

const timetoMinutes = (time, delimiter) => {
  const timeParts = time.split(delimiter);
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

const updateTime = () => {
  const curDate = new Date();
  const curTime = curDate.toLocaleTimeString("uk-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });
  headerTextRef.textContent = `Київський час: ${curTime}`;

  const curDay = curDate.getDay();
  if (curDay > 0 && curDay < 5) {
    const curLesson = lessonsTime.findIndex(
      (lesson) =>
        timetoMinutes(curTime, ":") >= timetoMinutes(lesson.start, ".") &&
        timetoMinutes(curTime, ":") <= timetoMinutes(lesson.end, "."),
    );

    let nextLesson = -1;
    if (curLesson === -1)
      nextLesson = lessonsTime.findIndex(
        (lesson, idx, lessons) =>
          idx !== lessons.length - 1 &&
          curTime > lesson.end &&
          curTime < lessons[idx + 1],
      );
    if (curLesson !== -1) {
      const curLessonTimeRef =
        lessonsTimeRef.querySelectorAll(".lesson_time")[curLesson];
      curLessonTimeRef.classList.toggle("now");
    }
    if (nextLesson !== -1) {
      const nextLessonTimeRef = lessonsTimeRef.children[nextLesson];
      nextLessonTimeRef.classList.toggle("later");
    }
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
      <a href="${lesson.link}" target="_blank" class="no_link_black">
      ${lesson.title}
      </a>
      </strong>
`,
    );
  });
});

clearInterval(updateTime);
