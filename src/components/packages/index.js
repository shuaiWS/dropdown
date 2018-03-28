import MyButton from './button'
import MyDropdownItem from './dropdown-item'
import MyDropdownMenu from './dropdown-menu'
import MyDropdown from './dropdown'



const components = [
    MyButton, MyDropdownItem, MyDropdownMenu, MyDropdown
]
export class Button extends MyButton { constructor() { super() } }
export class DropdownItem extends MyDropdownItem { constructor() { super() } }
export class DropdownMenu extends MyDropdownMenu { constructor() { super() } }
export class Dropdown extends MyDropdown { constructor() { super() } }
export const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}