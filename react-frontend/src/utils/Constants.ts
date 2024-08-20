const AUDIO_PATH = "../../public/letter_audio_files/";

interface Letter {
  unicode: string;
  audiofilePath: string;
}

interface AlephBeisDefinition {
  [key: string]: Letter;
}

// Example usage
export const alephBeis: AlephBeisDefinition = {
  aleph: { unicode: '\u05D0', audiofilePath: AUDIO_PATH + "aleph.mp3" },
  beis: { unicode: '\uFB31', audiofilePath: AUDIO_PATH + "beis.mp3" },
  veis: { unicode: '\u05D1', audiofilePath: AUDIO_PATH + "veis.mp3" },
  gimel : {unicode: '\u05D2', audiofilePath:AUDIO_PATH + "gimmel.mp3"},
  daled: {unicode:'\u05D3', audiofilePath:AUDIO_PATH + "daled.mp3"},
  hey: {unicode:'\u05D4', audiofilePath:AUDIO_PATH + "heh.mp3"},
  vav: {unicode:'\u05D5', audiofilePath:AUDIO_PATH + "vav.mp3"},
  zayin: {unicode:'\u05D6', audiofilePath:AUDIO_PATH + "zain.mp3"},
  ches: {unicode:'\u05D7', audiofilePath:AUDIO_PATH + "ches.mp3"},
  tes: {unicode:'\u05D8', audiofilePath:AUDIO_PATH + "tes.mp3"},
  yud: {unicode:'\u05D9', audiofilePath: AUDIO_PATH + "yud.mp3"},
  kaf: {unicode:'\uFB3B', audiofilePath:AUDIO_PATH + "kaf.mp3"},
  kafSofis: {unicode:'\uFB3A', audiofilePath:AUDIO_PATH + "kafsofis.mp3"},
  chof: {unicode:'\u05DB', audiofilePath:AUDIO_PATH + "chof.mp3"},
  chofSofis: {unicode:'\u05DA', audiofilePath:AUDIO_PATH + "chofsofis.mp3"},
  lamed: {unicode:'\u05DC', audiofilePath:AUDIO_PATH + "lamed.mp3"},
  mem: {unicode:'\u05DE', audiofilePath:AUDIO_PATH + "mem.mp3"},
  memSofis: {unicode:'\u05DD', audiofilePath:AUDIO_PATH + "memsofis.mp3"},
  nun: {unicode:'\u05E0', audiofilePath:AUDIO_PATH + "nun.mp3"},
  nunSofis: {unicode:'\u05DF', audiofilePath:AUDIO_PATH + "nunsofis.mp3"},
  samech: {unicode:'\u05E1', audiofilePath:AUDIO_PATH + "samech.mp3"},
  ayin: {unicode:'\u05E2', audiofilePath:AUDIO_PATH + "ayin.mp3"},
  pey: {unicode:'\uFB44', audiofilePath: AUDIO_PATH + "pey.mp3"},
  fey: {unicode:'\u05E4', audiofilePath:AUDIO_PATH + "fey.mp3"},
  feySofis: {unicode:'\u05E3', audiofilePath:AUDIO_PATH + "feysofis.mp3"},
  tzadi: {unicode:'\u05E6', audiofilePath:AUDIO_PATH + "tzadi.mp3"},
  tzadiSofis: {unicode:'\u05E5', audiofilePath:AUDIO_PATH + "tzadisofis.mp3"},
  koof: {unicode:'\u05E7', audiofilePath:AUDIO_PATH + "koof.mp3"},
  reish: {unicode:'\u05E8', audiofilePath:AUDIO_PATH + "reish.mp3"},
  shin: {unicode:'\uFB2A', audiofilePath:AUDIO_PATH + "shin.mp3"},
  sin: {unicode:'\uFB2B', audiofilePath:AUDIO_PATH + "sinn.mp3"},
  tav: {unicode:'\uFB4A', audiofilePath:AUDIO_PATH + "tav.mp3"},
  sav: {unicode:'\u05EA', audiofilePath:AUDIO_PATH + "sav.mp3"}
  
  // Add more items as needed
};


export const sections = [
  { 
    letters: [
      alephBeis['hey'],
      alephBeis['daled'],
      alephBeis['gimel'],
      alephBeis['veis'],
      alephBeis['beis'],
     alephBeis['aleph'] 
    ], 
    color: 'yellow' 
  },
  { 
    letters: [
     alephBeis['yud'],
     alephBeis['tes'],
      alephBeis['ches'],
      alephBeis['zayin'],
      alephBeis['vav']
    ], 
    color: 'orange' 
  },
  { 
    letters: [
    
     alephBeis['nunSofis'],
     alephBeis['nun'],
     alephBeis['memSofis'],
     alephBeis['mem'],
    alephBeis['lamed'],
    alephBeis['chofSofis'],
    alephBeis['chof'],
     alephBeis['kafSofis'],
     alephBeis['kaf']
      
    ], 
    color: 'red' 
  },
  { 
    letters: [
      alephBeis['koof'],
     alephBeis['tzadiSofis'],
     alephBeis['tzadi'],
    alephBeis['feySofis'],
      alephBeis['fey'],
      alephBeis['pey'],
      alephBeis['ayin'],
      alephBeis['samech']
    ], 
    color: 'aqua' 
  },
  { 
    letters: [
      alephBeis['sav'],
      alephBeis['tav'],
      alephBeis['sin'],
      alephBeis['shin'],
      alephBeis['reish']
    ], 
    color: 'rgb(170 115 187)'
  }
];

// export class AlephBeis {
//   alep
// }

// // for(const el in Object.keys.(alephBeis)){
// //     console.log(el)

// for(const el in alephBeis){
//     console.log(alephBeis[el].unicode)
// }

