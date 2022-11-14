import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import {faCopy, faLock, faLockOpen, faRotate, faS, faShare} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core"
import './index.css'
import App from './components/App/App'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

library.add(faS, faLock, faLockOpen, faCopy, faRotate, faShare)

if(!window.location.hash) {
    window.location.hash = "#/"
}
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<App />}>
                    <Route path={':colorId'} element={<App />} />
                </Route>
                <Route path={'*'} element={<Navigate to={"/"} />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);
