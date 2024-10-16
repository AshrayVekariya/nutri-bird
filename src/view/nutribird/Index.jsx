import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import lovebirds from './../../assets/nutri-birds/lovebirds.glb';

function BirdScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(2, 5, 3);
        scene.add(directionalLight);

        const cursor = {
            x: 0,
            y: 0,
        };

        const loader = new GLTFLoader();
        loader.load(lovebirds, (gltf) => {
            const bird = gltf.scene;
            bird.position.set(6, -0.6, 0);
            bird.rotation.set(0.05, -1.2, 0);
            bird.scale.set(0.22, 0.24, 0.25);
            scene.add(bird);

            gsap.fromTo(
                bird.rotation,
                { y: -2, x: 1 },
                {
                    y: -1, x: 0, duration: 2, ease: "power2.inOut",
                    onComplete: () => {
                        window.addEventListener('mousemove', onMouseMove);
                    }
                }
            );

            gsap.fromTo(
                bird.position,
                { x: 11, y: -4 },
                {
                    x: 1.5, y: -0.5, duration: 2, ease: "power2.inOut",
                    onComplete: () => {
                        window.addEventListener('mousemove', onMouseMove);
                    }
                },

            );

            const onMouseMove = (e) => {
                cursor.x = -(e.clientX / window.innerWidth - 0.5) * 0.04;
                cursor.y = (e.clientY / window.innerHeight - 0.5) * 0.04;

                gsap.from(camera.position, {
                    x: cursor.x * 2,
                    y: cursor.y * 2,
                    duration: 3,
                    ease: 'power2.out'
                });
            };

            const animate = function () {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };

            animate();
        });

        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            renderer.setSize(innerWidth, innerHeight);
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div ref={mountRef} className='relative h-screen'>
                <div className='absolute w-full top-0 z-[-3]'>
                    <div className='container mx-auto px-10'>
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 w-full'>
                            <div className='pt-[110px] md:pt-[11.51vw]'>
                                <h1 className='text-[40px] leading-[42px] md:text-[58px] lg:text-[4.792vw] md:leading-[78px] lg:leading-[5.313vw] lg:max-w-[50%] font-bold'>WE ARE NUTRIBIRD</h1>
                                <div className='mt-5 md:mt-10'>
                                    <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium'>We are NutriBird, for bird owners to carefree give the best to</p>
                                    <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium'>their birds. We’re obsessed with making birds look and perform</p>
                                    <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium'>at their best. We specialise in complete and balanced all-in-one</p>
                                    <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium'>nutrition formulas for all bird species, at every life stage.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BirdScene;