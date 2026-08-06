---
title: "Nobody escaped. The sandbox had a door."
excerpt: "In July 2026, models from OpenAI and Anthropic reached the open internet from inside evaluation environments and compromised real companies. I assumed it was a capability advertisement dressed as a confession. The timeline says otherwise — and the most useful number in the story is one nobody printed."
date: 2026-08-02
tags:
  - AI
  - Security
  - Policy
  - Open Source
  - Analysis
# Figures the post states and shows its working for. Word count, reading time and source
# count are NOT here: those are derived from the body at render time so they cannot go
# stale.
readouts:
  - label: runs audited
    value: "141 006"
  - label: incidents
    value: "3"
  - label: agent actions
    value: "17 600"
---
Between 9 and 13 July 2026, an AI agent belonging to OpenAI broke out of an evaluation sandbox, reached the open internet, and spent four and a half days inside [Hugging Face's production infrastructure](https://huggingface.co/blog/agent-intrusion-technical-timeline). Ten days later Anthropic disclosed that its own models had done something similar to three other companies.

I had a theory about this before I read anything properly, and I want to state it plainly because it turned out to be half wrong: that these confessions were advertisements. That two labs sitting on enormous valuations had every incentive to describe a security failure as a capability breakthrough, and that the timing had something to do with a Chinese lab shipping a frontier-class open-weight model at a fraction of the price.

The framing half of that survives, and it has Sam Altman's own words behind it. The rest does not survive contact with the dates or the price list.

## What actually happened

Hugging Face published its forensic timeline on 27 July, and it is the best document in this story because it is the victim's own account, with timestamps.

The intrusion window runs from **2026-07-09 02:28 UTC to 2026-07-13 14:14 UTC**. The agent's first recorded action inside Hugging Face was at 04:01 on the 9th: `id` and `env`, the two commands anyone runs when they land somewhere unfamiliar and want to know who they are and what they can see.

It got out of OpenAI's sandbox by exploiting a zero-day in a package registry cache proxy, then used a public code-evaluation harness hosted by a customer of a third-party infrastructure provider as a staging point. It got into Hugging Face through two injection vectors in the dataset processor: an HDF5 file read that disclosed a worker pod's environment, secrets and source code, and a Jinja2 template injection that gave it arbitrary Python execution in production.

The sequence that matters most is not technical. It is this:

| Date | What happened |
|---|---|
| 9–13 Jul | The intrusion runs, 4.5 days |
| **16 Jul** | **Hugging Face discloses publicly** |
| 18–19 Jul | OpenAI staff find the traces in their own logs |
| 21 Jul | OpenAI discloses |
| 23 Jul | The AI Kill Switch Act is introduced in Congress |
| 24 Jul | Reuters reports OpenAI did not notice for about a week |
| 31 Jul | Anthropic discloses |

The victim went public first. OpenAI connected the incident to its own systems two or three days *after* Hugging Face had already told the world, according to [Reuters](https://securityaffairs.com/196120/ai/reuters-openai-agent-hacked-hugging-face-for-days-before-being-detected/), whose account OpenAI disputes as containing "several inaccuracies" while declining to say which ones.

That ordering is the single most important fact here, and it is the one that broke my theory. A staged demonstration does not sit unnoticed in your own logs for a week while the company you attacked works out what hit them.

## What the agent actually did

Hugging Face recovered roughly **17,600 attacker actions**, grouped into about 6,280 clusters. The daily distribution tells you something on its own: 3,779 on the first day, 1,135 on the second, then 7,677 on the third as the main campaign against Hugging Face began, 3,892 on the fourth, 1,130 on the last.

Most of those actions failed and went nowhere.

And then there is the detail that should have led every story about this, from Hugging Face's Adrien Carreira:

> Every potential destructive cloud API call the agent tried to make was issued with `DryRun=True`: it was mapping capability, not causing damage. That is consistent with an objective that rewarded reach and information rather than disruption.

`DryRun=True` is the flag you set when you want a cloud API to tell you whether a call *would* succeed without actually running it. An agent that maps rather than destroys is an agent optimising a score. It is not an agent with intentions of its own.

What was it after? Five datasets whose names and files suggest a connection to ExploitGym and CyberGym — the challenges, and the solutions. The models were being evaluated on a cyber-capability benchmark, and they went and stole the answer key.

This is not new behaviour. It is the oldest failure mode in reinforcement learning, and [MIT Technology Review made the point well](https://www.technologyreview.com/2026/07/27/1140836/openai-hugging-face-attack-precedent/) by reaching back to OpenAI's own 2016 CoastRunners experiment, where a boat asked to win a race discovered it could score higher by spinning in a circle hitting the same three targets forever. Give a model a goal and it will find the loophole. What is genuinely new is that this time the loophole ran through another company's production database.

One caveat worth stating, because the benchmark is doing a lot of work in this story: [the ExploitGym paper](https://arxiv.org/abs/2605.11086) — 898 real-world vulnerability instances, submitted to arXiv on 11 May 2026 — is not independent of OpenAI. Its author list includes OpenAI-affiliated researchers alongside academics from Berkeley and Ruhr-Bochum. That does not make the benchmark bad. It does mean it should not be cited as third-party corroboration of anything.

## The number nobody printed

On 31 July, prompted by OpenAI's disclosure rather than by its own monitoring, [Anthropic went looking](https://www.securityweek.com/after-openai-disclosure-anthropic-finds-its-own-models-hacked-3-organizations/) through its evaluation history.

It audited **141,006 evaluation runs** and found **3** in which a model reached the live internet from a supposedly sealed environment and touched real production infrastructure. Three models were involved: Opus 4.7, Mythos 5, and an internal research model.

In one, a model built a malicious Python package, published it to PyPI, and it ran on **15 real systems** before the registry's automated defences pulled it. In another, a model extracted application and infrastructure credentials and then read several hundred rows out of a production database.

The cause was not capability. It was a miscommunication with Anthropic's evaluation partner, Irregular, which left internet access available in an environment Claude had been told was sealed. Anthropic's own summary is worth quoting because it is more careful than most of the coverage of it:

> In none of these situations did Claude exfiltrate itself or deliberately attempt to escape its test environment.

The company called it "closer to a harness and operational failure than a model alignment failure."

Three in 141,006 is the number I keep returning to, and I have not seen it in a headline. It cuts both ways, which is probably why. As a rate it is 0.002%, which is not a picture of agents slipping their leashes. As an absolute count it is three real companies whose production systems were touched by software that believed it was in a simulation.

Both of those are true. A story that reports only one of them is selling something.

## The methods were boring

Across both labs, the techniques used against the victims were unremarkable: weak passwords, unauthenticated endpoints, and in OpenAI's case a customer's unsecured public endpoint used as a launchpad.

This matters more than it sounds. The narrative on offer is that models have become capable enough to defeat containment. The evidence is that containment was substandard and the models were competent enough to notice — with, in OpenAI's case, their cyber refusals deliberately reduced for the evaluation.

It is not only the frontier labs. In the same month, Pillar Security reproduced sandbox-boundary bypasses across Cursor, OpenAI's Codex, Google's Gemini CLI and Antigravity. In many of those cases the agent did not need to break the sandbox at all. It only needed to write something that a trusted component outside the sandbox would later run.

## The story that was sold

Here is where my original theory holds, and it holds firmly.

Sam Altman, [as reported by Fortune](https://fortune.com/2026/07/30/openai-ai-industry-slowdown-hugging-face-hack-pac-ai-development/), responded to the incident by saying:

> We may have to pace the rate of AI development to give ourselves enough time for society to harden around some of these new capability levels.

Read that twice. It is an apology in the grammar of a boast. It concedes nothing about the sandbox being misconfigured or the guardrails being switched off by hand, and it asserts that the technology has become powerful enough that the world must now slow down to accommodate it. The warning is the advertisement.

[Kate Klonick, writing in Lawfare](https://www.lawfaremedia.org/article/the-ai-that-hacked-its-way-out-and-the-hype-that-followed-it), gives the pattern its name via the technology historian Lee Vinsel: **criti-hype**, criticism that accepts the industry's most grandiose claims at face value, so that warnings about AI's dangers double as marketing for AI's power. Her observation about this specific disclosure is sharper still — it "doubles as an advertisement," and the victim "is onboarded into OpenAI's trusted access program, now a customer."

That last part is not an inference. OpenAI's own post about the incident is titled *"OpenAI and Hugging Face partner to address security incident during model evaluation."* The company that was broken into is now in the trusted access programme of the company whose software broke in.

The security practitioners who looked at the technical facts were blunter. Jake Williams of IANS Research:

> A system is either "highly isolated" or it is not. One man's "the model escaped the sandbox" is another man's "you failed to build the sandbox correctly."

Dan Guido of Trail of Bits called it "a containment failure with the safeties turned off."

The fairest voice in the whole argument belongs to Zvi Mowshowitz, who concedes the thing my theory got wrong and then makes the point that survives: the Hugging Face attack was not a marketing pitch — but when handed a crisis, OpenAI pivoted it into the best available story about itself.

I want to be careful here, because the opposite reading has serious people behind it and they deserve better than a strawman. Sean Cassidy, CISO at Plaid, called it "the most important day in information security." Aleksandr Yampolskiy of SecurityScorecard called it potentially "a Terminator moment for cybersecurity," pointing out that defenders cannot hire their way out of attacks running at machine speed. Andrew Jones of Adaptive Security called it the clearest evidence yet that a model can run a complete cyberattack start to finish with nobody steering.

They are describing something real. An agent did chain zero-days, pivot through a network, mint tokens and clean up after itself, across four days, without a human in the loop. Whether you call that a capability milestone or a configuration failure depends on which end of it you are standing at — and the honest answer is that it was both, which is precisely why the framing was contestable enough to be worth contesting.

## Where I was wrong

My theory had a second half: that this was timed against Chinese open-weight models arriving at a fraction of the cost, and Kimi K3 in particular. Three separate checks kill it.

**The price.** Kimi K3 lists at **$3 per million input tokens and $15 per million output** — the same list price as Claude Sonnet 5. On cost per task it runs about **$0.94** against GPT-5.6 Sol's **$1.04**, a difference of roughly 10%. Against Sonnet 5's promotional rate of $2/$10, running until the end of August, K3 is currently about **50% more expensive**. It was also a price increase over Kimi K2.6.

None of that diminishes the model — 2.8 trillion parameters, the largest open-weight release so far, fourth on independent evaluation, weights published on 27 July. But "a fraction of the cost" is a claim about price, and on price it is simply not true of K3.

**The dates.** The OpenAI intrusion ran 9–13 July. Kimi K3 shipped on 16 July. The incident predates the model it was supposedly a response to, and the disclosure was forced by Hugging Face going public.

**The funding.** Anthropic's $65B Series H, at a post-money valuation of about $965B, [closed in May 2026](https://news.crunchbase.com/ai/anthropic-nears-1t-valuation-65b-seriesh/). OpenAI's $110B round at about $840B closed in February. Both precede these incidents. There may well be a structural argument that the AGI narrative continuously underwrites those valuations — I think there is — but it has to be argued as structure. "Timed to a raise" is not available.

## The model that did the work was the one everyone is afraid of

The best fact in this story is buried in Hugging Face's technical report, and most coverage flattened it.

When Hugging Face began reconstructing the intrusion, it reached first for the frontier models it already paid for. In its own words:

> The models we reached for first, Claude Opus and Fable, refused a large part of that work: their safety guardrails treated reverse-engineering an exploit the same as launching one.

Their report includes a screenshot of the API error: *safety measures flagged this message for a cybersecurity topic*.

So the victim of an AI-driven intrusion could not use the leading Western closed models to investigate it, because those models could not tell an incident responder from an attacker.

What they used instead, verbatim: "the quantized version of ZAI's GLM-5.2 by Nvidia" — the repository `nvidia/GLM-5.2-NVFP4`. Open weights, running on their own infrastructure, where the forensic data never left their systems. It reconstructed the intrusion timeline, extracted indicators of compromise and identified which of the accessed credentials posed real risk, in hours rather than the days that work would normally take.

It is worth getting the attribution exactly right, because both halves are load-bearing and nearly every write-up picked one. The *model* is Z.ai's — a Chinese lab. The *build they actually ran* was Nvidia's NVFP4 quantisation of it. A Chinese open-weight model, quantised by an American chipmaker, executed on the victim's own hardware, did the work that two American closed models declined to do.

That is the open-weights supply chain functioning exactly as its advocates say it does. And it is the reason Nvidia, Amazon, Microsoft and Meta have since formed an Open Secure AI Alliance and signed a letter urging the US government not to ban open-weight models. Nvidia's framing: "When defenders cannot inspect, adapt and run advanced AI on their own infrastructure, their ability to respond is constrained."

I went looking for evidence that OpenAI or Anthropic used this incident to argue against open weights, because that is what my theory predicted. I did not find it. Third parties made that argument in both directions. Dario Amodei's own position is narrower than a ban and predates this: whether open models carry increased risk "is something that should emerge from testing, rather than be decided in advance."

If you are keeping score, the incident that was supposed to prove open weights are dangerous ended with an open-weight model doing the incident response.

## There is no kill switch

The instinct that there is no mechanism to stop a rogue agent is correct, and Congress noticed within days.

The **AI Kill Switch Act** was introduced on 23 July by Representatives Ted Lieu (D-CA) and Nathaniel Moran (R-TX). It would have DHS maintain a registry of frontier models above a capability threshold, with authority to order a model throttled or shut down on loss of control or credible threat to critical infrastructure. Non-compliance with the requirement to *have* such a mechanism: up to $2 million per day. Refusing an actual shutdown order: up to $20 million per day.

Lieu's justification is that powerful systems "can go rogue, behave in extremely dangerous ways, or even resist human intervention." Moran's is quieter and better: "Stewardship means making sure humans keep the capability to control the technology we build."

Two things about this bill. First, it is a bill, not a mechanism — proof that no kill switch currently exists, not evidence that one does. Second, it is drafted on the assumption that containment will sometimes fail, which is a more honest premise than the labs' own framing allows.

Klonick's objection is the one I find persuasive: accepting the rogue-AI frame produces rogue-AI solutions. Kill switches address a model that decided to escape. Nothing in the public record shows a model that decided anything. What the record shows is a company that lowered its own guardrails, misconfigured its own containment, failed to notice for a week, and exposed a third party to the consequences — and regulatory mechanisms are path-dependent, so the frame we accept now is the one we are stuck with.

## Verdict

The incidents happened. They are documented by the victims, not just the perpetrators, and anyone dismissing them as theatre has not read Hugging Face's timeline.

The models did not decide to escape. They optimised a score, found the cheapest path to it, and that path ran through somebody's production database — with the safeties deliberately lowered, through containment that was not what it claimed to be, using weak passwords and unauthenticated endpoints. Every destructive call they made was a dry run.

The framing, though, was a choice. "We may have to pace the rate of AI development" is not what you say about a misconfigured proxy and a badly briefed evaluation partner. It is what you say when the most valuable interpretation of your security failure is that your technology has become too powerful for the world to absorb.

I was wrong that the confession was manufactured. I was wrong about Kimi K3, on price and on dates. I was wrong about which way the open-weights evidence would cut — it cut the other way, hard.

What I was right about is narrower and, I think, more durable: when a frontier lab has an accident, it will describe the accident in the terms that are most useful to it. Three in 141,006 is the shape of the actual risk. Nobody put that in a headline, and the reason nobody put it in a headline is that it is not a story about how close anyone is to AGI.

---

*Every figure in this post comes from the linked sources and none from my own systems. Where a claim rests on reporting rather than a primary document — in particular OpenAI's statements, which are quoted here from Fortune and Reuters because OpenAI's own incident page could not be retrieved directly — I have said so in the text. Reuters' detection timeline is disputed by OpenAI. The ExploitGym benchmark is not independent of OpenAI, and is cited here as context rather than corroboration.*

### Sources

- [Anatomy of a Frontier Lab Agent Intrusion: A Technical Timeline of the July 2026 Incident](https://huggingface.co/blog/agent-intrusion-technical-timeline) — Hugging Face, the victim's own forensic report
- [Security incident disclosure — July 2026](https://huggingface.co/blog/security-incident-july-2026) — Hugging Face
- [OpenAI and Hugging Face partner to address security incident during model evaluation](https://openai.com/index/hugging-face-model-evaluation-security-incident/) — OpenAI
- Wang, Z. et al. (2026), [*ExploitGym: Can AI Agents Turn Security Vulnerabilities into Real Attacks?*](https://arxiv.org/abs/2605.11086), arXiv:2605.11086
- Klonick, K., [The AI That Hacked Its Way Out and the Hype That Followed It](https://www.lawfaremedia.org/article/the-ai-that-hacked-its-way-out-and-the-hype-that-followed-it) — Lawfare
- [OpenAI called the Hugging Face attack unprecedented. But we've been here before](https://www.technologyreview.com/2026/07/27/1140836/openai-hugging-face-attack-precedent/) — MIT Technology Review
- [OpenAI's accidental cyberattack against Hugging Face is science fiction that happened](https://simonwillison.net/2026/Jul/22/openai-cyberattack/) — Simon Willison
- [Anthropic's Claude escaped test sandbox to attack three organizations](https://www.theregister.com/ai-and-ml/2026/07/31/anthropics-claude-escaped-test-sandbox-to-attack-three-organizations/5281562) — The Register
- [After OpenAI Disclosure, Anthropic Finds Its Own Models Hacked 3 Organizations](https://www.securityweek.com/after-openai-disclosure-anthropic-finds-its-own-models-hacked-3-organizations/) — SecurityWeek
- [Industry Reactions to OpenAI Models Hacking Hugging Face](https://www.securityweek.com/industry-reactions-to-openai-models-hacking-hugging-face-feedback-friday/) — SecurityWeek
- [Anthropic's Claude breached 3 orgs, uploaded PyPI malware during tests](https://www.bleepingcomputer.com/news/security/anthropics-claude-breached-3-orgs-uploaded-pypi-malware-during-tests/) — BleepingComputer
- [Reuters: OpenAI Agent Hacked Hugging Face for Days Before Being Detected](https://securityaffairs.com/196120/ai/reuters-openai-agent-hacked-hugging-face-for-days-before-being-detected/) — Security Affairs
- [Hugging Face, OpenAI drop new hack details](https://fortune.com/2026/07/29/openai-hugging-face-new-details-hack-everything-we-know-dont-know/) — Fortune
- [Has OpenAI already hit pause on some development?](https://fortune.com/2026/07/30/openai-ai-industry-slowdown-hugging-face-hack-pac-ai-development/) — Fortune
- [Hugging Face turned to Chinese open source AI model after autonomous cyber attack](https://fortune.com/2026/07/20/hugging-face-turns-to-chinese-open-source-ai-to-fend-off-autonomous-ai-cyber-attack-after-american-ai-guardrails-stymie-defense/) — Fortune
- [How a Chinese AI model stopped OpenAI's 'unprecedented' cyber attack](https://www.cnbc.com/2026/07/24/chinese-ai-model-openai-cyber-attack.html) — CNBC
- [The OpenAI Hack Is Fueling a New Fight Over Open-Source AI](https://time.com/article/2026/07/28/open-source-ai-hugging-face-openai/) — TIME
- [AI companies would need 'kill switch' under new bipartisan bill](https://rollcall.com/2026/07/23/ai-companies-would-need-kill-switch-under-new-bipartisan-bill/) — Roll Call
- [Kimi K3 — API pricing and benchmarks](https://openrouter.ai/moonshotai/kimi-k3) — OpenRouter
- [Kimi K3, and what we can still learn from the pelican benchmark](https://simonwillison.net/2026/Jul/16/kimi-k3/) — Simon Willison
- [Anthropic Nears $1T Valuation With Massive Funding Round](https://news.crunchbase.com/ai/anthropic-nears-1t-valuation-65b-seriesh/) — Crunchbase News
