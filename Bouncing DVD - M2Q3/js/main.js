// Scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(); 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// Geometry setup
const dvdGeometry = new THREE.PlaneGeometry(0.4, 0.3);
const dvdMaterial = new THREE.MeshBasicMaterial(); 
const dvd = new THREE.Mesh(dvdGeometry, dvdMaterial);
scene.add(dvd);

// Variable initialization
dvd.position.set(0, 0, 0);
bouncesLeft = 8;
xSpeed = 0.016;
ySpeed = 0.011;
dvd.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));

// Making the chosen Geometry move
function animate() {
    requestAnimationFrame(animate);

    // Update position based on speed
    dvd.position.x += xSpeed;
    dvd.position.y += ySpeed;

    // HORIZONTAL SIDES Collision check and direction reversal for simulating the bounces and vanishing
    if (dvd.position.x + dvd.scale.x * dvdGeometry.parameters.width / 2 > 1 || dvd.position.x - dvd.scale.x * dvdGeometry.parameters.width / 2 < -1) {
        xSpeed *= -1;
        dvd.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));
        dvd.scale.x = Math.max(0.125, dvd.scale.x - 0.125);
        dvd.scale.y = Math.max(0.125, dvd.scale.y - 0.125);
        bouncesLeft -= 1;
    }

    // VERTICAL SIDES Collision check and direction reversal for simulating the bounces and vanishing
    if (dvd.position.y + dvd.scale.y * dvdGeometry.parameters.height / 2 > 1 || dvd.position.y - dvd.scale.y * dvdGeometry.parameters.height / 2 < -1) {
        ySpeed *= -1;
        dvd.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));
        dvd.scale.x = Math.max(0.125, dvd.scale.x - 0.125);
        dvd.scale.y = Math.max(0.125, dvd.scale.y - 0.125);
        bouncesLeft -= 1;
    }

    // Ensuring the vanishing of the geometry
    if (bouncesLeft <= 0) {
        dvd.visible = false;
    }

    renderer.render(scene, camera);
}

animate();
