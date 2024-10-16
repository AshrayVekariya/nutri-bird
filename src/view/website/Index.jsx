import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import parrotImg from '../../assets/website/macaw.glb';
import { gsap } from 'gsap';

const Website = () => {
    const mountRef = useRef(null);
    const parrotRef = useRef(null);
    const mixerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 0);

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
        directionalLight.position.set(0, 3, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(parrotImg, (gltf) => {
            parrotRef.current = gltf.scene;

            parrotRef.current.scale.set(0.06, 0.06, 0.06);
            parrotRef.current.rotation.set(0.3, 3, 0);
            parrotRef.current.position.set(-4, -12, 0);

            scene.add(parrotRef.current);
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[0]);
            action.play();
        });

        camera.position.z = 5;

        const cursor = {
            x: 0,
            y: 0,
        };

        const handleScroll = () => {
            const rect = mountRef.current.getBoundingClientRect();

            const translateY = (rect.y / rect.height);

            if (parrotRef.current) {
                gsap.to(parrotRef.current.position, {
                    x: -translateY - 4.5,
                    y: -translateY - 2,
                    duration: 2,
                    ease: 'power2.out',
                });
            }
        };

        const onMouseMove = (e) => {
            cursor.x = -(e.clientX / window.innerWidth - 0.5) * 0.2;

            gsap.from(camera.position, {
                x: cursor.x * 5,
                duration: 3,
                ease: 'power2.out'
            });
        };

        const animate = () => {
            requestAnimationFrame(animate);
            if (mixerRef.current) mixerRef.current.update(0.01);

            window.addEventListener('mousemove', onMouseMove);
            if (parrotRef.current) {
                window.addEventListener('scroll', handleScroll);
            }
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <>
            <div ref={mountRef} className='relative'>
                <div className='absolute w-full top-0 z-[-5] mt-[150px]'>
                    <div className='container mx-auto px-10'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div></div>
                            <div>
                                <h1 className='text-3xl md:text-5xl lg:text-[3.333vw] font-bold'>ARE YOU READY TO LET YOUR BIRDS SHINE?</h1>
                                <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium mt-10'>Discover the new NutriBird at www.versele-laga.com/nutribird or in your pet shop.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Website;

