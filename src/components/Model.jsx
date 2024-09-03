import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models, sizes } from '../constants'

const Model = () => {
	/* ------------------------------- // useState ------------------------------ */

	const [size, setsize] = useState('small')
	const [model, setModel] = useState({
		title: 'iPhone 15 Pro in Natural Titanium',
		color: ['#8f8a81', '#ffe7b9', '#6f6c64'],
		img: yellowImg,
	})

	/* ------------------ // Camera control for the model view ------------------ */

	/* ---------------------------------- model --------------------------------- */
	const cameraControlSmall = useRef()
	const cameraControlLarg = useRef()

	const small = useRef(new THREE.Group())
	const larg = useRef(new THREE.Group())

	/* -------------------------------- rotation -------------------------------- */
	const [smallRotation, setsmallRotation] = useState(0)
	const [largRotation, setLargRotation] = useState(0)

	/* ------------------------------- // useGSAP ------------------------------- */

	useGSAP(() => {
		gsap.to('#heading', {
			y: 0,
			opacity: 1,
		})
	}, [])

	/* ----------------------------- Component Body ----------------------------- */

	return (
		<section className='common-padding'>
			<div className='screen-max-width'>
				<h1 id='heading' className='section-heading'>
					Take a closer look.
				</h1>
				<div className='flex flex-col items-center mt-5 '>
					<div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
						<ModelView
							index={1}
							groupRef={small}
							gsapType='view1'
							controlRef={cameraControlSmall}
							setRotationState={setsmallRotation}
							item={model}
							size={size}
						/>
						<ModelView
							index={2}
							groupRef={larg}
							gsapType='view2'
							controlRef={cameraControlLarg}
							setRotationState={setLargRotation}
							item={model}
							size={size}
						/>
						<Canvas
							className='w-full h-full'
							style={{
								position: 'fixed',
								top: 0,
								bottom: 0,
								overflow: 'hidden',
							}}
							eventSource={document.getElementById('root')}
						>
							<View.Port />
						</Canvas>
					</div>
					<div className='mx-auto w-full'>
						<p className='text-sm font-light text-center mb-5'>{model.title}</p>
						<div className='flex-center'>
							<ul className='color-container'>
								{models.map((item, i) => (
									<li
										className='w-6 h-6 rounded-full mx-2 cursor-pointer'
										key={i}
										style={{ background: item.color[0] }}
										onClick={() => setModel(item)}
									/>
								))}
							</ul>
							<button className='size-btn-container'>
								{sizes.map(({ label, value }) => (
									<span
										key={label}
										className='size-btn'
										style={{
											backgroundColor: size === value ? 'white' : 'transparent',
											color: size === value ? 'black' : 'white',
										}}
										onClick={() => setsize(value)}
									>
										{label}
									</span>
								))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Model
