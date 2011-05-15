  Licence: Snake! by Naman Kumar is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
            http://creativecommons.org/licenses/by-nc-sa/3.0/ 
            Do whatever you want but please release your code to enlighten the people with your knowledge.

  Target Platform: BlackBerry PlayBook 1.0
  Compatibiltiy: All HTML5 enabled platforms including Chrome and Firefox
  Version: 1.0
  
  Required Files:
          snake.html
          snake.js
          gameOver.html
  
  Author: Naman Kumar
  Contact: ping@namank.com
  Note: 
    Though I started making this game to explore the HTML5 feature set, I fell in love with game development along the way.
	I have more ideas for UX enhancement that I'll make public as I implement them. 
    
    Also, at the time of development, the target platform (BB PLayBook) was not actually released. 
    This code was only tested on the prelaunch simulator and therfore, IS NOT GAURANTEED
    TO WORK ON THE PLAYBOOK. It does, however, work on early verions of the BlackBerry PLayBook simulator.

    The functionality is seperated into:
     class Draw - If name isn`t obvious, this class handles manipulation of the canvas
     class Move - Essentially the skeleton of the snake - maps movements (left, right, up, down)
     class Food - DUH! All events related to food (eat, generate) are handled here
     class Game - All meta events (score, pause, resume, reset, etc) are implemented here
     class Main - Instantiates the code and starts the game
     Controls - Keyboard and mouse (mouse is active)
          
    Do keep in mind that this game was intended as a tutorial in HTML5 and Javascript. There is a lots of
    room for improvement. I welcome you to explore the code. Then, you can make it more robust by:

     -wrapping timer in requestAnimationFrame (google it!)
     -abstracting speed of the snake and handle it with an independent variable
     -partitionaing the screen to display score outside the game frame
     -better graphics
     -enabling touch events instead of mouse/keyboard