
// import './style.css';

// import * as THREE from 'three'
// //import * as THREE from "https://unpkg.com/three@0.130.0/build/three.module.js";

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { Loader, LoadingManager } from 'three';

// //import { OrbitControls } from "https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls.js";

// // import {
// //   Loader,
// //   LoadingManager
// // } from "https://unpkg.com/three@0.130.0/build/three.module.js";


// //ARBUTTON
// //import { ARButton } from 'https://unpkg.com/three@0.130.0/examples/jsm/webxr/ARButton.js';
// import { ARButton } from 'three/examples/jsm/WebXR/ARButton.js';
// import * as THREEX from 'threex.domevents/threex.domevents.js'; //6Aug2021

import * as THREE from "https://unpkg.com/three@0.130.0/build/three.module.js";

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OrbitControls } from "https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls.js";
//import { loader } from 'mini-css-extract-plugin';
import {
  Loader,
  LoadingManager
} from "https://unpkg.com/three@0.130.0/build/three.module.js";

//ARBUTTON
import { ARButton } from 'https://unpkg.com/three@0.130.0/examples/jsm/webxr/ARButton.js';
import * as ThreeMeshUI from 'https://cdn.skypack.dev/pin/three-mesh-ui@v5.1.0-t4wdgIyHmfEjUfspanUF/mode=imports/optimized/three-mesh-ui.js';


var g_camera, g_scene, g_renderer,g_sphereGeometry,g_circlegeometry,g_LogoCircleGeometry;
var g_mesh , g_mesh2 ,sunMesh;
var g_particles;
 var objects = [];
 var g_colorTexture , g_arvrTexture , g_digitalMarket , g_brandConsulting , g_creativeConsult;
 var g_OrbitGrp,g_sunRayGrp,positionInSceneGroup;
  
 var g_controller;
 var g_Arbutton;
 var g_reticle;
 var hitTestSource = null;
 var localSpace = null;
 var hitTestSourceInitialized = false;
 var g_planetCreated = false;
 var g_intractionManager;
  var earthMesh;
 var moonMesh;
 var marsMesh;
 var plutoMesh;
 var sunMaterial;
 var g_rayCaster = new THREE.Raycaster();
 var g_domEvents;
var isPlutoIntersected,isMarsIntersected,isMoonIntersected,isEarthIntersected;
var g_canvas;

var  g_rayOrigin , g_rayDirection , g_currentIntersect;
 const  g_Pointer=new THREE.Vector2();

var panelContainer = null;
var panelContainer2 = null;
var panelOpened = false;

var panelEarthOpened = false;
var panelEarthContainer = null;

var panelBrndTxture , panelCreatTxture , panelArvrTxture, panelDgtMktTxture;
// custom global variables
var video, videoImage, videoImageContext, videoTexture;
var panelContent;

function main() {
  console.log("----- in script1 main() ---") ;
  
    init();
    animate();
  
  
  	function init() {
			const container = document.createElement('div');
			document.body.appendChild(container);
      
  //    g_canvas = document.querySelector("canvas.webgl");
      // g_canvas =  document.querySelector('#webgl');
      // console.log('g_canvas'+g_canvas);

			g_scene = new THREE.Scene();
      
       const loadingManager = new THREE.LoadingManager();
        loadingManager.onStart = () => {
          console.log("loading started");
        };
        loadingManager.onLoad = () => {
          console.log("loading finished");
        };
        loadingManager.onProgress = () => {
          console.log("loading progressing");
        };
        loadingManager.onError = () => {
          console.log("loading error");
        };

        const textureLoader = new THREE.TextureLoader(loadingManager);
        // g_colorTexture = textureLoader.load(
        //   "https://cdn.glitch.com/b9471fd0-d83f-4186-a51d-925af93d201a%2Flogo_24.png?v=1626890002106"
        // );
      
        //     g_arvrTexture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FAR_VR.png?v=1628345659383");
        //     g_brandConsulting = textureLoader.load(
        //   "https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2Fbrandconsulting.jpg?v=1628319148605"
        // );
        // g_creativeConsult = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FbrandCreatives.jpg?v=1628319153953");
        // g_digitalMarket = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FDigitalMar.jpg?v=1628353815895mmm");

        //  panelBrndTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FBrandService.jpg?v=1628843977900");
        //  panelCreatTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FCreativeService.jpg?v=1628843984536");
        // panelArvrTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FDigitalMarketing.jpg?v=1628844259438");
        // panelDgtMktTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FImmersiveServices.jpg?v=1628844265459");

        g_colorTexture = textureLoader.load(
          "logo_24.png"
        );
      
            g_arvrTexture = textureLoader.load("AR_VR.png");
            g_brandConsulting = textureLoader.load(
          "brandconsulting.jpg"
        );
        g_creativeConsult = textureLoader.load("brandCreatives.jpg");
        g_digitalMarket = textureLoader.load("DigitalMar.jpg");

        //  panelBrndTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FBrandService.jpg?v=1628843977900");
        //  panelCreatTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FCreativeService.jpg?v=1628843984536");
        // panelArvrTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FDigitalMarketing.jpg?v=1628844259438");
        // panelDgtMktTxture = textureLoader.load("https://cdn.glitch.com/09532941-e78d-438b-a274-2cae756e0ad0%2FImmersiveServices.jpg?v=1628844265459");


      const radius = 0.15;
      const widthSegments = 12;
      const heightSegments = 50;
      g_sphereGeometry = new THREE.SphereGeometry(
          radius,
          widthSegments,
          heightSegments
        );
      
      g_circlegeometry = new THREE.CircleGeometry( 0.15, 30 );
      g_LogoCircleGeometry = new THREE.CircleGeometry( 0.15 ,30);

			g_camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);
      g_scene.add(g_camera);

			g_renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true ,canvas:g_canvas });
      g_renderer.localClippingEnabled = true;
			g_renderer.setPixelRatio(window.devicePixelRatio);
			g_renderer.setSize(window.innerWidth, window.innerHeight);
      // This next line is important to to enable the renderer for WebXR
			g_renderer.xr.enabled = true; // New!
      
			container.appendChild(g_renderer.domElement);

      //Interaction Manager library 
      //g_intractionManager = new InteractionManager(g_renderer,g_camera,g_renderer.domElement);

			var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
			light.position.set(0.5, 1, 0.25);
			g_scene.add(light);
      
      g_controller = g_renderer.xr.getController(0);
      g_controller.addEventListener('select', onSelect);
      g_scene.add(g_controller);

      /*Moving this method to onSelect method */
      createPlanetAndRotate();   
     
			// Add the AR button to the body of the DOM
      g_Arbutton = ARButton.createButton(g_renderer);
      document.body.appendChild(g_Arbutton);
    
			//document.body.appendChild(ARButton.createButton(g_renderer));
            
      //addReticleToScene();

      
     // g_Intraction = new THREE.Interaction(g_renderer,g_scene,g_camera);

      /**
         * Raycaster
         */
        //g_rayCaster = new THREE.Raycaster();
        g_currentIntersect = null;
        g_rayOrigin = new THREE.Vector3(- 3, 0, 0);
        g_rayDirection = new THREE.Vector3(10, 0, 0);
        g_rayDirection.normalize();
      
 
        //6Aug2021
    //    g_domEvents = new THREEx.DomEvents(g_camera,g_renderer.domElement);

       document.addEventListener('touchstart' , (event)=>{
            console.log("----- IN onTOUCH ------");
            g_Pointer.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
           g_Pointer.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

                
       
            console.log("----- out onTOUCH ------");
       });
      
        document.addEventListener('touchend' , (event)=>{
            console.log("----- IN onTOUCH ------");
            g_Pointer.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
           g_Pointer.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

                
       
            console.log("----- out onTOUCH ------");
       });

       document.addEventListener('click', (event)=> {
                console.log("----- IN click ------");
            if(panelOpened ){
              console.log('---- Panel opened----');
          
              panelOpened = false;
              g_camera.remove(panelEarthContainer);
              
              
            }else {          
                      if(g_currentIntersect)
                     {
                      console.log('g_currentIntersect.object'+g_currentIntersect.object);
                      switch(g_currentIntersect.object)
                      {
                              case earthMesh:
                                  console.log('consulting');
                                  makeTextPanel('consulting');
                                  break;
                              case moonMesh:
                                  console.log('creatives');
                                  makeTextPanel('creatives');
                                  break;
                              case marsMesh:
                                  console.log('digitalm');
                                  makeTextPanel('digitalm');
                                  break;
                              case plutoMesh:
                                  console.log('arvr');
                                  makeTextPanel('arvr');
                                  break;
                          }
                      }
                   }
            
             console.log("----- out click ------");  
       });
       window.addEventListener('mousemove' , (event)=>{
         // console.log("----- IN mousemove------");
            g_Pointer.x = event.clientX / window.innerWidth * 2 - 1;
            g_Pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        //    console.log("----- out mousemove ------");
          });
      

      	
      
      window.addEventListener('resize', onWindowResize, false);
            
      // Moving to render method 
      createParticleEffect();
  }
  
  function makeTextPanel(panelContentType){
    console.log('---- In makeEarthPanel ----');
        
         var panelContent;
        switch(panelContentType){
          case 'consulting':
            panelContent=`BRAND CONSULTING\n\nBrand and Market Research\nBrand and Market Strategy\nBrand Development\nBrand Communication\n`
          break;
          case 'creatives':
            panelContent=`BRAND CREATIVES\n\nBrand Identity\nOffline Design\nOnline Design\nProduct Packaging Design\nCopy Write service`;
          break;
          case 'arvr':
            panelContent=`IMMERSIVE SERVICE\n\nAugmented Reality\nVirtual Reality\nAR Commerce\nwebVR \nwebAR`;
          break;
          case 'digitalm':
            panelContent=`DIGITAL MARKETING\n\nSocial Media Marketing\nSEO\nWhatsApp Marketing\n`;
          break;
          default:
            panelContent=`ReachWell Brand Services`;
          break;
            
        }
    
         panelEarthContainer = new ThreeMeshUI.Block({
             
              padding: 0.05,
		          textType: 'MSDF',
              justifyContent: 'center',
              alignContent: 'left',
              fontFamily: 'https://raw.githubusercontent.com/felixmariotto/three-mesh-ui/master/examples/assets/Roboto-msdf.json',
              fontTexture: 'https://raw.githubusercontent.com/felixmariotto/three-mesh-ui/master/examples/assets/Roboto-msdf.png',
              fontColor: new THREE.Color( 'white' ),
              backgroundColor: new THREE.Color( 'black' ),
	          	fontOpacity: 0.9 // 0 is invisible, 1 is opaque   
            });

            panelEarthContainer.position.set( 0, -0.95, -2 );
            panelEarthContainer.rotation.x = -0.60;
            g_scene.add( panelEarthContainer );
            g_camera.attach(panelEarthContainer);
  
            panelOpened = true;          

        const bigTextContainer = new ThreeMeshUI.Block({
          padding: 0.03,
          margin: 0.03,
          width: 1.0, //changed from 1
          height: 1.5, //changed from 1.2
          justifyContent: 'center',
          alignContent: 'left',
          backgroundOpacity: 0
        });

        bigTextContainer.add(

              new ThreeMeshUI.Text({
                content: panelContent,
                fontSize: 0.07 //changed from 0.07 
              })

            );
         
         panelEarthContainer.set({
		        borderRadius: 0.1 ,//changed from 0.2
		        borderWidth: 0.05 ,
		        borderColor: new THREE.Color( 0.5 , 0.5, 1 )
	       });
         panelEarthContainer.add(bigTextContainer);

    
    console.log('---- out makeEarthPanel ----');
  }
  
  
    
    
    function onSelect() {        

        // cone added at the point of a hit test
        // replace the next lines to add your own object in space
      // createPlanetAndRotate();
          g_rayCaster.setFromCamera( g_Pointer, g_camera );
             if(g_currentIntersect)
                {
                     console.log('------ current clicked object ---'+g_currentIntersect.object);

                     switch(g_currentIntersect.object)
                     {
                          case earthMesh:
                              console.log('click on earth');
                              break

                          case moonMesh:
                             console.log('click on moonMesh');
                             break;

                         case marsMesh:
                             console.log('click on marsMesh');
                            break;
                    }
                }
    }

  
  
    function createPlanetAndRotate() {
       console.log('----- In createPlanetAndRotate -----');

            g_OrbitGrp = new THREE.Group();
            g_sunRayGrp = new THREE.Group();
      
            // Add a second torus shape to the scene
            const geometry2 = new THREE.TorusGeometry(0.20, 0.05, 10, 40);
            const material2 = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color('cyan') ,
                wireframe : true
            });
            g_mesh2 = new THREE.Mesh(geometry2, material2);
            g_mesh2.position.set(0, 0.15, -1);
            //mesh2.scale.set(.5, .5, .5);  
           // g_sunRayGrp.add(g_mesh2);
            //g_scene.add(g_mesh2);
            
            
            
              //Sun material
            sunMaterial = new THREE.MeshBasicMaterial({
              map: g_colorTexture
            });
      
            sunMesh = new THREE.Mesh(g_LogoCircleGeometry, sunMaterial);
            sunMesh.scale.set(4, 4, 4);
            //sunnMesh.scale.set(.5, .5, .5);
            // sunMesh.rotation.z = 0;
            // sunMesh.rotation.x = -6.3;
            // sunMesh.rotation.y = -1.50;
            sunMesh.position.set(0, 0, -1);
            objects.push(sunMesh);
            g_scene.add(sunMesh);
            g_OrbitGrp.add(sunMesh); 
          
           
            //Arvr planet
            const earthMat = new THREE.MeshBasicMaterial({
                map : g_brandConsulting
            });

            earthMesh = new THREE.Mesh(g_circlegeometry, earthMat);
            earthMesh.scale.set(2, 2, 2);
            earthMesh.position.set(1,0,-1);

            g_scene.add(earthMesh);
            objects.push(earthMesh);
            g_OrbitGrp.add(earthMesh);
            

            earthMesh.cursor ='pointer';
            earthMesh.name = 'Brand Consulting';

                             
            const moonMaterial = new THREE.MeshBasicMaterial({
                map: g_creativeConsult
            });

            moonMesh = new THREE.Mesh(g_circlegeometry, moonMaterial);
                moonMesh.scale.set(2, 2, 2);
            moonMesh.position.set(-1,0,-1);
            
            g_scene.add(moonMesh);
            objects.push(moonMesh);
            g_OrbitGrp.add(moonMesh);

            moonMesh.cursor ='pointer';
            moonMesh.name = 'Creatives';
            
            // const marsMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222 , flatShading: true});
            const marsMaterial = new THREE.MeshBasicMaterial({
            map: g_digitalMarket
            });
             marsMesh = new THREE.Mesh(g_circlegeometry, marsMaterial);
            marsMesh.scale.set(2, 2, 2);
            marsMesh.position.set(0, -1, -1);
            g_scene.add(marsMesh);
            objects.push(marsMesh);
            g_OrbitGrp.add(marsMesh);

            marsMesh.cursor ='pointer';
            marsMesh.name = 'Creatives';
      
      
            const plutoMaterial = new THREE.MeshBasicMaterial({
            map: g_arvrTexture
            });
             plutoMesh = new THREE.Mesh(g_circlegeometry, plutoMaterial);
            plutoMesh.scale.set(2, 2, 2);
            plutoMesh.position.set(0, 1, -1);
            g_scene.add(plutoMesh);
            objects.push(plutoMesh);
            g_OrbitGrp.add(plutoMesh);

            g_OrbitGrp.scale.set(0.5,0.5,0.5);
            plutoMesh.cursor ='pointer';
            plutoMesh.name = 'ARVR';
          
            
            const distanceFromCameraZ = -2; // adjust how far away from camera
            const distanceY = -2.0;
            positionInSceneGroup = new THREE.Group();
            positionInSceneGroup.add(g_OrbitGrp);
            positionInSceneGroup.position.set(0, distanceY, distanceFromCameraZ); // set the position of all the objects
            positionInSceneGroup.rotation.x =-.50;
            positionInSceneGroup.rotation.z =-0.01;
            g_scene.add(positionInSceneGroup);
          //  g_intractionManager.add(positionInSceneGroup);
            
            g_planetCreated = true;
    
          console.log('----- out createPlanetAndRotate -----');
       }

   

    function createParticleEffect()  {
            console.log("----- In createParticleEffect ----");
            /**
             * Textures
             */
            const textureLoader = new THREE.TextureLoader();
            const particleTexture = textureLoader.load(
            "https://cdn.glitch.com/b9471fd0-d83f-4186-a51d-925af93d201a%2F8.png?v=1626890056257"
            );

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesMaterial = new THREE.PointsMaterial();
            particlesMaterial.alphaMap = particleTexture;
            particlesMaterial.transparent = true;
            particlesMaterial.size = 5;
            particlesMaterial.sizeAttenuation = true;
            // Points
            g_particles = new THREE.Points(particlesGeometry, particlesMaterial);
            g_scene.add(g_particles);
            //objects.push(particles);
            const count = 700;
            particlesMaterial.depthWrite = false;
            particlesMaterial.blending = THREE.AdditiveBlending;

            particlesMaterial.vertexColors = true;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
              for (let i = 0;i < count * 3;i++  ) { // Multiply by 3 for same reason
                positions[i] = (Math.random() - 0.5) * 100; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
                colors[i] = Math.random();
              }
              particlesGeometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(positions, 3)
                  );
              particlesGeometry.setAttribute(
                "color",
                new THREE.BufferAttribute(colors, 3)
              );

            console.log("----- out createParticleEffect ----");
    };

  
  function onWindowResize() {
    console.log('----- In onWindowResize -----');
			g_camera.aspect = window.innerWidth / window.innerHeight;
			g_camera.updateProjectionMatrix();

			g_renderer.setSize(window.innerWidth, window.innerHeight);

      console.log('----- out onWindowResize -----');
		}

    function animate() {
			g_renderer.setAnimationLoop(render);
		}

		function render(timestamp , frame) {  
       //console.log('---- In render ----');
      
           rotateObjects();          
      
            // Cast a ray from the mouse and handle events
          g_rayCaster.setFromCamera(g_Pointer, g_camera);
      
          const objectsToTest = [earthMesh, moonMesh,plutoMesh, marsMesh];
          const intersects = g_rayCaster.intersectObjects(objectsToTest);
      //const intersects = g_rayCaster.intersectObjects(earthMesh);
          console.log('intersects length'+intersects.length);
          if(intersects.length)
          {
              if(!g_currentIntersect)
              {
                  console.log('mouse enter');
              }
              g_currentIntersect = intersects[0];
              console.log('g_currentIntersect'+g_currentIntersect);
          }
          else
          {
              if(g_currentIntersect)
              {
                  console.log('mouse leave')
              }

              g_currentIntersect = null
          }


   
           // Don't forget, ThreeMeshUI must be updated manually.
          // This has been introduced in version 3.0.0 in order
          // to improve performance
          ThreeMeshUI.update();

           g_renderer.render(g_scene, g_camera);
         // console.log('----- out render -------');
	    }
  
        function rotateObjects() {
              //  console.log("---- In rotateObjects ----");
            const clock = new THREE.Clock();
                // Elapsed time
                const elapsedTime = clock.getElapsedTime();
            
                // particles rain effect   
                g_particles.rotation.x = g_particles.rotation.x - 0.01;
                
            //       g_mesh.rotation.y = g_mesh.rotation.y - 0.01;
            //       console.log(g_mesh.rotation);
                
                // rotate the torus on x
                g_mesh2.rotation.z = g_mesh2.rotation.z - 0.01;
           // sunMesh.rotation.y = sunMesh.rotation.y - 0.01;
                objects.forEach(obj => {
                  // Self rotation: below line statement
              //  obj.rotation.z =  obj.rotation.z  - 0.04;
                });
                
                //rotate 
             // g_OrbitGrp.rotation.z = g_OrbitGrp.rotation.z - 0.005;
                
               // console.log("---- out rotateObjects ----");
        }

        
  
  console.log("----- out script1 main() ---") ;


}



main();