import React, { useState } from 'react'

interface auth {
    identifier: string
    password: string
}

export const Auth = () => {
    const [authData, setAuthData] = useState<auth>({
        identifier: '',
        password: '',
    })

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return <div className={styles.form}></div>
}
