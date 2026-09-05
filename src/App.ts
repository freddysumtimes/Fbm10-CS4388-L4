/* Lecture 4
 * CS 4388/ CS 5388, Fall 2026, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu> * 
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. Adapted from course materials by Evan Suma Rosenberg.
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private ship: gfx.Mesh2;
    private star: gfx.Mesh2;
    private starField: gfx.Particles2;
    private laserSound: HTMLAudioElement;
    private mousePosition: gfx.Vector2;
    
    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();
        this.ship = gfx.Geometry2Factory.createBox();
        this.star = gfx.Geometry2Factory.createBox();
        this.laserSound = new Audio('./laser.mp3');
        this.starField = new gfx.Particles2(this.star, 200);
        this.mousePosition = new gfx.Vector2(0, 0);
    

    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        this.scene.add(this.ship);
        this.ship.material.texture = new gfx.Texture('spaceShip.png');
        this.ship.scale.set(0.2, 0.2);
        //this.ship.position.set(0, 0);
        
        for (let i = 0; i < this.starField.numParticles; i++)
        {
            this.starField.particleSizes[i] = Math.random()*0.008 + 0.003;
            this.starField.particlePositions[i].set(Math.random()*2-1, Math.random()*2-1);
        }
        this.starField.update(true, true);

        this.scene.add(this.starField);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        const shipSpeed = 0.3;
        this.ship.lookAt(this.mousePosition);
        
        const shipDirection = new gfx.Vector2(0, shipSpeed * deltaTime);
        
        shipDirection.rotate(this.ship.rotation);
        //this.starField.position.subtract(shipDirection);
           
        for (let z = 0; z < this.starField.numParticles; z++){

           const Xincr = new gfx.Vector2(2, 0);
            this.starField.particlePositions[z].add(Xincr);
        }
           
            
        

        console.log(this.starField.position.x,"  ", this.starField.position.y);

        
    }

    onMouseDown(event: MouseEvent): void {
        console.log("Mouse down at: " + event.x + ", " + event.y);
        this.laserSound.play();
        this.laserSound.currentTime = 0; // restarts laser audio 
    }

    onMouseMove(event: MouseEvent): void {
        console.log("Mouse moved to: " + event.x + ", " + event.y);
        this.mousePosition.copy(this.getNormalizedDeviceCoordinates(event.x, event.y));
    }
}