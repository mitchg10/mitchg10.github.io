---
title: "Purrcept"
excerpt: "A local workbench for asking language models the same decision questions of every passage in a corpus, and for finding out whether the answers can be trusted.<br/><img src='/images/purrcept-flowchart.png'>"
collection: portfolio
---

Using a language model as a coder of qualitative data has a recurring problem of accountability: a prompt that seems to work on a dozen passages tells you very little about how it behaves on a thousand, and a change to the prompt, the threshold, or the model rarely announces what it broke.
Purrcept exists to make that loop short and inspectable, so that the question "did this revision help?" has an answer made of numbers and of specific rows rather than an impression.

The workflow is to define a set of decision questions per coding position, run them against a dataset, and compare the resulting predictions to hand-labelled gold rows.
Questions are authored as a flowchart or a table, with an exact preview of the prompt that will be sent:

![The question-set editor, shown as a flowchart](/images/purrcept-flowchart.png)

Gold labels are the other half of the evidence, so the workbench embeds the labelled rows and ranks them by closeness to their position's centroid, which shows both the most representative examples to write rules against and which pairs of positions are hard to tell apart:

![Gold labels embedded and projected, with a position similarity matrix](/images/purrcept-pca.png)

Each run reports AUROC, precision, recall and F1 per position and per question, and the weights and thresholds can be re-fit from the gold labels without making any new model calls, which keeps tuning cheap enough to do often:

![Per-position metrics with threshold and weight tuning](/images/purrcept-metrics.png)

Two runs can then be set side by side, with the question-set changes, the metric deltas and every row whose prediction flipped laid out together, and the rows where the model and the gold label disagree get their own review queue, with notes and a flag for labels that look wrong rather than predictions:

![Comparing two runs, with metric deltas and flipped rows](/images/purrcept-compare.png)

![The disagreement review queue](/images/purrcept-disagreements.png)

Every screenshot on this page uses synthetic data: the project, the positions, the question sets and the passages were invented for the purpose, and the scores come from a seeded fake predictor, so they are **not results** and say nothing about any model.
The real projects are not part of this site, and the source will be released with the forthcoming publication.

## Building it

The pipeline is fixed (segment, state, questions, predictor, runner, scoring, then fit, evaluate and compare), and the parts that vary sit behind registries, so a new predictor backend or scoring rule is one registered class rather than an edit to the runner.
Backends are interchangeable behind a single predictor interface, whether a local model, a remote GPU over a tunnel, or a hosted one.
Answers are cached per model and per question, which makes runs pausable and resumable, and means that re-running after editing one question re-asks only that question.
