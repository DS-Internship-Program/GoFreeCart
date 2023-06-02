import React, { FormEvent, useEffect, useState } from 'react'
import styles from './AuthPage.module.sass'
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import { createUser } from '../../api/requests'

export interface registerData {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
}

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [confirmPass, setConfirmPass] = useState<string>('')

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    })

    const [regSubmit, setRegSubmit] = useState<boolean>(false)

    useEffect(() => {
        const userData = Object.keys(user).map((key) => {
            if (user[key] !== '') {
                return true
            } else {
                return false
            }
        })
        if (user.password === confirmPass && user.password !== '' && !userData.includes(false)) {
            setRegSubmit(true)
        } else {
            setRegSubmit(false)
        }
    }, [user, confirmPass])

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev: registerData) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const submit = (e: FormEvent) => {
        e.preventDefault()
        createUser(user).then((resp: { jwt: string; user: object }) => {
            Cookie.set('token', resp.jwt, { expires: 7 })
        })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <h2 className={styles['form-title']}>Регистрация</h2>
            <div className={styles['form-content']}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Имя"
                        variant="outlined"
                        name="firstname"
                        required
                        onChange={change}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Фамилия"
                        variant="outlined"
                        name="lastname"
                        required
                        onChange={change}
                    />
                </Box>
                <TextField
                    id="outlined-basic"
                    label="Никнейм"
                    variant="outlined"
                    name="username"
                    required
                    onChange={change}
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="email"
                    required
                    onChange={change}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Пароль"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        onChange={change}
                        name="password"
                        required
                        helperText={user.password !== confirmPass && `Пароли не совпадают`}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Повторите пароль"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setConfirmPass(e.target.value)
                        }
                        name="confirmPassword"
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Показывать пароль"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmPass(e.target.value)
                    }
                />

                <Button variant="contained" type="submit" disabled={!regSubmit}>
                    Создать аккаунт
                </Button>
                <span>
                    Есть аккаунт? Тогда <Link to="/auth/login">авторизуйтесь</Link>
                </span>
            </div>
        </form>
    )
}
