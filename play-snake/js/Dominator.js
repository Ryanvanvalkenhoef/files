class Dominator {
    // Define instances that represent a DOM element as object
    constructor(object) {
        // Replicate the template with the dynamic values
        Object.assign(this, object);

        // Define the children of the concerning object
        // as new instances of the class and push them to an array
        let childObjects = Array();
        if (object.children) {
            for (const child of object.children) {
                let childObject = new Dominator(child);
                childObjects.push(childObject);
            }
        }

        // Assign the values specific for the object
        this.eventListeners = [];
        this.children = childObjects;
        this.element = this.domElement;
    }

    get domElement() {
        // Generate and return a DOM element with the values of the object
        const domElement = document.createElement(this.tag);
        if (this.id) domElement.id = this.id;
        if (this.content) domElement.innerText = this.content;
        if (this.properties) for (const prop in this.properties) {
            domElement[prop] = this.properties[prop];
        }
        if (this.attributes) for (const key in this.attributes) {
            domElement.setAttribute(key, this.attributes[key]);
        }
        if (this.classes) for (const cssClass of this.classes) {
            domElement.classList.add(cssClass);
        }
        if (this.children) for (const child of this.children) {
            domElement.append(child.domElement);
            if (child.id) this[child.id] = child.domElement;
        }
        if (this.eventListeners) for (const eventListener of this.eventListeners) {
            domElement.addEventListener(eventListener.type, eventListener.action)
         }
        this.element = domElement;

        return domElement;
    }

    findChildById(id) {
        if (this.children) {
            // Iterate through the children
            for (const child of this.children) {
                // Return child if id is equal to child.id and of the same type
                if (child.id === id) {
                    return child;
                } else if (child.children) {
                    // Else, if the child itself has children, 
                    // execute the function on the child and return what's found
                    let found = child.findChildById(id);
                    if (found) return found;
                }
            }
        }
        return false;
    }

    event(action, id, type = 'click') {
        // If id is present, define node with searched child
        // and push event when present
        if (id) {
            const node = this.findChildById(id);
            if (node) {
                node.eventListeners.push({ type: type, action: action });
            }
        } else {
            // Otherwise push event to its own eventListeners
            this.eventListeners.push({ type: type, action: action });
        }
    }
    
}