export default function FormattedDate(props) {
  let nowLocal = new Date();
  let localTime = nowLocal.getTime();
  let localOffset = nowLocal.getTimezoneOffset() * 60000;
  let UTC = localTime + localOffset;
  let nowUTC = new Date(UTC + 1000 * props.timezone);
  let days = null;
  let hours = nowUTC.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = nowUTC.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let daysFull = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let daysAbbreviation = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  if (window.matchMedia(`(max-width: 576px)`).matches) {
    days = daysAbbreviation;
  } else {
    days = daysFull;
  }
  let day = days[nowUTC.getDay()];

  return `${day} ${hours}:${minutes}`;
}
