import lodash from "lodash";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { AppValueType } from "./declare";
@Component({ components: {} })
export class FieldBasics extends Vue {

    // form label 没有 取 name 数据
    @Prop({ type: String }) readonly label;
    // form name
    @Prop({ type: String }) readonly name;
    // 输入提示
    @Prop({ type: String }) readonly placeholder;
    // 校验
    @Prop({ type: Array }) readonly rules;
    // 联动
    @Prop({ type: Array }) readonly linkage;
    // 当前实体对应的 属性key
    @Prop({ type: String }) readonly entityKey;
    /** 给 field组件的 fieldProps */
    @Prop({ type: Object, default: () => { } }) readonly fieldProps;
    // 值类型
    @Prop({ type: String, default: "text" }) readonly valueType: AppValueType;
    // 只读
    @Prop({ type: Boolean, default: false }) readonly readonly;
    // 禁用
    @Prop({ type: Boolean, default: false }) readonly disabled;
    // 测试日志
    @Prop({ type: Boolean, default: false }) readonly debug;
    // 数据源
    @Prop({ type: Function, default: () => [] }) readonly request;
    // 表单状态值 组件内 Inject
    // @Inject() 
    readonly formState;
    // 自定义校验状态 details/index.vue 中服务器返回 组件内 Inject
    // @Inject() 
    // readonly formValidate;
    // 实体
    // @Inject() 组件内 Inject
    readonly PageEntity;
    // 表单类型
    readonly formType: 'details';
    // 数据加载
    spinning = false;
    // 数据源
    dataSource: Array<{ label?: any; value?: any, [key: string]: any }> = [];
    /**  form-item 属性 */
    get itemBind() {
        const label = this._label,
            name = this._name,
            valueType = this._valueType;
        // const formValidate = lodash.get(this.formValidate, lodash.isArray(name) ? name.join('.') : name, {})
        const bind = {
            label: label || name,
            name: name,
            rules: this._rules,
            prop: name
            // hasFeedback: lodash.includes(["text"], valueType),
            // ...formValidate
        }
        // console.log("LENG ~ FieldBasics ~ getitemBind ~ bind", bind)
        return bind;
    }
    // 只读
    get _readonly() {
        if (this.formType === 'details' && lodash.has(this.$route.query, '_readonly')) {
            return true
        }
        return this.readonly// || lodash.has(this.$route.query, '_readonly')
    }
    // form-item lable
    get _label() {
        const label = lodash.head(lodash.compact([
            // 优先获取 Props 配置
            this.label,
            // 获取 Entity 配置
            lodash.get(this.PageEntity, `${this.entityKey}.label`),
            `label 未配置 (${this.entityKey})`
        ]))
        return this.$t(label);
    }
    // form-item name
    get _name() {
        const name = lodash.head(lodash.compact([
            // 优先获取 Props 配置
            this.name,
            // 获取 Entity 配置
            lodash.get(this.PageEntity, `${this.entityKey}.name`),
            '__name_' + this.entityKey
        ]));
        if (name === '__name_' + this.entityKey) {
            console.warn('name 未配置', this)
        }
        return name;
    }
    set _name(value) { }
    // 输入提示
    get _placeholder() {
        const placeholder = lodash.head(lodash.compact([
            // 优先获取 Props 配置
            this.placeholder,
            // 获取 Entity 配置
            lodash.get(this.PageEntity, `${this.entityKey}.placeholder`),
            // this.$t(localesKey, { label: $i18n.t(label) }),
            // 转换 执行 toPlaceholder 
            lodash.invoke(this.$i18n, 'toPlaceholder', this._label),
            `请输入 ${this._label}`
        ]));
        return placeholder;
    }
    // 联动
    get _linkage() {
        const linkage = lodash.head(lodash.compact([
            // 优先获取 Props 配置
            this.linkage,
            // 获取 Entity 配置
            lodash.get(this.PageEntity, `${this.entityKey}.linkage`),
            []
        ]));
        return linkage;
    }
    // form 校验规则
    get _rules() {
        const rules = lodash.map(lodash.get(this.PageEntity, `${this.entityKey}.rules`, this.rules), item => {
            // 必填标识
            if (item.required) {
                // 没有 message
                if (!lodash.has(item, 'message')) {
                    // lodash.assign(item, { message: this.toRulesMessage() })
                }
                if (!lodash.has(item, 'trigger')) {
                    lodash.assign(item, { trigger: ['change', 'blur'] })
                }
            }
            return item
        });

        return rules;
    }
    /** 给 field组件的 fieldProps */
    get _fieldProps() {
        const fieldProps = lodash.head(lodash.compact([
            // 优先获取 Props 配置
            this.fieldProps,
            // 获取 Entity 配置
            lodash.get(this.PageEntity, `${this.entityKey}.fieldProps`),
        ]));
        return fieldProps;
    }
    // 属性值 v-model:value
    get value() {
        return lodash.get(this.formState, this._name);
    }
    set value(value) {
        lodash.set(this.formState, this._name, value);
        this.onChangeValue()
    }
    // 属性值类型
    get _valueType(): AppValueType {
        return lodash.get(
            this.PageEntity,
            `${this.entityKey}.valueType`,
            this.valueType
        );
    }
    // 数据源
    get _request() {
        return lodash.get(
            this.PageEntity,
            `${this.entityKey}.request`,
            this.request
        );
    }
    toRulesMessage() {
        return `请输入 ${this._label}` //lodash.invoke(this.$i18n, 'toRulesMessage', this._label)
    }
    @Emit('change')
    onChangeValue() {
        return this.value
    }
    // 加载数据源
    async onRequest() {
        this.spinning = true;
        const startTime = Date.now()
        try {
            const res = await lodash.invoke(
                this,
                "_request",
                lodash.cloneDeep(this.formState)
            );
            this.dataSource = res;
        } catch (error) {
            console.error("LENG ~ onRequest", error)
        }
        if (this.dataSource.length > 0) {
            const endTime = Date.now()
            const diffTime = 400 - (endTime - startTime);
            // 保证动画最少500考秒
            await of(1).pipe(delay(diffTime > 0 ? diffTime : 0)).toPromise()
        }
        this.spinning = false;
    }
    /**
     * 联动
     */
    onLinkage() {
        const onRequest = lodash.debounce(this.onRequest, 200)
        // linkage
        lodash.map(this._linkage, link => {
            // 顶层property 名
            this.$watch(() => lodash.get(this.formState, link), (newVal, oldVal) => {
                // 有值切 值更新
                if (!lodash.eq(newVal, oldVal)) {
                    onRequest()
                    if (oldVal) {
                        this.value = undefined
                    }
                }
            })
        })

    }
}