AgentStack Calc

Live: agentstackcalc.com · Voice playground: agentstackcalc.com/voice

A cost-comparison simulator for voice-AI and automation infrastructure. Teams evaluating a voice-agent or workflow-automation stack rarely know the real monthly cost until they're already committed — AgentStack Calc lets you model and compare pricing across providers before you build.

What it does
Voice AI cost modeling — compares per-minute and monthly costs across voice agent platforms (Vapi, Retell, Bland) against your expected call volume and duration.
Automation platform comparison — models Zapier/Make.com task-based pricing against a self-hosted n8n deployment, showing the break-even point where self-hosting starts saving money.
StackVoice TTS playground (/voice) — a live demo of a neural text-to-speech engine built on Kokoro-82M (ONNX runtime), running at sub-220ms synthesis latency.
Tech stack
Framework: Next.js (App Router), TypeScript
Styling: Tailwind CSS
Voice synthesis: Kokoro-82M via ONNX Runtime
Deployment: Vercel
Why I built it

Most cost calculators for AI infrastructure are vendor marketing pages that only show their own pricing in the best light. I wanted a neutral tool that pulls in real published pricing across providers, so teams (including my own client work) can make an infrastructure decision based on numbers instead of sales pitches.

Status

Actively used to inform infrastructure decisions on client and personal projects. Pricing data is updated manually as providers change their models — open to contributions if you spot something stale.
