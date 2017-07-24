export default function isSynth(e) {
  return (e.manufacturer === 'Teensyduino' && e.name.indexOf('YM2149') > -1);
}