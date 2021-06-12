import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { Link, useHistory, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {
  getCurrentUserTrains,
  sendTrainings,
} from '../../Components/redux/trains/operations';
import { todayTraining, nameOfDaysFunc, todayMenu } from '../../utils/helpers';
import CurrentWeekRange from '../../Components/CurrentWeekRange';
import HomeContent from '../../Components/HomeContent';
import {
  sendMuscleTrainingToUpdate,
  signOut,
} from '../../Components/redux/auth/operations';
import style from './Home.module.css';

const Home = () => {
  function UseQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const dispatch = useDispatch();
  const history = useHistory();
  let query = UseQuery();
  let daysQuery = query.get('day');
  const [startDate, setStartDate] = useState('');
  const [question, setQuestion] = useState('normal');
  const [selectDateTraining, setselectDateTraining] = useState({});
  const userId = useSelector((state) => {
    if (state.auth?.user?._id !== undefined) return state.auth?.user?._id;
    if (state.auth?.user?.id !== undefined) return state.auth?.user?.id;
  });

  // const userId = useSelector((state) => state.auth?.user?._id);
  const userIdd = useSelector((state) => state.auth?.user?.id);
  const lastUpdate = useSelector((state) => state.auth?.user?.lastUpdate);
  const kkal = useSelector((state) => state.auth?.user?.kkal);
  const training = useSelector((state) => state.training?.userTraining);
  const menu = useSelector((state) => state.auth?.user?.menu);
  const water = useSelector((state) => state.auth?.user?.water);

  // if (training === null) history.push('/userinfo');
  const todayIs = DateTime.now().toString().substring(0, 10);

  const trainingArray = training === null ? null : Object.values(training);

  useEffect(() => {
    console.log('userId', userId);
    dispatch(getCurrentUserTrains(userId));
  }, [userId !== undefined]);

  // useEffect(() => {
  //   trainingArray.map((el) =>
  //     nameOfDaysFunc().find((ell) => ell.date === el.day)
  //   );
  // }, [trainingArray]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendedTrain = todayTraining(training, daysQuery, trainingArray);
    const readyObjectToSend = {
      data: DateTime.now().toFormat('yyyy-MM-dd'),
      train: sendedTrain[0],
    };
    if (lastUpdate === todayIs) {
      alert('Ви вже голосували сьогодні');
    } else {
      dispatch(sendTrainings(readyObjectToSend));
      dispatch(sendMuscleTrainingToUpdate({ train: sendedTrain[0], question }));
    }
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'question':
        return setQuestion(e.target.value);
    }
  };

  async function handleGetTrain(userId, credentials) {
    const { data } = await axios.put(
      `https://gentle-sierra-61969.herokuapp.com/users/findTrainByDate/${userId}`,
      { date: credentials.toISOString().substring(0, 10) }
    );

    setselectDateTraining({ date: data[0] });
  }

  return (
    <div>
      <div className={style.headerContent}>
        <div>
          <p>Виберіть день, що б переглянути тренування</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleGetTrain(userId, date)}
            placeholderText="Нажміть, що б вибрати "
            // dateFormat="MMMM d, yyyy h:mm aa"
            // dateFormatCalendar={'MMM yyyy'}
          />
        </div>

        <div>
          <p>Щоденна норма калорій для вас: {kkal} ккал</p>
          <p>Щоденна норма води для вас: {water} літрів</p>
        </div>
        <button type="button" onClick={() => dispatch(signOut(history))}>
          Вихід
        </button>
      </div>
      {selectDateTraining.date && (
        <div className={style.choosenDayTrain}>
          <p>Тренування за {selectDateTraining.date.data}</p>
          <table border="1">
            <thead>
              <tr>
                <th>Назва вправи:</th>
                <th>Основні мишци: </th>
                <th>Кількість повторів</th>
                <th>Кількість підходів</th>
                <th>Вага (кг)</th>
                <th>Відео приклад: </th>
              </tr>
            </thead>
            <tbody>
              {selectDateTraining.date.train.map((el, index) => (
                <tr key={el.name}>
                  <td>{el.name}</td>
                  <td>{el.mainMuscle}</td>
                  <td>{el.povtorenia}</td>
                  <td>{el.podhod}</td>
                  <td>{el.ves}</td>
                  <td>
                    <a href={el.videoDescr}>Відео</a>
                  </td>
                  {/* <td key={el.name}>Основні мишци: {el.mainMuscle}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2 className={style.graphic}>Виберіть день що б переглянути</h2>
      <div className={style.ContentContainer}>
        {userId && <CurrentWeekRange></CurrentWeekRange>}

        {daysQuery && (
          <HomeContent
            daysQuery={daysQuery}
            training={training}
            userId={userId}
            menu={menu}
          ></HomeContent>
        )}

        {daysQuery === undefined ? (
          <div></div>
        ) : (
          todayMenu(menu, daysQuery)?.map((el, index) => (
            <div className={style.MenuContent}>
              <h3 className={style.graphic}>Таблиця меню</h3>
              <table border="1">
                <thead>
                  <tr>
                    <th>Сніданок:</th>
                    <th>Другий сніданок:</th>
                    <th>Обід:</th>
                    <th>Полуденок:</th>
                    <th>Вечеря:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td> {el.dayMenu.breakfast}</td>
                    <td>{el.dayMenu.secondBreakfast}</td>
                    <td>{el.dayMenu.dinner}</td>
                    <td>{el.dayMenu.afternoonSnack}</td>
                    <td>{el.dayMenu.supper}</td>
                    {/* <td key={el.name}>Основні мишци: {el.mainMuscle}</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
      {todayIs === daysQuery && (
        <form onSubmit={handleSubmit} className={style.questionForm}>
          <h3>
            Дайти відповідь на запитання, це доможе корегувати ваші майбутні
            тренування, а також збереже сьогоднішнє тренування для перегляду в
            майбутньому
          </h3>{' '}
          <label name="male" for="easy">
            <input
              type="radio"
              name="question"
              value="easy"
              onChange={handleChange}
              id="easy"
            />
            Я легко впорався з поставленим завданням
          </label>
          <label for="normal" name="female">
            <input
              type="radio"
              name="question"
              value="normal"
              id="normal"
              onChange={handleChange}
            />
            Було доволі важко, але в цілому я все виконав
          </label>
          <label for="hard" name="female">
            <input
              type="radio"
              name="question"
              value="hard"
              id="hard"
              onChange={handleChange}
            />
            Було дуже важко, я не зміг виконати вправу
          </label>
          <br />
          <button type="submit">Відправити відповідь</button>
        </form>
      )}
    </div>
  );
};

export default Home;
