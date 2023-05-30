import { Route, Routes } from 'react-router'
import { HomePage } from './containers/HomePage'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<HomePage />} />
            </Routes>
        </>
    )
}

export default App
