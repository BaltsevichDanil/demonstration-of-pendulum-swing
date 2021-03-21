import React, { useRef } from 'react'

const Canvas = props => {
  const canvasRef = useRef(null)

  // const [run, setRun] = useState(false)
  // const [interval] = useState(30)
  //
  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //   ctx.fillStyle = '#000000'
  //   ctx.beginPath()
  //   ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
  //   ctx.fill()
  // }
  //
  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   const interval = 30
  //   let run = false
  // }, [draw])

  return (
    <div>
      <h1 className='text-primary text-center text-3xl md:text-5xl mb-10'>
        Oscillation of a mathematical pendulum
      </h1>
      <div className='flex flex-col md:flex-row justify-center items-center md:items-start w-full'>
        <div className='border border-primary canvas mr-0 mb-10 md:mr-10 md:mb-0'>
          <canvas ref={canvasRef} {...props} />
        </div>
        <div>
          <div className='text-primary text-md md:text-xl mb-10'>
            <label htmlFor='angle' className='mr-2'>
              Initial deflection of the pendulum:
            </label>
            <input
              type='text'
              id='angle'
              className='bg-primary border border-primary outline-none text-center'
              size={3}
              placeholder='1-90'
            />
            <label htmlFor='angle' className='text-3xl ml-2'>
              &deg;
            </label>
          </div>
          <div className='text-primary text-md md:text-xl mb-10'>
            <label htmlFor='length' className='mr-2'>
              Suspension length:
            </label>
            <input
              type='text'
              id='length'
              className='bg-primary border border-primary outline-none text-center'
              size={3}
              placeholder='0.1-2'
            />
            <label htmlFor='length' className='text-xl ml-2'>
              m
            </label>
          </div>
          <div className='text-primary text-md md:text-xl'>
            <label htmlFor='deceleration' className='mr-2'>
              Deceleration:
            </label>
            <input
              type='text'
              id='deceleration'
              className='bg-primary border border-primary outline-none text-center'
              size={6}
              placeholder='0.0001-2'
            />
          </div>
          <div className='w-full h-10 mt-10 text-center md:text-left'>
            <button className='fancy-btn w-2/4 h-10 text-2xl'>Start</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Canvas
