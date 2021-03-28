import React, { useRef, useEffect, useState } from 'react'
import toast from 'toasted-notes'

const Canvas = props => {
  const canvasRef = useRef(null)

  const [animating, setAnimating] = useState(false)
  const [fetchPeriod, setFetchPeriod] = useState(0)
  const [length, setLength] = useState(0)

  const drawPendulum = (canvas, ctx, time) => {
    if (animating) {
      const amplitude = Math.PI / 4
      const period = fetchPeriod * 1000
      let theta
      const pendulumLength = length * 100
      const pendulumWidth = 5
      const rotationPointX = canvas.width / 2
      const rotationPointY = 20

      theta = (amplitude * Math.sin((2 * Math.PI * time) / period)) + Math.PI / 2

      ctx.beginPath()
      ctx.moveTo(0, rotationPointY - 3)
      ctx.lineTo(canvas.width, rotationPointY - 3)
      ctx.lineWidth = 6
      ctx.fillStyle = 'black'
      ctx.stroke()
      ctx.beginPath()
      let endPointX = rotationPointX + (pendulumLength * Math.cos(theta))
      let endPointY = rotationPointY + (pendulumLength * Math.sin(theta))
      ctx.beginPath()
      ctx.moveTo(rotationPointX, rotationPointY)
      ctx.lineTo(endPointX, endPointY)
      ctx.lineWidth = pendulumWidth
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#000'
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(endPointX, endPointY, 20, 0, 2 * Math.PI, false)
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
      const time = new Date()
      frame = time.getTime()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawPendulum(canvas, ctx, frame)
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }

  }, [drawPendulum])


  const handleClick = () => {
    if (!animating) {
      if (fetchPeriod && length) {
        if (isFinite(fetchPeriod) && isFinite(length)) {
          if (fetchPeriod >= 2 && fetchPeriod <= 6 && length >= 1 && length <= 3) {
            setAnimating(true)
          } else toast.notify('Invalid values entered!')
        } else toast.notify('Invalid values entered!')
      } else toast.notify('Enter values!')
    } else setAnimating(false)
  }


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
              Period:
            </label>
            <input
              type='text'
              id='period'
              className='bg-primary border border-primary outline-none text-center'
              size={3}
              placeholder='2-6'
              onChange={e => setFetchPeriod(e.currentTarget.value)}
              disabled={animating}
            />
            <label htmlFor='angle' className='text-3xl ml-2'>
              s
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
              placeholder='1-3'
              onChange={e => setLength(e.currentTarget.value)}
              disabled={animating}
            />
            <label htmlFor='length' className='text-xl ml-2'>
              m
            </label>
          </div>
          <div className='w-full h-10 mt-10 text-center md:text-left mb-10'>
            <button className='fancy-btn w-2/4 h-10 text-2xl'
                    onClick={handleClick}>{animating ? 'Stop' : 'Start'}</button>
          </div>
          {animating && (
            <div>
              <h1 className='text-primary text-md md:text-xl mb-10'>Calculated values:</h1>
              <p className='text-primary text-md md:text-xl mb-5'>Frequency:</p>
              <p className='text-primary text-md md:text-xl mb-10'>&nu; = <sup>1</sup>&frasl;
                <sub>T</sub> = <sup>1</sup>&frasl;<sub>{fetchPeriod}</sub> = {(1 / fetchPeriod).toFixed(2)} Hz</p>
              <p className='text-primary text-md md:text-xl mb-5'>Cyclic frequency:</p>
              <p className='text-primary text-md md:text-xl mb-10'>&omega; = 2&pi;&nu; =
                2&pi; * {(1 / fetchPeriod).toFixed(2)} = {(2 * Math.PI * (1 / fetchPeriod)).toFixed(2)} radian/s</p>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Canvas
