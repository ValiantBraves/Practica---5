const MATCH_LIST = {
    "there": "their",
    "their": "there",
    "they're": "there",
    "There": "Their",
    "Their": "There",
    "They're": "There",
    "THERE": "THEIR",
    "THEIR": "THERE",
    "THEY'RE": "THERE",
    "tHeRe": "tHeIr",
    "tHeIr": "tHeRe",
    "tHeY're": "tHeRe",
    // Add more variations as necessary
};

function transformTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        for (let key in MATCH_LIST) {
            const regex = new RegExp(`\\b${key}\\b`, 'g'); // Match whole words
            text = text.replace(regex, MATCH_LIST[key]);
        }
        node.textContent = text;
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        node.childNodes.forEach(child => transformTextNodes(child));
    }
}

// Start the transformation on the body of the document
transformTextNodes(document.body);
console.log('Evil Extension Loaded');
