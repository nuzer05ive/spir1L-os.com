"""
Make a 15-sec MP4 with a solid bg + beat-sync text
No network calls — pure local preview.
"""
import subprocess
import shutil
from pathlib import Path
import textwrap
import sys

FPS = 30
DURATION = 15  # seconds
OUT = Path("mock_reel.mp4")
MSG = textwrap.dedent(
    """
    Ma’aT’H’s  |  Lo’Gi¹K  |  p’œ’T’i¹K’s
    Beat-sync demo — Priivi³ Self-Spir1L
    """
).strip()


def main() -> None:
    if shutil.which("ffmpeg") is None:
        print("ffmpeg not found; cannot create mock video", file=sys.stderr)
        sys.exit(1)
    if OUT.exists():
        OUT.unlink()
    subprocess.run(
        [
            "ffmpeg",
            "-f",
            "lavfi",
            "-i",
            f"color=c=black:s=720x1280:d={DURATION}:r={FPS}",
            "-vf",
            "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:" +
            f"text='{MSG}':fontcolor=white:fontsize=40:" +
            "x=(w-text_w)/2:y=(mod(t\\,{1/1.818})*20)",
            "-pix_fmt",
            "yuv420p",
            "-y",
            str(OUT),
        ],
        check=True,
    )
    print(f"✅ Mock reel written → {OUT}")


if __name__ == "__main__":
    main()
