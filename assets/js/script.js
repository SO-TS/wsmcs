//noinspection UnnecessaryLabelJS

const PARSER = new DOMParser();
const STYLES = new Map([
    ['.icon-wrapper', 'bg-highlight rounded-lg w-12 h-12 p-3 icon'],
    ['.button-light', 'font-medium px-6 py-1.5 rounded-md hover:shadow-md transition text-md bg-blue-600 hover:bg-blue-500 text-white'],
    ['.button', 'font-medium px-6 py-1.5 rounded-md hover:shadow-md transition text-md border-1 border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'],
    ['.title', 'font-semibold px-6 lg:px-4']
]);

function setTheme(dark) {
    const body = document.getElementById('root');
    if (dark) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark")
        document.getElementById("light-dark-switch").classList.remove("fa-sun")
        document.getElementById("light-dark-switch").classList.add("fa-moon")
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light")
        document.getElementById("light-dark-switch").classList.remove("fa-moon")
        document.getElementById("light-dark-switch").classList.add("fa-sun")
    }
}

function copy(e, t) {
    const n = document.createElement("input");
    document.body.appendChild(n)
    n.setAttribute("value", e)
    n.select()
    document.execCommand("copy")
    alert(t)
    document.body.removeChild(n);
}

function queryURLArgument(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substring(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    let context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    if (context == null || context === "" || context === undefined) {
        return undefined;
    }
    return context;
}

function buildComponents(callback) {
    $.get("/component.html", function (source) {
        const sourceDocument = (new DOMParser).parseFromString(source, "text/html");

        for (const p of document.getElementsByTagName("provider")) {
            sourceDocument.body.appendChild(p)
            console.log(document.getElementsByTagName("provider"))
        }

        for (const compose of document.getElementsByTagName("compose")) {
            const type = compose.getAttribute("type")
            const properties = compose.getElementsByTagName("property")
            const location = compose.getAttribute("placing")
            const template = sourceDocument.getElementById(type);

            const src = createSource(properties, template, sourceDocument);
            let insert = getInsert(location, parent);

            insert.innerHTML = insert.innerHTML + "\n" + src;
        }

        for (const apply of document.getElementsByTagName("apply")) {
            const type = apply.getAttribute("type")
            const properties = apply.getElementsByTagName("property")
            const location = apply.getAttribute("placing")
            const template = sourceDocument.getElementById(type);

            const src = createSource(properties, template, sourceDocument);

            const dom = PARSER.parseFromString(src, "text/html");

            const processedElement = dom.getElementsByTagName("body").item(0).firstElementChild;

            processedElement.removeAttribute("id")

            if (apply.hasAttribute("component-id")) {
                processedElement.setAttribute("id", apply.getAttribute("component-id"))
            }

            const parent = document.getElementById(location);
            let insert = getInsert(location, parent);

            insert.appendChild(processedElement);
        }

        for (const child of document.getElementsByTagName("child")) {
            const location = child.getAttribute("placing")
            const parent = document.getElementById(location);
            let insert = getInsert(location, parent);

            for (const e of child.children) {
                insert.appendChild(e);
            }
        }

        callback()
    });
}

function getInsert(location, parent) {
    if (location === "#page") {
        return document.getElementById("#page")
    }
    if (parent.classList.contains("component-child")) {
        return parent;
    }

    return parent.getElementsByClassName("component-child").item(0)
}

function createSource(properties, template, dom) {
    let src = template.firstElementChild.outerHTML

    if (template.tagName === "IMPORT") {
        const type = template.getAttribute("import")

        const temp = dom.getElementById(type)
        const prop = template.getElementsByTagName("property");

        src = createSource(prop, temp, dom);
    }

    for (const prop of properties) {
        const name = prop.getAttribute("data-id")
        const value = prop.innerHTML;

        src = src.replaceAll("{{" + name + "}}", value)
    }

    return src
}

document.addEventListener("DOMContentLoaded", () => {
    buildComponents(() => {
        const body = document.getElementsByTagName("body").item(0)
        const title = body.getAttribute("data-nav-title")

        if (!(title == null || title === "")) {
            const e = document.getElementById("nav-title")
            e.innerHTML = e.innerHTML + " | " + title
        }

        document.querySelectorAll(".lazy-img").forEach((e) => {
            e.setAttribute("loading", "lazy");
            e.setAttribute("decoding", "async");
        });


        Style:{
            STYLES.forEach((value, key) => {
                const elements = document.querySelectorAll(key)
                for (let element of elements) {
                    for (let className of value.split(" ")) {
                        element.classList.add(className);
                    }
                }
            });
        }

        Theme:{
            if (localStorage.getItem("theme") === null) {
                if (matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme(true);
                } else if (matchMedia('(prefers-color-scheme: light)').matches) {
                    setTheme(false);
                }
            }
            if (localStorage.getItem("theme") === "dark") {
                setTheme(true);
            } else {
                setTheme(false);
            }

            document.getElementById("light-dark-switch").addEventListener('click', () => {
                if (localStorage.getItem("theme") === "light") {
                    setTheme(true);
                } else {
                    setTheme(false);
                }
            })
        }

        Nav:{
            const child = document.getElementById("nav-mobile-child");
            const navItem = document.getElementById("nav-contents");
            const container = document.getElementById("nav-mobile-container");

            for (const e of navItem.childNodes) {
                const content = e.outerHTML;
                if (content === undefined) {
                    continue
                }
                child.innerHTML = child.innerHTML +
                    "<li class='color-gray-200 text-gray-800 hover:text-blue-600 text-sm transition-colors dark:text-gray-200 dark:hover:text-blue-400'>" +
                    "<div class='px-4 py-2 w-full block'>" + content +
                    "</div>" +
                    "</li>"
            }
            container.addEventListener('click', () => {
                if (container.classList.contains("open")) {
                    container.classList.remove("open")
                } else {
                    container.classList.add("open")
                }
            });
        }

        Scroll:{
            if (queryURLArgument("loc") !== undefined) {
                let bridge = document.querySelector('#' + queryURLArgument("loc"));

                window.scrollTo({
                    top: bridge.offsetTop + bridge.offsetHeight,
                    behavior: 'smooth'
                })
            }
        }

        AOS:{
            const hooks = {
                'animate': function (element) {
                    element.setAttribute('data-aos', 'fade-up');
                },
                'animate-down': function (element) {
                    element.setAttribute('data-aos', 'fade-down');
                },
                'animate-left': function (element) {
                    element.setAttribute('data-aos', 'fade-left');
                },
                'animate-right': function (element) {
                    element.setAttribute('data-aos', 'fade-right');
                }
            }

            for (const key in hooks) {
                if (!hooks.hasOwnProperty(key)) {
                    continue;
                }
                document.querySelectorAll('.' + key).forEach(function (e) {
                    hooks[key](e);
                    //e.classList.add('aos-init', 'aos-animate');
                    if (e.hasAttribute('animate-delay')) {
                        e.setAttribute('data-aos-delay', e.getAttribute('animate-delay'))
                    }
                });
            }
            AOS.init();
        }
    })
});