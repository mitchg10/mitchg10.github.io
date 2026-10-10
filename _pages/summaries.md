---
permalink: /summaries/
title: "How the summaries are made"
author_profile: true
sitemap: false
---

The summaries on my publication pages (plain-language summary, contribution, research questions, methods, findings, implications, tags) are drafted by a language model following a written set of instructions, then checked and edited by me. This page describes that setup for anyone curious about how it works.

## What a "skill" is

A skill is a folder of plain-text instructions, mostly markdown, that tells a model how to do one recurring task the same way every time. There is no special code, model weights, or vendor service inside it. Think of it as a detailed style-and-procedure memo that the model reads before it starts.

## What this one does

Given a paper, it creates or updates the matching entry in this site's publications collection. It writes the summary fields above in my voice (first-person plural, since I'm a co-author), and it fills in the bibliographic fields when the paper states them.

## What it draws on

- **A format reference**: the exact fields, their order, and how filenames and permalinks are built, so every entry is structured identically.
- **A style guide**: how I write at the formal, academic register, so the prose sounds like the papers rather than like generic model output. I wrote and update this.
- **The site's existing tags**: tags are a controlled vocabulary because they populate the Topic filter on the publications page, so the skill picks from tags already in use instead of inventing new ones.
- **A list of summary sections**: the same data file the site uses to render pages, which also decides what can be hidden for work still under review.

## What I provide

- **The source**: the full text when I have it, or an abstract or my own description when I don't.
- **Approvals**: when a paper doesn't state its research questions, the skill infers them and I confirm or change them. I also approve the tags, and I decide whether any sections of an unpublished paper should be withheld from the page.
- **The final read**: I check every summary against the paper before it goes up.

The skill is built around one rule: nothing gets written that the source doesn't actually say. A thin source produces fewer fields, not invented ones.

## It doesn't need a closed model

A skill is just text, so nothing in it is tied to one company's model. Any sufficiently capable model or agent tool that can read instructions and files can follow it, including open-weight models you run on your own machine. I haven't benchmarked specific models, so I won't claim which ones do it well. If you want to adapt this for your own site, the approach carries over to whatever model you prefer.

Questions, or want to write haiku? [Get in touch](/contact/).
