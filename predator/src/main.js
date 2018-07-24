import style from '../scss/style.scss'
import mojs from 'mo-js'

let config = {
  flashDuration: 500,
  triangleDuration: 1000,
  animationRunning: false
}

const fire = (e) => {
  const pos = {
    x: `${e.clientX}px`,
    y: `${e.clientY}px`
  }
  if(!config.animationRunning) {
    startTargeting(pos)
  }
}

const startTargeting = (pos) => {
  config.animationRunning = true;
  if(document.querySelector('.lasersight')) {
    document.querySelector('.lasersight').remove()
  }
  const timing = {
    duration:config.flashDuration,
    iterations:1
  }

  const animProps = [
    { backgroundColor: '#aaaaaa'},
    { backgroundColor: '#333333'},
  ]

  const flash = document.body.animate(
    animProps,
    timing
  )

  flash.onfinish = (data) => {
    targetTriangle(pos)
  }
}

const targetTriangle = (pos) => {
  new mojs.Shape({
    shape: 'polygon',
    radius: 100,
    radiusY: 100,
    left: pos.x,
    top: pos.y,
    fill: 'none',
    stroke: 'red',
    isShowStart:  true,
    strokeWidth: {40:8},
    duration:config.triangleDuration,
    scale: {5:1},
    easing: 'cubic.out',
    isShowEnd: false,
    onComplete: function() {
      this.el.remove()
      laserSight(pos)
    }
  }).play()
}

const laserSight = (pos) => {
  new mojs.Burst({
    className: 'lasersight',
    top: pos.y,
    left: pos.x,
    radius:   { 70: 100 },
    count:    3,
    isShowEnd: true,
    children: {
      fill:       { 'white' : 'red' },
      duration:   500,
      scale: {0.5: 1},
      radius: 20
    },
    onComplete: function() {
      config.animationRunning = false
    }
  }).play()
}

document.body.addEventListener('click', fire, true);