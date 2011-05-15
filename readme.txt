  Licence: Snake! by Naman Kumar is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
            http://creativecommons.org/licenses/by-nc-sa/3.0/ 
            Do whatever you want but please do release your code to enlighten the people with your knowledge.

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
    Though I started making this game to explore the HTML5 feature set, along the way, 
    I fell in love with game development. I have more ideas for UX enhancement that I'll make public as I implement them. 
    
    Also, at the time of development, the target platform (BB PLayBook) was not actually released. 
    This code was only tested on prelaunch simulator and therfore, IS NOT GAURANTEED
    TO WORK ON THE PLAYBOOK. It does, however, work on very early verions of the BlackBerry PLayBook simulator.

    Using the object orientedness of JS, the functionality is seperated into:
     class Draw - If name is any indication, this clas handles manipulation of the canvas
     class Move - Essentially the skeleton of our snakeès movements (left, right, up, down)
     class Food - DUH! All events related to food (eat, generate) are handled through here
     class Game - All meta events (score, pause, resume, reset, etc) are implemented here
     class Main - Instantiates the code and starts the game
     Controls - Keyboard and Mouse
          
    Do keep in mind that this game was intended as a tutorial in HTML5 and Javascript. There is lots of
    room for improvement. I welcome you try explore the code and break it. Then, you can the code more robust by:
            -wrapping timer in requestAnimationFrame (google it!)
            -abstracting speed of the snake and handle it with an independent variable
            -partitionaing the screen to display score outside the game frame
            -better graphics
            -enabling touch events instead of mouse/keyboard