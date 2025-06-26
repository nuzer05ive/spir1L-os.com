#!/usr/bin/env python3
"""Launch a development preview of the VR intro scene."""
import subprocess
import sys


def main() -> None:
    if "--wizard" not in sys.argv:
        print("Usage: python scripts/synth_reel.py --wizard")
        return
    print("Starting Reel Forge VR dev server ...")
    subprocess.run(["pnpm", "--filter", "reel-forge-vr", "dev"])


if __name__ == "__main__":
    main()
