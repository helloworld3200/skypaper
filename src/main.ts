import './scss/style.scss'

import * as THREE from 'three'

import { options } from './options'

import shader_skyFrag from './glsl/skyFrag.glsl?raw';
import shader_skyVert from './glsl/skyVert.glsl?raw';

class App {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    
    private sky = {
        geo: new THREE.SphereGeometry(1000, 64, 64),
        mat: new THREE.ShaderMaterial({}),
        
    };

    constructor() {
        this.scene = new THREE.Scene();

        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(options.fov, aspect, options.near, options.far);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const element = document.getElementById('canvas-3d');
        if (element) {
            element.appendChild(this.renderer.domElement);
        }

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    private onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate() {
        this.renderer.setClearColor(options.clear_colour, 1)

        this.renderer.render(this.scene, this.camera);
    }

    public start() {
        this.renderer.setAnimationLoop(() => {
            this.animate();
        });
    }
}

function main() {
    const app = new App();

    app.start();
}

main();
