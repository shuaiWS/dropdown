import MyButton from './../components/packages/button'
import MyDropdownItem from './../components/packages/dropdown-item'
import MyDropdownMenu from './../components/packages/dropdown-menu'
import MyDropdown from './../components/packages/dropdown'

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