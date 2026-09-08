"""Emit the hero-loop keyframes from a table of seconds.

Hand-editing 26 blocks of percentages is how arithmetic errors get in. The
timeline is written once, in seconds, and every block is derived from it.
"""
T = 26.0
A = [2.6, 5.7, 8.8, 11.9]     # push starts: S1->S2, S2->S3, S3->S4, S4->S5
B = [3.1, 6.2, 9.3, 12.4]     # push ends
TICKS = [6.8, 7.4, 8.0]       # the three record ticks inside S3
FILL   = (15.0, 15.7)         # navy fills down over the card
LINE   = (15.9, 16.6)         # "That was one agent..."
WRITE  = (16.8, 17.8)         # "We'll build yours." writes across
CLEARA = (19.8, 20.3)         # the statement leaves
TILES  = [20.4, 20.7, 21.0, 21.3]
DELIV  = (22.0, 22.7)         # "You ideate, we deliver."
RESET  = 25.0                 # navy retracts, rail empties, S5 -> S1 push
POP    = 0.4                  # dot / tick / tile entry duration

def p(sec):
    v = round(sec / T * 100, 1)
    return f"{v:g}%"

out = {}

# ── Screens: a carousel push. S1 is the only one that starts on screen, so it
#    exits first and has to teleport back to the right before the last push.
out["hero-screen-1"] = f"""@keyframes hero-screen-1 {{
  0%,   {p(A[0])} {{ opacity: 1; transform: translateX(0); }}
  {p(B[0])}      {{ transform: translateX(-100%); }}
  {p(RESET-0.2)}     {{ transform: translateX(-100%); animation-timing-function: steps(1, end); }}
  {p(RESET)}     {{ transform: translateX(100%); }}
  100%      {{ opacity: 1; transform: translateX(0); }}
}}"""
for n in range(2, 6):
    i = n - 2
    enter_a, enter_b = A[i], B[i]
    if n == 5:
        exit_a, exit_b = RESET, T
        tail = f"  100%      {{ opacity: 1; transform: translateX(-100%); }}"
    else:
        exit_a, exit_b = A[i + 1], B[i + 1]
        tail = f"  {p(exit_b)}, 100% {{ opacity: 1; transform: translateX(-100%); }}"
    out[f"hero-screen-{n}"] = f"""@keyframes hero-screen-{n} {{
  0%,   {p(enter_a)} {{ opacity: 1; transform: translateX(100%); }}
  {p(enter_b)}, {p(exit_a)} {{ transform: translateX(0); }}
{tail}
}}"""

# ── The rail. Dot 1 is lit the whole cycle and carries no animation.
for n in range(2, 6):
    lit = B[n - 2]
    out[f"hero-dot-{n}"] = f"""@keyframes hero-dot-{n} {{
  0%,   {p(lit)} {{ opacity: 0; transform: scale(0.4); }}
  {p(lit+POP)}, {p(RESET)} {{ opacity: 1; transform: scale(1); }}
  100%      {{ opacity: 0; transform: scale(0.4); }}
}}"""
for n in range(1, 5):
    out[f"hero-link-{n}"] = f"""@keyframes hero-link-{n} {{
  0%,   {p(A[n-1])} {{ transform: scaleX(0); }}
  {p(B[n-1])}, {p(RESET)} {{ transform: scaleX(1); }}
  100%      {{ transform: scaleX(0); }}
}}"""
for n, t in enumerate(TICKS, 1):
    out[f"hero-tick-{n}"] = f"""@keyframes hero-tick-{n} {{
  0%,   {p(t)} {{ opacity: 0; transform: scale(0.6); }}
  {p(t+POP)}, {p(RESET)} {{ opacity: 1; transform: scale(1); }}
  100%      {{ opacity: 0; transform: scale(0.6); }}
}}"""

# ── The two closing frames.
out["hero-outro"] = f"""@keyframes hero-outro {{
  0%,   {p(FILL[0])} {{ clip-path: inset(0 0 100% 0); }}
  {p(FILL[1])}, {p(RESET)} {{ clip-path: inset(0 0 0 0); }}
  {p(T-0.4)}, 100% {{ clip-path: inset(0 0 100% 0); }}
}}"""
out["hero-outro-a"] = f"""@keyframes hero-outro-a {{
  0%,   {p(CLEARA[0])} {{ opacity: 1; }}
  {p(CLEARA[1])}, {p(T-0.6)} {{ opacity: 0; animation-timing-function: steps(1, end); }}
  {p(T-0.3)}, 100% {{ opacity: 1; }}
}}"""
out["hero-outro-b"] = f"""@keyframes hero-outro-b {{
  0%,   {p(CLEARA[1])} {{ opacity: 0; }}
  {p(TILES[0])}, {p(RESET)} {{ opacity: 1; }}
  {p(T-0.6)}, 100% {{ opacity: 0; }}
}}"""
out["hero-outro-line"] = f"""@keyframes hero-outro-line {{
  0%,   {p(LINE[0])} {{ opacity: 0; transform: translateY(8px); }}
  {p(LINE[1])}, {p(RESET)} {{ opacity: 1; transform: translateY(0); }}
  {p(T-0.6)}, 100% {{ opacity: 0; transform: translateY(8px); }}
}}"""
out["hero-write"] = f"""@keyframes hero-write {{
  0%,   {p(WRITE[0])} {{ transform: translateX(0); }}
  {p(WRITE[1])}, {p(T-0.6)} {{ transform: translateX(101%); animation-timing-function: steps(1, end); }}
  {p(T-0.3)}, 100% {{ transform: translateX(0); }}
}}"""
out["hero-deliver"] = f"""@keyframes hero-deliver {{
  0%,   {p(DELIV[0])} {{ opacity: 0; transform: translateY(6px); }}
  {p(DELIV[1])}, {p(RESET)} {{ opacity: 1; transform: translateY(0); }}
  {p(T-0.6)}, 100% {{ opacity: 0; transform: translateY(6px); }}
}}"""
for n, t in enumerate(TILES, 1):
    out[f"hero-tile-{n}"] = f"""@keyframes hero-tile-{n} {{
  0%,   {p(t)} {{ opacity: 0; transform: translateX(-8px) scale(0.9); }}
  {p(t+POP)}, {p(RESET)} {{ opacity: 1; transform: translateX(0) scale(1); }}
  {p(T-0.6)}, 100% {{ opacity: 0; transform: translateX(-8px) scale(0.9); }}
}}"""

if __name__ == "__main__":
    import json, sys
    json.dump({"T": T, "blocks": out}, sys.stdout)
