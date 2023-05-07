


// create viryual dom
function createElement(tag: string, children: any)
function createElement(tag: any, propsOrChildren?: any, children?: any) {
    const l = arguments.length
    if (l === 2) {
        return {
            tag,
            children: propsOrChildren
        }
    } else {
        return {
            tag,
            props: propsOrChildren,
            children
        }
    }
}

createElement('h1', 'hello world')

const isPrimitive = (v: unknown) => {
    const type = typeof v
    return v === null || type !== "object" && type !== "function"
}

const isArray = Array.isArray

export const mount = (vdom: any, container: string | HTMLElement) => {
    const containerEl = typeof container === 'string' ? document.querySelector(container) as HTMLElement : container
    if (containerEl === null) return
    const { tag, props, children } = vdom
    const el = document.createElement(tag) as HTMLElement

    if (props) {
        Object.keys(props).forEach(key => {
            const value = props[key]
            if (key.startsWith('on') && typeof value === "function") {
                el.addEventListener(key.slice(2).toLowerCase(), value)
            } else {
                el.setAttribute(key, value)
            }
        })
    }

    if(isArray(children)) {
        children.forEach(child => {
            mount(child, el)
        })
    } else {
        el.textContent = children
    }


    containerEl.appendChild(el)
}