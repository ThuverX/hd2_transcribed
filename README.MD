# Helldivers 2 Transcribed audio

A quick and dirty AI transcription of some Helldivers 2 audio files.

(May contain spoilers for the game, browse at your own risk)

## Description

This project is a list of transcribed audio files from the game Helldivers 2, extracted using [filediver](https://github.com/xypwn/filediver), only contains files under "content/audio/us".

Transcribed using [whisper.cpp](https://github.com/ggerganov/whisper.cpp) using the base model. Results are far from perfect but way better than manually opening every single file.

## Usage

If you want to use this for yourself, you'll need nodejs, filediver and whisper.cpp with the base model. Make sure you convert the files to 16bit wav files like whisper.cpp requires, rename.js will then look for any file ending in ".16.wav".

Pull requests welcome
