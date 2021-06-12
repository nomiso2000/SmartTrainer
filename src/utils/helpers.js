import { DateTime } from 'luxon';
import { combineReducers } from 'redux';

const startWeek = DateTime.local().startOf('week');
export const nameOfdays = [
  { full: 'Понедельник', short: 'Пн', day: 'Monday', date: null },
  { full: 'Вторник', short: 'Вт', day: 'Tuesday', date: null },
  { full: 'Среда', short: 'Ср', day: 'Wednesday', date: null },
  { full: 'Четверг', short: 'Чт', day: 'Thursday', date: null },
  { full: 'Пятница', short: 'Пт', day: 'Friday', date: null },
  { full: 'Суббота', short: 'Сб', day: 'Saturday', date: null },
  { full: 'Воскресенье', short: 'Вс', day: 'Sunday', date: null },
];

export function nameOfDaysFunc() {
  nameOfdays.map((el, index) => {
    el.date = startWeek.plus({ days: index }).toFormat('yyyy-MM-dd');
  });
  return nameOfdays;
}

export function todayTraining(training, daysQuery, trainingArray) {
  return training === null
    ? [undefined]
    : trainingArray.reduce((acc, el) => {
        if (el.day === daysQuery) acc.push(el.train);
        return acc;
      }, []);
}
export function todayMenu(menu, daysQuery) {
  console.log('menu', menu);
  console.log('daysQuery', daysQuery);
  if (menu === undefined) return undefined;
  return menu === null
    ? [undefined]
    : menu.reduce((acc, el) => {
        if (el.day === daysQuery) acc.push(el);
        return acc;
      }, []);
}

// export function hendlerCountUpgrade(question, sendedTrain) {
//   sendedTrain.reduce((acc, el) => {
//     let findingResult = acc.find((ell) => ell === el.muscle);
//     if (!findingResult) acc.push(el.muscle);
//   }, []);
// }
