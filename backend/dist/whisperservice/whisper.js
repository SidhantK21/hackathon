"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcriptGen = void 0;
const fs_1 = __importDefault(require("fs"));
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.OPENAI_API_KEY;
console.log(key);
const openai = new openai_1.default({
    apiKey: key
});
const transcriptGen = async (filePath) => {
    try {
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const transcription = await openai.audio.transcriptions.create({
            file: fs_1.default.createReadStream(filePath),
            model: "whisper-1",
        });
        const transcpitedAudio = transcription.text;
        console.log(transcpitedAudio);
        return transcpitedAudio;
    }
    catch (error) {
        console.error("Error during transcription:", error);
    }
};
exports.transcriptGen = transcriptGen;
// transcriptGen("/Users/sidhantsinghrathore/Downloads/test.mp3");
