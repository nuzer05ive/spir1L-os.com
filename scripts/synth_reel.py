#!/usr/bin/env python3
import subprocess, sys
from pathlib import Path
FPS = 30
DUR = 13
OUT = Path("mock_reel.mp4")
TXT = "Wizard-of-Oz φ-Beat Demo\nSpir1L-OS"
subprocess.run([
    "ffmpeg","-y","-f","lavfi",
    "-i",f"color=c=black:s=720x1280:d={DUR}:r={FPS}",
    "-vf",f"drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:"
          f"text='{TXT}':fontcolor=white:fontsize=42:x=(w-text_w)/2:y=mod(t\\,0.55)*15",
    "-pix_fmt","yuv420p",str(OUT)
], check=True)
print("✅ wrote", OUT)
