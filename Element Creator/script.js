//This array has been created to check for standard HTML tags, otherwise it may result in unwanted behaviour with custom components.
const htmlElements = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "slot",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
];

const createNewElementButton = document.querySelector(".create-new-element");
const elementToolbox = document.querySelector(".element-toolbox");
const playgroundElement = document.querySelector(".playground div");
const confirmCreateElementButton = document.querySelector(".create-confirm");
const nameHelperText = document.querySelector(".element-name-helper-text");
const attributeHelperText = document.querySelector(".element-attribute-helper-text");
const createdHeading = document.getElementById('created-elements-heading');
const clearPlaygoundButton = document.querySelector('.clear-playground');

function showToolBox() {
    elementToolbox.classList.toggle("invisible");
}

function createNewElement() {
    const nameOfElement = document.querySelector("#element-name").value;
    const classOfElement = document.querySelector("#element-class-name").value;
    const idOfElement = document.querySelector("#element-id-name").value;
    const attributes = document.querySelector("#element-attributes").value;
    const textContent = document.querySelector("#element-textcontent").value;

    if (nameOfElement === "") {
        showNameHelperText();
        return;
    } else if(!htmlElements.includes(nameOfElement)) {
        showNameHelperText();
        return;
    }
    //Can Add Attribute Validation Check but it becomes obsolete
    const attributeArray = attributes.split(',');
    const newElement = new Element(nameOfElement, classOfElement, idOfElement, attributeArray, textContent);
    newElement.render();
}

class Element {
    constructor(nameOfElement, classesOfElement, idOfElement, attributeArray, textContent) {
        this.element = document.createElement(nameOfElement);
        this.element.className = classesOfElement;
        this.idOfElement = idOfElement;
        this.attributeArray = attributeArray;
        this.element.textContent = textContent;
        if (attributeArray && attributeArray.length > 0 && attributeArray.length%2 === 0) {
            for(let i=0; i<attributeArray.length - 1; i++){
                this.element.setAttribute(attributeArray[i].trim(), attributeArray[i+1].trim());
            }
        } else {
            showAttributeHelperText();
        }
    }

    render() {
        playgroundElement.append(this.element);
        hideAttributeHelperText();
        hideNameHelperText();
        hideCreatedHeading();
    }
}

function clearPlaygound() {
    while(playgroundElement.firstChild) {
        playgroundElement.removeChild(playgroundElement.firstChild);
    }
    showCreatedHeading();
}

function showNameHelperText() {
    nameHelperText.classList.remove("invisible");
}

function hideNameHelperText() {
    nameHelperText.classList.add("invisible");
}

function showAttributeHelperText() {
    attributeHelperText.classList.remove("invisible");
}

function hideAttributeHelperText() {
    attributeHelperText.classList.add("invisible");
}

function showCreatedHeading() {
    createdHeading.classList.remove("invisible");
}

function hideCreatedHeading() {
    createdHeading.classList.add("invisible");
}

clearPlaygoundButton.addEventListener('click', clearPlaygound);
confirmCreateElementButton.addEventListener("click", createNewElement);
createNewElementButton.addEventListener("click", showToolBox);