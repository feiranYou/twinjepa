<h1 align="center">TwinJEPA</h1>

<p align="center">
  <em>Action-Preferred Predictive Representations<br>for Goal-Conditioned Control</em>
</p>

<p align="center">
  <strong>Feiran You</strong> &nbsp;·&nbsp; <strong>Hongyang Du</strong><br>
  The University of Hong Kong
</p>

<p align="center">
  <a href="https://feiranyou.github.io/twinjepa/"><strong>Project page</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://arxiv.org/abs/2610.02922"><strong>Paper</strong></a>
</p>

<p align="center">
  TwinJEPA keeps the TD-JEPA backbone and adds offline-mined reward-gap<br>
  and preference supervision, with no extra cost at inference.
</p>

<p align="center">
  <img src="assets/figures/fig1_overview.png" alt="Figure 1. TwinJEPA overview." width="100%">
</p>

<p align="center">
  <strong>Figure 1.</strong>
  A temporal-prediction objective learns goal-conditioned structure.
  TwinJEPA mines action-diverse pairs and trains reward-gap and preference heads on one shared representation.
</p>

<h2 align="center">Environments</h2>

<p align="center">
  <img src="assets/figures/envs_all.png" alt="Environment views of AntMaze, Maze2D, Walker, Cheetah, and Quadruped." width="100%">
</p>

<table>
  <tr>
    <td align="center" width="20%"><img src="assets/figures/hero_tiles/antmaze.png" alt="AntMaze" width="100%"></td>
    <td align="center" width="20%"><img src="assets/figures/hero_tiles/maze2d.png" alt="Maze2D" width="100%"></td>
    <td align="center" width="20%"><img src="assets/figures/hero_tiles/walker.png" alt="Walker" width="100%"></td>
    <td align="center" width="20%"><img src="assets/figures/hero_tiles/cheetah.png" alt="Cheetah" width="100%"></td>
    <td align="center" width="20%"><img src="assets/figures/hero_tiles/quadruped.png" alt="Quadruped" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><strong>AntMaze</strong><br><sub>OGBench</sub></td>
    <td align="center"><strong>Maze2D</strong><br><sub>D4RL</sub></td>
    <td align="center"><strong>Walker</strong><br><sub>DMC</sub></td>
    <td align="center"><strong>Cheetah</strong><br><sub>ExORL</sub></td>
    <td align="center"><strong>Quadruped</strong><br><sub>ExORL</sub></td>
  </tr>
</table>
