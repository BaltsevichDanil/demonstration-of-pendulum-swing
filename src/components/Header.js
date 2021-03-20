import ThemeToggle from './ThemeToggle'
import logo from '../img/logo.svg'

const LayoutHeader = () => {
  return (
    <header className='border-b border-primary'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='logo flex items-center'>
            <svg width='120' height='120'>
              <image href={logo} height='120' width='120' />
            </svg>
            <h1 className='text-primary text-3xl'>Physics</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default LayoutHeader
