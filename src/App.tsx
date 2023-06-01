import { Route, Routes } from 'react-router'
import { HomePage } from './containers/HomePage'
import { AuthPage } from './containers/Auth/AuthPage'
import { RegisterPage } from './containers/Auth/RegisterPage'
import { NotFoundPage } from './containers/Errors/404'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/login" element={<AuthPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default App
