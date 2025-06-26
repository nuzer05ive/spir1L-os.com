#!/usr/bin/env python3
"""Generate placeholder viseme timing from an MP3 file."""
import sys
import json
import random


def gen_visemes(mp3_path: str, out_path: str) -> None:
    random.seed(0)
    visemes = []
    for i in range(20):
        visemes.append({"time": i * 0.5, "viseme": random.choice(["A", "B", "C"])} )
    with open(out_path, "w") as f:
        json.dump(visemes, f, indent=2)
    print(f"Visemes written to {out_path}")


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python scripts/gen_visemes.py <audio.mp3>")
        sys.exit(1)
    mp3 = sys.argv[1]
    out = "apps/reel-forge-vr/public/visemes.json"
    gen_visemes(mp3, out)


if __name__ == "__main__":
    main()
