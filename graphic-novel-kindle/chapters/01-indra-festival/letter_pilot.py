#!/usr/bin/env python3
"""Deterministically normalize and letter the Chapter 1 English pilot."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "pilot-art" / "unlettered"
OUT = ROOT / "pilot-art" / "lettered"
PKG = ROOT / "pilot-package"
OUT.mkdir(parents=True, exist_ok=True)
PKG.mkdir(parents=True, exist_ok=True)

W, H = 2400, 3840
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REG, size)

def fit_canvas(im):
    scale = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.Resampling.LANCZOS)
    left = (im.width - W) // 2
    top = (im.height - H) // 2
    return im.crop((left, top, left + W, top + H)).convert("RGB")

def wrapped(draw, text, fnt, maxw):
    words = text.split()
    lines, line = [], ""
    for word in words:
        trial = (line + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= maxw:
            line = trial
        else:
            if line: lines.append(line)
            line = word
    if line: lines.append(line)
    return lines

def box(draw, xy, text, size=58, bold=False, dark=False, align="left", radius=26):
    x, y, w, h = xy
    fill = (19, 28, 38, 235) if dark else (250, 244, 224, 238)
    ink = (250, 246, 232) if dark else (21, 28, 34)
    draw.rounded_rectangle((x, y, x+w, y+h), radius=radius, fill=fill, outline=(28, 35, 42), width=4)
    fnt = font(size, bold)
    lines = wrapped(draw, text, fnt, w-54)
    lineh = int(size * 1.22)
    total = len(lines) * lineh
    ty = y + max(22, (h-total)//2)
    for line in lines:
        tw = draw.textlength(line, font=fnt)
        tx = x+27 if align == "left" else x+(w-tw)/2
        draw.text((tx, ty), line, font=fnt, fill=ink, stroke_width=1)
        ty += lineh

def sfx(draw, xy, text):
    x, y = xy
    fnt = font(92, True)
    draw.text((x, y), text, font=fnt, fill=(245,238,215), stroke_fill=(24,31,38), stroke_width=8)

pages = {
1: [
    ("box", (80,110,850,240), "Puhar was still dark.", 64, False, True),
    ("box", (1410,3220,900,250), "The festival was already being built.", 62, False, True),
    ("box", (720,3540,960,180), "CHAPTER ONE · THE FESTIVAL PROCLAMATION", 47, True, True),
],
2: [
    ("box", (80,90,820,205), "Old sand was cleared from the public ways.", 53, False, False),
    ("box", (1380,2085,400,160), "Lift.", 54, True, False),
    ("box", (1835,2085,400,160), "Again.", 54, True, False),
    ("box", (1420,2920,820,205), "Will all of Puhar look different by sunrise?", 47, False, False),
    ("box", (1350,3170,890,205), "Look again when the drum sounds.", 49, False, False),
],
3: [
    ("sfx", (1730,260), "THUM."),
    ("box", (100,2070,1010,320), "People of Puhar! For twenty-eight days, the festival of Indra will be observed.", 50, True, False),
    ("box", (90,3260,2200,400), "The festival carried a public hope: rain in season, prosperity in the land, and relief from hunger, sickness and enmity.", 49, False, True),
],
4: [
    ("box", (80,85,980,235), "Ships, roads and river craft brought strangers into the same streets.", 52, False, False),
    ("box", (1050,1940,1160,230), "By morning, Puhar held voices born far beyond Puhar.", 54, False, False),
],
5: [
    ("box", (90,90,920,210), "Teachers of different paths were called to speak.", 52, False, False),
    ("box", (120,1600,930,210), "Let each teaching be heard plainly.", 54, True, False),
    ("box", (1320,1600,930,210), "Then let it be questioned plainly.", 54, True, False),
    ("box", (730,3470,940,210), "Argument, too, belonged to the festival.", 54, False, True),
],
6: [
    ("box", (1260,100,950,190), "The drum promised abundance.", 55, False, False),
    ("box", (1050,1090,1200,205), "Abundance is tested in smaller measures.", 54, False, False),
    ("box", (80,2290,850,250), "Grain. Water. Work. A place in the street.", 53, False, False),
],
7: [
    ("box", (100,90,1060,300), "By sunrise, work had become colour, music, fragrance and order.", 52, False, False),
    ("box", (1450,120,760,185), "Puhar called it festival.", 56, True, False),
    ("sfx", (1540,3340), "THUM. THUM. THUM."),
],
8: [
    ("box", (1350,240,850,190), "The festival begins!", 58, True, False),
    ("sfx", (90,1880), "THUM... THUM..."),
    ("box", (90,3280,970,210), "One house did not answer the drum.", 54, False, True),
    ("box", (1110,3280,1190,250), "By noon, the city would be speaking of its silence.", 52, False, True),
    ("box", (570,3600,1260,160), "NEXT · CHAPTER TWO · WHAT THE CITY SAID", 43, True, True),
],
}

guided = []
panel_regions = {
 1: [(0,0,2400,3840)],
 2: [(0,0,2400,1040),(0,1040,2400,850),(0,1890,2400,900),(0,2790,2400,1050)],
 3: [(0,0,2400,1270),(0,1270,2400,650),(0,1920,2400,900),(0,2820,2400,1020)],
 4: [(0,0,2400,950),(0,950,2400,950),(0,1900,2400,950),(0,2850,2400,990)],
 5: [(0,0,2400,1270),(0,1270,1200,1270),(1200,1270,1200,1270),(0,2540,2400,1300)],
 6: [(0,0,2400,1080),(0,1080,2400,850),(0,1930,2400,900),(0,2830,2400,1010)],
 7: [(0,0,2400,2600),(0,2600,800,1240),(800,2600,800,1240),(1600,2600,800,1240)],
 8: [(0,0,2400,1130),(0,1130,2400,650),(0,1780,2400,650),(0,2430,2400,1410)],
}

for n in range(1,9):
    src = SRC / f"GN-CH01-P{n:03d}_v1.0.png"
    im = fit_canvas(Image.open(src))
    draw = ImageDraw.Draw(im, "RGBA")
    for item in pages[n]:
        if item[0] == "box": box(draw, item[1], item[2], item[3], item[4], item[5])
        else: sfx(draw, item[1], item[2])
    out = OUT / f"GN-CH01-P{n:03d}_lettered_v1.0.jpg"
    im.save(out, "JPEG", quality=92, optimize=True, progressive=True, dpi=(300,300))
    guided.append({"page": n, "file": out.name, "canvas": [W,H], "regions": [
        {"order": i+1, "x":x, "y":y, "width":w, "height":h} for i,(x,y,w,h) in enumerate(panel_regions[n])
    ]})

(PKG / "guided-view.json").write_text(json.dumps({"chapter":1,"title":"The Festival Proclamation","pages":guided}, indent=2)+"\n")
print("lettered", len(pages), "pages")
