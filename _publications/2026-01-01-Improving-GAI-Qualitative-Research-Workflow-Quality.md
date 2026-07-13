---
title: "Improving Engineering Education GAI Qualitative Research Workflow Quality: Techniques and Documentation Strategies"
author: "Mitchell Gerhardt, Andrew Katz"
collection: publications
category: manuscripts
permalink: /publication/2026-01-01-Improving-GAI-Qualitative-Research-Workflow-Quality
date: 2026-06-02
venue: 'Studied in Engineering Education - Special Issue on GAI in Methods'
citation: 'Gerhardt, M., &amp; Katz, A. (Submitted). Improving Engineering Education GAI Qualitative Research Workflow Quality: Techniques and Documentation Strategies. Studied in Engineering Education.'
# paperurl: 'TBD'
plain_language_summary: "AI chatbots like ChatGPT are increasingly used by qualitative researchers to help analyze interview and survey data, but there's no shared sense of what counts as doing this well. This paper works through the specific choices researchers make along the way (e.g., which model to use, how to phrase instructions, how much randomness to allow, how to check the AI's work), and explains why each shapes what a study ultimately finds. Rather than issuing a checklist, we treat these as decisions requiring the same kind of justification researchers already give for other methodological choices, like how they selected interview participants. The aim is to help researchers, and the reviewers evaluating their work, judge when AI-assisted analysis has been done thoughtfully and appropriately."
contribution_summary: "Through a concept synthesis of technical and reflexive considerations, the paper articulates a set of \"threshold concepts\" — API access, task scoping, structured output schemas, model and temperature selection, prompt engineering techniques, and researcher-in-the-loop evaluation — that together define a spectrum of quality for LLM-infused qualitative data analysis, illustrated with empirical comparisons of output variations across models and temperature settings."
research_questions:
  - "What threshold concepts must researchers understand to responsibly access, configure, and prompt LLMs for qualitative data analysis?"
  - "How do specific technical choices (e.g., model selection, temperature, prompt structure) shape the interpretive validity of LLM-generated qualitative findings?"
  - "What documentation and justification practices allow researchers and reviewers to determine when LLM-infused QDA is \"appropriate\" to its research context?"
methods: "The paper is a concept synthesis (per Sutton et al., 2019) rather than an empirical study proper, working through worked code examples (OpenAI and Ollama APIs), prompt design illustrations, and existing literature to build out threshold concepts across foundational LLM access, prompt engineering, and evaluation. It supplements this with a small original illustrations; for example, we modified a published prompt (Sanders et al., 2026) and generated 50 structured outputs at each of several temperature settings using two models (gpt-oss-120b and llama3.1-8b), then compared lexical diversity, cosine similarity, and edit distance against a temperature-zero baseline."
key_findings: "Synthesizing across the literature, we identify foundational technical concepts (APIs, task scoping, structured output schemas, model and temperature selection) and prompting techniques (system/user prompt separation, few- and multi-shot examples, chain-of-thought) as sites where researcher judgment is embedded into findings, whether or not that judgment is made explicit. It further positions the human-in-the-loop \"gold standard\" evaluation workflow (adapted from Chew et al.'s LACA approach) as the current benchmark for validating LLM output against human-coded data, while noting unresolved questions about which reliability metric (IRR vs. F1) best fits qualitative work."
implications: "We argue that \"appropriateness\" in LLM-infused QDA is contextual rather than fixed, and call on researchers to document and justify technical decisions — model and temperature choice, prompt architecture, example curation, evaluation criteria — with the same rigor traditionally reserved for sampling or coding procedures, including securing IRB approval for LLM-specific data risks. We flag context engineering and agentic AI workflows as underexplored territory for a follow-up paper, and note that current journal word limits make the level of methodological detail needed for reproducibility difficult to achieve within a standard article."
tags:
   - "Artificial Intelligence"
   - "Qualitative Methodologies"
   - "Engineering Education"
---
<!-- Use [Google Scholar](https://scholar.google.com/scholar?q=Improving+Engineering+Education+GAI+Qualitative+Research+Workflow+Quality){:target="_blank"} for full citation -->