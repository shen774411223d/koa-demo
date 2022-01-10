const fs = require('fs')
const path = require('path')
const dotEnvFile = path.resolve(process.cwd(), '.env')
const dotEnv = fs.readFileSync(dotEnvFile).toString()

const parse = (txt) => {
  const env = {}
  txt.split('\n').forEach(t => {
    const [key, value] = t.split('=')
    env[key] = value
  })
  return env
}

const env = parse(dotEnv)
Object.assign(process.env, env)
console.log(process.env)