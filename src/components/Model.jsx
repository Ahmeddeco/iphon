import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import * as THREE from 'three'

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
					</div>
				</div>
			</div>
		</section>
	)
}

export default Model
