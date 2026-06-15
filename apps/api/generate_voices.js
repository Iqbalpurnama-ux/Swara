const fs = require('fs');
const data = require('./voices-list.json');
const langs = {
  'id-ID': 'Indonesian',
  'en-US': 'English (US)',
  'ar-SA': 'Arabic (SA)',
  'zh-CN': 'Chinese (Mandarin, CN)',
  'ja-JP': 'Japanese',
  'ko-KR': 'Korean',
  'fr-FR': 'French',
  'de-DE': 'German',
  'es-ES': 'Spanish',
  'ms-MY': 'Malay'
};

const getBest = (list, gender, count) => {
  const sorted = list.filter(v => v.gender === gender).sort((a,b) => {
    const score = n => n.includes('Chirp3-HD') ? 5 : n.includes('Studio') ? 4 : n.includes('Journey') ? 3 : n.includes('Neural2') ? 2 : 1;
    return score(b.name) - score(a.name);
  });
  return sorted.slice(0, count);
};

let out = `export interface Voice {
  name: string
  label: string
  lang: string
  gender: "MALE" | "FEMALE" | "NEUTRAL"
}

export const VOICES: Voice[] = [
`;

for (const [code, name] of Object.entries(langs)) {
  out += `  // ${name}\n`;
  const list = data[code] || [];
  const f = getBest(list, 'FEMALE', 2);
  const m = getBest(list, 'MALE', 2);
  
  f.forEach((v, i) => out += `  { name: "${v.name}", label: "Wanita ${i+1}", lang: "${code}", gender: "FEMALE" },\n`);
  m.forEach((v, i) => out += `  { name: "${v.name}", label: "Pria ${i+1}", lang: "${code}", gender: "MALE" },\n`);
  out += '\n';
}
out += ']\n';

fs.writeFileSync('../web/constants/voices.ts', out);
console.log('Updated voices.ts');
