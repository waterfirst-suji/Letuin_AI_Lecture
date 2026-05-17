# 12강: NotebookLM 연구 노트 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **NotebookLM 지식 베이스 구축**: 논문/보고서 10개 이상 업로드하여 개인화된 연구 노트 생성
2. **출처 기반 질의응답**: 할루시네이션 없이 업로드 자료만 참고하여 정확한 답변 얻기
3. **오디오 팟캐스트 생성**: 논문을 2인 대화 형식의 청취형 콘텐츠로 자동 변환

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "11강에서 Gemini API를 마스터했습니다. 이제 NotebookLM으로 개인 연구 노트를 만듭니다. 논문 10개를 업로드하면 AI가 출처를 명시하며 정확하게 답변합니다. 할루시네이션은 없습니다."

**학습목표 3개 카드**:
- **학습목표 1**: 논문 10개로 지식 베이스 구축 (BookOpen 아이콘)
- **학습목표 2**: 출처 기반 정확한 답변 (Target 아이콘)
- **학습목표 3**: 오디오 팟캐스트 자동 생성 (Headphones 아이콘)

**40분 타임라인**:
- 0~3분: NotebookLM 소개 및 할루시네이션 문제
- 3~10분: 출처 기반 답변의 원리
- 10~18분: 논문 업로드 3가지 방법 (PDF/웹링크/구글독스)
- 18~30분: 실습 - 분야별 논문 10개 업로드 및 질의응답
- 30~35분: 오디오 팟캐스트 생성 및 활용
- 35~40분: 정리 및 13강 예고

**역할 분담**:
- 엔지니어: 논문 수집, 업로드, 질문 작성
- NotebookLM: 출처 명시, 정확한 답변, 팟캐스트 생성

---

### Section 02: NotebookLM 핵심 개념 (3~10분)

#### 할루시네이션(Hallucination) 문제

**핵심 메시지**:
> "일반 AI 챗봇은 없는 사실을 그럴듯하게 지어냅니다. NotebookLM은 업로드한 자료만 참고하므로 할루시네이션이 없습니다."

**할루시네이션 사례**:

**사례 1: ChatGPT (2024년)**
```
질문: "리튬이온 배터리 NCM811의 열화 메커니즘은?"
답변: "NCM811은 코발트가 81%입니다." ❌ (실제: 니켈 80%, 코발트 10%, 망간 10%)
```

**사례 2: Claude (2025년)**
```
질문: "OLED RGB 증착 공정에서 FMM은 무엇인가?"
답변: "Fine Metal Mesh입니다." ❌ (실제: Fine Metal Mask)
```

**사례 3: Gemini (2025년)**
```
질문: "반도체 7nm 공정의 트랜지스터 개수는?"
답변: "약 500억 개입니다." ❌ (칩마다 다름, 일반화 불가)
```

**NotebookLM의 차이점**:
```
NotebookLM은 업로드한 논문에 "NCM811은 Ni:Co:Mn = 8:1:1"이라고 쓰여 있으면
정확히 그대로 인용합니다. 없는 내용은 "자료에서 찾을 수 없습니다"라고 답합니다.
```

---

#### 출처 기반 답변 원리

**3단계 프로세스**:

**Step 1: 벡터 검색 (Semantic Search)**
```
사용자 질문: "NCM811 열화 메커니즘은?"
→ NotebookLM이 업로드된 10개 논문에서 "NCM811", "degradation", "mechanism" 관련 문장 검색
→ 유사도 높은 문단 5~10개 추출
```

**Step 2: 컨텍스트 생성**
```
검색된 문단 5개:
1. [논문 A, 3페이지] "NCM811 cathodes suffer from surface degradation..."
2. [논문 B, 7페이지] "SEI layer growth is the primary mechanism..."
3. [논문 C, 12페이지] "Structural collapse occurs after 500 cycles..."
...
```

**Step 3: 답변 생성 + 출처 명시**
```
NotebookLM 답변:
"NCM811의 주요 열화 메커니즘은 3가지입니다:
1. SEI 층 성장 (논문 B, 7페이지)
2. 표면 열화 (논문 A, 3페이지)
3. 구조적 붕괴 (논문 C, 12페이지)"

[출처 패널에 논문 B, A, C의 해당 페이지 링크 표시]
```

---

#### NotebookLM vs 일반 AI 비교

| 항목 | NotebookLM | ChatGPT/Claude/Gemini |
|------|-----------|---------------------|
| 지식 출처 | 업로드 자료만 | 학습 데이터 전체 |
| 할루시네이션 | 없음 (출처 명시) | 있음 (검증 필요) |
| 출처 표시 | 자동 (페이지 번호) | 없음 (사용자 요청 시 일부) |
| 최신 정보 | 업로드 시점 기준 | 학습 시점 기준 (컷오프) |
| 파일 형식 | PDF, 웹링크, 구글독스, 유튜브 | 텍스트 복붙 또는 파일 업로드 제한적 |
| 팟캐스트 | 지원 (2인 대화 형식) | 미지원 |

---

### Section 03: 논문 업로드 방법 (10~18분)

#### NotebookLM 접속 및 초기 설정

**접속**:
```
1. 브라우저에서 notebooklm.google.com 접속
2. Google 계정으로 로그인
3. "New Notebook" 클릭
4. 노트북 이름 입력 (예: "배터리 연구 2025")
```

**화면 구성**:
- **왼쪽 패널**: 업로드된 소스 목록 (Sources)
- **중앙 패널**: 채팅 인터페이스 (질문 입력 → 답변)
- **오른쪽 패널**: 출처 표시 (Citations) - 클릭 시 원문으로 이동

---

#### 업로드 방법 1: PDF 파일

**Step 1: Add Source 클릭**
```
왼쪽 패널 상단 "Add Source" 버튼 클릭
"Upload" 옵션 선택
```

**Step 2: PDF 파일 선택**
```
로컬 컴퓨터에서 PDF 파일 선택
예: Li_Ion_Battery_Degradation_2025.pdf (10MB, 15페이지)
업로드 시간: 약 30초~1분
```

**Step 3: 인덱싱 대기**
```
NotebookLM이 PDF 텍스트 추출 및 인덱싱
진행 표시줄: "Processing..."
완료 시 왼쪽 패널에 파일 이름 표시
```

**제한 사항**:
- 파일 크기: 최대 50MB
- 페이지 수: 최대 500페이지
- 이미지 전용 PDF: OCR 자동 실행 (정확도 90%)

---

#### 업로드 방법 2: 웹 링크

**Step 1: Add Source → Web Link**
```
"Add Source" → "Web Link" 선택
URL 입력창 표시
```

**Step 2: 논문 URL 복사/붙여넣기**

**arXiv 논문**:
```
URL: https://arxiv.org/abs/2501.12345
NotebookLM이 PDF 자동 다운로드 및 인덱싱
```

**PubMed 논문**:
```
URL: https://pubmed.ncbi.nlm.nih.gov/38123456/
NotebookLM이 초록 + 본문 링크 추출
```

**Nature/Science 논문**:
```
URL: https://www.nature.com/articles/s41586-025-12345-6
제한: 오픈액세스만 전문 추출 (유료 논문은 초록만)
```

**Step 3: 자동 인덱싱**
```
URL 입력 후 "Add" 클릭
NotebookLM이 웹페이지 크롤링 및 텍스트 추출
완료 시 왼쪽 패널에 제목 표시
```

---

#### 업로드 방법 3: 구글 문서 연동

**Step 1: Add Source → Google Docs**
```
"Add Source" → "Google Docs" 선택
Google Drive 파일 목록 표시
```

**Step 2: 실험 보고서 선택**
```
예: "NCM811 코팅 실험 보고서 2025-05-10.docx"
또는 Google Docs 형식 문서 선택
```

**Step 3: 실시간 동기화**
```
구글 문서 수정 시 NotebookLM 자동 업데이트
예: 실험 결과 추가 → 즉시 질의응답 가능
```

**장점**:
- 팀 협업 시 모든 팀원이 동일 NotebookLM 공유
- 문서 버전 관리 자동 (Google Docs 히스토리)

---

#### 업로드 방법 4: YouTube 영상 (음성 → 텍스트)

**Step 1: Add Source → YouTube**
```
"Add Source" → "Web Link" 선택
YouTube 영상 URL 입력
```

**Step 2: 자동 자막 추출**
```
예: https://www.youtube.com/watch?v=abc123 (배터리 기술 세미나)
NotebookLM이 YouTube 자막 추출 (영어/한글 자동 감지)
자막 없는 영상: 음성 인식 자동 실행
```

**Step 3: 텍스트로 질의응답**
```
질문: "발표자가 언급한 NCM811의 한계는?"
답변: "발표 23분 30초에서 '코발트 함량 감소로 열 안정성 저하'를 언급했습니다."
```

---

### Section 04: 실습 - 분야별 논문 10개 업로드 (18~30분)

#### 실습 시나리오: 반도체 공정 엔지니어

**목표**: 수율 하락 원인 분석을 위한 논문 10개 업로드

**논문 목록**:
1. **Particle-Induced Defects in Semiconductor Manufacturing** (PDF, 2024)
2. **SPC for Yield Management** (arXiv, 2025)
3. **CVD Process Optimization** (웹링크, Nature)
4. **Lithography Overlay Control** (PDF, 2023)
5. **Etching Profile Uniformity** (구글독스, 실험 보고서)
6. **AOI Image Analysis** (PDF, 2025)
7. **Equipment PM Scheduling** (웹링크, IEEE)
8. **300mm Wafer Handling** (PDF, 2024)
9. **Yield Learning Curves** (arXiv, 2025)
10. **Cleanroom Monitoring** (YouTube, 세미나)

**질문 예제**:

**질문 1: 수율 하락 주요 원인**
```
질문: "반도체 수율이 갑자기 3% 하락했을 때 가장 먼저 확인해야 할 항목은?"

NotebookLM 답변:
"논문 1, 2에 따르면 다음 3가지를 우선 확인합니다:
1. Particle count (클린룸 모니터링 데이터)
   [출처: 논문 1, 5페이지]
2. 장비 PM 일정 준수 여부
   [출처: 논문 7, 12페이지]
3. Recipe 변경 이력 (최근 7일)
   [출처: 논문 2, 18페이지]"
```

**질문 2: CVD 공정 최적화**
```
질문: "CVD 온도와 막 두께의 관계를 설명해주세요."

NotebookLM 답변:
"논문 3에서 실험 결과:
- 380°C: 막 두께 250nm, 균일도 ±3%
- 400°C: 막 두께 280nm, 균일도 ±5%
- 420°C: 막 두께 310nm, 균일도 ±7%

결론: 온도 ↑ → 막 두께 ↑, 균일도 ↓
[출처: 논문 3, Figure 2, 8페이지]"
```

**질문 3: Overlay 불량 원인**
```
질문: "Lithography Overlay 불량이 증가하는 원인은?"

NotebookLM 답변:
"논문 4에서 5가지 원인 제시:
1. Stage drift (열 팽창)
2. 웨이퍼 warpage (휨)
3. Reticle 오염
4. 정렬 마크 손상
5. 노광 시간 변화

[출처: 논문 4, Table 1, 6페이지]"
```

---

#### 실습 시나리오: 디스플레이 공정 엔지니어

**목표**: OLED/LCD 기술 비교 및 불량 분석 논문 10개

**논문 목록**:
1. **OLED vs LCD: Comparative Analysis** (PDF, 2025)
2. **Inkjet Printing for OLED** (arXiv, 2024)
3. **Mura Defect Classification** (PDF, 2025)
4. **TFT Array Process** (웹링크, Nature)
5. **Color Gamut Optimization** (구글독스, 실험)
6. **Burn-in Prevention** (PDF, 2024)
7. **QD-OLED Technology** (YouTube, 기술 발표)
8. **PenTile vs RGB Stripe** (PDF, 2023)
9. **Luminance Uniformity** (arXiv, 2025)
10. **Encapsulation Materials** (웹링크, SID)

**질문 예제**:

**질문 1: OLED vs LCD 구조 차이**
```
질문: "OLED와 LCD의 구조적 차이를 3줄로 요약해주세요."

NotebookLM 답변:
"논문 1에 따르면:
1. LCD: 백라이트 + 액정 + 컬러필터 (3층 구조)
2. OLED: 유기 발광층만 (자체 발광, 2층 구조)
3. OLED가 얇고 가벼우며 명암비 우수

[출처: 논문 1, Figure 1, 3페이지]"
```

**질문 2: Mura 불량 원인**
```
질문: "OLED에서 Mura 불량이 발생하는 이유는?"

NotebookLM 답변:
"논문 3에서 4가지 원인 제시:
1. TFT 증착 불균일 (온도 분포)
2. 유기층 두께 편차 (증착 속도)
3. 전압 강하 (배선 저항)
4. 픽셀 구동 회로 편차

[출처: 논문 3, Section 2.3, 7페이지]"
```

---

#### 실습 시나리오: 배터리 R&D 엔지니어

**목표**: 리튬이온 배터리 열화 메커니즘 논문 10개

**논문 목록**:
1. **NCM811 Degradation Mechanisms** (PDF, 2025)
2. **SEI Layer Formation** (arXiv, 2024)
3. **Lithium Plating Analysis** (PDF, 2025)
4. **Cathode Structural Collapse** (웹링크, Nature Energy)
5. **Al2O3 Coating Effects** (구글독스, 실험)
6. **Fast Charging Protocols** (PDF, 2024)
7. **Electrolyte Additives** (YouTube, 연구 발표)
8. **Capacity Fade Prediction** (PDF, 2025)
9. **Thermal Runaway Prevention** (arXiv, 2024)
10. **Solid-State Batteries** (웹링크, Science)

**질문 예제**:

**질문 1: NCM811 주요 열화 메커니즘**
```
질문: "NCM811 양극의 주요 열화 메커니즘 3가지는?"

NotebookLM 답변:
"논문 1에서 3가지 메커니즘 제시:
1. SEI 층 지속 성장 (리튬 소모)
   - 초기 100 사이클에서 지배적
   [출처: 논문 1, 5페이지]
2. 리튬 석출 (급속 충전 시)
   - 100~500 사이클 복합 영향
   [출처: 논문 3, 8페이지]
3. 양극 구조 붕괴 (격자 변형)
   - 500 사이클 이상 가속
   [출처: 논문 4, 12페이지]"
```

**질문 2: 코팅 효과**
```
질문: "Al2O3 코팅이 용량 유지율에 미치는 영향은?"

NotebookLM 답변:
"논문 5 실험 결과:
- 코팅 없음: 500 사이클 후 용량 유지율 78%
- Al2O3 5nm: 500 사이클 후 용량 유지율 89%
- Al2O3 10nm: 500 사이클 후 용량 유지율 92%

결론: 코팅 두께 ↑ → 용량 유지율 ↑ (부작용: 이온 전도도 ↓)
[출처: 논문 5, Figure 3, 11페이지]"
```

---

#### 실습 시나리오: 바이오 메디컬 연구원

**목표**: 단백질 구조 예측 및 결정화 논문 10개

**논문 목록**:
1. **AlphaFold3 Architecture** (PDF, 2025)
2. **Protein Crystallization Techniques** (arXiv, 2024)
3. **Lysozyme Structure** (PDF, 2023)
4. **Cryo-EM vs X-ray** (웹링크, Nature)
5. **Membrane Protein Challenges** (구글독스, 실험)
6. **Drug Target Identification** (PDF, 2025)
7. **PEG Screening** (YouTube, 실험 프로토콜)
8. **Phase Diagram** (PDF, 2024)
9. **Vapor Diffusion Method** (arXiv, 2025)
10. **Protein Purification** (웹링크, Cell)

**질문 예제**:

**질문 1: AlphaFold 예측 원리**
```
질문: "AlphaFold3가 단백질 구조를 예측하는 핵심 원리는?"

NotebookLM 답변:
"논문 1에 따르면 4단계:
1. MSA (Multiple Sequence Alignment) 생성
   - 진화 정보 추출
2. 주의 메커니즘 (Attention) 적용
   - 아미노산 간 상호작용 학습
3. 3D 좌표 예측
   - Transformer 구조
4. 물리적 제약 조건 적용
   - 결합 거리, 각도

[출처: 논문 1, Figure 2, 6페이지]"
```

**질문 2: 결정화 실패 원인**
```
질문: "Lysozyme 결정화 실패 시 체크할 항목은?"

NotebookLM 답변:
"논문 2, 7에서 5가지 체크리스트:
1. 단백질 순도 (<95%는 실패 확률 높음)
2. Precipitant 농도 (PEG 8000 기준 25~35%)
3. pH 범위 (Lysozyme은 pH 4.0~5.5 최적)
4. 온도 (20°C ± 2°C 유지)
5. 잔여 염 제거 (투석 필수)

[출처: 논문 2, Table 2, 9페이지 / 논문 7, 3분 30초]"
```

---

### Section 05: 오디오 팟캐스트 생성 (30~35분)

#### 팟캐스트 기능 개요

**핵심 개념**:
> "NotebookLM은 업로드한 논문을 2인 대화 형식의 오디오 팟캐스트로 자동 변환합니다. 출퇴근길이나 운동 중 논문을 '들을' 수 있습니다."

**생성 원리**:
```
1. NotebookLM이 업로드된 논문 전체 내용 요약
2. 핵심 주제 3~5개 추출
3. 2명의 진행자 (Host A, Host B) 대화 스크립트 생성
4. TTS (Text-to-Speech)로 음성 합성
5. 5~15분 분량의 MP3 파일 생성
```

**팟캐스트 특징**:
- **자연스러운 대화**: "어, 그러니까...", "흥미롭네요" 등 구어체
- **질문-답변 형식**: Host A가 질문 → Host B가 설명
- **핵심 요약**: 논문 전체를 5분으로 압축
- **다운로드 가능**: MP3 파일로 저장 후 오프라인 청취

---

#### 팟캐스트 생성 3단계

**Step 1: Generate Audio 버튼 클릭**
```
NotebookLM 우측 상단 "Generate Audio" 버튼 클릭
소스 선택: 1개 논문 or 전체 노트북
생성 옵션: "Deep Dive" (상세) or "Overview" (개요)
```

**Step 2: 생성 대기 (2~3분)**
```
진행 표시줄: "Generating podcast..."
예상 시간: 논문 15페이지 기준 2~3분
```

**Step 3: 재생 및 다운로드**
```
재생: 브라우저 내 오디오 플레이어
다운로드: MP3 파일 (5~15MB)
공유: 링크 생성 가능 (팀원과 공유)
```

---

#### 팟캐스트 실습: 배터리 논문

**논문 선택**:
```
제목: "NCM811 Degradation Mechanisms"
페이지: 15페이지
저자: Kim et al., 2025
```

**팟캐스트 생성**:
```
"Generate Audio" 클릭
옵션: "Deep Dive" (상세 분석)
생성 시간: 2분 30초
출력: 8분 23초 MP3 파일
```

**팟캐스트 내용 예시 (대본)**:
```
Host A: 안녕하세요, 오늘은 NCM811 배터리 열화 메커니즘을 다룬 논문을 살펴볼게요.

Host B: 네, 이 논문은 2025년 Journal of Power Sources에 실린 Kim 박사팀의 연구입니다.

Host A: NCM811이 뭔가요?

Host B: 니켈, 코발트, 망간 비율이 8:1:1인 양극 재료입니다. 고에너지 밀도가 장점이지만 열화가 빠르다는 단점이 있어요.

Host A: 주요 열화 메커니즘은?

Host B: 논문에서 3가지를 제시했습니다. 첫째, SEI 층 성장으로 리튬이 소모됩니다. 초기 100 사이클에서 지배적이에요.

Host A: 흥미롭네요. 둘째는?

Host B: 리튬 석출입니다. 급속 충전 시 음극 표면에 금속 리튬이 쌓이는데, 이게 단락을 유발할 수 있어요.

Host A: 위험하네요. 셋째는?

Host B: 양극 구조 붕괴입니다. 500 사이클 이상 반복하면 결정 격자가 변형되면서 용량이 급격히 줄어듭니다.

Host A: 대응 방안은?

Host B: 논문에서 Al2O3 코팅을 제안했습니다. 10nm 두께로 코팅하면 용량 유지율이 78%에서 92%로 향상됩니다.

Host A: 코팅이 핵심이군요. 이 연구의 한계는?

Host B: 실온 조건만 테스트했고, 고온이나 저온 환경은 다루지 않았습니다.

Host A: 후속 연구가 필요하겠네요. 오늘 논문 요약은 여기까지입니다!
```

---

#### 팟캐스트 활용 사례

**사례 1: 출퇴근 학습**
```
시나리오: 지하철 40분 통근 시간
활용: 논문 3편 팟캐스트 (각 8분 × 3 = 24분)
효과: 주 5일 = 주당 논문 15편 청취 → 월 60편
```

**사례 2: 팀 미팅 준비**
```
시나리오: 오후 3시 기술 회의, 논문 3편 사전 리뷰 필요
활용: 팟캐스트 1.5배속 재생 (각 5분 × 3 = 15분)
효과: 회의 30분 전 핵심 내용 파악 → 토론 참여도 향상
```

**사례 3: 신입 교육**
```
시나리오: 신입 엔지니어 온보딩 (공정 개요 학습)
활용: 핵심 논문 10편 팟캐스트 플레이리스트 제공
효과: 텍스트 읽기 부담 감소 → 학습 동기 유지
```

---

### Section 06: 정리 및 검증 (35~40분)

#### 완성 체크리스트

**NotebookLM 설정**:
- [ ] notebooklm.google.com 접속 및 로그인 완료
- [ ] New Notebook 생성 (프로젝트명 입력)
- [ ] 화면 구성 이해 (소스/채팅/출처 패널)

**논문 업로드**:
- [ ] PDF 파일 업로드 1개 이상 완료
- [ ] 웹 링크 (arXiv/PubMed) 추가 1개 이상
- [ ] 구글 문서 연동 (선택 사항)
- [ ] 총 10개 소스 업로드 완료

**질의응답**:
- [ ] 첫 질문 입력 및 답변 받기
- [ ] 출처 패널에서 참조 페이지 확인
- [ ] 3개 이상 질문하여 할루시네이션 없음 검증

**오디오 팟캐스트**:
- [ ] Generate Audio 버튼 클릭
- [ ] 팟캐스트 생성 완료 (5~15분)
- [ ] 재생 및 다운로드 확인

---

#### NotebookLM 활용 전략

**전략 1: 주제별 노트북 분리**
```
노트북 1: "배터리 열화 메커니즘" (논문 10개)
노트북 2: "OLED 불량 분석" (논문 8개)
노트북 3: "반도체 수율 최적화" (논문 12개)
노트북 4: "단백질 결정화" (논문 9개)
```

**전략 2: 정기 업데이트**
```
주 1회: 최신 논문 3개 추가
월 1회: 오래된 논문 제거 (2년 이상)
분기 1회: 팟캐스트 재생성 (최신 자료 반영)
```

**전략 3: 팀 공유**
```
NotebookLM 링크 공유 → 팀원 모두 동일 지식 베이스 접근
질의응답 기록 저장 → 팀 FAQ 자동 생성
팟캐스트 플레이리스트 → 신입 교육 자료
```

---

#### 다음 강의 예고: 13강 픽셀 구조 시각화

**미리보기**:
> "12강에서 NotebookLM으로 논문 지식을 마스터했습니다. 13강에서는 디스플레이 픽셀 구조를 시각화합니다. RGB 서브픽셀, PenTile 배열, PPI 계산을 Gemini API와 Streamlit으로 구현합니다."

**13강 핵심 기술**:
- **RGB 픽셀 배열**: 빨강/초록/파랑 서브픽셀 시각화
- **PenTile vs RGB Stripe**: 삼성 OLED vs 애플 LCD 구조 비교
- **PPI 계산기**: 해상도/대각선 입력 → 픽셀 밀도 출력
- **Streamlit 슬라이더**: 픽셀 개수 조정 → 실시간 렌더링
- **Matplotlib/Plotly**: 픽셀 구조 그래프 생성

**13강 결과물**:
- `pixel_simulator.py` (Streamlit 앱)
- RGB Stripe vs PenTile 비교 이미지
- PPI 계산기 기능

---

## 핵심 메시지

> "NotebookLM은 할루시네이션 없는 개인 연구 비서입니다. 논문 10개를 업로드하면 출처를 명시하며 정확하게 답변하고, 팟캐스트로 변환하여 언제 어디서나 학습할 수 있습니다."

---

## 결과물

1. **NotebookLM 노트북**: 논문 10개 업로드 완료
2. **질의응답 기록**: 분야별 핵심 질문 5개 + 답변
3. **오디오 팟캐스트**: 5~15분 MP3 파일
4. **출처 목록**: 참고 논문 제목, 저자, 페이지 번호
5. **FAQ 문서**: 자주 묻는 질문 정리 (팀 공유용)

---

## 추가 학습 자료

- **NotebookLM 공식 사이트**: https://notebooklm.google.com
- **NotebookLM 가이드**: https://support.google.com/notebooklm
- **논문 검색**:
  - arXiv: https://arxiv.org (컴퓨터과학, 물리학)
  - PubMed: https://pubmed.ncbi.nlm.nih.gov (생명과학)
  - IEEE Xplore: https://ieeexplore.ieee.org (공학)
  - Nature: https://www.nature.com (종합 과학)
  - Science: https://www.science.org (종합 과학)

---

## 분야별 추천 논문 키워드

### 반도체
- "semiconductor yield", "particle defect", "SPC", "CVD optimization", "lithography overlay", "etching uniformity", "cleanroom", "wafer handling"

### 디스플레이
- "OLED degradation", "LCD vs OLED", "Mura defect", "Inkjet printing", "TFT array", "color gamut", "luminance uniformity", "encapsulation"

### 배터리
- "lithium-ion battery", "NCM811", "SEI layer", "lithium plating", "capacity fade", "thermal runaway", "solid-state battery", "fast charging"

### 바이오
- "AlphaFold", "protein crystallization", "cryo-EM", "X-ray diffraction", "membrane protein", "drug target", "PEG screening", "purification"

---

작성 완료: 2026-05-16

**총 라인 수**: 약 1,020 라인
**타겟 시간**: 40분 강의 분량
**분야 균형**: 반도체 / 디스플레이 / 배터리 / 바이오 각 25%
