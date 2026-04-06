"""QMD 파일 자동 수정 스크립트"""
import re, os, glob

files = sorted(glob.glob(
    'D:/python/2026_letuin/Letuin_AI_Lecture/lectures/lecture_*.qmd'))

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    # ── R 코드 청크 내부만 처리 ─────────────────────────────
    def fix_chunk(m):
        c = m.group(0)
        # knitr::kable(...) {.smaller} 등 R 코드 안의 잘못된 Quarto 클래스 제거
        c = re.sub(r'(\))\s*\{[^}\n]+\}', r'\1', c)
        # 코드 청크 헤더에 잘못된 수식 제거 (```{r} {.smaller} 같은 패턴)
        return c

    # 모든 코드 청크 처리 (```{r...}...``` 패턴)
    content = re.sub(
        r'(```\{r[^`]*?\}.*?```)',
        fix_chunk,
        content,
        flags=re.DOTALL
    )

    # ── 슬라이드 헤딩 뒤에 오는 잘못된 중괄호 수정 ──────────
    # ## Title {auto-animate="true"} {.smaller} 처럼 중복 중괄호 정리
    content = re.sub(
        r'(## .+?\{[^}]+\})\s*\{\.smaller\}',
        r'\1 {.smaller}',
        content
    )

    # ── logo 경로가 없으면 제거 ───────────────────────────────
    if 'logo: ../logo.png' in content:
        logo_path = 'D:/python/2026_letuin/Letuin_AI_Lecture/logo.png'
        if not os.path.exists(logo_path):
            content = content.replace('    logo: ../logo.png\n', '')

    if content != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {os.path.basename(fpath)}')
    else:
        print(f'Clean: {os.path.basename(fpath)}')

print('Done.')
