"""Generate original practice audio. Requires Python, Node.js, edge-tts, internet.
Run from any folder: python scripts/generate_audio.py
Existing nonempty MP3s are preserved unless --force is supplied.
"""
import argparse
import asyncio
import json
from pathlib import Path
import subprocess
import edge_tts

ROOT = Path(__file__).resolve().parents[1]

async def main(force=False):
    exams = json.loads(subprocess.check_output(
        ['node', '-e', 'process.stdout.write(JSON.stringify(require("./data.js")))'],
        cwd=ROOT, encoding='utf-8'))
    directory = ROOT / 'audio'
    directory.mkdir(exist_ok=True)
    limiter = asyncio.Semaphore(2)

    async def generate(exam, index, part):
        target = directory / f'exam-{exam["id"]}-part-{index + 1}.mp3'
        if target.exists() and target.stat().st_size > 1000 and not force:
            print(f'Keep {target.name}', flush=True)
            return
        async with limiter:
            for attempt in range(3):
                temporary = target.with_suffix('.tmp.mp3')
                try:
                    await edge_tts.Communicate(part['transcript'], exam['voice'], rate=exam['rate']).save(str(temporary))
                    if temporary.stat().st_size < 1000:
                        raise RuntimeError('Audio file is empty')
                    temporary.replace(target)
                    print(f'Generated {target.name} ({target.stat().st_size:,} bytes)', flush=True)
                    return
                except Exception:
                    temporary.unlink(missing_ok=True)
                    if attempt == 2:
                        raise
                    await asyncio.sleep(2 * (attempt + 1))
    await asyncio.gather(*(generate(exam, i, part) for exam in exams for i, part in enumerate(exam['parts'])))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--force', action='store_true')
    asyncio.run(main(parser.parse_args().force))
