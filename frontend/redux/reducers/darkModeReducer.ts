import { createSlice } from '@reduxjs/toolkit'

export type DarkModeStateType = {
    darkMode: boolean
}

const DarkModeSlice = createSlice({
    name: 'DarkMode',
    initialState: {
        darkMode: false,
    },
    reducers: {
        initTheme: (state: DarkModeStateType) => {
            const storageDarkmode = window.localStorage.getItem('dark-mode') === 'true'
            const htmlSelector = document.querySelector('html')

            if (storageDarkmode) {
                htmlSelector?.classList.add('dark')
            }

            state.darkMode = storageDarkmode
        },
        toggleTheme: (state: DarkModeStateType) => {
            const localStorage = window.localStorage

            const currentValue = localStorage.getItem('dark-mode')
            const htmlSelector = document.querySelector('html')

            localStorage.setItem('dark-mode', currentValue === 'true' ? 'false' : 'true')

            htmlSelector?.classList.toggle('dark')

            state.darkMode = !state.darkMode
        },
    },
})

export const { initTheme, toggleTheme } = DarkModeSlice.actions

export default DarkModeSlice.reducer
