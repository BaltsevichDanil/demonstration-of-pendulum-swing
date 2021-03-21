import React from 'react'
import { PacmanLoader } from 'react-spinners'
import { useSpring, animated } from 'react-spring'
import { AiFillGithub } from 'react-icons/ai'
import { ThemeContext } from '../hooks/themeContext'
import Header from './Header'
import Canvas from './Canvas'

const Layout = () => {
  const { theme } = React.useContext(ThemeContext)

  const isDark = () => (theme === 'dark' ? '#fff' : '#2d3748')

  const animationMain = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 3500,
  })

  const animationLoading = useSpring({
    from: { opacity: 1, display: 'flex' },
    to: async next => {
      await next({ opacity: 0 })
      await next({ display: 'none' })
    },
    delay: 3000,
  })

  return (
    <div className='font-serif layout'>
      <animated.div
        className='w-full h-full flex items-center justify-center absolute'
        style={animationLoading}
      >
        <PacmanLoader size={50} color={isDark()} />
      </animated.div>
      <animated.div
        className='w-full h-auto flex flex-col justify-between'
        style={animationMain}
      >
        <Header />
        <main className='w-full mx-auto py-10'>
          <Canvas />
        </main>
        <footer className='w-full h-32 border-t border-primary'>
          <div className='container h-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-4'>
            <div>
              <p className='text-primary text-md'>
                © 2021{' '}
                <a
                  href='https://github.com/totdlinnyy1'
                  className='hover:text-accent'
                >
                  totdlinnyy1
                </a>
              </p>
            </div>
            <div className='flex flex-col items-center md:items-start'>
              <a
                href='https://github.com/totdlinnyy1/demonstration-of-hesitation.git'
                className='text-primary hover:text-accent w-32 flex items-center justify-between mb-1'
              >
                <AiFillGithub color={isDark()} size={25} />
                View Source
              </a>
              <div className='text-primary hover:text-accent'>
                Logo made by{' '}
                <a href='https://smashicons.com/' title='Smashicons'>
                  Smashicons
                </a>{' '}
                from{' '}
                <a href='https://www.flaticon.com/' title='Flaticon'>
                  www.flaticon.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </animated.div>
    </div>
  )
}

export default Layout
