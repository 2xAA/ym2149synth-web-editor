export default function isSynth(e) {
  return (e.manufacturer === 'Teensyduino' && (e.name === 'Teensy MIDI MIDI 1' || e.name === 'Teensy MIDI'));
}