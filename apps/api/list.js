const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

async function listVoices() {
  const client = new textToSpeech.TextToSpeechClient({
    keyFilename: './gcp-key.json'
  });

  const [result] = await client.listVoices({});
  const voices = result.voices;
  
  // Group by language
  const output = {};
  voices.forEach(v => {
    v.languageCodes.forEach(lang => {
      if (!output[lang]) output[lang] = [];
      output[lang].push({
        name: v.name,
        gender: v.ssmlGender
      });
    });
  });

  fs.writeFileSync('voices-list.json', JSON.stringify(output, null, 2));
  console.log('Voices written to voices-list.json');
}

listVoices().catch(console.error);
