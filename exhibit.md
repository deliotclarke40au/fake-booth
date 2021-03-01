what has to happen

- on click button disappers and a 'travel-to' video is displayed for the user
- after video plays user is presented with an image of the "destination"
- then the user is presented with a pop up
- on close of the pop up, user is presented with a 'travel-from' video
- after video plays user is presented with a "full view" image and button reappears

if multiple, would you tie the process to each button? i think yes

display each in varying z-index levels? no, swap z index for what should be displayed. 

.ve-displaying class with z-index: 10 without that class z-index defaults to 0?

how do we tie the pop ups to the 'destination-button' and make it easy to replace for devs later?

do we tie the button to the pop up, it's already opened, but the video 'travel-to' video is playing on a higher z-index before dropping back? so default would be -1 or lower. i think the way tingle works the z-index of the popup may be too high for us to do that, unsure though.

- check z-index of tingle popups or whatever popups to be used

it would be nice to just hand this functionality an array of "destinations" and have it parse that data

```javascript
const destinationsArr = [
  {
    destination: 'area 1',
    travel-to-vid: area-1-to.mp4,
    travel-from-vid: area-1-from.mp4,
    pop-up: { popUpObj },
  },
  {
    destination: 'area 2',
    travel-to-vid: area-2-to.mp4,
    travel-from-vid: area-2-from.mp4,
    pop-up: { popUpObj },
  },
  ...rest,
]
```

function could then build the html inside the original div based on array length?