import React, { useEffect, useState } from 'react'
import styles from './AuthPage.module.sass'
import { Button, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/requests'
import Cookie from 'js-cookie'

export interface authData {
    identifier: string
    password: string
}

export const AuthPage = () => {
    const [user, setUser] = useState<authData>({
        identifier: '',
        password: '',
    })

    const navigate = useNavigate()

    const [loginSubmit, setLoginSubmit] = useState<boolean>(false)

    useEffect(() => {
        if (user.identifier !== '' && user.password !== '') {
            setLoginSubmit(false)
        } else {
            setLoginSubmit(true)
        }
    }, [user])

    const submit = (e: React.FormEvent<SubmitEvent>) => {
        e.preventDefault()
        loginUser(user).then((resp) => {
            Cookie.set('token', resp.data.jwt, { expires: 7 })
            navigate('/')
        })
    }

    const change = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev: authData) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <h2 className={styles['form-title']}>Авторизация</h2>
            <div className={styles['form-content']}>
                <TextField
                    id="outlined-basic"
                    label="Логин"
                    variant="outlined"
                    name="identifier"
                    required
                    onChange={change}
                />
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="Пароль"
                    variant="outlined"
                    name="password"
                    required
                    onChange={change}
                />
                <Button variant="contained" type="submit" disabled={loginSubmit}>
                    Войти
                </Button>
                <span>
                    Нету аккаунта? Тогда <Link to="/auth/register">зарегистрируйтесь</Link>
                </span>
            </div>
        </form>
    )
}
