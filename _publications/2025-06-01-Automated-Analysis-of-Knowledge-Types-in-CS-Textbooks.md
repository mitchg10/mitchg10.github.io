---
title: "Automated Analysis of Knowledge Types in Computer Science Textbooks: A Natural Language Processing Approach to Understanding Epistemic Climate"
author: "Mitchell Gerhardt, Andrew Katz"
collection: publications
category: conferences
permalink: /publication/2025-06-01-Automated-Analysis-of-Knowledge-Types-in-CS-Textbooks
date: 2025-06-01
venue: 'In the proceedings of 2025 ASEE Annual Conference & Exposition'
citation: 'Gerhardt, M., & Katz, A. (2025). Automated Analysis of Knowledge Types in Computer Science Textbooks: A Natural Language Processing Approach to Understanding Epistemic Climate. 2025 ASEE Annual Conference & Exposition  Proceedings, 55491. https://doi.org/10.18260/1-2--55491'
paperurl: 'https://doi.org/10.18260/1-2--55491'
plain_language_summary: "Textbooks teach students what \"counts\" as knowledge in a field, whether it's presented as fixed and technical or contested and evolving. This paper describes an AI-assisted method for surfacing those patterns automatically using ten types of knowledge computer science (CS) textbooks convey (e.g., conceptual, ethical, practical). To develop the approach, an AI system generated thousands of realistic example passages labeled by type, then trained a smaller language model to recognize those types on its own. The approach performed unevenly across knowledge types, but it demonstrates, as a first step, that large-scale textbook analysis is feasible without hand-coding every passage."
contribution_summary: "The paper contributes a ten-type taxonomy of knowledge representation in CS curricular materials, a synthetic-data-generation pipeline that uses LLM-generated, context- and location-conditioned passages to overcome the absence of labeled epistemic-climate datasets, and an initial fine-tuned multi-label BERT classifier demonstrating the feasibility of automated knowledge-type detection, with per-class F1 scores ranging from 0.683 to 0.968."
research_questions:
  - "How can knowledge types in CS textbooks be systematically categorized to reflect different forms of knowledge presentation and their epistemic implications?"
  - "How effectively can synthetic datasets be generated and validated for training NLP models to identify knowledge types in CS educational materials?"
  - "How well can transformer-based models distinguish between different forms of knowledge presentation in CS textbooks, and what patterns emerge in their classification performance across knowledge types?"
methods: "Drawing on nine required-course undergraduate CS textbooks, we manually identified recurring passages and used an LLM (Claude) to consolidate them into ten knowledge types (e.g., conceptual, historical, procedural, ethical, mathematical); a separate LLM (qwen2.5:14b-instruct) then generated 10,000 synthetic labeled passages varied across topics, textbook contexts, and locations, refined through iterative prompt engineering. A BERT model with a custom multi-label classification head was fine-tuned on this synthetic dataset, with performance assessed through per-class precision, recall, and F1, optimal classification thresholds, label co-occurrence, and prediction confidence distributions."
key_findings: "Classification performance varied substantially by knowledge type: ethical knowledge (ETH) reached near-perfect precision (~0.98) and an F1 of 0.968, while procedural (PRO) and mathematical (MATH) knowledge lagged, at F1 scores of 0.683 and 0.684 respectively, with MATH showing a pronounced precision-recall gap. Optimal thresholds also differed by type, with most requiring a high threshold (0.8), while practical/professional knowledge (PRAC) needed only 0.55, suggesting some types are more explicitly signaled in text than others. Co-occurrence analysis revealed substantial overlap between types (e.g., MATH-CON: 338 instances; PRAC-ETH: 274; META-PRO: 252), indicating the generated passages present knowledge types in interconnected rather than discrete forms, as expected."
implications: "Students must learn to navigate multiple, interrelated forms of knowledge at once, which could create tension where other elements of the epistemic climate (instruction, evaluation) assume more discrete categories. Practically, the method offers curriculum developers and instructors a scalable, complementary alternative to resource-intensive manual coding for auditing which knowledge types their materials emphasize or neglect. Applying the classifier to authentic textbooks, other engineering disciplines, and studies linking knowledge-type distribution to student epistemic development is fruitful for future work."
tags:
  - "Artificial Intelligence"
  - "Psychology"
  - "Computing Education"
  - "Programs and Curriculum"
  - "Engineering Education"
---
Use [Google Scholar](https://scholar.google.com/scholar?q=Automated+Analysis+of+Knowledge+Types+in+Computer+Science+Textbooks){:target="_blank"} for full citation