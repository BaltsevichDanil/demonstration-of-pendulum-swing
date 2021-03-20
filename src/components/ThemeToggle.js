import React from 'react'
import { ThemeContext } from '../hooks/themeContext'
import Switch from 'react-switch'
import { BiMoon, BiSun } from 'react-icons/bi'

const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)

  const isDark = () => theme === 'dark'

  const handleChange = checked => setTheme(checked ? 'dark' : 'light')

  return (
    <div className='flex items-center justify-between w-24'>
      {isDark() ? (
        <BiMoon color='#fff' size='25' />
      ) : (
        <BiSun color='#000' size='25' />
      )}
      <Switch
        checked={isDark()}
        onChange={handleChange}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor='#edf2ff'
        offColor='#283141'
        height={25}
        width={50}
        offHandleColor='#000'
        onHandleColor='#fff'
      />
    </div>
  )
}

export default ThemeToggle
