const AUDIO_PATH = "../../public/letter_audio_files/";
const PNG_PATH = "../../public/letter_image_files/"
const PNG_VERSION = "_new";
export const host_api = "https://dweisberg.pythonanywhere.com"
// export const host_api =   "http://127.0.0.1:5000"
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
  aleph: { unicode: '\u05D0', audiofilePath: AUDIO_PATH + "aleph.mp3", pngfilePath : PNG_PATH + "aleph"+ PNG_VERSION + ".png"},
  beis: { unicode: '\uFB31', audiofilePath: AUDIO_PATH + "beis.mp3", pngfilePath : PNG_PATH + "beis"+ PNG_VERSION + ".png"} ,
  veis: { unicode: '\u05D1', audiofilePath: AUDIO_PATH + "veis.mp3", pngfilePath : PNG_PATH + "veis"+ PNG_VERSION + ".png"},
  gimel : {unicode: '\u05D2', audiofilePath:AUDIO_PATH + "gimmel.mp3", pngfilePath : PNG_PATH + "gimmel"+ PNG_VERSION + ".png"},
  daled: {unicode:'\u05D3', audiofilePath:AUDIO_PATH + "daled.mp3", pngfilePath : PNG_PATH + "daled"+ PNG_VERSION + ".png"},
  hey: {unicode:'\u05D4', audiofilePath:AUDIO_PATH + "hey.mp3", pngfilePath : PNG_PATH + "hey"+ PNG_VERSION + ".png"},
  vav: {unicode:'\u05D5', audiofilePath:AUDIO_PATH + "vav.mp3", pngfilePath : PNG_PATH + "vav"+ PNG_VERSION + ".png"},
  zayin: {unicode:'\u05D6', audiofilePath:AUDIO_PATH + "zain.mp3", pngfilePath : PNG_PATH + "zayin"+ PNG_VERSION + ".png"},
  ches: {unicode:'\u05D7', audiofilePath:AUDIO_PATH + "ches.mp3", pngfilePath : PNG_PATH + "ches"+ PNG_VERSION + ".png"},
  tes: {unicode:'\u05D8', audiofilePath:AUDIO_PATH + "tes.mp3", pngfilePath : PNG_PATH + "tes"+ PNG_VERSION + ".png"},
  yud: {unicode:'\u05D9', audiofilePath: AUDIO_PATH + "yud.mp3", pngfilePath : PNG_PATH + "yud"+ PNG_VERSION + ".png"},
  kaf: {unicode:'\uFB3B', audiofilePath:AUDIO_PATH + "kaf.mp3", pngfilePath : PNG_PATH + "kaf"+ PNG_VERSION + ".png"},
  kafSofis: {unicode:'\uFB3A', audiofilePath:AUDIO_PATH + "kafsofis.mp3", pngfilePath : PNG_PATH + "kafsofis"+ PNG_VERSION + ".png"},
  chof: {unicode:'\u05DB', audiofilePath:AUDIO_PATH + "chof.mp3", pngfilePath : PNG_PATH + "chof"+ PNG_VERSION + ".png"},
  chofSofis: {unicode:'\u05DA', audiofilePath:AUDIO_PATH + "chofsofis.mp3", pngfilePath : PNG_PATH + "chofsofis"+ PNG_VERSION + ".png"},
  lamed: {unicode:'\u05DC', audiofilePath:AUDIO_PATH + "lamed.mp3", pngfilePath : PNG_PATH + "lamed"+ PNG_VERSION + ".png"},
  mem: {unicode:'\u05DE', audiofilePath:AUDIO_PATH + "mem.mp3", pngfilePath : PNG_PATH + "mem"+ PNG_VERSION + ".png"},
  memSofis: {unicode:'\u05DD', audiofilePath:AUDIO_PATH + "memsofis.mp3", pngfilePath : PNG_PATH + "memsofis"+ PNG_VERSION + ".png"},
  nun: {unicode:'\u05E0', audiofilePath:AUDIO_PATH + "nun.mp3", pngfilePath : PNG_PATH + "nun"+ PNG_VERSION + ".png"},
  nunSofis: {unicode:'\u05DF', audiofilePath:AUDIO_PATH + "nunsofis.mp3", pngfilePath : PNG_PATH + "nunsofis"+ PNG_VERSION + ".png"},
  samech: {unicode:'\u05E1', audiofilePath:AUDIO_PATH + "samech.mp3", pngfilePath : PNG_PATH + "samech"+ PNG_VERSION + ".png"},
  ayin: {unicode:'\u05E2', audiofilePath:AUDIO_PATH + "ayin.mp3", pngfilePath : PNG_PATH + "ayin"+ PNG_VERSION + ".png"},
  pey: {unicode:'\uFB44', audiofilePath: AUDIO_PATH + "pey.mp3", pngfilePath : PNG_PATH + "pey"+ PNG_VERSION + ".png"},
  fey: {unicode:'\u05E4', audiofilePath:AUDIO_PATH + "fey.mp3", pngfilePath : PNG_PATH + "fey"+ PNG_VERSION + ".png"},
  feySofis: {unicode:'\u05E3', audiofilePath:AUDIO_PATH + "feysofis.mp3", pngfilePath : PNG_PATH + "feysofis"+ PNG_VERSION + ".png"},
  tzadi: {unicode:'\u05E6', audiofilePath:AUDIO_PATH + "tzadi.mp3", pngfilePath : PNG_PATH + "tzadi"+ PNG_VERSION + ".png"},
  tzadiSofis: {unicode:'\u05E5', audiofilePath:AUDIO_PATH + "tzadisofis.mp3", pngfilePath : PNG_PATH + "tzadisofis"+ PNG_VERSION + ".png"},
  koof: {unicode:'\u05E7', audiofilePath:AUDIO_PATH + "koof.mp3", pngfilePath : PNG_PATH + "koof"+ PNG_VERSION + ".png"},
  reish: {unicode:'\u05E8', audiofilePath:AUDIO_PATH + "reish.mp3", pngfilePath : PNG_PATH + "reish"+ PNG_VERSION + ".png"},
  shin: {unicode:'\uFB2A', audiofilePath:AUDIO_PATH + "shin.mp3", pngfilePath : PNG_PATH + "shin"+ PNG_VERSION + ".png"},
  sin: {unicode:'\uFB2B', audiofilePath:AUDIO_PATH + "sinn.mp3", pngfilePath : PNG_PATH + "sinn"+ PNG_VERSION + ".png"},
  tav: {unicode:'\uFB4A', audiofilePath:AUDIO_PATH + "tav.mp3", pngfilePath : PNG_PATH + "tav"+ PNG_VERSION + ".png"},
  sav: {unicode:'\u05EA', audiofilePath:AUDIO_PATH + "sav.mp3", pngfilePath : PNG_PATH + "sav"+ PNG_VERSION + ".png"}
  
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
   
    css_id: 'top-right container',
    sectionPngPath:PNG_PATH+ "aleph_section.png" 
  },
  { 
    letters: [
     alephBeis['yud'],
     alephBeis['tes'],
      alephBeis['ches'],
      alephBeis['zayin'],
      alephBeis['vav']
    ], 
   
    css_id: 'top-left container',
    sectionPngPath:PNG_PATH + "vav_section.png"
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
   
    css_id: 'middle-right container',
    sectionPngPath:PNG_PATH + "kaf_section.png" 
  },
  { 
    letters: [
     
     alephBeis['tzadiSofis'],
     alephBeis['tzadi'],
    alephBeis['feySofis'],
      alephBeis['fey'],
      alephBeis['pey'],
      alephBeis['ayin'],
      alephBeis['samech']
    ], 
   
    css_id: 'middle-left container',
    sectionPngPath:PNG_PATH + "samech_section.png" 
  },
  { 
    letters: [
      alephBeis['sav'],
      alephBeis['tav'],
      alephBeis['sin'],
      alephBeis['shin'],
      alephBeis['reish'],
      alephBeis['koof']
    ], 
    
    css_id:'bottom-center container',
    sectionPngPath:PNG_PATH + "koof_section.png" 
  }
];
