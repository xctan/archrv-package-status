import { h } from 'vue'

const with_root = (props, context) => {
    const children = context.slots.default().filter(vnode => vnode.type) // remove unnecessary
    if (children.length !== 1) {
        console.warn('this component accepts only one root node in its slot')
    }
    if (props.show) {
        return children[0]
    } else {
        return h('span', children[0].children)
    }
}

with_root.props = ['show']

export default with_root