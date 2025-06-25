import { BeatVector } from "./types";
export function priiviSelfPrompt(beat: BeatVector, lesson) {
  const block = Math.floor(beat.ibtIndex / 9);
  const text  = [lesson.maath, lesson.logik, lesson.poetik][block];
  return {
    beat_id: beat.beatId,
    persona: lesson.persona,
    hook: text,
    cta:  block === 2 ? `Answer: ${lesson.challenge}` : "",
    latent: beat.latent,
    style_key: beat.styleKey,
    gain: beat.gainTier
  };
}
