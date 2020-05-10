export const domHelper = (script: string, css: string, html: string) => {
    // insertAdjacentHTML doesnt evalutate inserted script tag. Use createContextualFragment instead
    const scriptSource = script;
    const range = document.createRange();
    range.selectNode(document.getElementsByTagName("body").item(0) as Node);
    const documentFragment = range.createContextualFragment(scriptSource);
    document.body.appendChild(documentFragment);

    document.querySelector("body")?.insertAdjacentHTML("beforeend", html);
    document.querySelector("head")?.insertAdjacentHTML("beforeend", css);
}