import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../../pages/Home/Home.module.css';
// import {
//   WeekTabsList,
//   WeekTabsItemTextDesktop,
// } from '../../../pages/MainPage/MainPage.styles';
// import styles from '../../../pages/MainPage/Helper.module.css';
import { nameOfDaysFunc, nameOfdays } from '../../utils/helpers';

export default function CurrentWeekRange() {
  return (
    <ul className={style.WeekRange}>
      {nameOfDaysFunc().map((el) => {
        return (
          <li key={el.date} className={style.WeekRangeItem}>
            <NavLink
              to={`?day=` + el.date}
              isActive={(_, location) => {
                if (location.search === `?day=` + el.date) {
                  return true;
                }
              }}
              className={style.notSelected}
              activeClassName={style.selected}
            >
              <p>{el.full}</p>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
