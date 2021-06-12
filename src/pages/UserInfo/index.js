import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../Components/routes';
import { sendForm } from '../../Components/redux/trains/operations';

import styles from './UserInfo.module.css';

const UserInfo = () => {
  const [age, setAge] = useState(18);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [changeWeight, setChangeWeight] = useState('');
  const [sport, setSport] = useState('bodybuilding');
  const [gender, setGender] = useState('');
  const [difficult, setDifficult] = useState('');
  const [targetWeekTime, setTargetWeekTime] = useState(2);

  const dispatch = useDispatch();
  const userId = useSelector((state) => console.log(state?.auth?.user?._id));
  const history = useHistory();
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'age':
        return setAge(e.target.value);
      case 'height':
        return setHeight(e.target.value);
      case 'weight':
        return setWeight(e.target.value);
      case 'male':
        return setGender(e.target.value);
      case 'changeWeight':
        return setChangeWeight(e.target.value);
      case 'sport':
        return setSport(e.target.value);
      case 'difficult':
        return setDifficult(e.target.value);
      case 'targetWeekTime':
        return setTargetWeekTime(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      age,
      height,
      weight,
      gender,
      changeWeight,
      difficult,
      targetWeekTime
    );
    if (
      age === '' ||
      height === '' ||
      weight === '' ||
      gender === '' ||
      changeWeight === '' ||
      difficult === '' ||
      targetWeekTime === ''
    ) {
      alert('Ви заповнили не всі поля');
    } else {
      setTargetWeekTime(Number(targetWeekTime));
      dispatch(
        sendForm(
          {
            age,
            height,
            weight,
            changeWeight,
            sport,
            gender,
            difficult,
            targetWeekTime,
          },
          history
        )
      );
    }
  };
  return (
    <div className={styles.container}>
      {' '}
      <form onSubmit={handleSubmit} className={styles.containerForm}>
        <label for="changeWeight">Ви хочете:</label>
        <select name="changeWeight" id="changeWeight" onChange={handleChange}>
          <option name="changeWeight" value="">
            Виберіть ціль
          </option>
          <option name="changeWeight" value="less">
            Схуднути
          </option>
          <option name="changeWeight" value="more">
            Набрати вагу
          </option>
          <option name="changeWeight" value="muscle">
            Збільшити силу
          </option>
        </select>
        <br />
        <label for="targetWeekTime">
          Скільки разів на тиждень ви хочете тренуватись:
        </label>
        <select
          name="targetWeekTime"
          id="targetWeekTime"
          onChange={handleChange}
        >
          <option name="targetWeekTime" value="">
            Виберіть кількість
          </option>
          <option name="targetWeekTime" value="2">
            2 рази
          </option>
          <option name="targetWeekTime" value="3">
            3 рази
          </option>
          <option name="targetWeekTime" value="4">
            4 рази
          </option>
          <option name="targetWeekTime" value="5">
            5 разів
          </option>
          {/* <option name="targetWeekTime" value="6">
            6 разів
          </option> */}
        </select>
        <br />
        <label for="difficult">Ваш рівень підготовки:</label>
        <select name="difficult" id="difficult" onChange={handleChange}>
          <option name="difficult" value="">
            Виберіть рівень
          </option>
          <option name="difficult" value="easy">
            Ніколи не займався в залі, або займаюсь дуже рідко
          </option>
          <option name="difficult" value="normal">
            Регулярно замаюсь в залі
          </option>
          <option name="difficult" value="hard">
            Маю високий рівень підготовки
          </option>
        </select>
        <br />
        {/* <label for="sport">Вид спорту яким ви хочете займатися:</label>
        <select name="sport" id="sport" onChange={handleChange}>
          <option name="sport" value="bodybuilding">
            BodyBuilding
          </option>
          <option name="sport" value="Crossfit">
            Crossfit
          </option>
          <option name="sport" value="Athletic">
            Athletic
          </option>
          <option name="sport" value="Swimming">
            Swimming
          </option>
        </select> */}
        <label for="height">Ваш зріст:</label>
        <input
          id="height"
          type="number"
          name="height"
          min="100"
          max="250"
          value={height}
          onChange={handleChange}
        />
        <label for="weight">Ваша вага:</label>
        <input
          type="number"
          name="weight"
          for="weight"
          min="40"
          max="200"
          value={weight}
          onChange={handleChange}
        />
        <label for="age">Ваш вік:</label>
        <input
          type="number"
          name="age"
          for="age"
          min="1"
          max="99"
          value={age}
          onChange={handleChange}
        />
        <label>
          Ваша стать:{' '}
          <input
            type="radio"
            name="male"
            value="male"
            onChange={handleChange}
            id="genderMale"
          />
          <label name="male" for="genderMale">
            Чоловіча
          </label>
          <input
            type="radio"
            name="male"
            value="female"
            id="genderFemale"
            onChange={handleChange}
          />
          <label for="genderFemale" name="female">
            Жіноча
          </label>
        </label>

        <br></br>
        <button type="submit">Відправити форму</button>
      </form>
    </div>

    // <div>
    //   <h1>Hello</h1>
    //   <form>
    //     <input type="radio" name="gender" value="male">
    //       Male
    //     </input>
    //     <input type="radio" name="gender" value="female">
    //       Female
    //     </input>
    //   </form>
    // </div>
  );
};

export default UserInfo;
