import React, { FC, useContext, useState } from 'react';
import styles from './AuthForm.module.scss';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context);

    return (
        <div className={styles.container}>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button className={styles.button} onClick={() => store.login(email, password)}>
                Войти
            </button>
            <div className={styles.registrationLink}>
                Нет аккаунта? <Link to="/register" className={styles.registerLink}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default observer(LoginForm);
