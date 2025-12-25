import { useState } from 'react';

const daysShortArr = [
  'H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'
];

const monthNamesArr = [
  'Január', 'Február', 'Március', 'Április',
  'Május', 'Június', 'Július', 'Augusztus',
  'Szeptember', 'Október', 'November', 'December'
];

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date();
  // console.log(today);
  // const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const todayFormatted = today.toLocaleString().substr(0, 12).replaceAll(". ", "-");

  // console.log(today.toLocaleString().substr(0, 12))

  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  // console.log("selectedDate: " + selectedDate);
  const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  // console.log("selectedMonthLastDate: " + selectedMonthLastDate);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  // console.log("prevMonthLastDate: " + prevMonthLastDate);
  const daysInMonth = selectedMonthLastDate.getDate();
  // console.log("daysInMonth: " + daysInMonth);
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  // console.log(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  // console.log("firstDayInMonth: " + firstDayInMonth);
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  // console.log("prevMonthLastDate: " + prevMonthLastDate);
  let prevMonthStartingPoint = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 6;
  const cols = 7;
  const calendarRows = {};

  for(let i = 1; i < rows + 1; i++) {
    for(let j = 1; j < cols + 1; j++) {
      if(!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if(i === 1) {

        // előző havi "maradék" napok
        if(j < startingPoint) {
          const day = prevMonthStartingPoint
          const month = selectedDate.getMonth() === 0 ? 11 : selectedDate.getMonth() < 9 ? `0${selectedDate.getMonth() -1}` : selectedDate.getMonth() - 1
          const year = selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()
          // console.log(day);
          // console.log(selectedDate.getFullYear() - 1);
          // console.log(month);
          // console.log("year: " + year);
          calendarRows[i] = [...calendarRows[i], {
            classes: 'in-prev-month',
            // date: `${prevMonthStartingPoint}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}`,
            
            date: new Date(year, month, day).toLocaleString().substr(0, 13),
            
            // date: new Date(year, month, day).toLocaleString().substr(0, 12).replaceAll(". ", "-"),
            value: prevMonthStartingPoint
          }];
          // console.log(new Date(year, month, day).toLocaleString().substr(0, 12).replaceAll(". ", "-"));
          prevMonthStartingPoint++;
        }else {
          // már az aktuális havi "kezdő" napok
          const day = currentMonthCounter < 10 ? `0${currentMonthCounter}` : currentMonthCounter
          const month = selectedDate.getMonth() < 9 ? `0${selectedDate.getMonth()}` : selectedDate.getMonth()
          const year = selectedDate.getFullYear()
          // console.log(selectedDate);
          // console.log(year);
          calendarRows[i] = [...calendarRows[i], {
            classes: 'current-month',
            // date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,

            date: new Date(year, month, day).toLocaleString().substr(0, 13),

            // date: new Date(year, month, day).toLocaleString().substr(0, 12).replaceAll(". ", "-"),
            value: currentMonthCounter
          }];
          currentMonthCounter++;
        }
      }else if( i > 1 && currentMonthCounter < daysInMonth + 1 ) {

        const day = currentMonthCounter < 10 ? `0${currentMonthCounter}` : currentMonthCounter
        const month = selectedDate.getMonth() < 9 ? `0${selectedDate.getMonth()}` : selectedDate.getMonth()
        const year = selectedDate.getFullYear()

        calendarRows[i] = [...calendarRows[i], {
          classes: 'current-month',
          // date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,

          date: new Date(year, month, day).toLocaleString().substr(0, 13),

          // date: new Date(year, month, day).toLocaleString().substr(0, 12).replaceAll(". ", "-"),
          value: currentMonthCounter
        }];
        currentMonthCounter++;
      }else {
        // következő havi "kezdő" napok

        const day = nextMonthCounter < 10 ? `0${nextMonthCounter}` : nextMonthCounter
        const month = selectedDate.getMonth() < 9 ? `0${selectedDate.getMonth() + 1}` : selectedDate.getMonth() + 1
        const year = selectedDate.getFullYear()

        calendarRows[i] = [...calendarRows[i], {
          classes: 'in-next-month',
          // date: `${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}`,
          
          date: new Date(year, month, day).toLocaleString().substr(0, 13),
          
          // date: new Date(year, month, day).toLocaleString().substr(0, 12).replaceAll(". ", "-"),
          value: nextMonthCounter
        }];
        nextMonthCounter++;
      }
    }
  }

  const getPrevMonth = () => {
      setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
  }

  const getNextMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  }

  return {
    today,
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth
  }
}

export default useCalendar;