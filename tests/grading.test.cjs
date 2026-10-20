const { test } = require('node:test');
const assert = require('node:assert/strict');
const G = require('../grading.js');
const exams = require('../data.js');

test('Four exams, exact 20-question structure, all eight topics', () => {
  assert.equal(exams.length, 4);
  assert.deepEqual(exams.flatMap(e => e.topics), [1,2,3,4,5,6,7,8]);
  for (const e of exams) {
    assert.equal(e.parts.length, 2);
    for (const p of e.parts) assert.equal(p.questions.length, 10);
    for (const q of e.parts[0].questions) for (const a of q.answers) {
      assert.ok(G.words(a) <= 3, a);
      assert.equal(G.gradeBlank(a, q).score, .5, a);
    }
    assert.ok(e.parts[1].questions.every(q => q.concepts.length === 2));
  }
});
test('Strict spelling and compound adjectives; case and punctuation normalised', () => {
  const q = exams[0].parts[0].questions[4];
  assert.equal(G.gradeBlank(' HIGH-DENSITY. ', q).score, .5);
  assert.equal(G.gradeBlank('high density', q).score, 0);
  assert.equal(G.gradeBlank('high-dencity', q).score, 0);
  assert.equal(G.gradeBlank('a very high-density area', q).score, 0);
  assert.equal(G.gradeBlank('', q).score, 0);
});
test('Number variants accepted; distractors rejected', () => {
  const q = exams[0].parts[0].questions[2];
  for (const s of ['15000', '15,000', 'fifteen thousand']) assert.equal(G.gradeBlank(s,q).score,.5);
  assert.equal(G.gradeBlank('50,000',q).score,0);
  assert.equal(G.gradeBlank('1990s',exams[0].parts[0].questions[1]).score,0);
});
test('Part 2 credits synonyms, partial ideas and whole words', () => {
  const q=exams[0].parts[1].questions[0];
  assert.equal(G.gradeNote('Employment; join relatives',q).score,.5);
  assert.equal(G.gradeNote('Looking for jobs',q).score,.25);
  assert.equal(G.gradeNote('homework',q).score,0);
  assert.equal(G.gradeNote('They do not want jobs or family',q).score,0);
  assert.equal(G.gradeNote('They do not want jobs or family',q).needsReview,true);
});
test('All note rubrics can award full credit; total maximum is 10', () => {
  for(const e of exams) {
    let total=5;
    for(const q of e.parts[1].questions) {
      assert.equal(G.gradeNote(q.answer,q).score,.5, q.answer);
      const value=q.concepts.map(c=>c[0]).join('; ');
      const result=G.gradeNote(value,q);
      assert.equal(result.score,.5, value);
      total+=result.score;
    }
    assert.equal(total,10);
  }
});
