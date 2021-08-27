import lodash from "lodash";
import Vue from "vue";
(function (scope) {
    try {
        if (lodash.includes(scope.location.search, 'vconsole')) {
            if (scope.VConsole) {
                return new scope.VConsole()
            }
            const vcjs = document.createElement("script");
            vcjs.async = true;
            vcjs.src = `https://unpkg.com/vconsole/dist/vconsole.min.js`;
            vcjs.addEventListener("load", event => {
                // @ts-ignore
                const vConsole = new scope.VConsole();
                console.log("LENG ~ AppConfig", lodash.get(Vue, 'AppConfig'))
            });
            document.body.appendChild(vcjs);
        }
    } catch (error) {
        console.log("LENG: error", error)
    }
})(
    ('undefined' !== typeof process &&
        '[object process]' === {}.toString.call(process)) ||
        ('undefined' !== typeof navigator && navigator.product === 'ReactNative')
        ? global
        : self
);