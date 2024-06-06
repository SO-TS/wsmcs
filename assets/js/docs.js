// noinspection UnnecessaryLabelJS

const WELCOME_PAGE = "_welcome.md";
const SIDEBAR_PAGE = "_sidebar.md";
const ROOT = "/docs/";

const URL = decodeURIComponent(window.location.toString());
const BASE = URL.split("#")[0]
let PAGE = URL.split("#")[1]

const BODY = document.getElementsByClassName("scroll").item(0)

Parse:{
    const MD_PARSE_OPTIONS = {
        gfm: true,
        breaks: true,
        smartLists: true,
    };

    function loadMD(source){
        // noinspection JSUnresolvedReference
        return marked.parse(source, MD_PARSE_OPTIONS);
    }
}

Process:{
    const PROCESSORS = [
        redirectImage,
        redirectLink,
        highlight,
        addHeaderID,
        injectTOC
    ];



    function highlight(doc) {
        for (const e of doc.getElementsByTagName("code")) {
            // noinspection JSUnresolvedReference
            hljs.highlightElement(e)
        }
    }

    function redirectImage(doc) {
        for (const e of doc.getElementsByTagName("img")) {
            const href = e.getAttribute("src")
            if (href.startsWith("http://") || href.startsWith("https://")) {
                continue
            }

            e.setAttribute("src", "docs" + "/" + href)
        }
    }

    function redirectLink(doc) {
        for (const e of doc.getElementsByTagName("a")) {
            const href = e.getAttribute("href");

            if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) {
                continue
            }

            if (href.startsWith("#")) {
                e.setAttribute("href", "javascript:load(\"" + PAGE + ":" + href.replace("#", "") + "\")")
                continue
            }

            e.setAttribute("href", "javascript:load(\"" + href + "\")")
        }
    }

    function addHeaderID(doc) {
        for (let i = 0; i < 7; i++) {
            for (const e of doc.getElementsByTagName("H" + i)) {
                const locText = e.innerHTML
                    .replaceAll(" ", "-")
                    .toLowerCase()
                    .replaceAll(":", "")
                    .replaceAll("：", "")
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("|", "")

                e.setAttribute("id", locText)
            }
        }
    }

    function injectTOC(doc) {
        if(doc.innerHTML.indexOf("<!-- TOC -->")!==-1){
            return;
        }
        console.log("inject TOC")
        //todo
    }

    function getProcessor(){
        return PROCESSORS;
    }
}

Sidebar:{
    function toggleMenu() {
        if (BODY.classList.contains("close")) {
            BODY.classList.remove("close")
        } else {
            BODY.classList.add("close")
        }

        checkIcon()
    }


    new ResizeObserver(() => {
        checkIcon()
    }).observe(BODY);


    function checkIcon() {
        let close;
        if (window.matchMedia("(max-width:768px)").matches) {
            close = !BODY.classList.contains("close")
        } else {
            close = BODY.classList.contains("close")
        }

        if (close) {
            BODY.classList.add("close-btn")
        } else {
            BODY.classList.remove("close-btn")
        }
    }
}


function load(location) {
    if (location === undefined || location === "") {
        location = WELCOME_PAGE;
    }

    let page, loc = undefined;

    if (location.indexOf(":") !== -1) {
        page = location.split(":")[0]
        loc = location.split(":")[1]
    } else {
        page = location;
    }

    if (!page.endsWith(".md")) {
        page = page + ".md"
    }

    PAGE = page;

    window.location.href = BASE + "#" + location;

    const path = "/docs/" + page;

    $.get(path, function (source) {
        const doc = document.getElementById("document");
        doc.innerHTML = loadMD(source)

        for (const func of getProcessor()) {
            func(doc)
        }

        if (loc === undefined) {
            return
        }

        console.log(loc.replace("#", ""))

        const scrollTarget = document.getElementById(loc.replace("#", ""))

        const container = document.getElementById("document-container");

        container.scrollTo({
            top: 500,
            //top: scrollTarget.offsetTop + scrollTarget.offsetHeight,
            behavior: 'smooth'
        })
    });
}


class docsEngine {
    constructor(param) {

    }

    loadPage(page){

    }
}



document.addEventListener('DOMContentLoaded',function (){
    $.get(ROOT + SIDEBAR_PAGE, function (source) {
        const sidebar = document.getElementById("sidebar");

        sidebar.innerHTML = loadMD(source)
        redirectLink(sidebar)
    });

    load(URL.split("#")[1])
})