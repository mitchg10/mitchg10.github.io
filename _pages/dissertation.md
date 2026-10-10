---
title: "Accountable by Design"
permalink: /dissertation/
layout: single
author_profile: true
---

## What Makes AI-Infused Qualitative Research "Good"?

<p class="diss-meta" markdown="1">
PhD Candidate, Engineering Education, Virginia Tech<br>
Committee: Andrew Katz (Chair), David Knight, Nicole Pitterson, Alexandra Werth<br>
Proposal defense: November 2026 · Expected graduation: May 2027
</p>

<div class="diss-hero" role="img" aria-label="Qualitative research expertise frames three manuscripts — transcription as the historical prior, refutable reflexivity as the standard, and a decision-model comparison as the test — converging on accountability by design.">
  <!-- <div class="diss-hero__banner">Qualitative research expertise</div> -->
  <div class="diss-hero__panels">
    <div class="diss-hero__panel"><strong>M1 · The Prior</strong>Transcription and ASR: interpretive choices deferred and obscured</div>
    <div class="diss-hero__panel"><strong>M2 · The Standard</strong>Refutable reflexivity traces and contests claims</div>
    <div class="diss-hero__panel"><strong>M3 · The Test</strong>Decision models vs. prompted LLMs on one codebook</div>
  </div>
  <p class="diss-hero__converge">↓ Converge ↓</p>
  <div class="diss-hero__result">Accountablility by Design</div>
</div>

My research asks how GenAI is changing the way expertise is developed, displayed, recognized, and trusted. My dissertation turns that question on qualitative research itself: when AI systems transcribe, interpret, and code alongside researchers, what does it mean to do qualitative analysis expertly, and how would a reader know?

## At a Glance

<div class="table-scroll" markdown="1">

| | M1 · The historical prior | M2 · The standard | M3 · The test |
|---|---|---|---|
| **Studied** | Fifty years of transcription research; how transcription changes interpretation | How LLM-infused studies account for model interpretations | 34 CS instructors' figurative language for GenAI, sentence by sentence |
| **Built / Tested** | Raw vs. notated transcripts across ASR and LLM models | A vocabulary and visual language, from configured LLM to project-stack | Human, prompted-LLM, and decision-model labels on one codebook |
| **Lesson / Asks** | A three-phase model of transcript production, fixing, and downstream use | Refutable reflexivity: claims traceable to their configuration, and contestable | What traceability and answerability do decision models provide at scale? |

</div>

My dissertation argues that accountability for AI-infused qualitative analysis must be designed in, not assumed of analysts. Qualitative research has always accepted accountability on auditable terms: inter-rater reliability bounds disagreement between coders, and reflexivity admits subjective perspectives so long as analysts account for them. Both assume analysts can justify their decisions, but an AI model asked to explain itself will produce a fluent rationale after the decision rather than explain it. Disciplinary training endeavors to develop the judgment that makes research trustworthy in practitioners, and AI systems now participate in that judgment at every research phase, from transcription to coding. Across three manuscripts, I trace how this happened, propose a standard, and test it.

## Manuscript 1: The Historical Prior

Automatic speech recognition (ASR) entered qualitative research quietly, as a "good enough" and seemingly neutral step, although transcription has long been understood as theory and as politics, and ASR systems hear some voices worse than others. Reviewing fifty years of transcription research, the manuscript argues that ASR does not resolve transcription's interpretive choices so much as defer them to engineers and ghostworkers and obscure them from researchers. Two experimental cases make this obscuring and deferring concrete. First, ASR systems asked to transcribe with notation that marks pauses, overlap, and intonation vary widely and disagree with a human transcriber, revealing hidden standards of "standard" speech. Second, large language models (LLMs) interpret the same exchange differently in raw and Jefferson-notated form, and notation improved interpretation for every model tested, though some questions always fail. From these diverse sources, the critical review closes with a three-phase model (production, fixing, and downstream use) for accountable ASR-based transcription, guiding researchers on what "good" ASR-based transcription looks like when we consider qualitative research for AI systems, rather than AI systems for qualitative research.

*Status:* Submitting to the *International Journal of Qualitative Methods*, October 2026. *With Alexandra Werth and Soyeon Kim.* [Publication page →](/publication/2026-01-06-Voice-or-Speech-Fifty-Years-of-Transcription)

## Manuscript 2: The Standard

Accountable AI-infused qualitative research resembles its pre-AI conceptualizations but transforms as AI enters researchers' interpretive judgments. Conceptualizations of accountability, therefore, must consider how AI enters researchers' judgments and offer avenues to inspect its involvement. However, researchers describe their AI use with such varied terms that "we used AI" tells a reader almost nothing about what a model did. The manuscript supplies a shared vocabulary, from technical and configured LLMs to the phase-instances, phase-stacks, and project-stacks that use them, along with a 12-figure visual language. Building on critical realist accounts of research claims, it proposes refutable reflexivity: every AI-infused claim should be traceable to the configuration that produced it and contestable by someone who did not produce it. Refutability complements disclosure checklists such as GUIDE-LLM rather than replacing them, supplying the judgment a checklist cannot.

*Status:* Submitted to the *International Journal of Qualitative Methods*, September 2026. *With Kylee Shiekh, Andrew Katz, and Benjamin E. Chaback.* [Publication page →](/publication/2026-01-05-Toward-Reflexive-LLM-Infused-Research)

## Manuscript 3: The Test

Applying refutable reflexivity, the manuscript compares three labelers on one deductive coding task: sentence-level segments from interviews with 34 computer science instructors about GenAI, coded with a five-dimension codebook of instructors' figurative language developed in [prior work](/publication/2026-06-01-How-Engineering-Faculty-Metaphors-Construct-GAI-Understanding). I label the segments by hand; prompt-engineered open-source LLMs label them by generating text that must be parsed; and decision models label them by returning a calibrated probability for each researcher-defined option, something to audit rather than a rationale to take on faith. The manuscript asks what traceability and answerability decision models provide that prompted LLMs lack, and how the two compare when scaling a manual classification.

*Status:* Analysis underway; manuscript draft March 2027, targeting *Organizational Research Methods*. *With Andrew Katz.* [Publication page →](/publication/2026-09-30-Problem-With-Prompting)



## Status and Contribution

All models in the dissertation are open source and run locally, so participant data never leave institutional hardware. Together, the manuscripts offer researchers a way to show the work and judgment behind AI-infused claims, extending beyond research to ask whether students and researchers alike can still account for AI-produced artifacts.

<!--
TODO(Mitch): Slides. Supply the deck (file, format, talk title, date), then replace this block with:

## Slides

PDF:  <object data="/files/dissertation-slides.pdf" type="application/pdf" width="100%" height="560">…fallback link…</object>
      plus a visible "Download slides (PDF)" link.
HTML: 16:9 responsive <iframe> to files/slides/dissertation/ plus an "Open full screen" link.
Add a one-line caption with talk title and date.
-->
