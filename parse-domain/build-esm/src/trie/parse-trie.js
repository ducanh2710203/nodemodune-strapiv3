import * as characters from "./characters";
import { createRootNode, createOrGetChild, NODE_TYPE_ROOT, } from "./nodes";
export const parseTrie = (serializedTrie) => {
    const rootNode = createRootNode();
    let domain = "";
    let parentNode = rootNode;
    // Type assertion necessary here due to a TypeScript unsoundness
    // https://github.com/microsoft/TypeScript/issues/9998#issuecomment-235963457
    let node = rootNode;
    const addDomain = () => {
        node = createOrGetChild(parentNode, domain);
        domain = "";
    };
    for (let i = 0; i < serializedTrie.length; i++) {
        const char = serializedTrie.charAt(i);
        switch (char) {
            case characters.SAME: {
                addDomain();
                continue;
            }
            case characters.DOWN: {
                addDomain();
                parentNode = node;
                continue;
            }
            case characters.RESET: {
                addDomain();
                parentNode = rootNode;
                continue;
            }
            case characters.UP: {
                if (parentNode.type === NODE_TYPE_ROOT) {
                    throw new Error(`Error in serialized trie at position ${i}: Cannot go up, current parent node is already root`);
                }
                addDomain();
                parentNode = parentNode.parent;
                continue;
            }
        }
        domain += char;
    }
    if (domain !== "") {
        addDomain();
    }
    return rootNode;
};
//# sourceMappingURL=parse-trie.js.map