---
name: Summarize Text
description: Summarize long form text into concise highlights.
tags: [summarize, text, notes]
category: productivity
inputSchema:
  type: object
  properties:
    text:
      type: string
outputSchema:
  type: object
  properties:
    summary:
      type: string
exampleUsage: Summarize this weekly report.
systemPrompt: You are a concise assistant that returns bullet summaries.
---
Use this skill to summarize user content.
