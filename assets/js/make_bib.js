// bib data is imported from bib_data.js

for (const paper_id in bib_data) {
    // console.log(`${paper_id}: ${bib_data[paper_id]}`);
    paper_entry = bib_data[paper_id];

    // make the div for the paper entry
    const div = document.createElement('div');
    div.className = "row 100% uniform";

    innerHTML = "";

    // make thumbnail
    thumb_path = paper_entry["thumbnail"]
    innerHTML += `<div class="4u"><span class="image fit"><img src="${thumb_path}" alt="" /></span></div>`;
    
    // make author field
    author_string = paper_entry["author"]
    innerHTML += `<div class="8u"><p><i>${author_string}</i><br>`;
    
    // make title field
    title_string = paper_entry["title"]
    innerHTML += `<strong class="hoverable">${title_string}</strong></br>`

    // add extra fields
    journal_string = paper_entry["journal"]
    innerHTML += `${journal_string}`
    year_string = paper_entry["year"]
    innerHTML += ` ${year_string}`
    if ("note" in paper_entry){
        note_string = paper_entry["note"]
        innerHTML += `, ${note_string}`
    }
    if ("extranote" in paper_entry){
        extra_note_string = paper_entry["extranote"]
        innerHTML += `, <strong style="color:#8BBE6A">${extra_note_string}</strong>`
    }
    innerHTML += `<br>`

    // all buttons
    if ("buttons" in paper_entry) {
        buttons = paper_entry["buttons"]
        for (const button in buttons) {
            link = buttons[button][0]
            icon = buttons[button][1]
            innerHTML += `<a href="${link}" class="button tiny"><i class="${icon}" aria-hidden="true"></i>&nbsp ${button}</a> `;
        }
    }

    innerHTML += `</div>`;

    div.innerHTML = innerHTML

    document.getElementById('publist').appendChild(div);

    // document.body.getElementById('publist').appendChild(div);

}								






// bib_data = {
//     // "ortiz2022isdf": {
//     //     "buttons": {
//     //         "code": ["https://github.com/facebookresearch/iSDF", "fa fa-code"],
//     //         "project page": ["https://github.com/facebookresearch/iSDF", "fa fa-lightbulb-o"],
//     //         "talk": ["https://www.youtube.com/watch?v=mAKGl1wBSic&ab_channel=JosephOrtiz", "fa fa-video-camera"],
//     //     }
//     // },
//     // "shapovalov2021densepose": {
//     //     "note": "oral presentation",
//     // },
//     // "reizenstein21co3d": {
//     //     "note": "oral presentation",
//     //     "extra_note": "Best Paper Honorable Mention",
//     //     "is_gif_thumb": true,
//     //     "buttons": {
//     //         "code": ["https://github.com/facebookresearch/co3d", "fa fa-code"],
//     //         "project page": ["https://ai.facebook.com/datasets/CO3D-dataset/", "fa fa-lightbulb-o"],
//     //         "talk": ["https://www.youtube.com/watch?v=hMx9nzG50xQ", "fa fa-video-camera"]
//     //     }
//     // },
//     // "henzler21unsupervised": {
//     //     "buttons": {
//     //         "talk": ["https://youtu.be/910z84dldEU", "fa fa-video-camera"]
//     //     }
//     // },
//     // "eisenberger21neuromorph": {
//     //     "is_gif_thumb": true,
//     // },
//     // "biggs203dmulti": {
//     //     "note": "spotlight presentation",
//     //     "buttons": {
//     //         "project page": ["https://sites.google.com/view/3dmb/home", "fa fa-lightbulb-o"],
//     //         "talk": ["https://youtu.be/uSvswzbQ-Q8", "fa fa-video-camera"]
//     //     }
//     // },
//     // "graham20ridgesfm": {
//     //     "buttons": {
//     //         "code": ["https://github.com/facebookresearch/RidgeSfM", "fa fa-code"]
//     //     }
//     // },
//     // "novotny20c3dm": {
//     //     "buttons": {
//     //         "code": ["https://github.com/facebookresearch/c3dm", "fa fa-code"]
//     //     }
//     // },
//     // "novotny19c3dpo": {
//     //     "note": "oral presentation",
//     //     "is_gif_thumb": true,
//     //     "buttons": {
//     //         "code": ["https://github.com/facebookresearch/c3dpo_nrsfm", "fa fa-code"],
//     //         "talk": ["https://youtu.be/zem03fZWLrQ?t=2303", "fa fa-video-camera"]
//     //     }
//     // },
//     // "novotny18capturing": {
//     //     "journal": "TPAMI 2018",
//     //     "is_gif_thumb": true,
//     // },
//     "novotny18semi": {
//         "journal": "ECCV 2018"
//     },
//     "novotny18self": {
//         "note": "spotlight presentation",
//         "buttons": {
//             "talk": ["https://www.facebook.com/CVPR2018/videos/1994396307555935/", "fa fa-video-camera"]
//         }
//     },
//     "novotny17learning": {
//         "note": "oral presentation",
//         "buttons": {
//             "talk": ["https://www.youtube.com/watch?v=esYBbQuKFZU&t=", "fa fa-video-camera"]
//         }
//     },
//     "novotny17anchornet": {
//         "buttons": {
//             "code": ["code/anchornet_code_v0.1.zip", "fa fa-code"]
//         }
//     },
//     "novotny16ihave": {
//         "buttons": {
//             "dataset": ["http://www.robots.ox.ac.uk/~vgg/data/animal_parts/", "fa fa-database"]
//         }
//     },
//     "novotny15cascaded": {
//         "buttons": {
//             "video": ["goodies/iccv15spotlight.mp4", "fa fa-picture-o"]
//         }
//     }
// }
