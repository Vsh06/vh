pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const pdfUrl="pdf/book.pdf";

pdfjsLib.getDocument(pdfUrl).promise.then(async pdf=>{

    const pages=[];

    for(let i=1;i<=pdf.numPages;i++){

        const page=await pdf.getPage(i);

        const viewport=page.getViewport({scale:2});

        const canvas=document.createElement("canvas");
        const ctx=canvas.getContext("2d");

        canvas.width=viewport.width;
        canvas.height=viewport.height;

        await page.render({
            canvasContext:ctx,
            viewport:viewport
        }).promise;

        const div=document.createElement("div");
        div.className="page";
        div.appendChild(canvas);

        pages.push(div);
    }

    const flipbook=new St.PageFlip(
        document.getElementById("book"),
        {
            width:450,
            height:650,

            size:"stretch",

            minWidth:315,
            maxWidth:1200,

            minHeight:420,
            maxHeight:1600,

            showCover:true,

            mobileScrollSupport:true,

            usePortrait:true,

            startPage:0
        }
    );

    flipbook.loadFromHTML(pages);

});
