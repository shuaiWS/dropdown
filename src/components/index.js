import MyButton from './packages/button'
import MyDropdownItem from './packages/dropdown-item'
import MyDropdownMenu from './packages/dropdown-menu'
import MyDropdown from './packages/dropdown'

const components = [
    MyButton, MyDropdownItem, MyDropdownMenu, MyDropdown
]
const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    ...components,
    install
}