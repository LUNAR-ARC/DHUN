'use strict';

/* ══ THEMES ══ */
var THEMES = [
  {key:'all',        label:'All Instruments', icon:'🎵', acc:'#d4a853', bg:'#08080b', bg3:'#18181e', surf:'#1c1c24', surf2:'#26262f', glow:'rgba(212,168,83,.25)'},
  {key:'String',     label:'Strings',         icon:'🎻', acc:'#e05580', bg:'#0e0508', bg3:'#1e0d14', surf:'#261320', surf2:'#301828', glow:'rgba(224,85,128,.25)'},
  {key:'Wind',       label:'Wind',            icon:'🎷', acc:'#4a90f0', bg:'#04090f', bg3:'#0c1628', surf:'#101e32', surf2:'#162840', glow:'rgba(74,144,240,.25)'},
  {key:'Percussion', label:'Percussion',      icon:'🥁', acc:'#3cb870', bg:'#040f07', bg3:'#0c1e10', surf:'#112416', surf2:'#162e1c', glow:'rgba(60,184,112,.25)'},
  {key:'Keys',       label:'Keys',            icon:'🎹', acc:'#9060e8', bg:'#08050f', bg3:'#140e22', surf:'#1c122e', surf2:'#261838', glow:'rgba(144,96,232,.25)'},
  {key:'Electronic', label:'Electronic',      icon:'🎛️', acc:'#00d4cc', bg:'#020d0e', bg3:'#081a1c', surf:'#0c2022', surf2:'#10282c', glow:'rgba(0,212,204,.25)'},
  {key:'Folk',       label:'Folk',            icon:'🪗', acc:'#d09020', bg:'#0e0900', bg3:'#1e1400', surf:'#261c00', surf2:'#302400', glow:'rgba(208,144,32,.25)'}
];

var currentTheme = THEMES[0];

function applyTheme(t) {
  currentTheme = t;
  var r = document.documentElement.style;
  r.setProperty('--acc',   t.acc);
  r.setProperty('--acc2',  t.acc);
  r.setProperty('--bg',    t.bg);
  r.setProperty('--bg3',   t.bg3);
  r.setProperty('--surf',  t.surf);
  r.setProperty('--surf2', t.surf2);
  r.setProperty('--glow',  t.glow);
  document.body.style.background = t.bg;
  var hs = document.getElementById('homeScreen');
  if(hs) hs.style.background = t.bg;
  var ps = document.getElementById('playerScreen');
  if(ps) ps.style.background = t.bg;
  // Update pill states
  document.querySelectorAll('.cat-pill').forEach(function(p) {
    var active = p.dataset.key === t.key;
    p.classList.toggle('active', active);
  });
  document.querySelectorAll('.filter-opt').forEach(function(o) {
    o.classList.toggle('active', o.dataset.cat === t.key);
  });
  var _fl = document.getElementById('filterLabel');
  if(_fl) _fl.textContent = t.label;
}

/* ══ INSTRUMENT DB ══ */
var DB = [
  /* ── KEYS ── */
  {id:'grand_piano',    name:'Grand Piano',       native:'',            family:'Keys',       region:'Europe',       era:'18th c.',  emoji:'🎹', tagline:'The king of instruments -- 88 keys of infinite expression.', desc:'Developed by Bartolomeo Cristofori around 1700. Its vast dynamic range made it the backbone of classical and romantic composition.', facts:[{l:'Invented',v:'~1700, Italy'},{l:'Strings',v:'Up to 243'},{l:'Pedals',v:'3'},{l:'Range',v:'7+ octaves'}], uiType:'piano', sfName:'acoustic_grand_piano', synth:'piano'},
  {id:'harpsichord',    name:'Harpsichord',        native:'Clavecin',    family:'Keys',       region:'Europe',       era:'16th c.',  emoji:'🎹', tagline:"Bach's beloved -- strings plucked by quill.", desc:'Dominated European music from the 15th to 18th century. Strings are plucked producing a bright metallic timbre that shaped the Baroque era.', facts:[{l:'Mechanism',v:'Plectrum pluck'},{l:'Heyday',v:'Baroque era'},{l:'Keyboards',v:'1-2 manuals'},{l:'Origin',v:'~1500 Europe'}], uiType:'piano', sfName:'harpsichord', synth:'harpsichord'},
  {id:'organ',          name:'Pipe Organ',          native:'',            family:'Keys',       region:'Europe',       era:'Ancient',  emoji:'🎹', tagline:'The voice of cathedrals -- wind through ten thousand pipes.', desc:'Roots in the hydraulis of ancient Greece. Air forced through metal or wooden pipes creates immense polyphonic power for two millennia.', facts:[{l:'Origin',v:'3rd c. BC'},{l:'Pipes',v:'100s to 10,000+'},{l:'Mechanism',v:'Wind pressure'},{l:'Largest',v:'Boardwalk Hall NJ'}], uiType:'piano', sfName:'church_organ', synth:'organ'},
  {id:'accordion',      name:'Accordion',           native:'Akkordeon',   family:'Keys',       region:'Europe',       era:'19th c.',  emoji:'🪗', tagline:'Folk heart of Europe -- bellows that breathe music.', desc:'Invented in 1822 Berlin. Uses bellows to force air over metal reeds. Central to tango, musette, and Cajun music.', facts:[{l:'Invented',v:'~1822, Berlin'},{l:'Mechanism',v:'Free metal reeds'},{l:'Bellows',v:'Push & pull'},{l:'Genres',v:'Tango, Folk, Zydeco'}], uiType:'piano', sfName:'accordion', synth:'accordion'},
  {id:'celesta',        name:'Celesta',             native:'Célesta',     family:'Keys',       region:'France',       era:'19th c.',  emoji:'🎹', tagline:'Tinkling bells in a box -- ethereal and otherworldly.', desc:'Invented by Auguste Mustel in 1886 Paris. Steel plates struck by hammers produce a soft, bell-like tone used famously in Tchaikovsky\'s Dance of the Sugar Plum Fairy.', facts:[{l:'Invented',v:'1886, Paris'},{l:'Mechanism',v:'Hammers on steel plates'},{l:'Range',v:'4-5 octaves'},{l:'Famous use',v:'Nutcracker Suite'}], uiType:'piano', sfName:'celesta', synth:'kalimba'},
  {id:'clavichord',     name:'Clavichord',          native:'',            family:'Keys',       region:'Europe',       era:'14th c.',  emoji:'🎹', tagline:'The quietest keyboard -- intimate touch of a Renaissance scholar.', desc:'One of the earliest keyboard instruments, the clavichord produces a soft sound by brass tangents striking strings. Unique in its ability to vary pitch by key pressure.', facts:[{l:'Origin',v:'14th century Europe'},{l:'Mechanism',v:'Tangent striking'},{l:'Volume',v:'Very soft'},{l:'Touch response',v:'Bebung vibrato'}], uiType:'piano', sfName:'harpsichord', synth:'harpsichord'},
  {id:'fortepiano',     name:'Fortepiano',          native:'',            family:'Keys',       region:'Europe',       era:'18th c.',  emoji:'🎹', tagline:'Mozart\'s own -- the hammer piano of the Classical era.', desc:'The early piano of Mozart and Beethoven\'s time. Lighter action and thinner strings give it a delicate, silvery tone distinct from the modern concert grand.', facts:[{l:'Era',v:'1700s-1820s'},{l:'Action',v:'Viennese/English'},{l:'Tone',v:'Bright, intimate'},{l:'Players',v:'Mozart, Haydn, Beethoven'}], uiType:'piano', sfName:'acoustic_grand_piano', synth:'piano'},
  {id:'harmonium',      name:'Harmonium',           native:'',            family:'Keys',       region:'Europe/India', era:'19th c.',  emoji:'🎹', tagline:'Sacred halls and Indian ragas -- the breathing reed organ.', desc:'A keyboard instrument using free metal reeds activated by bellows pumped by foot or hand. Central to 19th-century parlour music and deeply embedded in Indian classical and devotional music.', facts:[{l:'Invented',v:'1840, Paris'},{l:'Mechanism',v:'Free reeds'},{l:'Adopted in',v:'Indian devotional music'},{l:'Air source',v:'Foot bellows'}], uiType:'piano', sfName:'reed_organ', synth:'accordion'},
  {id:'spinet',         name:'Spinet',              native:'',            family:'Keys',       region:'Europe',       era:'17th c.',  emoji:'🎹', tagline:'The compact harpsichord of the domestic parlour.', desc:'A small wing-shaped harpsichord popular from the 17th to early 18th century. Its strings run at an oblique angle, making it more compact than a full harpsichord.', facts:[{l:'Shape',v:'Wing or leg-of-mutton'},{l:'Strings',v:'Single set'},{l:'Era',v:'1600s-1700s'},{l:'Size',v:'Smaller than harpsichord'}], uiType:'piano', sfName:'harpsichord', synth:'harpsichord'},
  {id:'synth_lead',     name:'Synthesizer Lead',    native:'',            family:'Electronic', region:'USA',          era:'20th c.',  emoji:'🎛️', tagline:'Voltage-controlled sound -- the future, always.', desc:"Evolved from Robert Moog's voltage-controlled instrument of 1964. Defined the sound of electronic music, pop, and rock.", facts:[{l:'Pioneer',v:'Robert Moog, 1964'},{l:'Waveforms',v:'Sine, sawtooth, square'},{l:'Control',v:'ADSR envelope'},{l:'Genres',v:'Electronic, Pop, Rock'}], uiType:'piano', sfName:'lead_1_square', synth:'synth'},
  {id:'electric_piano', name:'Electric Piano',      native:'',            family:'Electronic', region:'USA',          era:'20th c.',  emoji:'🎹', tagline:'Fender Rhodes -- warm tines that defined soul music.', desc:"Electric pianos use mechanical tines picked up electromagnetically. The Rhodes tone defined jazz fusion and R&B from the 1960s onward.", facts:[{l:'Mechanism',v:'Struck tines or reeds'},{l:'Invented',v:'Harold Rhodes, 1940s'},{l:'Pickup',v:'Electromagnetic'},{l:'Artists',v:'Stevie Wonder, Hancock'}], uiType:'piano', sfName:'electric_piano_1', synth:'electricpiano'},
  {id:'ondes_martenot',  name:'Ondes Martenot',     native:'',            family:'Electronic', region:'France',       era:'20th c.',  emoji:'🎛️', tagline:'The haunting cry of early electronics -- waves of sound.', desc:'Invented by Maurice Martenot in 1928. One of the earliest electronic instruments, producing an eerie, singing tone by moving a ring along a wire. Featured in Messiaen\'s Turangalila Symphony.', facts:[{l:'Invented',v:'1928, France'},{l:'Mechanism',v:'Heterodyne oscillators'},{l:'Control',v:'Ring on wire or keyboard'},{l:'Famous use',v:'Messiaen, Radiohead'}], uiType:'piano', sfName:'lead_1_square', synth:'synth'},

  /* ── STRINGS ── */
  {id:'guitar',         name:'Acoustic Guitar',     native:'Guitarra',    family:'String',     region:'Spain',        era:'15th c.',  emoji:'🎸', tagline:'Six strings that have carried a million songs.', desc:"Descended from the lute and Moorish guitar. The world's most popular instrument.", facts:[{l:'Strings',v:'6 (standard)'},{l:'Tuning',v:'E A D G B e'},{l:'Body',v:'Spruce + Rosewood'},{l:'Origin',v:'Spain'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['E2','A2','D3','G3','B3','e4'], showFrets:true},
  {id:'violin',         name:'Violin',              native:'Violino',     family:'String',     region:'Italy',        era:'16th c.',  emoji:'🎻', tagline:'The soprano of the orchestra -- carved from spruce and maple.', desc:'Developed in 16th-century Cremona. Stradivari created instruments whose acoustic secrets remain unsolved.', facts:[{l:'Strings',v:'4 (G D A E)'},{l:'Bow',v:'~150 horsehairs'},{l:'Wood',v:'Spruce top, Maple back'},{l:'Tuning',v:'G3 D4 A4 E5'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['G3','D4','A4','E5'], showFrets:false},
  {id:'cello',          name:'Cello',               native:'Violoncello', family:'String',     region:'Italy',        era:'16th c.',  emoji:'🎻', tagline:'The baritone voice of the string section.', desc:'Held between the knees, prized as both orchestral workhorse and expressive solo instrument.', facts:[{l:'Strings',v:'4 (C G D A)'},{l:'Range',v:'C2-C6'},{l:'Position',v:'Seated, end-pin'},{l:'Bow',v:'Shorter than bass'}], uiType:'strings', sfName:'cello', synth:'bowed', stringLabels:['C2','G2','D3','A3'], showFrets:false},
  {id:'double_bass',    name:'Double Bass',         native:'Contrabasso', family:'String',     region:'Italy',        era:'16th c.',  emoji:'🎻', tagline:'The orchestral foundation -- the deepest bowed voice.', desc:'The largest and lowest-pitched bowed string instrument. The backbone of the orchestra\'s low end and central to jazz, rockabilly, and bluegrass.', facts:[{l:'Strings',v:'4 (E A D G)'},{l:'Height',v:'~180 cm'},{l:'Range',v:'E1-C5'},{l:'Jazz use',v:'Pizzicato walking bass'}], uiType:'strings', sfName:'contrabass', synth:'bowed', stringLabels:['E1','A1','D2','G2'], showFrets:false},
  {id:'viola',          name:'Viola',               native:'Viola',       family:'String',     region:'Italy',        era:'16th c.',  emoji:'🎻', tagline:'The forgotten middle voice -- warmer and deeper than the violin.', desc:'Slightly larger than the violin, tuned a fifth lower. Its dark, rich alto voice fills the harmonic middle of the string section.', facts:[{l:'Strings',v:'4 (C G D A)'},{l:'Size',v:'Larger than violin'},{l:'Range',v:'C3-E6'},{l:'Role',v:'Orchestral alto/tenor'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['C3','G3','D4','A4'], showFrets:false},
  {id:'sitar',          name:'Sitar',               native:'सितार',       family:'String',     region:'India',        era:'13th c.',  emoji:'🪕', tagline:'Seven playing strings, thirteen sympathetic -- the voice of Raga.', desc:'The emblematic instrument of Hindustani classical music. Its resonant buzzing timbre is central to North Indian music.', facts:[{l:'Strings',v:'18-20 total'},{l:'Origin',v:'North India'},{l:'Scale',v:'Hindustani Raga'},{l:'Frets',v:'Movable, curved'}], uiType:'strings', sfName:'sitar', synth:'sitar', stringLabels:['C#2','G#2','C#3','G#3','B3','C#4','D#4'], showFrets:true},
  {id:'sarod',          name:'Sarod',               native:'सरोद',        family:'String',     region:'India',        era:'19th c.',  emoji:'🪕', tagline:'Fretless mastery -- the metallic soul of Hindustani music.', desc:'A fretless plucked string instrument with a metallic fingerboard. Produces a deep, weighty tone central to Hindustani classical music, associated with maestros Ali Akbar Khan and Amjad Ali Khan.', facts:[{l:'Strings',v:'25 total'},{l:'Fingerboard',v:'Metal (fretless)'},{l:'Origin',v:'Afghanistan/India'},{l:'Tuning system',v:'Hindustani Raga'}], uiType:'strings', sfName:'sitar', synth:'sitar', stringLabels:['C2','G2','C3','F3','A3','D4'], showFrets:false},
  {id:'veena',          name:'Veena',               native:'வீணை',        family:'String',     region:'India',        era:'Ancient',  emoji:'🪕', tagline:'Mother of Indian music -- ancient strings of the goddess Saraswati.', desc:'One of the oldest Indian string instruments, closely associated with goddess Saraswati. The Saraswati veena, with its deep resonator gourd and long fretted neck, produces the quintessential sound of Carnatic classical music.', facts:[{l:'Strings',v:'7 (4 main, 3 drone)'},{l:'Origin',v:'Ancient India'},{l:'Style',v:'Carnatic classical'},{l:'Length',v:'~100 cm'}], uiType:'strings', sfName:'sitar', synth:'plucked', stringLabels:['C2','D2','G2','C3','G3'], showFrets:true},
  {id:'koto',           name:'Koto',                native:'琴',          family:'String',     region:'Japan',        era:'8th c.',   emoji:'🎵', tagline:"Japan's national instrument -- thirteen silken strings across a dragon body.", desc:'A Japanese zither with 13 strings over paulownia wood. Central to Japanese court music (gagaku).', facts:[{l:'Strings',v:'13 (traditional)'},{l:'Length',v:'~180 cm'},{l:'Material',v:'Paulownia wood'},{l:'Played with',v:'Finger picks'}], uiType:'strings', sfName:'koto', synth:'plucked', stringLabels:['D2','E2','G2','A2','B2','D3','E3'], showFrets:false},
  {id:'shamisen',       name:'Shamisen',            native:'三味線',       family:'String',     region:'Japan',        era:'16th c.',  emoji:'🪕', tagline:'Cat-skin stretched over a square body -- the sound of old Edo.', desc:'A three-stringed Japanese plucked lute played with a large plectrum (bachi). Instrument of kabuki theatre and geisha entertainment.', facts:[{l:'Strings',v:'3 (silk or nylon)'},{l:'Body',v:'Synthetic skin'},{l:'Plectrum',v:'Bachi'},{l:'Contexts',v:'Kabuki, Bunraku, Geisha'}], uiType:'strings', sfName:'shamisen', synth:'banjo', stringLabels:['A2','D3','A3'], showFrets:false},
  {id:'biwa',           name:'Biwa',                native:'琵琶',         family:'String',     region:'Japan',        era:'8th c.',   emoji:'🪕', tagline:'The pear-shaped lute of Japanese court -- voice of battle epics.', desc:'A short-necked lute of Chinese origin that became central to Japanese court music and the narration of epic tales like The Tale of the Heike. Known for its buzzing, harsh timbre.', facts:[{l:'Strings',v:'4-5'},{l:'Frets',v:'4 large frets'},{l:'Origin',v:'China/Japan, 8th c.'},{l:'Used in',v:'Gagaku, Heike Monogatari'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'banjo', stringLabels:['A2','D3','E3','A3'], showFrets:false},
  {id:'guqin',          name:'Guqin',               native:'古琴',         family:'String',     region:'China',        era:'Ancient',  emoji:'🎵', tagline:'Five thousand years of silence and resonance -- China\'s sacred zither.', desc:'One of the oldest and most revered instruments in Chinese culture, with a history of over 3,000 years. Confucius played it. UNESCO-listed, it has 13 hui (studs) marking harmonics and embodies Taoist philosophy.', facts:[{l:'Strings',v:'7 (silk or metal)'},{l:'Age',v:'3000+ years'},{l:'UNESCO',v:'2003 Heritage'},{l:'Range',v:'4 octaves'}], uiType:'strings', sfName:'koto', synth:'plucked', stringLabels:['C2','D2','F2','G2','A2','C3','D3'], showFrets:false},
  {id:'guzheng',        name:'Guzheng',             native:'古筝',         family:'String',     region:'China',        era:'Ancient',  emoji:'🎵', tagline:'The flowing river of Chinese music -- 21 strings of silk.', desc:'A Chinese plucked zither with 21 strings and movable bridges. Its expressive glissandos and ornamental techniques represent the essence of Chinese classical music. Ancestor of the Japanese koto.', facts:[{l:'Strings',v:'21 (standard)'},{l:'Bridges',v:'Movable'},{l:'Technique',v:'Right hand plucks, left bends'},{l:'Origin',v:'China, ~4th c. BC'}], uiType:'strings', sfName:'koto', synth:'plucked', stringLabels:['D2','E2','G2','A2','B2','D3','E3'], showFrets:false},
  {id:'erhu',           name:'Erhu',                native:'二胡',         family:'String',     region:'China',        era:'10th c.',  emoji:'🎻', tagline:"Two strings, infinite feeling -- China's singing violin.", desc:"A two-string bowed fiddle. Its timbre is often described as resembling a human voice.", facts:[{l:'Strings',v:'2 (D4 and A4)'},{l:'Bow',v:'Threaded between strings'},{l:'Origin',v:'China, Tang Dynasty'},{l:'Resonator',v:'Snakeskin tube'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['D4','A4'], showFrets:false},
  {id:'pipa',           name:'Pipa',                native:'琵琶',         family:'String',     region:'China',        era:'2nd c.',   emoji:'🪕', tagline:'The Chinese lute -- two thousand years of bright plucked fire.', desc:'A four-stringed Chinese lute with a pear-shaped body. One of the most important Chinese instruments, capable of depicting thunderstorms, battles, and moonlit landscapes. Played upright in the lap.', facts:[{l:'Strings',v:'4'},{l:'Frets',v:'30+ frets'},{l:'Origin',v:'2nd century BC'},{l:'Styles',v:'Wenqu, Wuqu (civil/martial)'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'banjo', stringLabels:['A2','D3','E3','A3'], showFrets:true},
  {id:'morin_khuur',    name:'Morin Khuur',         native:'Морин хуур',   family:'String',     region:'Mongolia',     era:'13th c.',  emoji:'🎻', tagline:'The horse-head fiddle -- the steppe wind in wood and hair.', desc:'The national instrument of Mongolia, with a carved horse-head on its scroll. UNESCO-listed. Its two strings are made from horse hair and it produces a raw, resonant tone evoking the vast Mongolian steppes.', facts:[{l:'Strings',v:'2 (horse hair)'},{l:'UNESCO',v:'2003 Heritage'},{l:'Origin',v:'13th c. Mongolia'},{l:'Symbol',v:'National instrument'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['D3','A3'], showFrets:false},
  {id:'harp',           name:'Concert Harp',        native:'Harpe',       family:'String',     region:'Europe',       era:'Ancient',  emoji:'🎵', tagline:'Forty-seven strings reaching toward heaven.', desc:'The pedal harp has 47 strings spanning six and a half octaves. One of the oldest instruments.', facts:[{l:'Strings',v:'47'},{l:'Pedals',v:'7 (3 positions)'},{l:'Range',v:'C1-G7'},{l:'Weight',v:'~38 kg'}], uiType:'strings', sfName:'orchestral_harp', synth:'plucked', stringLabels:['C2','E2','G2','B2','D3','F3','A3'], showFrets:false},
  {id:'lyre',           name:'Lyre',                native:'Λύρα',        family:'String',     region:'Greece',       era:'Ancient',  emoji:'🎵', tagline:'The instrument of Orpheus -- plucked at the birth of Western music.', desc:'One of the oldest European string instruments, originating in ancient Mesopotamia and central to Greek and Roman civilization. Plucked with a plectrum while the fingers of the left hand damp unwanted strings.', facts:[{l:'Origin',v:'3000+ BC Mesopotamia'},{l:'Strings',v:'4-10'},{l:'Players',v:'Orpheus, Apollo (mythic)'},{l:'Use',v:'Poetry, ritual, education'}], uiType:'strings', sfName:'orchestral_harp', synth:'plucked', stringLabels:['A2','B2','D3','E3','G3','A3'], showFrets:false},
  {id:'oud',            name:'Oud',                 native:'عود',         family:'String',     region:'Middle East',  era:'Ancient',  emoji:'🪕', tagline:'The grandfather of the lute -- fretless, ancient, and profound.', desc:'A short-neck fretless lute played across the Arab world. The ancestor of the European lute.', facts:[{l:'Strings',v:'11 (5 courses + 1)'},{l:'Frets',v:'None'},{l:'Origin',v:'Mesopotamia, 3500+ yrs'},{l:'Scale',v:'Arabic Maqam'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'plucked', stringLabels:['C2','F2','A2','D3','G3','C4'], showFrets:false},
  {id:'tar',            name:'Tar',                 native:'تار',         family:'String',     region:'Iran',         era:'18th c.',  emoji:'🪕', tagline:'The Persian heart -- double-bowl resonance of the ancient East.', desc:'A long-necked plucked lute with a figure-eight-shaped double-bowl body covered in lambskin. The primary instrument of Persian classical music and widely played across the Caucasus.', facts:[{l:'Strings',v:'6 (3 courses)'},{l:'Body',v:'Double-bowl, lambskin'},{l:'Origin',v:'Persia/Iran'},{l:'Frets',v:'26-28 movable gut frets'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['C2','G2','C3','G3'], showFrets:true},
  {id:'setar',          name:'Setar',               native:'سه‌تار',       family:'String',     region:'Iran',         era:'Ancient',  emoji:'🪕', tagline:'Three strings of Persian mysticism -- the Sufi\'s companion.', desc:'A delicate long-necked lute with only three or four strings, traditionally played by Sufi mystics. Its intimate, ethereal tone is considered by Persian musicians to be the most spiritual of all instruments.', facts:[{l:'Strings',v:'3-4'},{l:'Body',v:'Mulberry wood, small'},{l:'Origin',v:'Ancient Persia'},{l:'Context',v:'Sufi mysticism'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['C3','D3','G3'], showFrets:false},
  {id:'balalaika',      name:'Balalaika',           native:'Балалайка',   family:'String',     region:'Russia',       era:'17th c.',  emoji:'🪕', tagline:"Russia's triangular soul -- three strings, infinite folk.", desc:'A triangular-bodied Russian instrument with three strings. Central to Russian folk music.', facts:[{l:'Shape',v:'Triangular body'},{l:'Strings',v:'3'},{l:'Family',v:'6 sizes'},{l:'Tuning',v:'E-E-A (prima)'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['E4','E4','A4'], showFrets:true},
  {id:'domra',          name:'Domra',               native:'Домра',       family:'String',     region:'Russia',       era:'16th c.',  emoji:'🪕', tagline:'The Russian troubadour\'s lute -- ancestor of the balalaika.', desc:'A plucked string instrument with a round body, related to the mandolin. Used by Russian skomorokhi (travelling entertainers) in the 16th century and revived in the 19th century for concert performance.', facts:[{l:'Strings',v:'3-4'},{l:'Body',v:'Round/oval'},{l:'Origin',v:'16th c. Russia'},{l:'Technique',v:'Plectrum tremolo'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['G3','D4','A4'], showFrets:true},
  {id:'bandura',        name:'Bandura',             native:'Бандура',     family:'String',     region:'Ukraine',      era:'16th c.',  emoji:'🪕', tagline:'Ukraine\'s national soul -- 60 strings of silver and grief.', desc:'The national instrument of Ukraine, combining a lute-like bass section with a large number of short treble strings (basses). Associated with the kobzar (blind wandering bards) and Ukrainian national identity.', facts:[{l:'Strings',v:'55-68 total'},{l:'Origin',v:'16th c. Ukraine'},{l:'Players',v:'Kobzar (bards)'},{l:'Symbol',v:'Ukrainian national identity'}], uiType:'strings', sfName:'orchestral_harp', synth:'plucked', stringLabels:['C2','E2','G2','B2','D3','F3','A3'], showFrets:false},
  {id:'banjo',          name:'Banjo',               native:'',            family:'String',     region:'Americas',     era:'17th c.',  emoji:'🪕', tagline:'Five strings of Appalachian soul.', desc:'Evolved from West African gourd instruments. Central to bluegrass, old-time, and Dixieland jazz.', facts:[{l:'Strings',v:'4 or 5'},{l:'Body',v:'Skin or synthetic head'},{l:'Origin',v:'West Africa / Americas'},{l:'Styles',v:'Clawhammer, 3-finger'}], uiType:'strings', sfName:'banjo', synth:'banjo', stringLabels:['G4','D3','G3','B3','D4'], showFrets:true},
  {id:'charango',       name:'Charango',            native:'',            family:'String',     region:'Andes',        era:'17th c.',  emoji:'🪕', tagline:'Ten strings in the Andes -- born from the armadillo shell.', desc:'A small Andean lute originating in Bolivia and Peru, historically made with an armadillo shell. Emblematic of Andean folk music.', facts:[{l:'Strings',v:'10 (5 double courses)'},{l:'Origin',v:'Bolivia & Peru'},{l:'Shell',v:'Historically armadillo'},{l:'Tuning',v:'G-C-E-A-E'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['G3','C4','E4','A4','E4'], showFrets:true},
  {id:'ukulele',        name:'Ukulele',             native:'ʻUkulele',    family:'String',     region:'Hawaii',       era:'19th c.',  emoji:'🪕', tagline:'Small, joyful, and utterly Hawaiian.', desc:'Developed in Hawaii in the 1880s from the Portuguese braguinha. Four nylon strings.', facts:[{l:'Strings',v:'4 (G C E A)'},{l:'Origin',v:'Hawaii / Portugal'},{l:'Sizes',v:'Soprano, Concert, Tenor'},{l:'Material',v:'Mahogany / Koa'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['G4','C4','E4','A4'], showFrets:true},
  {id:'cuatro',         name:'Cuatro',              native:'',            family:'String',     region:'Venezuela',    era:'16th c.',  emoji:'🪕', tagline:'The soul of Venezuela -- four double strings of the llanos.', desc:'Venezuela\'s national instrument, a small guitar-like instrument with four double courses of strings. Central to joropo music and the Venezuelan cultural identity.', facts:[{l:'Strings',v:'8 (4 double courses)'},{l:'Origin',v:'Venezuela'},{l:'Genre',v:'Joropo'},{l:'Symbol',v:'Venezuelan national identity'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['A3','D4','F#4','B4'], showFrets:true},
  {id:'tiple',          name:'Tiple',               native:'',            family:'String',     region:'Colombia',     era:'17th c.',  emoji:'🪕', tagline:'Twelve strings of Colombian highland soul.', desc:'A small guitar-like instrument with 12 strings arranged in 4 courses of 3. The national instrument of Colombia, central to Andean bambuco and pasillo music.', facts:[{l:'Strings',v:'12 (4 triple courses)'},{l:'Origin',v:'Colombia'},{l:'Genre',v:'Bambuco, Pasillo'},{l:'Symbol',v:'Colombian national identity'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['G3','B3','E4','A4'], showFrets:true},
  {id:'rebab',          name:'Rebab',               native:'رباب',        family:'String',     region:'Middle East',  era:'8th c.',   emoji:'🎻', tagline:'The oldest bowed instrument -- ancestor of all violins.', desc:'Considered the ancestor of all European bowed instruments including the violin. Originating in Central Asia, it spread across the Middle East, North Africa, and into Europe via Islamic Spain, where it became the rebec.', facts:[{l:'Origin',v:'8th c. Central Asia'},{l:'Bow',v:'Horsehair'},{l:'Ancestor of',v:'Rebec, Violin family'},{l:'Spread',v:'Islamic world into Europe'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['A2','D3','A3'], showFrets:false},
  {id:'sarangi',        name:'Sarangi',             native:'सारंगी',      family:'String',     region:'India',        era:'17th c.',  emoji:'🎻', tagline:'The crying voice of North India -- 40 strings of pure emotion.', desc:'A short-necked bowed instrument with three playing strings and 35-37 sympathetic strings beneath. Its uniquely expressive tone closely mimics the human voice, making it the primary accompanying instrument in Hindustani vocal music.', facts:[{l:'Playing strings',v:'3 main + 37 sympathetic'},{l:'Origin',v:'North India, 17th c.'},{l:'Role',v:'Vocal accompaniment'},{l:'Technique',v:'Nails, not fingertips'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['C3','G3','D4'], showFrets:false},
  {id:'esraj',          name:'Esraj',               native:'এসরাজ',       family:'String',     region:'India',        era:'19th c.',  emoji:'🎻', tagline:'The bowed bridge -- between the sarangi and the sitar.', desc:'A hybrid bowed instrument combining the bowing technique of the sarangi with a fretted neck. Popular in Bengal and used extensively in Rabindra Sangeet (Tagore songs).', facts:[{l:'Strings',v:'4 main + 15-20 sympathetic'},{l:'Origin',v:'19th c. Bengal, India'},{l:'Frets',v:'Yes (unlike sarangi)'},{l:'Music',v:'Rabindra Sangeet, Dhrupad'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['D3','A3','D4'], showFrets:false},
  {id:'nyckelharpa',    name:'Nyckelharpa',         native:'',            family:'String',     region:'Sweden',       era:'14th c.',  emoji:'🎻', tagline:'The keyed fiddle of medieval Sweden -- UNESCO heritage.', desc:'A traditional Swedish string instrument played with a bow and featuring tangent keys that stop the strings. UNESCO-listed, dating from the 14th century. It has 16 strings including 12 sympathetic.', facts:[{l:'Strings',v:'16 (4 playing + 12 sympathetic)'},{l:'Keys',v:'37 wooden tangents'},{l:'UNESCO',v:'2013 Heritage'},{l:'Origin',v:'14th c. Sweden'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['C3','G3','D4','A4'], showFrets:false},
  {id:'hardanger',      name:'Hardanger Fiddle',    native:'Hardingfele', family:'String',     region:'Norway',       era:'17th c.',  emoji:'🎻', tagline:'Norway\'s soul -- a fiddle with a ghost beneath its strings.', desc:'The national instrument of Norway. Has four regular strings plus four or five sympathetic strings running beneath the fingerboard, creating a shimmering, resonant quality distinct from the violin.', facts:[{l:'Strings',v:'8-9 total'},{l:'Sympathetic',v:'4-5 below fingerboard'},{l:'Origin',v:'17th c. Norway'},{l:'Symbol',v:'Norwegian national instrument'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['A3','D4','A4','E5'], showFrets:false},
  {id:'qanun',          name:'Qanun',               native:'قانون',       family:'String',     region:'Middle East',  era:'10th c.',  emoji:'🎵', tagline:'The law of sound -- 78 strings of Arab classical music.', desc:'A large plucked zither with 75-81 strings arranged in triple courses. Central to Arabic, Turkish, and Greek classical music. Each string has small levers (mandal) allowing microtonal adjustments to play all maqam modes.', facts:[{l:'Strings',v:'75-81 (triple courses)'},{l:'Levers',v:'Mandal for microtones'},{l:'Origin',v:'10th c. Arab world'},{l:'Tuning',v:'Maqam modal system'}], uiType:'strings', sfName:'koto', synth:'plucked', stringLabels:['C2','D2','E2','G2','A2','C3','D3'], showFrets:false},
  {id:'santoor',        name:'Santoor',             native:'संतूर',        family:'String',     region:'Iran/India',   era:'Ancient',  emoji:'🎵', tagline:'Hundred strings struck with hammers -- the Persian dulcimer.', desc:'A trapezoidal hammered dulcimer with 72-100 strings played with light wooden mallets (mezrabs). Central to both Persian and Kashmiri classical music. The ancestor of the piano hammered action.', facts:[{l:'Strings',v:'72-100'},{l:'Played with',v:'Wooden mallets (mezrabs)'},{l:'Origin',v:'Ancient Persia/India'},{l:'Ancestor of',v:'Piano mechanism'}], uiType:'strings', sfName:'koto', synth:'steelpan', stringLabels:['C2','D2','E2','G2','A2','C3'], showFrets:false},
  {id:'appalachian_dulcimer', name:'Appalachian Dulcimer', native:'', family:'String', region:'USA', era:'19th c.', emoji:'🎵', tagline:'Mountain harmony -- the Appalachian drone of the American folk.', desc:'A fretted zither from the Appalachian mountains of the USA. Played on the lap, it has three or four strings with drone strings providing a constant buzzing backdrop to the melody.', facts:[{l:'Strings',v:'3-4'},{l:'Origin',v:'19th c. Appalachian Mountains'},{l:'Play style',v:'Lap, noter stick or fingers'},{l:'Tuning',v:'DAA or DAD'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['D3','A3','D4'], showFrets:true},

  /* ── WIND ── */
  {id:'flute',          name:'Flute',               native:'Flute',       family:'Wind',       region:'Europe',       era:'Ancient',  emoji:'🪈', tagline:'Breath turned to birdsong -- the oldest melody.', desc:'Bone flutes date to 43,000 years ago. The modern Boehm-system silver flute was perfected in 1847.', facts:[{l:'Material',v:'Silver, Gold, or Wood'},{l:'Range',v:'B3-D7'},{l:'Keys',v:'16-17 pads'},{l:'Inventor',v:'Theobald Boehm, 1847'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:74},
  {id:'piccolo',        name:'Piccolo',             native:'Ottavino',    family:'Wind',       region:'Europe',       era:'18th c.',  emoji:'🪈', tagline:'The highest voice in the orchestra -- piercing and brilliant.', desc:'The smallest and highest-pitched member of the flute family, sounding one octave higher. Its penetrating tone can be heard above a full orchestra and is famous for its use in Sousa marches.', facts:[{l:'Pitch',v:'One octave above flute'},{l:'Length',v:'~32 cm'},{l:'Range',v:'D5-C8'},{l:'Famous use',v:'Sousa marches, Beethoven\'s 5th'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:86},
  {id:'shakuhachi',     name:'Shakuhachi',          native:'尺八',         family:'Wind',       region:'Japan',        era:'8th c.',   emoji:'🪈', tagline:'Bamboo breath -- the Zen Buddhist flute of Japan.', desc:'An end-blown bamboo flute of Chinese origin, adopted and transformed in Japan. Associated with Zen Buddhist meditation and the komuso monks. Capable of extraordinary tonal subtlety through embouchure control.', facts:[{l:'Material',v:'Madake bamboo'},{l:'Technique',v:'End-blown, embouchure'},{l:'Origin',v:'Japan, 8th c. (from China)'},{l:'Context',v:'Zen Buddhist meditation'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:69},
  {id:'bansuri',        name:'Bansuri',             native:'बांसुरी',     family:'Wind',       region:'India',        era:'Ancient',  emoji:'🪈', tagline:'Krishna\'s flute -- bamboo breath of North Indian devotion.', desc:'A side-blown bamboo flute sacred to the god Krishna. Central to Hindustani classical music. Made from a single length of bamboo with no keys, relying entirely on embouchure and finger technique.', facts:[{l:'Material',v:'Single bamboo tube'},{l:'Keys',v:'None (natural holes only)'},{l:'Sacred to',v:'Lord Krishna'},{l:'Music',v:'Hindustani classical'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:72},
  {id:'xiao',           name:'Xiao',                native:'箫',           family:'Wind',       region:'China',        era:'Ancient',  emoji:'🪈', tagline:'The vertical flute of Chinese scholars -- deep and melancholy.', desc:'A vertical end-blown Chinese bamboo flute with a deeply contemplative tone. Often played in Chinese classical and folk music, and used in Daoist ritual. Unlike the transverse dizi, the xiao is blown from the top.', facts:[{l:'Material',v:'Bamboo (purple or dark)'},{l:'Technique',v:'End-blown vertical'},{l:'Origin',v:'Ancient China'},{l:'Mood',v:'Contemplative, melancholic'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:67},
  {id:'dizi',           name:'Dizi',                native:'笛子',         family:'Wind',       region:'China',        era:'Ancient',  emoji:'🪈', tagline:'The bright transverse flute of Chinese folk -- alive and dancing.', desc:'A transverse bamboo flute with a unique membrane hole (di mo) that gives it a bright, slightly buzzing tone. One of the most important Chinese folk instruments, also used in Chinese opera.', facts:[{l:'Material',v:'Bamboo'},{l:'Special feature',v:'Membrane hole (di mo)'},{l:'Technique',v:'Transverse (side-blown)'},{l:'Origin',v:'Ancient China, widespread use'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:76},
  {id:'ney',            name:'Ney',                 native:'نی',          family:'Wind',       region:'Middle East',  era:'Ancient',  emoji:'🪈', tagline:'The reed of longing -- Rumi\'s metaphor in breath and bamboo.', desc:'One of the oldest musical instruments still in use, the ney is an end-blown reed flute of the Middle East. It opens Rumi\'s Masnavi. Central to Persian, Turkish, and Arabic classical music and Sufi rituals.', facts:[{l:'Material',v:'Arundo donax reed'},{l:'Origin',v:'Ancient Persia/Egypt'},{l:'Used in',v:'Sufi rituals, Persian/Turkish classical'},{l:'Rumi reference',v:'Opening of Masnavi'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:70},
  {id:'ocarina',        name:'Ocarina',             native:'',            family:'Wind',       region:'Italy',        era:'1860s',    emoji:'🪈', tagline:'The sweet potato flute -- a clay vessel of pure tone.', desc:'A small vessel flute made of ceramic or clay, popularized by Giuseppe Donati in 1853 and beloved worldwide since Nintendo\'s Legend of Zelda. Its hollow, warm tone has ancient precursors across multiple cultures.', facts:[{l:'Material',v:'Ceramic or plastic'},{l:'Invented',v:'1853, Budrio, Italy'},{l:'Holes',v:'10-12'},{l:'Pop culture',v:'Legend of Zelda (1998)'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:72},
  {id:'recorder',       name:'Recorder',            native:'Blockflote',  family:'Wind',       region:'Europe',       era:'Medieval', emoji:'🪈', tagline:'Every schoolchild\'s first breath of music.', desc:'A fipple flute (duct flute) of European origin, flourishing in the Renaissance and Baroque. Produces sound through a mouthpiece (fipple) that directs air across a sharp edge. Comes in many sizes from sopranino to great bass.', facts:[{l:'Technique',v:'Fipple (duct) flute'},{l:'Heyday',v:'Renaissance & Baroque'},{l:'Sizes',v:'Sopranino to Great Bass'},{l:'Material',v:'Wood or plastic'}], uiType:'wind', sfName:'flute', synth:'flute', windNote:76},
  {id:'panpipes',       name:'Pan Flute',           native:'Nai / Siku',  family:'Wind',       region:'Romania',      era:'Ancient',  emoji:'🪈', tagline:'The breath of shepherds across mountains and millennia.', desc:'Pan flutes appear independently across South America, Romania, and China. Sound by blowing across open tube tops.', facts:[{l:'Tubes',v:'18-24 common'},{l:'Material',v:'Reed, bamboo, or PVC'},{l:'Origin',v:'Worldwide'},{l:'Greek myth',v:'Named after god Pan'}], uiType:'wind', sfName:'pan_flute', synth:'flute', windNote:72},
  {id:'trumpet',        name:'Trumpet',             native:'Trompette',   family:'Wind',       region:'Europe',       era:'Ancient',  emoji:'🎺', tagline:'Brash, bold, and brilliantly alive -- fanfare of kings.', desc:'The modern valved trumpet was developed in the 1820s, leading the brass section with the highest register.', facts:[{l:'Valves',v:'3 piston or rotary'},{l:'Range',v:'F#3-D6'},{l:'Key',v:'Bb (standard)'},{l:'Bore',v:'Cylindrical'}], uiType:'wind', sfName:'trumpet', synth:'brass', windNote:72},
  {id:'trombone',       name:'Trombone',            native:'',            family:'Wind',       region:'Europe',       era:'15th c.',  emoji:'🎺', tagline:'The slide of thunder -- the only brass instrument that glides.', desc:'A brass instrument that uses a slide to change pitch rather than valves. The unique glissando capability of the trombone makes it the most expressive brass instrument. Central to orchestras, jazz, and New Orleans marching bands.', facts:[{l:'Mechanism',v:'Telescoping slide'},{l:'Pitch change',v:'7 slide positions'},{l:'Range',v:'E2-F5'},{l:'Special ability',v:'Continuous pitch glissando'}], uiType:'wind', sfName:'trombone', synth:'brass', windNote:48},
  {id:'tuba',           name:'Tuba',                native:'',            family:'Wind',       region:'Europe',       era:'19th c.',  emoji:'🎺', tagline:'The bass foundation of the brass -- the earth beneath the orchestra.', desc:'The largest and lowest-pitched brass instrument in the orchestra. Invented in Berlin in 1835, the tuba replaced the ophicleide as the bass of the brass section. Its warm, round tone underpins the full brass ensemble.', facts:[{l:'Invented',v:'1835, Berlin'},{l:'Range',v:'D1-F4'},{l:'Weight',v:'~5-6 kg'},{l:'Role',v:'Bass of the brass section'}], uiType:'wind', sfName:'tuba', synth:'brass', windNote:36},
  {id:'french_horn',    name:'French Horn',         native:'Cor d\'harmonie', family:'Wind',   region:'Europe',       era:'17th c.',  emoji:'🎺', tagline:'Coiled nobility -- the most challenging brass instrument.', desc:'The most technically demanding brass instrument, with over 18 feet of tubing coiled into a circular shape. The player\'s right hand inside the bell further modifies tone. Associated with hunting calls, Romantic orchestral writing, and nobility.', facts:[{l:'Tube length',v:'~18 feet (5.5 m) coiled'},{l:'Valves',v:'3 rotary'},{l:'Range',v:'B1-F5'},{l:'Technique',v:'Hand-stopping in bell'}], uiType:'wind', sfName:'french_horn', synth:'brass', windNote:60},
  {id:'saxophone',      name:'Alto Saxophone',      native:'',            family:'Wind',       region:'Belgium',      era:'19th c.',  emoji:'🎷', tagline:'The soul of jazz, wrapped in brass.', desc:"Invented by Adolphe Sax in 1846. The voice of Charlie Parker's bebop.", facts:[{l:'Inventor',v:'Adolphe Sax, 1846'},{l:'Material',v:'Brass body, wooden reed'},{l:'Key',v:'Eb'},{l:'Range',v:'Db3-A5'}], uiType:'wind', sfName:'alto_sax', synth:'saxophone', windNote:69},
  {id:'tenor_sax',      name:'Tenor Saxophone',     native:'',            family:'Wind',       region:'Belgium',      era:'19th c.',  emoji:'🎷', tagline:'The voice of Coltrane -- the warm, searching cry of jazz.', desc:'Larger and lower than the alto, the tenor saxophone\'s warm, breathy tone became the definitive voice of jazz. Associated with legends like John Coltrane, Sonny Rollins, and Stan Getz.', facts:[{l:'Key',v:'Bb'},{l:'Range',v:'Ab2-E5'},{l:'Players',v:'Coltrane, Rollins, Getz'},{l:'Genres',v:'Jazz, R&B, Rock'}], uiType:'wind', sfName:'tenor_sax', synth:'saxophone', windNote:62},
  {id:'oboe',           name:'Oboe',                native:'Hautbois',    family:'Wind',       region:'Europe',       era:'17th c.',  emoji:'🪈', tagline:'The tuning fork of the orchestra -- the most expressive woodwind.', desc:'A conical-bore double reed woodwind, the oboe is used to tune the orchestra. Its penetrating nasal tone is one of the most distinctively beautiful in all music, requiring immense control of breath and embouchure.', facts:[{l:'Reed',v:'Double reed'},{l:'Bore',v:'Conical'},{l:'Range',v:'Bb3-A6'},{l:'Orchestra role',v:'Tunes the orchestra'}], uiType:'wind', sfName:'oboe', synth:'reed', windNote:69},
  {id:'bassoon',        name:'Bassoon',             native:'Fagotto',     family:'Wind',       region:'Europe',       era:'17th c.',  emoji:'🪈', tagline:'The clown and the tragic poet -- the most versatile woodwind.', desc:'The bass instrument of the woodwind family, the bassoon has a rich, dark tone and extraordinary expressive range from comic to deeply moving. Central to the orchestra, capable of extraordinary virtuosity.', facts:[{l:'Reed',v:'Double reed'},{l:'Length',v:'~254 cm (folded tube)'},{l:'Range',v:'Bb1-Eb5'},{l:'Role',v:'Bass woodwind of orchestra'}], uiType:'wind', sfName:'bassoon', synth:'reed', windNote:48},
  {id:'clarinet',       name:'Clarinet',            native:'Klarinette',  family:'Wind',       region:'Germany',      era:'18th c.',  emoji:'🪈', tagline:'The chameleon of the orchestra -- from whisper to thunder.', desc:'Invented around 1700 by Johann Christoph Denner. The clarinet\'s cylindrical bore gives it a unique tone that can range from dark and foggy to bright and piercing. Central to classical music, jazz, and klezmer.', facts:[{l:'Invented',v:'~1700, Nuremberg'},{l:'Reed',v:'Single reed'},{l:'Bore',v:'Cylindrical'},{l:'Register',v:'Overblows at 12th'}], uiType:'wind', sfName:'clarinet', synth:'saxophone', windNote:69},
  {id:'duduk',          name:'Duduk',               native:'Դուդուկ',     family:'Wind',       region:'Armenia',      era:'Ancient',  emoji:'🪈', tagline:'The cry of the Armenian soul -- UNESCO heritage.', desc:'An ancient Armenian double-reed woodwind carved from apricot wood. UNESCO-listed Intangible Cultural Heritage.', facts:[{l:'Material',v:'Apricot wood'},{l:'Reed',v:'Double (wide)'},{l:'UNESCO',v:'Listed 2005'},{l:'Origin',v:'Armenia, 1200+ years'}], uiType:'wind', sfName:'oboe', synth:'reed', windNote:69},
  {id:'shehnai',        name:'Shehnai',             native:'शहनाई',       family:'Wind',       region:'India',        era:'Medieval', emoji:'🪈', tagline:'The auspicious cry of North Indian weddings and temples.', desc:'A North Indian double-reed oboe, traditionally played at temples, weddings, and royal ceremonies.', facts:[{l:'Reed',v:'Double (narrow)'},{l:'Body',v:'Wood or ivory'},{l:'Origin',v:'North India'},{l:'Context',v:'Temple & wedding music'}], uiType:'wind', sfName:'oboe', synth:'reed', windNote:71},
  {id:'zurna',          name:'Zurna',               native:'زورنا',       family:'Wind',       region:'Turkey',       era:'Ancient',  emoji:'🪈', tagline:'The Anatolian piercer -- the outdoor voice that commands armies.', desc:'A powerful double-reed aerophone played across Turkey, the Caucasus, and the Middle East. Its brilliant, penetrating tone is used for outdoor celebrations, processions, and folk dances. Always paired with the davul drum.', facts:[{l:'Reed',v:'Double, wide'},{l:'Volume',v:'Very loud (outdoor instrument)'},{l:'Partner',v:'Davul drum'},{l:'Origin',v:'Ancient Anatolia/Central Asia'}], uiType:'wind', sfName:'oboe', synth:'reed', windNote:72},
  {id:'suona',          name:'Suona',               native:'唢呐',         family:'Wind',       region:'China',        era:'3rd c.',   emoji:'🪈', tagline:'The Chinese oboe -- bold, ceremonial, and unmistakable.', desc:'A conical double-reed instrument with a metal bell, the suona is the loudest Chinese wind instrument. Used at weddings, funerals, and festivals. Its brilliant, brash tone dominates outdoor celebrations.', facts:[{l:'Reed',v:'Double, small'},{l:'Bell',v:'Metal'},{l:'Volume',v:'Very loud'},{l:'Origin',v:'3rd c., came via Silk Road'}], uiType:'wind', sfName:'oboe', synth:'reed', windNote:72},
  {id:'khaen',          name:'Khaen',               native:'ແຄນ',         family:'Wind',       region:'Laos',         era:'Ancient',  emoji:'🪈', tagline:'The bamboo mouth organ of Southeast Asia -- UNESCO heritage.', desc:'A polyphonic mouth organ made of bamboo pipes of different lengths, arranged in two rows. The national instrument of Laos. Each pipe has a metal free reed and a small hole; covering the hole produces a note. UNESCO-listed.', facts:[{l:'Pipes',v:'14-18 bamboo pipes'},{l:'Reeds',v:'Free metal reed per pipe'},{l:'UNESCO',v:'2017 Heritage'},{l:'Origin',v:'Ancient Laos/Northeast Thailand'}], uiType:'wind', sfName:'harmonica', synth:'harmonica', windNote:60},
  {id:'sho',            name:'Sho',                 native:'笙',           family:'Wind',       region:'Japan',        era:'8th c.',   emoji:'🪈', tagline:'The Japanese mouth organ -- a phoenix spreading its wings in sound.', desc:'A Japanese mouth organ of Chinese origin (sheng), with 17 bamboo pipes arranged in a circle, resembling the spread wings of a phoenix. Played in Japanese imperial court music (gagaku). Notes sound on both inhale and exhale.', facts:[{l:'Pipes',v:'17 bamboo'},{l:'Origin',v:'8th c. Japan (from Chinese sheng)'},{l:'Played in',v:'Gagaku (court music)'},{l:'Appearance',v:'Phoenix wing shape'}], uiType:'wind', sfName:'harmonica', synth:'harmonica', windNote:67},
  {id:'sheng',          name:'Sheng',               native:'笙',           family:'Wind',       region:'China',        era:'Ancient',  emoji:'🪈', tagline:'The ancient mouth organ -- three thousand years of Chinese harmony.', desc:'One of the oldest Chinese musical instruments, the sheng is a polyphonic mouth organ with 17-36 bamboo pipes, each with a free metal reed. It can play chords, making it unique among Chinese wind instruments.', facts:[{l:'Pipes',v:'17-36 bamboo'},{l:'Age',v:'3000+ years'},{l:'Unique feature',v:'Polyphonic (plays chords)'},{l:'Family',v:'Ancestor of accordion and harmonium'}], uiType:'wind', sfName:'harmonica', synth:'harmonica', windNote:60},
  {id:'harmonica',      name:'Harmonica',           native:'Mundharmonika',family:'Wind',       region:'Germany',      era:'19th c.',  emoji:'🎸', tagline:'The blues harp -- music in your pocket.', desc:'Invented in early 19th-century Germany. Central to American blues, country, and folk.', facts:[{l:'Invented',v:'~1821, Germany'},{l:'Reeds',v:'Free metal reeds'},{l:'Holes',v:'10 (diatonic)'},{l:'Keys',v:'Every major key'}], uiType:'wind', sfName:'harmonica', synth:'harmonica', windNote:60},
  {id:'bagpipes',       name:'Great Highland Bagpipe', native:'Piob Mhor', family:'Wind',      region:'Scotland',     era:'Medieval', emoji:'🪈', tagline:"The warrior's call -- drones that fill the Highland air.", desc:'A bag reservoir maintains airflow to a chanter and drone pipes, creating the characteristic continuous sound.', facts:[{l:'Drones',v:'2 tenor + 1 bass'},{l:'Scale',v:'9-note mixolydian'},{l:'Bag',v:'Sheepskin or synthetic'},{l:'Origin',v:'Scotland'}], uiType:'wind', sfName:'blown_bottle', synth:'bagpipe', windNote:67},
  {id:'gaita',          name:'Gaita',               native:'Gaita',       family:'Wind',       region:'Spain',        era:'Medieval', emoji:'🪈', tagline:'The Galician pipes -- the Celtic soul of Iberia.', desc:'The traditional bagpipe of Galicia in northwestern Spain and Asturias. Similar in concept to Scottish bagpipes but with a brighter, more nasal tone. Central to the Celtic heritage of the Iberian peninsula.', facts:[{l:'Origin',v:'Galicia & Asturias, Spain'},{l:'Drone',v:'1-3 drones'},{l:'Scale',v:'Mixolydian'},{l:'Cousin',v:'Scottish Highland Bagpipes'}], uiType:'wind', sfName:'blown_bottle', synth:'bagpipe', windNote:67},
  {id:'didgeridoo',     name:'Didgeridoo',          native:'Yidaki',      family:'Wind',       region:'Australia',    era:'1500+ yrs',emoji:'🪈', tagline:"Circular breath, ancient drone -- the world's oldest wind instrument.", desc:'An Australian Aboriginal wind instrument made from naturally hollowed eucalyptus trunks.', facts:[{l:'Material',v:'Hollowed eucalyptus'},{l:'Length',v:'1-3 metres'},{l:'Technique',v:'Circular breathing'},{l:'People',v:'Yolnu Aboriginal groups'}], uiType:'wind', sfName:'blown_bottle', synth:'didgeridoo', windNote:48},
  {id:'alphorn',        name:'Alphorn',             native:'Alpenhorn',   family:'Wind',       region:'Switzerland',  era:'16th c.',  emoji:'📯', tagline:'The call of the Alps -- wooden thunder across mountain valleys.', desc:'A natural horn made from spruce wood, up to 3.5 meters long, used by Alpine herders to communicate across mountain valleys. Its deep, resonant call has become a symbol of Swiss culture.', facts:[{l:'Material',v:'Spruce wood'},{l:'Length',v:'Up to 3.5 m'},{l:'Valves',v:'None (natural harmonics only)'},{l:'Use',v:'Herding communication, ceremonies'}], uiType:'wind', sfName:'tuba', synth:'brass', windNote:48},
  {id:'conch',          name:'Conch Shell',         native:'Shankha',     family:'Wind',       region:'Global',       era:'Ancient',  emoji:'🐚', tagline:'The oldest instrument on Earth -- the ocean in your hands.', desc:'A conch shell with a hole blown to create a resonant, mournful tone. Used ceremonially across India (shankha), Hawaii (pū), and Pacific cultures for thousands of years. One of the oldest known instruments.', facts:[{l:'Material',v:'Natural conch shell'},{l:'Technique',v:'Buzz lips into blowhole'},{l:'Use',v:'Ritual, religious, signalling'},{l:'Age',v:'18,000+ years (oldest known example)'}], uiType:'wind', sfName:'tuba', synth:'brass', windNote:42},

  /* ── PERCUSSION ── */
  {id:'drums',          name:'Drum Kit',            native:'',            family:'Percussion', region:'USA',          era:'20th c.',  emoji:'🥁', tagline:'The heartbeat of modern music -- all in one seat.', desc:'Emerged in New Orleans in the early 20th century. The rhythmic foundation of jazz, rock, and funk.', facts:[{l:'Components',v:'Kick, snare, toms, cymbals'},{l:'Emerged',v:'~1910, New Orleans'},{l:'Sticks',v:'Hickory or maple'},{l:'Pedal',v:'Bass drum foot pedal'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'djembe',         name:'Djembe',              native:'Djembe',      family:'Percussion', region:'West Africa',  era:'12th c.',  emoji:'🥁', tagline:'Bass, tone, slap -- the heartbeat of West Africa.', desc:'A rope-tuned goblet drum from West Africa. Its three distinct tones allow rich polyrhythms.', facts:[{l:'Origin',v:'Mali, Guinea'},{l:'Shell',v:'Lenke or Djalla wood'},{l:'Head',v:'Goat skin'},{l:'Tones',v:'Bass, Tone, Slap'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'tabla',          name:'Tabla',               native:'तबला',        family:'Percussion', region:'India',        era:'13th c.',  emoji:'🥁', tagline:'Two drums, infinite rhythms -- the soul of Hindustani music.', desc:'Two hand drums: dayan (treble) and bayan (bass). The primary rhythmic instrument of Hindustani classical music.', facts:[{l:'Drums',v:'Dayan + Bayan'},{l:'Tuning',v:'Syahi (black paste)'},{l:'Origin',v:'North India'},{l:'Tala',v:'Teentaal, Ektaal...'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'xylophone',      name:'Xylophone',           native:'',            family:'Percussion', region:'Africa',       era:'Ancient',  emoji:'🎼', tagline:'Wood and resonance -- the ancestor of all mallet instruments.', desc:'Originated in Africa and Southeast Asia. Wooden bars with metal resonators beneath.', facts:[{l:'Bars',v:'Wood (rosewood)'},{l:'Range',v:'3.5-4 octaves'},{l:'Resonators',v:'Metal tubes'},{l:'Mallets',v:'Yarn, rubber, or wood'}], uiType:'bars', sfName:'xylophone', synth:'xylophone', barOffset:0},
  {id:'marimba',        name:'Marimba',             native:'',            family:'Percussion', region:'Africa',       era:'16th c.',  emoji:'🪘', tagline:'Deep wooden warmth from the heart of Africa.', desc:"Evolved in Africa, brought to Central America. Guatemala's national instrument.", facts:[{l:'Origin',v:'Africa / Central America'},{l:'Bars',v:'Rosewood or synthetic'},{l:'Range',v:'4-5 octaves'},{l:'National',v:'Guatemala'}], uiType:'bars', sfName:'marimba', synth:'marimba', barOffset:-12},
  {id:'steelpan',       name:'Steel Pan',           native:'Steel Drum',  family:'Percussion', region:'Trinidad',     era:'20th c.',  emoji:'🪘', tagline:'The only acoustic instrument invented in the 20th century.', desc:'Emerged from Trinidad in the 1930s, fashioned from discarded oil drums.', facts:[{l:'Invented',v:'1930s, Trinidad'},{l:'Material',v:'Steel oil drum'},{l:'Notes',v:'Hammered sections'},{l:'Ensembles',v:'Steel bands'}], uiType:'bars', sfName:'steel_drums', synth:'steelpan', barOffset:0},
  {id:'mbira',          name:'Mbira',               native:'Mbira / Kalimba', family:'Percussion', region:'Zimbabwe', era:'Ancient',  emoji:'🪘', tagline:'The voice of the ancestors -- thumb piano of the Shona.', desc:'Sacred to the Shona people of Zimbabwe. Metal tines plucked with thumbs.', facts:[{l:'Tines',v:'22-28 metal keys'},{l:'Resonator',v:'Gourd (deze)'},{l:'People',v:'Shona of Zimbabwe'},{l:'Ceremony',v:'Bira spirit ceremonies'}], uiType:'bars', sfName:'kalimba', synth:'kalimba', barOffset:0},
  {id:'balafon',        name:'Balafon',             native:'',            family:'Percussion', region:'West Africa',  era:'13th c.',  emoji:'🎼', tagline:'The Mande xylophone -- resonant gourds beneath golden wood.', desc:'A gourd-resonated xylophone from West Africa, particularly associated with the Mande peoples of Guinea, Mali, and Burkina Faso. Legendary 13th-century Mali court musician Bala Faseke is associated with its invention. Calabash resonators beneath the wooden bars amplify each note.', facts:[{l:'Origin',v:'13th c. West Africa'},{l:'Resonators',v:'Calabash gourds'},{l:'Bars',v:'Rosewood or bamboo'},{l:'People',v:'Mande (Guinea, Mali, Burkina Faso)'}], uiType:'bars', sfName:'xylophone', synth:'xylophone', barOffset:0},
  {id:'gamelan',        name:'Gamelan Gong',        native:'Gamelan',     family:'Percussion', region:'Indonesia',    era:'Ancient',  emoji:'🪘', tagline:'Bronze resonance from the islands of Java and Bali.', desc:'Gamelan is the traditional ensemble music of Java and Bali, featuring bronze gongs and metallophones. Profoundly influenced Debussy.', facts:[{l:'Material',v:'Bronze'},{l:'Tuning',v:'Slendro or Pelog'},{l:'Origin',v:'Java & Bali, Indonesia'},{l:'Ensemble',v:'Up to 25 players'}], uiType:'bars', sfName:'tubular_bells', synth:'steelpan', barOffset:12},
  {id:'hang_drum',      name:'Hang Drum',           native:'Hang',        family:'Percussion', region:'Switzerland',  era:'21st c.',  emoji:'🪘', tagline:'The alien sound bowl -- the most sought-after instrument of the modern age.', desc:'Invented in 2000 in Bern, Switzerland by PANArt. A UFO-shaped steel instrument played with the hands. Its ethereal, resonant tone produced a global phenomenon. Fewer than 10,000 were ever made.', facts:[{l:'Invented',v:'2000, PANArt, Bern'},{l:'Material',v:'Hardened steel'},{l:'Shape',v:'UFO/lenticular'},{l:'Total made',v:'Less than 10,000'}], uiType:'bars', sfName:'steel_drums', synth:'steelpan', barOffset:0},
  {id:'kendang',        name:'Kendang',             native:'Kendhang',    family:'Percussion', region:'Indonesia',    era:'Ancient',  emoji:'🥁', tagline:'The master drummer of Javanese gamelan -- two-headed interlocking rhythm.', desc:'A two-headed drum central to Javanese and Balinese gamelan orchestras. The kendang player is the rhythmic leader of the gamelan, signalling tempo changes and transitions. Played with both hands.', facts:[{l:'Heads',v:'Two (different sizes)'},{l:'Role',v:'Rhythmic leader of gamelan'},{l:'Origin',v:'Java & Bali, Indonesia'},{l:'Play style',v:'Hands only'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'taiko',          name:'Taiko Drum',          native:'太鼓',         family:'Percussion', region:'Japan',        era:'6th c.',   emoji:'🥁', tagline:'Thunder from Japan -- massive drums that shake the earth.', desc:'A family of Japanese drums ranging from small to enormous. Taiko drumming (kumi-daiko) developed into a powerful performance art in the 20th century. The drums produce deep, thunderous sounds used in festivals, Noh theatre, and military applications.', facts:[{l:'Origin',v:'Japan, 6th c. (from China/Korea)'},{l:'Largest',v:'O-daiko (up to 2m diameter)'},{l:'Use',v:'Festivals, theatre, military, ceremonial'},{l:'Modern',v:'Kumi-daiko ensemble performance'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'dhol',           name:'Dhol',                native:'ढोल',         family:'Percussion', region:'South Asia',   era:'15th c.',  emoji:'🥁', tagline:'The Punjabi heartbeat -- the drum that started Bhangra.', desc:'A double-sided barrel drum used extensively across South Asia. The soul of Punjabi Bhangra music and central to numerous folk traditions from India to Pakistan to Bangladesh. Played with two different sticks.', facts:[{l:'Heads',v:'Two (different skins)'},{l:'Sticks',v:'Thick dagga + thin tilli'},{l:'Origin',v:'Punjab, 15th c.'},{l:'Music',v:'Bhangra, folk music across South Asia'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'darbuka',        name:'Darbuka',             native:'دربوكة',      family:'Percussion', region:'Middle East',  era:'Ancient',  emoji:'🥁', tagline:'The goblet drum of the Arab world -- intricate and intimate.', desc:'A single-headed goblet-shaped drum used across the Middle East and North Africa. Also called doumbek or tombak (Persian version). Produces a distinctive bass "doum" and sharp "tak" and "ka" sounds through fingertip technique.', facts:[{l:'Shape',v:'Goblet'},{l:'Material',v:'Clay, metal, or wood'},{l:'Sounds',v:'Doum, Tak, Ka'},{l:'Origin',v:'Ancient Mesopotamia'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'cajon',          name:'Cajón',               native:'',            family:'Percussion', region:'Peru',         era:'18th c.',  emoji:'🥁', tagline:'The box that became a drum -- Afro-Peruvian soul.', desc:'A box-shaped percussion instrument originating among Afro-Peruvian slaves who used wooden shipping crates. The player sits on the box and slaps the front face. Adopted into flamenco, Cuban, and world music.', facts:[{l:'Origin',v:'18th c. Peru (Afro-Peruvian)'},{l:'Material',v:'Wooden box'},{l:'Technique',v:'Player sits on box'},{l:'Adopted into',v:'Flamenco, Cuban, World music'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'conga',          name:'Conga',               native:'Conga/Tumbadora', family:'Percussion', region:'Cuba',     era:'19th c.',  emoji:'🥁', tagline:'The Afro-Cuban pulse -- the drum that drives salsa.', desc:'A tall, narrow, single-headed drum of Afro-Cuban origin. Usually played in pairs or trios (quinto, conga, tumba). Central to Cuban son, salsa, Afro-Cuban jazz, and popular music worldwide.', facts:[{l:'Origin',v:'19th c. Cuba'},{l:'Sizes',v:'Quinto, Conga, Tumba'},{l:'Technique',v:'Open tones, slaps, bass tones'},{l:'Genres',v:'Salsa, Son, Afro-Cuban jazz'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'bongo',          name:'Bongo Drums',         native:'Bongos',      family:'Percussion', region:'Cuba',         era:'19th c.',  emoji:'🥁', tagline:'The quick hands of Cuba -- small but mighty.', desc:'A pair of small open-bottomed drums played between the knees or mounted on a stand. Originally from Cuba, bongos produce a bright, high-pitched tone and are essential in Latin music from son to bossa nova.', facts:[{l:'Origin',v:'Late 19th c. Cuba'},{l:'Drums',v:'Macho (small) + Hembra (large)'},{l:'Technique',v:'Finger and palm technique'},{l:'Genres',v:'Son, salsa, bossa nova, jazz'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'timpani',        name:'Timpani',             native:'Pauken',      family:'Percussion', region:'Europe',       era:'Medieval', emoji:'🥁', tagline:'The thunder of the orchestra -- kettledrums of kings.', desc:'Large copper kettle drums tuned by pedals or tension screws. A set of 4-5 timpani spanning different pitches can play melodies. Used in orchestras since the 17th century and in royal ceremonial fanfares.', facts:[{l:'Material',v:'Copper/fibreglass shell, calfskin/plastic head'},{l:'Tuning',v:'Pedal mechanism'},{l:'Sets',v:'4-5 drums of different sizes'},{l:'Range',v:'D2-A3 (combined)'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'frame_drum',     name:'Frame Drum',          native:'Riq / Bendir', family:'Percussion', region:'Global',      era:'Ancient',  emoji:'🥁', tagline:'The oldest drum known to humanity -- shamans and sufi whirled to this beat.', desc:'The frame drum, a broad category including the riq (Arab), bendir (North African), bodhran (Irish), and tar (Persian), is one of the oldest instruments known, depicted in ancient Sumerian art. A shallow, wide frame with a skin stretched across it.', facts:[{l:'Age',v:'5000+ years (depicted in Sumerian art)'},{l:'Variants',v:'Riq, Bendir, Bodhran, Tar, Pandeiro'},{l:'Material',v:'Wood frame, animal skin'},{l:'Use',v:'Ritual, folk, classical worldwide'}], uiType:'drums', sfName:null, synth:'drums'},
  {id:'udu',            name:'Udu',                 native:'',            family:'Percussion', region:'Nigeria',      era:'Ancient',  emoji:'🥁', tagline:'The water pot that sings -- Nigerian clay percussion.', desc:'A clay pot with a hole in its side, used as a percussion instrument by Igbo women in Nigeria in sacred ceremonies. When struck with the hand, the air chamber resonates. Occasionally fills with water to alter its tone.', facts:[{l:'Material',v:'Clay pot'},{l:'Origin',v:'Igbo people, Nigeria'},{l:'Use',v:'Sacred women\'s ceremonies'},{l:'Sound source',v:'Air column in chamber'}], uiType:'drums', sfName:null, synth:'drums'},

  /* ── FOLK / WORLD ── */
  {id:'accordion_folk', name:'Button Accordion',   native:'Melodeon',    family:'Folk',       region:'Europe',       era:'19th c.',  emoji:'🪗', tagline:'The button box -- the instrument of Irish sessions and French bal folk.', desc:'A diatonic button accordion where each button produces two notes depending on whether the bellows is pushed or pulled. Beloved in Irish traditional music, French musette, and Quebecois folk.', facts:[{l:'Buttons',v:'Diatonic layout'},{l:'Bisonoric',v:'Push/pull = different notes'},{l:'Genres',v:'Irish trad, French musette, Quebecois'},{l:'Size',v:'Smaller than piano accordion'}], uiType:'piano', sfName:'accordion', synth:'accordion'},
  {id:'bouzouki',       name:'Bouzouki',            native:'Μπουζούκι',   family:'Folk',       region:'Greece',       era:'20th c.',  emoji:'🪕', tagline:'The soul of Greece -- rebetika on the waterfront of Athens.', desc:'A long-necked plucked lute originating in Greece, central to rebetika music (Greek blues). The Irish bouzouki, a flat-backed variant, became central to Celtic music in the 1960s.', facts:[{l:'Strings',v:'3-4 courses'},{l:'Origin',v:'Greece, early 20th c.'},{l:'Music',v:'Rebetika (Greek blues)'},{l:'Irish variant',v:'Flat-backed, central to Celtic music'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'plucked', stringLabels:['D2','A2','D3','A3'], showFrets:true},
  {id:'mandolin',       name:'Mandolin',            native:'Mandolino',   family:'Folk',       region:'Italy',        era:'18th c.',  emoji:'🪕', tagline:'Eight strings of Italian sunshine -- from Naples to Appalachia.', desc:'A small plucked string instrument with 4 double courses (8 strings) tuned in 5ths. Originated in Italy and became central to Neapolitan music, American bluegrass, and classical music by Vivaldi and Beethoven.', facts:[{l:'Strings',v:'8 (4 double courses)'},{l:'Tuning',v:'G D A E (like violin)'},{l:'Origin',v:'18th c. Naples, Italy'},{l:'Genres',v:'Bluegrass, Neapolitan, Classical'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'banjo', stringLabels:['G3','D4','A4','E5'], showFrets:true},
  {id:'hurdy_gurdy',    name:'Hurdy-Gurdy',         native:'Vielle a roue', family:'Folk',     region:'Europe',       era:'10th c.',  emoji:'🎵', tagline:'The wheel-bowed fiddle -- drones, melody, and a crank that never stops.', desc:'A mechanical string instrument where a rosined wooden wheel rotates to vibrate strings. The player cranks the wheel with one hand while pressing keys with the other. Drone strings provide a constant bagpipe-like accompaniment.', facts:[{l:'Mechanism',v:'Rotating rosined wheel'},{l:'Drone strings',v:'2-4 constant drones'},{l:'Origin',v:'10th c. Europe'},{l:'Players',v:'Medieval troubadours, French folk'}], uiType:'strings', sfName:'violin', synth:'bowed', stringLabels:['C3','G3'], showFrets:false},
  {id:'dulcimer_hammered', name:'Hammered Dulcimer', native:'',           family:'Folk',       region:'Global',       era:'Medieval', emoji:'🎵', tagline:'Struck strings stretched across a trapezoidal soundboard.', desc:'A trapezoidal string instrument played by striking strings with small hammers. Found worldwide under different names (santoor, cimbalom, hackbrett). Related to the zither and a direct ancestor of the piano.', facts:[{l:'Strings',v:'90-150 (multiple courses)'},{l:'Hammers',v:'Light wooden mallets'},{l:'Cousin',v:'Santoor, Cimbalom, Hackbrett'},{l:'Ancestor of',v:'Piano mechanism'}], uiType:'strings', sfName:'koto', synth:'steelpan', stringLabels:['C2','D2','E2','G2','A2','C3','D3'], showFrets:false},
  {id:'cimbalom',       name:'Cimbalom',            native:'Cimbalom',    family:'Folk',       region:'Hungary',      era:'19th c.',  emoji:'🎵', tagline:'The Hungarian concert dulcimer -- Liszt\'s exotic favourite.', desc:'A large concert hammered dulcimer from Hungary, used in Romani music and Hungarian folk music. Liszt and Kodaly both incorporated it into classical compositions. Features a damper pedal like a piano.', facts:[{l:'Origin',v:'Hungary / Eastern Europe'},{l:'Pedal',v:'Damper pedal (like piano)'},{l:'Strings',v:'125 strings'},{l:'Used by',v:'Liszt, Kodaly, Romani musicians'}], uiType:'strings', sfName:'koto', synth:'steelpan', stringLabels:['C2','D2','F2','G2','A2','C3','D3'], showFrets:false},
  {id:'didley_bow',     name:'Diddley Bow',         native:'',            family:'Folk',       region:'USA',          era:'19th c.',  emoji:'🎸', tagline:'One string, a bottle, and the blues -- the roots of American music.', desc:'A single-string instrument made by stretching a wire between two nails on a board, played by sliding a bottle or rock along the string. The most primitive American guitar, played by Delta blues musicians and a precursor to the slide guitar.', facts:[{l:'Strings',v:'1'},{l:'Material',v:'Wire on board, bottle slide'},{l:'Origin',v:'African-American Delta blues tradition'},{l:'Precursor to',v:'Slide guitar, electric guitar'}], uiType:'strings', sfName:'acoustic_guitar_nylon', synth:'guitar', stringLabels:['E2'], showFrets:false},
  {id:'vuvuzela',       name:'Vuvuzela',            native:'',            family:'Folk',       region:'South Africa', era:'20th c.',  emoji:'📯', tagline:'The plastic horn of the World Cup -- love it or hate it.', desc:'A long plastic horn from South Africa producing a loud, monotone buzz at around B-flat. Used at football matches, it became globally famous during the 2010 FIFA World Cup in South Africa.', facts:[{l:'Origin',v:'South Africa'},{l:'Note',v:'B-flat (approximately)'},{l:'Volume',v:'~127 dB (very loud)'},{l:'Famous at',v:'2010 FIFA World Cup'}], uiType:'wind', sfName:'tuba', synth:'brass', windNote:58},
  {id:'mbira_dzavadzimu', name:'Mbira Dzavadzimu',  native:'',            family:'Folk',       region:'Zimbabwe',     era:'Ancient',  emoji:'🪘', tagline:'Voice of the ancestors -- Zimbabwe\'s sacred spiritual keyboard.', desc:'The sacred mbira of the Shona people used in Bira ceremonies to call ancestors. Different tuning and number of tines from the commercial kalimba. UNESCO-listed. Traditionally played inside a gourd resonator.', facts:[{l:'Tines',v:'22-28'},{l:'Tuning',v:'Unique Shona modal tuning'},{l:'UNESCO',v:'2020 Heritage'},{l:'Ceremony',v:'Bira (spirit possession)'}], uiType:'bars', sfName:'kalimba', synth:'kalimba', barOffset:0},
  {id:'jaw_harp',       name:'Jaw Harp',            native:'Vargan / Morsing', family:'Folk',  region:'Global',       era:'Ancient',  emoji:'🎵', tagline:'The universal hum -- a tiny instrument found in every culture on Earth.', desc:'One of the most widely distributed instruments in the world, found in forms across Europe, Asia, and the Americas. A thin metal or bamboo tongue vibrates between a frame held against the teeth, with the mouth acting as a resonating cavity.', facts:[{l:'Material',v:'Metal or bamboo'},{l:'Resonator',v:'Mouth cavity'},{l:'Distribution',v:'Found on every inhabited continent'},{l:'Age',v:'Ancient (exact origin unknown)'}], uiType:'bars', sfName:'kalimba', synth:'kalimba', barOffset:12},
  {id:'theremin',       name:'Theremin',            native:'Терменвокс',  family:'Electronic', region:'Russia',       era:'20th c.',  emoji:'🎛️', tagline:'The instrument you play without touching -- electronic magic.', desc:'Invented by Russian physicist Leon Theremin in 1920. The only instrument played without physical contact: the player moves their hands near two antennae to control pitch and volume. Eerie and expressive.', facts:[{l:'Invented',v:'1920, Leon Theremin, Russia'},{l:'Control',v:'Hands move near antennae'},{l:'Physical contact',v:'None'},{l:'Sound',v:'Eerie, vocal-like sine tone'}], uiType:'wind', sfName:'lead_1_square', synth:'flute', windNote:72},
  {id:'electric_guitar', name:'Electric Guitar',   native:'',            family:'Electronic', region:'USA',          era:'20th c.',  emoji:'🎸', tagline:'The instrument that changed everything -- the voice of the 20th century.', desc:'Developed in the 1930s by inventors including Adolph Rickenbacker and later Leo Fender. Its electromagnetic pickup converts string vibrations to electrical signals. The defining instrument of rock, blues, jazz, and country.', facts:[{l:'Pickup',v:'Electromagnetic (humbucker/single coil)'},{l:'Developed',v:'1930s USA'},{l:'Pioneers',v:'Rickenbacker, Gibson, Fender'},{l:'Genres',v:'Rock, blues, jazz, country'}], uiType:'strings', sfName:'electric_guitar_clean', synth:'guitar', stringLabels:['E2','A2','D3','G3','B3','e4'], showFrets:true},
  {id:'bass_guitar',    name:'Bass Guitar',        native:'',            family:'Electronic', region:'USA',          era:'20th c.',  emoji:'🎸', tagline:'The groove beneath everything -- four strings of foundation.', desc:'Invented by Leo Fender in 1951 as a portable alternative to the upright double bass. Its four strings provide the low-end foundation of virtually all popular music genres.', facts:[{l:'Invented',v:'1951, Leo Fender'},{l:'Strings',v:'4 (E A D G)'},{l:'Tuning',v:'Same as double bass'},{l:'Role',v:'Rhythmic and harmonic foundation'}], uiType:'strings', sfName:'electric_bass_finger', synth:'guitar', stringLabels:['E1','A1','D2','G2'], showFrets:true}
];

/* ══ AUDIO ENGINE ══
   Priority: soundfont-player real samples → synthesis fallback */
var AE = {
  ctx: null, gain: null, vol: 0.85,
  sfInst: {},   // sfName -> resolved instrument
  activeGains: {},  // midi -> {env, oscs} for fadeOut
  sfProm: {},   // sfName -> promise
  windNode: null,

  init: function() {
    if(this.ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    this.gain = this.ctx.createGain();
    this.gain.gain.value = this.vol * 2.8;
    this.gain.connect(this.ctx.destination);
  },

  resume: function() { if(this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  setVol: function(v) { this.vol = v; if(this.gain) this.gain.gain.value = v * 2.8; },
  hz: function(m) { return 440 * Math.pow(2, (m-69)/12); },

  /* Load soundfont -- non-blocking, progressive enhancement */
  loadSF: function(sfName, onDone) {
    if(!sfName || this.sfProm[sfName]) { if(onDone) onDone(this.sfInst[sfName]||null); return; }
    if(!window.Soundfont || !window._SF) { if(onDone) onDone(null); return; }
    this.init();
    var self = this;
    this.sfProm[sfName] = window.Soundfont.instrument(this.ctx, sfName, {
      soundfont: 'MusyngKite',
      nameToUrl: function(name, sf, fmt) {
        return 'https://gleitz.github.io/midi-js-soundfonts/MusyngKite/' + name + '-' + (fmt||'mp3') + '.js';
      },
      gain: 3.5
    }).then(function(inst) {
      self.sfInst[sfName] = inst;
      if(onDone) onDone(inst);
      return inst;
    }).catch(function() {
      self.sfInst[sfName] = null;
      if(onDone) onDone(null);
    });
  },

  /* Play via soundfont if available, else synthesize */
  play: function(sfName, synth, midi, dur) {
    this.init(); this.resume();
    dur = dur || 2;
    var inst = sfName ? this.sfInst[sfName] : null;
    if(inst) {
      try { inst.play(midi, this.ctx.currentTime, {duration: dur, gain: this.vol * 3.5}); return; }
      catch(e) {}
    }
    // Synthesis fallback — route through tracked envelope
    this[synth] ? this[synth](midi, dur) : this.piano(midi, dur);
  },

  /* Triggered on key-up: applies a smooth 300ms release so note fades
     naturally instead of cutting off abruptly */
  fadeOut: function(midi) {
    var entry = this.activeGains[midi];
    if(!entry || !entry.env) return;
    var env = entry.env, c = this.ctx, now = c.currentTime;
    try {
      env.gain.cancelScheduledValues(now);
      env.gain.setValueAtTime(env.gain.value, now);
      env.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    } catch(e) {}
    delete this.activeGains[midi];
  },

  /* ── Synthesis engines ── */

  piano: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2.5;
    var car=c.createOscillator(), mod=c.createOscillator(), mG=c.createGain();
    var ot=c.createOscillator(), otG=c.createGain(), env=c.createGain();
    car.type='sine'; car.frequency.value=f;
    mod.frequency.value=f*2; mG.gain.setValueAtTime(f*4,t); mG.gain.exponentialRampToValueAtTime(f*.08,t+.3);
    ot.type='sine'; ot.frequency.value=f*2;
    otG.gain.setValueAtTime(.15,t); otG.gain.exponentialRampToValueAtTime(.001,t+d*.5);
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.9,t+.006);
    env.gain.exponentialRampToValueAtTime(.5,t+.1); env.gain.exponentialRampToValueAtTime(.001,t+d);
    mod.connect(mG); mG.connect(car.frequency); ot.connect(otG);
    car.connect(env); otG.connect(env); env.connect(this.gain);
    car.start(t); mod.start(t); ot.start(t); car.stop(t+d); mod.stop(t+d); ot.stop(t+d);
    this.activeGains[m] = {env: env};
  },

  harpsichord: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=Math.min(d||1.5,1.8);
    var o1=c.createOscillator(), o2=c.createOscillator(), hp=c.createBiquadFilter(), env=c.createGain();
    o1.type='sawtooth'; o1.frequency.value=f; o2.type='square'; o2.frequency.value=f*2;
    hp.type='highpass'; hp.frequency.value=200;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.7,t+.003); env.gain.exponentialRampToValueAtTime(.001,t+d);
    var g1=c.createGain(), g2=c.createGain(); g1.gain.value=.45; g2.gain.value=.18;
    o1.connect(g1); o2.connect(g2); g1.connect(hp); g2.connect(hp); hp.connect(env); env.connect(this.gain);
    o1.start(t); o2.start(t); o1.stop(t+d); o2.stop(t+d);
  },

  organ: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var env=c.createGain();
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.8,t+.01);
    env.gain.setValueAtTime(.8,t+d-.02); env.gain.linearRampToValueAtTime(0,t+d);
    [1,2,3,4,6,8].forEach(function(r,i) {
      var o=c.createOscillator(), g=c.createGain();
      o.type='sine'; o.frequency.value=f*r; g.gain.value=[.3,.25,.2,.15,.07,.04][i];
      o.connect(g); g.connect(env); o.start(t); o.stop(t+d);
    });
    env.connect(this.gain);
  },

  accordion: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var flt=c.createBiquadFilter(), env=c.createGain();
    flt.type='bandpass'; flt.frequency.value=f*2; flt.Q.value=.7;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.7,t+.04);
    env.gain.setValueAtTime(.65,t+d-.08); env.gain.linearRampToValueAtTime(0,t+d);
    [-8,-3,0,3,8].forEach(function(dt) {
      var o=c.createOscillator(), g=c.createGain();
      o.type='sawtooth'; o.frequency.value=f; o.detune.value=dt; g.gain.value=.18;
      o.connect(g); g.connect(flt); o.start(t); o.stop(t+d);
    });
    flt.connect(env); env.connect(this.gain);
  },

  guitar: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||3;
    var N=Math.round(c.sampleRate/f), buf=c.createBuffer(1,N+1,c.sampleRate);
    var data=buf.getChannelData(0); for(var i=0;i<N+1;i++) data[i]=Math.random()*2-1;
    var src=c.createBufferSource(), delay=c.createDelay(), lpf=c.createBiquadFilter(), fdbk=c.createGain(), env=c.createGain();
    src.buffer=buf; delay.delayTime.value=1/f; lpf.type='lowpass'; lpf.frequency.value=f*4; fdbk.gain.value=.985;
    env.gain.setValueAtTime(1,t); env.gain.exponentialRampToValueAtTime(.001,t+d);
    src.connect(delay); delay.connect(lpf); lpf.connect(fdbk); fdbk.connect(delay); delay.connect(env); env.connect(this.gain);
    src.start(t); src.stop(t+.05);
  },

  sitar: function(m, d) {
    this.guitar(m, d);
    var c=this.ctx, f=this.hz(m), t=c.currentTime;
    var bz=c.createOscillator(), bp=c.createBiquadFilter(), bzG=c.createGain();
    bz.type='sawtooth'; bz.frequency.value=f*1.001;
    bp.type='bandpass'; bp.frequency.value=f*3; bp.Q.value=15;
    bzG.gain.setValueAtTime(0,t); bzG.gain.linearRampToValueAtTime(.12,t+.02); bzG.gain.exponentialRampToValueAtTime(.001,t+(d||3)*.7);
    bz.connect(bp); bp.connect(bzG); bzG.connect(this.gain); bz.start(t); bz.stop(t+(d||3)*.7);
  },

  bowed: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2.5;
    var osc=c.createOscillator(), lfo=c.createOscillator(), lG=c.createGain();
    var bp=c.createBiquadFilter(), hp=c.createBiquadFilter(), env=c.createGain();
    osc.type='sawtooth'; osc.frequency.value=f; lfo.frequency.value=5.5; lG.gain.value=f*.012;
    bp.type='peaking'; bp.frequency.value=f*2; bp.gain.value=6; bp.Q.value=2;
    hp.type='highpass'; hp.frequency.value=80;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.6,t+.07);
    env.gain.setValueAtTime(.55,t+d-.1); env.gain.linearRampToValueAtTime(0,t+d);
    lfo.connect(lG); lG.connect(osc.frequency); osc.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.gain);
    osc.start(t); lfo.start(t); osc.stop(t+d); lfo.stop(t+d);
  },

  plucked: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||4;
    var N=Math.round(c.sampleRate/f), buf=c.createBuffer(1,N+1,c.sampleRate);
    var data=buf.getChannelData(0); for(var i=0;i<N+1;i++) data[i]=Math.random()*2-1;
    var src=c.createBufferSource(), delay=c.createDelay(), lpf=c.createBiquadFilter(), fdbk=c.createGain(), env=c.createGain();
    src.buffer=buf; delay.delayTime.value=1/f; lpf.type='lowpass'; lpf.frequency.value=f*6; fdbk.gain.value=.996;
    env.gain.setValueAtTime(1.2,t); env.gain.exponentialRampToValueAtTime(.001,t+d);
    src.connect(delay); delay.connect(lpf); lpf.connect(fdbk); fdbk.connect(delay); delay.connect(env); env.connect(this.gain);
    src.start(t); src.stop(t+.05);
  },

  banjo: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||1.8;
    var N=Math.round(c.sampleRate/f), buf=c.createBuffer(1,N+1,c.sampleRate);
    var data=buf.getChannelData(0); for(var i=0;i<N+1;i++) data[i]=Math.random()*2-1;
    var src=c.createBufferSource(), delay=c.createDelay(), lpf=c.createBiquadFilter(), fdbk=c.createGain(), bp=c.createBiquadFilter(), env=c.createGain();
    src.buffer=buf; delay.delayTime.value=1/f; lpf.type='lowpass'; lpf.frequency.value=f*8; fdbk.gain.value=.97;
    bp.type='peaking'; bp.frequency.value=800; bp.gain.value=8; bp.Q.value=1;
    env.gain.setValueAtTime(1.3,t); env.gain.exponentialRampToValueAtTime(.001,t+d);
    src.connect(delay); delay.connect(lpf); lpf.connect(fdbk); fdbk.connect(delay); delay.connect(bp); bp.connect(env); env.connect(this.gain);
    src.start(t); src.stop(t+.04);
  },

  flute: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var osc=c.createOscillator(), o2=c.createOscillator(), g2=c.createGain();
    var lfo=c.createOscillator(), lG=c.createGain(), env=c.createGain();
    var nbLen=Math.ceil(c.sampleRate*d), nb=c.createBuffer(1,nbLen,c.sampleRate);
    var nd=nb.getChannelData(0); for(var i=0;i<nbLen;i++) nd[i]=Math.random()*2-1;
    var ns=c.createBufferSource(), nbp=c.createBiquadFilter(), nG=c.createGain();
    osc.type='sine'; osc.frequency.value=f; o2.type='sine'; o2.frequency.value=f*2; g2.gain.value=.08;
    lfo.frequency.value=5; lG.gain.value=f*.008;
    ns.buffer=nb; nbp.type='bandpass'; nbp.frequency.value=f*1.5; nbp.Q.value=8; nG.gain.value=.06;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.7,t+.06);
    env.gain.setValueAtTime(.65,t+d-.1); env.gain.linearRampToValueAtTime(0,t+d);
    lfo.connect(lG); lG.connect(osc.frequency); ns.connect(nbp); nbp.connect(nG);
    osc.connect(env); o2.connect(g2); g2.connect(env); nG.connect(env); env.connect(this.gain);
    osc.start(t); o2.start(t); lfo.start(t); ns.start(t);
    osc.stop(t+d); o2.stop(t+d); lfo.stop(t+d);
  },

  brass: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||1.5;
    var osc=c.createOscillator(), bp1=c.createBiquadFilter(), bp2=c.createBiquadFilter(), mix=c.createGain(), env=c.createGain();
    osc.type='sawtooth'; osc.frequency.value=f;
    bp1.type='bandpass'; bp1.frequency.value=1200; bp1.Q.value=1.5;
    bp2.type='bandpass'; bp2.frequency.value=2400; bp2.Q.value=2; mix.gain.value=.5;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.9,t+.04);
    env.gain.setValueAtTime(.75,t+d-.08); env.gain.linearRampToValueAtTime(0,t+d);
    osc.connect(bp1); osc.connect(bp2); bp1.connect(mix); bp2.connect(mix); mix.connect(env); env.connect(this.gain);
    osc.start(t); osc.stop(t+d);
  },

  saxophone: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var osc=c.createOscillator(), sub=c.createOscillator(), subG=c.createGain();
    var f1=c.createBiquadFilter(), f2=c.createBiquadFilter(), mix=c.createGain(), env=c.createGain();
    osc.type='sawtooth'; osc.frequency.value=f; sub.type='sine'; sub.frequency.value=f*.5; subG.gain.value=.15;
    f1.type='bandpass'; f1.frequency.value=800; f1.Q.value=2;
    f2.type='bandpass'; f2.frequency.value=1800; f2.Q.value=3; mix.gain.value=.45;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.85,t+.05);
    env.gain.setValueAtTime(.7,t+d-.1); env.gain.linearRampToValueAtTime(0,t+d);
    osc.connect(f1); osc.connect(f2); f1.connect(mix); f2.connect(mix);
    sub.connect(subG); subG.connect(mix); mix.connect(env); env.connect(this.gain);
    osc.start(t); sub.start(t); osc.stop(t+d); sub.stop(t+d);
  },

  reed: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var osc=c.createOscillator(), lfo=c.createOscillator(), lG=c.createGain();
    var lp=c.createBiquadFilter(), bp=c.createBiquadFilter(), mix=c.createGain(), env=c.createGain();
    osc.type='sawtooth'; osc.frequency.value=f; lfo.frequency.value=4.5; lG.gain.value=f*.018;
    lp.type='lowpass'; lp.frequency.value=f*3.5; lp.Q.value=1.5;
    bp.type='bandpass'; bp.frequency.value=f*1.8; bp.Q.value=2; mix.gain.value=.5;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.75,t+.06);
    env.gain.setValueAtTime(.68,t+d-.12); env.gain.linearRampToValueAtTime(0,t+d);
    lfo.connect(lG); lG.connect(osc.frequency); osc.connect(lp); osc.connect(bp);
    lp.connect(mix); bp.connect(mix); mix.connect(env); env.connect(this.gain);
    osc.start(t); lfo.start(t); osc.stop(t+d); lfo.stop(t+d);
  },

  harmonica: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var bp=c.createBiquadFilter(), env=c.createGain();
    bp.type='bandpass'; bp.frequency.value=f*2; bp.Q.value=1.2;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.6,t+.03);
    env.gain.setValueAtTime(.55,t+d-.1); env.gain.linearRampToValueAtTime(0,t+d);
    [-5,0,5].forEach(function(dt) {
      var o=c.createOscillator(), g=c.createGain();
      o.type='sawtooth'; o.frequency.value=f; o.detune.value=dt; g.gain.value=.28;
      o.connect(g); g.connect(bp); o.start(t); o.stop(t+d);
    });
    bp.connect(env); env.connect(this.gain);
  },

  bagpipe: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||3;
    var ch=c.createOscillator(), chF=c.createBiquadFilter(), chG=c.createGain();
    var dr=c.createOscillator(), dr2=c.createOscillator(), drG=c.createGain(), env=c.createGain();
    ch.type='sawtooth'; ch.frequency.value=f; chF.type='bandpass'; chF.frequency.value=1600; chF.Q.value=1.5;
    dr.type='sawtooth'; dr.frequency.value=110; dr2.type='sawtooth'; dr2.frequency.value=220;
    drG.gain.value=.15; chG.gain.value=.4;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.7,t+.08);
    env.gain.setValueAtTime(.65,t+d-.1); env.gain.linearRampToValueAtTime(0,t+d);
    ch.connect(chF); chF.connect(chG); chG.connect(env);
    dr.connect(drG); dr2.connect(drG); drG.connect(env); env.connect(this.gain);
    ch.start(t); dr.start(t); dr2.start(t); ch.stop(t+d); dr.stop(t+d); dr2.stop(t+d);
  },

  didgeridoo: function(m, d) {
    var c=this.ctx, t=c.currentTime; d=d||3;
    var osc=c.createOscillator(), am=c.createOscillator(), amG=c.createGain();
    var lp=c.createBiquadFilter(), env=c.createGain();
    osc.type='sawtooth'; osc.frequency.value=58; am.frequency.value=3.5; amG.gain.value=.15;
    lp.type='lowpass'; lp.frequency.value=400;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.9,t+.15);
    env.gain.setValueAtTime(.85,t+d-.2); env.gain.linearRampToValueAtTime(0,t+d);
    am.connect(amG); amG.connect(osc.frequency); osc.connect(lp); lp.connect(env); env.connect(this.gain);
    osc.start(t); am.start(t); osc.stop(t+d); am.stop(t+d);
  },

  xylophone: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||1.2;
    var car=c.createOscillator(), mod=c.createOscillator(), mG=c.createGain();
    var ot=c.createOscillator(), otG=c.createGain(), env=c.createGain();
    car.type='sine'; car.frequency.value=f; mod.frequency.value=f*3.5;
    mG.gain.setValueAtTime(f*6,t); mG.gain.exponentialRampToValueAtTime(.001,t+.12);
    ot.type='sine'; ot.frequency.value=f*2.76;
    otG.gain.setValueAtTime(.3,t); otG.gain.exponentialRampToValueAtTime(.001,t+d*.4);
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(1,t+.003); env.gain.exponentialRampToValueAtTime(.001,t+d);
    mod.connect(mG); mG.connect(car.frequency); ot.connect(otG);
    car.connect(env); otG.connect(env); env.connect(this.gain);
    car.start(t); mod.start(t); ot.start(t); car.stop(t+d); mod.stop(t+d); ot.stop(t+d);
  },

  marimba: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var car=c.createOscillator(), mod=c.createOscillator(), mG=c.createGain();
    var ot=c.createOscillator(), otG=c.createGain(), lp=c.createBiquadFilter(), env=c.createGain();
    car.type='sine'; car.frequency.value=f; mod.frequency.value=f*2;
    mG.gain.setValueAtTime(f*2,t); mG.gain.exponentialRampToValueAtTime(.001,t+.25);
    ot.type='sine'; ot.frequency.value=f*2;
    otG.gain.setValueAtTime(.25,t); otG.gain.exponentialRampToValueAtTime(.001,t+d*.6);
    lp.type='lowpass'; lp.frequency.value=f*5;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.9,t+.005); env.gain.exponentialRampToValueAtTime(.001,t+d);
    mod.connect(mG); mG.connect(car.frequency); ot.connect(otG);
    car.connect(lp); lp.connect(env); otG.connect(env); env.connect(this.gain);
    car.start(t); mod.start(t); ot.start(t); car.stop(t+d); mod.stop(t+d); ot.stop(t+d);
  },

  steelpan: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||1.8;
    var car=c.createOscillator(), h2=c.createOscillator(), h3=c.createOscillator();
    var gH2=c.createGain(), gH3=c.createGain(), env=c.createGain();
    car.type='sine'; car.frequency.value=f; h2.type='sine'; h2.frequency.value=f*2; h3.type='sine'; h3.frequency.value=f*3;
    gH2.gain.setValueAtTime(.4,t); gH2.gain.exponentialRampToValueAtTime(.001,t+d*.5);
    gH3.gain.setValueAtTime(.2,t); gH3.gain.exponentialRampToValueAtTime(.001,t+d*.3);
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.9,t+.003); env.gain.exponentialRampToValueAtTime(.001,t+d);
    h2.connect(gH2); h3.connect(gH3); car.connect(env); gH2.connect(env); gH3.connect(env); env.connect(this.gain);
    car.start(t); h2.start(t); h3.start(t); car.stop(t+d); h2.stop(t+d); h3.stop(t+d);
  },

  kalimba: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2.5;
    var car=c.createOscillator(), ot=c.createOscillator(), otG=c.createGain(), env=c.createGain();
    car.type='sine'; car.frequency.value=f; ot.type='sine'; ot.frequency.value=f*5.7;
    otG.gain.setValueAtTime(.15,t); otG.gain.exponentialRampToValueAtTime(.001,t+.08);
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(1,t+.004); env.gain.exponentialRampToValueAtTime(.001,t+d);
    ot.connect(otG); car.connect(env); otG.connect(env); env.connect(this.gain);
    car.start(t); ot.start(t); car.stop(t+d); ot.stop(t+d);
  },

  synth: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||2;
    var osc=c.createOscillator(), sub=c.createOscillator(), subG=c.createGain(), lp=c.createBiquadFilter(), env=c.createGain();
    osc.type='square'; osc.frequency.value=f; sub.type='sawtooth'; sub.frequency.value=f; sub.detune.value=-1200; subG.gain.value=.3;
    lp.type='lowpass'; lp.frequency.value=300; lp.frequency.exponentialRampToValueAtTime(4000,t+.08);
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.8,t+.01);
    env.gain.setValueAtTime(.7,t+d-.1); env.gain.linearRampToValueAtTime(0,t+d);
    osc.connect(lp); sub.connect(subG); subG.connect(lp); lp.connect(env); env.connect(this.gain);
    osc.start(t); sub.start(t); osc.stop(t+d); sub.stop(t+d);
  },

  electricpiano: function(m, d) {
    var c=this.ctx, f=this.hz(m), t=c.currentTime; d=d||3;
    var car=c.createOscillator(), mod=c.createOscillator(), mG=c.createGain();
    var trem=c.createOscillator(), tremG=c.createGain(), env=c.createGain();
    car.type='sine'; car.frequency.value=f; mod.frequency.value=f;
    mG.gain.setValueAtTime(f*1.5,t); mG.gain.exponentialRampToValueAtTime(.001,t+.5);
    trem.frequency.value=4.8; tremG.gain.value=.1;
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.8,t+.006); env.gain.exponentialRampToValueAtTime(.001,t+d);
    mod.connect(mG); mG.connect(car.frequency); trem.connect(tremG); tremG.connect(env.gain);
    car.connect(env); env.connect(this.gain);
    car.start(t); mod.start(t); trem.start(t); car.stop(t+d); mod.stop(t+d); trem.stop(t+d);
  },

  /* ── Drum synthesis ── */
  drum: function(type) {
    this.init(); this.resume();
    var c=this.ctx, t=c.currentTime, out=this.gain;
    function noise(d) {
      var b=c.createBuffer(1,Math.ceil(c.sampleRate*d),c.sampleRate), a=b.getChannelData(0);
      for(var i=0;i<a.length;i++) a[i]=Math.random()*2-1;
      var s=c.createBufferSource(); s.buffer=b; return s;
    }
    function ramp(g,p,d) { g.gain.setValueAtTime(p,t); g.gain.exponentialRampToValueAtTime(.0001,t+d); }
    var o,g,n,gn,go,hp,bp,env;
    if(type==='kick'){o=c.createOscillator();g=c.createGain();o.frequency.setValueAtTime(190,t);o.frequency.exponentialRampToValueAtTime(42,t+.32);ramp(g,2.2,.5);o.connect(g);g.connect(out);o.start(t);o.stop(t+.5);}
    else if(type==='snare'){n=noise(.25);gn=c.createGain();ramp(gn,1.5,.25);o=c.createOscillator();go=c.createGain();ramp(go,.8,.09);o.frequency.value=185;hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=1200;n.connect(hp);hp.connect(gn);gn.connect(out);o.connect(go);go.connect(out);n.start(t);o.start(t);o.stop(t+.09);}
    else if(type==='hihat'){n=noise(.12);g=c.createGain();ramp(g,1.1,.12);hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=9000;n.connect(hp);hp.connect(g);g.connect(out);n.start(t);}
    else if(type==='openhat'){n=noise(.55);g=c.createGain();ramp(g,1,.55);hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=7000;n.connect(hp);hp.connect(g);g.connect(out);n.start(t);}
    else if(type==='tom1'){o=c.createOscillator();g=c.createGain();o.frequency.setValueAtTime(155,t);o.frequency.exponentialRampToValueAtTime(70,t+.22);ramp(g,1.9,.38);o.connect(g);g.connect(out);o.start(t);o.stop(t+.38);}
    else if(type==='tom2'){o=c.createOscillator();g=c.createGain();o.frequency.setValueAtTime(115,t);o.frequency.exponentialRampToValueAtTime(55,t+.25);ramp(g,1.9,.38);o.connect(g);g.connect(out);o.start(t);o.stop(t+.38);}
    else if(type==='floor'){o=c.createOscillator();g=c.createGain();o.frequency.setValueAtTime(78,t);o.frequency.exponentialRampToValueAtTime(38,t+.3);ramp(g,2.1,.45);o.connect(g);g.connect(out);o.start(t);o.stop(t+.45);}
    else if(type==='crash'){n=noise(2);g=c.createGain();ramp(g,1,2);bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=5000;bp.Q.value=.35;n.connect(bp);bp.connect(g);g.connect(out);n.start(t);}
    else if(type==='ride'){n=noise(.9);g=c.createGain();ramp(g,.85,.9);bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=6000;bp.Q.value=.5;n.connect(bp);bp.connect(g);g.connect(out);n.start(t);}
  },

  playWind: function(synth, midi) {
    this.init(); this.resume(); this.stopWind();
    var c=this.ctx, f=this.hz(midi), t=c.currentTime, env=c.createGain();
    env.gain.setValueAtTime(0,t); env.gain.linearRampToValueAtTime(.8,t+.08); env.connect(this.gain);
    var osc=c.createOscillator();
    if(synth==='flute'||synth==='pan_flute'){osc.type='sine';}
    else if(synth==='brass'){osc.type='sawtooth'; var bp1=c.createBiquadFilter(); bp1.type='bandpass'; bp1.frequency.value=1200; bp1.Q.value=1.5; osc.connect(bp1); bp1.connect(env); osc.frequency.value=f; osc.start(t); this.windNode={stop:function(){try{osc.stop();}catch(e){}}}; return;}
    else if(synth==='saxophone'||synth==='reed'){osc.type='sawtooth'; var bp2=c.createBiquadFilter(); bp2.type='bandpass'; bp2.frequency.value=900; bp2.Q.value=1.8; osc.connect(bp2); bp2.connect(env); osc.frequency.value=f; osc.start(t); this.windNode={stop:function(){try{osc.stop();}catch(e){}}}; return;}
    else if(synth==='didgeridoo'){osc.type='sawtooth'; f=58; var lp2=c.createBiquadFilter(); lp2.type='lowpass'; lp2.frequency.value=350; osc.connect(lp2); lp2.connect(env); osc.frequency.value=f; osc.start(t); this.windNode={stop:function(){try{osc.stop();}catch(e){}}}; return;}
    else{osc.type='triangle';}
    osc.frequency.value=f; osc.connect(env); osc.start(t);
    this.windNode={stop:function(){try{osc.stop();}catch(e){}}};
  },
  stopWind: function() { if(this.windNode){try{this.windNode.stop();}catch(e){}this.windNode=null;} }
};



/* ══ UTILS ══ */
function midi(name){var m={C:0,D:2,E:4,F:5,G:7,A:9,B:11},r=name.match(/([A-G]#?)(\d)/);if(!r) return 60;return(parseInt(r[2])+1)*12+m[r[1][0]]+(r[1].length>1?1:0);}
function el(id){return document.getElementById(id);}
function showScreen(id){['homeScreen','playerScreen'].forEach(function(s){var e=el(s);if(e){e.classList.toggle('active',s===id);}});if(id==='playerScreen'){document.activeElement&&document.activeElement.blur();}}
function showOverlay(id){var e=el(id);if(e) e.classList.add('open');}
function hideOverlay(id){var e=el(id);if(e) e.classList.remove('open');}

/* ══ APP ══ */
var App={
  cur:null, we:null, oct:4, fret:0, cat:'all', q:'', scanStream:null,

  init:function(){
    this.buildCatBar();
    this.renderGrid();
    this.bindTopBar();
    this.bindInfo();
    this.bindPlayer();
    this.bindScan();
    this.bindKeys();
    el('volSlider').addEventListener('input',function(e){AE.setVol(e.target.value/100);});
  },

  /* ── Category bar with icons ── */
  buildCatBar:function(){
    var bar=el('catBar'), self=this;
    THEMES.forEach(function(t){
      var pill=document.createElement('button');
      pill.className='cat-pill'+(t.key==='all'?' active':'');
      pill.dataset.key=t.key;
      pill.innerHTML='<span class="ci">'+t.icon+'</span>'+t.label;
      pill.addEventListener('click',function(){
        self.setCategory(t.key);
        applyTheme(t);
      });
      bar.appendChild(pill);
    });
  },

  setCategory:function(key){
    this.cat=key;
    document.querySelectorAll('.cat-pill').forEach(function(p){p.classList.toggle('active',p.dataset.key===key);});
    var fopts=document.querySelectorAll('.filter-opt');fopts&&fopts.forEach(function(o){o.classList.toggle('active',o.dataset.cat===key);});
    var t=THEMES.find(function(x){return x.key===key;})||THEMES[0];
    var _fl2=el('filterLabel');if(_fl2)_fl2.textContent=t.label;
    this.renderGrid();
  },

  /* ── Grid ── */
  renderGrid:function(){
    var grid=el('instrumentsGrid'); grid.innerHTML='';
    var self=this;
    var list=DB.filter(function(i){
      var cOk=self.cat==='all'||i.family===self.cat;
      var q=self.q.toLowerCase();
      var qOk=!q||i.name.toLowerCase().indexOf(q)>-1||i.family.toLowerCase().indexOf(q)>-1||i.region.toLowerCase().indexOf(q)>-1||i.desc.toLowerCase().indexOf(q)>-1;
      return cOk&&qOk;
    });
    if(!list.length){grid.innerHTML='<p class="no-results">No instruments match.</p>';return;}
    list.forEach(function(inst){
      var card=document.createElement('div');card.className='instrument-card';
      card.innerHTML='<div class="card-art">'+inst.emoji+'<span class="card-region">'+inst.region+'</span></div><div class="card-body"><p class="card-fam">'+inst.family+'</p><h2 class="card-name">'+inst.name+'</h2><p class="card-tagline">'+inst.tagline+'</p></div>';
      // 3D tilt
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect();
        var dx=(e.clientX-r.left-r.width/2)/(r.width/2);
        var dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        card.style.transform='perspective(900px) rotateX('+(dy*-12)+'deg) rotateY('+(dx*12)+'deg) translateZ(14px)';
        card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
        card.style.setProperty('--my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
      });
      card.addEventListener('mouseleave',function(){card.style.transform='';});
      card.addEventListener('click',function(){self.openInfo(inst);});
      grid.appendChild(card);
    });
  },

  /* ── Top bar ── */
  bindTopBar:function(){
    var self=this;
    var fb=el('filterBtn');if(fb){fb.addEventListener('click',function(e){e.stopPropagation();el('filterDropdown').classList.toggle('open');});}
    document.addEventListener('click',function(){var fd=el('filterDropdown');if(fd)fd.classList.remove('open');});
    var fd2=el('filterDropdown');if(fd2)fd2.addEventListener('click',function(e){e.stopPropagation();});
    var fopts=document.querySelectorAll('.filter-opt');fopts&&fopts.forEach(function(o){
      o.addEventListener('click',function(){
        var key=o.dataset.cat;
        self.setCategory(key);
        var t=THEMES.find(function(x){return x.key===key;})||THEMES[0];
        applyTheme(t);
        el('filterDropdown').classList.remove('open');
      });
    });
    el('searchInput').addEventListener('input',function(e){self.q=e.target.value;self.renderGrid();});
  },

  /* ── Info card ── */
  openInfo:function(inst){
    this.cur=inst;
    el('infoHero').textContent=inst.emoji;
    el('infoFamily').textContent=inst.family;
    el('infoRegion').textContent=inst.region;
    el('infoEra').textContent=inst.era;
    el('infoTitle').textContent=inst.name;
    el('infoNative').textContent=inst.native||'';
    el('infoDesc').textContent=inst.desc;
    var ff=el('infoFacts');ff.innerHTML='';
    (inst.facts||[]).forEach(function(f){var d=document.createElement('div');d.className='fact-item';d.innerHTML='<div class="fact-label">'+f.l+'</div><div class="fact-val">'+f.v+'</div>';ff.appendChild(d);});
    showOverlay('infoOverlay');
  },

  bindInfo:function(){
    var self=this;
    el('closeInfoBtn').addEventListener('click',function(){hideOverlay('infoOverlay');});
    el('infoOverlay').addEventListener('click',function(e){if(e.target===el('infoOverlay')) hideOverlay('infoOverlay');});

    // Play button popup ripple effect
    var pbtn=el('playThisBtn');
    pbtn.addEventListener('mousemove',function(e){
      var r=pbtn.getBoundingClientRect();
      pbtn.style.setProperty('--bx',((e.clientX-r.left)/r.width*100)+'%');
      pbtn.style.setProperty('--by',((e.clientY-r.top)/r.height*100)+'%');
    });
    pbtn.addEventListener('click',function(){
      hideOverlay('infoOverlay');
      self.openPlayer(self.cur);
    });
  },

  /* ── Player ── */
  openPlayer:function(inst){
    var self=this;
    this.stopWind(); this.cur=inst;
    AE.init(); AE.resume();

    // Apply category theme
    var t=THEMES.find(function(x){return x.key===inst.family;})||THEMES[0];
    applyTheme(t);

    el('playerFamily').textContent=inst.family;
    el('playerName').textContent=inst.name;
    var stage=el('playerStage'); stage.innerHTML='';
    /* wind-bar removed */ void(0);
    

    // Kick off soundfont load in background (non-blocking)
    if(inst.sfName) {
      AE.loadSF(inst.sfName, null);
    }

    if(inst.uiType==='piano')   this.buildPiano(stage,inst);
    if(inst.uiType==='strings') this.buildStrings(stage,inst);
    if(inst.uiType==='drums')   this.buildDrums(stage);
    if(inst.uiType==='wind')    this.buildWind(stage,inst);
    if(inst.uiType==='bars')    this.buildBars(stage,inst);
    showScreen('playerScreen');
    // Focus the stage so keyboard events reach the document listener immediately
    var stg=el('playerStage');
    if(stg){stg.setAttribute('tabindex','-1');stg.focus({preventScroll:true});}
  },

  bindPlayer:function(){
    var self=this;
    el('backBtn').addEventListener('click',function(){
      self.stopWind();
      // Restore home theme
      var t=THEMES.find(function(x){return x.key===self.cat;})||THEMES[0];
      applyTheme(t);
      showScreen('homeScreen');
      
      /* wind-bar removed */ void(0);
    });
  },

  /* ── Piano ── */
  buildPiano:function(stage,inst){
    var self=this;
    var wrap=document.createElement('div'); wrap.className='piano-wrap';
    wrap.innerHTML='<div class="octave-row"><button class="oct-btn" id="octD">&#8722;</button><span class="oct-label" id="octL">Octave '+this.oct+'</span><button class="oct-btn" id="octU">+</button></div><div class="piano-keyboard" id="pianoKbd"></div><div class="inst-hint">Keys: <b>A S D F G H J</b> (white) &nbsp; <b>W E T Y U</b> (black) &nbsp; Oct: <b>Z / X</b></div>';
    stage.appendChild(wrap); this._drawPiano(inst);
    el('octD').addEventListener('click',function(){self.oct=Math.max(1,self.oct-1);el('octL').textContent='Octave '+self.oct;self._drawPiano(inst);});
    el('octU').addEventListener('click',function(){self.oct=Math.min(7,self.oct+1);el('octL').textContent='Octave '+self.oct;self._drawPiano(inst);});
  },
  _drawPiano:function(inst){
    var kbd=el('pianoKbd'); if(!kbd) return; kbd.innerHTML='';
    var base=(this.oct+1)*12,whites=[0,2,4,5,7,9,11],blacks=[1,3,null,6,8,10,null],kbl=['A','S','D','F','G','H','J'];
    var W=Math.min(52,Math.floor((window.innerWidth-80)/8)),G=2,x=0;
    whites.forEach(function(off,i){
      var m=base+off,k=document.createElement('div');
      k.className='pw-key'; k.dataset.note=m; k.style.width=W+'px'; k.style.marginLeft=G+'px'; k.textContent=kbl[i];
      k.addEventListener('mousedown',function(){k.classList.add('on'); AE.play(inst.sfName,inst.synth,m,2.5);});
      k.addEventListener('mouseup',function(){k.classList.remove('on');}); k.addEventListener('mouseleave',function(){k.classList.remove('on');});
      kbd.appendChild(k);
      if(blacks[i]!==null){var bm=base+blacks[i],b=document.createElement('div');b.className='pb-key';b.dataset.note=bm;b.style.width=Math.round(W*.58)+'px';b.style.left=(x+W*.62)+'px';b.addEventListener('mousedown',function(){b.classList.add('on');AE.play(inst.sfName,inst.synth,bm,2.5);});b.addEventListener('mouseup',function(){b.classList.remove('on');});b.addEventListener('mouseleave',function(){b.classList.remove('on');});kbd.appendChild(b);}
      x+=W+G;
    });
    kbd.style.width=x+'px';
  },

  /* ── Strings ── */
  buildStrings:function(stage,inst){
    var self=this,labels=inst.stringLabels||['E2','A2','D3','G3','B3','e4'],midis=labels.map(midi);
    var wrap=document.createElement('div'); wrap.className='strings-wrap';
    var body=document.createElement('div'); body.className='strings-body';
    labels.forEach(function(lbl,i){
      var row=document.createElement('div'); row.className='str-row';
      var nm=document.createElement('span'); nm.className='str-lbl'; nm.textContent=lbl.replace(/\d/,'');
      var line=document.createElement('div'); line.className='str-line'; line.style.height=(2+Math.min(i,5)*.8)+'px';
      var noteN=document.createElement('span'); noteN.className='str-note'; noteN.textContent=lbl;
      line.addEventListener('click',function(){
        var n=midis[i]+(inst.showFrets?self.fret:0);
        AE.play(inst.sfName,inst.synth,n,3);
        line.classList.remove('pluck'); void line.offsetWidth; line.classList.add('pluck');
        setTimeout(function(){line.classList.remove('pluck');},450);
      });
      row.appendChild(nm); row.appendChild(line); row.appendChild(noteN); body.appendChild(row);
    });
    wrap.appendChild(body);
    if(inst.showFrets){
      var fr=document.createElement('div'); fr.className='frets-row';
      [0,1,2,3,4,5,7,9,12].forEach(function(f){
        var btn=document.createElement('button'); btn.className='fret-btn'+(f===0?' active':''); btn.textContent=f===0?'O':f;
        btn.addEventListener('click',function(){self.fret=f;fr.querySelectorAll('.fret-btn').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');});
        fr.appendChild(btn);
      });
      wrap.appendChild(fr);
    }
    stage.appendChild(wrap);
    
    var keys=['A','S','D','F','G','H','J','K','L'];
  },

  /* ── Drums ── */
  buildDrums:function(stage){
    var self=this;
    var pads=[{id:'crash',icon:'🔔',lbl:'Crash',key:'Q'},{id:'ride',icon:'🔔',lbl:'Ride',key:'W'},{id:'openhat',icon:'〇',lbl:'Open Hat',key:'E'},{id:'hihat',icon:'×',lbl:'Hi-Hat',key:'R'},{id:'tom1',icon:'🥁',lbl:'Tom 1',key:'A'},{id:'tom2',icon:'🥁',lbl:'Tom 2',key:'S'},{id:'snare',icon:'◎',lbl:'Snare',key:'D'},{id:'floor',icon:'⬤',lbl:'Floor',key:'F'},{id:'kick',icon:'💥',lbl:'Kick',key:'SPC'}];
    var wrap=document.createElement('div'); wrap.className='drums-wrap';
    var grid=document.createElement('div'); grid.className='drums-grid';
    pads.forEach(function(p){
      var pad=document.createElement('div'); pad.className='drum-pad'; pad.dataset.type=p.id;
      pad.innerHTML='<span class="dp-icon">'+p.icon+'</span><span class="dp-lbl">'+p.lbl+'</span><span class="dp-key">['+p.key+']</span>';
      pad.addEventListener('mousedown',function(){AE.drum(p.id);pad.classList.add('hit');setTimeout(function(){pad.classList.remove('hit');},120);});
      grid.appendChild(pad);
    });
    wrap.appendChild(grid); stage.appendChild(wrap);
  },

  /* ── Wind ── */
  buildWind:function(stage,inst){
    var self=this;
    var wrap=document.createElement('div'); wrap.className='wind-wrap';

    // Build note selector pills
    var noteNames=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    var noteRow=document.createElement('div'); noteRow.className='wind-note-row';
    var baseNote=inst.windNote||72;

    wrap.innerHTML=
      '<div class="wind-orb"><div class="wind-ring"></div><div class="wind-ring"></div><div class="wind-ring"></div>'+
      '<div class="wind-emoji">'+inst.emoji+'</div></div>'+
      '<p class="wind-inst">Hold <kbd class="wind-kbd">Space</kbd> to blow.<br>'+
      'Use <kbd class="wind-kbd">A S D F G H J</kbd> for notes &nbsp;|&nbsp; '+
      '<kbd class="wind-kbd">Z</kbd><kbd class="wind-kbd">X</kbd> or <kbd class="wind-kbd">&#8593;</kbd><kbd class="wind-kbd">&#8595;</kbd> for octave.</p>'+
      '<div class="wind-note-display" id="windNoteDisplay">—</div>'+
      '<div class="wind-keys-hint">'+
      '<span class="wk" data-note="0">C &nbsp;<small>A</small></span>'+
      '<span class="wk" data-note="2">D &nbsp;<small>S</small></span>'+
      '<span class="wk" data-note="4">E &nbsp;<small>D</small></span>'+
      '<span class="wk" data-note="5">F &nbsp;<small>F</small></span>'+
      '<span class="wk" data-note="7">G &nbsp;<small>G</small></span>'+
      '<span class="wk" data-note="9">A &nbsp;<small>H</small></span>'+
      '<span class="wk" data-note="11">B &nbsp;<small>J</small></span>'+
      '<span class="wk" data-note="1">C# <small>W</small></span>'+
      '<span class="wk" data-note="3">D# <small>E</small></span>'+
      '<span class="wk" data-note="6">F# <small>T</small></span>'+
      '<span class="wk" data-note="8">G# <small>Y</small></span>'+
      '<span class="wk" data-note="10">A# <small>U</small></span>'+
      '</div>';

    stage.appendChild(wrap);

    // Wind currently playing note
    inst._windNote = baseNote;
    inst._windOct  = 0;
    inst._windPlaying = false;

    // Update display
    function updateDisplay(){
      var m=inst._windNote+(inst._windOct*12);
      var nn=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
      var name=nn[m%12]+(Math.floor(m/12)-1);
      var d=el('windNoteDisplay');
      if(d) d.textContent=name;
      // Highlight active key
      document.querySelectorAll('.wk').forEach(function(k){
        k.classList.toggle('active', parseInt(k.dataset.note)===(m%12));
      });
    }
    updateDisplay();

    // Store on inst for bindKeys access
    inst._windUpdateDisplay = updateDisplay;
  },

    stopWind:function(){AE.stopWind();if(this.cur)this.cur._windPlaying=false;},

  /* ── Bars ── */
  buildBars:function(stage,inst){
    var self=this;
    var notes=[{n:'C',m:60,h:180},{n:'D',m:62,h:168},{n:'E',m:64,h:158},{n:'F',m:65,h:150},{n:'G',m:67,h:140},{n:'A',m:69,h:132},{n:'B',m:71,h:124},{n:"C'",m:72,h:116}];
    var off=inst.barOffset||0;
    var wrap=document.createElement('div'); wrap.className='bars-wrap';
    var row=document.createElement('div'); row.className='bars-row';
    var keys=['A','S','D','F','G','H','J','K'];
    notes.forEach(function(n,i){
      var col=document.createElement('div'); col.className='bar-col';
      var vis=document.createElement('div'); vis.className='bar-vis'; vis.style.height=n.h+'px'; vis.style.filter='hue-rotate('+(i*22)+'deg)';
      var lbl=document.createElement('span'); lbl.className='bar-note'; lbl.textContent=n.n;
      var kk=document.createElement('span'); kk.className='bar-note'; kk.style.fontSize='9px'; kk.style.opacity='.5'; kk.textContent='['+keys[i]+']';
      col.appendChild(vis); col.appendChild(lbl); col.appendChild(kk);
      col.addEventListener('click',function(){AE.play(inst.sfName,inst.synth,n.m+off,1.5);col.classList.add('hit');setTimeout(function(){col.classList.remove('hit');},280);});
      row.appendChild(col);
    });
    wrap.appendChild(row); stage.appendChild(wrap);
  },

  /* ── Keyboard ── */
  bindKeys:function(){
    var self=this,held={};
    var wM={a:0,s:2,d:4,f:5,g:7,h:9,j:11},bM={w:1,e:3,t:6,y:8,u:10};
    var dM={q:'crash',w:'ride',e:'openhat',r:'hihat',a:'tom1',s:'tom2',d:'snare',f:'floor'};
    var barM={a:0,s:1,d:2,f:3,g:4,h:5,j:6,k:7},strM={a:0,s:1,d:2,f:3,g:4,h:5,j:6,k:7,l:8};
    var frM={'1':1,'2':2,'3':3,'4':4,'5':5,'7':7,'9':9,'0':12};

    function isTyping(){
      var t=document.activeElement&&document.activeElement.tagName;
      return t==='INPUT'||t==='TEXTAREA';
    }

    document.addEventListener('keydown',function(ev){
      // Never intercept when user is typing in a text field
      if(isTyping()) return;
      if(held[ev.key]) return;
      held[ev.key]=true;
      var inst=self.cur; if(!inst) return;
      var k=ev.key.toLowerCase();

      if(inst.uiType==='piano'){
        // Octave shift — Z down, X up
        if(k==='z'||ev.key==='ArrowDown'){ev.preventDefault();self.oct=Math.max(1,self.oct-1);var ol=el('octL');if(ol)ol.textContent='Octave '+self.oct;self._drawPiano(inst);return;}
        if(k==='x'||ev.key==='ArrowUp'){ev.preventDefault();self.oct=Math.min(7,self.oct+1);var ol=el('octL');if(ol)ol.textContent='Octave '+self.oct;self._drawPiano(inst);return;}
        var base=(self.oct+1)*12;
        var note=wM[k]!==undefined?base+wM[k]:bM[k]!==undefined?base+bM[k]:null;
        if(note!==null){
          ev.preventDefault();
          AE.play(inst.sfName,inst.synth,note,3.5);
          var e2=document.querySelector('[data-note="'+note+'"]');
          if(e2) e2.classList.add('on');
        }

      } else if(inst.uiType==='drums'){
        var type=dM[k]||(ev.key===' '?'kick':null);
        if(type){
          ev.preventDefault();
          AE.drum(type);
          var pad=document.querySelector('.drum-pad[data-type="'+type+'"]');
          if(pad){pad.classList.add('hit');setTimeout(function(){pad.classList.remove('hit');},120);}
        }

      } else if(inst.uiType==='bars'){
        if(k==='z'||ev.key==='ArrowDown'){ev.preventDefault();self.oct=Math.max(-2,self.oct-1);return;}
        if(k==='x'||ev.key==='ArrowUp'){ev.preventDefault();self.oct=Math.min(2,self.oct+1);return;}
        var bi=barM[k];
        if(bi!==undefined){
          ev.preventDefault();
          var ns=[60,62,64,65,67,69,71,72],o2=inst.barOffset||0,octShift=(self.oct||0)*12;
          AE.play(inst.sfName,inst.synth,ns[bi]+o2+octShift,1.5);
          var cols=document.querySelectorAll('.bar-col');
          if(cols[bi]){cols[bi].classList.add('hit');setTimeout(function(){cols[bi].classList.remove('hit');},280);}
        }

      } else if(inst.uiType==='strings'){
        if((k==='z'||ev.key==='ArrowLeft')&&inst.showFrets){ev.preventDefault();self.fret=Math.max(0,self.fret-1);document.querySelectorAll('.fret-btn').forEach(function(b){b.classList.toggle('active',parseInt(b.textContent)===self.fret||(b.textContent==='O'&&self.fret===0));});return;}
        if((k==='x'||ev.key==='ArrowRight')&&inst.showFrets){ev.preventDefault();self.fret=self.fret>=12?12:([0,1,2,3,4,5,7,9,12][[0,1,2,3,4,5,7,9,12].indexOf(self.fret)+1]||12);document.querySelectorAll('.fret-btn').forEach(function(b){b.classList.toggle('active',parseInt(b.textContent)===self.fret||(b.textContent==='O'&&self.fret===0));});return;}
        var si=strM[k];
        if(si!==undefined){
          ev.preventDefault();
          var lbls=inst.stringLabels||['E2','A2','D3','G3','B3','e4'];
          if(si<lbls.length){
            var mn=midi(lbls[si])+(inst.showFrets?self.fret:0);
            AE.play(inst.sfName,inst.synth,mn,3);
            var lines=document.querySelectorAll('.str-line');
            if(lines[si]){lines[si].classList.remove('pluck');void lines[si].offsetWidth;lines[si].classList.add('pluck');setTimeout(function(){lines[si].classList.remove('pluck');},450);}
          }
        }
        if(frM[ev.key]!==undefined&&inst.showFrets){
          self.fret=frM[ev.key];
          document.querySelectorAll('.fret-btn').forEach(function(b){b.classList.toggle('active',parseInt(b.textContent)===self.fret||(b.textContent==='O'&&self.fret===0));});
        }

      } else if(inst.uiType==='wind'){
        var wNotMap={a:0,s:2,d:4,f:5,g:7,h:9,j:11,w:1,e:3,t:6,y:8,u:10};
        // Octave shift
        if(k==='z'||ev.key==='ArrowDown'){ev.preventDefault();inst._windOct=Math.max(-3,((inst._windOct||0)-1));if(inst._windUpdateDisplay)inst._windUpdateDisplay();if(inst._windPlaying){AE.stopWind();AE.playWind(inst.synth,(inst._windNote||inst.windNote||72)+(inst._windOct*12));}return;}
        if(k==='x'||ev.key==='ArrowUp')  {ev.preventDefault();inst._windOct=Math.min(3, ((inst._windOct||0)+1));if(inst._windUpdateDisplay)inst._windUpdateDisplay();if(inst._windPlaying){AE.stopWind();AE.playWind(inst.synth,(inst._windNote||inst.windNote||72)+(inst._windOct*12));}return;}
        // Note change (white keys)
        if(wNotMap[k]!==undefined){
          ev.preventDefault();
          var baseOct=Math.floor((inst.windNote||72)/12)*12;
          inst._windNote=baseOct+(wNotMap[k]);
          if(inst._windUpdateDisplay)inst._windUpdateDisplay();
          // If already blowing, retrigger on new note
          if(inst._windPlaying){AE.stopWind();AE.playWind(inst.synth,inst._windNote+(inst._windOct||0)*12);}
          return;
        }
        // Space = blow
        if(ev.key===' '){
          ev.preventDefault();
          if(!inst._windPlaying){
            inst._windPlaying=true;
            AE.playWind(inst.synth,(inst._windNote||inst.windNote||72)+(inst._windOct||0)*12);
            // Animate rings
            var orb=document.querySelector('.wind-orb');
            if(orb)orb.classList.add('blowing');
          }
          return;
        }
      }
    });

    document.addEventListener('keyup',function(ev){
      if(isTyping()){delete held[ev.key];return;}
      delete held[ev.key];
      var inst=self.cur; if(!inst) return;
      if(inst.uiType==='piano'){
        var base=(self.oct+1)*12,k=ev.key.toLowerCase();
        var o3=wM[k]!==undefined?wM[k]:bM[k]!==undefined?bM[k]:null;
        if(o3!==null){
          var e3=document.querySelector('[data-note="'+(base+o3)+'"]');
          if(e3) e3.classList.remove('on');
          // Natural fade-out: release envelope on key-up
          AE.fadeOut(inst.sfName, base+o3);
        }
      }
      if(inst.uiType==='wind'&&ev.key===' '){
        inst._windPlaying=false;
        AE.stopWind();
        var orb=document.querySelector('.wind-orb');
        if(orb)orb.classList.remove('blowing');
      }
    });
  },

  /* ── Scan ── */
  bindScan:function(){
    var self=this;
    try{var saved=localStorage.getItem('dhun_groq_key')||'';if(saved){el('groqKeyInput').value=saved;el('keyStatus').textContent='API key loaded';}}catch(e){}
    el('scanBtn').addEventListener('click',function(){showOverlay('scanOverlay');});
    el('closeScanBtn').addEventListener('click',function(){self._closeScan();});
    el('scanOverlay').addEventListener('click',function(e){if(e.target===el('scanOverlay')) self._closeScan();});
    el('saveKeyBtn').addEventListener('click',function(){var k=el('groqKeyInput').value.trim();if(k){try{localStorage.setItem('dhun_groq_key',k);}catch(e){}el('keyStatus').textContent='Saved';}else el('keyStatus').textContent='Enter a key first';});
    el('startCamBtn').addEventListener('click',function(){navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false}).then(function(stream){self.scanStream=stream;el('scanVideo').srcObject=stream;el('startCamBtn').textContent='Camera Active';el('captureBtn').classList.remove('hidden');}).catch(function(){el('scanResult').textContent='Camera access denied.';});});
    el('captureBtn').addEventListener('click',function(){self._identify();});
  },
  _closeScan:function(){if(this.scanStream){this.scanStream.getTracks().forEach(function(t){t.stop();});this.scanStream=null;}el('scanVideo').srcObject=null;el('captureBtn').classList.add('hidden');el('startCamBtn').textContent='Start Camera';el('scanResult').textContent='';hideOverlay('scanOverlay');},
  _identify:function(){
    var self=this,video=el('scanVideo'),canvas=el('scanCanvas');
    canvas.width=video.videoWidth||640;canvas.height=video.videoHeight||480;
    canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
    var b64=canvas.toDataURL('image/jpeg',.8).split(',')[1];
    var key='';try{key=(localStorage.getItem('dhun_groq_key')||'').trim();}catch(e){}
    if(!key){el('scanResult').textContent='Enter and save your Groq API key first.';return;}
    el('scanResult').textContent='Identifying...';el('captureBtn').disabled=true;
    fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify({model:'meta-llama/llama-4-scout-17b-16e-instruct',messages:[{role:'user',content:[{type:'image_url',image_url:{url:'data:image/jpeg;base64,'+b64}},{type:'text',text:'You are an expert musicologist. Identify the musical instrument in this image. Reply with ONLY the instrument name in English. If no instrument, reply unknown.'}]}],max_tokens:60})})
    .then(function(r){return r.json();})
    .then(function(data){
      el('captureBtn').disabled=false;
      if(data.error){el('scanResult').textContent='Error: '+(data.error.message||'API error');return;}
      var id=((((data.choices||[])[0]||{}).message||{}).content||'').trim().toLowerCase();
      el('scanResult').textContent='Found: '+id;
      if(id&&id!=='unknown'){var match=null,best=0;DB.forEach(function(inst){var score=0,n=inst.name.toLowerCase();if(n===id) score=100;else if(n.indexOf(id)>-1||id.indexOf(n)>-1) score=80;else id.split(/\s+/).forEach(function(w){if(w.length>2&&n.indexOf(w)>-1) score+=30;});if(score>best){best=score;match=inst;}});if(match&&best>20){setTimeout(function(){self._closeScan();self.openInfo(match);},700);}else el('scanResult').textContent='Identified "'+id+'" -- not in library yet.';}
    })
    .catch(function(e){el('captureBtn').disabled=false;el('scanResult').textContent='Network error: '+e.message;});
  }
};

document.addEventListener('DOMContentLoaded',function(){App.init();});