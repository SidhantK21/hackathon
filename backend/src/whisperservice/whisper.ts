import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const key=process.env.OPENAI_API_KEY;
console.log(key);

const openai = new OpenAI({
    apiKey:key
});

export const transcriptGen = async (filePath: string) => {
    try {

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });
        const transcpitedAudio=transcription.text;
        console.log(transcpitedAudio);
        return transcpitedAudio;

    } catch (error) {
        console.error("Error during transcription:", error);
    }
};


// transcriptGen("/Users/sidhantsinghrathore/Downloads/test.mp3");
