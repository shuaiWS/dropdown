export default {
    methods: {
        /**
         * @description 递归遍历当前组件下面所有与组件名称相匹配的组件，并触发目标事件并传参
         * @param {Component} target 当前组件
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {any} params 需要传递的参数
         * @return {void}
         */
        broadcast(target, componentName, eventName, params) {
            let me = this;
            target.forEach(function(child) {
                var name = child.$options.componentName;
                if (name === componentName) {
                    child.$emit.apply(child, [eventName].concat(params));
                } else {
                    me.broadcast(child.$children, componentName, eventName, params);
                }
            });
        },
        /**
         * @description 递归为目标元素的父元素绑定滚动事件，并执行callback
         * @param {Element} $el 目标元素
         * @param {Function} callback 回调函数
         * @return {void}
         */
        bindUpdate($el, callback) {
            let target;
            if ((target = $el.parentElement)) {
                target.addEventListener("scroll", callback);
                this.bindUpdate(target, callback);
            }
        },
        /**
         * @description 根据目标元素更新挂载元素的位置
         * @param {Element} $el 目标元素
         * @param {Element} $target 挂载元素
         * @return {Void}
         */
        update($el, $target) {
            if (!$el || !$target) return;
            let {
                bottom: $elBottom,
                height: $elHeight,
                left: $elLeft,
                right: $elRight,
                top: $elTop,
                width: $elWidth
            } = this.getBoundingClientRect($el);
            let {
                bottom: $targetBottom,
                height: $targetHeight,
                left: $targetLeft,
                right: $targetRight,
                top: $targetTop,
                width: $targetWidth
            } = this.getBoundingClientRect($target);
            let scrollTop = window.scrollY;
            let scrollLeft = window.scrollX;
            console.log(scrollTop)
            $target.style.top = `${$elTop + $elHeight + scrollTop}px`;
            $target.style.left = `${$elRight - $targetWidth + scrollLeft}px`;
        },
        /**
         * @description 获取元素的bottom、height、left、right、top、width属性
         * @param {Element} $el  目标元素
         * @return {ClientRect}
         */
        getBoundingClientRect($el) {
            let style = $el.style;
            if (style.display === "none") {
                let _addCss = {
                    display: "",
                    position: "absolute",
                    visibility: "hidden"
                };
                let _oldCss = {};
                for (let i in _addCss) {
                    _oldCss[i] = style[i];
                    style[i] = _addCss[i];
                }
                let clientRect = $el.getBoundingClientRect();
                for (let i in _oldCss) {
                    style[i] = _oldCss[i];
                }
                return clientRect;
            }
            return $el.getBoundingClientRect();
        },
        /**
         * @description 逆向递归寻找当前组件的父组件，然后emit事件并传递参数
         * @param {Component} target 当前组件
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {any} params 需要传递的参数
         * @return {void}
         */
        dispatch(target, componentName, eventName, params) {
            let name;
            if (!(name = target.$options.componentName)) return
            if (name === componentName) {
                target.$emit.apply(target, [eventName].concat(params));
            } else {
                this.dispatch(target.$parent, componentName, eventName, params);
            }
        }
    }
}