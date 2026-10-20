/* Static browser application. No server or API key required. */
(function () {
  'use strict';
  const app = document.getElementById('app');
  const storageKey = 'listening-studio-v1';
  const G = window.Grading;
  let records = {}, current = null, toastTimer;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const fmt = n => Number(n).toLocaleString('vi-VN', { maximumFractionDigits: 2 });
  try { const stored = JSON.parse(localStorage.getItem(storageKey) || '{}'); if (stored && typeof stored === 'object') for (const exam of EXAMS) { const r = stored[exam.id]; if (r && ['part1','part2','result'].includes(r.stage) && Array.isArray(r.answers) && r.answers.length === 2 && r.answers.every(a => Array.isArray(a) && a.length === 10 && a.every(v => typeof v === 'string')) && r.overrides && typeof r.overrides === 'object') records[exam.id] = r; } } catch { /* Storage unavailable or corrupt: start clean. */ }
  function notify(message) { const t = document.getElementById('toast'); t.textContent = message; t.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('visible'), 4000); }
  function save() { try { localStorage.setItem(storageKey, JSON.stringify(records)); } catch { notify('Trình duyệt không lưu được bài. Hãy giữ tab này mở đến khi nộp.'); } }
  function stopAudio() { document.querySelectorAll('audio').forEach(a => a.pause()); }
  function scrollTop() { window.scrollTo({ top: 0, behavior: 'instant' }); }
  function confirmAction(title, description, button, action) {
    const dialog = document.getElementById('confirm-dialog');
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-description').textContent = description;
    document.getElementById('confirm-action').textContent = button;
    dialog.onclose = () => { if (dialog.returnValue === 'confirm') action(); };
    dialog.returnValue = 'cancel'; dialog.showModal();
  }
  function scoreExam(exam, record) {
    return exam.parts.map((p, pi) => p.questions.map((q, qi) => {
      const result = pi === 0 ? G.gradeBlank(record.answers[pi][qi], q) : G.gradeNote(record.answers[pi][qi], q);
      const override = record.overrides[`${pi}-${qi}`];
      return { ...result, autoScore: result.score, score: pi === 1 && [0, .25, .5].includes(override) ? override : result.score, overridden: pi === 1 && [0, .25, .5].includes(override) };
    }));
  }
  function totalScore(scores) { return scores.flat().reduce((sum, r) => sum + r.score, 0); }
  function home() {
    stopAudio(); current = null;
    app.innerHTML = `<section class="intro"><div><span class="eyebrow">YOUR LISTENING WORKSPACE</span><h1>Mỗi lần nghe, thêm một bước tiến.</h1><p>Luyện giữa kỳ với 4 đề mới. Nghe kỹ, ghi đúng, hiểu ý.</p></div><span class="pill">20 câu · 2 parts · 10 điểm</span></section>
      <div class="workspace"><section><div class="section-heading"><h2>Chọn đề luyện tập</h2><span class="small muted">Độ khó tăng dần 01–04</span></div><div class="exam-grid">${EXAMS.map(e => {
        const r = records[e.id], submitted = r?.stage === 'result';
        return `<article class="exam-card"><div class="card-top"><span class="exam-number">${e.id}</span><span class="difficulty">${e.difficulty}</span></div><h3>${e.title}</h3><span class="card-subtitle">${e.subtitle}</span><p>${e.description}</p><div class="card-meta"><span>Topics ${e.topics.join(' & ')}</span><span>${e.pace}</span></div><div class="card-actions"><button class="button ${e.id === '01' ? 'primary' : 'secondary'}" data-action="open" data-id="${e.id}">${submitted ? `Xem kết quả · ${fmt(totalScore(scoreExam(e,r)))}/10` : r ? 'Tiếp tục làm bài' : 'Làm đề này'}</button>${r ? `<button class="text-button" data-action="restart" data-id="${e.id}">Làm lại</button>` : ''}</div></article>`;
      }).join('')}</div><div class="notice"><strong>Không cần tài khoản.</strong> Bài đang làm được lưu trên trình duyệt này. Audio tiếng Anh được tạo riêng cho từng đề; các tình huống và số liệu là giả định để luyện nghe. Bạn có thể nghe lại trong lúc làm bài.</div></section>
      <aside><section class="guide"><span class="eyebrow">THE MIDTERM FORMAT</span><h2>Hai phần.<br>Một mục tiêu.</h2><div class="score-line"><span>Part 1 · Fill in the blanks</span><strong>5.0</strong></div><div class="score-line"><span>Part 2 · Note-taking</span><strong>5.0</strong></div><div class="score-line"><span>Tổng điểm</span><strong class="total">10.0</strong></div><ol class="flow"><li>Điền 10 câu, mỗi ô 1–3 từ.</li><li>Xác nhận hoàn thành Part 1.</li><li>Ghi chú 10 câu ở Part 2.</li><li>Nộp bài để xem điểm & transcript.</li></ol></section><section class="topic-box"><h3>Phạm vi 8 topic đầu</h3><ol class="topic-list">${TOPICS.map(t => `<li>${t}</li>`).join('')}</ol><a class="source-link" target="_blank" rel="noopener" href="https://ilob-olbi.juliencouturecentre.ca/cgi-bin/koha/opac-detail.pl?biblionumber=885">Đối chiếu mục lục · Level 2, 4th edition</a></section></aside></div>`;
    scrollTop();
  }
  function openExam(id, restart = false) {
    const exam = EXAMS.find(e => e.id === id); if (!exam) return;
    stopAudio(); current = exam;
    if (restart || !records[id]) records[id] = { stage: 'part1', answers: [Array(10).fill(''), Array(10).fill('')], overrides: {} };
    save(); renderExam(); scrollTop();
  }
  const audio = (exam, pi) => `<div class="audio-box"><div class="audio-header"><span>♫ Audio ${exam.id} · Part ${pi+1}</span><span class="small muted">${exam.voice.replace('Neural','')} · ${exam.pace}</span></div><audio controls preload="metadata" aria-label="Audio đề ${exam.id} Part ${pi+1}"><source src="audio/exam-${exam.id}-part-${pi+1}.mp3" type="audio/mpeg"></audio><p class="audio-error" hidden>Không tải được audio. Kiểm tra thư mục audio hoặc mở website bằng máy chủ cục bộ theo README.</p></div>`;
  function attachAudioErrors() { app.querySelectorAll('audio').forEach(a => { const fail = () => { a.parentElement.querySelector('.audio-error').hidden = false; }; a.addEventListener('error', fail); a.querySelector('source').addEventListener('error', fail); }); }
  function renderExam() {
    const r = records[current.id]; if (r.stage === 'result') return renderResults();
    const pi = r.stage === 'part1' ? 0 : 1, part = current.parts[pi];
    app.innerHTML = `<button class="text-button" data-action="home">Về danh sách đề</button><section class="intro" style="margin-top:22px"><div><span class="eyebrow">ĐỀ ${current.id} · ${current.difficulty.toUpperCase()}</span><h1>${current.title}</h1><p>${part.topic}</p></div><span class="pill">Mỗi câu 0,5 điểm</span></section><ol class="steps" aria-label="Tiến trình"><li class="${pi===0?'active':'done'}" ${pi===0?'aria-current="step"':''}>01 · Fill in the blanks${pi===1?' · Đã khóa':''}</li><li class="${pi===1?'active':''}" ${pi===1?'aria-current="step"':''}>02 · Note-taking</li><li>03 · Kết quả</li></ol>
      <div class="workspace"><section class="paper"><span class="eyebrow">PART ${pi+1} / 2</span><h2>${part.title}</h2><div class="instructions">${pi===0 ? 'Nghe và điền <strong>1–3 từ hoặc số</strong> vào mỗi ô. Từ có gạch nối tính là một từ. Chú ý spelling, dấu gạch nối, số, thập kỷ và in/on/at.' : 'Nghe và ghi chú <strong>bằng tiếng Anh</strong>. Không cần câu đầy đủ; có thể dùng từ đồng nghĩa hoặc viết tắt thông dụng. Mỗi câu có 2 nhóm ý, mỗi nhóm 0,25 điểm.'}</div>${audio(current,pi)}<form id="answer-form" autocomplete="off" spellcheck="false">${part.questions.map((q,i) => `<div class="question" id="q-${i}"><span class="question-num">${i+1}</span><div><label for="answer-${i}">${q.prompt}</label>${pi===0?`<input class="answer" id="answer-${i}" data-index="${i}" value="${esc(r.answers[pi][i])}" placeholder="Điền đáp án…" maxlength="150" aria-describedby="meta-${i}">`:`<textarea class="answer" id="answer-${i}" data-index="${i}" placeholder="Ghi ý chính của bạn…" maxlength="1200">${esc(r.answers[pi][i])}</textarea>`}${pi===0?`<div class="question-meta" id="meta-${i}"><span>1–3 từ / số</span><span data-count="${i}">${G.words(r.answers[pi][i])}/3 từ</span></div>`:''}</div></div>`).join('')}</form><div class="bottom-actions"><span class="small muted">${pi===0?'Xác nhận xong sẽ khóa đáp án Part 1.':'Nộp bài để mở đáp án và transcript cả hai phần.'}</span><button class="button primary" data-action="${pi===0?'next':'submit'}">${pi===0?'Hoàn thành Part 1':'Nộp bài & chấm điểm'}</button></div></section><aside class="side-panel"><div class="progress-box"><h3>Tiến độ Part ${pi+1}</h3><span class="small muted" id="answered-label"></span><div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div><div class="question-nav">${part.questions.map((_,i)=>`<button data-action="question" data-index="${i}" aria-label="Đến câu ${i+1}">${i+1}</button>`).join('')}</div><span class="small muted">Màu xanh: đã nhập câu trả lời</span></div><div class="side-tip"><strong>Listen for meaning.</strong><p>${pi===0?'Đọc câu trước khi nghe. Nếu người nói sửa thông tin, hãy chọn thông tin được xác nhận sau cùng.':'Ghi chủ thể, hành động và quan hệ giữa các ý. Các con số riêng lẻ thường chưa đủ để truyền đạt ý chính.'}</p><p>Đáp án và transcript chỉ hiện sau khi nộp cả hai phần.</p></div></aside></div>`;
    app.querySelector('form').addEventListener('submit', e => e.preventDefault());
    attachAudioErrors(); updateProgress();
  }
  function updateProgress() {
    if (!current) return; const r = records[current.id]; if (r.stage === 'result') return;
    const pi = r.stage === 'part1' ? 0 : 1;
    const answered = r.answers[pi].filter(a => a.trim()).length;
    document.getElementById('answered-label').textContent = `${answered}/10 câu đã điền`;
    document.getElementById('progress-fill').style.width = `${answered*10}%`;
    app.querySelectorAll('.question-nav button').forEach((b,i)=>b.classList.toggle('answered',Boolean(r.answers[pi][i].trim())));
    if (!pi) r.answers[pi].forEach((v,i)=> { const count = G.words(v), el=app.querySelector(`[data-count="${i}"]`); el.textContent=`${count}/3 từ${count>3?' · Quá giới hạn':''}`; el.classList.toggle('over-limit',count>3); document.getElementById(`answer-${i}`).setAttribute('aria-invalid',String(count>3)); });
  }
  function renderResults() {
    stopAudio(); const r=records[current.id], scores=scoreExam(current,r);
    const sums=scores.map(part=>part.reduce((s,q)=>s+q.score,0)), adjusted=scores[1].filter(q=>q.overridden).length;
    app.innerHTML=`<button class="text-button" data-action="home">Về danh sách đề</button><section class="intro" style="margin-top:22px"><div><span class="eyebrow">ĐỀ ${current.id} · HOÀN THÀNH</span><h1>Nghe lại. Hiểu sâu hơn.</h1><p>${current.title}</p></div><button class="button secondary" data-action="restart" data-id="${current.id}">Làm lại đề này</button></section><section class="results-summary"><div><h2>Kết quả bài luyện tập</h2><p id="score-description">${adjusted?`${adjusted} câu Part 2 đã tự đối chiếu rubric.`:'Điểm gợi ý từ bộ chấm tự động theo từ khóa và nhóm ý.'}</p><div class="score-chips"><span>Part 1: ${fmt(sums[0])}/5</span><span id="part2-score">Part 2: ${fmt(sums[1])}/5</span></div></div><div class="big-score"><span id="total-score">${fmt(sums[0]+sums[1])}</span><small> / 10</small></div></section><div class="notice"><strong>Cách đọc điểm:</strong> Part 1 chấm chính xác, không phân biệt hoa/thường; giữ yêu cầu về spelling và gạch nối. Part 2 dùng rubric gồm 2 nhóm ý và từ đồng nghĩa, chưa phải AI hiểu toàn bộ ngữ nghĩa. Câu phủ định được chuyển sang kiểm tra lại. Nếu cách diễn đạt đúng ý nhưng chưa được nhận diện, đối chiếu transcript và tự điều chỉnh 0 / 0,25 / 0,5. Cả câu mâu thuẫn với nội dung nghe nên được chấm 0.</div>
      ${current.parts.map((p,pi)=>`<section class="paper review-part"><span class="eyebrow">PART ${pi+1} · ${p.topic.toUpperCase()}</span><h2>${p.title}</h2>${audio(current,pi)}<details><summary>Xem transcript Part ${pi+1}</summary><div class="transcript" lang="en">${esc(p.transcript)}</div></details><div style="margin-top:22px">${p.questions.map((q,qi)=>{
        const result=scores[pi][qi], score=result.score, status=score===.5?'correct':score===0?'incorrect':'partial';
        return `<article class="review-question" id="review-${pi}-${qi}"><h3><strong>${qi+1}.</strong> ${q.prompt}</h3><div class="review-answer"><span class="status ${status}" data-score-label="${pi}-${qi}">${fmt(score)} / 0,5</span><span class="muted">Bạn trả lời:</span> ${esc(r.answers[pi][qi])||'<em>Để trống</em>'}</div><p class="review-answer"><strong>${pi===0?'Đáp án':'Ý chính mẫu'}:</strong> ${esc(pi===0?q.answers[0]:q.answer)}</p>${pi===0?`<p class="rubric"><strong>${q.trap}:</strong> ${q.explanation}${result.tooLong?' Câu trả lời của bạn vượt quá 3 từ.':''}${q.answers.length>1?`<br>Cũng chấp nhận: ${q.answers.slice(1).map(esc).join(' · ')}`:''}</p>`:`<div class="rubric">Hai nhóm ý · mỗi nhóm 0,25 điểm:<br>${q.concepts.map((c,ci)=>`<span class="rubric-item ${result.matched[ci]?'matched':''}">${result.matched[ci]?'✓':'○'} ${c.map(esc).join(' / ')}</span>`).join('')}${result.needsReview?`<p>${result.negative?'Có từ phủ định: cần đọc lại cả ý trước khi cho điểm.':'Chưa nhận diện đủ ý. Bạn có thể đối chiếu cách diễn đạt với transcript.'}</p>`:''}</div><label class="manual">Tự đối chiếu điểm:<select data-override="${pi}-${qi}" aria-label="Điểm tự đối chiếu Part 2 câu ${qi+1}"><option value="auto" ${!result.overridden?'selected':''}>Tự động (${fmt(result.autoScore)})</option>${[0,.25,.5].map(s=>`<option value="${s}" ${result.overridden&&score===s?'selected':''}>${fmt(s)} điểm</option>`).join('')}</select><span data-adjusted="${pi}-${qi}">${result.overridden?'Đã tự điều chỉnh':''}</span></label>`}</article>`;
      }).join('')}</div></section>`).join('')}<div class="result-actions"><button class="button primary" data-action="home">Chọn đề tiếp theo</button><button class="button secondary" data-action="restart" data-id="${current.id}">Làm lại đề này</button></div>`;
    attachAudioErrors();
  }
  app.addEventListener('input', event=>{
    const index=event.target.dataset.index; if(index===undefined||!current||!event.target.classList.contains('answer'))return;
    const r=records[current.id]; if(r.stage==='result')return;
    r.answers[r.stage==='part1'?0:1][Number(index)]=event.target.value;
    save(); updateProgress();
  });
  app.addEventListener('change', event=>{
    const key=event.target.dataset.override; if(!key||!current)return;
    const r=records[current.id]; if(r.stage!=='result')return;
    if(event.target.value==='auto')delete r.overrides[key];else r.overrides[key]=Number(event.target.value);
    save(); const scores=scoreExam(current,r),[pi,qi]=key.split('-').map(Number), result=scores[pi][qi];
    document.getElementById('total-score').textContent=fmt(totalScore(scores));
    document.getElementById('part2-score').textContent=`Part 2: ${fmt(scores[1].reduce((s,q)=>s+q.score,0))}/5`;
    const label=app.querySelector(`[data-score-label="${key}"]`);label.textContent=`${fmt(result.score)} / 0,5`;label.className=`status ${result.score===.5?'correct':result.score===0?'incorrect':'partial'}`;
    app.querySelector(`[data-adjusted="${key}"]`).textContent=result.overridden?'Đã tự điều chỉnh':'';
    const count=scores[1].filter(q=>q.overridden).length;document.getElementById('score-description').textContent=count?`${count} câu Part 2 đã tự đối chiếu rubric.`:'Điểm gợi ý từ bộ chấm tự động theo từ khóa và nhóm ý.';
  });
  app.addEventListener('click', event=>{
    const b=event.target.closest('[data-action]');if(!b)return;
    const action=b.dataset.action;
    if(action==='home')home();
    if(action==='open')openExam(b.dataset.id);
    if(action==='restart')confirmAction('Bắt đầu lại đề này?', 'Câu trả lời và điểm đang lưu của đề này sẽ được thay bằng bài mới.', 'Bắt đầu lại', ()=>openExam(b.dataset.id,true));
    if(action==='question'){const el=document.getElementById(`answer-${b.dataset.index}`);el.focus({preventScroll:true});el.scrollIntoView({behavior:'smooth',block:'center'});}
    if(action==='next'||action==='submit'){
      const r=records[current.id],pi=r.stage==='part1'?0:1;
      if((action==='next'&&pi!==0)||(action==='submit'&&pi!==1)||r.stage==='result')return;
      const blanks=r.answers[pi].filter(v=>!v.trim()).length;
      const long=pi===0?r.answers[0].filter(v=>G.words(v)>3).length:0;
      confirmAction(action==='next'?'Hoàn thành Part 1?':'Nộp bài để chấm điểm?',`${blanks?`Bạn còn ${blanks} câu trống. `:'Bạn đã điền cả 10 câu. '}${long?`${long} câu vượt 3 từ và sẽ không được điểm. `:''}${action==='next'?'Sau khi xác nhận, Part 1 sẽ bị khóa và bạn chuyển sang Part 2.':'Sau khi nộp, câu trả lời cả hai phần sẽ bị khóa. Đáp án, rubric và transcript sẽ được mở.'}`,action==='next'?'Xác nhận & sang Part 2':'Nộp bài',()=>{stopAudio();r.stage=action==='next'?'part2':'result';save();renderExam();scrollTop();});
    }
  });
  // Optional browser capability, read-only: never exposes answers before submission.
  if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'read_listening_progress',description:'Read the visible listening practice stage and answered count. Does not reveal answer keys.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>{if(!current)return{stage:'exam_list'};const r=records[current.id];return{exam:current.id,stage:r.stage,answered:r.answers.map(p=>p.filter(a=>a.trim()).length)};}})).catch(()=>{});}catch{}}
  home();
})();
