import React, { FC, useContext, useState } from 'react';
import styles from './AuthForm.module.scss';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { store } = useContext(Context);

  return (
    <div className={styles.container}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        className={styles['container__email']}
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className={styles['container__password']}
        placeholder="Пароль"
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        type="password"
        className={styles['container__confirmPassword']}
        placeholder="Подтвердите пароль"
      />
      <button className={styles.button}onClick={() => store.registration(email, password)}>
        Регистрация
      </button>
      <div className={styles.loginLink}>
        Уже есть аккаунт? <Link to="/login" className={styles.loginFormLink}>Войти</Link>
      </div>
    </div>
  );
};

export default observer(RegisterForm);