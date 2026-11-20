/**
 * Animated contour lines (a topographic map of drifting noise) that brighten
 * around the pointer. WebGL2, one full-screen triangle, no dependencies.
 */

const VERTEX = /* glsl */ `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uAccent;
out vec4 outColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.3, 9.1); a *= 0.5; }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.035;

  vec2 q = p * 1.35;
  q += 0.45 * vec2(fbm(q + t), fbm(q - t + 4.2));
  float d = length(p - m);
  float glow = exp(-d * d * 4.5);
  float n = fbm(q + vec2(t, -t * 0.6)) + 0.16 * glow;

  float v = n * 11.0;
  float w = fwidth(v);
  float fine = 1.0 - smoothstep(w * 0.7, w * 1.7, abs(fract(v) - 0.5));
  float bold = 1.0 - smoothstep(w * 0.3, w * 0.75, abs(fract(v * 0.25) - 0.5));

  vec3 col = vec3(0.027, 0.031, 0.039);
  col += vec3(0.62, 0.66, 0.74) * fine * 0.055;
  col += uAccent * fine * (0.05 + 0.5 * glow);
  col += uAccent * bold * (0.10 + 0.35 * glow);
  col += uAccent * glow * 0.035;
  col *= mix(0.5, 1.0, smoothstep(1.25, 0.25, length(p)));
  outColor = vec4(col, 1.0);
}`

export interface ContourRenderer {
  setAccent: (rgb: [number, number, number]) => void
  destroy: () => void
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("Could not create shader")
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile failed")
  }
  return shader
}

/** Starts the animation on `canvas`. Returns null when WebGL2 is unavailable. */
export function createContourRenderer(
  canvas: HTMLCanvasElement,
  { animate = true }: { animate?: boolean } = {},
): ContourRenderer | null {
  const gl = canvas.getContext("webgl2", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  })
  if (!gl) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed")
  }
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, "aPos")
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(program, "uRes")
  const uTime = gl.getUniformLocation(program, "uTime")
  const uMouse = gl.getUniformLocation(program, "uMouse")
  const uAccent = gl.getUniformLocation(program, "uAccent")
  gl.uniform3f(uAccent, 0.784, 1, 0.243)

  const scale = Math.min(window.devicePixelRatio || 1, 1.5)
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const started = performance.now()
  let visible = true
  let frame = 0

  const resize = () => {
    const width = Math.max(1, Math.round(canvas.clientWidth * scale))
    const height = Math.max(1, Math.round(canvas.clientHeight * scale))
    if (canvas.width === width && canvas.height === height) return
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
    gl.uniform2f(uRes, width, height)
    if (!mouse.tx && !mouse.ty) {
      mouse.x = mouse.tx = width * 0.72
      mouse.y = mouse.ty = height * 0.55
    }
  }

  const draw = (now: number) => {
    resize()
    mouse.x += (mouse.tx - mouse.x) * 0.06
    mouse.y += (mouse.ty - mouse.y) * 0.06
    gl.uniform1f(uTime, (now - started) / 1000)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const loop = (now: number) => {
    frame = 0
    if (!visible || document.hidden) return
    draw(now)
    frame = requestAnimationFrame(loop)
  }
  const wake = () => {
    if (animate && !frame) frame = requestAnimationFrame(loop)
  }

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    mouse.tx = (event.clientX - rect.left) * scale
    mouse.ty = (rect.height - (event.clientY - rect.top)) * scale
  }
  const onResize = () => {
    if (!animate) draw(performance.now())
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    wake()
  })

  window.addEventListener("pointermove", onPointerMove, { passive: true })
  window.addEventListener("resize", onResize)
  document.addEventListener("visibilitychange", wake)
  observer.observe(canvas)
  draw(performance.now())
  wake()

  return {
    setAccent([r, g, b]) {
      gl.uniform3f(uAccent, r, g, b)
      if (!animate) draw(performance.now())
    },
    destroy() {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", wake)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}
