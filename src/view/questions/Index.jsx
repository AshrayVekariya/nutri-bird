import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import parrotImg from '../../assets/questions/finch-anim.glb';
import life1 from '../../assets/questions/life-1.svg';
import life2 from '../../assets/questions/life-2.svg';
import life3 from '../../assets/questions/life-3.svg';
import grani1 from '../../assets/questions/grani-1.svg';
import grani2 from '../../assets/questions/grani-2.svg';
import grani3 from '../../assets/questions/grani-3.svg';
import grani4 from '../../assets/questions/grani-4.svg';
import frugi1 from '../../assets/questions/frugi-1.svg';
import frugi2 from '../../assets/questions/frugi-2.svg';
import frugi3 from '../../assets/questions/frugi-3.svg';
import necta1 from '../../assets/questions/necta-1.svg';
import necta2 from '../../assets/questions/necta-2.svg';
import omni1 from '../../assets/questions/omni-1.svg';
import pellets from '../../assets/questions/pellets.png';


const data = [
    {
        lable: "SEED-EATING BIRDS",
        birds: [
            {
                image: grani1,
                label: "Canaries & finches"
            },
            {
                image: grani2,
                label: "Budgies & other small parakeets"
            },
            {
                image: grani3,
                label: "Big parakeets"
            },
            {
                image: grani4,
                label: "Parrots"
            },
        ]
    },
    {
        lable: "FRUIT- & INSECT-EATING BIRDS",
        birds: [
            {
                image: frugi1,
                label: "Canaries & finches"
            },
            {
                image: frugi2,
                label: "Budgies & other small parakeets"
            },
            {
                image: frugi3,
                label: "Big parakeets"
            },
        ]
    },
    {
        lable: "NECTAR-EATING BIRDS",
        birds: [
            {
                image: necta1,
                label: "Canaries & finches"
            },
            {
                image: necta2,
                label: "Budgies & other small parakeets"
            },
        ]
    },
    {
        lable: "OMNIVOROUS BIRDS",
        birds: [
            {
                image: omni1,
                label: "Hornbills"
            },
        ]
    }
]

const Questions = () => {
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

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        scene.add(directionalLight);


        const loader = new GLTFLoader();
        loader.load(parrotImg, (gltf) => {
            parrotRef.current = gltf.scene;

            parrotRef.current.scale.set(0.199, 0.199, 0.199);
            parrotRef.current.rotation.set(0, 1.7, 0);
            parrotRef.current.position.set(-3, -1, 0);

            scene.add(parrotRef.current);
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[0]);
            action.play();
        });

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            if (mixerRef.current) mixerRef.current.update(0.01);

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <>
            <div className="relative h-48 md:h-64 w-full overflow-hidden">
                <div className="absolute left-0 top-[17vh] md:top-[21vh] transform scale-125 -rotate-[5deg] bg-[#30302f] w-full h-32 md:h-48"></div>
            </div>
            <div className="bg-[#30302f]">
                <div className="relative pt-[22vh]">
                    <div className='container mx-auto px-10'>
                        <h1 className='text-3xl md:text-5xl lg:text-[3.646vw] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#86ff49] via-[#02bd40] via-[#00b6b6] via-[#0094c6] to-[#0aa]'>FIND THE RIGHT BIRD NUTRATION <br /> WITH 3 SIMPLE QUESTIONS</h1>
                        <h2 className='text-xl lg:text-[2.24vw] font-bold text-white mt-10'><span className="text-[#6c3]">01.</span> TYPE OF BIRD?</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 text-white'>
                            {
                                data.map((items, index) => {
                                    return (
                                        <div key={index}>
                                            <p className="text-[#838b95] font-bold">{items.lable}</p>
                                            <ul className="mt-5">
                                                {
                                                    items.birds.map((bird, birdIndex) => {
                                                        return (
                                                            <li key={birdIndex} className="mt-5 flex gap-3 items-center">
                                                                <div className="bg-[#454748] rounded-tr-lg rounded-bl-lg">
                                                                    <img src={bird.image} alt="" height={70} width={70} />
                                                                </div>
                                                                <span className="text-sm xl:text-xl">{bird.label}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div ref={mountRef} className="relative z-[5]">
                    <div className='absolute w-full top-0'>
                        <div className='container mx-auto px-10'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-[15vw]'>
                                <div></div>
                                <div className="text-white">
                                    <h1 className='text-xl lg:text-[2.24vw] font-bold text-white'><span className="text-[#6c3]">02.</span> STAGE OF LIFE?</h1>
                                    <ul className="mt-10">
                                        <li className="mt-5 flex gap-3 items-center">
                                            <div className="bg-[#454748] rounded-tr-lg rounded-bl-lg">
                                                <img src={life1} alt="" height={70} width={70} />
                                            </div>
                                            <span className="text-sm md:text-xl">Maintenance</span>
                                        </li>
                                        <li className="mt-5 flex gap-3 items-center">
                                            <div className="bg-[#454748] rounded-tr-lg rounded-bl-lg">
                                                <img src={life2} alt="" height={70} width={70} />
                                            </div>
                                            <span className="text-sm md:text-xl">Breeding</span>
                                        </li>
                                        <li className="mt-5 flex gap-3 items-center">
                                            <div className="bg-[#454748] rounded-tr-lg rounded-bl-lg">
                                                <img src={life3} alt="" height={70} width={70} />
                                            </div>
                                            <span className="text-sm md:text-xl">Growth</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative container mx-auto px-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 text-white'>
                        <h2 className='text-xl lg:text-[2.24vw] font-bold text-white'><span className="text-[#6c3]">03.</span> FROM OF NUTRITION?</h2>
                        <div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <span className="text-xs border-2 border-[#838b95] rounded-tr-lg rounded-bl-lg p-5 w-full text-center">PELLETS</span>
                                <span className="text-xs border-2 border-[#838b95] rounded-tr-lg rounded-bl-lg p-5 w-full text-center">SOFT FOOD</span>
                                <span className="text-xs border-2 border-[#838b95] rounded-tr-lg rounded-bl-lg p-5 w-full text-center">HAND-REARING</span>
                                <span className="text-xs border-2 border-[#838b95] rounded-tr-lg rounded-bl-lg p-5 w-full text-center">LIQUIDS</span>
                            </div>
                        </div>
                        <div>
                            <img src={pellets} className="mx-auto" alt="pellets" height={480} width={480} />
                        </div>
                        <div>
                            <ul className="mt-20 list-disc marker:text-green-600">
                                <li className="mx-5 text-[14px] leading-6 lg:text-[1.146vw] lg:leading-[2.448vw]">All-in-one, complete and balanced daily nutrition</li>
                                <li className="mx-5 text-[14px] leading-6 lg:text-[1.146vw] lg:leading-[2.448vw]">Prevents selective eating behaviour</li>
                                <li className="mx-5 text-[14px] leading-6 lg:text-[1.146vw] lg:leading-[2.448vw]">For seed-, fruit- and insect-eating birds and hornbills</li>
                                <li className="mx-5 text-[14px] leading-6 lg:text-[1.146vw] lg:leading-[2.448vw]">Available in maintenance and breeding formulas</li>
                                <li className="mx-5 text-[14px] leading-6 lg:text-[1.146vw] lg:leading-[2.448vw]">Optimal size, shape and ingredients for every bird</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Questions;