---
title: "Interview Graph"
excerpt: "Coding interview transcripts into a property graph, so that a claim and the evidence for it stay attached to each other.<br/><img src='/images/interview-graph.png'>"
collection: portfolio
---

Qualitative interview work has a recurring problem of provenance: asserting that faculty are anxious about assessment is straightforward, while demonstrating which particular sentences, across which transcripts, that claim actually rests on is considerably slower.
Writing the claim takes a minute and reconstructing its evidence takes an afternoon, which means the reconstruction tends to happen only once someone pushes back on it.

I am interviewing engineering faculty about how, if at all, they are changing their teaching in response to generative AI.
Rather than code those transcripts into documents, I code them into a property graph, so that the evidentiary chain is part of the data structure rather than a footnote to it:

```
(Person)-[:HOLDS]->(Belief)-[:EVIDENCED_BY {basis:"stated"}]->(Quote)
(Person)-[:PERFORMED]->(Action)-[:DESCRIBED_IN]->(Quote)
(Belief)-[:EVIDENCED_BY {basis:"enacted"}]->(Action)
```

The distinction encoded in that third edge is the one the study turns on; a belief grounded only in a quote is something a participant said, whereas a belief grounded in an action is something they restructured a course over, and conflating the two is precisely the move the analysis needs to avoid.
Modeling the difference as a typed edge makes it queryable rather than arguable, though it does not, of course, dissolve the interpretive judgment involved in ascribing a belief to someone in the first place; it only makes that judgment explicit enough to be examined.

The viewer renders the corpus as a force-directed graph, or narrows to a single participant's three-hop neighborhood, and clicking any node walks its evidence trail down to the transcript line it bottoms out in.

[**Open the live demo**](https://mitchgerhardt.com/interview-graph/) · [source on GitHub](https://github.com/mitchg10/interview-graph)

The demo runs on wholly synthetic data; every participant, quote, institution and department in it was invented to match the *structure* of the real graph without reproducing any of its content.
The interview corpus itself is governed by an IRB protocol and lives in a separate private repository, and the build that produces this page has no access to it.

## Building it

Next.js and TypeScript over Neo4j, with the coding interface writing to CSV so that the research record stays legible without a database in front of it.

The published version is a static export with no server and no database at all, which is less of a compromise than it sounds: the same Cypher queries that back the API in development are run at build time and written out as JSON, and the three-hop filter is reimplemented client-side, so what gets deployed is just files.
The part that took the most care was the boundary between the two, since the interesting failure mode is not a bug but a leak.
A build-time check harvests every identifier and every eight-word sequence from the real transcripts and refuses to publish on a match, and the static build excludes server code structurally rather than by convention, on the reasoning that a safeguard depending on someone remembering it is not really a safeguard.
