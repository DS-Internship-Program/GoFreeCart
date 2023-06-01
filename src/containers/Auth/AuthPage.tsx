import React from 'react'
import styles from './AuthPage.module.sass'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

export const AuthPage = () => {
    return (
        <div className={styles.form}>
            <h2 className={styles['form-title']}>Авторизация</h2>
            <div className={styles['form-content']}>
                <TextField id="outlined-basic" label="Логин" variant="outlined" />
                <TextField id="outlined-basic" label="Пароль" variant="outlined" />
                <Button variant="contained">Войти</Button>
                <span>
                    Нету аккаунта? Тогда <Link to="/auth/register">зарегистрируйтесь</Link>
                </span>
            </div>
        </div>
    )
}
