---
title: 'Designing a 3D-Printable Tent Zipper Lock'
date: 2026-08-05T04:00:00.000Z
summary: A single flat printed piece that pinches tent zipper pulls together with friction. A deterrent and warning system that stays easy to escape from inside.
draft: true
tags:
- 3d-printing
- design
- camping
---

## Idea

A 3D-printable tent lock that pinches the two zipper pulls together using the pulls themselves and friction. One flat piece, printed in an orientation that makes it strong and hard to break or remove from outside the tent.

The goal is a deterrent and warning system, not a vault. Someone forcing it makes noise and takes time. Critically, it must not add complexity to getting out of the tent from the inside.

## Points to develop

- Print orientation matters: layer lines perpendicular to the pull force so tampering can't split layers
- Single flat piece: no assembly, no hardware, prints anywhere
- Friction fit on the zipper pulls: works across common pull geometries or parameterized per tent
- Threat model: deterrent + noise/delay warning, not real security (tent fabric cuts anyway)
- Safety constraint drives the design: one-motion removal from inside, fire/emergency egress
- Publish the model (Printables/Thingiverse) with OpenSCAD/CAD source and print settings
