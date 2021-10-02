import React, { useState } from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})

interface addText {
    onSubmit: Function
    id: number
}

export function AddText(props: addText) {
    const { id, onSubmit } = props
    const [value, setValue] = useState<string>();

    return (
        <div>
            <SunEditor
                setContents={value}
                onChange={setValue}
                onBlur={onSubmit({ id, value })}
                setOptions={{
                    buttonList: [
                        ["undo", "redo"],
                        ["font", "fontSize"],
                        // ['paragraphStyle', 'blockquote'],
                        [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript"
                        ],
                        ["fontColor", "hiliteColor"],
                        ["align", "list", "lineHeight"],
                        ["outdent", "indent"],

                        ["table", "horizontalRule", "link", "image", "video"],
                        // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                        // ['imageGallery'], // You must add the "imageGalleryUrl".
                        // ["fullScreen", "showBlocks", "codeView"],
                        ["preview", "print"],
                        ["removeFormat"]

                        // ['save', 'template'],
                        // '/', Line break
                    ],
                    defaultTag: "div",
                    minHeight: "300px",
                    showPathLabel: false,
                }}
            />
        </div>
    );
}