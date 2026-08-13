#!/usr/bin/env python3
"""Build review PDF, integrity manifests, and Kindle preview derivatives."""

from pathlib import Path
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import csv, hashlib, json

ROOT = Path(__file__).resolve().parent
ART = ROOT / "pilot-art"
LETTERED = ART / "lettered"
UNLETTERED = ART / "unlettered"
PKG = ROOT / "pilot-package"
PKG.mkdir(exist_ok=True)

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()

pages = sorted(LETTERED.glob("GN-CH01-P*_lettered_v1.0.jpg"))
assert len(pages) == 8
for p in pages:
    assert Image.open(p).size == (2400,3840)

pdf = PKG / "Manimekalai_Chapter_1_Pilot_English_v1.0.pdf"
c = canvas.Canvas(str(pdf), pagesize=(1500,2400), pageCompression=1)
for p in pages:
    c.drawImage(ImageReader(str(p)), 0, 0, width=1500, height=2400, preserveAspectRatio=False)
    c.showPage()
c.save()

manifest=[]
for kind, folder in (("unlettered",UNLETTERED),("lettered",LETTERED)):
    for p in sorted(folder.glob("GN-CH01-P*")):
        im=Image.open(p)
        manifest.append({"kind":kind,"file":str(p.relative_to(ROOT)),"width":im.width,"height":im.height,"bytes":p.stat().st_size,"sha256":sha(p)})
manifest.append({"kind":"package","file":str(pdf.relative_to(ROOT)),"width":"","height":"","bytes":pdf.stat().st_size,"sha256":sha(pdf)})
with (PKG/"asset-manifest.csv").open("w", newline="", encoding="utf-8") as f:
    w=csv.DictWriter(f, fieldnames=manifest[0].keys(), lineterminator="\n")
    w.writeheader()
    w.writerows(manifest)

# Device-size static previews used only for QA.
for name,width in (("phone",720),("tablet",1200)):
    out=PKG/name; out.mkdir(exist_ok=True)
    for p in pages:
        im=Image.open(p); h=round(im.height*width/im.width)
        im.resize((width,h),Image.Resampling.LANCZOS).save(out/p.name,quality=88,optimize=True)

print(pdf)
print("manifest records",len(manifest))
