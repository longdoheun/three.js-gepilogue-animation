import * as THREE from "three/build/three.module.js";

// 필요한 three.js 라이브러리를 가져옵니다.
// import * as THREE from "three";

const scene = new THREE.Scene();

const backgroundColor = new THREE.Color("#f1f1f1");
scene.background = backgroundColor;

class Curve {
  constructor(points, color) {
    this.points = points;
    this.color = color;
  }
  get line() {
    return this.drawLine();
  }

  get mesh() {
    return this.drawMesh();
  }

  drawLine() {
    const curve = new THREE.CatmullRomCurve3(this.points);
    const material = new THREE.LineBasicMaterial({ color: this.color });
    const geometry = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(100)
    );
    return new THREE.Line(geometry, material);
  }
}

class Lines {
  constructor(points, color) {
    this.points = points;
    this.color = color;
  }
  get line() {
    return this.drawLine();
  }

  drawLine() {
    const point_matrix = [];
    for (let i = 0; i < 20; i++) {
      const rotationMatrix = new THREE.Matrix4();
      const angle = 0.1 * i; // 라디안으로 회전 각도를 설정

      // y축 주위로 회전
      rotationMatrix.makeRotationAxis(new THREE.Vector3(0, 1, 0), angle);

      // 모든 점에 회전 적용
      const rotatedPoints = this.points.map((point, i) => {
        const vector = new THREE.Vector4(
          point.x + 0.0 * i,
          point.y + 0.0 * i,
          point.z + 0.3 * i,
          1
        );
        vector.applyMatrix4(rotationMatrix);
        return new THREE.Vector3(vector.x, vector.y, vector.z);
      });
      point_matrix.push(rotatedPoints);
    }

    const lines = point_matrix.map((points) => {
      const line = new Curve(points, this.color).line;
      scene.add(line);
      return line;
    });

    return lines;
  }
}
// 곡선을 생성할 제어점을 정의합니다.
const points1 = [
  new THREE.Vector3(0.0, 12, 0),
  new THREE.Vector3(-2, 6, 0),
  new THREE.Vector3(2, -6, 0),
  new THREE.Vector3(0, -12, 0),
];

const points2 = [
  new THREE.Vector3(0, -12, 0),
  new THREE.Vector3(2, -6, 0),
  new THREE.Vector3(-2, 6, 0),
  new THREE.Vector3(0, 12, 0),
];

const newLines = new Lines(points1, "#945273").line;
const lines = new Lines(points2, "#945273").line;

// 카메라를 생성합니다.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

// 렌더러를 생성하고 웹페이지에 렌더러를 추가합니다.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 애니메이션 루프를 생성합니다.
const animate = function () {
  requestAnimationFrame(animate);

  // 곡선을 회전시킵니다.

  for (const line of newLines) {
    line.rotation.y += 0.005;
  }

  for (const line of lines) {
    line.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
};

animate();
