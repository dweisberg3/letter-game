const AUDIO_PATH = "../../public/letter_audio_files/";
const PNG_PATH = "../../public/letter_image_files/"
interface Letter {
  unicode: string;
  audiofilePath: string;
  pngfilePath:string;
}

interface AlephBeisDefinition {
  [key: string]: Letter;
}

// Example usage
export const alephBeis: AlephBeisDefinition = {
  aleph: { unicode: '\u05D0', audiofilePath: AUDIO_PATH + "aleph.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  beis: { unicode: '\uFB31', audiofilePath: AUDIO_PATH + "beis.mp3", pngfilePath : PNG_PATH + "beis.png"} ,
  veis: { unicode: '\u05D1', audiofilePath: AUDIO_PATH + "veis.mp3", pngfilePath : PNG_PATH + "veis.png"},
  gimel : {unicode: '\u05D2', audiofilePath:AUDIO_PATH + "gimmel.mp3", pngfilePath : PNG_PATH + "gimmel.png"},
  daled: {unicode:'\u05D3', audiofilePath:AUDIO_PATH + "daled.mp3", pngfilePath : PNG_PATH + "daled.png"},
  hey: {unicode:'\u05D4', audiofilePath:AUDIO_PATH + "heh.mp3", pngfilePath : PNG_PATH + "hey.png"},
  vav: {unicode:'\u05D5', audiofilePath:AUDIO_PATH + "vav.mp3", pngfilePath : PNG_PATH + "vav.png"},
  zayin: {unicode:'\u05D6', audiofilePath:AUDIO_PATH + "zain.mp3", pngfilePath : PNG_PATH + "zain.png"},
  ches: {unicode:'\u05D7', audiofilePath:AUDIO_PATH + "ches.mp3", pngfilePath : PNG_PATH + "ches.png"},
  tes: {unicode:'\u05D8', audiofilePath:AUDIO_PATH + "tes.mp3", pngfilePath : PNG_PATH + "tes.png"},
  yud: {unicode:'\u05D9', audiofilePath: AUDIO_PATH + "yud.mp3", pngfilePath : PNG_PATH + "yud.png"},
  kaf: {unicode:'\uFB3B', audiofilePath:AUDIO_PATH + "kaf.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  kafSofis: {unicode:'\uFB3A', audiofilePath:AUDIO_PATH + "kafsofis.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  chof: {unicode:'\u05DB', audiofilePath:AUDIO_PATH + "chof.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  chofSofis: {unicode:'\u05DA', audiofilePath:AUDIO_PATH + "chofsofis.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  lamed: {unicode:'\u05DC', audiofilePath:AUDIO_PATH + "lamed.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  mem: {unicode:'\u05DE', audiofilePath:AUDIO_PATH + "mem.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  memSofis: {unicode:'\u05DD', audiofilePath:AUDIO_PATH + "memsofis.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  nun: {unicode:'\u05E0', audiofilePath:AUDIO_PATH + "nun.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  nunSofis: {unicode:'\u05DF', audiofilePath:AUDIO_PATH + "nunsofis.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  samech: {unicode:'\u05E1', audiofilePath:AUDIO_PATH + "samech.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  ayin: {unicode:'\u05E2', audiofilePath:AUDIO_PATH + "ayin.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  pey: {unicode:'\uFB44', audiofilePath: AUDIO_PATH + "pey.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  fey: {unicode:'\u05E4', audiofilePath:AUDIO_PATH + "fey.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  feySofis: {unicode:'\u05E3', audiofilePath:AUDIO_PATH + "feysofis.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  tzadi: {unicode:'\u05E6', audiofilePath:AUDIO_PATH + "tzadi.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  tzadiSofis: {unicode:'\u05E5', audiofilePath:AUDIO_PATH + "tzadisofis.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  koof: {unicode:'\u05E7', audiofilePath:AUDIO_PATH + "koof.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  reish: {unicode:'\u05E8', audiofilePath:AUDIO_PATH + "reish.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  shin: {unicode:'\uFB2A', audiofilePath:AUDIO_PATH + "shin.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  sin: {unicode:'\uFB2B', audiofilePath:AUDIO_PATH + "sinn.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  tav: {unicode:'\uFB4A', audiofilePath:AUDIO_PATH + "tav.mp3", pngfilePath : PNG_PATH + "aleph.png"},
  sav: {unicode:'\u05EA', audiofilePath:AUDIO_PATH + "sav.mp3", pngfilePath : PNG_PATH + "aleph.png"}
  
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
    color: 'yellow',
    css_id: 'top-right container' 
  },
  { 
    letters: [
     alephBeis['yud'],
     alephBeis['tes'],
      alephBeis['ches'],
      alephBeis['zayin'],
      alephBeis['vav']
    ], 
    color: 'orange',
    css_id: 'top-left container' }
  // },
  // { 
  //   letters: [
    
  //    alephBeis['nunSofis'],
  //    alephBeis['nun'],
  //    alephBeis['memSofis'],
  //    alephBeis['mem'],
  //   alephBeis['lamed'],
  //   alephBeis['chofSofis'],
  //   alephBeis['chof'],
  //    alephBeis['kafSofis'],
  //    alephBeis['kaf']
      
  //   ], 
  //   color: 'red' ,
  //   css_id: 'middle-right container'
  // },
  // { 
  //   letters: [
  //     alephBeis['koof'],
  //    alephBeis['tzadiSofis'],
  //    alephBeis['tzadi'],
  //   alephBeis['feySofis'],
  //     alephBeis['fey'],
  //     alephBeis['pey'],
  //     alephBeis['ayin'],
  //     alephBeis['samech']
  //   ], 
  //   color: 'aqua',
  //   css_id: 'middle-left container'
  // },
  // { 
  //   letters: [
  //     alephBeis['sav'],
  //     alephBeis['tav'],
  //     alephBeis['sin'],
  //     alephBeis['shin'],
  //     alephBeis['reish']
  //   ], 
  //   color: 'rgb(170 115 187)',
  //   css_id:'bottom-center container'
  // }
];

// export class AlephBeis {
//   alep
// }

// // for(const el in Object.keys.(alephBeis)){
// //     console.log(el)

// for(const el in alephBeis){
//     console.log(alephBeis[el].unicode)
// }

