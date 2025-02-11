<script type="module">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.rotateSpeed = 0.5
controls.minDistance = 3
controls.maxDistance = 10

camera.position.z = 4
camera.position.y = 1.5
controls.target.set(0, 0.5, 0)
controls.update()

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xFFFFFF, 1)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

function createPyramid(height, baseSize, particleCount, colors, innerPyramid = false) {
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const particleColors = []

  for (let i = 0; i < particleCount; i++) {
    const t = Math.random()
    const u = Math.random()

    const apex = { x: 0, y: height, z: 0 }
    const base = [
      { x: -baseSize, y: 0, z: -baseSize },
      { x: baseSize, y: 0, z: -baseSize },
      { x: baseSize, y: 0, z: baseSize },
      { x: -baseSize, y: 0, z: baseSize },
    ]

    const face = Math.floor(Math.random() * 4)
    const basePoint1 = base[face]
    const basePoint2 = base[(face + 1) % 4]

    const x = (1 - t) * ((1 - u) * basePoint1.x + u * basePoint2.x) + t * apex.x
    const y = (1 - t) * 0 + t * height
    const z = (1 - t) * ((1 - u) * basePoint1.z + u * basePoint2.z) + t * apex.z

    const randomFactor = innerPyramid ? 0.03 : 0.05
    positions.push(
      x + (Math.random() - 0.5) * randomFactor,
      y + (Math.random() - 0.5) * randomFactor,
      z + (Math.random() - 0.5) * randomFactor,
    )

    const colorPos = y / height
    const color1 = colors[Math.floor(colorPos * (colors.length - 1))]
    const color2 = colors[Math.ceil(colorPos * (colors.length - 1))]
    const mixRatio = (colorPos * (colors.length - 1)) % 1

    const finalColor = new THREE.Color().lerpColors(color1, color2, mixRatio)
    particleColors.push(finalColor.r, finalColor.g, finalColor.b)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3))

  const material = new THREE.PointsMaterial({
    size: innerPyramid ? 0.012 : 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

const outerColors = [
  new THREE.Color(0x00FFFF),
  new THREE.Color(0x4169E1),
  new THREE.Color(0x9400D3),
]
const outerPyramid = createPyramid(2.5, 1.8, 5000, outerColors)

const innerColors = [
  new THREE.Color(0xFF1493),
  new THREE.Color(0xFF4500),
  new THREE.Color(0xFFD700),
]
const innerPyramid = createPyramid(1.5, 1.0, 3000, innerColors, true)

const pyramidGroup = new THREE.Group()
pyramidGroup.add(outerPyramid)
pyramidGroup.add(innerPyramid)
scene.add(pyramidGroup)

let time = 0

function animate() {
  requestAnimationFrame(animate)
  time += 0.005

  pyramidGroup.rotation.y += 0.005

  const outerScale = 1 + Math.sin(time * 2) * 0.02
  const innerScale = 1 + Math.cos(time * 2) * 0.03

  outerPyramid.scale.set(outerScale, outerScale, outerScale)
  innerPyramid.scale.set(innerScale, innerScale, innerScale)

  innerPyramid.rotation.y -= 0.003

  controls.update()
  renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
})

animate()
</script>

<style>
canvas {
  width: 100%;
  height: 100vh;
  display: block;
  /* position: fixed; */
  /* top: 50%; */
  /* left: 50%;
  transform: translate(-50%, -50%); */
}
</style>
