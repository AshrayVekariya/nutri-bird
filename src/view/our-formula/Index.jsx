import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import parrotModel from '../../assets/our-formula/toucan.glb';
import breeding from '../../assets/our-formula/breeding.svg';
import formula from '../../assets/our-formula/formula.svg';
import growth from '../../assets/our-formula/growth.svg';
import maintenance from '../../assets/our-formula/maintenance.svg';
import { gsap } from 'gsap';

const OurFormula = () => {
    const mountRef = useRef(null);
    const birdRef = useRef(null);
    const scrollYRef = useRef(0);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const cursor = {
            x: 0,
            y: 0,
        };

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(2, 5, 3);
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(parrotModel, (gltf) => {
            const bird = gltf.scene;
            birdRef.current = bird;
            bird.position.set(6, -2.5, 0);
            bird.rotation.set(0.05, -1.6, 0);
            bird.scale.set(0.110, 0.110, 0.110);
            scene.add(bird);

            const onMouseMove = (e) => {
                cursor.x = -(e.clientX / window.innerWidth - 0.5) * 0.2;

                gsap.from(camera.position, {
                    x: cursor.x * 5,
                    duration: 3,
                    ease: 'power2.out'
                });
            };

            const animate = function () {
                requestAnimationFrame(animate);
                window.addEventListener('mousemove', onMouseMove);
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

        const handleScroll = () => {
            const rect = mountRef.current.getBoundingClientRect();
            const currentScrollY = window.scrollY;

            if (birdRef.current) {
                const rotationValue = (currentScrollY / 100) * (Math.PI / 480); // Adjust divisor for rotation speed
                gsap.to(birdRef.current.rotation, {
                    x: rotationValue,
                    duration: 0.3,
                    ease: 'power1.out',
                });


                if (rect.top < 300 && rect.bottom > 0) {
                    const direction = currentScrollY > scrollYRef.current ? 1 : -1;

                    let positionY = birdRef.current.position.y;
                    positionY += direction * 0.2;

                    positionY = Math.max(-3, Math.min(positionY, 3));

                    gsap.to(birdRef.current.position, {
                        y: positionY,
                        duration: 0.3,
                        ease: 'power1.out',
                    });

                    scrollYRef.current = currentScrollY;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="relative h-[100vh]">
                <div className="absolute h-48 md:h-64 w-full overflow-hidden z-[-1]">
                    <div className="absolute left-0 top-[-10vh] transform scale-125 -rotate-[5deg] bg-[#30302f] w-full h-32 md:h-48"></div>
                </div>
                <div ref={mountRef}>
                    <div className='absolute w-full'>
                        <div className='container mx-auto px-10'>
                            <div className='grid grid-cols-1 gap-4'>
                                <div className='pt-[400px]'>
                                    <div>
                                        <h1 className='text-3xl md:text-5xl lg:text-[3.333vw] font-bold lg:max-w-[40%]'>PERFECTLY BALANCED FOR EVERY BIRD</h1>
                                        <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium mt-10 w-full md:w-96'>Our NutriBird formula guarantees a balanced nutrition for every bird at every stage of life.</p>
                                    </div>
                                    <div className='flex flex-col lg:flex-row items-center justify-center gap-20 mt-10 lg:mt-[-5.5vw]'>
                                        <div>
                                            <img src={formula} alt="formula" height={138} width={138} />
                                        </div>
                                        <div>
                                            <img src={breeding} alt="breeding" height={154} width={301} className='mb-5' />
                                            <img src={maintenance} alt="maintenance" height={154} width={301} className='mb-5'/>
                                            <img src={growth} alt="growth" height={154} width={301} className='mb-5'/>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurFormula;


