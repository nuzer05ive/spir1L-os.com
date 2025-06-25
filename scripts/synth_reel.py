#!/usr/bin/env python3
"""One-shot reel builder."""

import argparse
import sys


def main(argv=None) -> None:
    parser = argparse.ArgumentParser(description="Synthesize reel")
    parser.add_argument("--mock", action="store_true", help="Generate local mock reel instead of hitting APIs")

    args = parser.parse_args(argv)

    if args.mock:
        from mock_assets import main as make_mock
        make_mock()
        sys.exit(0)

    # Placeholder for future API-based implementation
    print("Real reel generation not implemented")


if __name__ == "__main__":
    main()
