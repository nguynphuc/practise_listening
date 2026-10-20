(function (root) {
  'use strict';
  const normalize = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/[‐‑–—]/g, '-').replace(/\s+/g, ' ').trim().replace(/[.!?,;:]+$/g, '');
  const words = value => normalize(value).split(/\s+/).filter(Boolean).length;
  function gradeBlank(value, question) {
    const n = normalize(value);
    return { score: n && words(n) <= 3 && question.answers.some(a => normalize(a) === n) ? .5 : 0, tooLong: words(n) > 3 };
  }
  function phraseMatch(text, phrase) {
    const escaped = normalize(phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '[\\s-]+');
    return new RegExp('(?:^|[^a-z0-9])' + escaped + '(?=$|[^a-z0-9])', 'i').test(text);
  }
  function gradeNote(value, question) {
    const n = normalize(value);
    let negationText = n;
    for (const phrase of question.allowedNegations || []) negationText = negationText.replaceAll(normalize(phrase), '');
    const negative = /\b(no|not|never|isn't|aren't|doesn't|don't|cannot|can't|without)\b/i.test(negationText);
    const matched = question.concepts.map(group => group.some(phrase => phraseMatch(n, phrase)));
    // Conservative local rubric: two idea groups, 0.25 each; negation requires human review.
    const score = negative ? 0 : matched.filter(Boolean).length * (.5 / question.concepts.length);
    return { score, matched, needsReview: Boolean(n) && (negative || score < .5), negative };
  }
  const api = { normalize, words, gradeBlank, gradeNote };
  root.Grading = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
