import React, { useRef, useEffect, useState } from 'react'

const Canvas = props => {
  const canvasRef = useRef(null)

  const [animating, setAnimating] = useState(true)

  const drawPendulum = (canvas, ctx, time) => {
    //TODO Starting and stopping oscillations
    //TODO Swing and pendulum settings
    //TODO Some graphics
    if (animating) {
      const amplitude = Math.PI / 4
      const period = 4000
      let theta
      const pendulumLength = 350
      const pendulumWidth = 10
      const rotationPointX = canvas.width / 2
      const rotationPointY = 20

      theta = (amplitude * Math.sin((2 * Math.PI * time) / period)) + Math.PI / 2

      ctx.beginPath()
      ctx.arc(rotationPointX, rotationPointY, 15, 0, 2 * Math.PI, false)
      ctx.fillStyle = 'black'
      ctx.fill()

      ctx.beginPath()
      let endPointX = rotationPointX + (pendulumLength * Math.cos(theta))
      let endPointY = rotationPointY + (pendulumLength * Math.sin(theta))
      ctx.beginPath()
      ctx.moveTo(rotationPointX, rotationPointY)
      ctx.lineTo(endPointX, endPointY)
      ctx.lineWidth = pendulumWidth
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#555'
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(endPointX, endPointY, 40, 0, 2 * Math.PI, false)
      let grd = ctx.createLinearGradient(endPointX - 50, endPointY - 50, endPointX + 50, endPointY + 50)
      grd.addColorStop(0, '#444')
      grd.addColorStop(0.5, 'white')
      grd.addColorStop(1, '#444')
      ctx.fillStyle = grd
      ctx.fill()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let frame = 0
    let animationFrameId

    const render = () => {
      frame += 18
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawPendulum(canvas, ctx, frame)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }

  }, [drawPendulum])


  return (
    <div>
      <h1 className='text-primary text-center text-3xl md:text-5xl mb-10'>
        Oscillation of a mathematical pendulum
      </h1>
      <div className='flex flex-col md:flex-row justify-center items-center md:items-start w-full'>
        <div className='canvas border border-primary mr-0 mb-10 md:mr-10 md:mb-0'>
          <canvas ref={canvasRef} {...props} width={350} height={600} />
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
