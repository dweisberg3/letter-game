const AUDIO_PATH = "/letter_audio_files/";
const PNG_PATH = "/letter_image_files/";
const PNG_VERSION = "_new";

export const HOST_API = "https://dweisberg.pythonanywhere.com";
// export const HOST_API = "http://127.0.0.1:5000";

export interface Letter {
  id: string;
  audiofilePath: string;
  pngfilePath: string;
}

export interface AlephBeisDefinition {
  [key: string]: Letter;
}

export interface Section {
  letters: Letter[];
  css_id: string;
  sectionPngPath: string;
}

// Aleph Beis letter definitions
export const alephBeis: AlephBeisDefinition = {
  aleph: { id: 'aleph', audiofilePath: AUDIO_PATH + "aleph.mp3", pngfilePath: PNG_PATH + "aleph" + PNG_VERSION + ".png" },
  beis: { id: 'beis', audiofilePath: AUDIO_PATH + "beis.mp3", pngfilePath: PNG_PATH + "beis" + PNG_VERSION + ".png" },
  veis: { id: 'veis', audiofilePath: AUDIO_PATH + "veis.mp3", pngfilePath: PNG_PATH + "veis" + PNG_VERSION + ".png" },
  gimel: { id: 'gimel', audiofilePath: AUDIO_PATH + "gimmel.mp3", pngfilePath: PNG_PATH + "gimmel" + PNG_VERSION + ".png" },
  daled: { id: 'daled', audiofilePath: AUDIO_PATH + "daled.mp3", pngfilePath: PNG_PATH + "daled" + PNG_VERSION + ".png" },
  hey: { id: 'hey', audiofilePath: AUDIO_PATH + "hey.mp3", pngfilePath: PNG_PATH + "hey" + PNG_VERSION + ".png" },
  vav: { id: 'vav', audiofilePath: AUDIO_PATH + "vav.mp3", pngfilePath: PNG_PATH + "vav" + PNG_VERSION + ".png" },
  zayin: { id: 'zayin', audiofilePath: AUDIO_PATH + "zayin.mp3", pngfilePath: PNG_PATH + "zayin" + PNG_VERSION + ".png" },
  ches: { id: 'ches', audiofilePath: AUDIO_PATH + "ches.mp3", pngfilePath: PNG_PATH + "ches" + PNG_VERSION + ".png" },
  tes: { id: 'tes', audiofilePath: AUDIO_PATH + "tes.mp3", pngfilePath: PNG_PATH + "tes" + PNG_VERSION + ".png" },
  yud: { id: 'yud', audiofilePath: AUDIO_PATH + "yud.mp3", pngfilePath: PNG_PATH + "yud" + PNG_VERSION + ".png" },
  kaf: { id: 'kaf', audiofilePath: AUDIO_PATH + "kaf.mp3", pngfilePath: PNG_PATH + "kaf" + PNG_VERSION + ".png" },
  kafSofis: { id: 'kafSofis', audiofilePath: AUDIO_PATH + "kafsofis.mp3", pngfilePath: PNG_PATH + "kafsofis" + PNG_VERSION + ".png" },
  chof: { id: 'chof', audiofilePath: AUDIO_PATH + "chof.mp3", pngfilePath: PNG_PATH + "chof" + PNG_VERSION + ".png" },
  chofSofis: { id: 'chofSofis', audiofilePath: AUDIO_PATH + "chofsofis.mp3", pngfilePath: PNG_PATH + "chofsofis" + PNG_VERSION + ".png" },
  lamed: { id: 'lamed', audiofilePath: AUDIO_PATH + "lamed.mp3", pngfilePath: PNG_PATH + "lamed" + PNG_VERSION + ".png" },
  mem: { id: 'mem', audiofilePath: AUDIO_PATH + "mem.mp3", pngfilePath: PNG_PATH + "mem" + PNG_VERSION + ".png" },
  memSofis: { id: 'memSofis', audiofilePath: AUDIO_PATH + "memsofis.mp3", pngfilePath: PNG_PATH + "memsofis" + PNG_VERSION + ".png" },
  nun: { id: 'nun', audiofilePath: AUDIO_PATH + "nun.mp3", pngfilePath: PNG_PATH + "nun" + PNG_VERSION + ".png" },
  nunSofis: { id: 'nunSofis', audiofilePath: AUDIO_PATH + "nunsofis.mp3", pngfilePath: PNG_PATH + "nunsofis" + PNG_VERSION + ".png" },
  samech: { id: 'samech', audiofilePath: AUDIO_PATH + "samech.mp3", pngfilePath: PNG_PATH + "samech" + PNG_VERSION + ".png" },
  ayin: { id: 'ayin', audiofilePath: AUDIO_PATH + "ayin.mp3", pngfilePath: PNG_PATH + "ayin" + PNG_VERSION + ".png" },
  pey: { id: 'pey', audiofilePath: AUDIO_PATH + "pey.mp3", pngfilePath: PNG_PATH + "pey" + PNG_VERSION + ".png" },
  fey: { id: 'fey', audiofilePath: AUDIO_PATH + "fey.mp3", pngfilePath: PNG_PATH + "fey" + PNG_VERSION + ".png" },
  feySofis: { id: 'feySofis', audiofilePath: AUDIO_PATH + "feysofis.mp3", pngfilePath: PNG_PATH + "feysofis" + PNG_VERSION + ".png" },
  tzadi: { id: 'tzadi', audiofilePath: AUDIO_PATH + "tzadi.mp3", pngfilePath: PNG_PATH + "tzadi" + PNG_VERSION + ".png" },
  tzadiSofis: { id: 'tzadiSofis', audiofilePath: AUDIO_PATH + "tzadisofis.mp3", pngfilePath: PNG_PATH + "tzadisofis" + PNG_VERSION + ".png" },
  koof: { id: 'koof', audiofilePath: AUDIO_PATH + "koof.mp3", pngfilePath: PNG_PATH + "koof" + PNG_VERSION + ".png" },
  reish: { id: 'reish', audiofilePath: AUDIO_PATH + "reish.mp3", pngfilePath: PNG_PATH + "reish" + PNG_VERSION + ".png" },
  shin: { id: 'shin', audiofilePath: AUDIO_PATH + "shin.mp3", pngfilePath: PNG_PATH + "shin" + PNG_VERSION + ".png" },
  sin: { id: 'sin', audiofilePath: AUDIO_PATH + "sinn.mp3", pngfilePath: PNG_PATH + "sinn" + PNG_VERSION + ".png" },
  tav: { id: 'tav', audiofilePath: AUDIO_PATH + "tav.mp3", pngfilePath: PNG_PATH + "tav" + PNG_VERSION + ".png" },
  sav: { id: 'sav', audiofilePath: AUDIO_PATH + "sav.mp3", pngfilePath: PNG_PATH + "sav" + PNG_VERSION + ".png" },
  kamatz : {
    id: "kamatz",
    audiofilePath: AUDIO_PATH + "kamatz.mp3",
    pngfilePath: PNG_PATH + "kamatz.png"
  },
  patach : {
    id: "patach",
    audiofilePath: AUDIO_PATH + "patach.mp3",
    pngfilePath: PNG_PATH + "patach.png"
  },
  chirik : {
    id: "chirik",
    audiofilePath: AUDIO_PATH + "chirik.mp3",
    pngfilePath: PNG_PATH + "chirik.png"
  },
  tserey : {
    id: "tserey",
    audiofilePath: AUDIO_PATH + "tserey.mp3",
    pngfilePath: PNG_PATH + "tserey.png"
  },
  segol  : {
    id: "segol",
    audiofilePath: AUDIO_PATH + "segol.mp3",
    pngfilePath: PNG_PATH + "segol.png"
  },
  cholam : {
    id: "cholam",
    audiofilePath: AUDIO_PATH + "cholam.mp3",
    pngfilePath: PNG_PATH + "cholam.png"
  },
  kubutz : {
    id: "kubutz",
    audiofilePath: AUDIO_PATH + "kubutz.mp3",
    pngfilePath: PNG_PATH + "kubutz.png"
  },
  shva   : {
    id: "shva",
    audiofilePath: AUDIO_PATH + "shva.mp3",
    pngfilePath: PNG_PATH + "shva.png"
  }


};

export const sections: Section[] = [
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
    sectionPngPath: PNG_PATH + "aleph_section.png"
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
    sectionPngPath: PNG_PATH + "vav_section.png"
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
    sectionPngPath: PNG_PATH + "kaf_section.png"
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
    sectionPngPath: PNG_PATH + "samech_section.png"
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
    css_id: 'bottom-center container',
    sectionPngPath: PNG_PATH + "koof_section.png"
  },
  {
    letters: [
      alephBeis['kamatz'],
      alephBeis['patach'],
      alephBeis['chirik'],
      alephBeis['tserey'],
      alephBeis['cholam'],
      alephBeis['kubutz'],
      alephBeis['shva']
    ],
    css_id: "bottom-center container",
    sectionPngPath: PNG_PATH + "nekodos_section.png"
  }

];
