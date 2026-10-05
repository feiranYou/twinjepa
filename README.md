# TwinJEPA project page

Academic demo page (NSPG-style layout) with environment demo videos.

## Preview locally

```bash
cd /mnt/Data/feiran/td_jepa/tdjepa_real_main/docs/project_page
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

On Mac (after syncing this folder):

```bash
cd docs/project_page && python3 -m http.server 8765
```

## What is included

- `index.html` / `styles.css` / `main.js` — page shell
- `assets/figures/` — AntMaze / Walker / Maze2D result figures + env stills
- `assets/demos/{env}_{fail,success}.mp4` — **fail vs success** live-simulator pairs (not random mid-buffer clips)
- `assets/demos/demo_manifest.json` — which episode was scored as fail / success

## Regenerate live demos

```bash
export MUJOCO_GL=egl
export PYTHONPATH=/mnt/Data/feiran/td_jepa/tdjepa_real_main
export PATH=/home/feiran/td_jepa_from_4090/env/tdjepa311/bin:$PATH
python scripts/d4rl_probe/render_live_env_demos.py
# optional: DEMO_ONLY=walker,cheetah DEMO_MAX_FRAMES=300 DEMO_SCAN_N=400
```

Scoring:

- **AntMaze / Maze2D**: goal-reaching on task1 (`dist ≤ 0.5`). Success clips are windowed around the first hit.
- **Walker / Cheetah / Quadruped**: lowest vs highest stored task return in the RND buffer.

## Upgrade to Twin *policy* demos

These clips still replay **offline dataset** trajectories (now filtered). To show Twin policy
success vs fail, extend the script to load a checkpoint + reward-inference `z` and call
`agent.act` while rendering.

## GitHub Pages

Point Pages at `/docs` and open `/project_page/`, or copy this folder to the repo root as `index.html`.
