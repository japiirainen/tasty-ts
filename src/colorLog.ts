const supported = /_color|ansi|cygwin|linux|xterm-256color/i.test(
  process.env.TERM ?? ''
)

const colors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  gray: 90,
}

const log =
  (color: keyof typeof colors) =>
  (msg: string): void => {
    if (supported)
      process.stdout.write(`\u001b[${colors[color]}m${msg}\u001b[39m`)
    else process.stdout.write(msg)
    return
  }

const logLn =
  (color: keyof typeof colors) =>
  (msg: string): void =>
    log(color)(msg + '\n')

export const plack = log('black')
export const plackLn = logLn('black')
export const red = log('red')
export const redLn = logLn('red')
export const green = log('green')
export const greenLn = logLn('green')
export const yellow = log('yellow')
export const yellowLn = logLn('yellow')
export const blue = log('blue')
export const blueLn = logLn('blue')
export const magenta = log('magenta')
export const magentaLn = logLn('magenta')
export const cyan = log('cyan')
export const cyanLn = logLn('cyan')
export const white = log('white')
export const whiteLn = logLn('white')
export const gray = log('gray')
export const grayLn = logLn('gray')
