/* AudioContext manager
   nick merrill / http://cosmopol.is
   berkeley 2016

takes audio context, and AudioBufferNode

returns an object with two methods

  - start

fades  buffer in over some duration, looping

  - stop

fades buffer out over some duration, stops looping

it also has one event listener:

  - .on('loopProgress', percent)

loop progress is some cycling float 0-1
0 being start of loop, 1 being end of loop

*/
