# Etch-a-Sketch
Created as part of The Odin Project curriculum.

[Live Page](https://andrewjh271.github.io/etch-a-sketch/)

### Functionality

- Clicking inside the grid will toggle the pen function, which fills every cell when the mouse pointer leaves it.
- Each cell will also be filled on a click, regardless of whether the toggle state of the grid is active.
- Random 1, 2, 3 use different ranges for possible RGBA values.

- Incrementally Darken will darken each cell so that it should take exactly 10 almost equal passes for each individual cell to get to black. Since sometimes the calculation of each cell's individual increment will be a decimal value, sometimes the new RGBA values will get rounded.
- When the Incrementally Darken radio button is clicked, the darkening step value resets, so it will again take 10 almost equal passes for each cell to turn black.

### Thoughts

Using a Grid worked well and ended coming together pretty quickly. The main issue I ran into was with my darken function. I wanted to have exactly 10 equal steps between each cell's current color and black, starting when the Incrementally Darken radio button was clicked. I was trying to do it without keeping track of each individual cell's current step, quite unsuccessfully. I tried for a while using algebra to figure out the original color, but kept running into problems with not remembering that my at the time global variable darkeningStep was being incremented for all cells, not just the one I was currently working with. The darken function came together comparitively quickly once I used separate data properties to keep track of each cell's individual darkening step. I considered doing this earlier, but dismissed it as being too difficult. I shouldn't have dismissed it, because clearly I needed the information for each individual cell, and it wasn't hard to do once I got the syntax right.

One other challenge with my darken function was putting each cell's current background color into a format I could work with. e.target.style.backgroundColor was returning an rgba value, so I parsed it using String methods. That was fine, but I wonder if there is a better way. *Update: refactored this code — now using slice followed by split to get array of rgb(a) values.* I did run into a bug I didn't understand for a while because e.target.style.backgroundColor was shortening from rgba to rgb when alpha was equal to 1.

Another issue I ran into was I was originally setting cells' background colors to white using their CSS class, but this was getting overridden once I changed the background color with Javascript. I think sometimes the webpage was actually still doing what I wanted, but e.target.style.backgroundColor wasn't giving me the right value and was causing my darken function to not work properly. I eventually switched to declaring all background colors with Javascript, so that I wouldn't deal with original CSS styles not going back to what I wanted them to.

I spent some time getting more familiar with various html inputs and figuring out which DOM events seemed to work best for different input types.

The only other real issue I had was trying to figure out how to best fit a square into a responsive web page. I wanted as big of a grid as possible, but didn't want scrollbars. The layout I ended up with seems to work well for normal browser window sizes, but I don't know that I took the best approach. It wasn't too hard getting my Controls-Container and Grid to be where I wanted next to each other, but I didn't always understand the behavior I was seeing dealing with float:left and float:right. Adding or removing floats caused slight changes with the margins in ways I didn't think should be happening.

-Andrew Hayhurst

