import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserTrains } from '../redux/trains/operations';
import { todayTraining } from '../../utils/helpers';
import style from '../../pages/Home/Home.module.css';
export default function HomeContent({ daysQuery, training, userId, menu }) {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.auth?.user?.gender);
  const trainingArray = training === null ? null : Object.values(training);
  return todayTraining(training, daysQuery, trainingArray)[0] === undefined ? (
    <h3 className={style.TrainContentNone}>На цей день немає тренувань</h3>
  ) : (
    <div className={style.TrainContent}>
      <h3 className={style.graphic}>Таблиця тренувань</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Назва вправи:</th>
            <th>Основні мишци: </th>
            <th>Додаткові мишци: </th>
            <th>Кількість повторів</th>
            <th>Кількість підходів</th>
            <th>Вага (кг)</th>
            <th>Відео приклад: </th>
          </tr>
        </thead>
        <tbody>
          {todayTraining(training, daysQuery, trainingArray)[0].map(
            (el, index) => (
              <tr key={el.name}>
                <td>{el.name}</td>
                <td>{el.mainMuscle}</td>
                <td>{el.additionMuscle}</td>
                <td>
                  {el.povtorenia - 2} - {el.povtorenia + 2}
                </td>
                <td>{el.podhod}</td>
                <td>{el.ves}</td>
                <td>
                  <a href={el.videoDescr}>Відео</a>
                </td>
                {/* <td>{el.desription}</td> */}
                {/* <td key={el.name}>Основні мишци: {el.mainMuscle}</td> */}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
