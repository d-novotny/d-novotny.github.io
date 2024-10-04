import os
import copy
import json
import subprocess
from pybtex.database import parse_file

FIELDS_TO_BUTTONS = {
    "code": "fa fa-code",
    "projectpage": "fa fa-lightbulb-o",
    "talk": "fa fa-video-camera",
    "video": "fa fa-picture-o",
    "link": "fa fa-file-pdf-o",
    "dataset": "fa fa-database",
}

FIELDS_TO_BUTTON_NAMES = {
    "projectpage": "project page",
}

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FFMPEG_BIN = "ffmpeg"

def _video_to_gif(inpath: str, outpath: str):
    palette="/tmp/palette.png"
    filters="fps=15,scale=320:-1:flags=lanczos"
    cmd = [
        FFMPEG_BIN, "-i", inpath, "-vf" ,f"{filters},palettegen", "-y", palette
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    cmd = [
        FFMPEG_BIN, "-i", inpath, "-i", palette,
        "-lavfi", f"{filters} [x]; [x][1:v] paletteuse", "-y", outpath,
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

bib_data = parse_file(os.path.join(PROJECT_ROOT, "assets", "bib", "main.bib"))
all_entries = reversed(list(bib_data.entries))
bib_dicts = {}
for paper_id in all_entries:
    print(f"Processing {paper_id}")
    yidx = paper_id.find("20")
    paper_id_2digit_year = paper_id[:yidx] + paper_id[yidx+2:]
    entry = bib_data.entries[paper_id]
    # print(entry)
    
    one_bib_dict = {}
    author = []
    for person in entry.persons["author"]:
        name = (
            person.last_names[0] 
            + ", "
            + " ".join(f[0] + "." for f in person.first_names)
        )
        author.append(name)
    author = " and ".join(author)
    one_bib_dict["author"] = author
    
    for k in ["title", "year", "note", "extranote"]:
        # assert k in entry.fields, f"Key {k} not found in entry {e}"
        try:
            one_bib_dict[k] = entry.fields[k]
        except KeyError:
            if k in ["title", "year"]:
                raise KeyError(f"Key '{k}' not found in entry {e}")
    
    journal = entry.fields.get("journal", entry.fields.get("booktitle"))
    journal = journal.replace("{", "").replace("}", "").replace("Proc. ", "")
    one_bib_dict["journal"] = journal
    
    # setup paper link
    if "link" in entry.fields:
        pdf_path = entry.fields["link"]
    else:
        pdf_filepath = os.path.join(PROJECT_ROOT, "papers", f"{paper_id_2digit_year}.pdf")
        assert os.path.exists(pdf_filepath), f"PDF not found for {paper_id}"
        pdf_path = f"papers/{paper_id_2digit_year}.pdf"
    entry.fields["link"] = pdf_path
    
    # buttons
    buttons = {}
    for k in entry.fields:    
        if k in FIELDS_TO_BUTTONS:
            button_name = FIELDS_TO_BUTTON_NAMES.get(k, k)
            buttons[button_name] = [entry.fields[k], FIELDS_TO_BUTTONS[k]]
    one_bib_dict["buttons"] = buttons
    
    # thumb path
    thumb_path = f"paper_thumbs/thumb_{paper_id_2digit_year}"
    for pfix in (".mov", ".mp4", ".gif", ".png", ".jpg", ".jpeg"):
        thumb_full_path = os.path.join(PROJECT_ROOT, thumb_path+pfix)
        if os.path.exists(thumb_full_path):
            if pfix in (".mp4", ".mov"):
                gifpath = thumb_full_path.replace(pfix, ".gif")
                if os.path.isfile(gifpath):
                    continue
                print(f"Converting video to gif: {thumb_full_path}")
                _video_to_gif(
                    thumb_full_path,
                    gifpath,
                )
                continue
            print(f"Thumbnail found: {thumb_full_path}")
            one_bib_dict["thumbnail"] = f"{thumb_path}{pfix}"
            break
    
    if "thumbnail" not in one_bib_dict:
        raise ValueError(f"{paper_id}: Thumbnail not found for {paper_id}")

    bib_dicts[paper_id_2digit_year] = one_bib_dict

bib_dicts_str = json.dumps(bib_dicts, indent=4)

with open(os.path.join(PROJECT_ROOT, "assets", "js", "bib_data.js"), "w") as f:
    f.write(f"var bib_data = {bib_dicts_str};")