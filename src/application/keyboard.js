import WebMidi from 'webmidi';
import store from '@/../store';

const keyBindings = {
  z: { note: 'C', octave: 0 },
  s: { note: 'C#', octave: 0 },
  x: { note: 'D', octave: 0 },
  d: { note: 'D#', octave: 0 },
  c: { note: 'E', octave: 0 },
  v: { note: 'F', octave: 0 },
  g: { note: 'F#', octave: 0 },
  b: { note: 'G', octave: 0 },
  h: { note: 'G#', octave: 0 },
  n: { note: 'A', octave: 0 },
  j: { note: 'A#', octave: 0 },
  m: { note: 'B', octave: 0 },

  q: { note: 'C', octave: 1 },
  2: { note: 'C#', octave: 1 },
  w: { note: 'D', octave: 1 },
  3: { note: 'D#', octave: 1 },
  e: { note: 'E', octave: 1 },
  r: { note: 'F', octave: 1 },
  5: { note: 'F#', octave: 1 },
  t: { note: 'G', octave: 1 },
  6: { note: 'G#', octave: 1 },
  y: { note: 'A', octave: 1 },
  7: { note: 'A#', octave: 1 },
  u: { note: 'B', octave: 1 },

  i: { note: 'C', octave: 2 },
  9: { note: 'C#', octave: 2 },
  o: { note: 'D', octave: 2 },
  0: { note: 'D#', octave: 2 },
  p: { note: 'E', octave: 2 },
};

const noteOn = {};

const octave = 2;

export default function createKeyboard() {
  window.addEventListener('keydown', (e) => {
    let currentOutput;

    WebMidi.outputs.forEach((output) => {
      if(output.id === store.getters['status/id']) currentOutput = output;
    });
    if(!currentOutput) return;

    if(e.key in keyBindings) {
      const binding = keyBindings[e.key];
      const note = binding.note + (octave + binding.octave);

      // handle key repeat
      if(noteOn[note]) return;

      noteOn[note] = true;
      currentOutput.playNote(note, 1);
    }
  });

  window.addEventListener('keyup', (e) => {
    let currentOutput;

    WebMidi.outputs.forEach((output) => {
      if(output.id === store.getters['status/id']) currentOutput = output;
    });
    if(!currentOutput) return;

    if(e.key in keyBindings) {
      const binding = keyBindings[e.key];
      const note = binding.note + (octave + binding.octave);
      noteOn[note] = false;
      currentOutput.stopNote(note, 1);
    }
  });
}