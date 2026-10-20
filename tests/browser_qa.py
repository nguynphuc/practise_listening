"""Optional end-to-end QA: pip install playwright; run local server first.
Uses installed Microsoft Edge. Outputs ignored screenshots/report in test-results.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'test-results'
OUT.mkdir(exist_ok=True)
report = {'flows': [], 'audio': [], 'console_errors': []}

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    page.on('pageerror', lambda error: report['console_errors'].append(str(error)))
    page.goto('http://127.0.0.1:8080')
    page.evaluate('localStorage.clear()')
    page.reload()
    exams = page.evaluate('EXAMS')
    assert page.locator('.exam-card').count() == 4
    page.screenshot(path=str(OUT / 'home-desktop.png'), full_page=True)
    for exam in exams:
        eid = exam['id']
        page.locator(f'[data-action="open"][data-id="{eid}"]').click()
        assert page.locator('textarea.answer').count() == 0
        assert page.locator('.transcript').count() == 0
        for i, q in enumerate(exam['parts'][0]['questions']):
            page.locator(f'#answer-{i}').fill(q['answers'][0])
        if eid == '01':
            page.reload()
            page.locator(f'[data-action="open"][data-id="{eid}"]').click()
            assert page.locator('#answer-0').input_value() == 'Bellford'
            page.locator('[data-action="next"]').click()
            page.locator('#confirm-dialog [value="cancel"]').click()
            assert page.locator('input.answer').count() == 10
            page.screenshot(path=str(OUT / 'part1-desktop.png'), full_page=True)
        for pi in range(2):
            player = page.locator('audio')
            player.evaluate('(a)=>a.load()')
            page.wait_for_function('document.querySelector("audio").readyState >= 1')
            duration = player.evaluate('(a)=>a.duration')
            assert duration > 45, (eid, pi, duration)
            player.evaluate('(a)=>a.play()')
            page.wait_for_function('document.querySelector("audio").currentTime > 0.1')
            player.evaluate('(a)=>a.pause()')
            report['audio'].append({'exam': eid, 'part': pi+1, 'duration_seconds': round(duration, 1), 'playback': True})
            if pi == 0:
                page.locator('[data-action="next"]').click()
                page.locator('#confirm-action').click()
                expect(page.locator('textarea.answer')).to_have_count(10)
                assert page.locator('input.answer').count() == 0
                assert page.locator('.transcript').count() == 0
                for i, q in enumerate(exam['parts'][1]['questions']):
                    page.locator(f'#answer-{i}').fill(q['answer'])
        page.locator('[data-action="submit"]').click()
        page.locator('#confirm-dialog [value="cancel"]').click()
        assert page.locator('.transcript').count() == 0
        page.locator('[data-action="submit"]').click()
        page.locator('#confirm-action').click()
        expect(page.locator('#total-score')).to_have_text('10')
        assert page.locator('.review-question').count() == 20
        assert page.locator('.transcript').count() == 2
        page.locator('[data-override="1-0"]').select_option('0')
        expect(page.locator('#total-score')).to_have_text('9,5')
        page.locator('[data-override="1-0"]').select_option('auto')
        expect(page.locator('#total-score')).to_have_text('10')
        if eid == '01':
            page.screenshot(path=str(OUT / 'results-desktop.png'), full_page=True)
        page.locator('[data-action="home"]').first.click()
        report['flows'].append({'exam': eid, 'perfect_score': 10, 'manual_adjustment': True})
    page.reload()
    page.locator('[data-action="open"][data-id="01"]').click()
    expect(page.locator('#total-score')).to_have_text('10')
    page.locator('[data-action="home"]').first.click()
    page.set_viewport_size({'width': 390, 'height': 844})
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.screenshot(path=str(OUT / 'home-mobile.png'), full_page=True)
    page.locator('[data-action="restart"][data-id="01"]').click()
    page.locator('#confirm-dialog [value="cancel"]').click()
    assert page.locator('[data-action="open"][data-id="01"]').inner_text().endswith('10/10')
    page.locator('[data-action="restart"][data-id="01"]').click()
    page.locator('#confirm-action').click()
    page.locator('#answer-0').fill('one two three four')
    assert page.locator('#answer-0').get_attribute('aria-invalid') == 'true'
    page.locator('#answer-1').fill('<img src=x onerror=alert(1)>')
    assert page.locator('img').count() == 0
    page.screenshot(path=str(OUT / 'part1-mobile.png'), full_page=True)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.locator('[data-action="next"]').click()
    assert '8 câu trống' in page.locator('#dialog-description').inner_text()
    page.locator('#confirm-action').click()
    expect(page.locator('textarea.answer')).to_have_count(10)
    page.locator('[data-action="submit"]').click()
    page.locator('#confirm-action').click()
    expect(page.locator('#total-score')).to_have_text('0')
    assert page.locator('img').count() == 0
    page.locator('[data-action="home"]').first.click()
    page.evaluate('document.documentElement.style.fontSize="200%"')
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    assert not report['console_errors'], report['console_errors']
    page.evaluate('localStorage.clear()')
    browser.close()

(OUT / 'browser-report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
